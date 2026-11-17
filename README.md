# Mixed Signals — evaluation version 3

Run python main.py, then open http://localhost:8501. No dependencies.
In Codespaces, make port 8501 public and share its forwarded address.

## Update an existing installation
Replace main.py, index.html and match.js. Keep survey.sqlite3 in place.
Stop the previous process with Ctrl+C and run python main.py again.
Earlier responses remain in the feedback table.

## Priorities and methods
Only selected criteria enter the calculation. Testers reorder them with arrows.
Rank-sum weights are n, n−1, …, 1, where n is the selected criterion count.
Both methods use exactly the same weights and exact deal-breaker filters.
Must match requires exact category match, the numerical range/minimum, or all selected tags.
A high priority alone does not exclude a profile.

Fuzzy input 1 is the minimum fit among the first three selected criteria (or all if fewer).
Fuzzy input 2 is the weighted mean of all preference fits.
This explicit design makes a serious top-priority mismatch limit the final score.
Triangle memberships Low/Medium/High peak at 0, .5, 1.
Nine zero-order Sugeno rules use product firing and singleton outputs:

Top priority / overall | Low | Medium | High
---|---:|---:|---:
Low | 0 | 15 | 35
Medium | 20 | 50 | 70
High | 40 | 80 | 100

Each cell means IF top-priority fit is row AND overall fit is column THEN output cell.
All active rule outputs are blended by firing strength. The strengths sum to one.
Control score is 100 times the same weighted mean of strict binary fits.

The minimum over the top three, rank-sum weighting, numeric tolerances and categorical
partial credits are documented prototype assumptions, not validated compatibility estimates.
No preference importance is inferred from ambiguous wording in this version.

## Data and evaluation
Participants see randomized A/B labels and explanations after submission.
Feedback saves time, modelVersion, selected preferences, priority order, deal-breakers,
gender filter, excluded profiles and reasons, both displayed lists/scores, vote and comment.
No qualifying profiles still permits evaluation. Database schema is unchanged.
Download survey.sqlite3 regularly. It is excluded from Git.

Compare v3 responses separately from earlier model versions. Survey responses from before
v3 lack preference snapshots. The pool now contains 110 fixed fictional profiles. The 100 additional profiles span ages 18–75, distances 1–120 km, three gender categories and every categorical answer. Earlier versions used ten profiles. New submissions record profilePoolVersion=110-profiles-v1, so analyse each pool separately.

## Expanded pool update
Replace main.py, index.html and match.js, then restart the server. Keep survey.sqlite3.
Even 110 profiles cannot cover every possible combination of exact deal-breakers.
The server accepts up to 128 KiB per submission to accommodate larger ranked lists.
