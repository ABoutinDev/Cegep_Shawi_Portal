import { buildEditMode, savedQuestions } from "../Modes/Mode_Edit.js";
import { buildTestMode } from "../Modes/Mode_Test.js";
import {
  createDiv,
  createInput,
  createLabel,
  createPara,
  Question,
  validateInput,
  validateCheckbox,
} from "../Utilities/Utilities.js";

// Create the main div of SectionThree.
export function buildButtonSection(parent) {
  const divSectionThree = createDiv("buttonContainer", "text-fade-in", parent);

  const actionBtnDiv = createDiv("buttonDiv", "flex-column", divSectionThree);

  const formBtnDiv = createDiv("formButton", "flex-row wrap", actionBtnDiv);

  const btnNew = createInput(
    "buttonNew",
    "small-btn",
    "button",
    "",
    "",
    formBtnDiv
  );
  btnNew.value = "New form";

  const btnEdit = createInput(
    "buttonEdit",
    "small-btn",
    "button",
    "",
    "",
    formBtnDiv
  );
  btnEdit.value = "Edit mode";
  btnEdit.disabled = false;

  const btnTest = createInput(
    "buttonTest",
    "small-btn",
    "button",
    "",
    "",
    formBtnDiv
  );
  btnTest.value = "Test mode";

  const btnPrint = createInput(
    "buttonPrint",
    "small-btn",
    "button",
    "",
    "",
    formBtnDiv
  );
  btnPrint.value = "Print";

  const btnReset = createInput(
    "buttonReset",
    "small-btn",
    "button",
    "",
    "",
    formBtnDiv
  );
  btnReset.value = "Reset";

  /* EVENTS */
  // Edit mode
  btnEdit.addEventListener("click", () => {
    let mode = true;
    switchMode(mode, parent);
  });

  // Test mode
  btnTest.addEventListener("click", () => {
    let mode = false;
    switchMode(mode, parent);
  });

  // Reset form
  btnNew.addEventListener("click", () => resetForm());

  // Print form
  btnPrint.addEventListener("click", () => {
    window.print();
  });
}

function resetForm() {
  for (let i = 0; i < savedQuestions.length; i++) {
    savedQuestions.pop();
  }

  document.getElementById("divSectionTwo").innerHTML = ``;
  document.getElementById("modifyTitle").value = ``;
  document.getElementById("modifySubject").value = ``;
  document.getElementById("selectMenu").selectedIndex = 0;
}

function switchMode(mode, parent) {
  const buttonTest = document.getElementById("buttonTest");
  const buttonEdit = document.getElementById("buttonEdit");
  const modeHeader = document.getElementById("modeHeader");

  // if (savedQuestions.length === 0) {
  //   alert("There is no question saved to your form. Go back to editing.");
  //   return;
  // } else

  console.log(buttonEdit);
  console.log(buttonTest);

  if (mode) {
    buttonEdit.disabled = true;
    buttonEdit.classList = "disabled-btn";
    buttonTest.classList.remove("disabled-btn");
    buttonTest.classList = "small-btn";
    buttonTest.disabled = false;
    buildEditMode();
  } else if (!mode) {
    buttonTest.disabled = true;
    buttonTest.classList = "disabled-btn";
    buttonEdit.classList.remove("disabled-btn");
    buttonEdit.classList = "small-btn";
    buttonEdit.disabled = false;
    buildTestMode();
  }
  parent.remove();
  modeHeader.remove();
}
