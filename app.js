// Initialize the map using Leaflet
const map = L.map('map').setView([37.8, -96], 4); // Adjust coordinates and zoom as needed

// Add a base layer (using OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

// (Optional) Load your geo-data (e.g., GeoJSON) to display a choropleth map
// For example, if you have a file "data.geojson" in your repository:
// fetch('data.geojson')
//   .then(response => response.json())
//   .then(data => {
//     L.geoJson(data, {
//       style: function(feature) {
//         return {
//           fillColor: '#ff7800',
//           weight: 2,
//           opacity: 1,
//           color: 'white',
//           dashArray: '3',
//           fillOpacity: 0.7
//         };
//       }
//     }).addTo(map);
//   });

// Handle the survey button click
document.getElementById('survey-btn').addEventListener('click', function() {
  // Prepare the data you want to send
  const data = {
    user_id: 'anonymous', // You could generate a unique ID if needed
    response: 'noticed change',
    timestamp: new Date().toISOString()
  };

  // Replace the URL below with your deployed backend URL on Render
  fetch('https://change-blindness-study.onrender.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    console.log('Response saved:', result);
    alert('Thank you for your response!');
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was an error submitting your response.');
  });
});

