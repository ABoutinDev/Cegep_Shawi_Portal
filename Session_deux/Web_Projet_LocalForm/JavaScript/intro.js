import { buildEditMode } from "./Modes/Mode_Edit.js";

/** GLOBAL CAPTURES */
let introContainer = document.getElementById("introContainer");
const buttonStart = document.getElementById("buttonStart");

buttonStart.addEventListener("click", () => {
  buildEditMode();
  if (introContainer && introContainer.parentNode) {
    introContainer.parentNode.removeChild(introContainer); // Erase my introduction
    introContainer = null; // If condition is preventing a console error afther the first execution
  }
});
