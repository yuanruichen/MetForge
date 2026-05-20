---
name: data-process
description: Scientific data processing guidance for xarray/dask workflows, repo-local path handling, memory-aware NetCDF processing, and reproducible outputs.
---

# Data Process

Use this skill when the task is mainly about processing scientific datasets
safely and reproducibly.

## Use For

- xarray/dask processing of NetCDF-style data.
- Memory-aware reductions, rechunking, groupby, rolling, FFT, and regression workflows.
- Converting notebook workflows into restartable scripts.
- Writing derived datasets, logs, and processing metadata.

## Instructions

1. Work from the repository root.
2. Keep writes repo-local:
   - inputs: `data/raw/`
   - derived data: `data/processed/`
   - figures: `output/figures/`
   - logs: `output/logs/`
   - scratch: `output/tmp/`
   - generated scripts: `code/scripts/archive/<task>/`
3. Never hardcode machine-specific absolute paths.
4. Preserve raw inputs; do not rewrite source data in place.
5. Use xarray and dask conservatively:
   - prefer lazy loading
   - avoid premature `.values`, `.load()`, or `.compute()`
   - rechunk intentionally
   - reduce before materializing large arrays
6. Before merging or slicing data:
   - inspect coordinate names and ordering
   - check latitude direction explicitly
   - do not assume auxiliary coordinates match
7. Write derived outputs as self-describing datasets when practical.
8. For non-trivial runs, write a short log with inputs, outputs, parameters, and deviations from the source workflow.

## Common Checks

- Broken symlink or missing input.
- Wrong latitude slice direction.
- Chunked core dimensions causing `apply_ufunc` errors.
- Oversized Dask graphs from eager intermediates.
- Merge conflicts on auxiliary coordinates.
- Hidden memory expansion from broadcasting, rolling, FFTs, or groupby operations.
