import os

# Mapping suits to their respective single-character abbreviations
suit_mapping = {"clubs": "C", "diamonds": "D", "hearts": "H", "spades": "S"}

# Mapping face cards to their respective single-character abbreviations
rank_mapping = {"ace": "A", "jack": "J", "queen": "Q", "king": "K"}


def clean_filenames(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".svg"):
            # Split the filename to extract the rank and suit
            parts = filename.split("_")
            rank = parts[0]  # e.g., '2' or 'jack'
            suit = parts[-1].replace(".svg", "")  # e.g., 'clubs'

            # Check if the rank is a face card and map it accordingly
            if rank in rank_mapping:
                rank = rank_mapping[rank]

            # Get the suit abbreviation
            suit_abbreviation = suit_mapping.get(suit, "")

            # Construct the new filename
            new_filename = f"{rank}{suit_abbreviation}.svg"

            # Rename the file
            os.rename(
                os.path.join(directory, filename), os.path.join(directory, new_filename)
            )
            print(f"Renamed {filename} to {new_filename}")


directory_path = "./"
clean_filenames(directory_path)
