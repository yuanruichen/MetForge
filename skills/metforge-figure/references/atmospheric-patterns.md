# Atmospheric figure patterns

Choose the pattern from the scientific question.

| Question | Primary pattern | Essential checks |
|---|---|---|
| Where is a field or response? | projected map | transform, cyclic seam, units, resolution, meaningful scale |
| How do products/models differ? | small-multiple maps plus difference or summary | common grid, shared norm, reference definition |
| How does a signal propagate? | longitude-time or latitude-time Hovmöller | axis direction, lag origin, phase-speed guide, filtering |
| What is the vertical structure? | pressure-height section or profile | inverted pressure axis, vertical velocity/sign convention, terrain mask |
| Does a scheme converge? | error versus resolution/timestep | log axes when justified, reference solution, observed order, cost |
| Does balance/conservation degrade? | drift series plus norm summary | initial normalization, transient exclusion, max and RMS/weighted norms |
| What closes a budget? | component series/maps plus residual | common sign convention, identical averaging, residual shown explicitly |
| Is a response robust? | ensemble distribution/interval plus pattern | independent unit, spread definition, member count, weighting |
| Which scales dominate? | spectrum/wavenumber-frequency plot | normalization, window, degrees of freedom, significance/background |

## Map defaults

- Use `transform=ccrs.PlateCarree()` for lon/lat data even when the display projection differs.
- Add a cyclic point or wrap coordinates when global fields show a seam.
- Use coastlines as geographic reference, not decoration; avoid heavy borders over dense data.
- Use area weighting for global or latitude-extended spatial summaries.
- For vector winds, thin arrows consistently and include a reference vector.
- For contour labels, prefer a few physically meaningful levels to dense automatic labels.

## Numerical-test figures

Pair field snapshots with quantitative summaries. A maximum/minimum curve alone can miss phase errors, spurious cross-flow, or structural deformation. Useful companions are RMS/L2 error, pattern correlation, phase displacement, conservation residual, spectra, or cross-sections chosen from the expected solution.
