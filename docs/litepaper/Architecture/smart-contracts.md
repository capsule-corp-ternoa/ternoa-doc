---
sidebar_position: 5
sidebar_label: Smart Contracts
---

# Smart Contracts

Ternoa is providing the benefit to write smart contracts on the chain. Solutions like ink! or EVM could be use to implement smart contracts in easy way.

- With ink! you can write smart contracts in Rust for blockchains built on the Substrate framework.

# Why Rust is an ideal smart contract language

It is type safe, memory safe, and free of undefined behaviors. It generates small binaries because it doesn’t include extra bloat, like a garbage collector, and advanced optimizations and tree shaking remove dead code. Through compiler flags, Rust can automatically protect against integer overflow.

- **Rust ecosystem:** You gain from all of support available to the Rust ecosystem for free. As the language develops, new features and functionality, improving how you can write smart contracts in the future.
- **Tooling:** Tools like rustfmt, clippy and rust-analyzer already work out of the box. Same goes for code formatting and syntax highlighting in most modern text editors. Also Rust has an integrated test and benchmark runner,
- **No overhead:** Minimal runtime.
- **Safe & Efficient:** Zero-cost & safe abstractions.
- **Productive:** Cargo + crates.io Ecosystem.
- **1st class Wasm:** Rust provides the first class support for the WebAssembly.
- **Small Size:** In the space-constrained blockchain world size is important. The Rust compiler is a great help for that, since it reorders struct fields in order to make each type as small as possible. Thus Rust data structures are very compact, in many cases even more compact than in C.