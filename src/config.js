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
    "I'm Mohamed Ashiq, a backend-leaning full-stack developer based in Trichy, Tamil Nadu.",
    "I enjoy building scalable software, solving backend challenges, and designing systems that are reliable, maintainable, and easy to extend.",
    "Currently, I'm a Trainee Engineer at Vaken Technologies, where I develop features for an enterprise low-code platform, working on application configuration, reusable component frameworks, workflow automation, performance optimization, and enterprise software development.",
    "Outside of work, I build full-stack projects, explore modern technologies, and continuously sharpen my software engineering skills."
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
        'Developed core features for an enterprise low-code platform, enabling dynamic application configuration, workflow automation, and reusable component development.',
        'Built reusable validation, configuration, and business rule frameworks to improve application integrity and configurable business workflows.',
        'Enhanced UI rendering, state synchronization, and configuration persistence for reusable application components across enterprise applications.',
        'Extended the reusable component framework with runtime configuration, template management, and testing capabilities.',
        'Optimized application generation by 26% through parallel processing while delivering 50+ feature enhancements across three major product releases.'
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
