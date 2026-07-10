# Diagnostic metrics

Let model error be `e = x - x_ref` with non-negative spatial weights `w` normalized so `sum(w)=1`.

| Metric | Definition | Reveals | Can miss |
|---|---|---|---|
| Weighted bias | `sum(w e)` | systematic signed drift | cancellation of positive/negative structure |
| RMS / weighted L2 | `sqrt(sum(w e^2))` | domain-wide error energy | localized extremes and phase meaning |
| Maximum norm | `max(abs(e))` | worst local error | domain-wide degradation; grid-count sensitivity |
| Relative RMS | `RMS(e) / scale(x_ref)` | cross-case comparison | instability near a near-zero reference scale |
| Pattern correlation | centered spatial correlation | structural similarity | amplitude bias |
| Amplitude ratio | `std(x) / std(x_ref)` or mode amplitude ratio | damping/growth bias | displacement |
| Phase/displacement error | feature or mode shift | propagation error | diffuse structural change |
| Drift rate | robust slope after stated spin-up | secular imbalance | oscillatory bounded error |
| Conservation residual | storage change minus sources/sinks/fluxes | budget non-closure | compensating component errors |

## Weighting

- Latitude-longitude horizontal fields: use cell area or `cos(latitude)` only for a regular spherical grid where that approximation is valid.
- Three-dimensional fields: use grid-cell volume or mass weighting appropriate to the prognostic quantity.
- Different domain sizes: compare intensive metrics and report the integrated quantity separately.
- Staggered grids: compare like locations or document interpolation; do not subtract mismatched staggering silently.

## Convergence

For error `E(h)` at grid spacing `h`, estimate observed order from three or more resolutions in the asymptotic regime. With a refinement ratio `r`, a two-level estimate is

`p = log(E_coarse / E_fine) / log(r)`.

Do not report `p` as a method property unless:

- the reference is sufficiently accurate
- time error is smaller than spatial error for spatial convergence
- solutions are compared at the same physical time
- norms use comparable domains and weighting
- the run is in a smooth regime compatible with formal order

Shocks, limiters, terrain, splitting, and solver tolerance can reduce observed order legitimately.

## Error-growth regimes

Inspect error versus time on linear and, when useful, logarithmic axes. Separate:

- startup adjustment
- approximately linear accumulation
- exponential modal growth
- nonlinear saturation
- bounded oscillation or phase drift

A single endpoint conflates these regimes.
