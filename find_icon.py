from PIL import Image

img = Image.open('public/logo/logo-blue.png')
# find bounding box of alpha > 0
alpha = img.split()[-1]
bbox = alpha.getbbox()
print("Alpha bbox:", bbox)

# The icon is on the left. Let's find the gap between the icon and the text.
w, h = img.size
pixels = list(alpha.getdata())
# sum alpha columns
cols = [0]*w
for y in range(h):
    for x in range(w):
        cols[x] += pixels[y*w + x]

# Find the first column > 0
start_x = -1
for x in range(w):
    if cols[x] > 0:
        start_x = x
        break

# Find the next column == 0 after start_x (the gap between icon and text)
end_x = -1
for x in range(start_x, w):
    if cols[x] == 0:
        end_x = x
        break

print("Icon x range:", start_x, end_x)
icon_width = end_x - start_x
print("Icon width:", icon_width)
print("Image height bbox:", bbox[1], bbox[3])
icon_height = bbox[3] - bbox[1]
print("Icon height:", icon_height)

# crop the exact icon
icon = img.crop((start_x, bbox[1], end_x, bbox[3]))
# make it square
size = max(icon_width, icon_height)
# add padding
pad = int(size * 0.1)
final_size = size + 2*pad

bg_color = (13, 30, 46, 255) # dark blue
bg = Image.new("RGBA", (final_size, final_size), bg_color)

# paste white icon? The user wants the white icon on dark blue bg.
img_white = Image.open('public/logo/logo-white.png')
icon_white = img_white.crop((start_x, bbox[1], end_x, bbox[3]))

offset_x = (final_size - icon_width) // 2
offset_y = (final_size - icon_height) // 2
bg.paste(icon_white, (offset_x, offset_y), icon_white)
bg.save('app/icon.png')
print("Saved perfect square icon to app/icon.png")
