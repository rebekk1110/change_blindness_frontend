<script>
  import { onMount } from "svelte";
  import Consent from "./components/Consent.svelte";
  import Demographics from "./components/Demographics.svelte";
  import Map from "./components/Map.svelte";
  import Survey from "./components/Survey.svelte";
  import ThankYou from "./components/Thankyou.svelte";

  let step = 1;  // Step tracker
  let currentLevel = 1;  // Level tracker for questions
  let totalQuestions = 3;  // Total number of questions
  let participantId;  // Will store the participant ID after registration
  let changeCondition = "No change";  // Default change condition

  // Handle nextStep event to update the participantId and move to the next step
  function nextStep(participantId) {
    if (step === 2) {
      participantId = participantId;  // Set participantId
    }
    step++;  // Move to the next step
  }

  // Handle the next level
  function nextLevel(event) {
    participantId = event.detail;
    console.log("Received participantId in App.svelte:", participantId);

    if (currentLevel < totalQuestions) {
      currentLevel++;  // Move to the next level
    } else {
      step = 4;  // Move to the ThankYou step
    }
  }

  onMount(() => {
    // Listen for the 'next' event to update the participantId and move to the next level
    document.addEventListener("next", nextLevel); 
    console.log("Passing participantId:", participantId);
  });
</script>

<header class="header">
  <h1>Change Blindness Study</h1>
</header>
<footer class="footer">
  <p>© 2025 Change Blindness Study</p>
</footer>

<main class="survey-layout">
  {#if step === 1}
    <Consent on:next={nextStep} />
  {:else if step === 2}
    <Demographics onNext={nextStep} /> <!-- Pass nextStep as the onNext callback -->
  {:else if step === 3}
    <div class="map-container">
      <Map level={currentLevel} changeCondition={changeCondition} />
    </div>
    <div class="survey-containerr">
      <Survey participantId={participantId} changeCondition={changeCondition} level={currentLevel} totalQuestions={totalQuestions} />
    </div>
  {:else}
    <ThankYou />
  {/if}
</main>


