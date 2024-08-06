// Lấy composition hiện tại
var comp = app.project.activeItem;

if (comp == null || !(comp instanceof CompItem)) {
    alert("Hãy chọn một composition trước khi chạy script.");
} else {
    app.beginUndoGroup("Group Flag and FlagBox Layers");

    // Số lượng layers cần sắp xếp
    var numLayers = 30;

    for (var i = 1; i <= numLayers; i++) {
        var flagLayerName = ">Flag" + i;
        var flagBoxLayerName = "FlagBox" + i;

        var flagLayer = comp.layer(flagLayerName);
        var flagBoxLayer = comp.layer(flagBoxLayerName);

        if (flagLayer != null && flagBoxLayer != null) {
            // Di chuyển layer Flag ngay trên layer FlagBox
            flagLayer.moveBefore(flagBoxLayer);
        }
    }

    app.endUndoGroup();
}
