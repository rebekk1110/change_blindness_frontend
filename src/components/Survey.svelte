<script>
  export let participantId;
  export let level;
  export let totalQuestions = 3;
  export let changeCondition;
  export let originalColor;


  // For the change condition question
  let change_response = "";      // "Change" or "No Change"
  let change_confidence = ""; 
  let color_confidence = "";  // Scale values as a string (e.g., "5")
  let color_response = "";       
  let submitted = false;

  function submitAndNext() {
    // Validate first question
    if (!change_response) {
      alert("🚨 Vennligst svar på om regionen endret farge.");
      return;
    }
    if (!change_confidence) {
      alert("🚨 Vennligst oppgi hvor sikker du er på ditt svar.");
      return;
    }
    // If the answer is "Change", ensure the original color is selected
    if (change_response === "Change" && !color_response) {
      alert("🚨 Vennligst velg den opprinnelige fargen.");
      return;
    }
    
    // Build payload for the change response:
    const data = {
      participant_id:participantId,
      question_id: `Q${level}`, // Single question ID for this level.
      change_response:change_response,
      change_condition:changeCondition,
      change_confidence: parseInt(change_confidence),
      reaction_time: 0, // Replace with measured reaction time if available.
      // For color fields, only include values if the answer is "Change".
      original_color: change_response === "Change" ? originalColor : null,
      color_response: change_response === "Change" ? color_response : "",
      color_confidence: change_response === "Change" ? parseInt(color_confidence) : 0
    };


    // Submit the change response first
    
    fetch("https://change-blindness-web.onrender.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log("Response submitted:", result.message);
        submitted = true;
        setTimeout(() => {
          submitted = false;
          // Reset fields for next question/level
          change_response = "";
          change_confidence = "";
          color_response = "";
          color_confidence = "";
          document.dispatchEvent(new CustomEvent("next"));
        }, 1000);
      })
      .catch(error => {
        console.error("Error submitting response:", error);
      });
  }
</script>

<div class="content-wrapper">
  <div class="survey-container">
    <p class="progress-text">Oppgave {level} av {totalQuestions}</p>
    <div class="task-description">
      <p>
            Du skal se etter forandringer i kartet til venstre.
           </p>
           <ol>
             <li>Trykk <strong>start</strong> for å se endringer i kartet.</li>
             <li>Svar på de spørsmålene under.</li>
           </ol>
           <p>Prøv å svar så korrekt? som du kan. </p>
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
    
    <div class="submit-container">
      <button class="submit-btn" on:click={submitAndNext} disabled={submitted}>
        {#if submitted}
          <svg class="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        {:else}
          Send inn og fortsett
        {/if}
      </button>
    </div>
  </div>
</div>

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
.radio-group {
  margin-bottom: 10px;
}
.radio-group label {
  display: block;
  margin: 5px 0;
  font-size: 14px;
}

.confidence-container p {
  font-size: 14px;
  margin-bottom: 5px;
}
.confidence-container label {
  display: block;
  margin: 5px 0;
  font-size: 14px;
}
.submit-container {
  text-align: center;
  margin-top: 20px;
}
.submit-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}
.submit-btn:disabled {
  background: gray;
  cursor: not-allowed;
}
.check-icon {
  vertical-align: middle;
}
</style>
