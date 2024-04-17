import { arcgisMap } from "./lib/arcgis-map.js";

export class GeocamViewerArcgisMap extends HTMLElement {
  constructor() {
    super();
    this.plugin = null;
    console.log("GeocamViewerArcgisMap init");
  }

  connectedCallback() {
    this.link = function (mapView) {
      console.log("linking to ", mapView);

      const parent = this.parentNode;
      if (parent.viewer && parent.viewer.plugin) {
        const prevnext = document.getElementsByTagName(
          "geocam-viewer-prev-next-control"
        )[0];
        const prevNextPlugin = prevnext && prevnext.plugin;
        this.plugin = new arcgisMap({ mapView, prevNextPlugin });
        parent.viewer.plugin(this.plugin);
      } else {
        console.error(
          "GeocamViewerCompassNeedle must be a child of GeocamViewer"
        );
      }
    };
    console.log("GeocamViewerArcgisMap connected");
  }

  disconnectedCallback() {
    this.plugin = null;
    console.log("GeocamViewerArcgisMap disconnected");
    // Clean up the viewer
  }
}

window.customElements.define("geocam-viewer-arcgis-map", GeocamViewerArcgisMap);
