<script lang="ts">
  // Import global production CSS so that the appearance matches your original pages.
  import "../app.css";
  import Map from "./Map.svelte";
  
  export let step;
  // Dummy values for test mode.
  let currentLevel = 0;
  let participantId = 0; // Dummy ID for test mode.
  let changeCondition = "No change"; // Hardcoded demo value.
  
  // Survey state (identical to your production survey).
  let response = "";
  let confidence = "";
  let submitted = false;
  
  // Simulated submission function.
  function submitTestSurvey() {
    if (!response) {
      alert("🚨 Please select whether you noticed a change before submitting!");
      return;
    }
    if (!confidence) {
      alert("🚨 Please select a confidence level before submitting!");
      return;
    }
    console.log('test button pressed, and stage is '+step)
    console.log("Test survey submission simulated:", {
      participant_id: participantId,
      question_id: `Q${currentLevel}`,
      complexity: currentLevel === 1 ? "Low" : currentLevel === 2 ? "Medium" : "High",
      participant_response: response,
      change_condition: changeCondition,
      confidence
    });
    submitted = true;
    setTimeout(() => {
      submitted = false;
      response = "";
      confidence = "";
      document.dispatchEvent(new CustomEvent("continueRealSurvey"));
    }, 1000);
  }

 
</script>

<main>
  <div class="content-wrapper">

    <div class="survey-container">
      <p class="progress-text">Oppgave: Demostrasjon </p>
      
      <div class="task-description">
        <p>
          Du skal se etter forandringer i kartet til venstre. Noen av regionene vil endre farge.
          Oppgaven er delt i to deler. 1. Start aniamasjonen for å se endringer i kartet. 2. Svar på de to spørsmålene under som omhandler endringene i kartet. 
          Prøv å svar så -- som du kan. 
        </p>
      </div>
      <div class="question-box">
        <p class="question-text">Har regionen i den rød rammen skiftet farge?</p>
        <div class="radio-group">
          <label>
            <input type="radio" bind:group={response} value="Change" required />
            Ja, regionen endret farge
          </label>
          <label>
            <input type="radio" bind:group={response} value="No Change" required />
            Nei, hadde samme farge
          </label>
        </div>
      </div>
      
      <div class="question-box">
        <p class="question-text">Hvor sikker er du i ditt svar?</p>
        <div class="confidence-container">
          <label>
            <input type="radio" bind:group={confidence} value="5" required />
            <span>Veldig sikker</span>
          </label>
          <label>
            <input type="radio" bind:group={confidence} value="4" required />
            <span>Noe sikker</span>
          </label>
          <label>
            <input type="radio" bind:group={confidence} value="3" required />
            <span>Nøytral</span>
          </label>
          <label>
            <input type="radio" bind:group={confidence} value="2" required />
            <span>Noe usikker</span>
          </label>
          <label>
            <input type="radio" bind:group={confidence} value="1" required />
            <span>Veldig usikker</span>
          </label>
        </div>
      </div>
      
      <div class="button">
        <div class="submit-container">
          <button class="submit-btn" on:click={submitTestSurvey}>
            {#if submitted}
              <svg class="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            {:else}
              Fortsett til studien (ekte oppgavene?)
            {/if}
          </button>
        </div>
      </div>
    </div>
  </div>
</main>

<style>

  .content-wrapper {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: flex-start;
  }

  /* Survey Container: reuse production styles */
  .survey-container {
    min-width: 440px;
    max-width: 480px;
    margin-top: 5px;
    background: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  }
  .progress-text {
    text-align: center;
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
  }
  .task-description {
    background: #eef1f6;
    padding: 12px;
    border-radius: 6px;
    text-align: center;
    font-size: 14px;
    margin-bottom: 15px;
  }
  .question-box {
    background: white;
    padding: 8px;
    padding-bottom: 20px;
    border-radius: 8px;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    text-align: center;
  }
  .question-text {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 8px;
    margin-top: 8px;
  }
  .radio-group {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 15px;
  }
  .confidence-container {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-bottom: 15px;
    gap: 8px;
    align-items: flex-start;
  }
  .confidence-container label,
  .radio-group label {
    font-size: 14px;
  }
  .submit-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 6px;
  }
  .submit-btn {
    padding: 10px 15px;
    font-size: 13px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 160px;
  }
  .check-icon {
    width: 20px;
    height: 20px;
  }
</style>
