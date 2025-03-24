<script>
  import { onMount } from "svelte";
  import Consent from "./components/Consent.svelte";
  import Demographics from "./components/Demographics.svelte";
  import Map from "./components/Map.svelte";
  import Survey from "./components/Survey.svelte";
  import ThankYou from "./components/Thankyou.svelte";
  import TestPage from "./components/TestPage.svelte";
  import Popup from "./components/Popup.svelte";  // Import our Popup component

  let step = 3;  // Step tracker
  let currentLevel =0
  let totalQuestions = 3;
  let participantId;
  let changeCondition = "No change";
  
  // For showing the popup after the red square is drawn
  let showPopup0 = true; 
  let showPopup1 = true;   // Initially instruct the user to click Start
  let showPopup2 = false;  // "Watch carefully..." message
  let showPopup3 = false;  // "Red square appears..." message

  function nextStep(id) {
    if (step === 2) {
      participantId = id;
    }
    step++;
  }

  function nextLevel(event) {
    if (step==3 ){
      currentLevel= 0
    }
    if (event.detail && event.detail.changeCondition !== undefined) {
      changeCondition = event.detail.changeCondition;
      console.log("Received changeCondition in App.svelte:", changeCondition);
      return;
    }
    if (currentLevel < totalQuestions) {
      currentLevel++;
    } 
    else{
      step=5

    }
  }
  
  function goToTestMode() {
    console.log("Nå kjører goToTestMode")
    step = 3;
    currentLevel=0
    
  }
 

  onMount(() => {
    document.addEventListener("updateChangeCondition", (event) => {
      changeCondition = event.detail.changeCondition;
      console.log("Received changeCondition in App.svelte:", changeCondition);
    });
    document.addEventListener("next", nextLevel);

    document.addEventListener("continueRealSurvey", () => {
      step = 4;
      currentLevel =1;
    });
     // When the Start button is pressed, hide Popup 1 and show Popup 2.
     document.addEventListener("startPressed", () => {
      if (step === 3) {
      showPopup1 = false;
      showPopup0=false
      showPopup2 = true;
      }
    });
    // When the red square is drawn (animation complete), hide Popup 2 and show Popup 3.
    document.addEventListener("redSquareShown", () => {
      if (step === 3) {
        showPopup2 = false;
        showPopup3 = true;
      }
    });
  });
  $: console.log('stage is '+step+', level is: '+currentLevel)
</script>

<div class="max-y">
<header class="header">
  <h1>Change Blindness Study</h1>
</header>

<main class="survey-layout">
  <main>
    {#if step === 1}
      <Consent on:next={nextStep} />
    {:else if step === 2}
      <Demographics onNext={nextStep} on:test={goToTestMode} />
    {:else if step === 3}
      <!-- Test Mode Page: Displays demo map and survey, with popups -->
      <div class="test-banner">
        <p>Dette er en demostrasjonsoppgave. Dataen vil ikke bli lagret.</p>
      </div>

      <div class="test-container" style="position: relative;">
   
        <!-- Render the popups (only when step 3) -->
        {#if showPopup0}
        <Popup
          message="1.Les instruksjonen for oppgaven"
          style="top: 50px; right: 21%; transform: translateX(-50%);"
        
        />
        {/if}
        {#if showPopup1}
        <Popup
          message="2. Trykk på <strong>Start</strong> for starte fargeskiftet. Obs: du kan bare starte én gang"
          style="top: 530px; left: 42%; transform: translateX(-50%);"
        
        />
        {/if}
        {#if showPopup2}
          <Popup
            message="3. Etter fargeskiftet vil en <strong>rød ramme</strong> fremheve én region"
            style="top: 50%; left: -4%; transform: translateY(-50%);"
          />
        {/if}
        {#if showPopup3}
        <Popup
          message="4. Svar på de to spørsmålene angående farge-endringene."
          style="bottom: 95px; right: 10px;"
        />
        {/if}
        <div class="map-container">
          <Map level={currentLevel} changeCondition={changeCondition} />
        </div>
        <div class="survey-container">
          <TestPage {step} on:next={nextStep} />
        </div>
      </div>
    {:else if step === 4}
    <div class="main-container"  >
      <div class="map-container">
        <Map level={currentLevel} changeCondition={changeCondition} />
      </div>
      <div class="survey-container">
        <Survey participantId={participantId} changeCondition={changeCondition} level={currentLevel} totalQuestions={totalQuestions} />
      </div>
    </div>
    {:else if step === 5}
      <ThankYou />
    {/if}
  </main>
</main>

<footer class="footer">
  <p>© 2025 Change Blindness Study</p>
</footer>

</div>