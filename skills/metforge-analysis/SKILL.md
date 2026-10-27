---
name: metforge-analysis
description: Reproduce published atmospheric-science analysis methods or make small, documented adaptations for climate indices, meteorological diagnostics, trends, filters, EOF/PCA, regression, correlation, composites, bootstrap, and significance tests. Verify method provenance before computation; search the literature if needed, and stop with a blocker if no applicable method is established. Prefer validated implementations after selecting the method. Not for diagnosing numerical-model failures; use metforge-model-diagnose.
license: MIT
metadata:
  author: yuanruichen
  version: "2026.8.10"
  tags: "atmospheric-science, climate-science, scientific-computing, metpy, xarray, statistics"
---

# MetForge Analysis

Turn atmospheric data into a traceable, literature-grounded scientific diagnostic. Make the published method, its applicability, any minor adaptations, sampling assumptions, units, execution mode, and validation visible.

## Published-method gate

Before a scientific calculation, read [references/method-provenance.md](references/method-provenance.md). Identify a published method that matches the scientific question and intended interpretation, and inspect its actual methods, equations, or authoritative definition.

- Reproduce that method, or make only small, explicitly justified adaptations that preserve its definition, assumptions, and interpretation.
- If project references do not establish a suitable method, search the scientific literature before designing or running the diagnostic.
- If the search still does not establish an applicable method or its necessary methodological detail, stop that analysis and report the method blocker. Do not invent a new metric, decomposition, normalization, or attribution to keep producing results.
- Familiar equations, a validated package, numeric closure, synthetic checks, or an attractive plot do not replace this method evidence. Calling an unsupported calculation exploratory does not waive the gate.

Metadata inspection and feasibility checks may proceed while a method is unresolved; scientific diagnostic calculations and their result figures may not.


## Analysis contract

Before computing, establish:

- scientific quantity or hypothesis
- published method and exact section/equation/page or authoritative definition, with DOI or stable primary-source link
- why that method answers this question; permitted interpretation and known limits
- source settings versus proposed minor adaptations, reasons, and relevant sensitivity checks
- exact formula and selected implementation; a package function alone is not method provenance
- variables, units, coordinates, domain, levels, period, season, and baseline
- weighting, anomaly, standardization, missing-data, and event-selection rules
- output variables, dimensions, units, metadata, and acceptance checks

Do not silently choose among competing index definitions. For a named index, recover the authoritative definition and identify any required reference EOFs, climatology, or external coefficients.

## Computation workflow

1. Read existing project decisions and references; inspect files, coordinates, units, calendar, chunking, missing values, and existing code for feasibility.
2. Complete the published-method gate and method record. Search the literature if the project references are insufficient. Stop and report the blocker if no applicable method is established.
3. Only after the method is ready, choose an established implementation before writing formulas:
   - use MetPy with unit-aware inputs for supported meteorological diagnostics
   - use xarray for labeled reductions, grouping, rolling, resampling, and alignment
   - use SciPy/statsmodels for the documented filters and statistical models
   - use xclim for supported climate indices and xeofs/eofs for EOF analysis
   - use xskillscore or established statistical libraries for supported metrics
4. Read [references/indices-and-diagnostics.md](references/indices-and-diagnostics.md), [references/trends-and-filtering.md](references/trends-and-filtering.md), or [references/statistical-methods.md](references/statistical-methods.md) as the task requires. Library and numerical checks implement the selected method; they do not authorize a new one.
5. Validate the documented method on a small subset or synthetic case with a known result.
6. Select direct execution or a scheduler using the rules below, then run the smallest valid calculation before scaling out.
7. Validate dimensions, coordinates, units, numeric ranges, sample counts, missing-data propagation, and at least one independent or limiting-case check.
8. Save self-describing outputs and append a processing record after each completed computation stage. Record meaningful method choices, adaptations, or blockers in the project's research log; update affected project statements after that entry.

## Scientific safeguards

- Preserve units and coordinate metadata; quantify any loss during format conversion.
- Apply area or mass weighting where the diagnostic requires it.
- Keep preprocessing order explicit. Detrending, anomaly removal, filtering, standardization, and compositing are not interchangeable.
- Do not concatenate separated seasons and then apply a continuous time filter.
- Distinguish regression maps from correlation maps and regression coefficients from composite anomalies.
- Account for serial dependence, multiple testing, and event overlap when they affect inference.
- Treat EOF sign as arbitrary and document weighting, normalization, missing mask, training period, and projection method.
- Never replace a package function with a hand-written approximation only to avoid understanding its assumptions.
- Separate numerical/structural identities from independent physical evidence. Shared variables can create apparent correlations and cancellation; these do not identify forcing sources or feedback by themselves.
- Keep a successful run, a supported method, and a scientifically supported conclusion distinct.

## Execution mode and processing record

Before running code, inspect the current environment: available CPUs and memory, data volume and chunking, expected runtime, whether `sbatch`/Slurm is available, whether the session is already inside a Slurm job, and existing project conventions.

- Run directly for metadata inspection, subset validation, literature-grounded interactive checks, and calculations that fit safely within the current session.
- Use Slurm or the site's scheduler for expensive multi-file calculations, parameter sweeps, memory-heavy operations, or work that should not run on a login node.
- Do not invent account, partition, walltime, or module settings. Infer them from existing scripts/configuration or request the missing value.
- For submitted work, capture the job script, job ID, resources, environment activation, stdout/stderr paths, and terminal status.

After every concrete compute call or completed batch stage, append a record to the project's existing log/provenance location. If none exists, use `output/logs/YYYYMMDD-HHMM-<task>.md`. Record inputs, software environment, direct/Slurm decision, commands or script, parameters, outputs, validation results, deviations, and status. Never record credentials or secrets. If files cannot be written, return the same record explicitly in the response.

## Handoff

Return the published-method record, any minor adaptations, calculation definition, code or script, outputs, validation evidence, statistical caveats, and processing record. If method-blocked, return the question, search record, closest sources and why they are insufficient, what evidence would unblock the work, and which calculations were not run. Do not turn missing methodology into a physical null result or bypass the gate through plotting/reporting. Use `metforge-figure` only when a visual result is needed and `metforge-model-diagnose` only when the question concerns model failure or numerical behavior.
