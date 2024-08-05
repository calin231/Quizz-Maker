// This script replaces all layers named "Timer" with the footage "Timer_Flag.mov" in the selected composition and its sub-compositions in Adobe After Effects.

{
    function replaceTimerLayers(comp, footage) {
        for (var i = 1; i <= comp.numLayers; i++) {
            var layer = comp.layer(i);
            if (layer instanceof AVLayer && layer.source instanceof CompItem) {
                // Recursive call for nested compositions
                replaceTimerLayers(layer.source, footage);
            } else if (layer.name === "Timer") {
                var newLayer = comp.layers.add(footage);
                newLayer.moveBefore(layer);
                newLayer.startTime = layer.startTime;
                newLayer.inPoint = layer.inPoint;
                newLayer.outPoint = layer.outPoint;
                newLayer.transform.position.setValue(layer.transform.position.value);
                newLayer.transform.anchorPoint.setValue(layer.transform.anchorPoint.value);
                newLayer.transform.scale.setValue(layer.transform.scale.value);
                newLayer.transform.rotation.setValue(layer.transform.rotation.value);
                newLayer.transform.opacity.setValue(layer.transform.opacity.value);
                layer.remove();
            }
        }
    }

    function main() {
        app.beginUndoGroup("Replace Timer Layers");

        var comp = app.project.activeItem;
        if (!(comp instanceof CompItem)) {
            alert("Please select a composition.");
            return;
        }

        var footageFile = "Timer_Flag.mov";
        var footage = null;

        // Find the footage in the project
        for (var i = 1; i <= app.project.numItems; i++) {
            var item = app.project.item(i);
            if (item instanceof FootageItem && item.name === footageFile) {
                footage = item;
                break;
            }
        }

        if (!footage) {
            alert("Footage 'Timer_Flag.mov' not found in the project.");
            return;
        }

        // Replace Timer layers in the selected comp and its sub-comps
        replaceTimerLayers(comp, footage);

        app.endUndoGroup();
    }

    main();
}
