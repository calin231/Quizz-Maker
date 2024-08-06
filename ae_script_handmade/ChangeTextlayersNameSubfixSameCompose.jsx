// This script changes all text layers ending with a number in a composition to a desired number, including nested compositions

(function() {
    // Prompt the user for the desired number
    var newNumber = prompt("Enter the desired number:", "5");
    
    if (newNumber === null) {
        alert("Operation cancelled.");
        return;
    }
    
    // Convert the input to a string to ensure it can be appended to layer names
    newNumber = String(newNumber);
    
    // Get the active composition
    var activeComp = app.project.activeItem;
    
    if (!(activeComp instanceof CompItem)) {
        alert("Please select a composition.");
        return;
    }
    
    app.beginUndoGroup("Change Text Layers");

    // Function to change text layers in a composition
    function changeTextLayersInComp(comp) {
        // Loop through all layers in the composition
        for (var i = 1; i <= comp.numLayers; i++) {
            var layer = comp.layer(i);
            
            // Check if the layer is a text layer
            if (layer instanceof TextLayer) {
                // Get the name of the layer
                var layerName = layer.name;
                
                // Use a regular expression to find text layers ending with a number
                var regex = /(.*?)(\d+)$/;
                var matches = layerName.match(regex);
                
                if (matches) {
                    // Change the layer name to end with the new number
                    var newLayerName = matches[1] + newNumber;
                    layer.name = newLayerName;
                }
            }
            // If the layer is a precomposition, call this function recursively
            else if (layer instanceof AVLayer && layer.source instanceof CompItem) {
                changeTextLayersInComp(layer.source);
            }
        }
    }

    // Start changing text layers in the active composition
    changeTextLayersInComp(activeComp);

    app.endUndoGroup();
})();
