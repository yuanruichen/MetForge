---
name: metforge-analysis
description: Perform reproducible atmospheric-science calculations and statistical diagnostics. Use when Codex needs to calculate established or custom climate indices, derive meteorological variables, compute trends, detrend or filter time series, perform EOF/PCA, regression, correlation, composites, bootstrap or significance tests, or build coordinate-aware xarray workflows from NetCDF/GRIB/Zarr data. Prefer validated implementations from MetPy, xarray, SciPy, statsmodels, xclim, xeofs/eofs, xskillscore, or another established package before implementing formulas manually. Not for diagnosing why a numerical model or dynamical-core test fails; use metforge-model-diagnose for that.
license: MIT
metadata:
  author: yuanruichen
  version: "2026.8.10"
  tags: "atmospheric-science, climate-science, scientific-computing, metpy, xarray, statistics"
---

# MetForge Analysis

Turn atmospheric data into a traceable scientific diagnostic. Make the mathematical definition, sampling assumptions, units, execution mode, and validation visible.

## Analysis contract

Before computing, establish:

- scientific quantity or hypothesis
- exact formula, published definition, or package function
- variables, units, coordinates, domain, levels, period, season, and baseline
- weighting, anomaly, standardization, missing-data, and event-selection rules
- output variables, dimensions, units, metadata, and acceptance checks

Do not silently choose among competing index definitions. For a named index, recover the authoritative definition and identify any required reference EOFs, climatology, or external coefficients.

## Computation workflow

1. Inspect files, coordinates, units, calendar, chunking, missing values, and existing project code.
2. Choose an established implementation before writing formulas:
   - use MetPy with unit-aware inputs for supported meteorological diagnostics
   - use xarray for labeled reductions, grouping, rolling, resampling, and alignment
   - use SciPy/statsmodels for filters and statistical models
   - use xclim for supported climate indices and xeofs/eofs for EOF analysis
   - use xskillscore or established statistical libraries for supported metrics
3. Read [references/indices-and-diagnostics.md](references/indices-and-diagnostics.md), [references/trends-and-filtering.md](references/trends-and-filtering.md), or [references/statistical-methods.md](references/statistical-methods.md) as the task requires.
4. Validate the definition on a small subset or synthetic case with a known result.
5. Select direct execution or a scheduler using the rules below, then run the smallest valid calculation before scaling out.
6. Validate dimensions, coordinates, units, numeric ranges, sample counts, missing-data propagation, and at least one independent or limiting-case check.
7. Save self-describing outputs and append an execution record after each completed computation stage.

## Scientific safeguards

- Preserve units and coordinate metadata; quantify any loss during format conversion.
- Apply area or mass weighting where the diagnostic requires it.
- Keep preprocessing order explicit. Detrending, anomaly removal, filtering, standardization, and compositing are not interchangeable.
- Do not concatenate separated seasons and then apply a continuous time filter.
- Distinguish regression maps from correlation maps and regression coefficients from composite anomalies.
- Account for serial dependence, multiple testing, and event overlap when they affect inference.
- Treat EOF sign as arbitrary and document weighting, normalization, missing mask, training period, and projection method.
- Never replace a package function with a hand-written approximation only to avoid understanding its assumptions.

## Execution mode and processing record

Before running code, inspect the current environment: available CPUs and memory, data volume and chunking, expected runtime, whether `sbatch`/Slurm is available, whether the session is already inside a Slurm job, and existing project conventions.

- Run directly for metadata inspection, subset validation, interactive exploration, and calculations that fit safely within the current session.
- Use Slurm or the site's scheduler for expensive multi-file calculations, parameter sweeps, memory-heavy operations, or work that should not run on a login node.
- Do not invent account, partition, walltime, or module settings. Infer them from existing scripts/configuration or request the missing value.
- For submitted work, capture the job script, job ID, resources, environment activation, stdout/stderr paths, and terminal status.

After every concrete compute call or completed batch stage, append a record to the project's existing log/provenance location. If none exists, use `output/logs/YYYYMMDD-HHMM-<task>.md`. Record inputs, software environment, direct/Slurm decision, commands or script, parameters, outputs, validation results, deviations, and status. Never record credentials or secrets. If files cannot be written, return the same record explicitly in the response.

## Handoff

Return the calculation definition, code or script, outputs, validation evidence, statistical caveats, and the processing record. Use `metforge-figure` only when a visual result is needed and `metforge-model-diagnose` only when the question concerns model failure or numerical behavior.
