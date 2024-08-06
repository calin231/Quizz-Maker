import pandas as pd
import random

def fill_empty_columns(input_file_path, base_data_file_path, output_file_path, base_column_name):
    # Load the Excel files
    try:
        df = pd.read_excel(input_file_path)
    except FileNotFoundError:
        print("\033[91m\033[1mĐỤ MÁ QUÊN SỬA ĐƯỜNG DẪN BASE DATA Ở HÀNG 53 của data_p4 KÌA\033[0m")
        return

    try:
        base_df = pd.read_excel(base_data_file_path)
    except FileNotFoundError:
        print("\033[91m\033[1mĐỤ MÁ QUÊN SỬA ĐƯỜNG DẪN BASE DATA Ở HÀNG 53 của data_p4 KÌA\033[0m")
        return

    # Read the value from range.txt
    try:
        with open('range.txt', 'r') as file:
            content = file.read().strip()
            if content:
                range_value = int(content)
            else:
                print("\033[91m\033[1mTệp range.txt rỗng\033[0m")
                return
    except FileNotFoundError:
        print("\033[91m\033[1mKHÔNG TÌM THẤY TỆP range.txt\033[0m")
        return
    except ValueError:
        print("\033[91m\033[1mGiá trị trong tệp range.txt không hợp lệ\033[0m")
        return

    # Extract unique values from the base column in the base data
    unique_values = base_df[base_column_name].unique()

    # Convert all target columns to string type to avoid incompatible dtype issues
    for suffix in ['A', 'B', 'C']:
        for group_number in range(1, range_value):
            custom_col = f'{suffix}{group_number}'
            if custom_col in df.columns:
                df[custom_col] = df[custom_col].astype(str)

    # Fill empty custom columns with random unique values from the base data
    for suffix in ['A', 'B', 'C']:
        for group_number in range(1, range_value):
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
                        choices = list(set(unique_values) - filled_values)
                        if choices:
                            df.at[i, custom_col] = random.choice(choices)

    # Save the modified DataFrame to a new Excel file
    df.to_excel(output_file_path, index=False)

    print(f"Đã tạo Data thành công. File lưu ở {output_file_path}")

if __name__ == "__main__":
    input_file_path = 'data_p3.xlsx'
    base_data_file_path = 'Flags-Lib.xlsx'
    output_file_path = 'data_p4_final.xlsx'
    # In chữ màu đỏ
    base_column_name = input("\033[91m\033[1mNhập cột để lấy data random cho đáp án sai: \033[0m")
    fill_empty_columns(input_file_path, base_data_file_path, output_file_path, base_column_name)
