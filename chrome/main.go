package main

// Declare a main function, this is the entrypoint into our go module
// That will be run. In our example, we won't need this
func main() {}

//go:wasm-module env
//export add
func add(x int, y int) int {
	return x + y
}
