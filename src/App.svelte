<script>
  import { onMount } from "svelte";
  import Consent from "./components/Consent.svelte";
  import Demographics from "./components/Demographics.svelte";
  import Map from "./components/Map.svelte";
  import Survey from "./components/Survey.svelte";
  import ThankYou from "./components/Thankyou.svelte";

  let step = 1;  // Skip directly to survey for testing
  //let participantId = "test-user";
  let currentLevel = 1;
  let totalQuestions = 3;

  function nextStep(data) {
    if (step === 2) {
      participantId = data;
    }
    step++;
  }

  function nextLevel() {
    if (currentLevel < totalQuestions) {
      currentLevel++;
    } else {
      step = 4;
    }
  }

  onMount(() => {
    document.addEventListener("next", nextLevel);
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
      <Map level={currentLevel} />
    </div>
    <div class="survey-containerr">
      <Survey participantId={participantId} level={currentLevel} totalQuestions={totalQuestions} />
    </div>
  {:else}
    <ThankYou />
  {/if}
</main>

