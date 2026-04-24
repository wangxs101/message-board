# Pixel Message Board

A retro pixel-styled message board that allows anyone to leave messages — no account required.

## Features

- **Retro Pixel Aesthetic**: nostalgic BBS-style design with animated starfield background
- **Anonymous or Named**: Visitors can choose to leave their name or stay anonymous
- **No Account Required**: Anyone can submit messages without signing up
- **Google Sheets Backend**: Messages are stored in a free Google Sheet via Google Apps Script
- **Admin Panel**: Password-protected dashboard with stats, search, sort, and delete capabilities
- **Responsive**: Works on desktop, tablet, and mobile

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Main message board — visitors can submit messages and browse recent ones |
| `admin.html` | Admin panel — view all messages, search, filter, and delete |
| `message-api.js` | Google Apps Script backend code |

## Setup

### 1. Deploy the Backend (Google Apps Script)

1. Go to [script.google.com](https://script.google.com/)
2. Create a new project
3. Copy the contents of `message-api.js` into the editor
4. Click **Deploy** > **New deployment**
5. Select type: **Web app**
6. **Execute as**: Me
7. **Who has access**: Anyone (important!)
8. Click **Deploy** and copy the Web App URL

### 2. Configure the Frontend

Open `index.html` and `admin.html`, find the configuration section and set your API URL:

```javascript
const API_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

Also set the admin PIN (must match in both `message-api.js` and `admin.html`):

```javascript
const ADMIN_PIN = '1234'; // change this!
```

### 3. Deploy to GitHub Pages

1. Enable **GitHub Pages** in repository settings (Source: main branch)
2. Your message board will be available at:
   `https://YOUR_USERNAME.github.io/message-board/`

## How It Works

```
Visitor fills form → POST to Google Apps Script → Stored in Google Sheet
                                                    ↓
Page loads ← GET from Google Apps Script ← Reads Google Sheet
```

## Tech Stack

- Pure HTML + CSS + JavaScript (no frameworks, no build step)
- Google Apps Script + Google Sheets for data storage
- Google Fonts (Press Start 2P)

## Security Notes

- The admin password (`adminPassword`) is client-side only — suitable for casual use
- The delete PIN (`adminPin`) is validated server-side in the Apps Script
- For production use, consider adding proper authentication

## License

MIT
