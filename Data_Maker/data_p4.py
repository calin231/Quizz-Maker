import pandas as pd
import random
from termcolor import colored

def fill_empty_columns(input_file_path, base_data_file_path, output_file_path, base_column_name, range_value):
    # Load the Excel files
    try:
        df = pd.read_excel(input_file_path)
    except FileNotFoundError:
        print("\033[91m\033[1mĐỤ MÁ QUÊN SỬA ĐƯỜNG DẪN Ở DÒNG 12 FILE Input_DieuKien.txt kìa thằng/con đĩ lồn\033[0m")
        return

    try:
        base_df = pd.read_excel(base_data_file_path)
    except FileNotFoundError:
        print("\033[91m\033[1mĐỤ MÁ QUÊN SỬA ĐƯỜNG DẪN Ở DÒNG 12 FILE Input_DieuKien.txt kìa thằng/con đĩ lồn\033[0m")
        return

    # Extract unique values from the base column in the base data
    unique_values = base_df[base_column_name].unique()

    # Convert all target columns to string type to avoid incompatible dtype issues
    for suffix in ['A', 'B', 'C', 'D']:
        for group_number in range(1, range_value + 1):
            custom_col = f'{suffix}{group_number}'
            if custom_col in df.columns:
                df[custom_col] = df[custom_col].astype(str)

    # Fill empty custom columns with random unique values from the base data
    for suffix in ['A', 'B', 'C', 'D']:
        for group_number in range(1, range_value + 1):
            custom_col = f'{suffix}{group_number}'
            if custom_col in df.columns:
                for i in range(len(df)):
                    if pd.isna(df.at[i, custom_col]) or df.at[i, custom_col] == 'nan':
                        filled_values = set()
                        if f'A{group_number}' in df.columns:
                            filled_values.add(df.at[i, f'A{group_number}'])
                        if f'B{group_number}' in df.columns:
                            filled_values.add(df.at[i, f'B{group_number}'])
                        if f'C{group_number}' in df.columns:
                            filled_values.add(df.at[i, f'C{group_number}'])
                        if f'D{group_number}' in df.columns:
                            filled_values.add(df.at[i, f'D{group_number}'])
                        choices = list(set(unique_values) - filled_values)
                        if choices:
                            df.at[i, custom_col] = random.choice(choices)

    # Save the modified DataFrame to a new Excel file
    df.to_excel(output_file_path, index=False)

    print(colored(f"Yay!!!!!!!!!!!!!!!! Đã tạo Data thành công. File lưu ở {output_file_path}", 'green'))

if __name__ == "__main__":
    input_file_path = 'Data_sheet_here/data_p3.xlsx'
    output_file_path = 'Data_sheet_here/data_p4_final_output.xlsx'
    
    # Đọc các giá trị từ file Input_DieuKien.txt
    with open('Input_DieuKien.txt', 'r') as file:
        lines = file.readlines()
        range_value = int(lines[3].strip()) + 1  # Lấy giá trị từ hàng 4 và +1
        base_column_name = lines[9].strip()  # Lấy giá trị từ hàng 10
        base_data_file_path = lines[11].strip()  # Lấy giá trị từ hàng 12

    fill_empty_columns(input_file_path, base_data_file_path, output_file_path, base_column_name, range_value)
