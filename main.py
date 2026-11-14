"""Small Streamlit app. All ranking mathematics is in fuzzy_engine.py."""
import sys
sys.dont_write_bytecode = True
import csv
import json
import random
from copy import deepcopy
from datetime import datetime
from pathlib import Path
import streamlit as st
import fuzzy_engine as engine

RESULTS_FILE = Path(__file__).with_name("results.csv")
# Facts are for people to read. The engine uses only the five fit ratings.
BRIEF = ("Imagine you are Lea, 27. You want a non-smoker who wants children one day, "
         "drinks only occasionally, is aged 25-32, lives within 15 km, and is moderately active.")
DEFAULT_PROFILES = [
    {"name": "Person 1", "smoker": False, "children": 5, "drinking": 10, "age": 9, "distance": 9, "activity": 10,
     "description": "Age 29; unsure about children; occasional drinking; 10 km away; active 2-3 times/week."},
    {"name": "Person 2", "smoker": False, "children": 10, "drinking": 4, "age": 8, "distance": 7, "activity": 8,
     "description": "Age 30; wants children one day; drinks 5 nights/week; 30 km away; active 5 times/week."},
    {"name": "Person 3", "smoker": False, "children": 10, "drinking": 10, "age": 10, "distance": 10, "activity": 10,
     "description": "Age 28; wants children one day; occasional drinking; 5 km away; active 2-3 times/week."},
    {"name": "Person 4", "smoker": True, "children": 10, "drinking": 10, "age": 10, "distance": 10, "activity": 10,
     "description": "Age 26; wants children one day; occasional drinking; 8 km away; active 2-3 times/week."},
]


def build_scenario(profiles, non_smokers=True):
    preferences = {"non_smokers_only": non_smokers}
    return {"brief": BRIEF, "profiles": deepcopy(profiles), "preferences": preferences,
            "fuzzy": engine.rank_profiles(profiles, preferences, "fuzzy"),
            "simple": engine.rank_profiles(profiles, preferences, "simple")}


def read_results():
    if not RESULTS_FILE.exists():
        return []
    with RESULTS_FILE.open(newline="", encoding="utf-8-sig") as file:
        return list(csv.DictReader(file))


def save_response(example, system_a, choice, fit_a, fit_b, reason):
    # Decode the random A/B labels before adding one row to the CSV.
    methods = {"A": system_a, "B": "simple" if system_a == "fuzzy" else "fuzzy"}
    ratings = {methods["A"]: fit_a, methods["B"]: fit_b}
    if reason.lstrip().startswith(("=", "+", "-", "@")):
        reason = "'" + reason  # Keep free text as text in Excel.
    row = {"time": datetime.now().astimezone().isoformat(timespec="seconds"),
           "model_version": engine.VERSION, "system_a": system_a, "choice": choice,
           "preferred_method": methods.get(choice, choice),
           "fit_fuzzy_1_to_5": ratings["fuzzy"], "fit_simple_1_to_5": ratings["simple"],
           "reason": reason, "scenario_json": json.dumps(example, sort_keys=True)}
    columns = list(row)
    if RESULTS_FILE.exists():
        with RESULTS_FILE.open(newline="", encoding="utf-8-sig") as file:
            columns = next(csv.reader(file))
    with RESULTS_FILE.open("a", newline="", encoding="utf-8-sig") as file:
        writer = csv.DictWriter(file, columns)
        if file.tell() == 0:
            writer.writeheader()
        writer.writerow(row)


def show_profiles(example):
    st.write(example["brief"])
    for person in example["profiles"]:
        smoking = "smoker" if person["smoker"] else "non-smoker"
        st.write(f"**{person['name']} ({smoking}):** {person['description']}")


def show_rankings(example, methods, titles):
    for column, method, title in zip(st.columns(2), methods, titles):
        column.subheader(title)
        column.dataframe([{"Rank": "Excluded" if row["excluded"] else str(row["rank"]),
                           "Profile": row["name"],
                           "Fit / 10": "-" if row["score"] is None else f"{row['score']:.1f}"}
                          for row in example[method]], hide_index=True)


def new_participant():
    # Session state remembers values when Streamlit redraws the page.
    st.session_state.system_a = random.choice(("fuzzy", "simple"))
    st.session_state.saved = False
    for key in ("fit_a", "fit_b", "choice"):
        st.session_state[key] = None
    st.session_state.reason = ""


st.set_page_config(page_title="Fuzzy Love", layout="wide")
st.title("Fuzzy Love")
state = st.session_state
if "current" not in state:
    state.current = build_scenario(DEFAULT_PROFILES)
    state.example = deepcopy(state.current)
    new_participant()
compare, survey, results = st.tabs(["1. Try the rankers", "2. Survey", "3. Results"])

# 1. Read the fit ratings and ask the engine for both rankings.
with compare:
    profile_info = st.container()
    st.caption("Example judgments: 0 = poor, 5 = moderate, 10 = ideal. Enter fit ratings, not actual ages or distances.")
    with st.form("ratings"):
        non_smokers = st.checkbox("Exclude smokers in both systems", value=True)
        columns = {key: st.column_config.NumberColumn(title, min_value=0, max_value=10, step=1, required=True)
                   for key, title in engine.FEATURES.items()}
        profiles = st.data_editor(DEFAULT_PROFILES, hide_index=True, disabled=["name"],
                                  column_order=["name", "smoker", *engine.FEATURES],
                                  column_config={"name": "Profile", "smoker": "Smoker?", **columns}, key="profiles")
        if st.form_submit_button("Calculate rankings"):
            state.current = build_scenario(profiles, non_smokers)
    with profile_info:
        show_profiles(state.current)
    show_rankings(state.current, ("fuzzy", "simple"), ("Fuzzy ranker", "Simple average"))
    if st.button("Use this example in survey"):
        if not state.saved and any(state.get(key) for key in ("fit_a", "fit_b", "choice", "reason")):
            st.warning("Save the current survey response before changing its example.")
        else:
            state.example = deepcopy(state.current)  # Freeze the survey inputs.
            new_participant()
            st.success("Example updated. Open the Survey tab.")
    with st.expander("See fuzzy rules and calculation"):
        st.write("\n\n".join(f"R{i}. {rule}" for i, rule in enumerate(engine.RULES, 1)))
        name = st.selectbox("Profile to explain", [p["name"] for p in state.current["profiles"]], index=1)
        person = next(p for p in state.current["profiles"] if p["name"] == name)
        if state.current["preferences"]["non_smokers_only"] and person["smoker"]:
            st.info("This smoker is excluded in both systems before scoring.")
        else:
            trace = engine.mamdani({key: person[key] for key in engine.FEATURES})
            st.write("1. Entered ratings", trace["inputs"])
            st.write("2. Fuzzy memberships", trace["memberships"])
            st.write("3. Rule firing strengths", dict(trace["firings"]))
            st.write("4. Combined output levels", trace["output_levels"])
            st.write(f"5. Centroid: {trace['score']:.2f}/10. Simple average: {engine.simple_score(person):.2f}/10.")

# 2. Show the frozen example under random A/B labels, then save one response.
with survey:
    show_profiles(state.example)
    st.caption("Smokers excluded in both systems." if state.example["preferences"]["non_smokers_only"] else "Smoking ignored.")
    system_b = "simple" if state.system_a == "fuzzy" else "fuzzy"
    show_rankings(state.example, (state.system_a, system_b), ("System A", "System B"))
    st.write("How sensible are the scores? 1 = not sensible; 5 = very sensible.")
    fit_a = st.radio("System A", range(1, 6), index=None, horizontal=True, key="fit_a", disabled=state.saved)
    fit_b = st.radio("System B", range(1, 6), index=None, horizontal=True, key="fit_b", disabled=state.saved)
    choice = st.radio("Which system's scores and ranking would you choose?", ("A", "B", "equal", "neither"),
                      format_func={"A": "System A", "B": "System B", "equal": "Both equally", "neither": "Neither"}.get,
                      index=None, horizontal=True, key="choice", disabled=state.saved)
    reason = st.text_area("Why? (Optional)", key="reason", disabled=state.saved)
    st.caption("Voluntary anonymous pilot. Judge the scores using Lea's preferences and the profile facts.")
    if st.button("Save response", disabled=state.saved) and not state.saved:
        if fit_a is None or fit_b is None or choice is None:
            st.warning("Please rate both systems and choose an overall answer.")
        else:
            try:
                save_response(state.example, state.system_a, choice, fit_a, fit_b, reason.strip())
                state.saved = True
                st.rerun()
            except OSError as error:
                st.error(f"Could not save: {error}")
    if state.saved:
        st.success("Saved to results.csv. Click Next participant.")
    st.button("Next participant", on_click=new_participant, disabled=not state.saved)

# 3. Summarise the saved responses, keeping different examples separate.
with results:
    try:
        rows = read_results()
        st.write(f"Saved responses: {len(rows)}")
        groups = {}
        for row in rows:
            groups.setdefault((row["model_version"], row["scenario_json"]), []).append(row)
        for i, ((version, _), group) in enumerate(groups.items(), 1):
            st.write(f"**Example {i} ({version}): {len(group)} responses**")
            st.write({method: sum(r["preferred_method"] == method for r in group)
                      for method in ("fuzzy", "simple", "equal", "neither")})
            for method in ("fuzzy", "simple"):
                mean = sum(int(r[f"fit_{method}_1_to_5"]) for r in group) / len(group)
                st.write(f"Mean score-fit rating, {method}: {mean:.2f}/5")
    except (OSError, ValueError) as error:
        st.error(str(error))
    st.caption("Keep one fixed example for the study. This measures perceived fit and preference, not general accuracy.")
    st.write(f"Responses and written reasons: {RESULTS_FILE}")
