import "./style.scss";

const ipearlVideoConfig = {
  title: "iPearl",
  researcherName: "Alp Tezbasaran",
  description: "Landcover timeline visualization for the iPearl custom screen.",
  sideLinksIntro: "Explore project resources:",
  sideLinks: [
    { label: "Data Visualization Services (DVS)", url: "https://www.lib.ncsu.edu/staff/department/data-visualization-services" },
    { label: "Immersive Scholar", url: "https://www.immersivescholar.org/" },
  ],
  videoPath: "./assets/landcover_alternating.mp4",
};

const renderIpearlVideoScreen = function () {
  const matrix = document.querySelector(".matrix");
  const mainTitle = document.querySelector(".main-title");
  const researcherName = document.querySelector(".researcher-name");
  const mainDesc = document.querySelector(".main-desc");
  const mainUrl = document.querySelector(".main-url");

  if (!matrix || !mainTitle || !researcherName || !mainDesc || !mainUrl) {
    return;
  }

  matrix.classList.add("ipearl-video-stage");

  mainTitle.textContent = ipearlVideoConfig.title;
  researcherName.textContent = ipearlVideoConfig.researcherName;
  mainDesc.textContent = ipearlVideoConfig.description;

  const linksMarkup = ipearlVideoConfig.sideLinks
    .map((link) => `<li><a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a></li>`)
    .join("");

  mainUrl.innerHTML = `
    <span>${ipearlVideoConfig.sideLinksIntro}</span>
    <ul class="main-url-list">${linksMarkup}</ul>
  `;

  const frame = document.createElement("div");
  frame.className = "ipearl-video-frame";
  const video = document.createElement("video");
  video.className = "ipearl-video";
  video.src = new URL(ipearlVideoConfig.videoPath, import.meta.url).href;
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.controls = false;

  frame.appendChild(video);
  matrix.replaceChildren(frame);
};

renderIpearlVideoScreen();
