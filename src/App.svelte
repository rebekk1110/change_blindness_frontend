<script>
  import { onMount } from "svelte";
  import Consent from "./components/Consent.svelte";
  import Demographics from "./components/Demographics.svelte";
  import Map from "./components/Map.svelte";
  import Survey from "./components/Survey.svelte";
  import ThankYou from "./components/Thankyou.svelte";

  let step = 1;  // Skip directly to survey for testing
  let currentLevel = 1;
  let totalQuestions = 3;
  let participantId = "";  // Declare participantId here
  let changeCondition = "No change"; 

  // Handle nextStep event to update the participantId and move to the next step
  function nextStep(data) {
    if (step === 2) {
      participantId = data;  // Set participantId
    }
    step++;  // Move to the next step
  }

  // Handle the next level and pass the participantId along with the changeCondition
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
    document.addEventListener("next", nextLevel);  // Listen for next event from Demographics or Map
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
    <Demographics on:next={nextStep} />
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
