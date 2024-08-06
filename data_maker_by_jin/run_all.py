import subprocess
from termcolor import colored

# Danh sách các file Python cần chạy
files_to_run = ['data_p1.py', 'data_p2.py', 'data_p3.py', 'data_p4.py']

# Hàm để chạy từng file
def run_file(file_name):
    try:
        subprocess.run(['python3', file_name], check=True)
        print(colored(f"Chạy {file_name} thành công",'blue'))
    except subprocess.CalledProcessError as e:
        print(f"Error running {file_name}: {e}")

# Chạy từng file trong danh sách
for file in files_to_run:
    run_file(file)
