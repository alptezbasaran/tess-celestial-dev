import "./style.scss";

const ipearlVideoConfig = {
  title: "iPearl",
  researcherName: "Alp Tezbasaran",
  description: "Landcover timeline visualization for the iPearl custom screen.",
  sideLinksIntro: "Explore project resources and support:",
  sideLinks: [
    { label: "Data Visualization Services (DVS)", url: "https://www.lib.ncsu.edu/staff/department/data-visualization-services" },
    { label: "Get Data Help", url: "https://www.lib.ncsu.edu/getdatahelp" },
  ],
  logoPath: "./assets/nc-state-libraries-logo.svg",
  logoAlt: "NC State University Libraries",
  logoUrl: "https://www.lib.ncsu.edu/",
  videoPath: "./assets/landcover_alternating.mp4",
};

const renderIpearlVideoScreen = function () {
  const mainContainer = document.querySelector(".main-container");
  const matrix = document.querySelector(".matrix");
  const sidebarBrand = document.querySelector(".sidebar-brand");
  const mainTitle = document.querySelector(".main-title");
  const researcherName = document.querySelector(".researcher-name");
  const mainDesc = document.querySelector(".main-desc");
  const mainUrl = document.querySelector(".main-url");

  if (
    !mainContainer ||
    !matrix ||
    !sidebarBrand ||
    !mainTitle ||
    !researcherName ||
    !mainDesc ||
    !mainUrl
  ) {
    return;
  }

  mainContainer.classList.add("video-only-layout");
  matrix.classList.add("ipearl-video-stage");

  mainTitle.textContent = ipearlVideoConfig.title;
  researcherName.textContent = ipearlVideoConfig.researcherName;
  mainDesc.textContent = ipearlVideoConfig.description;

  sidebarBrand.innerHTML = `
    <a class="sidebar-brand-link" href="${ipearlVideoConfig.logoUrl}" target="_blank" rel="noopener noreferrer">
      <img class="sidebar-brand-logo" src="${new URL(ipearlVideoConfig.logoPath, import.meta.url).href}" alt="${ipearlVideoConfig.logoAlt}" />
    </a>
  `;

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
