<script>
  export let step; // 0-basert indeks for nåværende steg
  export let level;

 let stepsList= ["Registrering", "Demo", "Oppgave 1", "Oppgave 2",  "Oppgave 3","Ferdig"];


 $: currentProgressIndex = (() => {
    if (step <= 2) {
      // For steg 1 og 2 (begge registrering) vises det som steg 0
      return 0;
    } else if (step <= 4) {
      // For steg 3 og 4 (begge demo) vises det som steg 1
      return 1;
    } else if (step === 5) {
      // Første oppgave
      return 2;
    } else if (step === 6) {
      // Steg 6 er oppgaveseksjonen – currentLevel angir hvilken oppgave (1 → oppgave 1, 2 → oppgave 2, 3 → oppgave 3)
      // Siden "Oppgave 1" allerede er på index 2, legger vi til currentLevel - 1
      return 2 + (level - 1);
    } else if (step >= 7) {
      // Ferdig
      return stepsList.length - 1;
    }
  })();







</script>
  <div class="progress-container">
    {#each stepsList as label, i}
    <div class="progress-step {i <= currentProgressIndex ? 'active' : ''}">
      <span class="step-label">{label}</span>
    </div>
  {/each}
  </div>
  
<style>
  .progress-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 0 20px;
    margin: 8px 0;
    margin-top: 35px;
  }
  .progress-step {
    position: relative;
    height: 4px;
    background: #ddd;
    border-radius: 2px;
    width: 75px; /* Fast bredde, kan justeres */
  }
  .progress-step.active {
    background: #007bff;
  }
  .step-label {
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 13px;
    white-space: nowrap;
    color: #ffffff;
  }
</style>