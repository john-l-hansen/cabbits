# 005 — Curiosity Mechanic

## Goal
Implement the intrinsic Curiosity progression loops for Cabbits:
* "Curiosity is unique."
* "Learning fills Curiosity."

This replaces generic XP/level structures with a thematic Curiosity state. The companion's curiosity increases upon quest completion and alters the companion orb's physical animation behavior.

## Requirements
1. **Curiosity Tracking**:
   - Every companion profile must hold two progression fields:
     - `curiosity`: a number from `0` to `100` representing current curiosity percentage.
     - `insightsCount`: a counter representing the total number of times curiosity was fully filled.
2. **Quest Reward Mapping**:
   - Upon submitting a quest observation, curiosity points are awarded dynamically based on the Evaluator Agent's rating:
     - `Brief` rating: `+15` curiosity points.
     - `Developing` rating: `+30` curiosity points.
     - `Thoughtful` rating: `+50` curiosity points.
3. **Threshold & Insight Milestone**:
   - If adding curiosity points causes the value to reach or exceed `100`:
     - The `insightsCount` increments by `1`.
     - The `curiosity` value resets to `0` (carrying over any overflow if applicable, or resetting clean. We will implement clean reset to keep milestones distinct).
4. **Orb Visual Representation**:
   - The Companion Orb's pulse speed and styling should adapt to their current curiosity percentage:
     - `0% - 25%`: Slower, calm, quiet breathing pulse (6s cycle).
     - `26% - 75%`: Normal active breathing pulse (4s cycle).
     - `76% - 100%`: Faster, active, glowing pulse (2s cycle), indicating the companion is buzzing with curiosity and ready to reflect.
5. **UI indicators**:
   - Provide minimal text indicators (e.g. `Moss is 40% full of curiosity.`) on the Home page.
   - Show animated feedback upon quest complete.

## Acceptance Criteria
- App compiles and runs without compilation or type check errors.
- New companion profiles initialize with `curiosity = 0` and `insightsCount = 0`.
- Submitting an observation updates the companion's curiosity points correctly.
- Reaching `100` curiosity successfully increments the insight milestone count and resets curiosity.
- The Companion Orb's visual pulsing speed shifts dynamically depending on the current curiosity percentage.
