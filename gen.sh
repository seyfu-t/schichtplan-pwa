#!/usr/bin/env bash

# Input SVG file
svg_file="public/favicons/favicon.svg"
padding_percentage=10  # Set padding percentage (e.g., 10%)

# Ensure required tools are available
if ! command -v rsvg-convert &>/dev/null || ! command -v magick convert &>/dev/null; then
  echo "Error: Required tools 'rsvg-convert' and 'magick convert' (ImageMagick) are not installed."
  exit 1
fi

# Temporary file
temp_file="temp.png"

# Clean up temp file on exit
trap "rm -f $temp_file" EXIT

# Sizes to generate
sizes=(16 32 57 60 70 72 76 96 114 120 128 144 150 152 167 180 192 256 310 384 512 1024)

# Process each size
for size in "${sizes[@]}"; do
  # Calculate padding based on percentage
  padding=$((size * padding_percentage / 100))

  # Ensure padding doesn't result in negative inner size
  if ((size <= 2 * padding)); then
    echo "Warning: Skipping size ${size}x${size} due to excessive padding."
    continue
  fi

  png_size=$((size - 2 * padding)) # Calculate inner PNG size
  output_png="public/favicons/favicon-${size}x${size}.png"

  # Generate the PNG with reduced size
  rsvg-convert -w "$png_size" -h "$png_size" -o "$temp_file" "$svg_file"

  # Add padding
  convert "$temp_file" -gravity center -background transparent -extent "${size}x${size}" "$output_png"

  echo "Generated: $output_png"
done
