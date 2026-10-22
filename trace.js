/* The line under the header: a new Gaussian process sample every time a page loads.
 *
 * Model. A stationary Whittle–Matérn process whose smoothness ν is drawn uniformly
 * from (0, 2) on each load. It is sampled as a random Fourier series on a circle of
 * circumference 2, of which the line shows one half (so its two ends are independent
 * rather than forced to meet):
 *
 *     f(x) = Σ_{k=1}^{K} σ_k (ξ_k cos(ω_k x) + η_k sin(ω_k x)),     x ∈ [0, 1],
 *     ω_k = πk,   σ_k² = (κ² + ω_k²)^(−(ν + 1/2)),   κ = √(2ν) / ℓ,
 *     ξ_k, η_k independent N(0, 1).
 *
 * σ_k² is the Matérn spectral density, so sample paths are Hölder-continuous of every
 * order below ν: rough and fractal near 0, once differentiable above 1. K is matched
 * to the number of plotted points, so cutting the series off there makes no visible
 * difference. The k = 0 (constant) term is dropped, as the line is rescaled to fill
 * its strip anyway.
 *
 * To fix ν, add it to a page's address, e.g.  .../index.html?nu=0.25
 * Hovering over the line shows the value of ν used for the current sample.
 *
 * Without JavaScript, the static line in images/trace.svg is shown instead.
 */
(function () {
  'use strict';

  var LENGTH_SCALE = 0.07;   // ℓ, as a fraction of the line's width
  var HEIGHT = 40;           // drawing height in SVG units (the CSS sets the real size)
  var PAD = 3;

  // Hide the static fallback line until the new one replaces it, so it never flashes.
  var hide = document.createElement('style');
  hide.textContent = 'img.trace { visibility: hidden; }';
  document.head.appendChild(hide);

  // Standard normal via the Box–Muller transform.
  function gaussian() {
    var u = 1 - Math.random();
    var v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function chooseNu() {
    var m = /[?&]nu=([0-9]*\.?[0-9]+)/.exec(window.location.search);
    var forced = m ? parseFloat(m[1]) : NaN;
    if (forced >= 0 && forced <= 10) return forced;
    return 5 * Math.random();
  }

  // Values of one sample path at n equally spaced points of [0, 1].
  function samplePath(nu, n) {
    var K = n;
    var kappa2 = 2 * nu / (LENGTH_SCALE * LENGTH_SCALE);
    var a = new Float64Array(K + 1);
    var b = new Float64Array(K + 1);
    for (var k = 1; k <= K; k++) {
      var w = Math.PI * k;
      var sd = Math.pow(kappa2 + w * w, -(nu + 0.5) / 2);
      a[k] = sd * gaussian();
      b[k] = sd * gaussian();
    }
    var f = new Float64Array(n);
    for (var j = 0; j < n; j++) {
      var theta = Math.PI * j / (n - 1);          // ω_1 x_j
      var c1 = Math.cos(theta), s1 = Math.sin(theta);
      var c = c1, s = s1, sum = 0;                  // cos(kθ), sin(kθ), built up by rotation
      for (k = 1; k <= K; k++) {
        sum += a[k] * c + b[k] * s;
        var cNext = c * c1 - s * s1;
        s = s * c1 + c * s1;
        c = cNext;
      }
      f[j] = sum;
    }
    return f;
  }

  function drawInPlaceOf(img) {
    var nu = chooseNu();
    var width = img.getBoundingClientRect().width || 1000;
    var n = Math.max(200, Math.min(900, Math.round(width / 1.25)));   // about one point per 1.25 px
    var f = samplePath(nu, n);

    var lo = Infinity, hi = -Infinity;
    for (var j = 0; j < n; j++) { lo = Math.min(lo, f[j]); hi = Math.max(hi, f[j]); }
    var scale = hi > lo ? (HEIGHT - 2 * PAD) / (hi - lo) : 0;

    var d = '';
    for (j = 0; j < n; j++) {
      var x = 1000 * j / (n - 1);
      var y = PAD + (hi - f[j]) * scale;
      d += (j ? ' L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(2);
    }

    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', img.getAttribute('class'));
    svg.setAttribute('viewBox', '0 0 1000 ' + HEIGHT);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.display = 'block';
    svg.style.overflow = 'visible';

    var title = document.createElementNS(NS, 'title');
    title.textContent = 'Gaussian process sample, Matérn smoothness ν = ' + nu.toFixed(2);

    var path = document.createElementNS(NS, 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-width', '1.3');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('vector-effect', 'non-scaling-stroke');
    path.style.stroke = 'var(--accent)';

    svg.appendChild(title);
    svg.appendChild(path);
    svg.dataset.nu = nu.toFixed(4);
    img.parentNode.replaceChild(svg, img);
  }

  function init() {
    try {
      var imgs = document.querySelectorAll('img.trace');
      for (var i = 0; i < imgs.length; i++) drawInPlaceOf(imgs[i]);
    } finally {
      hide.parentNode && hide.parentNode.removeChild(hide);   // if anything failed, the static line shows
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
