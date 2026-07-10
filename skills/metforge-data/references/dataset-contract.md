# Dataset contract and provenance

Write this contract before a substantial download and complete it after validating the first batch.

```yaml
question: ""
source:
  provider: ""
  product: ""
  version: ""
  landing_page: ""
  retrieved_at: ""
request:
  variables: []
  levels: []
  time_range: ""
  frequency: ""
  domain: []
  grid: "native"
  experiment: ""
  members: []
format: ""
expected:
  files: 0
  bytes: 0
validation:
  variables: "pending"
  units: "pending"
  coordinates: "pending"
  time: "pending"
  missing_data: "pending"
  range: "pending"
transformations: []
outputs: []
notes: ""
```

## Minimum reproducibility record

- Keep the retrieval script or exact request payload.
- Record dataset version and file names, not only a generic product label.
- Record server-side subsetting and all local transformations.
- Record checksums when files may move between systems or when the provider does not publish stable versioned paths.
- Record software/environment details when decoding depends on GRIB tables, calendars, or engine versions.

## Collection checks

Before concatenating files, compare variables, coordinates, encoding, calendars, and overlapping times. Use explicit combine logic when metadata differ; never drop conflicts merely to make concatenation succeed.
