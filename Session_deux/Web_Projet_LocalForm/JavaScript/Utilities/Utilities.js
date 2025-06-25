import { savedQuestions } from "../Modes/Mode_Edit.js";

export class Question {
  constructor(question, type, score, option, answer) {
    this.question = question;
    this.type = type;
    this.score = score;
    this.option = option;
    this.answer = answer;
  }

  showQuestion() {
    return `${this.question} ${this.type} ${this.score} ${this.option} ${this.answer}`;
  }

  static saveQuestion(q, t, s, o, a) {
    let newQuestion = new Question(q, t, s, o, a);
    savedQuestions.push(newQuestion);
    return savedQuestions;
  }
}

export function validateInput(input) {
  // console.log(input);
  // let invalidChar = /[`!@#$%^&*()[{}:;"',.<>?*-+_=]/;
  let isEmpty = input.trim();
  if (isEmpty !== "") {
    return false;
    // } else if (invalidChar.test(input)) {
    //   return false;
  } else {
    return true;
  }
}

export function validateCheckbox(checkboxGroup) {
  for (let i = 0; i < checkboxGroup.length; i++) {
    const element = checkboxGroup[i];

    if (element.checked) {
      return true;
    }
  }
  return false;
}

export function createDiv(divId, divClass, parent = document.body) {
  const newDiv = document.createElement("div");
  newDiv.id = divId;
  newDiv.classList = divClass;

  parent.appendChild(newDiv);
  return newDiv;
}

export function createLabel(
  labelId,
  labelClass,
  labelText,
  parent = document.body
) {
  const newLabel = document.createElement("label");
  newLabel.id = labelId;
  newLabel.classList = labelClass;
  newLabel.textContent = labelText;

  parent.appendChild(newLabel);
  return newLabel;
}

export function createInput(
  inputId,
  inputClass,
  inputType,
  inputName,
  inputPlaceH,
  parent = document.body
) {
  const newInput = document.createElement("input");
  newInput.id = inputId;
  newInput.classList = inputClass;
  newInput.type = inputType;
  newInput.name = inputName;
  newInput.placeholder = inputPlaceH;

  parent.appendChild(newInput);
  return newInput;
}

export function createPara(
  paraId,
  paraClass,
  paraContent,
  parent = document.body
) {
  const newPara = document.createElement("p");
  newPara.id = paraId;
  newPara.classList = paraClass;
  newPara.textContent = paraContent;

  parent.appendChild(newPara);
  return newPara;
}

export function createButton(btnId, btnClass, btnText, parent = document.body) {
  const newBtn = document.createElement("button");
  newBtn.id = btnId;
  newBtn.classList = btnClass;
  newBtn.textContent = btnText;

  parent.appendChild(newBtn);
  return newBtn;
}
