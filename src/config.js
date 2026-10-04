/* ======================================================================
   Your details. This is the only file you should need to edit day-to-day.
====================================================================== */
export const CONFIG = {
  githubUsername: 'MohamedAshiq017',
  name: 'Mohamed Ashiq S',
  role: 'Trainee Engineer',
  tagline: 'Backend-leaning Full-Stack Developer building scalable enterprise applications, APIs, and developer-focused tools.',
  location: 'Trichy, Tamil Nadu',
  email: 'mohamedashiq120404@gmail.com',
  phone: '+91 9962154345',
  linkedin: 'https://linkedin.com/in/mohamedashiq17',
  instagram: 'https://instagram.com/mohamedashiqs',
  twitter: 'https://x.com/Md_Ashiq17',
  resumeUrl: 'https://www.dropbox.com/scl/fi/61jgkix27b5kl63j635qj/Mohamed-Ashiq-S.pdf?rlkey=u70zltl07io1974euj09di6n3&st=y0yzj0ro&dl=0',                 // <-- link to a hosted copy of your resume PDF

  bio: [
    "I'm Mohamed Ashiq, a full-stack developer based in Trichy, Tamil Nadu, with a backend focus and a strong interest in reliable, maintainable software.",
    "At Vaken Technologies, I build features for an enterprise low-code platform using Vue.js and Spring Boot, spanning application configuration, workflows, reusable components, and data handling.",
    "Outside of work, I build full-stack products and automate development workflows with Claude Code, MCP, and Playwright."
  ],

  skills: {
    languages: ['JavaScript', 'Java', 'Python', 'SQL'],
    frontend: ['React.js', 'Vue.js', 'Bootstrap', 'Tailwind CSS', 'EJS'],
    backend: ['Node.js', 'Express.js', 'Spring Boot', 'REST APIs'],
    database: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'],
    tools: ['Git', 'Jenkins', 'Docker', 'Maven', 'Postman', 'AWS CodeCommit', 'AWS S3', 'AWS Lambda', 'AWS CodeArtifact', 'Claude Code', 'Playwright'],
  },

  // Work experience, most recent first.
  experience: [
    {
      role: 'Trainee Engineer',
      company: 'Vaken Technologies',
      period: 'Aug 2025 — Present',
      points: [
        'Built full-stack features for an enterprise low-code platform using Vue.js and Spring Boot, covering UI configuration, workflows, reusable components, data handling, and application generation.',
        'Reduced master-screen data-fetch time from 30 seconds to 18 seconds with parallel processing and synchronized collections.',
        'Resolved PostgreSQL persistence, cross-product configuration, and Redis caching issues across development, staging, and production.',
        'Created runtime testing tools and live variable inspection for custom modules, and fixed production issues in code generation and stale configuration.',
        'Automated localization of 1,000+ text entries with Claude Code and MCP tooling, using duplicate checks and Playwright-assisted workflows.',
        'Owned work through requirements, implementation, testing, code review, CI/CD deployment, cross-environment verification, and release updates.'
      ],
    },
  ],

  education: [
    {
      degree: 'B.E. in Computer Science and Engineering',
      school: 'University College of Engineering, Anna University, Tiruchirappalli, BIT Campus',
      period: 'Nov 2021 — June 2025',
      detail: 'CGPA: 7.98 / 10',
    },
  ],

  // Recognition — real wins, kept short and specific. Links pulled straight
  // from the hyperlinks embedded in the resume PDF, not guessed.
  achievements: [
    {
      title: 'Winner & Team Lead — Smart India Hackathon 2023 Grand Finale',
      detail: 'Built a Lean-based reasoning module for analyzing computational complexity in GPT-generated solutions, using Lean, LeanDojo, Mathlib, and LaTeX. (PS ID: SIH1420)',
      date: 'Dec 2023',
      badge: '🏆',
      link: 'https://drive.google.com/file/d/1NG6qzrHUL2o-sGwuihCFRMdk1iFOPGSE/view',
      linkLabel: 'view certificate',
      officialLink: 'https://www.sih.gov.in/sih2023-grand-finale-result#:~:text=126-,Ministry%20of%20Defence,100000,-127',
      officialLabel: 'verify on SIH portal',
    },
    {
      title: 'Top 1% — NPTEL, Introduction to Cloud Computing',
      detail: 'Ranked in the top 1% overall in the certification examination.',
      date: 'Apr 2024',
      badge: '📜',
      link: 'https://drive.google.com/file/d/1RGuXzbOvpjDYCUp3Sfye-ppnDCK7D8uk/view?usp=sharing',
      linkLabel: 'view certificate',
    },
  ],

  // Featured builds rotate above the project grid, following the resume order.
  featuredProjects: [
    {
      repoName: 'billboards',
      liveUrl: 'https://billboards-coral.vercel.app',
      showSource: false,
      title: 'Billboards',
      tagline: 'digital billboard advertising platform',
      description: 'Full-stack platform for businesses to manage advertisements, subscriptions, and digital displays, with a dedicated admin portal.',
      stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'JWT', 'Cloudinary', 'Socket.IO', 'Razorpay'],
      points: [
        'Managed business accounts, ad creative, subscriptions, and digital display assignments',
        'Secured accounts with JWT, Google OAuth, and email OTP verification',
        'Integrated Mailjet for verification, password-reset, and advertisement emails',
        'Added Razorpay Test Mode payments with server-side HMAC verification',
        'Stored advertisement media and profile images with Cloudinary',
        'Synchronized advertisements, notifications, subscriptions, and displays in real time with Socket.IO',
      ],
      date: 'Aug 2025',
    },
    {
      repoName: 'APS',
      repoUrl: 'https://github.com/MohamedAshiq017/APS',
      liveUrl: 'https://aps-frontend.vercel.app',
      title: 'MediLink',
      tagline: 'role-based healthcare appointment system',
      description: 'Full-stack healthcare management platform for role-based user operations and appointment scheduling.',
      stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Cloudinary', 'JWT'],
      points: [
        'Designed REST APIs for user management, appointment scheduling, and role-based operations',
        'Secured application resources with JWT, bcrypt password hashing, and role-based access control',
        'Integrated Cloudinary for file storage and Nodemailer for automated email notifications',
        'Built appointment workflows with conflict validation and business-rule enforcement',
      ],
      date: 'May 2025',
    },
    {
      repoName: 'geoGuess',
      repoUrl: 'https://github.com/MohamedAshiq017/geoGuess',
      title: 'GeoGuess',
      tagline: 'geography-based guessing game',
      description: 'Interactive geography game with dynamic map rendering, answer validation, and data-driven map generation.',
      stack: ['Python', 'Pandas'],
      points: [
        'Provided real-time visual feedback through dynamic map rendering',
        'Tracked player progress with state management and answer validation',
        'Generated playable maps from structured datasets with a Pandas utility',
        'Kept game logic and data processing reusable as new content is added',
      ],
      date: 'Oct 2024',
    },
  ],

  // Default display order for your repos, by exact GitHub repo name.
  // Anything not listed here falls back to sorted-by-stars, appended after.
  pinnedRepos: ['APS', 'geoGuess', 'drumkit', 'simon-game', 'hangman', 'toDoList', 'birthday-wisher'],
}

export const TABS = [
  { id: 'home', label: 'home.tsx' },
  { id: 'experience', label: 'experience.tsx' },
  { id: 'projects', label: 'projects.tsx' },
  { id: 'skills', label: 'skills.tsx' },
  { id: 'education', label: 'education.tsx' },
  { id: 'about', label: 'about.tsx' },
  { id: 'contact', label: 'contact.tsx' },
]

export const LANG_COLORS = {
  JavaScript: '#e8c547', TypeScript: '#5a9fd4', Python: '#6fa85c',
  Go: '#5fb3b3', Rust: '#e0665f', Java: '#d4a24a', 'C++': '#c574c5',
  C: '#9aa0ab', HTML: '#e8a33d', CSS: '#5a9fd4', Shell: '#7fbf7f',
  Ruby: '#e0665f', PHP: '#8a8fd4', Swift: '#e8a33d', Kotlin: '#c574c5',
  EJS: '#e8a33d',
}

export const langColor = (l) => LANG_COLORS[l] || '#5b6270'
