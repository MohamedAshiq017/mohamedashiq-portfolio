/* ======================================================================
   Your details. This is the only file you should need to edit day-to-day.
====================================================================== */
export const CONFIG = {
  githubUsername: 'MohamedAshiq017',
  name: 'Mohamed Ashiq S',
  role: 'Trainee Engineer',
  tagline: 'Backend-leaning full-stack developer building reliable systems from APIs to product features.',
  location: 'Trichy, Tamil Nadu',
  email: 'mohamedashiq120404@gmail.com',
  phone: '+91 9962154345',
  linkedin: 'https://linkedin.com/in/mohamedashiq17',
  instagram: 'https://instagram.com/mohamedashiqs',
  twitter: 'https://x.com/Md_Ashiq17',
  resumeUrl: '#',                 // <-- link to a hosted copy of your resume PDF

  bio: [
    "I'm Mohamed Ashiq, a backend-leaning full-stack developer based in Trichy, Tamil Nadu.",
    "I started by debugging APIs and tracing broken flows, and over time moved into designing systems that are easier to scale, maintain, and reason about.",
    "Currently a Trainee Engineer at Vaken Technologies, working across REST APIs, data integrity, and CI/CD. Outside of work, I build full-stack side projects end to end.",
  ],

  skills: {
    languages: ['JavaScript', 'Java', 'Python', 'SQL'],
    frontend: ['React.js', 'Vue.js', 'Bootstrap', 'Tailwind CSS', 'EJS'],
    backend: ['Node.js', 'Express.js', 'Spring Boot', 'REST APIs'],
    database: ['PostgreSQL', 'MongoDB', 'MySQL'],
    tools: ['Git', 'Jenkins', 'Maven', 'Postman', 'AWS CodeCommit', 'Claude'],
  },

  // Work experience, most recent first.
  experience: [
    {
      role: 'Trainee Engineer',
      company: 'Vaken Technologies',
      period: 'Aug 2025 — Present',
      points: [
        'Designed a high-performance REST API in Spring Boot to resolve latency issues, improving system responsiveness',
        'Diagnosed and fixed data integrity and persistence bugs caused by incorrect API logic and DB mappings',
        'Closed authorization and business-logic gaps that allowed unauthorized user actions, via validation and access control',
        'Parallelized template-fetch operations, cutting execution time by ~42%, and contributed to CI/CD pipelines with Git and Jenkins',
      ],
    },
  ],

  education: [
    {
      degree: 'B.E. in Computer Science and Engineering',
      school: 'University College of Engineering, Anna University, Tiruchirappalli',
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

  // Featured spotlight card shown above the project grid.
  featuredProject: {
    repoName: 'APS',
    repoUrl: 'https://github.com/MohamedAshiq017/APS',
    title: 'MediLink',
    tagline: 'end-to-end product build',
    description: 'Full-stack healthcare management platform with role-based scheduling, secure auth, and automated notifications — built end to end.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary'],
    points: [
      'REST APIs for user management, appointment scheduling, and role-based operations',
      'JWT authentication, bcrypt password hashing, and role-based access control',
      'Cloudinary for file storage and Nodemailer for automated email notifications',
      'Appointment scheduling with conflict validation and business-rule enforcement',
    ],
    date: 'May 2025',
  },

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
]

export const LANG_COLORS = {
  JavaScript: '#e8c547', TypeScript: '#5a9fd4', Python: '#6fa85c',
  Go: '#5fb3b3', Rust: '#e0665f', Java: '#d4a24a', 'C++': '#c574c5',
  C: '#9aa0ab', HTML: '#e8a33d', CSS: '#5a9fd4', Shell: '#7fbf7f',
  Ruby: '#e0665f', PHP: '#8a8fd4', Swift: '#e8a33d', Kotlin: '#c574c5',
  EJS: '#e8a33d',
}

export const langColor = (l) => LANG_COLORS[l] || '#5b6270'
