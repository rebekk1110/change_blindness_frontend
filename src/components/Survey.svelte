<script>
  export let participantId;
  export let level;
  export let totalQuestions = 3;
  export let changeCondition;  // Received from Map.svelte via props


  let response = "";
  let confidence = "";
  let submitted = false;

  function submitAndNext() {
  if (!response) {
    alert("🚨 Vennligst velg om du la merke til en endring");
    return;
  }
  if (!confidence) {
    alert("🚨 Vennligst velg hvor sikker du er");
    return;
  }
    const data = {
      participant_id: participantId,
      question_id: `Q${level}`,
      complexity: level === 1 ? "Low" : level === 2 ? "Medium" : "High",
      participant_response: response,
      change_condition: changeCondition, 
      confidence,
    };

    fetch("https://change-blindness-web.onrender.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(() => {
      submitted = true;
      setTimeout(() => {
        console.log("⏳ Resetting button...");
        submitted = false;

        document.dispatchEvent(new CustomEvent("resetAnimation"));

        response = "";
        confidence = "";

        if (level < totalQuestions) {
         document.dispatchEvent(new CustomEvent("next"));
      } else {
         // Last question: mark the study as completed.
         fetch("https://change-blindness-web.onrender.com/complete", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({ participant_id: participantId })
         })
         .then(() => {
             console.log("Study marked as complete!");
             document.dispatchEvent(new CustomEvent("next"));
             // Optionally, trigger a transition or display a thank-you message.
         })

         .catch(error => {
             console.error("Error marking study as complete:", error);
         });

      }

      }, 1000);
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
          <li>Svar på de to spørsmålene under.</li>
        </ol>
        <p>Prøv å svar så korrekt? som du kan. </p>
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
        <button class="submit-btn" on:click={submitAndNext}>
          {#if submitted}
          <svg class="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          {:else}
            Send inn og fortsett på neste oppgave
          {/if}
        </button>
      </div>
    </div>
  </div>
</div>
  

<style>
  .content-wrapper {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: flex-start;
    flex: 1;
  }

  .survey-container {
    min-width: 440px;
    max-width: 500px;
    margin-top: 5px;
    background: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .submit-btn {
    padding: 10px 15px;
    font-size: 16px;
    background-color: #28a745; /* Green */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 160px;
    font-size: 13px;
  }

  .check-icon {
    width: 20px;
    height: 20px;
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

  /* ✅ Make radio buttons & labels more compact */
 
.confidence-container {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-bottom: 15px;
  gap: 8px;
  align-items: flex-start; /* ✅ Aligns text with radio buttons */
}

.confidence-container label, 
.radio-group label {
  font-size: 14px;
 
}

.radio-group{
  display: flex;
  justify-content: center;
  flex-direction:row;

  gap: 15px;
}
.question-text {
  font-weight: bold; 
  font-size: 16px; 
  margin-bottom: 8px;
  margin-top: 8px;
}

.submit-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 6px;
  
}



</style>
