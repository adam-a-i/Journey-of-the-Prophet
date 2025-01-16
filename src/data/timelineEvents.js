export const timelineCategories = {
  ORIGINS: "Origins & Geography",
  PRE_ISLAMIC: "Pre-Islamic Era",
  EARLY_LIFE: "Early Life",
  PROPHETHOOD: "Prophethood",
  MIGRATION: "Migration",
  MEDINA: "Life in Medina",
  BATTLES: "Battles",
  LEGACY: "Legacy & Impact",
  ORIENTALISM: "Orientalist Studies",
};

export const timelineEvents = [
  {
    id: "origins-1",
    title: "Arabic Origins & Geography",
    category: timelineCategories.ORIGINS,
    year: "Pre-Islamic",
    description:
      "The geographical and cultural context of the Arabian Peninsula.",
    icon: "🏜️",
    details: {
      quotes: [
        "The Arabian Peninsula was a land of diverse tribes and traditions.",
      ],
      content:
        "The Arabian Peninsula, a vast expanse of desert and oases, was home to numerous tribes with rich cultural traditions.",
      references: [
        "Historical accounts of pre-Islamic Arabia",
        "Archaeological findings from the region",
      ],
    },
  },
  {
    id: "pre-islamic-1",
    title: "Pre-Islamic Religions",
    category: timelineCategories.PRE_ISLAMIC,
    year: "Before 570 CE",
    description: "Religious practices in Arabia before Islam.",
    icon: "🕌",
    details: {
      quotes: ["The Kaaba housed numerous idols of pre-Islamic Arabia."],
      content:
        "Before Islam, Arabia was home to various religious practices, including polytheism and monotheistic traditions.",
      references: ["Historical records of pre-Islamic religious practices"],
    },
  },
  {
    id: "early-life-1",
    title: {
      en: "Birth of Prophet Muhammad ﷺ",
      ar: "ولادة النبي محمد ﷺ"
    },
    description: {
      en: "The blessed birth in Mecca.",
      ar: "الولادة المباركة في مكة."
    },
    category: timelineCategories.EARLY_LIFE,
    year: "570 CE",
    icon: "👶",
    details: {
      summary: "Short summary here...",
      fullSummary: "Full detailed summary here...",
      videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
      powerPointUrl: "/path/to/presentation.pptx",
      quotes: ["Born in the Year of the Elephant"],
      content:
        "Prophet Muhammad ﷺ was born in Mecca in the Year of the Elephant, named after a significant historical event.",
      references: ["Authentic biographical accounts", "Historical records"],
      quiz: [
        {
          question: "In which year was Prophet Muhammad ﷺ born?",
          options: ["569 CE", "570 CE", "571 CE", "572 CE"],
          correct: 1
        }
        // Add more quiz questions...
      ]
    },
  },
  {
    id: "prophethood-1",
    title: "First Revelation",
    category: timelineCategories.PROPHETHOOD,
    year: "610 CE",
    description: "The first divine revelation in Cave Hira.",
    icon: "📖",
    details: {
      quotes: ["Read! In the name of your Lord who created"],
      content:
        "The first revelation came to Prophet Muhammad ﷺ in Cave Hira through Angel Jibreel.",
      references: ["Sahih Al-Bukhari", "Authentic historical accounts"],
    },
  },
  {
    id: "migration-1",
    title: "Hijra to Medina",
    category: timelineCategories.MIGRATION,
    year: "622 CE",
    description: "The migration from Mecca to Medina.",
    icon: "🐪",
    details: {
      quotes: ["Every Prophet has a migration, and my migration is to Medina"],
      content:
        "The Prophet's migration to Medina marked a turning point in Islamic history.",
      references: [
        "Historical accounts of the Hijra",
        "Islamic historical records",
      ],
    },
  },
  {
    id: "medina-1",
    title: "Constitution of Medina",
    category: timelineCategories.MEDINA,
    year: "622 CE",
    description: "Establishment of the first Islamic state.",
    icon: "📜",
    details: {
      quotes: ["The first written constitution in human history"],
      content:
        "The Constitution of Medina established rights and responsibilities for all citizens.",
      references: ["Original text of the Constitution", "Historical analyses"],
    },
  },
  {
    id: "battles-1",
    title: "Battle of Badr",
    category: timelineCategories.BATTLES,
    year: "624 CE",
    description: "The first major battle of Islam.",
    icon: "⚔️",
    details: {
      quotes: ["Victory comes with patience"],
      content:
        "The Battle of Badr was a decisive victory for the Muslims despite being outnumbered.",
      references: ["Military historical accounts", "Quranic references"],
    },
  },
  {
    id: "legacy-1",
    title: "Farewell Pilgrimage",
    category: timelineCategories.LEGACY,
    year: "632 CE",
    description: "The Prophet's final pilgrimage and sermon.",
    icon: "🕋",
    details: {
      quotes: ["I leave behind me two things: the Quran and my Sunnah"],
      content:
        "The Farewell Pilgrimage contained the Prophet's final major public address.",
      references: ["Hadith collections", "Historical accounts"],
    },
  },
];
