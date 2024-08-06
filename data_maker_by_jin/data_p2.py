import pandas as pd
from termcolor import colored

# Đọc số lượng nhóm và số cột muốn thêm từ tệp văn bản
with open('Input_DieuKien.txt', 'r') as file:
    lines = file.readlines()
    num_groups = int(lines[3].strip())  # Đọc dòng thứ 4 và chuyển thành số nguyên
    num_columns = int(lines[5].strip())  # Đọc dòng thứ 6 và chuyển thành số nguyên
    logo_column_prefix = lines[9].strip()  # Đọc dòng thứ 10 và lấy giá trị

# Xác định danh sách các tên cột theo số cột được chọn
column_names = ['A', 'B', 'C', 'D'][:num_columns]

# Đọc dữ liệu từ file Excel
file_path = 'Data_sheet_here/data_p1.xlsx'
df = pd.read_excel(file_path)

# Chèn các cột mới cho từng nhóm
for i in range(1, num_groups + 1):
    logo_col = f'{logo_column_prefix}{i}'
    cols_to_insert = [f'{col}{i}' for col in column_names]
    insert_position = df.columns.get_loc(logo_col) + 1
    
    for col in cols_to_insert:
        df.insert(insert_position, col, "")
        insert_position += 1  # Cập nhật vị trí chèn cho các cột tiếp theo

# Đặt tên tệp đầu ra
output_file_path = 'Data_sheet_here/data_p2.xlsx'

# Lưu DataFrame đã chỉnh sửa trở lại file Excel
df.to_excel(output_file_path, index=False)

# In thông báo thành công với chữ màu xanh lá cây
print(colored(f"Đã thêm số đáp án thành công vào {output_file_path}", 'green'))
