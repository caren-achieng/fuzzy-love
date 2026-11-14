"""A small scikit-fuzzy ranker and a simple average ranker."""

import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl

VERSION = "2.0-direct-fit-ratings"
FEATURES = {"children": "Children fit", "drinking": "Drinking fit",
            "age": "Age fit", "distance": "Distance fit", "activity": "Activity fit"}

# All five inputs are FIT RATINGS, not ages, kilometres or personal traits.
# 0 = completely unsuitable; 5 = moderate fit; 10 = ideal fit.
# You supply these ratings. There is no conversion table or gap parameter.
universe = np.linspace(0, 10, 301)
inputs = {name: ctrl.Antecedent(universe, name) for name in FEATURES}
children, drinking, age, distance, activity = inputs.values()
match = ctrl.Consequent(universe, "match", defuzzify_method="centroid")

# Fuzzification: turn a number into overlapping low / medium / high degrees.
# trimf([start, peak, end]) creates a triangular membership function.
# Example: fit 8 is medium to degree 0.4 and high to degree 0.6.
for variable in inputs.values():
    variable["low"] = fuzz.trimf(universe, [0, 0, 5])
    variable["medium"] = fuzz.trimf(universe, [0, 5, 10])
    variable["high"] = fuzz.trimf(universe, [5, 10, 10])

# Output words are fuzzy shapes too, on the same 0-10 scale.
match["poor"] = fuzz.trimf(universe, [0, 0, 10 / 3])
match["fair"] = fuzz.trimf(universe, [0, 10 / 3, 20 / 3])
match["good"] = fuzz.trimf(universe, [10 / 3, 20 / 3, 10])
match["strong"] = fuzz.trimf(universe, [20 / 3, 10, 10])

# Actual IF-THEN rules. & means fuzzy AND (min); | means fuzzy OR (max).
# Several rules can fire partly at once. Labels explain them in the app.
fuzzy_rules = [
    ctrl.Rule(children["low"] | age["low"] | distance["low"], match["poor"],
              label="IF children, age OR distance fit is low THEN match is poor."),
    ctrl.Rule(children["medium"] & drinking["low"], match["poor"],
              label="IF children fit is medium AND drinking fit is low THEN match is poor."),
    ctrl.Rule(children["medium"] & (drinking["medium"] | drinking["high"]), match["fair"],
              label="IF children fit is medium AND (drinking fit is medium OR high) THEN match is fair."),
    ctrl.Rule(children["high"] & (drinking["low"] | activity["low"]), match["fair"],
              label="IF children fit is high AND (drinking OR activity fit is low) THEN match is fair."),
    ctrl.Rule(children["high"] & drinking["medium"] & age["high"] & distance["high"] & activity["high"], match["good"],
              label="IF drinking fit is medium AND the other four fits are high THEN match is good."),
    ctrl.Rule(children["high"] & drinking["high"] & age["high"] & distance["high"] & activity["high"], match["strong"],
              label="IF all five fits are high THEN match is strong."),
    ctrl.Rule(children["high"] & (drinking["medium"] | drinking["high"]) &
              (age["medium"] | distance["medium"] | activity["medium"]), match["good"],
              label="IF children fit is high AND (drinking fit is medium OR high) AND (age, distance OR activity fit is medium) THEN match is good."),
]
RULES = [rule.label for rule in fuzzy_rules]  # Reuse labels; no duplicate rule list.
system = ctrl.ControlSystem(fuzzy_rules)


def mamdani(scores):
    # Give the five ratings to the library and ask it to evaluate the rules.
    simulation = ctrl.ControlSystemSimulation(system)
    simulation.inputs(scores)
    simulation.compute()

    # The library clips the rules' output shapes, combines them with max, then
    # finds their centre of area (centroid). This is the final numeric score.
    # We also read its state for the app's "Show fuzzy steps" explanation.
    def memberships(variable):
        return {name: float(term.membership_value[simulation] or 0)
                for name, term in variable.terms.items()}

    return {
        "score": float(simulation.output["match"]),
        "inputs": scores,
        "memberships": {name: memberships(variable) for name, variable in inputs.items()},
        "firings": [(rule.label, float(rule.aggregate_firing[simulation])) for rule in fuzzy_rules],
        "output_levels": memberships(match),
    }


def fuzzy_score(person):
    # Extract only the five ratings; name and smoker are not fuzzy inputs.
    scores = {name: person[name] for name in FEATURES}
    return mamdani(scores)["score"]


def simple_score(person):
    # The baseline just adds the SAME five ratings and divides by five.
    return sum(person[name] for name in FEATURES) / len(FEATURES)


def rank_profiles(profiles, preferences, method):
    score = fuzzy_score if method == "fuzzy" else simple_score
    rows = []
    for person in profiles:
        # Smoking remains an ordinary yes/no filter shared by both systems.
        excluded = preferences["non_smokers_only"] and person["smoker"]
        rows.append({"name": person["name"], "excluded": excluded,
                     "score": None if excluded else score(person)})
    # Eligible profiles first, then highest score first.
    rows.sort(key=lambda row: (row["excluded"], -(row["score"] or 0)))
    for row in rows:
        # Rank = one plus the number of higher-scoring profiles. Ties share a rank.
        row["rank"] = None if row["excluded"] else 1 + sum(
            other["score"] is not None and other["score"] > row["score"] + 1e-8 for other in rows)
    return rows
