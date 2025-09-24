const openBtn = document.getElementById("openBtn");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");

openBtn.onclick = () => popup.style.display = "block";
closeBtn.onclick = () => popup.style.display = "none";
window.onclick = (e) => { if(e.target === popup) popup.style.display = "none"; };
