<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
  
    function onContinue() {
      dispatch("next");
    }
  </script>
  
  <div class="filler-container">
    <div class="filler-card">
      <h2>Velkommen til øvelse-oppgave</h2>
      <p> Nå skal du få en prøve-oppgave som forklarer hvordan du skal gjennomføre eksperimentet. Trykk på «Fortsett» for å starte prøve-oppgaven.</p>
      <p class="warning-text">
        ⚠ Husk <strong>ikke refresh sidene</strong> underveis i spørreskjema, da starter studien på nytt.
      </p>
      <button on:click={onContinue}>Fortsett</button>
    </div>
  </div>
  
  <style>
    .filler-container {
      min-height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f0f0f0;
      padding: 20px;
    }
  
    .filler-card {
      max-width: 600px;
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
  
    h2 {
      font-size: 2em;
      margin-bottom: 20px;
      color: #333;
    }
  
    p {
      font-size: 1em;
      margin-bottom: 20px;
      color: #555;
    }
  
    button {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 1em;
      cursor: pointer;
      transition: background 0.3s ease;
    }
  
    button:hover {
      background-color: #0056b3;
    }
  </style>
  