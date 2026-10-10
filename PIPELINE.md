# Song metadata pipeline

Open the R2 loudness-tool.html and click the measurement button. It calls orbit-library-api /songs on every run to discover immediate child folders of level/ in oribt-level. Only folders containing nonempty track.mp3 and maidata.txt are added. Partial uploads are displayed as incomplete. The API paginates the R2 listing, supports GET/OPTIONS only, and never writes to R2.

The tool merges new folders with library.json, preserving existing order, difficulty constants, enabled flags, loudness and unknown metadata. New entries are enabled with blank difficulty overrides. Existing entries whose files are missing remain in the catalog with a warning and are not measured. Unsaved edits survive repeat scans. A missing library.json (HTTP 404 only) starts a new catalog; other load errors stop the operation.

Measure audio, edit decimal difficulty constants, download library.json, and overwrite level/library.json in R2 to apply it to the game. The tool never uploads or deletes assets. Matching audio ETags reuse measurements unless forced. Failed measurements preserve previous values. courses.json remains separate.

Worker source: cloudflare/library-worker.mjs. Deploy with Wrangler using cloudflare/library-wrangler.jsonc. Unit tests: node --test cloudflare/library-worker.test.mjs. Binding SONGS targets oribt-level. API: https://orbit-library-api.yiryan48.workers.dev/songs
