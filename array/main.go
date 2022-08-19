package main

import (
	"syscall/js"
)

func generatePacket(this js.Value, args []js.Value) interface{} {
	payload := args[0].String() // get the parameters
	return "SCION wrapper{" + payload + "}"
}

func fiddleArray(this js.Value, args []js.Value) interface{} {
	array := args[0]

	buf := make([]byte, array.Get("length").Int())
	n := js.CopyBytesToGo(buf, array)
	buf[0] = 42
	dst := js.Global().Get("Uint8Array").New(n)
	js.CopyBytesToJS(dst, buf)
	return dst
}

// Declare a main function, this is the entrypoint into our go module
// That will be run. In our example, we won't need this
func main() {
	js.Global().Set("generatePacket", js.FuncOf(generatePacket))
	js.Global().Set("fiddleArray", js.FuncOf(fiddleArray))
	<-make(chan bool)
}
