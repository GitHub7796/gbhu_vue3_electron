# Repository Guidelines

## Project Structure & Module Organization
- `main.js`: Electron main process; launches the Python Thrift server.
- `index.html` and `render.js`: renderer UI and Thrift client calls.
- `py/`: Python backend (`thrift_server.py`) and generated bindings in `py/gen_py/`.
- `thrift/test.thrift`: Thrift IDL; source for generated code.
- `gen-nodejs/`: generated Node Thrift client code (do not edit).
- `package.json`: Node dependencies and scripts.

## Build, Test, and Development Commands
- `npm install`: install Electron/Node dependencies.
- `pip install thrift`: install Python Thrift runtime.
- `npm start`: run the Electron app; it spawns `py/thrift_server.py`.
- `python py/thrift_server.py`: run the server only for debugging.
- Regenerate bindings after IDL changes:
  - `thrift -out gen-nodejs --gen js:node thrift/test.thrift`
  - `thrift -out py/gen_py --gen py thrift/test.thrift`

## Coding Style & Naming Conventions
- JavaScript uses CommonJS `require` and camelCase identifiers; match the lightweight style in `main.js` and `render.js` (semicolons are mixed).
- Python uses 4-space indentation and snake_case names.
- Avoid editing generated files under `gen-nodejs/` and `py/gen_py/`.

## Testing Guidelines
- No automated tests are included in this repo.
- If you add tests, place them in a clear location (e.g., `tests/` or `py/tests/`) and document how to run them in this file.

## Commit & Pull Request Guidelines
- No Git history is available in this checkout; use concise, imperative commit subjects (e.g., "Add thrift client error logging").
- For PRs, include a short summary, test or verification notes, and screenshots when renderer UI changes.

## Configuration & Runtime Notes
- The Thrift server listens on `127.0.0.1:8000`; keep the host and port in sync between `py/thrift_server.py` and `render.js`.
- Python must be available on `PATH` for `npm start` to launch the server.
