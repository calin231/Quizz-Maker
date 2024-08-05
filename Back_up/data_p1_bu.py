import pandas as pd
import os

# Mã ANSI để in màu đỏ
RED = '\033[91m'
RESET = '\033[0m'

# Nhập dữ liệu input đầu tiên vào đây
file_path = 'Flags-Lib.xlsx'
df = pd.read_excel(file_path)

# Đảo vị trí các hàng
shuffled_df = df.sample(frac=1).reset_index(drop=True)

# Nhập số cột muốn lấy từ file
num_columns_to_select = int(input(f"{RED}Nhập số cột muốn lấy: {RESET}"))  # Nhập số cột mong muốn lấy

# Lấy tên các cột từ vị trí mong muốn
columns = df.columns[:num_columns_to_select]

# Hàm tạo dataframe mới với số câu hỏi tùy ý
def create_grouped_dataframe(df, number_of_questions, columns):
    new_data = {}
    
    for i in range(1, number_of_questions + 1):
        for col in columns:
            new_data[f'{col}{i}'] = []
    
    for i in range(0, len(df), number_of_questions):
        for j in range(number_of_questions):
            if i + j < len(df):
                for col in columns:
                    new_data[f'{col}{j+1}'] = new_data.get(f'{col}{j+1}', []) + [df.iloc[i + j][col]]
            else:
                for col in columns:
                    new_data[f'{col}{j+1}'] = new_data.get(f'{col}{j+1}', []) + [None]
    
    new_df = pd.DataFrame(new_data)
    
    # Loại bỏ các hàng trống
    new_df = new_df.dropna(how='all')
    
    return new_df

# Nhập số câu hỏi mong muốn
number_of_questions = int(input(f"{RED}Nhập số câu hỏi trong 1 video: {RESET}"))

# Tạo DataFrame mới với số câu hỏi mong muốn
new_df = create_grouped_dataframe(shuffled_df, number_of_questions, columns)

# Kiểm tra và loại bỏ hàng cuối nếu có ô trống
if new_df.iloc[-1].isnull().any():
    new_df = new_df[:-1]

# Đặt tên tệp đầu ra dựa trên tệp đầu vào
output_file_path = 'data_p1.xlsx'
new_df.to_excel(output_file_path, index=False)

print(f"Dataframe mới đã được lưu vào {output_file_path}")
