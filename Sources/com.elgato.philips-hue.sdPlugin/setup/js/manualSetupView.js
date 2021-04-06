//==============================================================================
/**
@file       manualSetupView.js
@brief      Philips Hue Plugin
@copyright  (c) 2020, <TODO: Fill this in.>
            This source code is licensed under the MIT-style license found in the LICENSE file.
**/
//==============================================================================

function loadManualSetupView() {
  // Set the status bar
  setStatusBar('manual');

  // Fill the title
  document.getElementById('title').innerHTML = localization['ManualSetup']['Title'];

  // Fill the content area
  var content = "<p>&nbsp;</p> \
                 <img class='image' src='images/bridge.png'> \
                 <div id='loader'></div>";
  document.getElementById('content').innerHTML = content;

  // Render input form
  manualSetup();

  function manualSetup() {
    var content = "<div class='setup-container'> \
                     <label>" + localization['ManualSetup']['BridgeIP'] + ": <input type='text' class='text-input' name='bridge-ip' id='bridge-ip' /></label> \
                     <label>" + localization['ManualSetup']['BridgeID'] + ": <input type='text' class='text-input' name='bridge-id' id='bridge-id' /></label> \
                     <div class='button' id='save'>" + localization['ManualSetup']['Save'] + "</div> \
                     <div class='button-transparent' id='cancel'>" + localization['ManualSetup']['Back'] + "</div> \
                     <div id='error'></div> \
                   </div>";
    document.getElementById('content').innerHTML = content;

    document.getElementById('save').addEventListener('click', save);
    document.addEventListener('enterPressed', save);

    document.getElementById('cancel').addEventListener('click', cancel);
    document.addEventListener('escPressed', cancel);
  }

  function showError(error) {
    document.getElementById('error').innerText = error;
  }

  function save() {
    var bridgeIP = document.getElementById('bridge-ip').value;
    var bridgeID = document.getElementById('bridge-id').value;

    if (bridgeIP.trim() === '') {
      showError('Bridge IP is empty.');
      return;
    }

    if (!/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(bridgeIP)) {
      showError('Bridge IP is invalid.');
      return;
    }

    if (bridgeID.trim() === '') {
      showError('Bridge ID is empty.');
      return;
    }

    bridges = [new Bridge(bridgeIP, bridgeID)];
    unloadManualSetupView();
    loadPairingView();
  }

  function cancel() {
    unloadManualSetupView();
    loadIntroView();
  }

  function unloadManualSetupView() {
    document.removeEventListener('enterPressed', save);
    document.removeEventListener('escPressed', close);
  }
}