# Abdul Nafay — Portfolio

A modern, IDE-themed personal portfolio. The whole site is styled like a
code editor: tabs are open files, the sidebar mimics a tool rail, and the
hero name types itself out like a terminal prompt.

## Folder structure

```
Abdul-Nafay-Portfolio/
├── index.html          # all 5 sections (tabs) live here
├── css/
│   ├── style.css       # layout, theme, components
│   └── animations.css  # keyframes (typing caret, fade-ins, etc.)
├── js/
│   ├── typewriter.js    # reusable typewriter effect
│   └── script.js        # tabs, cursor, skills/experience data, contact form
├── assets/
│   └── resume.pdf       # placeholder CV — REPLACE with your real CV
└── README.md
```

## Before you deploy — 2 things to update

1. **GitHub link** — open `js/script.js` and set:
   ```js
   const GITHUB_URL = "https://github.com/your-username";
   ```
2. **Resume** — replace `assets/resume.pdf` with your real CV
   (keep the filename `resume.pdf`, or update the filename inside
   `js/script.js` in the `downloadCvBtn` click handler).

## Making the contact form actually send you emails

The site is static (no backend/server), so the contact form uses
**Web3Forms** (free, no account/dashboard needed) to deliver
messages straight to `a.nafayyyy@gmail.com` — even if the visitor
has no mail app installed.

1. Go to https://web3forms.com
2. Enter your email (`a.nafayyyy@gmail.com`) and click **Create Access Key**
3. Check that inbox and confirm your email
4. Copy the **Access Key** you receive
5. Paste it into `js/script.js`:
   ```js
   const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
   ```

That's it — every message submitted on the site will now land
directly in your Gmail inbox. Until this key is set, the form
will show a message asking you to finish this setup.

## Running locally

No build step needed — just open `index.html` in a browser, or serve it:

```bash
npx serve .
```

## Deploying to GitHub Pages

1. Push this folder to a GitHub repo
2. Repo → Settings → Pages → Deploy from branch → `main` / root
3. Your site will be live at `https://your-username.github.io/repo-name/`
