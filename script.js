// Initialize the map
var map = L.map('map').setView([41.8781, -87.6298], 11);

// Add base map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
    style: { color: "blue", weight: 2, fillOpacity: 0.1 },
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Neighborhood: " + (feature.properties.community || "N/A"));
    }
  }).addTo(map);
});

// Rodent complaints (points, limit 1000 for speed)
$.getJSON("https://data.cityofchicago.org/resource/97t6-zrhs.geojson?$limit=1000", function(data) {
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, { icon: ratIcon })
        .bindPopup("Rodent Complaint ID: " + (feature.properties.service_request_number || "Unknown"));
    }
  }).addTo(map);
});

// Load rodents.geojson (rodent sightings)
$.getJSON("https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%201/Assignment%201/data/rodents.geojson", function(data) {
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, { icon: ratIcon })
        .bindPopup("Rodent Report ID: " + (feature.properties.SR_NUMBER || "Unknown"));
    }
  }).addTo(map);
});