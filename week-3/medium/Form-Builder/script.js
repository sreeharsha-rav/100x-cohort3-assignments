// track the field type and show/hide options accordingly
document.getElementById("fieldType").addEventListener("change", function () {
  const fieldType = this.value;
  const optionsContainer = document.getElementById("optionsContainer");
  if (fieldType === "radio" || fieldType === "checkbox") {
    optionsContainer.style.display = "block";
  } else {
    optionsContainer.style.display = "none";
  }
});

// add new option
document.getElementById("addOption").addEventListener("click", function () {
  const fieldOptions = document.getElementById("fieldOptions");
  const fieldOption = document.createElement("div");
  fieldOption.className = "field-option";
  fieldOption.innerHTML = `
  <input type="text" class="option-input" placeholder="Enter Option Text" />
  <button class="btn btn-danger" id="removeOption">Remove</button>
`;
  fieldOptions.appendChild(fieldOption);
});

// remove option
document.getElementById("fieldOptions").addEventListener("click", function (e) {
  if (e.target.id === "removeOption") {
    e.target.parentElement.remove();
  }
});

// add new field to the form preview
document.getElementById("addField").addEventListener("click", function () {
  const fieldType = document.getElementById("fieldType").value;
  const fieldName = document.getElementById("fieldName").value;

  if (!fieldName) {
    alert("Please enter field name");
    return;
  }

  const formPreview = document.getElementById("formPreview");
  const fieldContainer = document.createElement("div");
  fieldContainer.className = "field-container";

  // add a delete button
  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger";
  deleteButton.innerHTML = "X";
  deleteButton.onclick = function () {
    fieldContainer.remove();
  };

  fieldContainer.appendChild(deleteButton);

  // add field label
  const fieldLabel = document.createElement("label");
  fieldLabel.className = "field-label";
  fieldLabel.textContent = fieldName;
  fieldContainer.appendChild(fieldLabel);

  // create field input based on field type
  switch (fieldType) {
    case "text":
      const fieldInput = document.createElement("input");
      fieldInput.type = fieldType;
      fieldInput.className = "field-name-input";
      fieldContainer.appendChild(fieldInput);
      break;
    case "radio":
    case "checkbox":
      const fieldOptions = document.getElementsByClassName("option-input");
      if (fieldOptions.length === 0) {
        alert("Please add options");
        return;
      }

      for (let option of fieldOptions) {
        if (!option.value) {
          alert("Please enter option text");
          return;
        }

        const fieldOption = document.createElement("div");
        fieldOption.className = "field-option";

        const optionInput = document.createElement("input");
        optionInput.type = fieldType;
        optionInput.name = fieldName;
        optionInput.value = option.value;
        fieldOption.appendChild(optionInput);

        const optionLabel = document.createElement("label");
        optionLabel.textContent = option.value;
        fieldOption.appendChild(optionLabel);

        fieldContainer.appendChild(fieldOption);
      }
      break;
  }

  formPreview.appendChild(fieldContainer);
});
