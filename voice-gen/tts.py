import os
import uuid
from elevenlabs import VoiceSettings
from elevenlabs.client import ElevenLabs
from elevenlabs.core.api_error import ApiError

# Đọc API key từ file api_key.txt
with open('api_key.txt', 'r') as file:
    ELEVENLABS_API_KEY = file.read().strip()

client = ElevenLabs(
    api_key=ELEVENLABS_API_KEY,
)

# Define the folder where you want to save the audio files
output_folder = "audio_output"
os.makedirs(output_folder, exist_ok=True)

def text_to_speech_file(text: str) -> str:
    try:
        # Calling the text_to_speech conversion API with detailed parameters
        response = client.text_to_speech.convert(
            voice_id="pNInz6obpgDQGcFmaJgB",  # Adam pre-made voice
            optimize_streaming_latency="0",
            output_format="mp3_22050_32",
            text=text,
            model_id="eleven_turbo_v2_5",  # use the turbo model for low latency
            voice_settings=VoiceSettings(
                stability=0.75,  # Increase stability for consistent voice
                similarity_boost=1.0,
                style=0.5,  # Adjust style for consistent tone
                use_speaker_boost=True,
            ),
        )

        # Generate a unique file name for the output MP3 file
        file_name = f"{text}.mp3"
        save_file_path = os.path.join(output_folder, file_name)

        # Writing the audio to a file
        with open(save_file_path, "wb") as f:
            for chunk in response:
                if chunk:
                    f.write(chunk)

        print(f"{save_file_path}: A new audio file was saved successfully!")

        # Return the path of the saved audio file
        return save_file_path
    except ApiError as e:
        print(f"API error occurred: {e.status_code}, {e.body}")
    except Exception as e:
        print(f"An error occurred: {e}")
        return ""

# Example usage
if __name__ == "__main__":
    text_to_speech_file("This is a test.")
