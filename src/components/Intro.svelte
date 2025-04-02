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

  
  <div class="mainn-container">
    <div class="content-wrapper">
      <!-- Left Section: Intro & Description -->
      <div class="left-section">
        <div class="intro-section">
          <h1>Velkommen til kart-animasjon eksperimentet</h1>
          <p>
            <!-- Takk for at du deltar til denne kartstudien for for min masteroppgave. <br> -->
            Dette eksperimentet tar <strong>ca. 3- 4 minutter</strong> og består av  <strong>3 like oppgaver</strong> med økende vanskelighetsnivå. Du vil få en prøve-oppgave først for å forstå hvordan oppgaven funker.
            <br>
            <br>
            Vi tester din evne til å oppdage endringer i animerte kart. Lykke til - din innsats er verdifull!
          </p>
       <!--    <h3>Instruksjoner</h3>
          <p>
            Fyll inn deltakerinformasjon og start demostrasjonsoppgaven. 
          </p> -->
        </div>
      </div>
  
      <!-- Right Section: Survey -->
      <div class="right-section">
        <div class="surveyy-container">
          <h2>Deltakerinformasjon</h2>
          <div class= "demograph-content">
            <form on:submit|preventDefault={submitDemographics}>
            <div class="form-group">
              <label for="gender">Kjønn</label>
              <select id="gender" bind:value={gender}>
                <option value="">Velg...</option>
                <option value="female">Kvinne</option>
                <option value="male">Mann</option>
                <option value="prefer-not">Annet</option>
              </select>
            </div>

            <div class="form-group age">
              <label for="age">Alder</label>
              <input id="age" type="number" bind:value={age} min="1" placeholder="Skriv din alder" />
            </div>

            <div class="form-group">
              <label for="education">Høyeste utdanningsnivå</label>
              <select id="education" bind:value={education}>
                <option value="">Velg...</option>
                <option value="high-school">VGS</option>
                <option value="bachelor">Bachelor</option>
                <option value="master">Master</option>
                <option value="phd">PhD</option>
              </select>
            </div>

            <div class="form-group">
              <label for="experience"> Studerer du eller jobber med kart?</label>
              <select id="experience" bind:value={experience}>
                <option value="">Velg...</option>
                <option value="yes">Ja</option>
                <option value="no">Nei</option>
              </select>
            </div>
         
  
            <div class="button-class">
            <button class="btn-primary" type="submit">Neste</button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  </div>
  

  <style>
/* General Layout */
/* General Layout */
.mainn-container {
  max-width: 1300px;
  margin: 50px auto;
  font-family: 'Arial', sans-serif;
  color: #333;
  gap: 10px; 
  padding: 30px;

  border-radius: 8px;
}
.main-container{
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  flex-direction: row;
  gap: 10px; 
  column-gap: 5%;
  width: 100%;
  max-width: 1300px;
  margin-top: 20px;
  min-width: 1140px;
  background-color: #f5f7fa;
  position: relative;
  padding: 30px;
  border-radius: 8px;
}
/* Flexbox Layout */
.content-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 90px;
}

/* Left Section */
.left-section {
    flex: 1;
    min-width: 500px;
    max-width: 550px;
}

/* Right Section (Survey) */
.right-section {
    flex: 1;
    min-width: 360px;
    max-width: 440px;
  
}

.intro-section {
    background: #ffffff;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}


.intro-section h1 {
    font-size: 28px;
    color: #333;
    margin-bottom: 15px;
}

.intro-section p {
    font-size: 16px;
    line-height: 1.6;
    color: #555;
}
/* Survey Form */
.surveyy-container {
    color: #3f3f3f;
    background: white;
    padding: 25px;
    padding-left: 10%;
    padding-right: 10%;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    margin-left: 40px; 
}

.demograph-content{
  justify-content: space-between; 
  align-items: center;
  width: 100%;

}

.form-group {
  margin-bottom: 15px;
  margin-left: 10px;
}
.form-group.age {
  margin-bottom: 15px;
  margin-left: 10px;
  width: 90%;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
input::placeholder {
  color: #999898;
}
input, select {
  width: 95%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #555;
}
.button-class{
  align-items: end;
  justify-self: end;
  margin-right: 35px;
}
.btn-primary {
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 14px;
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