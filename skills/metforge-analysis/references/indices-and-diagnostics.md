# Atmospheric indices and diagnostic variables

## Index contract

For every index, record:

- authoritative definition and reference
- source variables and units
- spatial domain, vertical level, season, and temporal resolution
- climatology/baseline and standardization period
- area weighting, masking, filtering, and detrending
- sign convention and expected physical interpretation
- output cadence and missing-data rule

Common index forms include area-weighted means, differences between regions, projections onto a fixed pattern, EOF/PC indices, threshold/event indices, and ratios or normalized anomalies. These forms are not interchangeable.

Named indices such as RMM, Niño indices, SAM/NAO, monsoon indices, blocking indices, and wave-activity indices may have multiple published variants. Do not infer a definition from the name alone. Some require fixed reference EOFs, multivariate normalization, or a specific climatological period.

## Existing implementations first

- Use `xclim` for supported climate indicators and spell out its parameter choices.
- Use xarray weighted reductions for coordinate-aware regional indices.
- Use `metpy.calc` with Pint-aware units for supported diagnostics such as potential temperature, equivalent potential temperature, dewpoint, vorticity, divergence, advection, frontogenesis, potential vorticity, CAPE/CIN, and related quantities.
- Use `xgcm`, `cf_xarray`, or grid-native operators when staggered grids, hybrid coordinates, or metric terms make naive finite differences unsafe.
- Use a spherical or grid-aware implementation for global derivatives; do not treat longitude/latitude degrees as Cartesian distance.

## Diagnostic-variable checks

- Confirm vertical-coordinate type and ordering before vertical derivatives or interpolation.
- Confirm wind-grid staggering before divergence, vorticity, or flux calculations.
- Quantify below-ground masking for pressure-level diagnostics.
- Preserve sign conventions for vertical velocity, flux convergence, and budget terms.
- Test a limiting case: uniform flow should have zero horizontal derivatives; a constant field should have zero anomaly; a known analytic profile should recover the expected diagnostic.
