import pandas as pd
from termcolor import colored

def copy_data_to_custom_columns(input_file_path, output_file_path, base_column_name):
    # Load the Excel file
    df = pd.read_excel(input_file_path)

    # Nhập quy tắt đáp án đúng tại đây:
    column_mapping = {
        f'{base_column_name}1': 'B1',
        f'{base_column_name}2': 'A2',
        f'{base_column_name}3': 'B3',
        f'{base_column_name}4': 'C4',
        f'{base_column_name}5': 'A5',
        f'{base_column_name}6': 'C6',
        f'{base_column_name}7': 'A7',
        f'{base_column_name}8': 'C8',
        f'{base_column_name}9': 'A9',
        f'{base_column_name}10': 'B10',
        f'{base_column_name}11': 'C11',
        f'{base_column_name}12': 'A12',
        f'{base_column_name}13': 'B13',
        f'{base_column_name}14': 'C14',
        f'{base_column_name}15': 'A15',
        f'{base_column_name}16': 'B16',
        f'{base_column_name}17': 'A17',
        f'{base_column_name}18': 'C18',
        f'{base_column_name}19': 'B19',
        f'{base_column_name}20': 'A20',
        f'{base_column_name}21': 'B21',
        f'{base_column_name}22': 'C22',
        f'{base_column_name}23': 'A23',
        f'{base_column_name}24': 'B24',
        f'{base_column_name}25': 'C25',
        f'{base_column_name}26': 'A26',
        f'{base_column_name}27': 'B27',
        f'{base_column_name}28': 'C28',
        f'{base_column_name}29': 'A29',
        f'{base_column_name}30': 'A30'
    }

    # Copy the data according to the mapping
    for base_col, custom_col in column_mapping.items():
        if base_col in df.columns and custom_col in df.columns:
            df[custom_col] = df[base_col]

    # Save the modified DataFrame to a new Excel file
    df.to_excel(output_file_path, index=False)

    print(colored(f"Thêm đáp án random vào các cột đáp án sai thành công! hihi. Lưu file ở {output_file_path}", 'green'))

if __name__ == "__main__":
    input_file_path = 'Data_sheet_here/data_p2.xlsx'
    output_file_path = 'Data_sheet_here/data_p3.xlsx'
    
    # Đọc tên cột chứa đáp án đúng từ file text
    with open('Input_DieuKien.txt', 'r') as file:
        lines = file.readlines()
        base_column_name = lines[7].strip()  # Nhập tên cột chứa đáp án đúng

    copy_data_to_custom_columns(input_file_path, output_file_path, base_column_name)
