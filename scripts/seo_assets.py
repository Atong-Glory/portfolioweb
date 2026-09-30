#!/usr/bin/env python3
"""DevFusion portfolio — SEO/brand asset generator (PIL, no network).

Outputs (all under public/):
  og-image.png               1200x630  Open Graph / Twitter card
  icons/icon-512.png         512x512   rounded-square AG monogram
  icons/icon-192.png         192x192   downscaled copy
  icons/icon-32.png          32x32     favicon PNG fallback
  icons/apple-touch-icon.png 180x180   full-bleed square (iOS adds its own mask)
"""

from PIL import Image, ImageDraw, ImageFilter, ImageFont
from pathlib import Path

PUBLIC = Path("/home/z/my-project/public")
ICONS = PUBLIC / "icons"
ICONS.mkdir(parents=True, exist_ok=True)

BOLD = "/usr/share/fonts/truetype/english/Carlito-Bold.ttf"
REG = "/usr/share/fonts/truetype/english/Carlito-Regular.ttf"

# ---- palette (matches globals.css dark theme) ----
BG_TOP = (12, 15, 23)      # #0c0f17
BG_BOTTOM = (5, 7, 12)     # #05070c
ORANGE = (249, 115, 22)    # #f97316
ORANGE_DEEP = (234, 88, 12)
AMBER = (245, 158, 11)
WHITE = (255, 255, 255)
SUBTLE = (168, 179, 196)   # #a8b3c4
FAINT = (107, 118, 136)    # #6b7688


def font(path, size):
    return ImageFont.truetype(path, size)


def vgrad(size, top, bottom):
    """Vertical gradient image."""
    w, h = size
    img = Image.new("RGB", size)
    px = img.load()
    for y in range(h):
        t = y / max(h - 1, 1)
        c = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        for x in range(w):
            px[x, y] = c
    return img


def glow(img, cx, cy, rx, ry, color, alpha, blur):
    """Soft radial glow composited onto img."""
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=color + (alpha,))
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    img.alpha_composite(layer)


def grad_text(draw_img, xy, text, fnt, c_top, c_bottom):
    """Draw text filled with a vertical gradient using a mask."""
    mask = Image.new("L", draw_img.size, 0)
    ImageDraw.Draw(mask).text(xy, text, font=fnt, fill=255)
    grad = vgrad(draw_img.size, c_top, c_bottom).convert("RGBA")
    draw_img.paste(grad, (0, 0), mask)


def make_og():
    W, H = 1200, 630
    img = vgrad((W, H), BG_TOP, BG_BOTTOM).convert("RGBA")

    # ambient glows
    glow(img, 1050, -60, 430, 330, ORANGE, 66, 150)
    glow(img, 60, 660, 380, 260, AMBER, 34, 150)

    d = ImageDraw.Draw(img)

    # top-left brand pill
    f_pill = font(BOLD, 22)
    pill_text = "DEVFUSION PORTFOLIO"
    tw = d.textlength(pill_text, font=f_pill)
    px, py = 70, 66
    d.rounded_rectangle(
        [px, py, px + tw + 76, py + 44], radius=22,
        outline=ORANGE + (180,), width=2,
        fill=(249, 115, 22, 18),
    )
    d.ellipse([px + 18, py + 16, px + 30, py + 28], fill=ORANGE)
    d.text((px + 44, py + 9), pill_text, font=f_pill, fill=SUBTLE)

    # name
    f_name = font(BOLD, 104)
    grad_text(img, (66, 208), "ATONG GLORY", f_name, WHITE, (214, 222, 233))

    # orange accent bar
    d.rounded_rectangle([72, 348, 332, 360], radius=6, fill=ORANGE)

    # role line
    f_role = font(BOLD, 40)
    d.text((70, 392), "Frontend Developer · UI/UX & Graphics Designer",
           font=f_role, fill=SUBTLE)

    # tagline
    f_tag = font(REG, 29)
    d.text((70, 452),
           "Building exceptional digital experiences with modern technologies.",
           font=f_tag, fill=FAINT)

    # footer row: email (left) + url (right)
    f_foot = font(REG, 26)
    d.text((70, 548), "atongglory17@gmail.com", font=f_foot, fill=(146, 156, 172))
    url = "atongglory.vercel.app"
    uw = d.textlength(url, font=f_foot)
    d.text((W - 70 - uw, 548), url, font=f_foot, fill=ORANGE)

    img.convert("RGB").save(PUBLIC / "og-image.png", "PNG", optimize=True)
    print("og-image.png", img.size)


def rounded_icon(size, radius_ratio=0.225):
    S = size * 4  # supersample for crisp corners
    radius = int(S * radius_ratio)

    base = vgrad((S, S), (18, 22, 32), (8, 10, 16)).convert("RGBA")

    # subtle orange glow in the corner
    glow(base, S * 0.9, S * 0.06, S * 0.5, S * 0.42, ORANGE, 60, int(S * 0.12))

    mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, S - 1, S - 1], radius=radius, fill=255)

    # monogram
    d = ImageDraw.Draw(base)
    f_mono = font(BOLD, int(S * 0.42))
    text = "AG"
    bbox = d.textbbox((0, 0), text, font=f_mono)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x, y = (S - tw) / 2 - bbox[0], (S - th) / 2 - bbox[1]
    grad_text(base, (x, y), text, f_mono, ORANGE, ORANGE_DEEP)

    # orange dot accent
    d.ellipse([S * 0.68, S * 0.66, S * 0.76, S * 0.74], fill=ORANGE)

    out = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    out.paste(base, (0, 0), mask)
    return out.resize((size, size), Image.LANCZOS)


def flat_icon(size):
    """Full-bleed square (apple-touch-icon) — no transparency."""
    base = vgrad((size, size), (18, 22, 32), (8, 10, 16)).convert("RGBA")
    glow(base, size * 0.9, size * 0.06, size * 0.5, size * 0.42, ORANGE, 60, int(size * 0.12))
    d = ImageDraw.Draw(base)
    f_mono = font(BOLD, int(size * 0.42))
    text = "AG"
    bbox = d.textbbox((0, 0), text, font=f_mono)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x, y = (size - tw) / 2 - bbox[0], (size - th) / 2 - bbox[1]
    grad_text(base, (x, y), text, f_mono, ORANGE, ORANGE_DEEP)
    d.ellipse([size * 0.68, size * 0.66, size * 0.76, size * 0.74], fill=ORANGE)
    return base


if __name__ == "__main__":
    make_og()
    big = rounded_icon(512)
    big.save(ICONS / "icon-512.png", "PNG", optimize=True)
    rounded_icon(192).save(ICONS / "icon-192.png", "PNG", optimize=True)
    rounded_icon(32).save(ICONS / "icon-32.png", "PNG", optimize=True)
    flat_icon(180).save(ICONS / "apple-touch-icon.png", "PNG", optimize=True)
    for p in sorted(ICONS.iterdir()):
        print(p.name, p.stat().st_size, "bytes")
    print("done")
