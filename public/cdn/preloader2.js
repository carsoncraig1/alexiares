const urlParams = new URLSearchParams(window.location.search);
const utmXXX = urlParams.get("xxx");
const s = urlParams.get("s");
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const lander = `https://klcxb6.mcgo2.com/visit/de9fa2b0-1366-489a-be81-3b73f541059f?s1=${s}`;
if (utmXXX === "__PLACEMENT__") { }
else if (isMobileDevice) { window.location.href = lander; } 
else { }
