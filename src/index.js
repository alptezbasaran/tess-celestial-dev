import "./style.scss";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature, mesh } from "topojson-client";
import counties10m from "us-atlas/counties-10m.json";

const ipearlVideoConfig = {
  title: "Get Map Help!",
  researcherName: "North Carolina Is Urbanizing",
  descriptionIntro: "Do you need help with",
  descriptionItems: [
    "Mapping,",
    "Finding spatiotemporal data,",
    "Geospatial analysis,",
    "GIS projects,",
  ],
  descriptionOutro:
    "Data Science Services can answer questions and help you with data science topics.",
  descriptionContact: "Contact Us for Data Help",
  qrPath: "./assets/getdatahelp-qr.svg",
  qrAlt: "Get Data Help QR code",
  logoPath: "./assets/lib_logo_black_white_v2.svg",
  logoAlt: "NC State University Libraries",
  logoUrl: "https://www.lib.ncsu.edu/",
  videoPath: "./assets/landcover_alternating.mp4",
};

const getNcGeometries = function () {
  const counties = feature(counties10m, counties10m.objects.counties).features;
  const states = feature(counties10m, counties10m.objects.states).features;

  const ncCounties = counties.filter((county) =>
    String(county.id).padStart(5, "0").startsWith("37")
  );
  const ncState = states.find(
    (state) => String(state.id).padStart(2, "0") === "37"
  );
  const ncCountyBorders = mesh(
    counties10m,
    counties10m.objects.counties,
    (a, b) =>
      a &&
      b &&
      String(a.id).padStart(5, "0").startsWith("37") &&
      String(b.id).padStart(5, "0").startsWith("37")
  );

  return { ncCounties, ncState, ncCountyBorders };
};

const createNcBarArtSvg = function (width, height, variant = "top") {
  const svgNs = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNs, "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(height));
  svg.setAttribute("aria-hidden", "true");

  const { ncCounties, ncState, ncCountyBorders } = getNcGeometries();
  if (!ncState) {
    return svg;
  }

  const projection = geoAlbersUsa();
  const path = geoPath(projection);
  const padding = Math.max(8, height * 0.1);
  projection.fitExtent(
    [
      [padding, padding],
      [width - padding, height - padding],
    ],
    ncState
  );

  const countyLinesD =
    path({
      type: "FeatureCollection",
      features: ncCounties,
    }) || "";
  const borderLinesD = path(ncCountyBorders) || "";

  const cx = width / 2;
  const cy = height / 2;
  const rotation = variant === "top" ? -8 : 8;

  const appendMeshLayer = function (transform, opacity, strokeWidth) {
    const layerGroup = document.createElementNS(svgNs, "g");
    layerGroup.setAttribute("transform", transform);
    layerGroup.setAttribute("opacity", String(opacity));

    const countiesPath = document.createElementNS(svgNs, "path");
    countiesPath.setAttribute("d", countyLinesD);
    countiesPath.setAttribute("fill", "none");
    countiesPath.setAttribute("stroke", "#dcdcdc");
    countiesPath.setAttribute("stroke-width", String(strokeWidth * 0.75));
    countiesPath.setAttribute("vector-effect", "non-scaling-stroke");

    const bordersPath = document.createElementNS(svgNs, "path");
    bordersPath.setAttribute("d", borderLinesD);
    bordersPath.setAttribute("fill", "none");
    bordersPath.setAttribute("stroke", "#dcdcdc");
    bordersPath.setAttribute("stroke-width", String(strokeWidth));
    bordersPath.setAttribute("vector-effect", "non-scaling-stroke");

    layerGroup.appendChild(countiesPath);
    layerGroup.appendChild(bordersPath);
    svg.appendChild(layerGroup);
  };

  // Overscale, then repeat across the width so bars are fully covered.
  const xOffsets = [-0.8 * width, -0.4 * width, 0, 0.4 * width, 0.8 * width];
  xOffsets.forEach((xOffset) => {
    appendMeshLayer(
      `translate(${cx + xOffset} ${cy}) rotate(${rotation}) scale(2.15) translate(${-cx} ${-cy})`,
      0.42,
      1.26
    );
  });
  xOffsets.forEach((xOffset) => {
    appendMeshLayer(
      `translate(${cx + xOffset + width * 0.08} ${cy * 0.95}) rotate(${rotation - 6}) scale(2.55) translate(${-cx} ${-cy})`,
      0.24,
      1.0
    );
  });
  return svg;
};

const renderIpearlVideoScreen = function () {
  const mainContainer = document.querySelector(".main-container");
  const matrix = document.querySelector(".matrix");
  const mainTitle = document.querySelector(".main-title");
  const researcherName = document.querySelector(".researcher-name");
  const mainDesc = document.querySelector(".main-desc");
  const mainUrl = document.querySelector(".main-url");

  if (
    !mainContainer ||
    !matrix ||
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
  mainDesc.innerHTML = `
    <p class="main-desc-intro">${ipearlVideoConfig.descriptionIntro}</p>
    <ul class="main-desc-list">
      ${ipearlVideoConfig.descriptionItems
        .map((item) => `<li>${item}</li>`)
        .join("")}
    </ul>
    <p class="main-desc-outro">${ipearlVideoConfig.descriptionOutro}</p>
    <p class="main-desc-contact">${ipearlVideoConfig.descriptionContact}</p>
  `;

  mainUrl.innerHTML = `
    <div class="sidebar-qr-row">
      <img class="sidebar-qr" src="${new URL(ipearlVideoConfig.qrPath, import.meta.url).href}" alt="${ipearlVideoConfig.qrAlt}" />
      <a class="sidebar-qr-link" href="https://go.ncsu.edu/getdatahelp" target="_blank" rel="noopener noreferrer">go.ncsu.edu/getdatahelp</a>
    </div>
    <a class="sidebar-logo-link" href="${ipearlVideoConfig.logoUrl}" target="_blank" rel="noopener noreferrer">
      <img class="sidebar-logo" src="${new URL(ipearlVideoConfig.logoPath, import.meta.url).href}" alt="${ipearlVideoConfig.logoAlt}" />
    </a>
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

  const barArtLayer = document.createElement("div");
  barArtLayer.className = "nc-bar-art-layer";
  const topBarArt = document.createElement("div");
  topBarArt.className = "nc-bar-art-band top";
  const bottomBarArt = document.createElement("div");
  bottomBarArt.className = "nc-bar-art-band bottom";
  barArtLayer.appendChild(topBarArt);
  barArtLayer.appendChild(bottomBarArt);

  const renderBarArt = function () {
    const width = Math.round(mainContainer.clientWidth);
    const matrixWidth = Math.round(matrix.clientWidth);
    const height = Math.round(matrix.clientHeight);
    const videoRatio =
      video.videoWidth > 0 && video.videoHeight > 0
        ? video.videoWidth / video.videoHeight
        : 16 / 9;

    if (!width || !matrixWidth || !height || !videoRatio) {
      return;
    }

    const contentHeight = Math.min(height, matrixWidth / videoRatio);
    const barHeight = Math.max(0, Math.floor((height - contentHeight) / 2));
    if (barHeight < 24) {
      topBarArt.replaceChildren();
      bottomBarArt.replaceChildren();
      return;
    }

    topBarArt.style.height = `${barHeight}px`;
    bottomBarArt.style.height = `${barHeight}px`;
    topBarArt.replaceChildren(createNcBarArtSvg(width, barHeight, "top"));
    bottomBarArt.replaceChildren(createNcBarArtSvg(width, barHeight, "bottom"));
  };

  video.addEventListener("loadedmetadata", renderBarArt);
  window.addEventListener("resize", renderBarArt);

  frame.appendChild(video);
  matrix.replaceChildren(frame);
  mainContainer.appendChild(barArtLayer);
  renderBarArt();
};

renderIpearlVideoScreen();
