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
  let showPopup0 = true; 
  let showPopup1 = true;   // Initially instruct the user to click Start
  let showPopup2 = false;  // "Watch carefully..." message
  let showPopup3 = false;

  // Centralized function to set up event listeners
  function setupDemoListeners() {
    document.addEventListener("startPressed", () => {

        showPopup0 = false;
        showPopup1 = false;
        showPopup2 = true;
    });
    document.addEventListener("redSquareShown", () => {
        showPopup0 = false;
        showPopup1 = false;
        showPopup2 = false;
        showPopup3 = true;
    });
  }

  onMount(() => {
    setupDemoListeners();
  });
</script>
<div class="test-banner">
  <p>Dette er en demostrasjonsoppgave. Dataen vil ikke bli lagret.</p>
</div> 
<div class="test-container" >

  {#if showPopup0}
    <Popup message="1. Les instruksjonen for oppgaven" style="top: 200px; right: 22%; transform: translateX(-50%);" />
  {/if}
  {#if showPopup1}
    <Popup message="2. Klikk på <strong>Start</strong> animasjon. <br> Obs: Animasjonen kan kun startes én gang" style="top: 580px; left: 15%; transform: translateX(-50%);" />
  {/if}
  {#if showPopup2}
    <Popup message="3. Etter fargeskiftet vil en <strong>rød ramme</strong> fremheve én region" style="top: 580px; left: 15%; transform: translateX(-50%);" />
  {/if}
  {#if showPopup3}
    <Popup message="4. Svar på de to spørsmålene angående farge-endringene." style="top: 200px; right: 22%; transform: translateX(-50%);" />
  {/if}
  <div class="map-container">
    <Map level={testLevel} changeCondition={changeCondition} bind:originalColor />
  </div>
  <div class="survey-container">
    <Survey participantId={participantId} changeCondition={changeCondition} {level} originalColor={originalColor} demoMode={true} />
  </div>
</div>
<style>

 .map-container{
  margin-bottom: 20px;
 }
</style>