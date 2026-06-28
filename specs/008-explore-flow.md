# 008 — Explore Flow

## Goal
Implement a dedicated interactive Explore Map dashboard (`/explore`) styled in the desaturated sepia hand-drawn visual theme. The map acts as the progression visualizer for Cabbits, where players select locations to open quest detail logs and launch dynamic observation quests.

## Requirements
1. **Interactive Route (`/explore`)**:
   - Renders a mobile-aspect phone viewport container matching the Cozy Home Screen layout.
   - Fits an illustrated map background representing the rabbit valley.
2. **Coordinates & Map Pins**:
   - Provide clickable button pins positioned absolutely over the map for:
     - **Pond** (Water observation): coordinates e.g., `top: 35%, left: 20%`
     - **Meadow** (Wildflower counting): coordinates e.g., `top: 25%, left: 68%`
     - **Oak Forest** (Acorn search): coordinates e.g., `top: 48%, left: 45%`
     - **Burrow** (Starting base): coordinates e.g., `top: 68%, left: 25%`
     - **Secret Library** (Ancient library): coordinates e.g., `top: 72%, left: 62%`
3. **Location Details (Sliding Bottom Sheet)**:
   - Tapping a pin highlights it and slides up the `location-detail` card overlay from the bottom.
   - Shows:
     - Location title, a short atmospheric description.
     - A list of quest rows. Each row has a state:
       - `✔️` (Completed): Quest completed.
       - `🔒` (Locked): Requires certain companion milestones (e.g. Insights).
       - Active (Playable link).
     - "Explore This Location" button: launches the quest route `/quest?questId=...` for the selected active quest.
4. **Dynamic Quests (`/quest?questId=...`)**:
   - Adapt UI descriptions, prompts, and memory storage tags dynamically based on `questId`:
     - `notice_one_thing`: Original "Notice one thing" acorn quest.
     - `watch_ripples`: Pond quest focusing on water patterns.
     - `count_flowers`: Meadow quest focusing on wildflower counting.
   - Completion writes the correct questId into Supabase/localStorage memory lists, immediately updating the checkmarks on the Explore map.

## Acceptance Criteria
- App compiles, builds, and runs cleanly with no errors.
- `/explore` routes correctly. Pins select correct locations and open bottom sheets.
- "Explore This Location" triggers `/quest?questId=...` with adapted text prompts.
- Quest completion writes dynamic ids and returns to map with corrected checkmarks.
