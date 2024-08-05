(function() {
    // Prompt the user for the desired letter
    var desiredLetter = prompt("Enter the desired letter (A, B, C):", "A");
    
    if (desiredLetter === null || desiredLetter === "") {
        alert("Operation cancelled.");
        return;
    }
    
    // Ensure the desired letter is uppercase
    desiredLetter = desiredLetter.toUpperCase();
    
    // Get the active composition
    var activeComp = app.project.activeItem;
    
    if (!(activeComp instanceof CompItem)) {
        alert("Please select a composition.");
        return;
    }
    
    app.beginUndoGroup("Activate and Parent Layers");

    // Function to find the child composition with the desired letter and process its layers
    function processCompWithLetter(comp, letter) {
        var childCompName = "!" + letter;
        var childComp = null;
        
        // Find the child composition with the desired letter in its name
        for (var i = 1; i <= comp.numLayers; i++) {
            var layer = comp.layer(i);
            if (layer instanceof AVLayer && layer.source instanceof CompItem && layer.source.name.indexOf(childCompName) !== -1) {
                childComp = layer.source;
                break;
            }
        }
        
        if (!childComp) {
            alert("No composition with the letter '" + letter + "' found in the name.");
            return;
        }
        
        // Find the layer with "BoxGreen" in its name
        var boxGreenLayer = null;
        for (var j = 1; j <= childComp.numLayers; j++) {
            var childLayer = childComp.layer(j);
            if (childLayer.name.indexOf("BoxGreen") !== -1) {
                boxGreenLayer = childLayer;
                break;
            }
        }
        
        if (!boxGreenLayer) {
            alert("No layer with 'BoxGreen' in the name found in the composition.");
            return;
        }
        
        // Make all layers in the child composition visible and parent them to the "BoxGreen" layer
        for (var k = 1; k <= childComp.numLayers; k++) {
            var layerToParent = childComp.layer(k);
            layerToParent.enabled = true; // Make the layer visible
            if (layerToParent !== boxGreenLayer) {
                layerToParent.parent = boxGreenLayer; // Parent the layer
            }
        }
    }

    // Start processing the child composition with the desired letter
    processCompWithLetter(activeComp, desiredLetter);

    app.endUndoGroup();
})();
