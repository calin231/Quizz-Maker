import pandas as pd

def add_custom_columns_fixed(file_path, num_columns):
    # Load the Excel file
    df = pd.read_excel(file_path)

    # Get the original column names
    original_columns = df.columns

    # Create a list to hold the new columns with custom suffixes for each group
    new_columns_with_custom = []
    suffixes = ["A", "B", "C"]

    # Determine the number of groups based on the original columns
    num_groups = len(original_columns) // 3

    # Iterate over the original columns, adding the new custom columns after each group
    for i in range(num_groups):
        new_columns_with_custom.extend(original_columns[i*3:i*3+3])
        for j in range(num_columns):
            new_columns_with_custom.append(f"{suffixes[j]}{i+1}")

    # Create a new DataFrame with the new columns
    new_df_with_custom = pd.DataFrame(columns=new_columns_with_custom)

    # Copy the original data and add empty custom columns
    for i in range(num_groups):
        new_df_with_custom[original_columns[i*3]] = df[original_columns[i*3]]
        new_df_with_custom[original_columns[i*3 + 1]] = df[original_columns[i*3 + 1]]
        new_df_with_custom[original_columns[i*3 + 2]] = df[original_columns[i*3 + 2]]
        for j in range(num_columns):
            new_df_with_custom[f"{suffixes[j]}{i+1}"] = ""

    # Save the modified DataFrame to a new Excel file
    output_file_path_final = 'data_p2_fixed.xlsx'
    new_df_with_custom.to_excel(output_file_path_final, index=False)

    print(f"File saved to {output_file_path_final}")

if __name__ == "__main__":
    file_path = 'data_p1.xlsx'  # Path to your input file
    num_columns = int(input("Nhập số đáp án muốn thêm: "))  # Number of custom columns to add
    add_custom_columns_fixed(file_path, num_columns)
