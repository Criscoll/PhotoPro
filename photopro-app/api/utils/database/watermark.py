from PIL import Image, ImageDraw, ImageFont

def apply_watermark(input, output):
    photo = Image.open(input).convert('RGBA')
    w, h = photo.size

    # Create semi-transparent watermark text image
    watermark = Image.new('RGBA', photo.size, (255,255,255,0))

    # Setting up watermark
    wfont = ImageFont.truetype("arial.ttf", 24)
    wtxt = "PhotoPro Copyright"
    wmdraw = ImageDraw.Draw(watermark)

    x = w/2
    y = h/2

    # Draw watermark image and paste over base photo
    wmdraw.text((x,y), wtxt, font=wfont, fill=(255,255,255,128))
    outphoto = Image.alpha_composite(photo, wmdraw)

    # save watermarked photo
    outphoto.save(output)