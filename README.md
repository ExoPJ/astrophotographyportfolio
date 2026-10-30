# Astrophotography Portfolio

A static, dependency-free portfolio site for deep-sky astrophotography.

## Viewing locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server
```

## Pages

- `index.html`: Home / About me
- `capstone.html`: Independent study plan, Milestone #1 and #2
- `photography.html`: exposure triangle, Lightroom edits, astrophotography gallery with enlarge-and-info lightbox
- `animation.html`: storyboards, drafts and video embeds

Each milestone block has Summary, Design process, Final export and Reflection.

## Using it with Google Sites

Google Sites does not allow custom site-wide JavaScript, so the cursor effects only run
when this site is hosted itself (e.g. GitHub Pages). To use it in your Google Site, host
this site, then on each Google Sites page choose Insert > Embed > By URL (or paste HTML).
The cursor effects will work inside the embedded frame.

## Adding a new image

1. Put the image in `images/`.
2. Add an entry to the `PORTFOLIO` array in `js/portfolio.js` (copy the M33 entry as a template).
   - `category` drives the filter buttons, which appear once there are two or more categories.
   - `facts` and `capture` are free-form key/value lists shown in the enlarged view; empty values are hidden.

## Deploying

The site is plain HTML/CSS/JS, so it can be hosted anywhere static, e.g. GitHub Pages
(Settings → Pages → deploy from branch).
