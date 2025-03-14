<script lang="ts">
  // No need for createEventDispatcher in Svelte 5
  export let onNext: (participantId: number) => void; // Defining the type of onNext prop
  
  let gender = "";
  let education = "";
  let age = "";
  let experience = "";
  let consent = true;
  
  async function submitDemographics() {
    // Validate that all fields are filled
    if (!gender || !education || !age || !experience) {
      alert("Please fill out all fields before starting the test.");
      return;
    }
    
    const data = { gender, education, age, experience, consent };

    try {
      const response = await fetch("https://change-blindness-web.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.participant_id) {
        console.log("Participant ID received:", result.participant_id);
        // Pass the participantId back to App.svelte
        onNext(result.participant_id); 
      } else {
        console.error("Failed to get participant_id");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }
</script>

  
  <div class="main-container">
    <div class="content-wrapper">
      <!-- Left Section: Intro & Description -->
      <div class="left-section">
        <div class="intro-section">
          <h1>Welcome to the Experiment</h1>
          <p>
            Thank you for participating in this study on <strong>change blindness in choropleth maps</strong>.
            This experiment consists of several tasks where you need to detect changes in the presented maps.
          </p>
          <h3>Test Instructions</h3>
          <p>
            In this test, you will be shown maps with **changing elements**. Your task is to determine whether a change has occurred. The test consists of three rounds with increasing complexity.
            Please pay close attention and answer as accurately as possible.
          </p>
        </div>
      </div>
  
      <!-- Right Section: Survey -->
      <div class="right-section">
        <div class="survey-container">
          <h2>Participant Information</h2>
          <form on:submit|preventDefault={submitDemographics}>
            <div class="form-group">
              <label for="gender">Gender</label>
              <select id="gender" bind:value={gender}>
                <option value="">Select...</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not">Prefer not to say</option>
              </select>
            </div>
  
            <div class="form-group">
              <label for="education">Education Level</label>
              <select id="education" bind:value={education}>
                <option value="">Select...</option>
                <option value="high-school">High School</option>
                <option value="bachelor">Bachelor's Degree</option>
                <option value="master">Master's Degree</option>
                <option value="phd">PhD</option>
              </select>
            </div>
  
            <div class="form-group">
              <label for="age">Age</label>
              <input id="age" type="number" bind:value={age} min="1" placeholder="Enter your age" />
            </div>
  
            <div class="form-group">
              <label for="experience">Professional Experience with Maps</label>
              <select id="experience" bind:value={experience}>
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
  
            <button class="btn-primary" type="submit">Start Test</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  

  <style>
/* General Layout */
/* General Layout */
.main-container {
    max-width: 1000px;
    margin: 50px auto;
    font-family: 'Arial', sans-serif;
    color: #333;
}

/* Flexbox Layout */
.content-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 70px;
}

/* Left Section */
.left-section {
    flex: 1;
    min-width: 400px;
}

/* Right Section (Survey) */
.right-section {
    flex: 1;
    min-width: 440px;
}

/* Intro Section */
.intro-section {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.intro-section h1 {
    font-size: 24px;
    color: #007BFF;
    margin-bottom: 10px;
}

.intro-section p {
    font-size: 16px;
    line-height: 1.6;
}



/* Survey Form */
.survey-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
}

.survey-container h2 {
    text-align: center;
    color: #333;
}

/* Form Groups */
.form-group {
    margin-bottom: 15px;
    margin-left: 10px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input, select {
    width: 90%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    
}
.btn-primary {
    width: 100%;
    padding: 12px;
    font-size: 18px;
    background: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
}
.btn-primary:hover {
    background: #0056b3;
}

</style>