def copy_and_add_extension(input_file, output_file, extension=".mp3"):
    try:
        # Mở file đầu vào để đọc
        with open(input_file, 'r', encoding='utf-8') as infile:
            lines = infile.readlines()
        
        # Mở file đầu ra ở chế độ ghi để xóa sạch nội dung cũ và ghi nội dung mới
        with open(output_file, 'w', encoding='utf-8') as outfile:
            for line in lines:
                # Thêm .mp3 vào cuối mỗi dòng và ghi vào file đầu ra
                outfile.write(line.strip() + extension + '\n')
        
        print(f"Nội dung đã được sao chép từ {input_file} sang {output_file} và thêm {extension} vào cuối mỗi dòng.")
    except FileNotFoundError:
        print(f"File {input_file} không tồn tại.")
    except Exception as e:
        print(f"Đã xảy ra lỗi: {e}")

# Gọi hàm với tên file đầu vào và đầu ra
input_file = 'text_input.txt'  # Thay bằng tên file đầu vào của bạn
output_file = 'text_output.txt'  # Thay bằng tên file đầu ra của bạn
copy_and_add_extension(input_file, output_file)
