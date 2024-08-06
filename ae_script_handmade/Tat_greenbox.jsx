(function() {
    // Get the active composition
    var activeComp = app.project.activeItem;

    if (!(activeComp instanceof CompItem)) {
        alert("Please select a composition.");
        return;
    }

    app.beginUndoGroup("Disable Specific Layers in Selected Composition");

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

    // Process the active composition
    disableSpecificLayersInComp(activeComp);

    app.endUndoGroup();
})();
