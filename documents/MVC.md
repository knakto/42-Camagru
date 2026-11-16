

# Model–View–Controller (MVC)

## What is MVC?

**Model–View–Controller (MVC)** is an architectural pattern that separates an application into three responsibilities:

- **Model** — manages application data and rules.
- **View** — presents information to the user.
- **Controller** — handles user input and coordinates the application's response.

The goal is to separate application behavior and data from the user interface, making each part easier to understand, change, and test.

MVC defines responsibilities; it does not require a particular programming language, framework, folder structure, or number of classes.

## The three components

### 1. Model

The Model represents and manages application data and the rules that apply to it.

Typical responsibilities:
- Managing application data and state.
- Applying domain or business rules.
- Providing operations for reading or changing data.
- Coordinating with persistence mechanisms when appropriate.

The Model should not depend on the user interface. It should not need to know about HTML elements, CSS classes, or browser events.

**Example:** In a gallery application, a gallery model might manage the list of images and provide operations to add or remove an image.

A Model is not necessarily a database table, nor is it necessarily just an API wrapper. Database access and HTTP communication can be delegated to repositories or services.

### 2. View

The View is responsible for presenting information to the user.

Typical responsibilities:
- Creating or updating the user interface.
- Displaying data supplied by the application.
- Showing visual states such as loading, success, and error.
- Providing visual elements that can receive user interaction.

The View focuses on **how information is displayed**, not on deciding business rules or application flow.

**Example:** A gallery view might render image cards, display an empty state, and show a loading indicator.

A View may expose methods such as `renderImages(images)` or `showError(message)`. These remain View responsibilities because they control presentation.

### 3. Controller

The Controller handles input and coordinates the application's response.

Typical responsibilities:
- Receiving user actions or application events.
- Interpreting the requested action.
- Calling the appropriate Model operations.
- Coordinating external operations when needed.
- Deciding which View update should happen next.

The Controller should not become the place where all data rules or DOM construction are implemented.

**Example:** When a user clicks an image's delete button, a gallery controller can receive the action, ask the Model to remove the image, and coordinate an update to the View.

## How MVC works

A common interaction flow is:

```text
        User
         |
         | performs an action
         v
     Controller
       /     \
      v       v
   Model     View
      |        ^
      |        |
      +--------+
   updated data
   is presented
```

In practical terms:

1. The user performs an action in the interface.
2. The Controller receives that action.
3. The Controller asks the Model to perform the required operation.
4. The Model updates or provides application data.
5. The Controller coordinates the appropriate View update.
6. The View presents the result.

This is a conceptual flow, not a mandatory sequence for every MVC implementation. Some implementations let the View observe Model changes; others have the Controller explicitly update the View.

## Example: Login form

Imagine a user submitting a login form.

| Component | Responsibility |
|---|---|
| View | Displays the form and reads the values entered by the user. |
| Controller | Handles the submit action, coordinates authentication, and decides what to display next. |
| Model | Represents relevant user or authentication state and applies application rules. |

A simplified flow:

```text
User submits the form
        |
        v
Login View emits the submit action
        |
        v
Login Controller handles the action
        |
        v
Authentication operation is requested
        |
        v
Model / authentication service returns or updates state
        |
        v
Controller chooses the next UI state
        |
        v
View displays success or an error
```

The exact location of authentication logic depends on the architecture. In a web application, the server must verify credentials and enforce authorization. Client-side code must never be treated as the authority for deciding whether a user is authenticated or allowed to access protected data.

## MVC in server-side and client-side applications

MVC describes how responsibilities are separated. It does not dictate whether the code runs on a server or in a browser.

### Server-side MVC

In a traditional server-rendered web application, the server handles a request and returns an HTML response.

```text
Browser
   |
   | HTTP request
   v
Router
   |
   v
Controller
   |
   v
Model <----> Database
   |
   v
View / Template
   |
   | HTML response
   v
Browser
```

A typical request works like this:

1. The browser sends an HTTP request.
2. The server routes the request to a Controller.
3. The Controller uses the Model to retrieve or change data.
4. The Controller selects a View and provides the required data.
5. The server renders HTML and sends it to the browser.

The browser may make another request after receiving the response. Server-side MVC commonly uses sessions and cookies to maintain user-related state across requests.

### Client-side MVC

In a client-side application, the browser runs the MVC components. JavaScript handles user interactions and updates the interface, while a backend may provide data through an API.

```text
Browser
  |
  v
View -- user action --> Controller
                           |
                           v
                         Model
                           |
                           v
                       API Service
                           |
                     HTTP request
                           |
                           v
                      Backend API
                           |
                           v
                        Database

Controller coordinates the View update
```

A typical interaction works like this:

1. The View displays the current interface.
2. The user performs an action.
3. The Controller handles the action.
4. The Controller asks the Model to perform an operation.
5. The Model may use an API service to communicate with the backend.
6. The Model's data or state is updated.
7. The Controller coordinates a View update.

The page does not need to reload for every interaction. JavaScript can update only the relevant part of the interface.

The API service is a supporting layer, not one of the three MVC components. It isolates communication with external systems, such as an HTTP API.

## MVC is about responsibility, not folder names

A project does not become MVC simply because it contains folders named `models`, `views`, and `controllers`.

Ask these questions:

- Does the Model manage application data and rules without depending on the UI?
- Does the View focus on presenting information?
- Does the Controller handle input and coordinate application behavior?
- Are responsibilities separated enough that changing one part does not unnecessarily affect the others?

Judge the architecture by what each part does and what it depends on—not by its name.

## Benefits

- **Separation of concerns:** Each component has a clearer responsibility.
- **Maintainability:** UI changes are less likely to require changes to data rules.
- **Testability:** Models and Controllers can often be tested without rendering the full interface.
- **Reusability:** The same application data or operations can sometimes support multiple Views.
- **Collaboration:** Work can be divided by responsibility when boundaries are clear.

## Trade-offs

- **More structure:** Small applications may need only a few functions; introducing many classes and layers can add unnecessary complexity.
- **Coordination overhead:** Components need clear interfaces and a consistent way to communicate.
- **Implementation varies:** MVC implementations do not all use the same event flow or place every responsibility in exactly the same component.
- **It does not solve every problem:** MVC alone does not define routing, dependency injection, API design, persistence, authentication, or state synchronization.

## Common misconceptions

- **“The Model is the database.”** Not exactly. The Model represents application data and rules; persistence is one concern it may use.
- **“The View must contain no logic at all.”** The View can contain presentation logic, such as choosing how to render a visual state. It should not own business rules or application flow.
- **“The Controller should contain all the logic.”** The Controller coordinates behavior. Putting every rule and data operation in it creates a large, difficult-to-maintain Controller.
- **“MVC requires three classes for every feature.”** No. The pattern defines responsibilities, not a mandatory class count or file layout.
- **“Client-side MVC and server-side MVC are different patterns.”** They apply the same separation of responsibilities in different execution environments, and their implementations can vary.

## Summary

MVC separates an application's responsibilities into three parts:

- **Model:** manages application data and rules.
- **View:** presents information to the user.
- **Controller:** handles input and coordinates the response.

The key idea is not to follow a particular directory structure. It is to keep responsibilities and dependencies clear, so the application can evolve without every change affecting every other part.


