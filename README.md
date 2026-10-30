# Astrophotography Portfolio

A static, dependency-free portfolio site for deep-sky astrophotography.

## Viewing locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server
```

## Adding a new image

1. Put the image in `images/`.
2. Add an entry to the `PORTFOLIO` array in `js/portfolio.js` (copy the M33 entry as a template).
   - `category` drives the filter buttons, which appear once there are two or more categories.
   - `facts` and `capture` are free-form key/value lists shown in the enlarged view; empty values are hidden.

## Deploying

The site is plain HTML/CSS/JS, so it can be hosted anywhere static, e.g. GitHub Pages
(Settings → Pages → deploy from branch).
