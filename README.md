# Aung Myint Myat — Engineering Portfolio

A clean, fast, security-conscious static portfolio. No frameworks, no build step, no trackers, no subfolders.

## How to deploy to GitHub Pages

All files in this folder sit at the same level. There are no subfolders, so you can upload everything directly through the GitHub web interface.

### Step by step

1. Go to [github.com/new](https://github.com/new) and create a new public repository. A common name choice is `<your-username>.github.io`, which makes your site available at `https://<your-username>.github.io/`.
2. On the empty repository page, click the **"uploading an existing file"** link (it's in the description, under "Quick setup").
3. Open the folder where you extracted this zip. Select **all the files** (you can use Ctrl+A on Windows or Cmd+A on Mac).
4. **Drag and drop** every selected file onto the GitHub upload page.
5. Wait for the uploads to finish. The `vex-demo.mp4` is about 12 MB, so give it a moment.
6. Scroll down to the **Commit changes** section and click the green button.
7. Go to **Settings** (top right of the repo) → **Pages** in the left sidebar.
8. Under **Source**, choose **Deploy from a branch**, select **main** and `/ (root)`, then click **Save**.
9. Wait about one minute, then visit `https://<your-username>.github.io/<repo-name>/`.

That's it. The site is live.

### If the video upload is too large

GitHub's web interface usually accepts files up to 25 MB without complaint. The video is about 12 MB so it should upload fine. If it fails for any reason, you have two options:

- Use Git from the command line instead (it handles files up to 100 MB):
  ```bash
  git init
  git add .
  git commit -m "Initial portfolio"
  git branch -M main
  git remote add origin https://github.com/<your-username>/<repo-name>.git
  git push -u origin main
  ```
- Or remove `vex-demo.mp4` before uploading. The site will still work but the VEX project will show a blank space where the video used to be.

## What's in each file

| File | What it does |
|---|---|
| `index.html` | All page content. Edit this to change wording or add new projects. |
| `styles.css` | All visual styling. Colours and fonts are at the top in `:root`. |
| `script.js` | Email reveal, year in footer, scroll animations. |
| `robots.txt` | Blocks AI training crawlers and email harvesters. |
| `.nojekyll` | Empty file that tells GitHub Pages not to run Jekyll. |
| `*.jpg`, `*.png` | Project photos and CAD drawings. |
| `vex-demo.mp4` | The autoplaying silent VEX demo video. |
| `vex-video-poster.jpg` | Fallback image shown before the video loads. |

## Customising

The site is already personalised with the email `ammyat@uwaterloo.ca` and Toronto, Ontario as the location. If you want to change anything:

- **Hero copy**: open `index.html` and look for the `<section id="top" class="hero">` block.
- **About facts**: in `index.html`, look for the `<dl class="facts">` block.
- **Colours**: open `styles.css` and look at the top under `:root`. The terracotta accent is `--accent: #b4583a`.
- **Email address**: open `script.js` and look for the `atob(...)` lines in the comment block. To encode a new email in Base64, run `btoa('your.username')` and `btoa('yourdomain.com')` in any browser console.

## Security notes

The site is locked down with a strict Content Security Policy, no inline scripts, no third-party JavaScript, and the email is Base64-fragmented in the source so it can't be scraped from a static HTML read. For full HTTP-header control, deploy behind Cloudflare Pages, Netlify, or Vercel (GitHub Pages only supports meta-tag headers).

## License

All project content (images, drawings, descriptions) © Aung Myint Myat. The site code is yours to keep, fork, and modify.
