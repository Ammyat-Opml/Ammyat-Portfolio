# Aung Myint Myat — Engineering Portfolio

A modern, single-page portfolio. All four projects are visible the moment the page loads, no scrolling required. Click any project card to open a full detail view. No frameworks, no build step, no trackers.

## How it works

- The home screen shows all four projects as cards in a grid, fitting one screen.
- Clicking a card slides in a detail panel with the full write-up, keywords, video, and gallery.
- Inside the panel you can jump straight to any other project using the tabs at the top.
- The About and Contact panels open the same way.
- Press Esc, or click outside the panel, to go back.

## Deploying to GitHub Pages

All files sit at the same level. There are no subfolders, so you can upload everything directly.

1. Go to [github.com/new](https://github.com/new) and create a new public repository. For a personal site at `https://yourusername.github.io/`, name it `yourusername.github.io`.
2. On the empty repository page, click **"uploading an existing file"**.
3. Extract this zip on your computer.
4. Select **all the files** (Ctrl+A on Windows, Cmd+A on Mac) and drag them onto the GitHub upload page.
5. Wait for the uploads to finish, then click **Commit changes**.
6. Go to **Settings → Pages**, set the source to **main** branch and `/ (root)`, and Save.
7. Wait about a minute, then visit `https://yourusername.github.io/`.

### If the video upload is slow

`vex-demo.mp4` is about 12 MB, well within GitHub's 25 MB web upload limit. If you ever have trouble, use Git from the command line instead:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/yourrepo.git
git push -u origin main
```

## What's in each file

| File | Purpose |
|---|---|
| `index.html` | Page structure: home screen, panels, project cards. |
| `styles.css` | All visual styling. Colours are at the top under `:root`. |
| `script.js` | Project data, panel open/close, email reveal. Edit project text here. |
| `robots.txt` | Blocks AI training crawlers and email harvesters. |
| `.nojekyll` | Empty file telling GitHub Pages to skip Jekyll processing. |
| `*.jpg`, `*.png` | Project photos, CAD drawings, video poster. |
| `vex-demo.mp4` | The autoplaying silent robot demo. |

## Editing project content

All project write-ups live in `script.js`, in the `PROJECTS` object near the top. Each project has an overview, a "what I worked on" list, technical keywords, soft-skill keywords, and a gallery. Edit the text there and it updates the detail panel automatically.

## Customising the look

Open `styles.css` and look at `:root` at the top. The accent colour is `--accent: #ff6b3d`. The dark background is `--bg: #0c0d10`. Change those values to retheme the whole site.

## Security notes

Strict Content Security Policy, no inline scripts, no third-party JavaScript, no analytics. The email address is Base64-fragmented in `script.js` so it cannot be scraped from a static read of the source. For full HTTP-header control, host behind Cloudflare Pages, Netlify, or Vercel.

## License

All project content © Aung Myint Myat. The site code is yours to keep, fork, and modify.
