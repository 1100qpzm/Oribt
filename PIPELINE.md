# Song metadata pipeline

`level/library.json` replaces manifest.json, levels.json, and loudness.json. Version 1 contains targetLufs, method, updatedAt, and an ordered songs array. Each song contains directory, enabled, levels (difficulty names or slots; null uses maidata.txt), and loudness (measured LUFS, peak and source metadata). Disabled songs retain their data. Course definitions remain in courses.json.

Open loudness-tool.html on the R2 public origin. Click the R2 loudness measurement button to load library.json and measure audio. Matching ETags reuse existing measurements unless force measurement is selected. Failed measurements retain existing metadata. Edit decimal difficulty constants in the per-song GUI (blank uses maidata.txt), then download library.json and replace level/library.json in R2. Only the JSON is generated; there is no local folder upload or upload script. Re-running measurement on the same catalog preserves unsaved difficulty edits.

The initial catalog includes all 26 songs, including raputa (Master 14.9). Existing metadata values are preserved. Legacy JSON objects remain in R2 for older clients but are no longer read by index.html or updated by this tool.
