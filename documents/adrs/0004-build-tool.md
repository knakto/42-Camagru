# Build tool

- __Status__: Accepted
- __Author__: knakto
- __Date__: 17/11/26

## Context

Now my project have own Route, Then normal live-server not gonna work with it, Everytime I change code I have to build docker-compose
and that is bad workflow, I try to read subject again and it's forbidden only `library` or `framework`.

### Option 1: Vite

__Pros__:
- Easy to setup.
- Use npm run dev to test.
- Popular build tool.

__Cons__:

### Option 2: WebPack

__Pros__:


__Cons__:
- Have to write setup file
- Slower than Vite

## Decision

Selected `Option 1: Vite`.

---

