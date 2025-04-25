<script>
  import { onMount } from "svelte";
  import Consent from "./components/Consent.svelte";
  import Intro from "./components/Intro.svelte";
  import ThankYou from "./components/Thankyou.svelte";
  import TestFiller from "./components/TestFiller.svelte";
  import MapSurveyTest from "./components/MapSurveyTest.svelte"
  import MapSurvey from "./components/MapSurvey.svelte"
  import Progress from "./components/Progress.svelte";
  import SurveyFiller from "./components/SurveyFiller.svelte";
  import FinaleFiller from "./components/FinaleFiller.svelte";

  let step = 1;  // Step tracker
  let level= 1;
  let totalQuestions = 3;
  let participantId;
  let changeCondition ;
  let originalColor; 

  
  function nextStep(id) {
    if (step === 2) {
      participantId = id;
    }
    step++;
  }

  function nextLevel(event) {

    if (level < totalQuestions) {
      level++; } 
    else{
      step=7
    }
  }

  onMount(() => {
/*     document.addEventListener("updateChangeCondition", (event) => {
      changeCondition = event.detail.changeCondition;
      console.log("Received changeCondition in App.svelte:", changeCondition);
    }); */
    document.addEventListener("nextLevel", nextLevel);
    document.addEventListener("nextStep", nextStep);
  });

  $: console.log('stage is '+step+', level is: '+level)

</script>

<header class="header">
  <div class= "logo">Master spørreskjema kartografi NTNU</div>
  <Progress {step} {level}  />
</header>

<main class="main-layout">
  <main>
    {#if step === 1}
      <Consent on:next={nextStep} />
    {:else if step === 2}
      <Intro onNext={nextStep}  />
    {:else if step ===3 }
      <TestFiller on:next={nextStep}/>
    {:else if step === 4}
    <MapSurveyTest  on:next={nextStep}/>
    {:else if step === 5}
    <SurveyFiller on:next={nextStep}/>
    {:else if step === 6}
   <MapSurvey participantId={participantId} {level} totalQuestions={totalQuestions}  />
   {:else if step === 7}
   <FinaleFiller {participantId} on:next={nextStep}/>
   {:else if step === 8}
    <ThankYou  />
    {/if}
  </main>
</main>

<footer class="footer">
  <p>© 2025 </p>
</footer>

