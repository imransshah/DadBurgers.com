// Applies a saved light/dark override before first paint. No override = follow the OS.
try {
  var t = localStorage.getItem("ckb-theme");
  if (t === "light" || t === "dark") document.documentElement.dataset.theme = t;
} catch (e) {}
