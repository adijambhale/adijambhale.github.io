# Aditya Jambhale: personal website

Plain HTML and CSS, no build step. This guide also shows on your repository's front page on GitHub, so it is always to hand when you edit the site. It is not published as part of the website.

| File | What it is |
|---|---|
| `index.html` | Home: photo, bio, contact |
| `research.html` | Papers |
| `teaching.html`, `talks.html` | Placeholders ("under construction") |
| `style.css` | All colours, fonts and layout |
| `images/photo.jpg` | Your photo (currently a placeholder) |
| `vault/` | The private, password-protected page (not linked from anywhere) |

---

## 1. Publish it (one time, about 10 minutes)

1. **Create a GitHub account** at <https://github.com/signup>. Your username becomes your web address: `username.github.io`. Pick it with that in mind (for example `adityajambhale`).
2. **Create the repository.** Click **+** (top right) → **New repository**. Name it exactly `username.github.io`, using your own username in lowercase. Choose **Public** and leave "Add a README" unticked. Click **Create repository**.
3. **Upload the files.** On the new, empty repository page, click the link **uploading an existing file**. Open the unzipped `aditya-website` folder on your computer, select *everything inside it* (including the `images` and `vault` folders) and drag it into the browser window. When every file is listed, click **Commit changes**.
4. **Check that Pages is switched on.** Go to **Settings → Pages**. Under *Build and deployment*, set *Source* to **Deploy from a branch** and *Branch* to **main** with folder **/ (root)**, then **Save**. (For a repository named `username.github.io` this is often already set.)
5. **Visit your site** at `https://username.github.io` after a minute or two. The **Actions** tab shows a green tick when publishing has finished.

## 2. Make it yours

Every edit works the same way: open the file on GitHub, click the **pencil icon** (Edit), make the change, click **Commit changes**. The live site updates about a minute later (refresh with Ctrl+Shift+R / Cmd+Shift+R if you still see the old version).

- **Photo:** open the `images` folder → **Add file → Upload files**, upload your photo named exactly `photo.jpg`, and commit. It replaces the placeholder and is cropped to a 4:5 portrait automatically.
- **Bio and email:** in `index.html`, look for the lines marked `EDIT`. The bio is a draft based on your papers; reword it freely. Replace `your-email@cam.ac.uk` (it appears twice on one line).
- **More profile links** (ORCID, Google Scholar…): `index.html` has commented-out examples next to the arXiv and zbMATH links.
- **A new paper:** in `research.html`, copy an entire `<li class="paper"> … </li>` block, paste it at the top of the list and edit the year, title, links and summary.
- **Earlier work:** `research.html` contains a hidden "Earlier work" section with your five SMALL REU papers. Delete the two comment-marker lines around it to show it (instructions are next to it).
- **Teaching and talks:** replace the "under construction" paragraph in `teaching.html` / `talks.html`. There is an example list in a comment just above it.
- **Colours:** change the values at the top of `style.css`.

## 3. Your private files page

**Address:** `https://username.github.io/vault/`. Nothing on the site links to it, so bookmark it.

**How it works.** GitHub Pages can only serve fixed files, and on a free account the repository must be public, so a normal login isn't possible. Instead, this page encrypts each file *in your browser* before it is ever uploaded (AES-256-GCM, with the key derived from your password using 600,000 rounds of PBKDF2). File names are encrypted too. GitHub, and anyone browsing your repository, sees only scrambled files.

**First time:** open the page, choose a password and type it twice. Use at least 10 characters; four or five random words is ideal.

**Adding files**
1. Unlock the page and drop in (or choose) the files.
2. Click **Download** (or **Download all**) to save the encrypted copies. They have long scrambled names; don't rename them.
3. Click **open the upload page on GitHub**, drag the encrypted files in, and **Commit changes**.
4. Wait about a minute, then press **Refresh** on the private page.

**Opening a file:** unlock, then click **Download** next to it. It is decrypted on your computer with its original name.

**Deleting a file:** click **Delete on GitHub** next to it, then the bin icon on GitHub, then commit.

**Good to know**
- **There is no password reset.** Forget the password and the files are unrecoverable. Keep it in a password manager.
- Because the encrypted files are public, someone could copy them and try to guess the password offline. A long password makes that hopeless; a short one doesn't.
- GitHub's website accepts files up to 25 MB each, and the whole site should stay under 1 GB.
- Deleted files remain in the repository's history, still encrypted.
- The page lists your files through GitHub's public API, which allows 60 lookups an hour per network. Normal use never gets near that.
- Don't change the `salt` value in `vault/index.html`; existing files would stop opening.
- If you later use a custom domain, fill in `owner` and `repo` at the top of the script in `vault/index.html`.

## 4. Getting found on Google

Google usually finds a new `github.io` site within a few days to a few weeks. To speed it up, add the site in [Google Search Console](https://search.google.com/search-console) (choose the *URL prefix* option, verify by uploading the small HTML file it gives you to the repository, then *Request indexing*). Linking to the site from your department profile, arXiv author page and email signature also helps.
