# Pixel Message Board

A retro pixel-styled message board powered by GitHub Issues API.

## Features

- **Retro Pixel Aesthetic**: nostalgic BBS-style design with animated starfield background
- **Anonymous or Named**: Visitors can choose to leave their name or stay anonymous
- **GitHub Issues Backend**: Messages are stored as GitHub Issues — free, reliable, and easy to manage
- **Admin Panel**: Password-protected dashboard with stats, search, sort, and delete capabilities
- **Responsive**: Works on desktop, tablet, and mobile

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Main message board — visitors can submit messages and browse recent ones |
| `admin.html` | Admin panel — view all messages, search, filter, and delete |

## Setup

1. Fork or clone this repository
2. Enable **GitHub Pages** in repository settings (Source: main branch)
3. Create a **GitHub Personal Access Token** with `repo` scope
4. Open the browser console on your page and run:
   ```javascript
   localStorage.setItem('github_token', 'YOUR_TOKEN_HERE');
   ```
5. Change the admin password in `admin.html` (search for `adminPassword`)
6. Update the `CONFIG` object in both files with your GitHub username and repo name

## Deployed URL

Once GitHub Pages is enabled, your message board will be available at:
`https://YOUR_USERNAME.github.io/message-board/`

## Tech Stack

- Pure HTML + CSS + JavaScript (no frameworks, no build step)
- GitHub Issues API for data storage
- Google Fonts (Press Start 2P)

## License

MIT
