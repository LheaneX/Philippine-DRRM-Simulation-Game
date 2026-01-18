# Deployment Guide - Render.com

## Prerequisites

- GitHub account
- Render account (free tier available at [render.com](https://render.com))
- Project pushed to a GitHub repository

## Quick Deploy

### Option 1: Automatic Deploy (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Render deployment configuration"
   git push origin main
   ```

2. **Connect to Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click **"New +"** → **"Static Site"**
   - Connect your GitHub repository
   - Render will auto-detect the `render.yaml` configuration

3. **Deploy**
   - Click **"Create Static Site"**
   - Render will automatically build and deploy your app
   - Your app will be live at `https://your-app-name.onrender.com`

### Option 2: Manual Configuration

If you prefer manual setup:

1. **Create New Static Site**
   - Go to Render Dashboard
   - Click **"New +"** → **"Static Site"**
   - Connect your repository

2. **Configure Build Settings**
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Auto-Deploy**: Yes (recommended)

3. **Deploy**
   - Click **"Create Static Site"**
   - Wait for build to complete (~2-5 minutes)

## Local Testing

Before deploying, test the production build locally:

```bash
# Build the production version
npm run build

# Preview the production build
npm run preview
```

The preview server will run at `http://localhost:4173`

## Configuration Details

### Build Settings

- **Environment**: Static
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `./dist`
- **Node Version**: Auto-detected from package.json

### Features Enabled

✅ **Pull Request Previews** - Automatic preview deployments for PRs  
✅ **SPA Routing** - All routes redirect to index.html  
✅ **Security Headers** - X-Frame-Options, X-Content-Type-Options  
✅ **Auto-Deploy** - Deploys automatically on git push

## Custom Domain (Optional)

1. Go to your site settings in Render
2. Click **"Custom Domains"**
3. Add your domain and follow DNS configuration instructions

## Environment Variables

This project doesn't require environment variables, but if needed:

1. Go to **"Environment"** tab in Render dashboard
2. Add key-value pairs
3. Redeploy for changes to take effect

## Troubleshooting

### Build Fails

**Issue**: Build command fails  
**Solution**: 
- Check that `package.json` has all dependencies listed
- Verify Node version compatibility
- Check build logs in Render dashboard

### Routes Return 404

**Issue**: Direct navigation to routes fails  
**Solution**: 
- Verify `render.yaml` has the rewrite rule
- Check that `staticPublishPath` is set to `./dist`

### Assets Not Loading

**Issue**: CSS/JS files not found  
**Solution**:
- Ensure build completed successfully
- Check that `dist` folder contains all assets
- Verify base path in `vite.config.ts` if using subdirectory

### Slow Build Times

**Issue**: Builds take too long  
**Solution**:
- Render free tier has limited resources
- Consider upgrading to paid tier for faster builds
- Optimize dependencies and build process

## Monitoring

- **Build Logs**: Available in Render dashboard
- **Deploy History**: View all deployments and rollback if needed
- **Performance**: Monitor via Render's built-in analytics

## Cost

- **Free Tier**: 
  - 750 hours/month of free static site hosting
  - Automatic SSL certificates
  - Global CDN
  - Perfect for this project!

## Support

- [Render Documentation](https://render.com/docs/static-sites)
- [Render Community](https://community.render.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

## Next Steps

After deployment:
1. Test all game phases
2. Verify responsive design on mobile
3. Share the live URL!
4. Set up custom domain (optional)

---

**Your app will be live at**: `https://philippine-drrm-game.onrender.com`  
*(URL may vary based on availability)*
