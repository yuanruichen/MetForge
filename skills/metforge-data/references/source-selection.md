# Atmospheric data source selection

Use this reference when the user has specified a scientific variable but not a trustworthy product or access route. Product catalogs and APIs change; verify current details with the provider's official documentation before writing a full request.

| Need | Prefer | Typical access | Check before use |
|---|---|---|---|
| Global atmospheric reanalysis | ECMWF ERA5/ERA5-Land via Copernicus CDS | CDS API | dataset name, stream, forecast accumulations, expver, request limits |
| Global NASA reanalysis | MERRA-2 via NASA GES DISC | Earthdata/OPeNDAP/HTTPS | collection version, authentication, variable collection |
| Multi-model climate simulations | CMIP through ESGF | ESGF search/HTTP/OPeNDAP | experiment, table, grid label, variant label, version |
| Satellite precipitation | GPM IMERG via NASA Earthdata | HTTPS/OPeNDAP/cloud | product level, early/late/final run, half-hourly accumulation semantics |
| NOAA observations/reanalysis | NOAA PSL, NCEI, or NODD | HTTPS/OPeNDAP/cloud | operational versus fixed archive, update status, time convention |
| Satellite OLR and convection proxies | NOAA/NCEI or product owner | HTTPS/OPeNDAP | interpolation, temporal averaging, missing periods |
| Regional or institution-specific analysis | Product owner's archive | documented native client/API | native grid, assimilation cycle, license, citation |

## Selection rules

1. Match the product to the scientific question, not only to variable availability.
2. Prefer the product owner or an official mirror with versioned metadata.
3. Prefer fixed, citable products for reproducible research; mark near-real-time products clearly.
4. Avoid combining products until grid, calendar, sampling, and variable definitions have been reconciled.
5. For model evaluation, do not treat reanalysis uncertainty as zero. Preserve source resolution and note any common-grid transformation.
6. When multiple products are scientifically defensible, compare their resolution, assimilation/observing basis, latency, temporal coverage, and known discontinuities before choosing.

## Access safety

- Never place passwords, tokens, `.cdsapirc`, `.netrc`, or Earthdata cookies in committed files.
- Respect provider quotas and terms. Use conservative batching and retry behavior.
- Do not bypass authentication or redistribution restrictions.
- Save the official dataset landing page and retrieval date in the manifest.
