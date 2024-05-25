// src/stores/formData.js
import { writable } from "svelte/store";

export const addStartupFormData = writable({
  step1: {},
  step2: {},
});
