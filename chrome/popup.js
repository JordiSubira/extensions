// Copyright 2021 ETH, Ovgu
'use strict';

<<<<<<< Updated upstream
let headline = document.getElementById('headline');
let toggleRunning = document.getElementById('toggleRunning');
let checkboxRunning = document.getElementById('checkboxRunning');

window.onload = function () {

  // Update host list in popup
  getStorageValue('list').then((hostSet) => {
    if(!hostSet) {
      hostSet = [
        "www.scionlab.org",
        "www.scionlab.chat",
        "www.scion-pathguess.game"
      ];
      saveStorageValue('list', [...hostSet]).then(() => {
        console.log('Initialized hosts');
      })
    }
    displayHostList(hostSet); 
  });

  // Update Forwarding badge depending on storage settings
  getStorageValue('forwarding_enabled').then(isForwardingEnabled => {
    if(isForwardingEnabled) {
      headline.innerText = "Active"
      headline.className = "inline-block rounded-full text-white bg-green-500 px-2 py-1 text-xs font-bold mr-3";
    } else {
      headline.innerText = "Inactive"
      headline.className = "inline-block rounded-full text-white bg-red-500 px-2 py-1 text-xs font-bold mr-3";
    }
  });

  // Load extension running value and remove other settings in case its not running
  getStorageValue('extension_running').then((val) => {
    toggleRunning.checked = val;
    document.getElementById('domains-container').hidden = !toggleRunning.checked;
    if(!val) {
      headline.innerText = "Inactive"
      headline.className = "inline-block rounded-full text-white bg-red-500 px-2 py-1 text-xs font-bold mr-3";
=======
//chrome.runtime.sendMessage({});

const resultField = document.getElementById("result");

const wasmBrowserInstantiate = async (wasmModuleUrl, importObject) => {
    let response = undefined;

    // Check if the browser supports streaming instantiation
    if (WebAssembly.instantiateStreaming) {
      // Fetch the module, and instantiate it as it is downloading
      response = await WebAssembly.instantiateStreaming(
        fetch(wasmModuleUrl),
        importObject
      );
    } else {
      // Fallback to using fetch to download the entire module
      // And then instantiate the module
      const fetchAndInstantiateTask = async () => {
        const wasmArrayBuffer = await fetch(wasmModuleUrl).then(response =>
          response.arrayBuffer()
        );
        return WebAssembly.instantiate(wasmArrayBuffer, importObject);
      };

      response = await fetchAndInstantiateTask();
>>>>>>> Stashed changes
    }

<<<<<<< Updated upstream
// Start/Stop global forwarding
function toggleExtensionRunning () {
  toggleRunning.checked = !toggleRunning.checked
  saveStorageValue('extension_running',toggleRunning.checked).then(() => {
    document.getElementById('domains-container').hidden = !toggleRunning.checked;
  });

}
checkboxRunning.onclick = toggleExtensionRunning;



document.getElementById('button-write-hostname')
            .addEventListener('click', function() {
              let hostname = document.getElementById("input-hostname").value
              document.getElementById("input-hostname").value = ""
              addHost(hostname).then(hostSet=>{
                displayHostList([...hostSet]);
                return hostSet;
              })
            });


document.getElementById('button-delete-hostname')
            .addEventListener('click', function() {
              let hostCheckBoxes = document.getElementById("output").children
              let hostList = new Array()
              for (var i = 0; i < hostCheckBoxes.length; i++){
                if (hostCheckBoxes[i].getElementsByTagName("input")[0].checked){
                  let hostname = hostCheckBoxes[i].outerText;
                  hostList.push(hostname);
                }
              }
              deleteHosts(hostList).then(hostSet=>{
                displayHostList([...hostSet]);
                return hostSet;
              })
            });

function displayHostList(hostList){
  if (!hostList) {
    return;
  }
  document.getElementById('output').innerHTML = ""
  for(var i=0; i < hostList.length; i++){
    document.getElementById('output')
          .innerHTML+= '<label class="inline-flex items-center mt-3"> <input type="checkbox" id=hostname-' + i + ' class="form-checkbox h-4 w-4 text-gray-600"><span class="ml-2 text-gray-700">'+  hostList[i] + '</span> </label>';
  }
}

function addHost(host){
  return getStorageValue('list').then(toSet).then(hostSet => {
    hostSet.add(host);
    saveStorageValue('list', [...hostSet]).then(() => {
      console.log('Added host: ' + host);
    })
    return hostSet;
  });
}

function deleteHosts(hostlist){
  return getStorageValue('list').then(toSet).then(hostSet => {
    for (const hostname of hostlist){
      hostSet.delete(hostname);
    }
    saveStorageValue('list', [...hostSet]).then(() => {
      console.log('Deleted hosts: ' + hostlist);
    })
    return hostSet;
  });
}

function openOptions() {
  
}


document.getElementById('button-options')
            .addEventListener('click', function() {
              chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
          });
=======
    return response;
  };


  const go = new Go(); // Defined in wasm_exec.js. Don't forget to add this in your index.html.

  const runWasmAdd = async () => {
    // Get the importObject from the go instance.
    const importObject = go.importObject;

    // Instantiate our wasm module
    const wasmModule = await wasmBrowserInstantiate("./main.wasm", importObject);

    // Allow the wasm_exec go instance, bootstrap and execute our wasm module
    go.run(wasmModule.instance);

    console.log(wasmModule.instance);

    // Call the Add function export from wasm, save the result
    const addResult = wasmModule.instance.exports["main.add"](24, 24);

    // Set the result onto the body
    resultField.innerHTML = addResult;
  };
  runWasmAdd();
>>>>>>> Stashed changes
