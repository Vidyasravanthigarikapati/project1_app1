// Initialize the map
var map = L.map('map').setView([41.8781, -87.6298], 11);

// Add base map tiles (dark)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Custom rat icon
var ratIcon = L.icon({
  iconUrl: 'http://maptimeboston.github.io/leaflet-intro/rat.gif',
  iconSize: [40, 30]
});

// Chicago neighborhoods (polygons)
$.getJSON("https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%201/Assignment%201/data/chicago.geojson", function(data) {
  L.geoJson(data, {
    style: { color: "purple", weight: 2, fillOpacity: 0.2 },
    onEachFeature: function(feature, layer) {
      layer.bindPopup(
        "<b>Neighborhood:</b> " + (feature.properties.community || "N/A")
      );
    }
  }).addTo(map);
});

// Rodent complaints (points, limit 1000 for speed)
$.getJSON("https://data.cityofchicago.org/resource/97t6-zrhs.geojson?$limit=1000", function(data) {
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, { icon: ratIcon })
        .bindPopup(
          "<b>Rodent Complaint</b><br>" +
          "ID: " + (feature.properties.service_request_number || "Unknown")
        );
    }
  }).addTo(map);
});

// extra geojsonrodents , Load rodents.geojson (rodent sightings)
$.getJSON("https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%201/Assignment%201/data/rodents.geojson", function(data) {
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, { icon: ratIcon })
        .bindPopup(
          "<b>Rodent Report</b><br>" +
          "Report ID: " + (feature.properties.SR_NUMBER || "Unknown")
        );
    }
  }).addTo(map);
});

// --- Add Legend ---
var legend = L.control({ position: "bottomright" });
legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "info legend");
  div.innerHTML += "<h4>Legend</h4>";
  div.innerHTML += '<i style="background:purple; width:12px; height:12px; display:inline-block; margin-right:5px;"></i> Neighborhoods<br>';
  div.innerHTML += '<img src="http://maptimeboston.github.io/leaflet-intro/rat.gif" style="width:20px; margin-right:5px;"> Rodent Data<br>';
  return div;
};
legend.addTo(map);

// --- Add Title ---
var title = L.control({ position: "topright" });
title.onAdd = function(map) {
  var div = L.DomUtil.create("div", "map-title");
  div.innerHTML = "<h3 style='margin:0; padding:5px; background:black; color:white; border-radius:5px;'>Chicago Rodent Activity Map</h3>";
  return div;
};
title.addTo(map);
