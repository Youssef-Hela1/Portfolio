# Deployment Instructions

## 1. Install Git
Your computer doesn't have Git installed yet. 
- Download it here: [https://git-scm.com/downloads](https://git-scm.com/downloads)
- Install it (click "Next" through the installer).

## 2. Initialize Repository
Once Git is installed, open your terminal (PowerShell or Command Prompt) in this folder (`Potfolio`) and run:

```bash
git init
git add .
git commit -m "Initial commit"
```

## 3. Push to GitHub
1.  Go to [GitHub.com](https://github.com) and create a new repository named `Portofolio`.
2.  Copy the commands GitHub gives you under "…or push an existing repository from the command line".
3.  Run them in your terminal:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Portofolio.git
git push -u origin main
```

## 4. Deploy to Vercel
1.  Go to [Vercel.com](https://vercel.com) and Sign Up/Log In.
2.  Click "Add New..." -> "Project".
3.  Import from the GitHub repository you just created (`Portofolio`).
4.  Click **Deploy**.

### Important Note about Data
Your project uses a local database (`db.json`) for development.
- **On Vercel (Production)**: The app has been configured to read this file directly (Read-Only). Your portfolio will look perfect and display all your projects!
- **Admin Features**: Adding/Deleting projects won't work permanently on Vercel because it's a static serverless environment. This is expected behavior for a portfolio site. To update your portfolio later, add projects locally and push the changes to GitHub.
