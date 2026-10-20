"""Build the self-hosted web fonts in src/app/fonts/ from Google Fonts' Latin files.

    pip install fonttools brotli
    python3 scripts/subset-fonts.py

Each variable font has its weight axis clipped to the weights the site renders
(measured across every route), then is split by unicode-range into:

  <name>.woff2      ASCII plus the punctuation the site uses. Preloaded.
  <name>-ext.woff2  The rest of Google's Latin range (accented letters and so
                    on). Fetched only when a page renders one of those
                    characters, e.g. a name typed into a form.

Glyph outlines are unchanged inside the clipped range, so text renders the same
as the full Google files. If a page starts using a weight outside a range below,
widen the range here and rerun.
"""

import io
import re
import sys
import urllib.request
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

OUT = Path(__file__).resolve().parent.parent / "src" / "app" / "fonts"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"

# (output name, Google css2 family query, font-style, clipped wght range)
FONTS = [
    ("newsreader-roman", "Newsreader:ital,wght@0,200..800", "normal", (400, 500)),
    ("newsreader-italic", "Newsreader:ital,wght@1,200..800", "italic", (300, 500)),
    ("hanken-grotesk", "Hanken+Grotesk:wght@100..900", "normal", (300, 700)),
]

# Keep in sync with the unicode-range values in src/app/layout.tsx (core) and src/app/globals.css (ext).
CORE = [(0x20, 0x7E), (0xA0, 0xA0), (0xA9, 0xA9), (0xAE, 0xAE), (0xB0, 0xB0), (0xB7, 0xB7),
        (0xD7, 0xD7), (0x2010, 0x2011), (0x2013, 0x2014), (0x2018, 0x2019), (0x201C, 0x201D),
        (0x2022, 0x2022), (0x2026, 0x2026), (0x2032, 0x2033), (0x20AC, 0x20AC),
        (0x2122, 0x2122), (0x2190, 0x2193), (0x2212, 0x2212), (0x2248, 0x2248),
        (0x2264, 0x2265)]
# Google's "latin" subset.
LATIN = [(0x0, 0xFF), (0x131, 0x131), (0x152, 0x153), (0x2BB, 0x2BC), (0x2C6, 0x2C6),
         (0x2DA, 0x2DA), (0x2DC, 0x2DC), (0x304, 0x304), (0x308, 0x308), (0x329, 0x329),
         (0x2000, 0x206F), (0x20AC, 0x20AC), (0x2122, 0x2122), (0x2191, 0x2191),
         (0x2193, 0x2193), (0x2212, 0x2212), (0x2215, 0x2215), (0xFEFF, 0xFEFF),
         (0xFFFD, 0xFFFD)]


def points(ranges):
    return {c for lo, hi in ranges for c in range(lo, hi + 1)}


def latin_url(query):
    req = urllib.request.Request(
        f"https://fonts.googleapis.com/css2?family={query}&display=swap", headers={"User-Agent": UA}
    )
    css = urllib.request.urlopen(req).read().decode()
    match = re.search(r"/\* latin \*/\s*@font-face \{.*?url\((\S+?)\)", css, re.S)
    if not match:
        sys.exit(f"no latin file for {query}")
    return match.group(1)


def write(font_bytes, wght, unicodes, path):
    font = TTFont(io.BytesIO(font_bytes))
    font = instancer.instantiateVariableFont(font, {"wght": wght})
    buf = io.BytesIO()
    font.save(buf)
    buf.seek(0)
    font = TTFont(buf, lazy=False)
    options = subset.Options()
    options.layout_features = ["*"]
    # Without the post table's glyph names Chrome rasterizes some glyph edges
    # differently from Google's files; keeping them (a few hundred bytes)
    # renders pixel-identically.
    options.glyph_names = True
    options.flavor = "woff2"
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=sorted(unicodes))
    subsetter.subset(font)
    font.flavor = "woff2"
    font.save(path)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    core = points(CORE)
    ext = points(LATIN) - core
    for name, query, _style, wght in FONTS:
        url = latin_url(query)
        source = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA})).read()
        write(source, wght, core, OUT / f"{name}.woff2")
        write(source, wght, ext, OUT / f"{name}-ext.woff2")
        sizes = [len(source), (OUT / f"{name}.woff2").stat().st_size, (OUT / f"{name}-ext.woff2").stat().st_size]
        print(f"{name}: {url}\n  source {sizes[0]} B -> core {sizes[1]} B + ext {sizes[2]} B")


if __name__ == "__main__":
    main()
