# Trends and filtering

## Trend contract

State the fitted model, time coordinate, units, period, seasonal sampling, missing-data rule, and uncertainty method. Report slopes in physically interpretable units such as `K decade-1`, not index steps.

- Use an actual elapsed-time coordinate rather than assuming every sample interval is identical.
- Distinguish a trend in annual/seasonal means from a trend fit to all monthly values.
- Check sensitivity to endpoints, influential events, and nonlinear structure.
- Account for serial dependence with an appropriate effective sample size, HAC uncertainty, block bootstrap, or another justified method.
- For field significance, distinguish pointwise tests from false-discovery-rate or field-level control.
- Separate forced trend, low-frequency variability, and residual only when the method supports that interpretation.

## Filtering contract

Record filter family, cutoff periods, order/window length, sampling interval, detrending choice, padding, missing-data handling, and the number of edge samples excluded.

- Verify regular sampling before applying digital filters.
- Do not concatenate DJFM or event windows across gaps and filter the artificial joined series. Filter a continuous series first, then subset, or add scientifically sufficient buffers around each segment.
- Decide whether to remove the mean and trend before filtering; document the order.
- Use `scipy.signal` for validated digital filters, xarray rolling/coarsening for transparent window operations, and statsmodels LOWESS when nonlinear smoothing is intended.
- Use zero-phase filtering only when a non-causal diagnostic is acceptable and disclose it.
- Inspect the frequency response and an impulse/synthetic-signal test for custom filters.
- Mask or flag contaminated edge intervals rather than presenting them as equally reliable.

## Output checks

Compare the original, retained component, and residual. Confirm whether they reconstruct the input within numerical tolerance when the decomposition is intended to be additive. Report variance changes and phase effects where relevant.
