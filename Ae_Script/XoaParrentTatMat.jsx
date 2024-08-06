(function() {
    // Get the active composition
    var activeComp = app.project.activeItem;

    if (!(activeComp instanceof CompItem)) {
        alert("Please select a composition.");
        return;
    }

    app.beginUndoGroup("Remove Parent and Disable Layers");

    // Function to process layers in the composition
    function processLayersInComp(comp) {
        for (var i = 1; i <= comp.numLayers; i++) {
            var layer = comp.layer(i);

            // Remove parent
            layer.parent = null;

            // Disable (hide) the layer
            layer.enabled = false;

            // If the layer is a precomposition, call this function recursively
            if (layer instanceof AVLayer && layer.source instanceof CompItem) {
                processLayersInComp(layer.source);
            }
        }
    }

    // Start processing the active composition
    processLayersInComp(activeComp);

    app.endUndoGroup();
})();
