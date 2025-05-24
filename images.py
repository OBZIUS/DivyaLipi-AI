import os
import requests

# Directory to save images
save_dir = "data sets"
os.makedirs(save_dir, exist_ok=True)

# Base URL pattern (image number inserted at runtime)
base_url_pattern = "https://images.lib.cam.ac.uk//content/images/MS-ADD-00866-000-00{page_num}.jpg"

headers = {
    "User-Agent": "Mozilla/5.0 (compatible; ImageDownloader/1.0)"
}

def download_image(page_num):
    # Pad page number to 3 digits
    page_str = str(page_num).zfill(3)
    img_url = base_url_pattern.format(page_num=page_str)

    print(f"Downloading image from {img_url}")
    response = requests.get(img_url, headers=headers)
    if response.status_code == 200:
        filename = os.path.join(save_dir, f"page_{page_str}.jpg")
        with open(filename, 'wb') as f:
            f.write(response.content)
        print(f"Saved {filename}")
    else:
        print(f"Failed to download page {page_str}, status code: {response.status_code}")

def main():
    for page in range(277, 411):  # From 017 to 410 inclusive
        download_image(page)

if __name__ == "__main__":
    main()
