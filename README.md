<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1TRuNCFYljUtXSHy4N5LPIjaF551lnyNA

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deployment

This application is configured for deployment to **GitHub Pages**.

### Important: GitHub Pages Configuration

For the app to work correctly, you must configure your repository settings:

1. Go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
   - *Do NOT select "Deploy from a branch" / "main root". This will try to serve the raw source code and fail.*

The `.github/workflows/deploy.yml` file handles building the application and deploying the artifacts automatically.
