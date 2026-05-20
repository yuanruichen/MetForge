# AGENTS.md

MetForge is a Codex workflow kit for atmospheric science and scientific Python
projects. Keep work simple, reproducible, and easy to inspect.

## Working Rules

- State assumptions before changing non-trivial code.
- Ask only when the answer cannot be inferred safely.
- Prefer the smallest implementation that solves the task.
- Touch only files needed for the request.
- Do not refactor unrelated code.
- Define a concrete success check for non-trivial work and run the smallest
  relevant verification before delivery.

## Paths

- Resolve paths from the repository root.
- Do not hardcode absolute machine-specific paths.
- Put external or symlinked inputs in `data/raw/`.
- Put derived datasets in `data/processed/`.
- Put generated figures in `output/figures/`.
- Put run logs in `output/logs/`.
- Put temporary files in `output/tmp/`.
- Put generated scripts in `code/scripts/archive/<task_name>/`.
- Put notebook source files in `code/scripts/jupyter/` when notebooks are part
  of the workflow.

## Data Processing

- Preserve input data; never rewrite raw data in place.
- Prefer lazy xarray/dask workflows for large NetCDF-style datasets.
- Reduce data before materializing large arrays.
- Keep derived outputs self-describing when practical.
- Record important inputs, parameters, and outputs in a short run log for
  non-trivial workflows.

## Figures

- Include variable name and units.
- Include period, season, or sample definition.
- Include method details such as filter window, anomaly definition, or
  aggregation method.
- Set explicit figure size and DPI.
- Save publication figures in both PNG and PDF when practical.

## Git Hygiene

- Do not commit raw data, processed data, generated figures, logs, caches, or
  temporary files.
- Keep public examples generic and free of private paths, credentials, or
  unpublished research details.
