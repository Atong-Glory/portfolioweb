#!/usr/bin/env python3
"""Crop the uploaded photo into a square headshot for the hero portrait.

The hero container is `aspect-square rounded-full` with object-cover, so a
centered square crop with the head near the top looks best.

Usage:
  python3 scripts/headshot_crop.py <input-image> [--side 1000] [--top 0.06] [--zoom 1.0]

  --top   fraction of the leftover height to skip from the top (0 = flush top).
          Lower = crop window sits higher (good when the head is near the top).
  --zoom  1.0 uses the full square crop; >1 zooms in (0.85 zooms OUT? no —
          zoom>1 crops tighter). Tune after seeing the photo.
"""
import argparse
import sys
from PIL import Image

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input")
    ap.add_argument("--side", type=int, default=1000, help="output square size")
    ap.add_argument("--top", type=float, default=0.06,
                    help="fraction of leftover vertical space to skip from top")
    ap.add_argument("--zoom", type=float, default=1.0,
                    help="1.0 = max square window; >1 = crop tighter (zoom in)")
    ap.add_argument("--out", default="/home/z/my-project/public/images/hero-portrait.png")
    args = ap.parse_args()

    img = Image.open(args.input)
    if img.mode not in ("RGB", "L"):
        img = img.convert("RGB")
    w, h = img.size
    print(f"source: {w}x{h} (ratio {w/h:.3f})")

    # Square window: largest square that fits inside the source
    side = min(w, h)
    # Zoom >1 crops a tighter window centered on the same focal point
    side = int(side / max(args.zoom, 0.05))
    side = min(side, w, h)

    # Horizontal: center. Vertical: anchor toward the top (headshot),
    # with `--top` controlling how far down from flush-top we sit.
    x0 = (w - side) // 2
    slack = h - side
    y0 = int(slack * max(0.0, min(args.top, 1.0)))

    crop = img.crop((x0, y0, x0 + side, y0 + side))
    crop = crop.resize((args.side, args.side), Image.LANCZOS)
    crop.save(args.out, "PNG")
    print(f"saved: {args.out} ({args.side}x{args.side}, window {side}px @ ({x0},{y0}))")

if __name__ == "__main__":
    try:
        main()
    except FileNotFoundError as e:
        sys.exit(f"input not found: {e}")
