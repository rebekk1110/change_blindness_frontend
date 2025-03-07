<script>
  import { onMount } from "svelte";
  import L from "leaflet";

  export let level;
  export let participantId; 
  let map, geojsonLayer;
  let changingLayers = [];
  let mainFeatureLayer = null;
  let countdown = 3;
  let showCountdown = false;
  let animationStarted = false;

  let changeCondition = "No change";  // Default value for each level
  console.log("Received participantId:", participantId);


  function getColor(color_id) {
    return color_id === 1 ? "#D3D3D3" : color_id === 2 ? "#A9A9A9" : "#696969";
  }

  function getGeoJSONUrl(level) {
    return `${import.meta.env.BASE_URL}map${level}.geojson`;
  }

  function interpolateColor(color1, color2, progress) {
    const hex = (color) => parseInt(color.slice(1), 16);
    const r1 = (hex(color1) >> 16) & 0xff,
          g1 = (hex(color1) >> 8) & 0xff,
          b1 = hex(color1) & 0xff;
    const r2 = (hex(color2) >> 16) & 0xff,
          g2 = (hex(color2) >> 8) & 0xff,
          b2 = hex(color2) & 0xff;

    return `#${((1 << 24) + (Math.round(r1 + (r2 - r1) * progress) << 16) + 
                  (Math.round(g1 + (g2 - g1) * progress) << 8) + 
                  Math.round(b1 + (b2 - b1) * progress)).toString(16).slice(1)}`;
  }

  function animateFeatureColor(layer, startColor, endColor, duration, callback) {
    const startTime = performance.now();
    function step(currentTime) {
      let progress = (currentTime - startTime) / duration;
      if (progress > 1) progress = 1;
      const newColor = interpolateColor(startColor, endColor, progress);
      layer.setStyle({ fillColor: newColor });

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (callback) callback();
      }
    }
    requestAnimationFrame(step);
  }

  function getRandomGrayColor(excludeColor) {
    const grayColors = ["#D3D3D3", "#A9A9A9", "#696969"];
    return grayColors.filter(color => color !== excludeColor)[Math.floor(Math.random() * 2)];
  }

  function startCountdown() {
    if (animationStarted) {
        console.warn("⚠ Animation already started, ignoring click.");
        return;
    }
        
    animationStarted = true;
    showCountdown = true;
    
    console.log("⏳ Countdown started...");

    let interval = setInterval(() => {
        console.log(`⏳ Countdown: ${countdown}`);
        
        if (countdown > 1) {
            countdown -= 1;
        } else {
            clearInterval(interval);
            showCountdown = false;
            startColorChange();
        }
    }, 1000);
}

  function startColorChange() {
    
    if (changingLayers.length === 0) {
      console.warn("⚠ No changing features found!");
      return;
    }

    changingLayers.forEach(({ layer, startColor, endColor }) => {
      animateFeatureColor(layer, startColor, endColor, 2000);
    });

    setTimeout(() => {
      if (mainFeatureLayer) {
        addRedOutline(mainFeatureLayer);
      }
    }, 2200);
  }

  async function loadGeoJSON(level) {
    try {
      console.log(`🌍 Loading GeoJSON for level ${level}...`);
      let response = await fetch(getGeoJSONUrl(level));
      let data = await response.json();
      if (geojsonLayer) geojsonLayer.clearLayers();
      changingLayers = [];

      geojsonLayer = L.geoJSON(data, {
        style: feature => ({
          fillColor: getColor(feature.properties.color_id),
          weight: 1,
          color: "white",
          fillOpacity: feature.properties.changing ? 1.0 : 0.9
        }),
        onEachFeature: function (feature, layer) {
          if (feature.properties.changing) {
            changingLayers.push({ 
              layer, 
              startColor: getColor(feature.properties.color_id),
              endColor: getRandomGrayColor(getColor(feature.properties.color_id))
            });
          }
          if (feature.properties.mainFeature) {
            mainFeatureLayer = layer;
          }
        }
      }).addTo(map);


      map.fitBounds(geojsonLayer.getBounds());
    } catch (error) {
      console.error("❌ Error loading GeoJSON:", error);
    }
  }

  function addRedOutline(layer) {
    const bounds = layer.getBounds();
    L.rectangle(bounds, { color: "#FF0000", weight: 2, fillOpacity: 0 }).addTo(map);
  }
   // Randomly determine change condition (Change or No change)
   function assignChangeCondition() {
    changeCondition = Math.random() < 0.5 ? "Change" : "No change";
    console.log("Assigned change condition:", changeCondition);
  }

  function submitAnswer() {

    console.log("User answer:", userAnswer ? "Yes" : "No");
    console.log("True answer:", trueAnswer);

    const requestData = {
      participant_id: participantId,  // Ensure this is passed correctly
      question_id: level,  // Map level is used as the question ID
      change_condition: changeCondition,  // "Change" or "No change"
    };

    console.log("Data being sent to backend:", requestData);

    // Send the data to the backend using fetch
    fetch("https://change-blindness-web.onrender.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData)  // Send the data as JSON
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }

  onMount(() => {
    map = L.map("map", { zoomControl: false, attributionControl: false }).setView([0, 0], 2);
    loadGeoJSON(level);

    assignChangeCondition();

    document.addEventListener("resetAnimation", () => {
        console.log("🔄 Resetting animation button...");
        animationStarted = false;
        showCountdown = false;
        countdown = 3;
    });
});

  $: if (level) {
    console.log(`🔄 Level changed to ${level}, reloading GeoJSON.`);
    loadGeoJSON(level);
  }
</script>

<div class="map-container">
  <div id="map">
    {#if showCountdown}
      <p class="countdown-overlay">Color change in {countdown}...</p>
    {/if}
  
 
</div>
  <div class="description-container">
    <h3>Task Instructions</h3>
    <p>
      Carefully observe the map. Some regions may <strong>change color</strong>.  
      After the change, a <strong>red square</strong> will highlight one region.  
      Your task is to determine <strong>if that region changed color</strong>.  
    </p>
    <p class="warning-text">
      ⚠ <strong>Do not refresh the page</strong>, or you will have to restart the survey.
    </p>
    
  </div>
  <button class="start-animation-btn" 
  on:click={() => {
      console.log("🟢 Start Animation button clicked!"); 
      startCountdown();
  }} 
  disabled={animationStarted}>
   {animationStarted ? "Animation started" : "Start Animation"}
</button>
</div>
<style>
  .map-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  h3{
    margin-block-start: 0em;
    margin-block-end: 0em
  }

  #map {
    width: 600px;
    height: 400px;
    background: white;
    border-radius: 8px;
    position: relative;
  }
 .description-container {
    background: #eef1f6;
    padding: 20px;
    padding-left: 25px;
    padding-right: 25px;
    max-width: 580px;
    border-radius: 6px;
    margin-top: 10px;
    text-align: center;
    font-size: 14px;
    margin-bottom: 5px;
    font-size: 14px;
  } 
  .description-container p {
    max-width: 550px; /* Adjust as needed */
}



  .countdown-overlay {
    position: absolute;
    top: 90%;
    left: 20%;
    transform: translate(-50%, -50%);
    font-size: 14px;
    font-weight: bold;
    color: rgb(0, 0, 0);
    background: rgba(255, 255, 255, 0.8);
    padding: 10px;
    border-radius: 6px;
  }

  .start-animation-btn {
    margin-bottom: 10px;
    margin-top: 6px;
    padding: 10px 15px;
    z-index: 10;  
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 13px;
  }

  .start-animation-btn:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
</style>
