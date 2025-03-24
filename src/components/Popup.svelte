<!-- src/components/Popup.svelte -->
<script>
    export let message = "";
    export let style = "";
  </script>
  
  <div class="popup" style={style}>
    {@html message}
  </div>
  
  <style>
    .popup {
      position: absolute;
      background: #fff;
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      z-index: 1000;
      max-width: 250px;
    }
  </style>
  