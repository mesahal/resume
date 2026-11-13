#!/bin/sh
# Captures real headless-Chrome (SwiftShader WebGL) screenshots of the house prototype.
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="$(cd "$(dirname "$0")" && pwd)"
BASE="http://127.0.0.1:4174/__concepts/house"
shoot() { # name width height hash
  "$CHROME" --headless=new --user-data-dir="$OUT/.chrome" --use-angle=swiftshader --enable-unsafe-swiftshader \
    --ignore-gpu-blocklist --hide-scrollbars --virtual-time-budget=8000 --window-size="$2,$3" \
    --screenshot="$OUT/$1.png" "$BASE$4" 2>/dev/null
}
shoot hall-desktop 1440 1000 "#hall"
shoot workshop-desktop 1440 1000 "#workshop"
shoot exhibit-word 1440 1000 "#workshop/word"
shoot exhibit-accelera 1440 1000 "#workshop/accelera"
shoot exhibit-tools 1440 1000 "#workshop/tools"
shoot hall-night 1440 1000 "?lights=off#hall"
shoot workshop-night 1440 1000 "?lights=off#workshop"
shoot workshop-mobile 500 1350 "#workshop"
shoot hall-tablet 768 1400 "#hall"
ls "$OUT"
