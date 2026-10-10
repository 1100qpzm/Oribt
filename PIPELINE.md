# Song metadata pipeline

`level/library.json` replaces manifest.json, levels.json, and loudness.json. Version 1 contains targetLufs, method, updatedAt, and an ordered songs array. Each song contains directory, enabled, levels (difficulty names or slots; null uses maidata.txt), and loudness (measured LUFS, peak and source metadata). Disabled songs retain their data. Course definitions remain in courses.json.

Open loudness-tool.html on the R2 public origin. Load the current catalog, edit levels/visibility/target, or select a local level folder to check charts and measure changed audio. Download library.json and the upload script. The script uploads changed assets first and publishes library.json last. A failed asset upload stops publication. Local file comparisons use SHA-256; R2 audio measurement reuses matching ETags when available.

The initial catalog includes all 26 songs, including raputa (Master 14.9). Existing metadata values are preserved. Legacy JSON objects remain in R2 for older clients but are no longer read by index.html or updated by this tool.
