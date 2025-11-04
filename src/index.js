import { arcgisMap } from "./lib/arcgis-map.js";

export class GeocamViewerArcgisMap extends HTMLElement {
  constructor() {
    super();
    this.plugin = null;
    console.log("GeocamViewerArcgisMap init");
  }

  connectedCallback() {
    const host = this.closest("geocam-viewer");
    if (!host) {
      console.error("GeocamViewerArcgisMap must be a child of GeocamViewer");
      return;
    }

    const ensureViewer = (callback) => {
      const viewer = host.viewer;
      if (viewer && typeof viewer.plugin === "function") {
        callback(viewer);
      } else {
        setTimeout(() => ensureViewer(callback), 50);
      }
    };

    this.link = (mapView) => {
      console.log("linking to ", mapView);
      const src = this.getAttribute("src");
      if (!src) console.warn("No src attribute on geocam-viewer-arcgis-map");

      ensureViewer((viewer) => {
        if (this.plugin) {
          return;
        }
        this.viewer = viewer;
        this.mapView = mapView;
        const prevnext = host.querySelector("geocam-viewer-prev-next-control");
        const prevNextPlugin = prevnext && prevnext.plugin;
        this.plugin = new arcgisMap({ mapView, prevNextPlugin, src });
        this.viewer.plugin(this.plugin);
        const screenShot = host.querySelector("geocam-viewer-screen-shot");
        if (screenShot && screenShot.plugin) {
          screenShot.plugin.arcgisView(mapView);
        }
      });
    };
    console.log("GeocamViewerArcgisMap connected");
  }

  disconnectedCallback() {
    this.plugin = null;
    this.viewer = null;
    this.mapView = null;
    console.log("GeocamViewerArcgisMap disconnected");
    // Clean up the viewer
  }
}

window.customElements.define("geocam-viewer-arcgis-map", GeocamViewerArcgisMap);
