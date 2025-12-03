# DK Handyman

Source code for DK Handyman website - A professional handyman services website.

## Project Structure

```
dk-handyman/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Stylesheet
├── js/
│   └── main.js         # JavaScript functionality
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Pages deployment workflow
└── README.md
```

## Features

- Responsive design that works on desktop and mobile
- Smooth scrolling navigation
- Modern CSS with CSS variables
- Automatic deployment to GitHub Pages

## Local Development

To run the website locally, you can use any static file server. For example:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve
```

Then open `http://localhost:8000` in your browser.

## Deployment

The website automatically deploys to GitHub Pages when changes are pushed to the `main` branch. The deployment is handled by the GitHub Actions workflow in `.github/workflows/deploy.yml`.

### Manual Deployment

1. Go to the repository's **Settings** > **Pages**
2. Ensure **Source** is set to "GitHub Actions"
3. Push changes to the `main` branch

The site will be available at: `https://<username>.github.io/dk-handyman/`
