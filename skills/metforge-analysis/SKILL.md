---
name: metforge-analysis
description: Analyze and diagnose atmospheric dynamics experiments and numerical-model tests. Use for dynamical-core evaluation, idealized cases, balanced flow, hydrostatic rest, density currents, advection, gravity/acoustic waves, mountain waves, baroclinic instability, conservation and budget closure, error growth, convergence, timestep/resolution/domain/MPI sensitivity, solver comparisons, and physical-consistency checks. Also use when Codex must decide which metric or experiment will distinguish numerical error, configuration error, expected discretization behavior, and genuine physical response.
---

# MetForge Analysis

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
- Use `metforge-figure` when a diagnostic needs a visual argument or an existing figure must be audited.
- Do not invoke a hidden end-to-end pipeline. Keep the current hypothesis, input, output, and acceptance check visible.

## Handoff

Return:

- tested hypothesis and reference
- configuration differences
- evidence table with metric definitions
- strongest supported diagnosis and alternatives
- unresolved uncertainty
- one next experiment and the result that would discriminate among explanations
