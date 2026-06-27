# Deploying Your Portfolio Website

To make your website public and get a link you can put on your resume (e.g., `https://sanjaysenthil17.github.io/`), follow this guide to host it for free on **GitHub Pages**.

---

## Step 1: Add Your Resume PDF
1. Save your resume as a PDF file named `resume.pdf`.
2. Move it into this project directory (`portfolio/`).
3. Open `index.html` and find the following line (around line 52):
   ```html
   <a href="#" class="btn btn-outline" id="resumeBtn">
   ```
   Change the `href="#"` to `href="resume.pdf"`.
   ```html
   <a href="resume.pdf" class="btn btn-outline" id="resumeBtn">
   ```

---

## Step 2: Set Up the Contact Form
To receive emails directly from your portfolio contact form for free:
1. Go to [Formspree](https://formspree.io/) and create a free account.
2. Create a new form project (e.g., named "Portfolio Contact").
3. Copy your Formspree endpoint URL (it looks like `https://formspree.io/f/xbjnegwy`).
4. Open `index.html` and find the form action attribute (around line 349):
   ```html
   <form action="https://formspree.io/f/placeholder" method="POST" ...>
   ```
   Replace `https://formspree.io/f/placeholder` with your actual Formspree URL.

---

## Step 3: Upload Code to GitHub
Ensure you have the [Git CLI installed](https://git-scm.com/) and are logged into your GitHub account.

Open your terminal (PowerShell or Bash) in this project folder (`portfolio/`) and run:

1. **Initialize Git repository:**
   ```bash
   git init
   git branch -M main
   ```

2. **Add and commit your files:**
   ```bash
   git add .
   git commit -m "Initial commit of AI Engineer portfolio website"
   ```

3. **Create a GitHub repository:**
   - Go to [GitHub](https://github.com/) and log in.
   - Click the **New** button to create a new repository.
   - Name it **sanjaysenthil17.github.io** (this specific naming will make your portfolio load at your base domain `https://sanjaysenthil17.github.io/`!).
   - Leave it **Public** and do not initialize it with a README, `.gitignore`, or license.
   - Click **Create repository**.

4. **Link and push your local files:**
   - Copy the commands under *"…or push an existing repository from the command line"* in GitHub. It will look like this:
   ```bash
   git remote add origin https://github.com/sanjaysenthil17/sanjaysenthil17.github.io.git
   git push -u origin main
   ```

---

## Step 4: Enable GitHub Pages
Since your repository is named exactly `sanjaysenthil17.github.io`, GitHub Pages should activate automatically! 

If it doesn't:
1. Open your repository on GitHub.
2. Go to **Settings** (tab at the top).
3. In the left sidebar, click **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**, ensure the Source is set to **Deploy from a branch**.
5. Set the branch to **main** and folder to **/(root)**, then click **Save**.
6. Wait 1-2 minutes. Under "GitHub Pages" at the top, you will see: *"Your site is live at https://sanjaysenthil17.github.io/"*.

**Congratulations! Your portfolio is now live, fully responsive, and ready to share with recruiters!**
