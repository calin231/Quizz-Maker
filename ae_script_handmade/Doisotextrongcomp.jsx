(function() {
    // List of compositions to process
    var compNames = [
        "!A2", "!B2", "!C2", "!A3", "!B3", "!C3", "!A4", "!B4", "!C4", "!A5", "!B5", "!C5",
        "!A6", "!B6", "!C6", "!A7", "!B7", "!C7", "!A8", "!B8", "!C8", "!A9", "!B9", "!C9",
        "!A10", "!B10", "!C10", "!A11", "!B11", "!C11", "!A12", "!B12", "!C12", "!A13", "!B13", "!C13",
        "!A14", "!B14", "!C14", "!A15", "!B15", "!C15", "!A16", "!B16", "!C16", "!A17", "!B17", "!C17", "!A18", "!B18"
    ];

    app.beginUndoGroup("Change Text Layers Numbers");

    // Function to process layers in the composition
    function processLayersInComp(comp, newNumber) {
        var regex = /^(.*?)(\d+)$/;

        for (var i = 1; i <= comp.numLayers; i++) {
            var layer = comp.layer(i);

            // Check if the layer is a text layer
            if (layer instanceof TextLayer) {
                // Get the name of the layer
                var layerName = layer.name;

                // Use a regular expression to find text layers ending with a number
                var matches = layerName.match(regex);

                if (matches) {
                    // Change the layer name to end with the new number
                    var newLayerName = matches[1] + newNumber;
                    layer.name = newLayerName;

                    // Change the source text if it matches the pattern
                    var sourceText = layer.property("Source Text").value;
                    if (sourceText.match(regex)) {
                        var newSourceText = sourceText.replace(regex, "$1" + newNumber);
                        layer.property("Source Text").setValue(newSourceText);
                    }
                }
            }
            // If the layer is a precomposition, call this function recursively
            if (layer instanceof AVLayer && layer.source instanceof CompItem) {
                processLayersInComp(layer.source, newNumber);
            }
        }
    }

    // Process each composition by name
    compNames.forEach(function(compName) {
        var comp = null;
        for (var i = 1; i <= app.project.numItems; i++) {
            if (app.project.item(i) instanceof CompItem && app.project.item(i).name === compName) {
                comp = app.project.item(i);
                break;
            }
        }

        if (comp) {
            // Extract the number at the end of the composition name
            var newNumber = compName.match(/\d+$/)[0];
            processLayersInComp(comp, newNumber);
        } else {
            alert("Composition '" + compName + "' not found.");
        }
    });

    app.endUndoGroup();
})();
