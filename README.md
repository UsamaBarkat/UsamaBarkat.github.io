# Usama Nizamani - Portfolio Website

A professional portfolio website showcasing my journey as an Agentic AI learner, skills, projects, and contact information.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and professional corporate design
- **Smooth Animations**: Engaging scroll animations and transitions
- **Contact Form**: Easy way for visitors to get in touch
- **Social Links**: Direct links to GitHub, LinkedIn, and Email
- **Fast Loading**: Optimized for performance
- **SEO Friendly**: Proper meta tags and semantic HTML

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- Font Awesome Icons

## Sections

1. **Home/Hero**: Introduction and quick links
2. **About Me**: Professional bio, career goals, and personal interests
3. **Skills**: Technical skills with visual progress bars
4. **Projects**: Showcase of completed projects
5. **Contact**: Contact information and form

## How to Deploy on GitHub Pages (100% FREE)

### Step 1: Create a GitHub Account
1. Go to [github.com](https://github.com)
2. Sign up for a free account if you don't have one

### Step 2: Create a New Repository
1. Click the "+" icon in the top right corner
2. Select "New repository"
3. Name it: `your-username.github.io` (replace `your-username` with your actual GitHub username)
   - Example: `UsamaBarkat.github.io`
4. Make sure it's set to **Public**
5. Click "Create repository"

### Step 3: Upload Your Files
You have two options:

#### Option A: Upload via GitHub Website (Easier for beginners)
1. On your repository page, click "uploading an existing file"
2. Drag and drop these files:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
3. Click "Commit changes"

#### Option B: Upload via Git Command Line
```bash
# Initialize git in your project folder
cd "D:\Web claude"
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: Portfolio website"

# Add your GitHub repository as remote
git remote add origin https://github.com/your-username/your-username.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository settings
2. Scroll down to "Pages" section (left sidebar)
3. Under "Source", select "main" branch
4. Click "Save"
5. Wait 1-2 minutes for deployment

### Step 5: Access Your Website
Your website will be live at: `https://your-username.github.io`

Example: `https://UsamaBarkat.github.io`

## Customization

### Update Personal Information
Edit `index.html` and update:
- Your name and titles
- About section content
- Skills and their progress percentages
- Project details
- Contact information

### Change Colors
Edit `style.css` and modify the CSS variables at the top:
```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    /* ... */
}
```

### Add More Projects
In `index.html`, find the projects section and duplicate the project card structure:
```html
<div class="project-card">
    <!-- Project content -->
</div>
```

## Local Development

To view your website locally before deploying:

1. Simply open `index.html` in your web browser
2. Or use a local server:
   - Python: `python -m http.server 8000`
   - Node.js: `npx serve`
   - VS Code: Use "Live Server" extension

Then visit `http://localhost:8000` in your browser.

## Adding a Custom Domain (Optional)

If you want a custom domain like `www.yourdomain.com` instead of `username.github.io`:

1. Buy a domain from providers like:
   - Namecheap
   - GoDaddy
   - Google Domains

2. In your domain provider's DNS settings, add:
   - Type: `CNAME`
   - Host: `www`
   - Value: `your-username.github.io`

3. In your GitHub repository:
   - Create a file named `CNAME` (no extension)
   - Add your domain: `www.yourdomain.com`
   - Commit and push

4. In GitHub Pages settings, enter your custom domain

## Troubleshooting

### Website not loading?
- Wait 5-10 minutes after first deployment
- Check repository name matches: `username.github.io`
- Ensure repository is set to Public
- Check GitHub Pages is enabled in settings

### Changes not showing?
- Clear your browser cache (Ctrl+F5)
- Wait 1-2 minutes for GitHub to rebuild
- Check if files were committed properly

### Contact form not working?
- The form uses `mailto:` which opens email client
- For a working contact form, consider:
  - Formspree (free tier available)
  - EmailJS (free tier available)
  - Netlify Forms (if deployed on Netlify)

## Free Alternatives to GitHub Pages

1. **Netlify** - [netlify.com](https://netlify.com)
   - Drag and drop deployment
   - Automatic HTTPS
   - Form handling included

2. **Vercel** - [vercel.com](https://vercel.com)
   - Great for React/Next.js
   - Fast deployment
   - Automatic previews

3. **Cloudflare Pages** - [pages.cloudflare.com](https://pages.cloudflare.com)
   - Unlimited bandwidth
   - Fast global CDN
   - Free SSL

## Contact

- **Email**: usamanizamani09@gmail.com
- **LinkedIn**: [linkedin.com/in/usama-nizamani-2170a1395](https://www.linkedin.com/in/usama-nizamani-2170a1395)
- **GitHub**: [github.com/UsamaBarkat](https://github.com/UsamaBarkat)

## License

This project is free to use for personal purposes. Feel free to fork and customize for your own portfolio!

---

**Built with** ❤️ **by Usama Nizamani**

*Learning AI, Building the Future*
