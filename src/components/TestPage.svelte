<script lang="ts">
  // Import global production CSS so that the appearance matches your original pages.
  import "../app.css";
  import Map from "./Map.svelte";
  
  export let step;
  // Dummy values for test mode.
  let currentLevel = 0;
  let participantId = 0; // Dummy ID for test mode.
  let changeCondition = "No change"; // Hardcoded demo value.
  let change_response=""
  
  // Survey state (identical to your production survey).
  let color_response = "";
  let color_confidence = "";
  let change_confidence = "";
  let submitted = false;
  
  // Simulated submission function.
  function submitTestSurvey() {
    if (!change_response) {
      alert("🚨 Please select whether you noticed a change before submitting!");
      return;
    }
    
    if (!change_confidence) {
      alert("🚨 Please select a confidence level before submitting!");
      return;
    }
    console.log('test button pressed, and stage is '+step)

    submitted = true;
    setTimeout(() => {
      submitted = false;
      color_confidence= "";
      color_response="";
      change_response="";
      change_confidence = "";
      document.dispatchEvent(new CustomEvent("continueRealSurvey"));
    }, 1000);
  }

 
</script>

<main>
  <div class="content-wrapper">
    <div class="survey-container">
      <p class="progress-text">Demonstrasjon</p>
      <div class="task-description">
        <p>
              Du skal se etter forandringer i kartet til venstre.
             </p>
             <ol>
               <li>Trykk <strong>start</strong> for å se endringer i kartet.</li>
               <li><strong>Svar</strong> på spørsmålene under.</li>
             </ol>
             <p>Vennligst gi et så korrekt svar som mulig.</p>
       </div>
      <!-- Question Box 1: Change Response & Confidence -->
      <div class="question-box">
        <p class="question-text">Har regionen endret farge?</p>
        <div class="radio-group">
          <label>
            <input type="radio" bind:group={change_response} value="Change" required />
            Ja, regionen endret farge
          </label>
          <label>
            <input type="radio" bind:group={change_response} value="No Change" required />
            Nei, regionen forble uendret
          </label>
        </div>
          <p class="confidence-question">Hvor sikker er du på ditt svar?</p>
          <div class="confidence-options">
            <label class="option">
              <input type="radio" bind:group={change_confidence} value="5" required />
              <span class="option-text">Veldig sikker</span>
            </label>
            <label class="option">
              <input type="radio" bind:group={change_confidence} value="4" required />
              <span class="option-text">Noe sikker</span>
            </label>
            <label class="option">
              <input type="radio" bind:group={change_confidence} value="3" required />
              <span class="option-text">Nøytral</span>
            </label>
            <label class="option">
              <input type="radio" bind:group={change_confidence} value="2" required />
              <span class="option-text">Noe usikker</span>
            </label>
            <label class="option">
              <input type="radio" bind:group={change_confidence} value="1" required />
              <span class="option-text">Veldig usikker</span>
            </label>
          </div>
     
      </div>
      
      <!-- Question Box 2: Original Color (only if answer is "Change") -->
      {#if change_response === "Change"}
      <div class="question-box">
        <p class="question-text">Hva var den opprinnelige fargen på regionen?</p>
        <div class="color-options">
          <label class="color-option {color_response === '#D3D3D3' ? 'selected' : ''}">
            <input type="radio" bind:group={color_response} value="#D3D3D3" required hidden />
            <span class="color-swatch" style="background-color: #D3D3D3;"></span>
            <span class="color-name">Lys grå</span>
          </label>
          <label class="color-option {color_response === '#A9A9A9' ? 'selected' : ''}">
            <input type="radio" bind:group={color_response} value="#A9A9A9" required hidden />
            <span class="color-swatch" style="background-color: #A9A9A9;"></span>
            <span class="color-name">Middels grå</span>
          </label>
          <label class="color-option {color_response === '#696969' ? 'selected' : ''}">
            <input type="radio" bind:group={color_response} value="#696969" required hidden />
            <span class="color-swatch" style="background-color: #696969;"></span>
            <span class="color-name">Mørk grå</span>
          </label>
        </div>
            <p class="confidence-question">Hvor sikker er du på fargevalget ditt?</p>
            <div class="confidence-options">
              <label class="option">
                <input type="radio" bind:group={color_confidence} value="5" required />
                <span class="option-text">Veldig sikker</span>
              </label>
              <label class="option">
                <input type="radio" bind:group={color_confidence} value="4" required />
                <span class="option-text">Noe sikker</span>
              </label>
              <label class="option">
                <input type="radio" bind:group={color_confidence} value="3" required />
                <span class="option-text">Nøytral</span>
              </label>
              <label class="option">
                <input type="radio" bind:group={color_confidence} value="2" required />
                <span class="option-text">Noe usikker</span>
              </label>
              <label class="option">
                <input type="radio" bind:group={color_confidence} value="1" required />
                <span class="option-text">Veldig usikker</span>
              </label>
            </div>
      </div>
    {/if}
      
    <div class="button">
      <div class="submit-container">
        <button class="submit-btn" on:click={submitTestSurvey}>
          {#if submitted}
            <svg class="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          {:else}
            Gå videre til spørreskjema
          {/if}
        </button>
      </div>
    </div>
  </div>
</main>

<style>


.color-options {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 10px 0;
}

.color-option {
  cursor: pointer;
  text-align: center;
}

.color-option input {
  display: none;
}

.color-swatch {
  display: block;
  width: 50px;   /* Increase size as desired */
  height: 50px;  /* Increase size as desired */
  border: 2px solid transparent;
  margin: 0 auto 5px;
  border-radius: 6px;
  transition: border-color 0.3s ease;
}

.color-option:hover .color-swatch {
  border-color: blue;
}

.color-option.selected .color-swatch {
  border-color: blue;
}

.color-name {
  font-size: 14px;
}
.confidence-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.confidence-question {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 10px;
  margin-top: 8px;
}

.confidence-options {
  display: flex;
  gap: 15px;
  font-size: 14px;
  justify-content: center;
}

.option {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.option input {
  /* Ensure the radio input doesn't add extra spacing */
  margin: 0;
}

.option-text {
  margin-top: 4px;
  font-size: 14px;
  text-align: center;
}

.content-wrapper {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: flex-start;
}

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
