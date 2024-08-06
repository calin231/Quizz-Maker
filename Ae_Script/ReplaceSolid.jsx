{
    // Tạo một hàm chính để thay thế footage bằng solid
    function replaceFootageWithSolid() {
        // Lấy project hiện tại
        var proj = app.project;

        // Kiểm tra xem có project mở hay không
        if (!proj) {
            alert("Không có project nào đang mở.");
            return;
        }

        // Lấy các item đã chọn trong project panel
        var selectedItems = proj.selection;

        // Kiểm tra xem có item nào được chọn hay không
        if (selectedItems.length === 0) {
            alert("Vui lòng chọn ít nhất một footage để thay thế.");
            return;
        }

        // Lặp qua từng item được chọn
        for (var i = 0; i < selectedItems.length; i++) {
            var item = selectedItems[i];

            // Kiểm tra xem item có phải là footage hay không
            if (item instanceof FootageItem) {
                // Tạo một solid mới
                var solidColor = [1, 0, 0]; // Màu đỏ, bạn có thể thay đổi theo ý muốn
                var solidName = "New Solid";
                var solidWidth = item.width;
                var solidHeight = item.height;
                var solidDuration = item.duration;

                var solid = proj.items.addComp(solidName, solidWidth, solidHeight, item.pixelAspect, solidDuration, 30);

                var solidLayer = solid.layers.addSolid(solidColor, solidName, solidWidth, solidHeight, item.pixelAspect, solidDuration);

                // Thay thế footage bằng solid mới
                item.replace(solidLayer.source);
            }
        }

        alert("Đã thay thế footage bằng solid.");
    }

    // Thực thi hàm chính
    app.beginUndoGroup("Replace Footage with Solid");
    replaceFootageWithSolid();
    app.endUndoGroup();
}
