(function() {
    // Prompt the user for the names of the compositions
    var compNamesInput = prompt("Enter the names of the compositions, separated by commas:", "");

    if (compNamesInput === null || compNamesInput.trim() === "") {
        alert("Operation cancelled.");
        return;
    }

    // Split the input into an array of composition names
    var compNames = compNamesInput.split(",").map(function(name) {
        return name.trim();
    });

    app.beginUndoGroup("Disable Specific Layers in Multiple Compositions");

    // List of layer names to disable
    var layerNamesToDisable = [
        "A_Tick Outlines", "A_BoxGreen Outlines", "C_Tick Outlines",
        "C_BoxGreen Outlines", "B_Tick Outlines", "B_BoxGreen Outlines"
    ];

    // Function to disable specific layers in the composition
    function disableSpecificLayersInComp(comp) {
        for (var i = 1; i <= comp.numLayers; i++) {
            var layer = comp.layer(i);

            // Check if the layer name is in the list of names to disable
            if (layerNamesToDisable.indexOf(layer.name) !== -1) {
                // Disable (hide) the layer
                layer.enabled = false;
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
            disableSpecificLayersInComp(comp);
        } else {
            alert("Composition '" + compName + "' not found.");
        }
    });

    app.endUndoGroup();
})();
