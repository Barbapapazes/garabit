---
title: Getting Started with Vue 3 and Vite
description: Learn how to set up a new Vue 3 project with Vite, the fast build tool for modern web development. Explore the basics of Vue 3, including the Composition API, reactivity, components, and more.
date: 2024-09-14
---

> [!WARNING]
> This has been written by an AI in order to have some content. Do not use it as a reference.

[[toc]]

Vue.js is a progressive JavaScript framework that simplifies building modern web applications. Created by **Evan You**, Vue is designed to be flexible and integrates well with existing projects or new ones. With the release of **Vue 3**, the framework has introduced significant improvements in performance, TypeScript support, and new features like the Composition API.

## Why Vue.js 3?

Vue.js 3 brings several enhancements over its predecessor:

- **Improved Performance**: Faster rendering and smaller bundle sizes.
- **Composition API**: Better logic reuse and code organization.
- **Enhanced TypeScript Support**: First-class support for TypeScript.
- **New Features**: Fragments, Teleport, and Suspense components.

## Setting Up Vue 3 with Vite

To leverage the full potential of Vue 3, it's recommended to use **Vite** as your build tool. Vite is a fast development server and build tool that offers instant hot module replacement (HMR) and leverages native ES modules.

### Installing Vite

First, make sure you have Node.js installed (version 12 or higher).

**Step 1: Initialize a New Project**

Open your terminal and run:

```bash
npm init vite@latest my-vue-app -- --template vue
cd my-vue-app
npm install
```

This command sets up a new Vue 3 project using Vite.

**Step 2: Run the Development Server**

Start the development server with:

```bash
npm run dev
```

You should see output similar to:

```bash
  VITE v3.x.x  ready in x ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open `http://localhost:5173/` in your browser to see the application running.

## Basics of Vue 3

### The Main Application File

In Vue 3, the main application file is typically `main.js` (or `main.ts` for TypeScript users):

```javascript
// main.js
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```

### The Root Component

The `App.vue` file is the root component of your application:

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Vue 3 + Vite" />
  </div>
</template>

<script setup>
import HelloWorld from "./components/HelloWorld.vue";
</script>

<style>
/* Global styles */
</style>
```

### Composition API

Vue 3 introduces the **Composition API**, which allows for better code organization and logic reuse.

Here's an example using the Composition API:

```vue
<!-- HelloWorld.vue -->
<template>
  <h1>{{ msg }}</h1>
  <p>{{ message }}</p>
  <button @click="increment">Clicked {{ count }} times</button>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const message = ref("Hello, Vue 3 with Composition API!");
const count = ref(0);

function increment() {
  count.value++;
}
</script>

<style scoped>
button {
  margin-top: 1em;
}
</style>
```

In this example:

- **`ref`**: Creates reactive and mutable data properties.
- **`script setup`**: A syntax sugar that makes Composition API code cleaner.
- **`defineProps`**: Used to define props in `<script setup>`.

### Reactive Data Binding

Vue 3 continues to use an intuitive syntax for data binding:

```vue
<template>
  <input v-model="inputText" placeholder="Type something" />
  <p>You typed: {{ inputText }}</p>
</template>

<script setup>
import { ref } from "vue";

const inputText = ref("");
</script>
```

- **`v-model`**: Creates two-way data bindings on form input elements.
- **Reactivity**: Updates the DOM automatically when `inputText` changes.

### Conditionals and Loops

Use directives like `v-if` and `v-for` to handle conditionals and loops:

```vue
<template>
  <p v-if="visible">You can see me!</p>
  <ul>
    <li v-for="(item, index) in items" :key="index">{{ item }}</li>
  </ul>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(true);
const items = ref([
  "Learn Vue 3",
  "Build something awesome",
  "Share it with the world",
]);
</script>
```

- **`v-if`**: Conditionally renders elements.
- **`v-for`**: Renders a list based on an array.

### Components

Vue is component-based, allowing you to break your UI into reusable pieces.

**Creating a Component:**

```vue
<!-- components/MyButton.vue -->
<template>
  <button @click="handleClick">{{ label }}</button>
</template>

<script setup>
defineProps({
  label: String,
});

function handleClick() {
  console.log("Button clicked!");
}
</script>

<style scoped>
button {
  padding: 0.5em 1em;
}
</style>
```

**Using the Component:**

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <MyButton label="Click Me" />
  </div>
</template>

<script setup>
import MyButton from "./components/MyButton.vue";
</script>
```

- **Props**: Components receive data via props, making them dynamic.
- **Events**: Handle user interactions within components.

### Lifecycle Hooks

Lifecycle hooks in the Composition API are imported from 'vue':

```vue
<script setup>
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  console.log("Component mounted");
});

onUnmounted(() => {
  console.log("Component unmounted");
});
</script>
```

- **`onMounted`**: Called after the component is mounted.
- **`onUnmounted`**: Called before the component is unmounted.

### Using Teleport

The **Teleport** component allows you to render content outside of the current component's DOM tree.

```vue
<template>
  <button @click="showModal = true">Open Modal</button>

  <Teleport to="body">
    <div v-if="showModal" class="modal">
      <p>This is a modal dialog.</p>
      <button @click="showModal = false">Close</button>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from "vue";

const showModal = ref(false);
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
</style>
```

- **`Teleport`**: Moves its content to a specified location in the DOM.
- Useful for modals, tooltips, and other UI elements that need to escape parent styles.

## Conclusion

Vue 3, combined with Vite, provides a powerful and efficient way to build modern web applications. The new Composition API offers better ways to organize and reuse code, and Vite significantly improves the development experience with its fast HMR and minimal configuration.

For more advanced use cases, you can integrate official libraries like **Vue Router** for client-side routing or **Pinia** (the new state management library) for state management.

---

By embracing Vue 3 and Vite, you're set up for a modern development workflow that's both enjoyable and highly productive.
