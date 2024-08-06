// This script deletes all shape layers with a specified name in the sub-compositions
// of the selected composition in Adobe After Effects and notifies the user of the number of layers deleted.

{
    function deleteShapeLayers(comp, layerName) {
        var deletedCount = 0;
        for (var i = comp.numLayers; i >= 1; i--) {
            var layer = comp.layer(i);
            if (layer instanceof AVLayer && layer.source instanceof CompItem) {
                // Recursive call for nested compositions
                deletedCount += deleteShapeLayers(layer.source, layerName);
            } else if (layer instanceof ShapeLayer && layer.name === layerName) {
                layer.remove();
                deletedCount++;
            }
        }
        return deletedCount;
    }

    function main() {
        app.beginUndoGroup("Delete Specified Shape Layers");

        var comp = app.project.activeItem;
        if (!(comp instanceof CompItem)) {
            alert("Please select a composition.");
            return;
        }

        var layerName = prompt("Enter the name of the shape layer to delete:", "");
        if (!layerName) {
            alert("No layer name specified. Operation cancelled.");
            return;
        }

        // Delete specified shape layers in the selected comp and get the count of deleted layers
        var totalDeleted = deleteShapeLayers(comp, layerName);

        alert(totalDeleted + " layers named '" + layerName + "' have been deleted.");

        app.endUndoGroup();
    }

    main();
}
