<script>
  import { onMount } from "svelte";
  import Map from "./Map.svelte";
  import Survey from "./Survey.svelte";
  import Popup from "./Popup.svelte"; 

  export let participantId;
  export let level; // For real MapSurvey, e.g. 1, 2, 3
  export let changeCondition;
  export let originalColor;
  export let step;

  let testLevel = 0;
  let showPopup1 = true; 
  let showPopup4 = false;   // Initially instruct the user to click Start
  let showPopup2 = false;  // "Watch carefully..." message
  let showPopup3 = false;

  // Centralized function to set up event listeners
  function setupDemoListeners() {
    document.addEventListener("startPressed", () => {
        showPopup1 = false;
        showPopup2 = false;
        showPopup3 = true;
    });
    document.addEventListener("redSquareShown", () => {
        showPopup1 = false;
        showPopup3 = false;
        showPopup4 = true;
    });
  }

  onMount(() => {
    setupDemoListeners();
  });

  function handlePopup2Next() {
    showPopup1 = false;
    showPopup2 = true;
  }
</script>
<div class="test-banner">
  <p>Dette er kun en øvelse. Svarene vil ikke bli lagret.</p>
</div> 
<div class="test-container" >
 {#if showPopup1}
  <Popup 
    message="1. Les instruksjonen for oppgaven ➔" 
    style="top: 270px; right: 32%; transform: translateX(-50%);"
 
  >
  <div class="popup-footer">
    <button on:click={handlePopup2Next} class="popup-next-btn">
      Neste
    </button>
  </div>
  </Popup>
{/if}

  {#if showPopup2}
    <Popup message="2. Klikk på <strong>Start</strong> animasjon. <br> Obs: Animasjonen kan kun startes én gang" style="top: 630px; left: 15%; transform: translateX(-50%);">
      <!-- "Next" button inside popup1 -->
      
    </Popup>
  {/if}
  {#if showPopup3}
    <Popup message="3. Etter fargeskiftet vil en <strong>rød ramme</strong> fremheve én region" style="top: 580px; left: 15%; transform: translateX(-50%);" />
  {/if}
  {#if showPopup4}
    <Popup message="4. Svar spørsmålene angående farge-endringene." style="top: 180px; right: 22%; transform: translateX(-50%);" />
  {/if}
  <div class="map-container">
    <Map level={testLevel} changeCondition={changeCondition} {showPopup1} bind:originalColor />
  </div>
  <div class="survey-container">
    <Survey participantId={participantId} changeCondition={changeCondition} {level} originalColor={originalColor} demoMode={true} />
  </div>
</div>
<style>

 .map-container{
  margin-bottom: 40px;
 }
 .popup-footer {
    display: flex;
    justify-content: flex-end; /* Aligns the button to the right */
    margin-top: 10px;
  }
 .popup-next-btn {
  background-color: #7d848cdf;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: end;
  gap: 8px;
  transition: background-color 0.3s;
}

.popup-next-btn:hover {
  background-color: #005

}
</style>