export const workflowsData = {
  "first-repo": {
    id: "first-repo",
    title: "Complete Beginner Guide: From Creating Repo on GitHub to Pushing to Main",
    badge: "Must-Learn for Beginners",
    description: "The absolute complete guide from zero: creating an empty repository on GitHub.com, setting up Git on your computer, staging, committing, and pushing into the 'main' branch.",
    analogy: "Think of this as: 1) Reserving a storage locker in the cloud warehouse (GitHub), 2) Packing your boxes on your desk (Laptop), and 3) Shipping them to locker #1 on the main floor.",
    steps: [
      {
        stepNumber: 1,
        title: "One-Time Setup: Introduce Yourself to Git",
        explanation: "Before your first commit, Git needs to know who you are so your commits show up with your name and GitHub avatar.",
        analogy: "Getting your student developer ID card stamped before entering the lab.",
        commandTemplate: 'git config --global user.name "{userName}"\ngit config --global user.email "{userEmail}"',
        note: "Use the same email address registered with your GitHub account so your green contribution streak lights up!"
      },
      {
        stepNumber: 2,
        title: "Create an Empty Repository on GitHub.com",
        explanation: "Open your browser and navigate to github.com/new. Give your repo a name (e.g. 'hackday-project'). Select 'Public'.",
        analogy: "Renting your cloud storage space and getting the locker number.",
        commandTemplate: "# Go to https://github.com/new in your browser!\n# Fill in 'Repository name'\n# Choose 'Public'\n# ⚠️ CRITICAL: DO NOT check 'Add a README file'!",
        note: "⚠️ CRITICAL WARNING FOR BEGINNERS: Do NOT check 'Add a README file', '.gitignore', or 'License' if you already wrote code on your computer! Checking them creates an initial commit on GitHub that causes a 'fatal: refusing to merge unrelated histories' error when you try to push."
      },
      {
        stepNumber: 3,
        title: "Copy Your Repository URL from GitHub",
        explanation: "Once created, GitHub shows a Quick Setup page with a green 'Code' button or an HTTPS URL like https://github.com/your-username/hackday-project.git. Copy this link!",
        analogy: "Copying down the exact shipping address and postal code of your cloud locker.",
        commandTemplate: "# Your GitHub repository URL looks like:\n# {repoUrl}",
        note: "Keep this URL ready. You will paste it in Step 8 below."
      },
      {
        stepNumber: 4,
        title: "Open Terminal Inside Your Project Folder",
        explanation: "In your code editor (like Antigravity IDE or VS Code), press Ctrl + ` (backtick) to open the built-in terminal, or right-click your folder on your desktop and select 'Open in Terminal'.",
        analogy: "Walking up to your project workbench.",
        commandTemplate: "# Verify you are in the correct folder:\npwd     # on Mac/Linux\n# or\ncd      # on Windows",
        note: "Ensure your terminal path points directly to your project root folder."
      },
      {
        stepNumber: 5,
        title: "Initialize Git in Your Folder (git init)",
        explanation: "Tells Git to start watching this directory. Git will create a hidden '.git' folder where it tracks all future history.",
        analogy: "Switching on the high-tech security camera in your room.",
        commandTemplate: "git init",
        note: "You only run 'git init' ONCE per project. If you see 'Initialized empty Git repository', it worked!"
      },
      {
        stepNumber: 6,
        title: "Stage All Your Project Files (git add .)",
        explanation: "The dot ('.') means 'add everything in this current folder' to the staging area. This prepares all your files for the upcoming snapshot.",
        analogy: "Gathering all your files from your desk and placing them neatly inside the shipping box.",
        commandTemplate: "git add .",
        note: "Run 'git status' after this command. All your files will turn green, indicating they are staged!"
      },
      {
        stepNumber: 7,
        title: "Create Your First Commit Snapshot (git commit)",
        explanation: "Freezes the staged files into a permanent, timestamped snapshot in your local repository history.",
        analogy: "Taping the cardboard box shut and writing a clear label on top: 'Initial commit'.",
        commandTemplate: 'git commit -m "{commitMsg}"',
        note: "Commit messages should describe what was created. E.g., 'feat: initial project setup for hackathon'."
      },
      {
        stepNumber: 8,
        title: "Set Default Branch Name to 'main' (git branch -M main)",
        explanation: "Older versions of Git called the default branch 'master'. Modern GitHub standard uses 'main'. The '-M' flag forcefully renames it to 'main'.",
        analogy: "Putting the official 'Main Highway' sign on your lane so it matches GitHub's expectations.",
        commandTemplate: "git branch -M main",
        note: "This guarantees seamless synchronization between your laptop and GitHub without branch name mismatch errors."
      },
      {
        stepNumber: 9,
        title: "Connect Your Local Folder to GitHub (git remote add origin)",
        explanation: "Tells your local Git repository the web address of your GitHub repo and assigns it the standard nickname 'origin'.",
        analogy: "Saving your cloud locker's GPS coordinates into your delivery truck's navigation system.",
        commandTemplate: "git remote add origin {repoUrl}",
        note: "If you get 'error: remote origin already exists', run 'git remote set-url origin {repoUrl}' to update it."
      },
      {
        stepNumber: 10,
        title: "Push Your Code into the 'main' Branch! (git push -u origin main)",
        explanation: "Uploads your local commits to GitHub's 'main' branch. The '-u' (upstream) flag links your local 'main' branch to the remote 'main' branch permanently.",
        analogy: "The delivery truck speeds up, climbs the ramp, and delivers all your boxes safely onto the 'main' shelf in the cloud warehouse!",
        commandTemplate: "git push -u origin main",
        note: "If prompted, log in with your GitHub account via browser or Personal Access Token. This only happens once!"
      },
      {
        stepNumber: 11,
        title: "Verify on GitHub.com 🎉",
        explanation: "Switch back to your browser and refresh your GitHub repository page. You will see all your files, code, and commit message proudly displayed on the 'main' branch!",
        analogy: "Opening your cloud locker door and seeing all your organized items sitting safely on the main shelf.",
        commandTemplate: "# Refresh https://github.com/your-username/hackday-project in your browser!",
        note: "Congratulations! Your project is now officially open-source and ready for Hacktoberfest mentors and judges!"
      }
    ]
  },

  "hacktoberfest": {
    id: "hacktoberfest",
    title: "How to Contribute to Open Source (Hacktoberfest PR Guide)",
    badge: "Hacktoberfest Special",
    description: "Step-by-step guide to forking an open-source repo, making changes in a feature branch, and submitting a Pull Request (PR).",
    analogy: "Like borrowing a library book, making a photocopy of a page, writing your improved notes on the photocopy, and handing it back to the author to include in the next edition.",
    steps: [
      {
        stepNumber: 1,
        title: "Fork the repository on GitHub.com",
        explanation: "Go to the target open-source project on GitHub and click the 'Fork' button in the top right. This creates your personal copy in your account.",
        analogy: "Making your own photocopy of the master blueprint.",
        commandTemplate: "# Do this on github.com by clicking the 'Fork' button!",
        note: "You never push directly to someone else's repository without permission."
      },
      {
        stepNumber: 2,
        title: "Clone your fork to your computer",
        explanation: "Download your forked copy from your GitHub account down to your laptop.",
        analogy: "Bringing your photocopy to your personal study desk.",
        commandTemplate: "git clone {repoUrl}",
        note: "Replace the URL with your own forked repository link."
      },
      {
        stepNumber: 3,
        title: "Create and switch to a new feature branch",
        explanation: "NEVER make changes directly on main when contributing. Always create a branch describing your task.",
        analogy: "Working on a clean piece of draft paper so your main copy stays untouched.",
        commandTemplate: "git switch -c {branchName}",
        note: "Good branch names: 'fix-login-typo', 'add-student-card-ui', 'update-readme'."
      },
      {
        stepNumber: 4,
        title: "Make your code changes & test thoroughly",
        explanation: "Edit files in your code editor (like VS Code or Antigravity IDE). Run the app locally to verify everything works.",
        analogy: "Doing the actual creative crafting.",
        commandTemplate: "git status",
        note: "Verify which files you modified before staging."
      },
      {
        stepNumber: 5,
        title: "Stage and commit your changes",
        explanation: "Save your work with a clear, concise conventional commit message.",
        analogy: "Packaging your improvement with a polite note.",
        commandTemplate: 'git add .\ngit commit -m "{commitMsg}"',
        note: "Follow the project's CONTRIBUTING.md guidelines if they have one."
      },
      {
        stepNumber: 6,
        title: "Push your feature branch to your GitHub fork",
        explanation: "Upload your branch back to your personal GitHub fork.",
        analogy: "Uploading your draft back to your personal cloud drive.",
        commandTemplate: "git push -u origin {branchName}",
        note: "Make sure you push to your branch name, not main!"
      },
      {
        stepNumber: 7,
        title: "Open a Pull Request (PR) on GitHub",
        explanation: "Go to the original project repo on GitHub. A banner will say 'Compare & pull request'. Click it, describe what you improved, and submit!",
        analogy: "Politely submitting your proposed improvement to the project maintainers.",
        commandTemplate: "# Go to GitHub.com -> Click 'Compare & pull request' -> Submit!",
        note: "Mention any issue you fixed (e.g. 'Fixes #42') in the PR description."
      }
    ]
  },

  "daily-work": {
    id: "daily-work",
    title: "The Everyday 3-Step Git Cycle (Add → Commit → Push)",
    badge: "Daily Routine",
    description: "The muscle memory commands you will use 90% of the time as a developer once your repo is connected to main.",
    analogy: "Like packing your backpack, locking it, and walking into class.",
    steps: [
      {
        stepNumber: 1,
        title: "Check what changed",
        explanation: "Always check what files you modified so you don't commit temporary files or test scratchpads.",
        analogy: "Glancing over your desk before packing up.",
        commandTemplate: "git status",
        note: "Red = modified; Green = staged."
      },
      {
        stepNumber: 2,
        title: "Stage your changes",
        explanation: "Choose to stage everything with '.' or specific files.",
        analogy: "Sliding your homework into your folder.",
        commandTemplate: "git add .",
        note: "You can also do 'git add index.html' to stage only one file."
      },
      {
        stepNumber: 3,
        title: "Commit with a clear message",
        explanation: "Record your progress with a summary.",
        analogy: "Writing the date and title on your assignment.",
        commandTemplate: 'git commit -m "{commitMsg}"',
        note: "Commit often in small chunks rather than once at 3 AM after 10 hours of work."
      },
      {
        stepNumber: 4,
        title: "Push to main on GitHub",
        explanation: "Back up your work to GitHub cloud so you never lose progress if your laptop runs out of battery.",
        analogy: "Syncing to the cloud.",
        commandTemplate: "git push origin main",
        note: "Once your branch is linked with '-u', just 'git push' is all you need."
      }
    ]
  },

  "team-collab": {
    id: "team-collab",
    title: "Working with Teammates Without Overwriting Each Other",
    badge: "Hackathon Lifesaver",
    description: "How hackathon team members can work on the same repository without breaking everyone's code.",
    analogy: "Like co-authoring a shared document with designated sections so nobody erases the other's paragraphs.",
    steps: [
      {
        stepNumber: 1,
        title: "Always pull latest updates before you start coding",
        explanation: "Fetch your teammate's latest commits from GitHub to keep your computer in sync.",
        analogy: "Checking the group chat before you start doing duplicate work.",
        commandTemplate: "git pull origin main",
        note: "Do this every morning or before you write a single line of code!"
      },
      {
        stepNumber: 2,
        title: "Create your own separate branch",
        explanation: "Each teammate must work on their own branch. Never code directly on main at the same time!",
        analogy: "Working on your own separate canvas.",
        commandTemplate: "git switch -c {branchName}",
        note: "Branch name idea: 'student1-api-routes' or 'student2-landing-page'."
      },
      {
        stepNumber: 3,
        title: "Commit your work on your branch",
        explanation: "Stage and commit changes onto your private branch.",
        analogy: "Finishing your specific part of the project.",
        commandTemplate: 'git add .\ngit commit -m "{commitMsg}"',
        note: "Your changes are isolated safely on your branch."
      },
      {
        stepNumber: 4,
        title: "Push your branch to GitHub",
        explanation: "Upload your branch to GitHub so teammates can review it.",
        analogy: "Sharing your branch draft to the team drive.",
        commandTemplate: "git push -u origin {branchName}",
        note: "Teammates can now test your branch on their laptops without affecting main."
      },
      {
        stepNumber: 5,
        title: "Merge via GitHub Pull Request into main",
        explanation: "Open a PR on GitHub. Have your teammate click 'Review' and 'Merge' into main.",
        analogy: "Combining your finished puzzle piece into the team puzzle.",
        commandTemplate: "# Open PR on GitHub -> Click 'Merge Pull Request'",
        note: "GitHub will automatically check if there are any conflicts before merging!"
      }
    ]
  }
};
