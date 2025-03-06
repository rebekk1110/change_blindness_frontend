<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
  
    function agree() {
      dispatch("next");
    }
  </script>
  
  <div class="modal">
    <div class="modal-content">
      <h2>Consent Agreement</h2>
      <p>
        By participating in this survey, you agree that your responses will be stored and used for research purposes.
      </p>
      <button class="btn" on:click={agree}>I Agree</button>
    </div>
  </div>
  
  <style>
    .modal {
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.7);
    }
    .modal-content {
      background: white;
      padding: 2em;
      border-radius: 8px;
      max-width: 500px;
      text-align: center;
    }
  </style>
  