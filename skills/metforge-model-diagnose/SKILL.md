---
name: metforge-model-diagnose
description: Diagnose atmospheric-model and dynamical-core experiments. Use for idealized tests, balanced flow, hydrostatic rest, density currents, advection, gravity/acoustic waves, mountain waves, baroclinic instability, conservation and budget closure, error growth, convergence, timestep/resolution/domain/MPI sensitivity, solver comparisons, and physical-consistency failures. Also use when the agent must design the smallest experiment that distinguishes discretization error, round-off, solver behavior, configuration differences, parallel decomposition, and genuine physical response. Not for general indices, trends, filtering, EOFs, regression, or composites; use metforge-analysis for those calculations.
license: MIT
metadata:
  author: yuanruichen
  version: "2026.8.10"
  tags: "atmospheric-modeling, dynamical-core, numerical-methods, model-diagnostics"
---

# MetForge Model Diagnose

Turn model output into a falsifiable diagnosis. Prefer the next decisive check over a long catalog of generic plots.

## Diagnostic workflow

1. State the test contract:
   - property or mechanism being tested
   - expected solution, symmetry, invariant, or benchmark
   - control and changed factor
   - diagnostic time window and success criterion
   - observation that would falsify the working explanation
2. Inventory the actual run configuration and outputs. Compare namelists, compiler/precision, solver, grid, timestep, domain, boundary conditions, physics, diffusion, filters, and decomposition before interpreting differences.
3. Establish the reference. Prefer an analytic solution, converged/high-resolution run, published benchmark, or internally consistent control. Do not call one arbitrary run “truth” without qualification.
4. Climb the diagnostic ladder below. Stop when the evidence isolates the failure or when the next step requires new data.
5. Classify each result as expected, numerically suspicious, physically inconsistent, configuration-dependent, or inconclusive.
6. Produce an evidence table and recommend one next experiment with the largest discrimination value.

## Diagnostic ladder

### 1. Integrity

Check file completeness, coordinates, units, time cadence, NaN/Inf, extrema, restart continuity, and whether the intended code path actually ran.

### 2. Invariants and equilibrium

Check mass, tracer mass, energy or energy-like quantities, hydrostatic/geostrophic balance residuals, symmetry, uniform-state preservation, and boundary fluxes as appropriate.

### 3. Error magnitude and growth

Use more than extrema. Select metrics from [references/diagnostic-metrics.md](references/diagnostic-metrics.md), including weighted bias, RMS/L2, maximum norm, drift rate, relative error, pattern correlation, phase displacement, and conservation residual.

### 4. Structure

Examine the error field, cross-flow components, vertical structure, spectra, wavenumber content, propagation speed, fronts, and symmetry breaking. Scalar norms can miss compensating or phase-shifted errors.

### 5. Controlled sensitivity

Change one factor at a time: resolution, timestep, domain size, diffusion/filter, precision, MPI decomposition, solver tolerance, or boundary treatment. Keep physical time and output sampling comparable.

### 6. Mechanism

Connect the failure to a term, operator, solver stage, boundary exchange, coordinate metric, or coupling pathway. Use tendencies and residual budgets; do not infer mechanism from spatial resemblance alone.

## Numerical-core principles

- Distinguish truncation error, round-off accumulation, iterative-solver error, and configuration differences.
- A result invariant to MPI decomposition but sensitive to resolution suggests a numerical-property issue rather than a parallel nondeterminism issue; confirm with field-level differences and precision tests.
- Timestep convergence requires a sufficiently accurate spatial reference, while spatial convergence requires temporal error to be controlled.
- Long integrations reveal drift but can mix growth, phase error, and nonlinear adjustment. Include early-time tendencies and growth regimes.
- Zero initial tendency does not rule out a later imbalance; inspect forcing/residual terms and the first resolvable error mode.
- Use physically scaled and area/volume-weighted norms when grids or domains differ.
- Read [references/numerical-core-tests.md](references/numerical-core-tests.md) when selecting or interpreting an idealized benchmark.

## Skill boundaries

- Use `metforge-data` only when external data acquisition or dataset preparation is a central missing step.
- Use `metforge-analysis` for indices, derived variables, filtering, trends, EOFs, regression, composites, or other scientific calculations used by the diagnosis.
- Use `metforge-figure` when a diagnostic needs a visual argument or an existing figure must be audited.
- Do not invoke a hidden end-to-end pipeline. Keep the current hypothesis, input, output, and acceptance check visible.

## Execution mode and processing record

Before running code or model experiments, inspect available CPUs and memory, expected runtime, output volume, whether `sbatch`/Slurm is available, whether the session is already inside a Slurm job, and existing site scripts.

- Run lightweight configuration inspection and small post-processing checks directly.
- Use Slurm or the site's scheduler for model integrations, resolution/timestep matrices, MPI tests, long post-processing, or any job unsuitable for a login node.
- Derive account, partition, modules, executable, decomposition, walltime, and resource requests from validated project configuration; do not guess them.
- For submitted work, capture the exact namelist/configuration, executable or commit, job script, job ID, resources, stdout/stderr paths, exit status, and produced files.

After every concrete run, diagnostic calculation, or completed batch stage, append a record to the project's existing log/provenance location. If none exists, use `output/logs/YYYYMMDD-HHMM-<task>.md`. Record inputs, environment, direct/Slurm decision, command or script, parameters, outputs, validation, deviations, and status. Never record credentials or secrets. If files cannot be written, return the same record explicitly in the response.

## Handoff

Return:

- tested hypothesis and reference
- configuration differences
- evidence table with metric definitions
- strongest supported diagnosis and alternatives
- unresolved uncertainty
- one next experiment and the result that would discriminate among explanations
- processing record, including scheduler job IDs when used
