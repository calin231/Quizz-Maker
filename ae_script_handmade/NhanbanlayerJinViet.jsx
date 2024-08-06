// Lấy composition hiện tại
var comp = app.project.activeItem;

if (comp == null || !(comp instanceof CompItem)) {
    alert("Hãy chọn một composition trước khi chạy script.");
} else {
    app.beginUndoGroup("Duplicate FlagBox Layers");

    // Số lượng layers cần nhân bản
    var numLayers = 30;

    // Tìm layer gốc
    var baseLayer = comp.layer("FlagBox1");

    if (baseLayer == null) {
        alert("Không tìm thấy layer 'FlagBox1'.");
    } else {
        for (var i = 1; i <= numLayers; i++) {
            // Nhân bản layer gốc
            var newLayer = baseLayer.duplicate();
            newLayer.name = "FlagBox" + i;

            // Cập nhật expression cho thuộc tính Position của mỗi layer
            var positionExpression = 'thisComp.layer(">Flag' + i + '").transform.position;';
            newLayer.transform.position.expression = positionExpression;

            // Cập nhật expression cho thuộc tính Scale của mỗi layer
            var scaleExpression = 'var img = thisComp.layer(">Flag' + i + '");\n' +
                                  'var imgSize = img.sourceRectAtTime(time, false);\n' +
                                  'var shapeSize = thisLayer.sourceRectAtTime(time, false);\n' +
                                  'var padding = 50; // Thêm padding 50 pixels\n' +
                                  'var scaleX = (imgSize.width + padding) / shapeSize.width;\n' +
                                  'var scaleY = (imgSize.height + padding) / shapeSize.height;\n' +
                                  '[scaleX * value[0], scaleY * value[1]];';
            newLayer.transform.scale.expression = scaleExpression;
        }
    }

    app.endUndoGroup();
}
