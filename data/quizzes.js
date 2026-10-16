export const quizQuestions = [
  {
    id: 1,
    question: "What is the difference between Git and GitHub?",
    options: [
      "They are the exact same thing created by Microsoft.",
      "Git is the offline version control tool on your laptop; GitHub is the cloud website for hosting and sharing repositories.",
      "Git is for coding in Python, while GitHub is only for HTML and CSS.",
      "GitHub works without internet, but Git requires an internet connection."
    ],
    correctIndex: 1,
    explanation: "Correct! Git is the software tool running locally on your computer that tracks file history. GitHub is the cloud platform (website) where you upload your Git repositories to collaborate with others."
  },
  {
    id: 2,
    question: "What does the command 'git add .' actually do?",
    options: [
      "Immediately uploads all your files to github.com.",
      "Deletes all your files and resets the repository.",
      "Moves all modified and new files into the Staging Area, preparing them for the next commit.",
      "Creates a new branch named 'dot'."
    ],
    correctIndex: 2,
    explanation: "Exactly! 'git add .' packages all changes in the current folder into the Staging Area. It does NOT upload anything to the internet yet (that's what 'git push' is for)."
  },
  {
    id: 3,
    question: "Why should you NEVER work directly on the 'main' branch when contributing to Hacktoberfest?",
    options: [
      "Because main is completely illegal to use in open source.",
      "Because creating a feature branch keeps your changes isolated, prevents accidents, and makes it easy for maintainers to review your Pull Request.",
      "Because Git will automatically delete your files if you touch main.",
      "Because you can only commit once on the main branch."
    ],
    correctIndex: 1,
    explanation: "Spot on! Working on a feature branch (e.g. 'git switch -c fix-navbar') ensures your main branch stays clean and identical to upstream. Maintainers can easily test and merge your specific feature PR."
  },
  {
    id: 4,
    question: "You want to download an existing open-source project from GitHub to your laptop for the first time. Which command should you run?",
    options: [
      "git init",
      "git push origin main",
      "git clone <repository-url>",
      "git commit -m 'download'"
    ],
    correctIndex: 2,
    explanation: "Great job! 'git clone <url>' downloads the full repository and all its version history directly to your computer. You don't even need to run 'git init' afterwards."
  },
  {
    id: 5,
    question: "What does a 'Merge Conflict' mean in Git?",
    options: [
      "Your laptop has a virus and Git stopped working.",
      "Your GitHub account password is incorrect.",
      "Two people (or branches) edited the exact same line in a file, and Git needs you to choose which version to keep.",
      "You exceeded GitHub's free storage limit."
    ],
    correctIndex: 2,
    explanation: "Bingo! Merge conflicts are completely normal. They happen whenever Git cannot automatically decide whose code to keep on the same line. You simply open the file, choose the correct lines, save, and commit!"
  }
];
