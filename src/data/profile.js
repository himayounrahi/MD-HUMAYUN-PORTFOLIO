// ===========================================================================
//  PROFILE — who you are. Edit the strings, nothing else needs to change.
// ===========================================================================

export const profile = {
  name: 'MD Humayun',

  // Shown under your name in the hero. Keep it to a role, not a slogan.
  title: 'ML Engineer & Software Development Engineer',

  // One sentence. This is the single most-read line on the site.
  pitch:
    'I build machine learning systems that survive contact with real infrastructure — from a multi-agent drone swarm simulator to an SDN intrusion detector measured under live attack traffic.',

  // Two or three short paragraphs for the About section.
  bio: [
    "I'm an M.Tech student in Computer Science at SVNIT Surat, specialising in Information Security and Privacy, with a GATE CS percentile of 93.8. My work sits where machine learning meets systems engineering: models are the easy half, and the interesting problems live in the pipeline around them.",
    'Most recently I was a research intern on a MeitY-sponsored project on autonomous drone swarm navigation, where I built BattleWorld — a multi-agent simulator wrapped as a Gymnasium environment — and benchmarked seven commander architectures against it. The resulting paper is under review at IEEE GSCON 2027.',
    'Before that I built an SDN intrusion detector that I could actually measure under load, reproduced the original Variational Autoencoder paper and diagnosed why it collapsed on face data, and shipped a retrieval-augmented medical assistant running entirely on local inference.',
  ],

  // Photo: 800x800 WebP recommended, with a JPG fallback of the same name.
  // See CONTENT_GUIDE.md -> "Swapping the photo" for the exact export steps.
  photo: {
    src: 'humayun.webp',
    fallback: 'humayun.jpg',
    alt: 'MD Humayun, photographed against a plain background',
  },

  location: 'Surat, Gujarat, India',

  // The strip under the bio. Keep to four -- more and none of them register.
  quickFacts: [
    { label: 'Studying', value: 'M.Tech CS, SVNIT Surat' },
    { label: 'Specialisation', value: 'Information Security & Privacy' },
    { label: 'GATE CS 2025', value: '93.8 percentile' },
    { label: 'Based in', value: 'Surat, India' },
  ],

  // One line, not a section. Teaching is evidence of communication skill,
  // which matters for both ML and SDE interviews -- but it is not the pitch.
  community: {
    text: 'Outside of coursework I run NITIAN RAHI, an engineering education channel with a community of around 52,000 across YouTube, Facebook and Instagram, where I explain ML and systems topics to students.',
    links: [
      { label: 'YouTube', href: 'https://youtube.com/@nitianrahi' },
      { label: 'Instagram', href: 'https://www.instagram.com/learnwithnitianrahi07' },
    ],
  },

  contact: {
    email: 'md.humayun7777777@gmail.com',
    phone: '+91 72949 63049',
    github: 'https://github.com/mdhumayun7',
    linkedin: 'https://www.linkedin.com/in/md-humayun-82051521a/',
    leetcode: 'https://leetcode.com/u/mdhumayun7/',
    // Put your PDF at public/resume.pdf and this link works as-is.
    resume: 'resume.pdf',
  },

  // Shown in the contact section. Change or remove freely.
  availability: 'Open to ML engineering and SDE roles, and to research collaboration.',
}
