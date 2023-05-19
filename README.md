# Arcgis Map
A connector for the geocam-viewer.
### NPM Installation:
```
npm install 'https://gitpkg.now.sh/geocamxyz/connector-arcgis-map/src?v1.0.0'
```
or for a particual commit version:
```
npm install 'https://gitpkg.now.sh/geocamxyz/connector-arcgis-mapsrc?ecade5a'
```
### Import Map (External Loading):
```
https://cdn.jsdelivr.net/gh/geocamxyz/connector-arcgis-map@v1.0.0/dist/arcgis-map.js
```
or for a particual commit version:
```
https://cdn.jsdelivr.net/gh/geocamxyz/connector-arcgis-map@ecade5a/dist/arcgis-map.js
```
### Usage:
The .js file can be imported into your .html file using the below code (This can be ignored if your using the NPM package).
```
<script type="importmap">
  {
    "imports": {
      "arcgis-map": "https://cdn.jsdelivr.net/gh/geocamxyz/connector-arcgis-map@v1.0.0/dist/arcgis-map.js"
    }
  }
</script>
```
The connector can be imported via a module script or using the npm package and using the below import statement.
```
import { arcgisScene } from "arcgis-map"
```
### Setup:
The connector can be setup using the below code. It requires a map element which has the following layout 
```
<div class="wrapper">
  <div id="map" class="map" />
</div>
```
We get that scene element and use it in the archisScene.
```
const mapElement = document.getElementById("map");
scenePromise.then((sceneView) => {
      if (sceneView) {
        sceneView.when(() => {
          viewer.plugin(
            new arcgisScene({
              sceneElement,
              // Plugins
            })
          ); //
        });
      }
    });
});
```