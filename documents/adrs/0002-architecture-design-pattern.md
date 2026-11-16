# Architecture desing pattern

- __Status__: Accepted
- __Author__: knakto
- __Date__: 14/11/26

## Context

Subject said `You will develop a web application. Even if this is not required, try to structure your application (as a MVC application, for instance).`

### Option 1: MVC (clint-side)

__Pros__:
- Can make structure to be Component/State-driven like React or Vue, And easier to change Technical stack to popular framworks.
- Understand how popular fronend framworks and library works.
- Easy for backend(server-side) to be just API-Server.

__Cons__:
- Hard to make and understand.
- Have to create everything from scratch.
- Have to recreate something like jsx/tsx.
- Have to warn about security management.
- Complex state management.

### Option 2: MVC (server-side)

__Pros__:
- Easy to understand, Straightforward logic: `request -> Controller -> Model -> View -> Response`.
- Can use `Session()` or `Cookie()` from php standard lib to manage Authentication Session.

__Cons__:
- Everything will run from Server-side.
- Have to make good route sturcture to maintenance code.
- One request have to reload entry page for rerender.

## Decision

Selected: __Option 1: MVC (clint-side)__ and no have deep research about MVP and MVVC yet.

---
