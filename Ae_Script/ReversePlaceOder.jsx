// Get the active composition
var comp = app.project.activeItem;

if (comp && comp instanceof CompItem) {
    // Begin undo group
    app.beginUndoGroup("Reverse Layer Order");

    var numLayers = comp.numLayers;

    for (var i = 1; i <= numLayers / 2; i++) {
        // Swap the layers
        var layerA = comp.layer(i);
        var layerB = comp.layer(numLayers - i + 1);

        var tempIndex = layerA.index;

        layerA.moveToBeginning();
        layerB.moveToBeginning();

        layerB.moveBefore(layerA);
    }

    // End undo group
    app.endUndoGroup();
} else {
    alert("Please select a composition with layers.");
}
