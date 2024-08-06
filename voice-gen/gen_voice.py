from tts import text_to_speech_file

with open("text_input.txt", "r", encoding="utf-8") as f:
    for line in f:
        clean_text = line.strip()  # Loại bỏ khoảng trắng và ký tự xuống dòng
        if clean_text:  # Chỉ gọi hàm nếu dòng không rỗng
            text_to_speech_file(clean_text)
            