import CreateElement from "../Utilities/00.Create_Element.js";
import LocalSave from "../Utilities/01.Local_Save.js";
import Dashboard from "../Dashboard.js";
import Utilities from "../Utilities/00.Widget_Utilities.js";

let isCurrentEdit = null;

/**
 * The html frame the will be imported into the dashboard.
 * Do not use alone, add a customized widget inside.
 * @property {index} Use a globale "widgetID" and is used to increment/decrement div id.
 * @property {id} Use "this.index" plus a name for the div container.
 * @property {parentNode} Is a parentNode parameters to insert as a child.
 * @property {title} Is a string value used to set the title of the widget.
 * @property {isEditing} Is a boolean value used to see if the widget is in editing mode.
 * @property {content} Is a function that create the widget frame.
 * @constructor (Index, Id, ParentNode, Title)
 * @param Index Is used to set the widget property index.
 * @param Id Is used to set the widget property id.
 * @param ParentNode Is used to set the widget property parentNode.
 * @param Title Is used to set the widget property title.
 * @function addHtmlFrame() Is a function that create the widget frame.
 */
class Widget_Container {
  constructor(Index, Id, ParentNode, Title) {
    this.index = Index;
    this.id = Id;
    this.parentNode = ParentNode;

    this.title = Title;
    this.isEditing = false;
    this.content = this.addHtmlFrame(this.title);
  }

  /**
   * Function that create the widget html frame, style.
   * @param widgetTitle This param uses this.title to set the title of the widget.
   */
  addHtmlFrame(widgetTitle) {
    //#region Frame de base
    const widget = CreateElement.createDiv(this.id, "widget", this.parentNode);

    const header = CreateElement.createDiv(
      // Widget Header
      `Header${this.index}`,
      "widget-header small-padding-y",
      widget
    );

    // Widget Title section
    CreateElement.createH3(
      `HeaderTitle${this.index}`,
      "widget-title",
      widgetTitle,
      header
    );

    // Widget management buttons section
    const ButtonsDiv = CreateElement.createDiv(
      `buttons${this.index}`,
      `widget-buttons`,
      header
    );

    // Callback function du Edit button
    this.editOnClick = () => {
      if (isCurrentEdit && isCurrentEdit !== this) {
        isCurrentEdit.saveOnClick();
      }
      this.isEditing = true;
      isCurrentEdit = this;

      this.EditBtn.classList.add("hidden");
      this.DragBtn.classList.remove("hidden");
      this.RemoveBtn.classList.remove("hidden");
      this.SaveBtn.classList.remove("hidden");
      this.DragBtn.classList.remove("hidden");
      this.ResizeBtn.classList.remove("hidden");
    };
    this.EditBtn = CreateElement.createButton(
      `EditBtn${this.index}`,
      `widget-btn color-flax opacity50`,
      ``,
      this.editOnClick,
      ButtonsDiv
    );
    this.EditBtn.innerHTML = `<span class="material-symbols-outlined">settings</span>`;

    // TODO Callback function du Drag button
    // TUTO https://codepen.io/Tnatal/pen/KKKXPwE
    const draggableOnClick = () => {
      widget.classList.add("draggable");
      this.DragBtn.classList.remove("opacity50");
      this.DragBtn.classList.add("pulse");
    };
    this.DragBtn = CreateElement.createButton(
      `DragBtn${this.index}`,
      `widget-btn color-flax opacity50 fade-in hidden`,
      ``,
      draggableOnClick,
      ButtonsDiv
    );
    this.DragBtn.innerHTML = `<span class="material-symbols-outlined">drag_pan</span>`;

    const resizableOnClick = () => {
      widget.classList.add("resizable");
      this.ResizeBtn.classList.remove("opacity50");
      this.ResizeBtn.classList.add("pulse");
    };
    this.ResizeBtn = CreateElement.createButton(
      `ResizeBtn${this.index}`,
      `widget-btn color-flax opacity50 fade-in hidden`,
      ``,
      resizableOnClick,
      ButtonsDiv
    );
    this.ResizeBtn.innerHTML = `<span class="material-symbols-outlined">aspect_ratio</span>`;

    // Remove button
    // Callback function du Remove button
    this.removeOnClick = () => {
      widget.remove();
      // BUG remove from SavedWidgets[]
      Dashboard.SavedWidgets.splice(this.index, 1);
      // BUG remove from localStorage
      LocalSave.saveItem("Widgets", Dashboard.SavedWidgets);
    };
    this.RemoveBtn = CreateElement.createButton(
      `RemoveBtn${this.index}`,
      `widget-btn color-flax opacity50 fade-in hidden`,
      ``,
      this.removeOnClick,
      ButtonsDiv
    );
    this.RemoveBtn.innerHTML = `<span class="material-symbols-outlined"> delete </span>`;

    // Save Button
    // Callback function du Save button
    this.saveOnClick = () => {
      if (!this.isEditing) return;
      this.isEditing = false;
      isCurrentEdit = null;

      this.EditBtn.classList.remove("hidden");
      this.RemoveBtn.classList.add("hidden");
      this.SaveBtn.classList.add("hidden");

      this.DragBtn.classList.remove("pusle");
      this.DragBtn.classList.add("opacity50");
      this.DragBtn.classList.add("hidden");
      widget.classList.remove("draggable");

      this.ResizeBtn.classList.remove("pulse");
      this.ResizeBtn.classList.add("opacity50");
      widget.classList.remove("resizable");
      this.ResizeBtn.classList.add("hidden");
    };
    this.SaveBtn = CreateElement.createButton(
      `SaveBtn${this.index}`,
      `widget-save-btn color-green opacity50 pulse hidden`,
      ``,
      this.saveOnClick,
      ButtonsDiv
    );
    this.SaveBtn.innerHTML = `<span class="material-symbols-outlined">check</span>`;

    // // Main content div of the widget
    // this.widgetContentDiv = CreateElement.createDiv(
    //   `WidgetContent${this.index}`,
    //   `widget-content`,
    //   widget
    // );
    //#endregion
  }
}
export default Widget_Container;
