
(function () {
  
    
  var ToggleElements = document.querySelectorAll(".ms-Toggle");
  for (var i = 0; i < ToggleElements.length; i++) {
    new fabric['Toggle'](ToggleElements[i]);
  }
	
	
	 var DatePickerElements = document.querySelectorAll(".ms-DatePicker");
  for (var i = 0; i < DatePickerElements.length; i++) {
    new fabric['DatePicker'](DatePickerElements[i]);
  }

	  var DropdownHTMLElements = document.querySelectorAll('.ms-Dropdown');
  for (var i = 0; i < DropdownHTMLElements.length; ++i) {
    var Dropdown = new fabric['Dropdown'](DropdownHTMLElements[i]);
  }
	

	
	
	var SearchBoxElements = document.querySelectorAll(".ms-SearchBox");
  for (var i = 0; i < SearchBoxElements.length; i++) {
    new fabric['SearchBox'](SearchBoxElements[i]);
  }
	
	
	var example = document.querySelector(".docs-DialogExample-close");
    var button = example.querySelector(".docs-DialogExample-button");
    var dialog = example.querySelector(".ms-Dialog");
    var label = example.querySelector(".docs-DialogExample-label")
    var checkBoxElements = example.querySelectorAll(".ms-CheckBox");
    var actionButtonElements = example.querySelectorAll(".ms-Dialog-action");
    var checkBoxComponents = [];
    var actionButtonComponents = [];
    // Wire up the dialog
    var dialogComponent = new fabric['Dialog'](dialog);
    // Wire up the checkBoxes
    for (var i = 0; i < checkBoxElements.length; i++) {
      checkBoxComponents[i] = new fabric['CheckBox'](checkBoxElements[i]);
    }
    // Wire up the buttons
    for (var i = 0; i < actionButtonElements.length; i++) {
      actionButtonComponents[i] = new fabric['Button'](actionButtonElements[i], actionHandler);
    }
    // When clicking the button, open the dialog
    button.onclick = function() {
      openDialog(dialog);
    };
    function actionHandler(event) {
      var labelText = "";
      var counter = 0;
      for (var i = 0; i < checkBoxComponents.length; i++) {
        if (checkBoxComponents[i].getValue()) {
          counter++;
        }
      }
      //labelText += counter + " option(s) selected. " + this.innerText.trim() + " clicked";
      //label.innerText = labelText;
    }
    function openDialog(dialog) {
      // Open the dialog
      dialogComponent.open();
    }
	

}());
