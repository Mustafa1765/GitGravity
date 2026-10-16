// ==========================================================================
// GitGravity - Main Application Logic
// ==========================================================================

import { commandsData } from './data/commands.js';
import { workflowsData } from './data/workflows.js';
import { emergenciesData } from './data/emergencies.js';
import { quizQuestions } from './data/quizzes.js';

document.addEventListener('DOMContentLoaded', () => {
  initSimulator();
  initWorkflows();
  initCheatSheet();
  initEmergencyRoom();
  initQuiz();
  initChecklist();
  initThemeToggle();
  initGemmaAI();
});

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
export function showToast(message, icon = '📋') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

/* ==========================================================================
   1. Interactive Terminal Simulator Engine
   ========================================================================== */
function initSimulator() {
  const terminalScreen = document.getElementById('terminal-screen');
  const terminalHistory = document.getElementById('terminal-history');
  const terminalInput = document.getElementById('terminal-input');
  const resetBtn = document.getElementById('terminal-reset-btn');
  const promptBranch = document.getElementById('prompt-branch');
  const metaBranch = document.getElementById('meta-branch');
  const metaRemote = document.getElementById('meta-remote');
  const metaSync = document.getElementById('meta-sync');
  const repoStatusBadge = document.getElementById('repo-status-badge');
  const listUntracked = document.getElementById('list-untracked');
  const listStaged = document.getElementById('list-staged');
  const countUntracked = document.getElementById('count-untracked');
  const countStaged = document.getElementById('count-staged');
  const commitTree = document.getElementById('commit-tree');
  const expTitle = document.getElementById('exp-title');
  const expDesc = document.getElementById('exp-desc');
  const quickChips = document.querySelectorAll('.chip-cmd');

  // Initial State
  const defaultState = {
    branch: 'main',
    remote: 'github.com/student/hackday',
    isPushed: false,
    untracked: ['index.html', 'style.css'],
    staged: [],
    commits: [
      {
        hash: 'a1c4b72',
        message: 'Initial project setup & HTML boilerplate',
        time: '15 mins ago'
      }
    ]
  };

  let state = JSON.parse(JSON.stringify(defaultState));

  function updateVisuals(lastExplanation) {
    // Update branch displays
    promptBranch.textContent = `(${state.branch})`;
    metaBranch.textContent = state.branch;
    metaRemote.textContent = state.remote;

    // Update Untracked List
    listUntracked.innerHTML = '';
    countUntracked.textContent = state.untracked.length;
    if (state.untracked.length === 0) {
      listUntracked.innerHTML = '<span class="file-empty-hint">No untracked files</span>';
    } else {
      state.untracked.forEach(f => {
        const item = document.createElement('div');
        item.className = 'file-item untracked';
        item.innerHTML = `<span>📄</span> <span>${f}</span>`;
        listUntracked.appendChild(item);
      });
    }

    // Update Staged List
    listStaged.innerHTML = '';
    countStaged.textContent = state.staged.length;
    if (state.staged.length === 0) {
      listStaged.innerHTML = '<span class="file-empty-hint">No files staged</span>';
    } else {
      state.staged.forEach(f => {
        const item = document.createElement('div');
        item.className = 'file-item staged';
        item.innerHTML = `<span>📦</span> <span>${f}</span>`;
        listStaged.appendChild(item);
      });
    }

    // Update Commit Tree
    commitTree.innerHTML = '';
    state.commits.slice().reverse().forEach(c => {
      const node = document.createElement('div');
      node.className = 'commit-node';
      node.innerHTML = `
        <span class="commit-dot"></span>
        <span class="commit-hash">${c.hash}</span>
        <span class="commit-msg">${c.message}</span>
        <span class="commit-time">${c.time}</span>
      `;
      commitTree.appendChild(node);
    });

    // Update Sync Status
    if (state.isPushed) {
      metaSync.textContent = 'Up to date with GitHub';
      metaSync.className = 'meta-val sync-tag text-emerald';
    } else {
      metaSync.textContent = '1 commit ahead of origin';
      metaSync.className = 'meta-val sync-tag text-yellow';
    }

    // Status Badge
    if (state.staged.length > 0) {
      repoStatusBadge.textContent = `${state.staged.length} file(s) staged`;
      repoStatusBadge.className = 'badge';
      repoStatusBadge.style.background = 'rgba(6, 182, 212, 0.15)';
      repoStatusBadge.style.color = '#38bdf8';
    } else if (state.untracked.length > 0) {
      repoStatusBadge.textContent = 'Changes not staged';
      repoStatusBadge.className = 'badge';
      repoStatusBadge.style.background = 'rgba(245, 158, 11, 0.15)';
      repoStatusBadge.style.color = '#fbbf24';
    } else {
      repoStatusBadge.textContent = 'Clean working tree';
      repoStatusBadge.className = 'badge badge-success';
    }

    // Update Explanation Box
    if (lastExplanation) {
      expTitle.textContent = lastExplanation.title;
      expDesc.innerHTML = lastExplanation.desc;
    }
  }

  function handleCommand(rawCmd) {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    // Append to terminal history
    const entry = document.createElement('div');
    entry.className = 'term-entry';

    const cmdLine = document.createElement('div');
    cmdLine.className = 'term-cmd-line';
    cmdLine.innerHTML = `<span class="prompt-user">student@hackday</span>:<span class="prompt-dir">~/project</span><span class="prompt-branch">(${state.branch})</span>$ ${cmd}`;
    entry.appendChild(cmdLine);

    const output = document.createElement('div');
    output.className = 'term-output';

    let explanation = null;

    // Command Parsing
    if (cmd === 'clear') {
      terminalHistory.innerHTML = '';
      terminalInput.value = '';
      return;
    } else if (cmd === 'help') {
      output.innerHTML = `Available commands in this interactive playground:
  <span class="text-cyan">git status</span>            Check state of files
  <span class="text-cyan">git add .</span>             Stage modified files into staging box
  <span class="text-cyan">git commit -m "..."</span>   Save snapshot to local git history
  <span class="text-cyan">git branch</span>            List current branches
  <span class="text-cyan">git checkout -b <name></span> Create and switch to new branch
  <span class="text-cyan">git switch -c <name></span>   Modern command to create & switch branch
  <span class="text-cyan">git push</span>              Upload commits to GitHub
  <span class="text-cyan">git pull</span>              Download changes from GitHub
  <span class="text-cyan">git log</span>               Display commit history
  <span class="text-cyan">clear</span>                 Clear terminal output screen`;
      explanation = {
        title: "Viewing Help Directory",
        desc: "You asked Git for help! In real life, you can also type <code class='inline-code'>git <command> --help</code> to open documentation."
      };
    } else if (cmd === 'git status') {
      if (state.staged.length > 0 && state.untracked.length > 0) {
        output.innerHTML = `On branch ${state.branch}
Changes to be committed:
  <span class="text-emerald">(use "git restore --staged <file>..." to unstage)</span>
${state.staged.map(f => `\t<span class="text-emerald">new file:   ${f}</span>`).join('\n')}

Untracked files:
  <span class="text-yellow">(use "git add <file>..." to include in what will be committed)</span>
${state.untracked.map(f => `\t<span class="text-yellow">${f}</span>`).join('\n')}`;
      } else if (state.staged.length > 0) {
        output.innerHTML = `On branch ${state.branch}
Changes to be committed:
${state.staged.map(f => `\t<span class="text-emerald">new file:   ${f}</span>`).join('\n')}`;
      } else if (state.untracked.length > 0) {
        output.innerHTML = `On branch ${state.branch}
Untracked files:
  <span class="text-yellow">(use "git add <file>..." to include in what will be committed)</span>
${state.untracked.map(f => `\t<span class="text-yellow">${f}</span>`).join('\n')}
nothing added to commit but untracked files present`;
      } else {
        output.innerHTML = `On branch ${state.branch}\nnothing to commit, working tree clean`;
      }
      explanation = {
        title: "Inspecting Repo with 'git status'",
        desc: "Git showed you which files are currently on your desk vs which files are inside the packing box ready to be sealed."
      };
    } else if (cmd.startsWith('git add')) {
      if (state.untracked.length === 0) {
        output.innerHTML = `Nothing new to add. Working tree is clean.`;
        explanation = {
          title: "All Files Already Staged!",
          desc: "You ran <code class='inline-code'>git add</code>, but there were no un-staged files. Type <code class='inline-code'>git commit -m \"...\"</code> next!"
        };
      } else {
        state.staged.push(...state.untracked);
        state.untracked = [];
        output.innerHTML = `<span class="text-emerald">✓ Files staged successfully into Index. Ready for commit!</span>`;
        explanation = {
          title: "Files Moved to Staging Area (Index)",
          desc: "Notice the files moved from the yellow 'Untracked' box into the green 'Staged' box on the right! They are now prepped for snapshot."
        };
      }
    } else if (cmd.startsWith('git commit')) {
      if (state.staged.length === 0) {
        output.innerHTML = `<span class="text-yellow">no changes added to commit (use "git add" to stage files first)</span>`;
        explanation = {
          title: "Oops! Staging Box Was Empty",
          desc: "Git cannot seal an empty box! Run <code class='inline-code'>git add .</code> first so Git knows which files to include in this snapshot."
        };
      } else {
        // Extract message
        const match = cmd.match(/-m\s+["'](.*?)["']/);
        const commitMsg = match ? match[1] : 'Update project code';
        const randomHash = Math.random().toString(16).substring(2, 9);

        state.commits.push({
          hash: randomHash,
          message: commitMsg,
          time: 'just now'
        });
        const stagedCount = state.staged.length;
        state.staged = [];
        state.isPushed = false;

        output.innerHTML = `[${state.branch} ${randomHash}] ${commitMsg}\n ${stagedCount} file(s) changed, 142 insertions(+)`;
        explanation = {
          title: `Snapshot Sealed! Commit #${randomHash}`,
          desc: `Awesome! You permanently recorded your changes in the Git history graph on the right. Notice how the green staged box emptied out.`
        };
      }
    } else if (cmd.startsWith('git push')) {
      state.isPushed = true;
      output.innerHTML = `Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Writing objects: 100% (3/3), 1.42 KiB | 1.42 MiB/s, done.
To https://${state.remote}.git
 * [new branch]      ${state.branch} -> ${state.branch}
<span class="text-emerald">Branch '${state.branch}' set up to track remote branch '${state.branch}' from 'origin'.</span>`;
      explanation = {
        title: "Pushed to GitHub Cloud Warehouse!",
        desc: "Your local commits are now backed up on github.com. Teammates, mentors, and Hacktoberfest reviewers can view your code online."
      };
    } else if (cmd.startsWith('git pull')) {
      output.innerHTML = `Already up to date with remote 'origin/${state.branch}'.`;
      explanation = {
        title: "Pulled Remote Updates",
        desc: "Git verified that your local computer has the exact same code as the cloud repository on GitHub."
      };
    } else if (cmd.startsWith('git branch') && !cmd.includes('-b') && !cmd.includes('-M') && !cmd.includes(' ')) {
      output.innerHTML = `* <span class="text-emerald">${state.branch}</span>\n  main`;
      explanation = {
        title: "Listing Active Branches",
        desc: "The star <code class='inline-code'>*</code> indicates which branch you are currently working on."
      };
    } else if (cmd.includes('checkout -b') || cmd.includes('switch -c')) {
      const parts = cmd.split(/\s+/);
      const newBranch = parts[parts.length - 1];
      state.branch = newBranch;
      output.innerHTML = `Switched to a new branch '<span class="text-violet">${newBranch}</span>'`;
      explanation = {
        title: `Created & Switched to '${newBranch}'`,
        desc: "You jumped into a safe parallel universe! Any new commits you make now will not alter your original branch."
      };
    } else if (cmd.startsWith('git log')) {
      output.innerHTML = state.commits.slice().reverse().map(c => 
        `<span class="text-yellow">${c.hash}</span> - <span class="text-main">${c.message}</span> <span class="text-dim">(${c.time})</span>`
      ).join('\n');
      explanation = {
        title: "Viewing Commit Log",
        desc: "Git displayed the chronological photo album of snapshots saved in your project."
      };
    } else if (cmd.startsWith('git diff')) {
      output.innerHTML = `diff --git a/index.html b/index.html
--- a/index.html
+++ b/index.html
@@ -12,3 +12,4 @@
<span class="text-emerald">+ <div class="student-hero">Hacktoberfest 2026</div></span>
<span class="text-emerald">+ <button id="cta-btn">Start Contributing</button></span>`;
      explanation = {
        title: "Inspecting Line-by-Line Changes",
        desc: "Green lines with '+' show what was added, while red lines with '-' show what was removed."
      };
    } else {
      output.innerHTML = `git: '${cmd.split(' ')[0]}' is not a recognized command. Type <span class="text-yellow">help</span> to view supported commands.`;
      explanation = {
        title: "Unrecognized Command",
        desc: "Git didn't recognize that syntax. Check your spelling or click one of the quick command buttons below."
      };
    }

    entry.appendChild(output);
    terminalHistory.appendChild(entry);
    terminalInput.value = '';
    terminalScreen.scrollTop = terminalScreen.scrollHeight;

    updateVisuals(explanation);
  }

  // Quick Chips Click
  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.dataset.cmd;
      handleCommand(cmd);
    });
  });

  // Enter Key Listener
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleCommand(terminalInput.value);
    }
  });

  // Reset Button
  resetBtn.addEventListener('click', () => {
    state = JSON.parse(JSON.stringify(defaultState));
    terminalHistory.innerHTML = '';
    updateVisuals({
      title: "Playground Reset 🔄",
      desc: "Simulated repository was restored to clean state. Ready for fresh commands!"
    });
    showToast("Simulator reset to default state!", "🔄");
  });

  // Initial render
  updateVisuals();
}

/* ==========================================================================
   2. Step-by-Step Guided Workflows
   ========================================================================== */
function initWorkflows() {
  const tabs = document.querySelectorAll('.workflow-tab');
  const container = document.getElementById('workflow-steps-container');
  const inputUserName = document.getElementById('custom-user-name');
  const inputUserEmail = document.getElementById('custom-user-email');
  const inputRepo = document.getElementById('custom-repo-url');
  const inputBranch = document.getElementById('custom-branch-name');
  const inputCommit = document.getElementById('custom-commit-msg');
  const mockRepoName = document.getElementById('mock-repo-name');
  const mockRemotePreview = document.getElementById('mockup-remote-preview');
  const aioCodeContent = document.getElementById('aio-code-content');
  const copyAllBtn = document.getElementById('copy-all-commands-btn');
  const roadmapNodes = document.querySelectorAll('.roadmap-node');

  let activeFlowId = 'first-repo';

  function updateAllInOneBox(repoVal, commitVal) {
    if (!aioCodeContent) return;
    aioCodeContent.textContent = `# 1. Initialize local repository
git init

# 2. Stage all your project files
git add .

# 3. Create your first permanent snapshot
git commit -m "${commitVal}"

# 4. Set default branch to main
git branch -M main

# 5. Link local folder to your GitHub repository
git remote add origin ${repoVal}

# 6. Push your code into the main branch!
git push -u origin main`;
  }

  function renderSteps() {
    const flow = workflowsData[activeFlowId];
    if (!flow) return;

    const userNameVal = inputUserName ? inputUserName.value.trim() || 'Mustafa Shaik' : 'Mustafa Shaik';
    const userEmailVal = inputUserEmail ? inputUserEmail.value.trim() || 'student@example.com' : 'student@example.com';
    const repoVal = inputRepo ? inputRepo.value.trim() || 'https://github.com/your-username/hackday-project.git' : 'https://github.com/your-username/hackday-project.git';
    const branchVal = inputBranch ? inputBranch.value.trim() || 'feature-cool-navbar' : 'feature-cool-navbar';
    const commitVal = inputCommit ? inputCommit.value.trim() || 'feat: add student dashboard UI' : 'feat: add student dashboard UI';

    updateAllInOneBox(repoVal, commitVal);

    container.innerHTML = '';

    flow.steps.forEach(step => {
      // Replace placeholders
      let resolvedCommand = step.commandTemplate
        .replace(/{userName}/g, userNameVal)
        .replace(/{userEmail}/g, userEmailVal)
        .replace(/{repoUrl}/g, repoVal)
        .replace(/{branchName}/g, branchVal)
        .replace(/{commitMsg}/g, commitVal);

      const card = document.createElement('div');
      card.className = 'step-card';
      card.id = `step-node-${step.stepNumber}`;
      card.innerHTML = `
        <div class="step-card-header">
          <span class="step-badge">Step ${step.stepNumber}</span>
          <h3 class="step-title">${step.title}</h3>
        </div>
        <div class="step-analogy">
          <strong>💡 Real-World Analogy:</strong> ${step.analogy}
        </div>
        <p class="step-explanation">${step.explanation}</p>
        
        <div class="code-snippet-box">
          <div class="code-header">
            <span class="code-lang-tag">Terminal Command</span>
            <button class="btn-copy" data-code="${encodeURIComponent(resolvedCommand)}">
              <span>📋</span> Copy Command
            </button>
          </div>
          <pre class="code-content"><code>${escapeHtml(resolvedCommand)}</code></pre>
        </div>

        <div class="step-note">
          <span>📌 Note:</span> ${step.note}
        </div>
      `;
      container.appendChild(card);
    });

    // Attach copy listeners
    container.querySelectorAll('.btn-copy').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = decodeURIComponent(btn.dataset.code);
        navigator.clipboard.writeText(code).then(() => {
          showToast('Command copied to clipboard!', '📋');
          btn.innerHTML = '<span>✓</span> Copied!';
          setTimeout(() => {
            btn.innerHTML = '<span>📋</span> Copy Command';
          }, 1800);
        });
      });
    });
  }

  // Copy All Commands Button
  if (copyAllBtn && aioCodeContent) {
    copyAllBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(aioCodeContent.textContent).then(() => {
        showToast('All push commands copied to clipboard!', '⚡');
        copyAllBtn.innerHTML = '<span>✓</span> Copied All!';
        setTimeout(() => {
          copyAllBtn.innerHTML = '<span>📋</span> Copy All Commands to Clipboard';
        }, 2000);
      });
    });
  }

  // GitHub Simulator Name sync
  if (mockRepoName && inputRepo && mockRemotePreview) {
    mockRepoName.addEventListener('input', () => {
      const sanitizedName = mockRepoName.value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-') || 'hackday-project';
      const newUrl = `https://github.com/your-username/${sanitizedName}.git`;
      inputRepo.value = newUrl;
      mockRemotePreview.textContent = newUrl;
      renderSteps();
    });
  }

  // Roadmap node clicks
  roadmapNodes.forEach(node => {
    node.addEventListener('click', () => {
      roadmapNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      const stepNum = node.dataset.step;
      const targetCard = document.getElementById(`step-node-${stepNum}`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetCard.style.borderColor = 'var(--accent-emerald)';
        setTimeout(() => {
          targetCard.style.borderColor = '';
        }, 1500);
      }
    });
  });

  // Tab Switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFlowId = tab.dataset.flow;
      renderSteps();
    });
  });

  // Input listeners for dynamic replacement
  [inputUserName, inputUserEmail, inputRepo, inputBranch, inputCommit].filter(Boolean).forEach(input => {
    input.addEventListener('input', renderSteps);
  });

  renderSteps();
}

/* ==========================================================================
   3. Searchable Cheat Sheet
   ========================================================================== */
function initCheatSheet() {
  const grid = document.getElementById('commands-grid');
  const searchInput = document.getElementById('command-search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const pills = document.querySelectorAll('#category-pills .pill');

  let activeCategory = 'all';

  function renderGrid() {
    const query = searchInput.value.toLowerCase().trim();
    grid.innerHTML = '';

    const filtered = commandsData.filter(cmd => {
      const matchesCat = activeCategory === 'all' || cmd.category === activeCategory;
      const matchesQuery = !query || 
        cmd.name.toLowerCase().includes(query) ||
        cmd.summary.toLowerCase().includes(query) ||
        cmd.analogy.toLowerCase().includes(query) ||
        cmd.syntax.toLowerCase().includes(query);
      return matchesCat && matchesQuery;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem 0; color: var(--text-dim);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
          <h3>No matching commands found</h3>
          <p>Try searching for "push", "undo", "merge", or click "All".</p>
        </div>
      `;
      return;
    }

    filtered.forEach(cmd => {
      const card = document.createElement('div');
      card.className = 'cmd-card';
      card.innerHTML = `
        <div class="cmd-card-top">
          <span class="cmd-name">${cmd.name}</span>
          <span class="cmd-badge">${cmd.badge}</span>
        </div>
        <p class="cmd-summary">${cmd.summary}</p>
        <div class="cmd-analogy">
          <strong>Analogy:</strong> ${cmd.analogy}
        </div>
        <div class="code-snippet-box">
          <div class="code-header">
            <span class="code-lang-tag">Syntax</span>
            <button class="btn-copy" data-code="${encodeURIComponent(cmd.example)}">
              <span>📋</span> Copy Example
            </button>
          </div>
          <pre class="code-content"><code>${escapeHtml(cmd.syntax)}</code></pre>
        </div>
        <div class="cmd-when">
          <strong>When to use:</strong> ${cmd.whenToUse}
        </div>
        <div class="cmd-protip">
          💡 <strong>Pro Tip:</strong> ${cmd.proTip}
        </div>
      `;
      grid.appendChild(card);
    });

    // Copy event listeners
    grid.querySelectorAll('.btn-copy').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = decodeURIComponent(btn.dataset.code);
        navigator.clipboard.writeText(code).then(() => {
          showToast('Example copied to clipboard!', '📋');
          btn.innerHTML = '<span>✓</span> Copied!';
          setTimeout(() => {
            btn.innerHTML = '<span>📋</span> Copy Example';
          }, 1800);
        });
      });
    });
  }

  // Category Filter
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.dataset.category;
      renderGrid();
    });
  });

  // Search Input
  searchInput.addEventListener('input', () => {
    clearSearchBtn.style.display = searchInput.value ? 'block' : 'none';
    renderGrid();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    renderGrid();
  });

  renderGrid();
}

/* ==========================================================================
   4. Git Emergency Room
   ========================================================================== */
function initEmergencyRoom() {
  const grid = document.getElementById('emergency-grid');
  if (!grid) return;

  grid.innerHTML = '';
  emergenciesData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'emergency-card';
    card.innerHTML = `
      <div class="emergency-top">
        <span class="badge ${item.severity === 'High' ? 'hacktober-badge' : 'badge-success'}">${item.badge}</span>
        <span class="severity-pill severity-${item.severity}">Severity: ${item.severity}</span>
      </div>
      <h3 class="emergency-title">${item.title}</h3>
      <div class="emergency-problem">
        <strong>The Problem:</strong> ${item.problem}
      </div>
      <div class="code-snippet-box">
        <div class="code-header">
          <span class="code-lang-tag">The Emergency Fix</span>
          <button class="btn-copy" data-code="${encodeURIComponent(item.fixCommand)}">
            <span>📋</span> Copy Fix
          </button>
        </div>
        <pre class="code-content"><code>${escapeHtml(item.fixCommand)}</code></pre>
      </div>
      <div class="step-explanation">
        ${item.explanation}
      </div>
      <div class="step-note">
        💡 <strong>Pro Tip:</strong> ${item.proTip}
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = decodeURIComponent(btn.dataset.code);
      navigator.clipboard.writeText(code).then(() => {
        showToast('Emergency fix copied!', '🚑');
        btn.innerHTML = '<span>✓</span> Copied!';
        setTimeout(() => {
          btn.innerHTML = '<span>📋</span> Copy Fix';
        }, 1800);
      });
    });
  });
}

/* ==========================================================================
   5. Interactive Quiz Engine
   ========================================================================== */
function initQuiz() {
  const questionNumber = document.getElementById('question-number');
  const scoreTracker = document.getElementById('score-tracker');
  const questionText = document.getElementById('question-text');
  const optionsList = document.getElementById('options-list');
  const quizFeedback = document.getElementById('quiz-feedback');
  const nextBtn = document.getElementById('next-question-btn');
  const progressFill = document.getElementById('quiz-progress-fill');

  let currentIndex = 0;
  let score = 0;
  let answered = false;

  function loadQuestion() {
    answered = false;
    quizFeedback.style.display = 'none';
    quizFeedback.className = 'quiz-feedback';
    nextBtn.style.display = 'none';

    if (currentIndex >= quizQuestions.length) {
      // Completed Quiz Card
      questionNumber.textContent = 'Quiz Completed! 🎉';
      scoreTracker.textContent = `Final Score: ${score} / ${quizQuestions.length}`;
      progressFill.style.width = '100%';

      const percentage = Math.round((score / quizQuestions.length) * 100);
      questionText.innerHTML = `You scored <span class="gradient-text">${percentage}%</span> (${score}/${quizQuestions.length})!`;
      
      optionsList.innerHTML = `
        <div style="text-align: center; padding: 1.5rem; background: rgba(16, 185, 129, 0.1); border-radius: 12px; border: 1px solid var(--accent-emerald);">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">🏅</div>
          <h4 style="font-size: 1.25rem; color: #a7f3d0; margin-bottom: 0.5rem;">Student Git Ready Badge Awarded!</h4>
          <p style="font-size: 0.95rem; color: #f8fafc;">You have mastered Git basics and are officially ready to make your first Hacktoberfest pull request!</p>
        </div>
      `;

      nextBtn.style.display = 'inline-block';
      nextBtn.textContent = 'Restart Quiz 🔄';
      return;
    }

    const q = quizQuestions[currentIndex];
    questionNumber.textContent = `Question ${currentIndex + 1} of ${quizQuestions.length}`;
    scoreTracker.textContent = `Score: ${score} / ${currentIndex}`;
    questionText.textContent = q.question;
    progressFill.style.width = `${((currentIndex) / quizQuestions.length) * 100}%`;

    optionsList.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.innerHTML = `<span style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-cyan);">${String.fromCharCode(65 + idx)}.</span> <span>${opt}</span>`;
      btn.addEventListener('click', () => selectAnswer(idx, btn));
      optionsList.appendChild(btn);
    });
  }

  function selectAnswer(selectedIndex, selectedBtn) {
    if (answered) return;
    answered = true;

    const q = quizQuestions[currentIndex];
    const optionBtns = optionsList.querySelectorAll('.quiz-option');

    optionBtns.forEach(b => b.disabled = true);

    if (selectedIndex === q.correctIndex) {
      score++;
      selectedBtn.classList.add('correct');
      quizFeedback.className = 'quiz-feedback success';
      quizFeedback.innerHTML = `<strong>🎉 Correct!</strong> ${q.explanation}`;
    } else {
      selectedBtn.classList.add('incorrect');
      optionBtns[q.correctIndex].classList.add('correct');
      quizFeedback.className = 'quiz-feedback error';
      quizFeedback.innerHTML = `<strong>❌ Not quite.</strong> ${q.explanation}`;
    }

    quizFeedback.style.display = 'block';
    nextBtn.style.display = 'inline-block';
    nextBtn.textContent = currentIndex === quizQuestions.length - 1 ? 'See Results →' : 'Next Question →';
    scoreTracker.textContent = `Score: ${score} / ${currentIndex + 1}`;
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex >= quizQuestions.length) {
      // Restart
      currentIndex = 0;
      score = 0;
      loadQuestion();
    } else {
      currentIndex++;
      loadQuestion();
    }
  });

  loadQuestion();
}

/* ==========================================================================
   6. Hacktoberfest PR Checklist
   ========================================================================== */
function initChecklist() {
  const checkboxes = document.querySelectorAll('#pr-checklist input[type="checkbox"]');
  const progressText = document.getElementById('checklist-progress-text');
  const celebratePill = document.getElementById('celebrate-pill');

  function updateChecklist() {
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    progressText.textContent = `${checked} of ${total} completed`;

    if (checked === total) {
      celebratePill.style.display = 'block';
      showToast('🎉 All checklist items completed! You are ready for your PR!', '🎃');
    } else {
      celebratePill.style.display = 'none';
    }
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateChecklist);
  });
}

/* ==========================================================================
   7. Theme Toggle
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = toggleBtn.querySelector('.theme-icon');

  const savedTheme = localStorage.getItem('gitgravity-theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    themeIcon.textContent = '☀️';
  } else {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    themeIcon.textContent = '🌙';
  }

  toggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      themeIcon.textContent = '☀️';
      localStorage.setItem('gitgravity-theme', 'light');
      showToast('Switched to Light Theme', '☀️');
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      themeIcon.textContent = '🌙';
      localStorage.setItem('gitgravity-theme', 'dark');
      showToast('Switched to Dark Theme', '🌙');
    }
  });
}

/* Helper to prevent XSS in pre tags */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ==========================================================================
   Gemma 4 AI Student Git Coach Logic
   ========================================================================== */
function initGemmaAI() {
  const askBtn = document.getElementById('gemma-ask-btn');
  const input = document.getElementById('gemma-question-input');
  const respContainer = document.getElementById('gemma-ai-response');
  const respText = document.getElementById('gemma-resp-text');

  if (!askBtn || !input || !respContainer || !respText) return;

  function askGemma() {
    const query = input.value.trim();
    if (!query) return;

    respContainer.style.display = 'block';
    respText.innerHTML = `<em>Thinking with Gemma 4 (Gemini API)...</em>`;

    // Try Python backend API first, fallback to client-side Gemma knowledge
    fetch('/api/ai-explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query })
    })
    .then(res => res.json())
    .then(data => {
      if (data && data.explanation) {
        respText.textContent = data.explanation;
      } else {
        fallbackGemma(query);
      }
    })
    .catch(() => {
      fallbackGemma(query);
    });
  }

  function fallbackGemma(q) {
    const l = q.toLowerCase();
    let ans = "";
    if (l.includes("commit")) {
      ans = "📸 In Git, a 'commit' is a permanent snapshot of your project at this exact moment. Think of it like taking a photo and stamping it into your project's historical photo album. Command: git commit -m 'what changed'";
    } else if (l.includes("push") || l.includes("main")) {
      ans = "☁️ 'git push origin main' uploads your local commit photos up to GitHub cloud into the main branch. Once pushed, hackathon judges and mentors can see your code!";
    } else if (l.includes("add") || l.includes("stage")) {
      ans = "📦 'git add .' gathers all files you edited on your desk and places them into the shipping box (staging area) so they are ready to be sealed into your next commit.";
    } else if (l.includes("conflict")) {
      ans = "🤝 A merge conflict simply means you and a teammate edited the exact same line of code. Git pauses and politely asks you: 'Which version do you want to keep?'. Open the file, pick the right code, delete markers, and commit!";
    } else if (l.includes("fail") || l.includes("error") || l.includes("unrelated")) {
      ans = "🚨 If you got 'refusing to merge unrelated histories', it usually happens when you checked 'Add a README' on GitHub before pushing! Fix: run 'git pull origin main --allow-unrelated-histories' or make sure your GitHub repo was created empty.";
    } else if (l.includes("branch")) {
      ans = "🌿 A branch is like a parallel universe. You can experiment, build cool features, or test ideas without touching or breaking your working 'main' code.";
    } else {
      ans = `💡 Gemma 4 Advice for '${q}': Always follow the 3-step developer rhythm: 1) git add . (pack box) ➔ 2) git commit -m 'clear note' (seal snapshot) ➔ 3) git push origin main (ship to GitHub)!`;
    }
    respText.textContent = ans;
  }

  askBtn.addEventListener('click', askGemma);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') askGemma();
  });
}

