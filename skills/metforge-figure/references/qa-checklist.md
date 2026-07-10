# Figure QA checklist

Audit the actual exported image or document, not only plotting code.

## Scientific completeness

- The figure answers one identifiable question.
- Every panel has a unique evidence role.
- Variables, units, period/sample, domain, and method are available in the figure or caption.
- Reference, anomaly, sign, normalization, and uncertainty definitions are explicit.
- Comparisons use compatible grids, samples, masks, and scales or disclose differences.

## Visual integrity

- Nothing is clipped, overlapped, or hidden behind a legend/colorbar.
- Text remains readable at final size.
- Zero and missing data are distinguishable.
- Sequential/diverging/cyclic color semantics match the variable.
- Color limits do not conceal scientifically important values.
- Map seams, coordinate reversals, terrain masks, and projection artifacts are absent.

## Reproducibility

- Source script and inputs are identifiable.
- Random seeds, smoothing, interpolation, and regridding are recorded when used.
- Export dimensions, DPI, and formats are explicit.
- The file opens successfully and its dimensions are plausible.

## Audit output

Report only consequential findings, ordered as:

1. scientific validity
2. misleading comparison risk
3. missing context or provenance
4. readability
5. cosmetic polish

Revise automatically when a clear in-scope fix is available. If the issue requires a scientific choice, state the choice and its consequence.
