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
      alert("🚨 Please select whether you noticed a change before submitting!");
      return;
    }
    if (!confidence) {
      alert("🚨 Please select a confidence level before submitting!");
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

        document.dispatchEvent(new CustomEvent("next"));
      }, 1000);
    });
  }
</script>

<div class="survey-container">
  <p class="progress-text">Question {level} of {totalQuestions}</p>
<div class="task-description">

  <p>  Please carefully analyze the highlighted region in the map before answering the questions below. 
  Your response should be based on your best judgment. 
  There is no right or wrong answer—just answer as accurately as you can </p>

</div>


  <div class="question-box">

    <p class="question-text"> Did the highlighted region change color?</p>
    <div class="radio-group">
      <label>
        <input type="radio" bind:group={response} value="Change" required />
        Yes, the region changed color 
      </label>
      <label>
        <input type="radio" bind:group={response} value="No Change" required />
        No, the region remained the same 
      </label>
    </div>
  </div>

  <div class="question-box">
    <p class="question-text">How confident are you in your answer?</p>
    <div class="confidence-container">
      <label>
        <input type="radio" bind:group={confidence} value="5" required />
        <span>Very Confident</span>
      </label>
      <label>
        <input type="radio" bind:group={confidence} value="4" required />
        <span>Somewhat Confident</span>
      </label>
      <label>
        <input type="radio" bind:group={confidence} value="3" required />
        <span>Neutral</span>
      </label>
      <label>
        <input type="radio" bind:group={confidence} value="2" required />
        <span>Somewhat Unconfident</span>
      </label>
  
      <label>
        <input type="radio" bind:group={confidence} value="1" required />
        <span>Very Unconfident</span>
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
          Submit and Next
        {/if}
      </button>
    </div>
  </div>
</div>
  

<style>
  .survey-container {
  margin-top: 20px;
  flex: 1;
  min-width: 440px;
  max-width: 500px;
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
.task-description {
  background: #eef1f6; /* ✅ Light background for contrast */
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  font-size: 14px;
  /* font-weight: bold; */
  margin-bottom: 15px;
}









</style>
