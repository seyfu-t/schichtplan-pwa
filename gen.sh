for size in 16 32 57 60 70 72 76 96 114 120 128 144 150 152 167 180 192 256 310 384 512 1024; do
  rsvg-convert -w $size -h $size -o public/favicons/favicon-${size}x${size}.png public/favicons/favicon.svg
done
