from PIL import Image

img_white = Image.open('public/logo/logo-white.png')
w, h = img_white.size
print(f"Image size: {w}x{h}")

# The icon is exactly the left-most square, h x h
icon_size = h
icon = img_white.crop((0, 0, icon_size, icon_size))

# Add 15% padding
pad = int(icon_size * 0.15)
final_size = icon_size + 2 * pad

bg_color = (13, 30, 46, 255) # #0D1E2E
bg = Image.new("RGBA", (final_size, final_size), bg_color)

bg.paste(icon, (pad, pad), icon)
bg.save('app/icon.png')
print("Saved perfect padded favicon to app/icon.png")
