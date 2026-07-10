---
name: metforge-figure
description: Design, create, revise, and audit atmospheric-science figures. Use for maps, map differences, vertical sections, Hovmöller diagrams, profiles, spectra, budgets, convergence plots, conservation/error-growth diagnostics, ensemble comparisons, and publication multi-panel figures from NetCDF/xarray or tabular data. Also use when Codex must inspect an existing figure or plotting script for scientific clarity, comparable scales, units, color choices, statistical overlays, layout, provenance, or export quality. Combines MetForge's former plot and figure-audit workflows into one evidence-first loop.
---

# MetForge Figure

Treat each figure as a visual scientific argument. Define what it must show, render it with the user's existing stack when possible, and inspect the exported result before delivery.

## Figure loop

1. Inspect the data, existing plotting code, target medium, and relevant prior figures.
2. Write a compact figure contract using [references/figure-contract.md](references/figure-contract.md).
3. Choose the smallest figure grammar that tests the claim. Read [references/atmospheric-patterns.md](references/atmospheric-patterns.md) for atmospheric defaults.
4. Implement within the user's language and project conventions. For a new Python workflow, prefer xarray + matplotlib and use cartopy only when geographic projection is needed.
5. Render at final or representative size. Open the actual output and audit it with [references/qa-checklist.md](references/qa-checklist.md).
6. Fix high-impact scientific or readability failures, rerender, and reinspect. Stop polishing when the contract is satisfied.

## Execution mode and processing record

Before rendering, inspect data size, memory needs, expected runtime, available CPUs, whether `sbatch`/Slurm is available, whether the session is already inside a Slurm job, and existing project conventions.

- Render directly for ordinary figures and small validation subsets that fit safely in the current session.
- Use Slurm or the site's scheduler when figure preparation requires large aggregations, many files, ensemble processing, high-resolution rasterization, or work unsuitable for a login node.
- Do not guess scheduler account, partition, walltime, modules, or paths. Reuse validated project configuration.
- For submitted work, capture the job script, job ID, resources, environment, stdout/stderr paths, and terminal status.

After every completed data-preparation call, render/export, or audit-revision cycle, append a record to the project's existing log/provenance location. If none exists, use `output/logs/YYYYMMDD-HHMM-<task>.md`. Record inputs, software environment, direct/Slurm decision, commands or script, figure contract, transformations, output files, visual checks, deviations, and status. Never record credentials or secrets. If files cannot be written, return the same record explicitly in the response.

## Hard scientific rules

- Label variables and units; state period, season/sample, domain, and diagnostic definition.
- Use shared limits and norms when panels are meant to be compared.
- Use a perceptually ordered sequential map for magnitude and a centered diverging map for signed anomalies or differences. Choose limits from scientific meaning and robust data ranges, not arbitrary defaults.
- Distinguish zero, missing, masked, and statistically unsupported values.
- State smoothing, filtering, interpolation, regridding, anomaly baselines, and significance methods.
- Do not add significance marks, uncertainty bands, or causal annotations without the underlying calculation.
- Preserve map geometry. Handle longitude wrapping, cyclic seams, latitude order, and projection transforms explicitly.
- Do not hide inconvenient extremes solely to improve appearance. If clipping is necessary, disclose it and quantify affected values.

## Layout and export

- Give the most important evidence the largest or earliest panel.
- Remove panels that repeat the same evidence.
- Use panel labels, shared legends/colorbars, and deliberate whitespace.
- Keep text readable at final display size; inspect dense maps after rasterization.
- Prefer PDF/SVG for vector-dominant plots. Use high-resolution PNG/TIFF for raster-heavy maps or image plates; avoid huge vector files containing millions of cells.
- Save the plotting source and enough data provenance to reproduce the figure.

## Delivery

Return the figure, source code, and a short audit note covering:

- conclusion the figure supports
- panel-to-evidence mapping
- transformations and statistical overlays
- visual checks performed on the exported file
- remaining uncertainty or limitations
- processing record, including scheduler job IDs when used

If scientific calculation rather than visualization is unresolved, use `metforge-analysis`. If the question is why a model test fails, use `metforge-model-diagnose` instead of inventing a stronger interpretation.
