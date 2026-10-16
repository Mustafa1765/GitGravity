export const emergenciesData = [
  {
    id: "wrong-commit-msg",
    title: "I made a typo in my last commit message!",
    severity: "Low",
    badge: "Super Easy Fix",
    problem: "You typed 'git commit -m \"fixx typo\"' and pressed enter, but noticed a spelling error or missing detail.",
    fixCommand: 'git commit --amend -m "Your new corrected message"',
    explanation: "The '--amend' flag tells Git to overwrite the very last commit's message without creating a duplicate commit.",
    proTip: "Only do this if you haven't pushed to GitHub yet!"
  },
  {
    id: "discard-local-file",
    title: "I modified a file, broke it, and want it back to normal!",
    severity: "Medium",
    badge: "Ctrl+Z for Git",
    problem: "You tested some experimental code in 'index.html', it broke everything, and you want the exact version from your last commit.",
    fixCommand: "git restore index.html\n# or to restore all files:\ngit restore .",
    explanation: "'git restore' discards all uncommitted changes in your working directory and restores the file back to the clean state of your last commit.",
    proTip: "Warning: Any changes you haven't committed will be permanently lost."
  },
  {
    id: "unstage-file",
    title: "I accidentally ran 'git add .' and staged a secret or wrong file!",
    severity: "Low",
    badge: "Undo Staging",
    problem: "You staged a '.env' file or an accidental file and want to remove it from staging before committing.",
    fixCommand: "git restore --staged <filename>\n# or unstage everything:\ngit restore --staged .",
    explanation: "This removes the file from the Staging Area (index) but leaves the file untouched on your computer desk.",
    proTip: "Always add sensitive files like '.env' to your '.gitignore' file so you never accidentally stage them."
  },
  {
    id: "wrong-branch-committed",
    title: "I committed directly on 'main' instead of my feature branch!",
    severity: "Medium",
    badge: "Branch Rescue",
    problem: "You meant to create a branch, but accidentally committed your work straight to the 'main' branch.",
    fixCommand: `# 1. Create your feature branch containing this commit:
git branch feature-my-work

# 2. Reset the main branch back one commit:
git reset --hard HEAD~1

# 3. Switch to your new feature branch safely:
git switch feature-my-work`,
    explanation: "Your commit is preserved on the new branch, while the main branch is rolled back to how it was before.",
    proTip: "Don't panic! Git rarely deletes anything that was committed."
  },
  {
    id: "merge-conflict",
    title: "HELP! Merge Conflict error appeared in terminal!",
    severity: "High",
    badge: "Don't Panic!",
    problem: "Git says: 'CONFLICT (content): Merge conflict in App.js. Automatic merge failed'.",
    fixCommand: `# 1. Open the conflicted file in your editor
# 2. Look for the conflict markers:
<<<<<<< HEAD (Your current branch version)
Your code here
=======
Teammate's incoming code here
>>>>>>> branch-name

# 3. Keep the code you want, delete the marker lines, and save!
# 4. Stage and complete the merge:
git add .
git commit -m "resolve: merge conflict in App.js"`,
    explanation: "A merge conflict simply means you and your teammate edited the exact same line of code. Git is politely asking you: 'Which version do you want to keep?'",
    proTip: "Modern editors like VS Code & Antigravity show handy 'Accept Current' or 'Accept Incoming' buttons right above the conflict."
  },
  {
    id: "undo-last-commit-keep-code",
    title: "I committed too early! Undo commit but keep my written code.",
    severity: "Low",
    badge: "Safe Undo",
    problem: "You committed, but forgot to add an icon or test something. You want to undo the commit without losing your typed code.",
    fixCommand: "git reset --soft HEAD~1",
    explanation: "The '--soft' flag takes down the commit snapshot, but leaves all your file edits staged and ready for you to re-commit.",
    proTip: "HEAD~1 means 'the commit right before current HEAD'."
  }
];
