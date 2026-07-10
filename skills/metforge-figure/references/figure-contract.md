# Figure contract

Complete this before substantial plotting. Infer fields from the task when the answer is already clear.

```yaml
core_claim: ""
comparison: ""
audience: "exploration | group meeting | paper | review response"
panels:
  - id: a
    evidence_role: ""
    data: ""
    encoding: ""
diagnostics:
  variables: []
  units: []
  domain: ""
  period_or_sample: ""
  transformations: []
  uncertainty_or_significance: ""
comparability:
  shared_limits: true
  common_grid: ""
  reference: ""
export:
  dimensions: ""
  formats: []
  dpi: 300
risks: []
```

## Evidence hierarchy

For every panel, finish this sentence: “The claim would be weaker without this panel because …”. Remove or demote panels without a unique answer.

Common atmospheric evidence roles include:

- establish climatology or reference state
- locate a signed response or error
- reveal propagation, tilt, or vertical structure
- quantify amplitude, phase, scale, or uncertainty
- test sensitivity to resolution, timestep, domain, decomposition, or method
- connect a spatial pattern to a budget or mechanism

## Comparison contract

Before comparing panels, decide whether they share:

- grid and effective resolution
- area weighting
- time sampling and sample count
- anomaly/reference definition
- smoothing or filtering
- color normalization
- masking and significance rules

If they do not, make the mismatch visible in labels or captions instead of implying direct equivalence.
