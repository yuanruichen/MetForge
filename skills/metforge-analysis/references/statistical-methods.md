# Atmospheric statistical methods

Complete the [published-method gate](method-provenance.md) before selecting a statistical diagnostic. Standard software or a familiar statistical operation does not establish its scientific applicability. Record sources for any added statistical procedure and explain adaptations; do not select a procedure because it produces a desired pattern.

## EOF/PCA

- Define the anomaly field, time/space domain, missing mask, and whether covariance or correlation EOFs are intended.
- Apply physically justified spatial weights, commonly the square root of grid-cell area for an area-weighted covariance EOF.
- Prefer `xeofs` or `eofs` when available; record normalization conventions for EOFs and PCs.
- Report explained variance and sampling uncertainty where relevant.
- Treat mode sign as arbitrary. For comparisons, align signs using a stated reference.
- Separate training and projection periods when applying fixed EOF patterns to new data.
- Degenerate or nearly degenerate modes should be interpreted as a subspace, not as uniquely ordered patterns.

## Regression and correlation

- State predictor/response units, centering, scaling, lag convention, and covariates.
- Distinguish slope, standardized slope, correlation, partial regression, and explained variance.
- Inspect residual structure and serial dependence. Use HAC, block bootstrap, or another justified uncertainty estimate when ordinary independent-error assumptions fail.
- Avoid interpreting regression as causation without a design that supports it.
- For maps, report multiple-testing treatment and the effective independent sample.

## Composites

- Define event threshold, reference state, lag zero, event separation, season, and sample count.
- Prevent overlapping events from being treated as independent when their windows overlap.
- Keep event selection independent of the field being tested where circularity would bias the result.
- Compare against an explicit climatology or non-event sample.
- Use block bootstrap, permutation, or event resampling that preserves relevant temporal dependence.
- Show sample size by lag/grid point when missing data change the contributing events.

## General validation

Use synthetic or shuffled data to verify false-positive behavior, dimensional alignment, lag direction, and normalization. Save random seeds and resampling settings. Prefer effect sizes and uncertainty intervals over a binary significance mask alone.

## Shared-variable decompositions

Check whether components and their reference total share variables or definitions. A normalized covariance allocation that sums to one by construction is not independent evidence of physical source attribution, opposing forcings, or a closed feedback loop. Negative or greater-than-one terms are not independent variance fractions. Use such a scientific diagnostic only when a matched published method supports the actual target and interpretation; algebraic correctness or high correlation does not pass the method gate.
