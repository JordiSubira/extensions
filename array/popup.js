// Copyright 2021 ETH, Ovgu
'use strict';
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
    }
    return response;
  };


  const go = new Go(); // Defined in wasm_exec.js. Don't forget to add this in your index.html.
  //remove the message: syscall/js.finalizeRef not implemented
  go.importObject.env["syscall/js.finalizeRef"] = () => {}

  const runWasmAdd = async () => {
    // Get the importObject from the go instance.
    const importObject = go.importObject;

    // Instantiate our wasm module
    const wasmModule = await wasmBrowserInstantiate("./main.wasm", importObject);

    // Allow the wasm_exec go instance, bootstrap and execute our wasm module
    go.run(wasmModule.instance);

    console.log(window.generatePacket("my payload"));

    var strBytes = new TextEncoder().encode("XYZW")
    // it replaces first letter with *
    var returnValue = window.fiddleArray(strBytes)

    console.log(new TextDecoder().decode(returnValue));
  };
  runWasmAdd();