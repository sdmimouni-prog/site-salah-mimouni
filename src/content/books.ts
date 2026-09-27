export type Book = {
  slug: string; title: string; alias?: string; subtitle: string; category: string;
  image: string; jacket?: boolean; theme: string; price: number; description: string;
  introduction: string; themes: { title: string; text: string }[];
  excerpt?: { text: string; source: string }; excerptPdf?: string;
  editorialPreviews?: { title: string; paragraphs: string[] }[];
};
export const books: Book[] = [
  {
    slug: 'entre-deux-vols', title: 'Entre deux vols', alias: 'L’ancien pauvre',
    subtitle: 'Récits d’un esprit en transit', category: 'Autobiographie',
    image: '/assets/books/entre-deux-vols.jpg', theme: 'journey', price: 145,
    description: 'L’ancien pauvre — une autobiographie, sous le titre Entre deux vols.',
    introduction: 'Entre deux vols, un temps pour regarder le chemin parcouru. Avec « Récits d’un esprit en transit », Salah Eddine Mimouni présente son autobiographie : une invitation à découvrir l’homme derrière les projets.',
    excerpt: { text: 'Écrire, c’est aussi une forme de libération. On porte tous en nous des souvenirs, certains lumineux, d’autres plus sombres. Les bons souvenirs, on les chérit. Les mauvais, on essaie souvent de les enterrer, mais ils continuent de peser sur nous. En les posant sur le papier, j’ai essayé de m’en libérer, de leur donner un sens, de les transformer en matière à réflexion plutôt qu’en poids invisible.', source: 'L’ancien pauvre — Quand Tout Ne Suffit Pas, introduction, page 15 du manuscrit fourni.' },
    themes: [
      { title: 'Un regard personnel', text: 'Retrouver Salah Eddine Mimouni dans un registre autobiographique.' },
      { title: 'L’esprit en transit', text: 'Le voyage comme point de départ d’une lecture tournée vers le parcours humain.' },
      { title: 'L’ancien pauvre', text: 'L’ouvrage présenté sous ce nom porte sur sa couverture le titre « Entre deux vols ».' },
    ],
  },
  {
    slug: 'quand-les-marques-pensent', title: 'Quand les marques pensent',
    subtitle: 'La révolution de l’IA qui bouleverse le marketing et l’influence', category: 'Marketing & intelligence artificielle',
    image: '/assets/books/quand-les-marques-pensent.jpg', jacket: true, theme: 'brands', price: 145,
    description: 'Une nouvelle façon de penser le marketing à l’ère de l’intelligence artificielle.',
    introduction: 'Le marketing a changé de monde. Quand les marques pensent propose une nouvelle façon de penser pour garder une longueur d’avance, à la rencontre de l’intelligence artificielle, du marketing et de l’influence.',
    themes: [
      { title: 'Penser à l’ère de l’IA', text: 'Interroger la place de la pensée lorsque la production de contenu s’automatise.' },
      { title: 'Le marketing change', text: 'Prendre du recul sur la révolution de l’intelligence artificielle et ses enjeux pour les marques.' },
      { title: 'L’influence en question', text: 'Explorer la rencontre entre marketing, technologie et influence.' },
    ],
    excerpt: { text: 'Dans un monde où l’IA produit tout, la seule rareté est la pensée.', source: 'Citation de la quatrième de couverture fournie par l’auteur.' },
  },
  {
    slug: 'pour-un-like-de-plus', title: 'Pour un like de plus…',
    subtitle: 'Le prix caché de la popularité et de l’influence', category: 'Société & influence',
    image: '/assets/books/pour-un-like-de-plus.png', theme: 'influence', price: 145,
    description: 'Quand la course à la visibilité transforme nos désirs, nos relations et nos repères collectifs.',
    introduction: 'Que devient une société quand la visibilité tient lieu de valeur ? Pour un like de plus… s’intéresse au versant négatif de l’influence : la comparaison permanente, la mise en scène de la réussite, les désirs fabriqués et la transformation de l’intimité en spectacle. Une invitation à questionner ce que nous acceptons, achetons ou devenons pour être regardés.',
    themes: [
      { title: 'Se comparer sans fin', text: 'Quand des vies mises en scène deviennent la mesure de notre propre réussite.' },
      { title: 'Désirer sur commande', text: 'Quand l’appartenance se vend et que la consommation promet une reconnaissance toujours provisoire.' },
      { title: 'Faire société ou spectacle ?', text: 'Quand le buzz récompense l’humiliation, brouille les repères et fragilise le respect de l’autre.' },
    ],
    editorialPreviews: [
      {
        title: 'La vie des autres, le doute en soi',
        paragraphs: [
          'Le fil défile. Une promotion, une villa, un corps sans défaut, un voyage de plus. Rien ne dit ce qui a été coupé au montage : l’attente, les dettes, les journées ordinaires. Pourtant, nous comparons cette sélection à notre vie entière. Nous opposons leurs instants choisis à nos matins difficiles.',
          'Le piège se referme quand l’image cesse d’être un divertissement pour devenir une exigence. Il faudrait réussir plus vite, paraître plus heureux, posséder davantage. Une journée tranquille ressemble alors à une journée perdue. Et l’on finit par demander à des inconnus la permission d’être satisfait de sa propre existence.',
        ],
      },
      {
        title: 'Acheter sa place dans le regard des autres',
        paragraphs: [
          'Un produit apparaît sur l’écran, porté par quelqu’un dont nous suivons les habitudes, les confidences et les voyages. L’offre arrive dans une conversation qui semble familière. On ne nous promet plus seulement un objet : on nous propose une place dans un monde désirable.',
          'Le danger commence lorsque l’achat devient une preuve de valeur personnelle. Le téléphone fonctionne encore, mais il ne raconte plus la bonne histoire. Le vêtement nous va, mais il ne dit plus que nous appartenons au groupe. À force de renouveler les objets pour rester visibles, nous pouvons perdre de vue la question la plus simple : en avions-nous réellement envie ?',
        ],
      },
      {
        title: 'Quand l’humiliation devient un contenu',
        paragraphs: [
          'Une personne trébuche, se trompe ou craque. Quelqu’un filme. En quelques secondes, un moment de vulnérabilité devient une séquence à commenter. Derrière l’écran, il est facile d’oublier qu’une vie continue après la vidéo, loin du rire et du compteur de vues.',
          'Chaque partage nous place devant un choix : prolonger le spectacle ou refuser d’en faire une récompense. Une société ne se construit pas seulement avec ce qu’elle condamne dans ses discours. Elle se construit aussi avec ce qu’elle encourage par son attention. Lorsque l’humiliation devient rentable, préserver la dignité de l’autre demande parfois un geste minuscule : ne pas cliquer.',
        ],
      },
    ],
  },
];
export const getBook = (slug: string) => books.find(book => book.slug === slug);
