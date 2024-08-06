// Lấy composition hiện tại
var comp = app.project.activeItem;

if (comp == null || !(comp instanceof CompItem)) {
    alert("Hãy chọn một composition trước khi chạy script.");
} else {
    app.beginUndoGroup("Group Flag and FlagBox Layers");

    // Số lượng layers cần sắp xếp
    var numLayers = 30;

    // Đặt khoảng cách giữa các layer là 2 frame
    var frameDuration = comp.frameDuration;
    var spacing = 2 * frameDuration;

    for (var i = numLayers; i >= 1; i--) {
        var flagLayerName = ">Flag" + i;
        var flagBoxLayerName = "FlagBox" + i;

        var flagLayer = comp.layer(flagLayerName);
        var flagBoxLayer = comp.layer(flagBoxLayerName);

        if (flagLayer != null && flagBoxLayer != null) {
            // Di chuyển layer FlagBox ngay dưới layer Flag
            flagBoxLayer.moveBefore(flagLayer);

            // Thiết lập thời gian bắt đầu cho layer Flag và FlagBox
            var startTime = (numLayers - i) * spacing;
            flagLayer.startTime = startTime;
            flagBoxLayer.startTime = startTime;
        }
    }

    app.endUndoGroup();
}
