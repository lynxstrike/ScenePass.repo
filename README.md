<p align="center">
  <img src="assets/scenepass-logo.png" alt="ScenePass" width="180">
</p>

<h1 align="center">ScenePass</h1>

<p align="center">
  <b>Automatic intro &amp; recap detection for your TV library.</b><br>
  Audio fingerprinting, speech recognition, and OCR find the boundaries.<br>
  Your video files never get touched.
</p>

<p align="center">
  <img alt="platform" src="https://img.shields.io/badge/platform-Windows%2010%20%2F%2011-32C8FF">
  <img alt="install" src="https://img.shields.io/badge/install-portable%2C%20no%20admin-FF981E">
  <img alt="cloud" src="https://img.shields.io/badge/runs-100%25%20local-32C8FF">
  <img alt="modification" src="https://img.shields.io/badge/video%20files-never%20modified-FF981E">
</p>

<p align="center">
  <a href="https://github.com/lynxstrike/ScenePass.repo/releases/latest"><b>Download Latest Release</b></a>
  &nbsp;·&nbsp;
  <a href="#">Website</a> <!-- TODO: replace with the live ScenePass site URL -->
  &nbsp;·&nbsp;
  <a href="#installing-it">Install Guide</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/lynxstrike/ScenePass.repo/issues">Report an Issue</a>
</p>

<p align="center">
  <img src="assets/scenepass-banner.jpg" alt="ScenePass" width="720">
</p>

This repository is ScenePass's **update and release channel** — where the app downloads
new versions from, and where its issue tracker lives. It doesn't hold the source.

---

## What's New

ScenePass finds intros and recaps automatically, then keeps working after the scan:

| | | |
|---|---|---|
| **Background Monitor** — watches your mounted libraries from the system tray and scans new episodes the moment they land, no manual re-scan. | **Scheduled Scans** — set a nightly or weekly window so scans never compete with the TV you're actually watching. | **Family Share** — give everyone in the house their own profile. Held, unconfirmed results stay read-only for family members. |
| **Mobile Remote** — check scan status, browse the held queue, and skip intros from your phone. | **App Themes** — total color customization; pick an accent and every panel, glow, and button follows. | **Localization** — the full interface in English or Spanish today, with more languages on the way. |

## Core Engine

- **Consensus intro engine** — a pure-Python variance-map engine built on Chromaprint audio fingerprinting plus silence/black-frame fusion, cross-checked across a season.
- **Three-lane recap detection** — falls through embedded subtitles, then Whisper speech-to-text, then Tesseract OCR on burned-in "Previously on" cards, whichever the episode actually has.
- **Confidence tiers, not guesses** — uncertain calls sit in Hold until you confirm them. Nothing deploys silently on shaky evidence.
- **Multi-format export** — ScenePass JSON, Kodi/MPlayer EDL, and ffmpeg-style chapters, written beside your episodes and never into them.
- **Sidecar-safe** — reads and writes metadata next to your files only. It never modifies, re-encodes, or deletes the video itself.
- **Health scan** — a read-only audit that catches orphaned sidecars, drift between the database and disk, and missing source files, with one-click fixes.
- **Three-layer disaster recovery** — restore from a backup, rebuild straight from sidecar files, or reapply the gold ledger of every human-confirmed boundary.
- **Self-installing dependencies** — FFmpeg, fpcalc, VLC, Tesseract, and Whisper models download into ScenePass's own folder. Nothing touches your system PATH.
- **Fully portable** — one folder, no installer, no registry entries. Copy it to a drive and it runs; delete the folder to uninstall.

Today, [Kodi](https://kodi.tv/) is the only player wired up, via a companion service addon that
reads ScenePass's sidecar markers and shows a real Skip Intro / Skip Recap button during
playback. Jellyfin, Emby, and Plex would each need their own bridge, which doesn't exist yet.

## Installing It

There's no installer to run — ScenePass is one self-contained folder.

1. **Download** the latest `ScenePass-<version>.zip` from [Releases](https://github.com/lynxstrike/ScenePass.repo/releases/latest).
2. **Extract** it anywhere — a regular drive, an external drive, wherever. No admin rights, no system changes.
3. **Launch `ScenePass.bat`** — the recommended launcher; it refreshes the taskbar shortcut and starts the app.
4. **Fill in Dependencies** — first run opens straight into Settings → Dependencies. Click Download on each row.
5. **Mount your library** — point ScenePass at the folder that holds your TV shows.
6. **Scan** — check the episodes you want and hit Scan. Intros and recaps get found automatically.

| | |
|---|---|
| **OS** | Windows 10 / 11 (64-bit) |
| **Install type** | Portable — no installer, no registry |
| **Disk** | Base app is small; Dependencies add up to a few GB |
| **Updates** | Built-in updater, checked from the app against this repo |

## Before You Rely On It

ScenePass is a personal project: the concept, design decisions, and testing are the
author's — every line of code is AI-written. There's no traditional dev team and no
formal QA process; it's tested against a hand-graded benchmark set, not a commercial
test matrix. That's also why confidence tiers exist: the detection is heuristic (audio
fingerprinting, speech-to-text, OCR), it will occasionally be wrong, and Hold status is
the app telling you so rather than guessing silently.

Provided "as is," with no warranty of accuracy, merchantability, or fitness for a
particular purpose.

- Back up your library and any sidecar metadata before bulk scans or imports.
- Review Hold-tier results before trusting them, especially on content you haven't manually confirmed.
- The author isn't liable for data loss, mis-placed markers, or downstream effects in players that consume ScenePass's output.

## 🤖 AI-Generated Content Disclosure

Every line of code in ScenePass — the desktop app, the Kodi addon, this repository's
tooling, and this README — was written by an AI coding assistant (Claude), directed and
reviewed by the author. There is no separate human-written codebase underneath it; the
author sets the direction, tests the results against a hand-graded benchmark, and decides
what ships, but does not hand-write the implementation.

Practically, that means:

- Commits, comments, and docs read as AI-authored because they are.
- Features and fixes alike are made by directing the AI, not by manual debugging.
- See **Before You Rely On It** above for what this means for the detection results themselves.

## Support

- **Built-in help guide** — click **Help** in the toolbar for a full walkthrough with screenshots, search, and a table of contents. No browser needed.
- **Health scan & logs** — run **Health Scan** to catch drift between disk, database, and sidecars. Logs live in the `logs\` folder; attach the latest one when asking for help.
- **GitHub Issues** — [open an issue](https://github.com/lynxstrike/ScenePass.repo/issues) here for bugs or update-channel problems.

<p align="center">
  <img src="assets/scenepass-poster.png" alt="ScenePass" width="160">
  <br>
  <sub>Built for people who just want to get to the story.</sub>
</p>

<p align="center"><sub>© 2026 lynxstrike — ScenePass. Update &amp; release channel only.</sub></p>
