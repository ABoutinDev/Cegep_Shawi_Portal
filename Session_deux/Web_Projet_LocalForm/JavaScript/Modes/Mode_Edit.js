/* IMPORT LIST */
import { buildButtonSection } from "../Utilities/Buttons.js";
import {
  createDiv,
  createInput,
  createLabel,
  createPara,
  Question,
  validateInput,
  validateCheckbox,
} from "../Utilities/Utilities.js";

/* GLOBAL VARIABLES */
export let savedQuestions = [];
const mainContainer = document.getElementById("mainContainer");

// TODO Function edit questions et validate l'edition

// window.print(); correctement mon preview

export function buildEditMode() {
  //#region BuildEditMode
  // Create the html form.
  const divForm = document.createElement("form");
  divForm.id = "form";
  divForm.className = "flex-column";
  divForm.classList.add("flex-center");
  divForm.target = "";
  mainContainer.appendChild(divForm);

  // Create a secondary title, Editing mode.
  const modeHeader = document.createElement("h3");
  modeHeader.id = "modeHeader";
  modeHeader.classList = "form-mode-title green-three text-fade-in";
  modeHeader.textContent = "Editing";
  mainContainer.insertBefore(modeHeader, divForm);

  // Create the main div of SectionOne.
  const divSectionOne = createDiv("divSectionOne", "text-fade-in", divForm);

  // Create content that is inserted in the SectionOne.
  buildSectionOne(divSectionOne);

  // Create the main div of SectionTwo, where the form will in preview and editable.
  // Content inside SectionTwo will be updated with events.
  const divSectionTwo = createDiv(
    "divSectionTwo",
    "section-border text-fade-in",
    divForm
  );
  updateSectionTwo();

  // Create the main div of SectionThree.
  buildButtonSection(divForm);
  //#endregion
}

//#region Build Section One
/** Build function SectionOne
 * @function buildSectionOne() purpose is to clear the intro of the form and rebuild an entire new div that contain our section 1 requirements.
 */
function buildSectionOne(sectionOne) {
  const formTitle = createDiv("titleContainer", "section-border", sectionOne);
  buildTitleDiv(formTitle);
  buildSubjectDiv(formTitle);

  buildQuestionMenu(sectionOne);
  showQuestionType();
}

/** Function purpose is to implant/create the title section into the form.
 * @param sectionOneDiv is a parent "Div" that we receive.
 */
function buildTitleDiv(sectionOneDiv) {
  const titleInputDiv = createDiv("titleInput", "title-input", sectionOneDiv);

  createPara("title", "green-two text-xsmall", "Form title", titleInputDiv);

  const inputTitle = createInput(
    "modifyTitle",
    "flex-row flex-center input width100 green-three",
    "text",
    "title",
    "Enter a title",
    titleInputDiv
  );

  inputTitle.addEventListener("keyup", saveTitleData);
  inputTitle.value = localStorage.getItem("myTitle");

  function saveTitleData() {
    localStorage.setItem("myTitle", inputTitle.value);
    inputTitle.value = localStorage.getItem("myTitle");
    console.log("Saved title.");
  }
}

/** Function purpose is to implant/create the subject section into the form.
 * @param sectionOneDiv is a parent "Div" that we receive.
 */
function buildSubjectDiv(sectionOneDiv) {
  const subjectInputDiv = createDiv(
    "subjectInput",
    "subject-input",
    sectionOneDiv
  );

  createPara(
    "subject",
    "green-two text-xsmall",
    "Form subject",
    subjectInputDiv
  );

  const subjectInput = createInput(
    "modifySubject",
    "flex-row flex-center input width100 green-three",
    "text",
    "subject",
    "Enter a subject",
    subjectInputDiv
  );

  subjectInput.addEventListener("keyup", saveSubjectData);
  subjectInput.value = localStorage.getItem("mySubject");

  function saveSubjectData() {
    localStorage.setItem("mySubject", subjectInput.value);
    subjectInput.value = localStorage.getItem("mySubject");
    console.log("Saved subject.");
  }
}

/** Function purpose is to implant/create the questions section into the form.
 * @param sectionOneDiv is a parent "Div" that we receive.
 */
function buildQuestionMenu(sectionOneDiv) {
  // Create, initialize and append a children to parent div "sectionOne".
  const newDiv = createDiv("questionContainer", "flex-column", sectionOneDiv);

  // Create and initialize text inside an H4 element.
  createPara("", "green-two text-xsmall", "Add a question", newDiv);

  // Create, initialize and append a children to parent div "questionContainer".
  const selectMenuDiv = createDiv("selectMenuDiv", "select-menu", newDiv);

  // Create, initialize, capture and modified innerHtml content.
  const questionMenuDiv = document.createElement("select");
  questionMenuDiv.id = "selectMenu";
  questionMenuDiv.classList = "input green-two text-xsmall green-three";
  questionMenuDiv.name = "questions";
  questionMenuDiv.innerHTML = `
    <option class="green-three" value="0"> Choose a question type </option>
    <option class="green-three" value="True or false"> True or false </option>
    <option class="green-three" value="Multiples choices"> Multiples choices </option>
    <option class="green-three" value="Multiples answers"> Multiples answers </option>
    <option class="green-three" value="Fix answer"> Fix answer </option> `;
  selectMenuDiv.appendChild(questionMenuDiv);

  // Create and initialize a children of div "dropdownContainer" to show the questions form input.
  createDiv("editQuestion", "question", selectMenuDiv);
}

function showQuestionType(loadQuestion) {
  const selectMenu = document.getElementById("selectMenu");
  console.log(loadQuestion);

  selectMenu.addEventListener("change", () => {
    //selectMenu.value = loadQuestion.type;

    const editQuestion = document.getElementById("editQuestion");
    editQuestion.innerHTML = ``;

    let questionContainer = null;
    let questionInput = null;
    let addAnswerInput = null;

    let answerContainer = null;
    let addInputBar = null;
    let newInputContainer = null;
    let validAnswer = null;
    let checkbox = null;
    // let isValid = null;

    let footerContainer = null;
    let scoreInput = null;
    let saveBtn = null;

    switch (selectMenu.value) {
      // case 1 - True or false
      case "True or false":
        questionContainer = createDiv(
          "questionContainer",
          "question-container bot-border",
          editQuestion
        );

        questionInput = createInput(
          "",
          "input-question",
          "text",
          "questions",
          "Untitled question",
          questionContainer
        );

        answerContainer = createDiv(
          "answerDiv",
          "flex-column",
          questionContainer
        );

        // Creating True div, input and label
        let trueDiv = createDiv("trueDiv", "flex-row", answerContainer);
        let trueInput = createInput(
          "true",
          "input-checkbox",
          "checkbox",
          "tof",
          "",
          trueDiv
        );
        trueInput.value = "True";
        createLabel("trueLabel", "text-small green-two", "True", trueDiv);

        // Creating False div, input and label
        let falseDiv = createDiv("trueDiv", "flex-row", answerContainer);
        let falseInput = createInput(
          "false",
          "input-checkbox",
          "checkbox",
          "tof",
          "",
          falseDiv
        );
        falseInput.value = "False";
        createLabel("falseLabel", "text-small green-two", "False", falseDiv);

        // Creating the question footer
        footerContainer = createDiv(
          "footer",
          "question-footer flex-row justify-between",
          questionContainer
        );

        scoreInput = createInput(
          "score",
          "input-score",
          "input",
          "",
          "value",
          footerContainer
        );

        saveBtn = createInput(
          "saveQuestion",
          "small-btn",
          "button",
          "",
          "",
          footerContainer
        );
        saveBtn.value = "Save";

        saveBtn.addEventListener("click", () => {
          checkbox = document.getElementsByName("tof");

          if (validateInput(questionInput.value)) {
            alert("Something is wrong with the question, please take a look.");
          } else if (!validateCheckbox(checkbox)) {
            alert("You must choose an answer between true or false.");
          } else if (isNaN(scoreInput.value)) {
            alert("Please enter a valid numeric value for the score.");
          } else if (scoreInput.value === "") {
            alert("Please enter a value for the score.");
          } else {
            validAnswer = "";
            for (const input of checkbox) {
              if (input.checked) {
                validAnswer = input.value;

                Question.saveQuestion(
                  questionInput.value,
                  selectMenu.value,
                  scoreInput.value,
                  [trueInput.value, falseInput.value],
                  validAnswer
                );
                updateSectionTwo();

                questionInput.value = "";
                selectMenu.selectedIndex = 0;
                scoreInput.value = "";
                trueInput.checked = false;
                falseInput.checked = false;
                editQuestion.innerHTML = ``;
              }
            }
          }
        });
        break;

      // case 2 - Multiples choices
      case "Multiples choices":
        questionContainer = createDiv(
          "questionContainer",
          "question-container bot-border",
          editQuestion
        );

        questionInput = createInput(
          "",
          "input-question",
          "text",
          "questions",
          "Untitled question",
          questionContainer
        );

        createPara(
          "pAnswers",
          "green-two text-xsmall",
          "Answers - Select the valid answers on the right",
          questionContainer
        );

        answerContainer = createDiv(
          "answers",
          "flex-column",
          questionContainer
        );

        addInputBar = createInput(
          "",
          "input-preview",
          "text",
          "",
          "Add an answer here",
          answerContainer
        );

        addInputBar.addEventListener("focus", () => {
          newInputContainer = createDiv("", "flex-row", answerContainer);
          addAnswerInput = createInput(
            "",
            "input-option",
            "text",
            "",
            "Answer here",
            newInputContainer
          );

          checkbox = createInput(
            "",
            "input-checkbox",
            "checkbox",
            "checkbox",
            "",
            newInputContainer
          );

          answerContainer.insertBefore(newInputContainer, addInputBar);
          addAnswerInput.focus();
        });

        // Creating the question footer
        footerContainer = createDiv(
          "footer",
          "question-footer flex-row justify-between",
          questionContainer
        );

        scoreInput = createInput(
          "score",
          "input-score",
          "input",
          "",
          "value",
          footerContainer
        );

        saveBtn = createInput(
          "saveQuestion",
          "small-btn",
          "button",
          "",
          "",
          footerContainer
        );
        saveBtn.value = "Save";

        saveBtn.addEventListener("click", () => {
          const choiceOptions = document.querySelectorAll(".input-option");
          checkbox = document.getElementsByName("checkbox");

          if (validateInput(questionInput.value)) {
            alert("Something is wrong with the question, please take a look.");
          } else if (!validateCheckbox(checkbox)) {
            alert("You must choose valid answer to your question.");
          } else if (isNaN(scoreInput.value)) {
            alert("Please enter a valid numeric value for the score.");
          } else if (scoreInput.value === "") {
            alert("Please enter a value for the score.");
          } else {
            let options = [];
            for (let i = 0; i < choiceOptions.length; i++) {
              let optionList = choiceOptions[i];
              options.push(optionList.value);
            }

            Question.saveQuestion(
              questionInput.value,
              selectMenu.value,
              scoreInput.value,
              options,
              "WIP"
            );
            updateSectionTwo();

            questionInput.value = "";
            selectMenu.selectedIndex = 0;
            scoreInput.value = "";
            choiceOptions.value = "";
            editQuestion.innerHTML = ``;
          }
        });
        break;

      // case 3 - Multiples answers
      case "Multiples answers":
        questionContainer = createDiv(
          "questionContainer",
          "question-container bot-border",
          editQuestion
        );

        questionInput = createInput(
          "",
          "input-question",
          "text",
          "questions",
          "Untitled question",
          questionContainer
        );

        createPara(
          "pAnswers",
          "green-two text-xsmall",
          "Answers - Select a valid answer on the right",
          questionContainer
        );

        answerContainer = createDiv(
          "answers",
          "flex-column",
          questionContainer
        );

        addInputBar = createInput(
          "",
          "input-preview",
          "text",
          "",
          "Add an answer here",
          answerContainer
        );

        addInputBar.addEventListener("focus", () => {
          newInputContainer = createDiv("", "flex-row", answerContainer);

          addAnswerInput = createInput(
            "",
            "input-option",
            "text",
            "",
            "Answer here",
            newInputContainer
          );

          checkbox = createInput(
            "",
            "input-checkbox",
            "checkbox",
            "checkbox",
            "",
            newInputContainer
          );
          checkbox.group = "unique-answer";

          answerContainer.insertBefore(newInputContainer, addInputBar);
          addAnswerInput.focus();
        });

        // Creating the question footer
        footerContainer = createDiv(
          "footer",
          "question-footer flex-row justify-between",
          questionContainer
        );

        scoreInput = createInput(
          "score",
          "input-score",
          "input",
          "",
          "value",
          footerContainer
        );

        saveBtn = createInput(
          "saveQuestion",
          "small-btn",
          "button",
          "",
          "",
          footerContainer
        );
        saveBtn.value = "Save";

        saveBtn.addEventListener("click", () => {
          const answerOptions = document.querySelectorAll(".input-option");
          checkbox = document.getElementsByName("checkbox");

          if (validateInput(questionInput.value)) {
            alert("Something is wrong with the question, please take a look.");
          } else if (!validateCheckbox(checkbox)) {
            alert("You must choose valid answer to your question.");
          } else if (isNaN(scoreInput.value)) {
            alert("Please enter a valid numeric value for the score.");
          } else if (scoreInput.value === "") {
            alert("Please enter a value for the score.");
          } else {
            let options = [];
            for (let i = 0; i < answerOptions.length; i++) {
              let optionList = answerOptions[i];
              options.push(optionList.value);
            }

            Question.saveQuestion(
              questionInput.value,
              selectMenu.value,
              scoreInput.value,
              options,
              "WIP"
            );
            updateSectionTwo();

            questionInput.value = "";
            selectMenu.selectedIndex = 0;
            scoreInput.value = "";
            answerOptions.value = "";
            editQuestion.innerHTML = ``;
          }
        });
        break;

      // case 4 - Fix answer
      case "Fix answer":
        questionContainer = createDiv(
          "questionContainer",
          "question-container bot-border",
          editQuestion
        );

        questionInput = createInput(
          "",
          "input-question",
          "text",
          "questions",
          "Untitled question",
          questionContainer
        );

        createPara(
          "pAnswers",
          "green-two text-xsmall",
          "Answers",
          questionContainer
        );

        let fixAnswerDiv = createDiv("answers", "flex-row", questionContainer);

        let fixAnswer = createInput(
          "",
          "input-answer",
          "text",
          "",
          "Add an answer",
          fixAnswerDiv
        );

        // Creating the question footer
        footerContainer = createDiv(
          "footer",
          "question-footer flex-row justify-between",
          questionContainer
        );

        scoreInput = createInput(
          "score",
          "input-score",
          "input",
          "",
          "value",
          footerContainer
        );

        saveBtn = createInput(
          "saveQuestion",
          "small-btn",
          "button",
          "",
          "",
          footerContainer
        );
        saveBtn.value = "Save";

        saveBtn.addEventListener("click", () => {
          checkbox = document.getElementsByName("checkbox");

          if (validateInput(questionInput.value)) {
            alert("Something is wrong with the question, please take a look.");
          } else if (fixAnswer.value === "") {
            alert("You must enter an answer.");
          } else if (isNaN(scoreInput.value)) {
            alert("Please enter a valid numeric value for the score.");
          } else if (scoreInput.value === "") {
            alert("Please enter a value for the score.");
          } else {
            Question.saveQuestion(
              questionInput.value,
              selectMenu.value,
              scoreInput.value,
              fixAnswer.value,
              fixAnswer.value
            );
            updateSectionTwo();

            questionInput.value = "";
            scoreInput.value = "";
            fixAnswer.value = "";
            selectMenu.selectedIndex = 0;
            editQuestion.innerHTML = ``;
          }
        });
        break;
    }
  });
}

/* SECTION TWO */
//#region Build Section Two
function updateSectionTwo() {
  const selectMenu = document.getElementById("selectMenu");
  const divSectionTwo = document.getElementById("divSectionTwo");

  const question = [];
  const questionHeader = [];
  const questionInfo = [];

  divSectionTwo.innerHTML = ``;

  buildPreviewHeader(divSectionTwo);

  for (let i = 0; i < savedQuestions.length; i++) {
    // Question(s) main div
    question[i] = createDiv(
      `questionDiv${i}`,
      `quest-class-${i} width100 flex-column small-margin bot-border text-fade-in`,
      divSectionTwo
    );

    // Div questionHeader
    questionHeader[i] = createDiv(
      `questionHeader${i}`,
      `quest-class-${i} width100 flex-row justify-between text-center`,
      question[i]
    );

    // Question count - type
    createLabel(
      `label${i}`,
      `label-class-${i} h4 green-three`,
      `Question ${i + 1} - Value: ${savedQuestions[i].score} - Type: ${savedQuestions[i].type
      }`,
      questionHeader[i]
    );

    const btnDiv = createDiv("buttonDiv", "", questionHeader[i]);

    // Edit button
    const editBtn = createInput(
      `editBtn${i}`,
      `xsmall-btn`,
      `button`,
      ``,
      ``,
      btnDiv
    );
    editBtn.value = "Edit";

    // Delete button
    const delBtn = createInput(
      `delBtn${i}`,
      `del-button-${i} xsmall-btn`,
      `button`,
      ``,
      ``,
      btnDiv
    );
    delBtn.value = "X";

    // Div questionInfo
    questionInfo[i] = createDiv(
      `infoQuestion${i}`,
      `quest-class-${i} flex-column`,
      question[i]
    );

    // Question name
    createPara(
      `question${i}`,
      `text-xsmall green-two`,
      savedQuestions[i].question,
      questionInfo[i]
    );

    // Answer option(s)
    if (
      savedQuestions[i].type === "Multiples answers" ||
      savedQuestions[i].type === "Multiples choices"
    ) {
      createPara(
        `options${i}`,
        `text-xsmall green-one`,
        `Options: ${savedQuestions[i].option}`,
        questionInfo[i]
      );
    }
    //Valid answer(s)
    if (
      savedQuestions[i].type === "Multiples answers" ||
      savedQuestions[i].type === "Multiples choices"
    ) {
      createPara(
        `answers${i}`,
        `text-xsmall green-one`,
        `Answers: ${savedQuestions[i].answer}`,
        questionInfo[i]
      );
    }

    /* EVENTS */
    // Delete question button
    delBtn.addEventListener("click", () => {
      question[i].remove();
      savedQuestions.splice(i - 1, 1);
      updateSectionTwo();
    });

    // Edit question button (En cours - non terminer)
    editBtn.addEventListener("click", () => {
      question[i].remove();
      //selectMenu.value = savedQuestions[i].type;
      showQuestionType(savedQuestions[i]);
    });
  }
}

function buildPreviewHeader(parent) {
  let inputTitle = localStorage.getItem("myTitle");
  let subjectInput = localStorage.getItem("mySubject");

  const previewContainer = createDiv(
    "formPreview",
    "flex-column text-fade-in",
    parent
  );
  let title = document.createElement("h3");
  title.classList = "h3 green-three text-fade-in";
  title.textContent = "Form title: " + inputTitle;
  previewContainer.appendChild(title);

  let subject = document.createElement("h4");
  subject.classList = "h5 green-three text-fade-in";
  subject.textContent = "Form subject: " + subjectInput;
  previewContainer.appendChild(subject);

  let totalScore = savedQuestions.reduce(
    (total, question) => total + (parseFloat(question.score) || 0),
    0
  );

  let score = document.createElement("h4");
  score.classList = "text-xsmall green-two text-fade-in";
  score.textContent = `Form score: ${totalScore}`;
  previewContainer.appendChild(score);
}
//#endregion
