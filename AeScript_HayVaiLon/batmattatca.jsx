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

    app.beginUndoGroup("Enable All Layers in Multiple Compositions");

    // Function to enable all layers in the composition
    function enableAllLayersInComp(comp) {
        for (var i = 1; i <= comp.numLayers; i++) {
            var layer = comp.layer(i);
            // Enable (show) the layer
            layer.enabled = true;
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
            enableAllLayersInComp(comp);
        } else {
            alert("Composition '" + compName + "' not found.");
        }
    });

    app.endUndoGroup();
})();
