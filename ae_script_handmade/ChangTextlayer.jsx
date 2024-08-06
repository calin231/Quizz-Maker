
// This script changes all text layers ending with a number in a composition to a desired number, including nested compositions
// Additionally, it updates text layers with names starting with "^STT" and ending with "/30" with the new number as their source text

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
                
                // Regular expression to find text layers ending with a number
                var numberRegex = /(.*?)(\d+)$/;
                // Regular expression to find text layers starting with "^STT" and ending with "/30"
                var sttRegex = /^\^STT.*\/30$/;
                
                if (layerName.match(sttRegex)) {
                    // Update the source text with the new number
                    layer.property("Source Text").setValue(newNumber);
                } else if (layerName.match(numberRegex)) {
                    // Change the layer name to end with the new number
                    var matches = layerName.match(numberRegex);
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
