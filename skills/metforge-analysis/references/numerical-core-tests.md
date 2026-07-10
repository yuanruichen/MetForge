# Numerical-core test map

Choose tests by the numerical property under examination. A larger test suite is not automatically more informative.

| Test family | Primary property | Core diagnostics | Common confounders |
|---|---|---|---|
| Uniform advection | transport accuracy and tracer preservation | norm convergence, phase, extrema, tracer mass, shape | temporal error, limiter activation, boundary wrap |
| Deformational transport | reversibility and filament preservation | return error, mixing/overshoot, spectra | interpolation and limiter choices |
| Balanced/geostrophic flow | balance preservation and metric/Coriolis consistency | cross-flow growth, height/pressure drift, balance residual, spectra | inconsistent initialization, boundary forcing |
| Flat hydrostatic rest | pressure-gradient/hydrostatic cancellation | vertical velocity, pressure/temperature drift, column mass | thermodynamic inconsistency, solver tolerance |
| Mountain hydrostatic rest | terrain-coordinate pressure-gradient error | spurious winds, vertical motion, resolution dependence | terrain smoothing, boundary relaxation |
| Density current (Straka) | nonhydrostatic dynamics and diffusion | front position, cold-pool depth, extrema, symmetry, reference contours | viscosity, grid staggering, output interpolation |
| Acoustic/gravity wave | dispersion, phase speed, damping | phase/amplitude error, spectra, convergence | boundary reflection, mode initialization |
| Mountain wave | terrain forcing and vertical propagation | wavelength, amplitude, momentum flux, reflection | sponge layer, hydrostatic regime, top boundary |
| Baroclinic wave | multiscale nonlinear evolution | growth rate, phase, energy conversion, fronts, ensemble spread | chaotic divergence, moist/physics differences |
| Restarts/decomposition | reproducibility and parallel exchanges | bitwise/statistical difference, conservation, halo artifacts | reduction order, I/O precision, different libraries |

## Balanced-flow diagnosis

Do not rely on only maximum and minimum values. Pair them with:

- RMS and bias of the balanced and cross-flow components
- geostrophic/hydrostatic residuals
- error maps at early, intermediate, and late times
- zonal/meridional kinetic-energy partition
- dominant wavenumber or spectrum of the emerging error
- drift slopes after the initial adjustment

If the cross-flow component grows while total RMS remains small, diagnose orientation/phase and modal content before declaring the solution acceptable.

## Sensitivity matrix

Run the smallest matrix that separates hypotheses. Examples:

- resolution × fixed small timestep: spatial behavior
- timestep × fixed fine grid: temporal behavior
- MPI layout × identical grid/timestep: decomposition sensitivity
- precision × identical setup: round-off contribution
- solver tolerance × identical setup: iterative error
- domain size × fixed physical resolution: boundary/mode selection

Avoid changing resolution and timestep together unless testing an operational Courant-number strategy; such runs cannot independently identify spatial and temporal error.
