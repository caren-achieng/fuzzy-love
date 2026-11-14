# Mixed Signals
Requires Python 3.9+; no packages or external services. From this folder run:

    python main.py

Open http://localhost:8501. In GitHub Codespaces run the same command, forward port 8501 in Ports, set visibility to Public and copy the forwarded address. Keep the codespace running. Only ten fixed fictional profiles are used. Gender selection limits both lists identically. Everyone shows all ten.

## Model
Every selected preference contributes one criterion. Strict control awards 1 for a category match, being in range, satisfying a minimum, or matching all selected tags in that category. Otherwise 0. Score = 100 × arithmetic mean. Skipped fields have no influence.

Fuzzy input fits range from 0 to 1. Age and distance fall linearly beyond the preferred range to zero at 5 years or 20 km outside. Photo shortfalls decay over three photos. Tags use fraction matched. Workout uses ordinal distance. Explicit neighbouring categories in match.js receive partial credit. These are editable prototype assumptions. Unspecified preferences are omitted.

The overall mean fit and the selection-weighted mean fit feed nine zero-order Sugeno rules. The weighted mean assigns 0.5 to explicitly flexible relationship goals (open to either duration or still figuring it out) and unsure family plans, and 1 to other selected answers. This heuristic interprets expressed flexibility as a softer preference. The ordinary mean still includes every selected criterion. Low, medium and high triangular memberships peak at 0, 0.5 and 1. Multiply the two membership degrees for each rule, then take the weighted mean of rule outputs (weights already sum to 1).

Selection-weighted / overall | Low | Medium | High
---|---:|---:|---:
Low | 0 | 25 | 50
Medium | 20 | 50 | 77
High | 40 | 76 | 100

Both lists have randomised A/B labels, revealed after feedback. Scores describe stated preference fit. Responses include the list order, ratings shown, profile names, preference vote, optional comment and time. Each page session gets a submission ID for retries. Back up survey.sqlite3 before deleting the codespace. For analysis, open the feedback table in DB Browser for SQLite. Only index.html and match.js are served publicly.
