export type PodcastEpisode = {
  id: string; title: string; showName: string | null; channelName: string; channelUrl: string; description: string;
  guests: string[] | null; role: 'host' | 'guest' | null;
  publishedAt: string | null; episodeNumber: number | null; duration: number | null;
  thumbnail: string; topics: string[]; sourceUrl: string | null;
  videoId: string | null; audioUrl: string | null;
  platformLinks: Partial<Record<PlatformId, string>>; status: 'published' | 'demo';
};
export type PlatformId = 'spotify' | 'applepodcasts' | 'youtube' | 'deezer' | 'amazonmusic';
export const podcastTopics = ['Entrepreneuriat', 'Intelligence artificielle', 'Marketing', 'Société', 'Parcours & inspiration'];

// Official YouTube titles, channels, publication dates, durations and thumbnails fetched 2026-09-27.
// Descriptions below are editorial summaries of the source titles/descriptions, not transcripts.
// The publication date is the YouTube upload date, not necessarily the recording date.
export const podcastEpisodes: PodcastEpisode[] = [
  {
    "id": "Q6cC7A2ST7M",
    "title": "وكالة التسويق الرقمي كيف تدار الحملات وتُصنع الاستراتيجيات Salah eddine MIMOUNI",
    "showName": "WORX Community",
    "channelName": "WORX Community",
    "channelUrl": "https://www.youtube.com/@worxcommunity",
    "description": "Dans les coulisses d’une agence de marketing digital : concevoir les campagnes, gérer les réseaux sociaux et transformer une stratégie en résultats.",
    "guests": null,
    "role": null,
    "publishedAt": "2025-10-25",
    "episodeNumber": null,
    "duration": 6608,
    "thumbnail": "/assets/podcasts/Q6cC7A2ST7M.jpg",
    "topics": [
      "Marketing",
      "Entrepreneuriat"
    ],
    "sourceUrl": "https://www.youtube.com/watch?v=Q6cC7A2ST7M",
    "videoId": "Q6cC7A2ST7M",
    "audioUrl": null,
    "platformLinks": {
      "youtube": "https://www.youtube.com/watch?v=Q6cC7A2ST7M"
    },
    "status": "published"
  },
  {
    "id": "ilmbyrflEQQ",
    "title": "BUSINESS+ Talk #47 | استثمار ضخم لأول ستارتاب مغربية خاصة بالذكاء الإصطناعي",
    "showName": "BUSINESS+ Talk",
    "channelName": "Abderrazak Yousfi",
    "channelUrl": "https://www.youtube.com/@AbderrazakYousfi",
    "description": "Un échange sur le parcours entrepreneurial de Salah Eddine Mimouni, Richmedia et Hypeo AI, entre marketing digital, investissements et intelligence artificielle.",
    "guests": null,
    "role": "guest",
    "publishedAt": "2025-08-15",
    "episodeNumber": 47,
    "duration": 3466,
    "thumbnail": "/assets/podcasts/ilmbyrflEQQ.jpg",
    "topics": [
      "Entrepreneuriat",
      "Intelligence artificielle",
      "Parcours & inspiration"
    ],
    "sourceUrl": "https://www.youtube.com/watch?v=ilmbyrflEQQ",
    "videoId": "ilmbyrflEQQ",
    "audioUrl": null,
    "platformLinks": {
      "youtube": "https://www.youtube.com/watch?v=ilmbyrflEQQ"
    },
    "status": "published"
  },
  {
    "id": "NADMauj7z68",
    "title": "Maroc Tech, entre innovation opportunités et challenges",
    "showName": "Maghrebnow",
    "channelName": "Maghrebnow",
    "channelUrl": "https://www.youtube.com/@Maghrebnow_Dabamaroc",
    "description": "Avec Salma Bensaïd, un regard sur l’écosystème tech marocain : startups, souveraineté numérique, financement et transformation des territoires.",
    "guests": null,
    "role": "guest",
    "publishedAt": "2026-03-26",
    "episodeNumber": null,
    "duration": 2929,
    "thumbnail": "/assets/podcasts/NADMauj7z68.jpg",
    "topics": [
      "Entrepreneuriat",
      "Intelligence artificielle",
      "Innovation"
    ],
    "sourceUrl": "https://www.youtube.com/watch?v=NADMauj7z68",
    "videoId": "NADMauj7z68",
    "audioUrl": null,
    "platformLinks": {
      "youtube": "https://www.youtube.com/watch?v=NADMauj7z68"
    },
    "status": "published"
  },
  {
    "id": "WRUzlvH0lug",
    "title": "Maghrebnow interpelle les 4T et le #tech4innov à travers un spécial au Gitex",
    "showName": "Maghrebnow",
    "channelName": "Maghrebnow",
    "channelUrl": "https://www.youtube.com/@Maghrebnow_Dabamaroc",
    "description": "Une édition spéciale au Gitex autour de Tech4Innov et des 4T : innovation à impact, territoires et intelligence collective au Maroc et en Afrique.",
    "guests": null,
    "role": null,
    "publishedAt": "2026-05-19",
    "episodeNumber": null,
    "duration": 1597,
    "thumbnail": "/assets/podcasts/WRUzlvH0lug.jpg",
    "topics": [
      "Entrepreneuriat",
      "Société",
      "Innovation"
    ],
    "sourceUrl": "https://www.youtube.com/watch?v=WRUzlvH0lug",
    "videoId": "WRUzlvH0lug",
    "audioUrl": null,
    "platformLinks": {
      "youtube": "https://www.youtube.com/watch?v=WRUzlvH0lug"
    },
    "status": "published"
  },
  {
    "id": "3CgqiI0YMUA",
    "title": "مع صلاح الدين الميموني : المقاولة بالمغرب | التسويق الرقمي | تأثير الذكاء الإصطناعي على الشركات",
    "showName": "TOUIL TALKS",
    "channelName": "TOUIL TALKS",
    "channelUrl": "https://www.youtube.com/@TouilTalks",
    "description": "Entreprendre au Maroc, développer son activité grâce au marketing digital et comprendre l’impact de l’intelligence artificielle sur les entreprises.",
    "guests": null,
    "role": "guest",
    "publishedAt": "2023-05-19",
    "episodeNumber": null,
    "duration": 2470,
    "thumbnail": "/assets/podcasts/3CgqiI0YMUA.jpg",
    "topics": [
      "Entrepreneuriat",
      "Marketing",
      "Intelligence artificielle"
    ],
    "sourceUrl": "https://www.youtube.com/watch?v=3CgqiI0YMUA",
    "videoId": "3CgqiI0YMUA",
    "audioUrl": null,
    "platformLinks": {
      "youtube": "https://www.youtube.com/watch?v=3CgqiI0YMUA"
    },
    "status": "published"
  },
  {
    "id": "ofJESCT5HDc",
    "title": "Le futur du marketing d’influence avec l’IA | Salah-Eddine Mimouni | TEDxENSAM Rabat",
    "showName": "TEDxENSAM Rabat",
    "channelName": "ENSAM RABAT OFFICIEL",
    "channelUrl": "https://www.youtube.com/@ENSAMRABAT",
    "description": "Une intervention de Salah Eddine Mimouni consacrée au futur du marketing d’influence à l’ère de l’intelligence artificielle.",
    "guests": null,
    "role": null,
    "publishedAt": "2026-04-15",
    "episodeNumber": null,
    "duration": 2159,
    "thumbnail": "/assets/podcasts/ofJESCT5HDc.jpg",
    "topics": [
      "Marketing",
      "Intelligence artificielle",
      "Influence"
    ],
    "sourceUrl": "https://www.youtube.com/watch?v=ofJESCT5HDc",
    "videoId": "ofJESCT5HDc",
    "audioUrl": null,
    "platformLinks": {
      "youtube": "https://www.youtube.com/watch?v=ofJESCT5HDc"
    },
    "status": "published"
  },
  {
    "id": "ETay40EqtfY",
    "title": "La digitalisation des PME avec Salah-eddine Mimouni dans Cravate Club Maroc avec Thomas Brun",
    "showName": "Cravate Club Maroc",
    "channelName": "Thomas Brun",
    "channelUrl": "https://www.youtube.com/@ThomasBrun",
    "description": "Avec Thomas Brun, des pistes concrètes pour digitaliser une PME avec peu de moyens : stratégie web, publicité et nouveaux modèles de développement.",
    "guests": null,
    "role": "guest",
    "publishedAt": "2019-10-15",
    "episodeNumber": null,
    "duration": 457,
    "thumbnail": "/assets/podcasts/ETay40EqtfY.jpg",
    "topics": [
      "Entrepreneuriat",
      "Marketing",
      "Digital"
    ],
    "sourceUrl": "https://www.youtube.com/watch?v=ETay40EqtfY",
    "videoId": "ETay40EqtfY",
    "audioUrl": null,
    "platformLinks": {
      "youtube": "https://www.youtube.com/watch?v=ETay40EqtfY"
    },
    "status": "published"
  }
];

export const podcastChannels = [...new Map(podcastEpisodes.map(episode => [episode.channelUrl, { name: episode.channelName, url: episode.channelUrl }])).values()];
export const podcastPlatforms: { id: PlatformId; name: string; url: string | null; verified: boolean }[] = [
  { id: 'youtube', name: 'YouTube', url: 'https://www.youtube.com/watch?v=WRUzlvH0lug', verified: true },
];
const totalMinutes = Math.floor(podcastEpisodes.reduce((total, episode) => total + (episode.duration || 0), 0) / 60);
export const podcastStats: { value: string | null; previewValue: string; label: string; verified: boolean }[] = [
  { value: String(podcastEpisodes.length), previewValue: '', label: 'vidéos à découvrir', verified: true },
  { value: String(podcastChannels.length), previewValue: '', label: 'chaînes', verified: true },
  { value: Math.floor(totalMinutes / 60) + ' h ' + String(totalMinutes % 60).padStart(2, '0'), previewValue: '', label: 'de conversations', verified: true },
];
export const podcastEditorial = { text: 'Les meilleures idées naissent toujours d’une conversation sincère.', author: 'Salah-Eddine Mimouni', verified: false };
export const podcastHero = { image: '/assets/photos/studio.jpg', alt: 'Salah-Eddine Mimouni en studio, devant un microphone', inscription: 'Partager pour aller plus loin.', inscriptionVerified: false, signature: '/assets/hero-wide-signature.webp' };
