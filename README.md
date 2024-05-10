# Arcgis Map
A connector for the geocam-viewer to tie it to a shots feature layer displayed on an arcgis webmap
### NPM Installation:
```
npm install 'https://gitpkg.now.sh/geocamxyz/connector-arcgis-map/src?v2.0.3'
```
or for a particual commit version:
```
npm install 'https://gitpkg.now.sh/geocamxyz/connector-arcgis-mapsrc?ecade5a'
```
### Import Map (External Loading):
```
https://cdn.jsdelivr.net/gh/geocamxyz/connector-arcgis-map@v2.0.3/dist/arcgis-map.js
```
or for a particual commit version:
```
https://cdn.jsdelivr.net/gh/geocamxyz/connector-arcgis-map@ecade5a/dist/arcgis-map.js
```
### Usage:
The .js file can be imported into your .html file using the below code (This can be ignored if your using the NPM package).
```
 <script type="module" src="https://cdn.jsdelivr.net/gh/geocamxyz/connector-arcgis-map@2.0.3/dist/arcgis-map.js"></script>
 ```

 Or with an importmap
 ```
<script type="importmap">
  {
    "imports": {
      "geocam-viewer": "https://cdn.jsdelivr.net/gh/geocamxyz/connector-arcgis-map@2.0.3/dist/arcgis-map.js"
    }
  }
</script>
```
The viewer can then be imported via a module script or using the npm package and using the below import statement.
```
import "arcgis-map"
```
### Setup:
The connector can be setup using the below code. It requires the [geocamxyz/geocam-viewer]https://github.com/geocamxyz/geocam-viewer custom tag as the parent element.  There also needs to be a arcgis map created which calls the connectors link method with the mapview to correctly complete initialization.
```
<geocam-viewer>
  <geocam-viewer-arcgis-map src="/arcgis/rest/services/0wlsvpg_3/FeatureServer"></geocam-viewer-arcgis-map>
</geocam-viewer>
<div id="map"></div>
```
At some point in the javascript which generates the map...
```
  const mapElement = document.getElementById("map");
  const map = new EsriMap({basemap: "satellite"});
  view = new MapView({
    container: mapElement,
    map: map,
   });
  const connector = document.getElementsByTagName("geocam-viewer-arcgis-map")[0];
  connector.link(view);

```
The arcgis-map connector has a single attibute:
- src *the geocam manager feature layer for the shots and features which can be copie from the relevant cell/workflow in manager*

The src attribute is readonly.  Once instantiated changing the src attribute will not change the shots associatd with the map.