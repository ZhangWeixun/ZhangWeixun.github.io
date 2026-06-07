# Assets Directory

This directory holds all media resources for the personal website.

## Structure

```
assets/
├── images/
│   ├── profile/       — Profile photos, headshots
│   ├── projects/      — Project demo images and comparison frames
│   │   ├── sr-before-1.jpg
│   │   ├── sr-after-1.jpg
│   │   ├── nbhd-before-1.jpg
│   │   ├── nbhd-after-1.jpg
│   │   ├── hdr-before-1.jpg
│   │   └── hdr-after-1.jpg
│   └── life/          — Personal life photos
└── README.md
```

## Image Guidelines

- **Comparison images**: Use matching pairs (same frame, same resolution). Recommended: 1920×1080 or 3840×2160 for 4K demos.
- **Profile photos**: Square crop, minimum 400×400px.
- **Life photos**: Any aspect ratio, recommended minimum 800px on shortest side.
- **Format**: JPEG for photos, PNG for screenshots or graphics with text.

## Adding Comparison Images

Once images are ready, update the corresponding project HTML file:

1. Uncomment the `<img>` and `<div class="slider-handle">` elements
2. Remove the `<span class="placeholder-text">` element
3. Update the `src` attributes to point to your image files
