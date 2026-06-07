# weixunzhang.github.io

Personal academic portfolio website for Weixun Zhang — Senior Machine Learning Engineer specializing in Computer Vision, Video Restoration, Super-Resolution, and HDR Imaging.

## Live Site

[https://weixunzhang.github.io](https://weixunzhang.github.io)

## Structure

```
├── index.html                    — Home page (About, Skills, Projects, Education, Contact)
├── life.html                     — Personal life page (Photos, Hobbies)
├── projects/
│   ├── super-resolution.html     — 4K Super-Resolution & VLM-Based Video Restoration
│   ├── narrowband-hd.html        — Narrowband HD Enhancement
│   └── color-grading-hdr.html    — Color Grading & HDR Remastering
├── css/
│   └── style.css                 — Global styles (academic minimal, black & white)
├── js/
│   └── main.js                   — Interactions (comparison slider, mobile nav)
└── assets/
    └── images/                   — Media resources (profile, projects, life)
```

## Tech Stack

- Pure HTML / CSS / JavaScript (no build tools required)
- GitHub Pages for hosting
- Responsive design (desktop + mobile)

## Adding Project Comparison Images

1. Place before/after image pairs in `assets/images/projects/`
2. In the corresponding project HTML file, uncomment the `<img>` elements and remove the placeholder `<span>`
3. Update `src` attributes to point to your files

## Local Preview

Simply open `index.html` in a browser, or use a local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`
