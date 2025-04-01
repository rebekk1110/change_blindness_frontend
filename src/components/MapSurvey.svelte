<script>
    import Map from "./Map.svelte";
    import Survey from "./Survey.svelte";
  
    export let participantId;
    export let changeCondition;
    export let originalColor;
    export let level;
    let currentLevel = level; 

    let totalQuestions=3    


  </script>
  

  <div class="main-container"  >

    <div class="map-container">
      <Map {level} changeCondition={changeCondition} bind:originalColor/>
    </div>
    <div class="survey-container">
      <Survey participantId={participantId} {changeCondition} {level} {totalQuestions} {originalColor}  demoMode={false}  />
    </div>
  </div>


  <style>
    .main-container{
    margin-top: 60px;
    margin-bottom: 20px;
    }

   .map-container{
    margin-bottom: 6%;
    }
  </style>