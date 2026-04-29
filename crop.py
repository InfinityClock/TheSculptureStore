from PIL import Image

# Open the white logo which has the white S
img = Image.open('public/logo/logo-white.png')
bbox = img.getbbox()

if bbox:
    img = img.crop(bbox)
    w, h = img.size
    
    # The icon mark is on the left
    icon_w = h
    icon = img.crop((0, 0, icon_w, h))
    
    # Create a new image with a dark blue background
    bg_color = (13, 30, 46, 255) # #0D1E2E
    bg = Image.new("RGBA", icon.size, bg_color)
    
    # Paste the transparent white icon over the background
    bg.paste(icon, (0, 0), icon)
    
    # Save as app/icon.png
    bg.save('app/icon.png')
    print("Saved icon with dark blue background to app/icon.png")
