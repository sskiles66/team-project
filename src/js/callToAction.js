let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;
console.log(numVisits);

let closeBtn = document.getElementById("banner-btn");
let banner = document.getElementById("banner");

function toggleBanner() {
  banner.classList.toggle("close");
}

closeBtn.addEventListener("click", toggleBanner);

toggleBanner();

if (numVisits == 0) {
  toggleBanner();
}

numVisits++;
localStorage.setItem("numVisits-ls", numVisits);
