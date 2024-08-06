// This script finds the shape layer named 'FlagBox' in the selected composition,
// removes all expressions on it, and then adds new expressions to keep it centered
// on a solid layer that starts with ">Flag" and adjusts its size with 50 padding.

{
    function findFlagBox(comp) {
        for (var i = 1; i <= comp.numLayers; i++) {
            var layer = comp.layer(i);
            if (layer instanceof ShapeLayer && layer.name === "FlagBox") {
                return layer;
            }
        }
        return null;
    }

    function findFlagSolid(comp) {
        for (var i = 1; i <= comp.numLayers; i++) {
            var layer = comp.layer(i);
            if (layer instanceof AVLayer && layer.name.indexOf(">Flag") === 0) {
                return layer;
            }
        }
        return null;
    }

    function main() {
        app.beginUndoGroup("Center FlagBox");

        var comp = app.project.activeItem;
        if (!(comp instanceof CompItem)) {
            alert("Please select a composition.");
            return;
        }

        var flagBoxLayer = findFlagBox(comp);
        if (!flagBoxLayer) {
            alert("No 'FlagBox' shape layer found.");
            return;
        }

        var flagSolidLayer = findFlagSolid(comp);
        if (!flagSolidLayer) {
            alert("No solid layer starting with '>Flag' found.");
            return;
        }

        // Remove all expressions from FlagBox layer
        flagBoxLayer.property("Transform").property("Position").expression = "";
        flagBoxLayer.property("Transform").property("Scale").expression = "";

        // Add new expressions to keep FlagBox centered and adjust size
        flagBoxLayer.property("Transform").property("Position").expression =
            "var solid = thisComp.layer('" + flagSolidLayer.name + "');\n" +
            "[solid.position[0], solid.position[1]];";

        flagBoxLayer.property("Transform").property("Scale").expression =
            "var solid = thisComp.layer('" + flagSolidLayer.name + "');\n" +
            "var padding = 50;\n" +
            "var width = solid.width - padding;\n" +
            "var height = solid.height - padding;\n" +
            "100 * [width / thisLayer.width, height / thisLayer.height];";

        app.endUndoGroup();
    }

    main();
}
