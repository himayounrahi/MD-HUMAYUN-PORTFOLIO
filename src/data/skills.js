// ===========================================================================
//  SKILLS — grouped by category. No proficiency numbers by design: a
//  percentage claims a precision that does not exist and recruiters discount it.
//
//  TO ADD A SKILL: add a string to the relevant `items` array.
//  TO ADD A CATEGORY: add an object. `note` is optional context, shown small.
// ===========================================================================

export const skills = [
  {
    category: 'Languages',
    items: ['C++', 'Python', 'MySQL', 'Bash'],
    note: 'C++ primary for DSA and systems work; Python for everything ML.',
  },
  {
    category: 'Computer science core',
    items: [
      'Data Structures & Algorithms',
      'System Design',
      'OOP & Design Patterns',
      'Operating Systems',
      'DBMS',
      'Computer Networks',
      'Cryptography',
    ],
  },
  {
    category: 'Machine learning',
    items: [
      'TensorFlow',
      'Keras',
      'scikit-learn',
      'XGBoost',
      'SHAP',
      'CNN',
      'LSTM',
      'VAE',
      'Reinforcement Learning',
      'LoRA fine-tuning',
      'OpenCV',
      'MediaPipe',
    ],
  },
  {
    category: 'LLM & retrieval',
    items: ['LangChain', 'Pinecone', 'Ollama', 'RAG pipelines', 'Transformers', 'Gymnasium'],
  },
  {
    category: 'Networking & security',
    items: ['SDN', 'Mininet', 'POX controller', 'OpenFlow', 'Scapy', 'Wireshark', 'TCP/IP'],
  },
  {
    category: 'Infrastructure',
    items: ['Docker', 'AWS (EC2, S3)', 'GitHub Actions', 'Linux', 'Git', 'Flask REST APIs', 'pytest'],
  },
]
