---
name: metforge-data
description: Acquire and prepare atmospheric, climate, and Earth-system datasets reproducibly. Use when Codex needs to find an authoritative dataset, choose among ERA5/CMIP/GPM/MERRA-2/NOAA or similar products, download or subset NetCDF/GRIB/Zarr data, write CDS/Earthdata/ESGF/OPeNDAP acquisition code, inspect coordinates and metadata, estimate request size, preserve raw inputs, or create a provenance manifest for later analysis. Also use for xarray/dask preprocessing when data acquisition and dataset integrity are central to the task.
---

# MetForge Data

Obtain the smallest scientifically sufficient dataset, preserve the source product, and leave an auditable path from request to local files.

## Workflow

1. Define the data contract before downloading:
   - scientific variable and accepted source variable names
   - product, processing level, experiment/member, or reanalysis stream
   - spatial domain, grid, vertical coordinate, time range, and frequency
   - units, calendar, accumulation convention, and expected volume
   - required credentials, license, and citation
2. Inspect existing files and project conventions. Reuse valid local data instead of downloading duplicates.
3. Select an authoritative source. Read [references/source-selection.md](references/source-selection.md) when the source or access route is uncertain. Verify current API syntax against official documentation; do not invent product identifiers.
4. Plan a restartable request:
   - subset at the server when scientifically safe
   - batch large requests by year, month, variable, or level
   - keep credentials outside scripts and version control
   - keep raw files immutable
5. Download one representative batch first. Do not launch the full request until the sample passes the checks below.
6. Validate the sample, then scale out. Use lazy xarray/dask operations for large collections and reduce before materializing arrays.
7. Record provenance. Follow [references/dataset-contract.md](references/dataset-contract.md) for the manifest and handoff fields.

## Validation gate

Check at least:

- requested variables and actual units
- dimension names, sizes, and coordinate ordering
- latitude direction and longitude convention
- time coverage, cadence, calendar, and duplicated/missing timestamps
- pressure-level ordering or hybrid-coordinate metadata
- fill values, missing-data fraction, and plausible numeric range
- accumulation versus instantaneous fields
- sample spatial plot or summary statistics when they can reveal a wrong product

Treat a successful HTTP response as transport success, not scientific validation.

## File behavior

- Follow existing project paths. If none exist, use `data/raw/` for source files, `data/processed/` for derived products, and `data/manifests/` for request/provenance records.
- Never overwrite source data in place.
- Prefer scripts or request manifests over one-off opaque commands for non-trivial acquisitions.
- Keep output chunks and compression compatible with the dominant access pattern.
- Do not silently regrid, interpolate, convert calendars, or change units. Record every such transformation.

## Handoff

Return:

- files obtained or the exact executable request script
- source/product and stable documentation link
- contract fields and deviations
- sample validation results
- expected versus actual size
- any credentials, quota, or access blocker
- the next processing step only when requested
