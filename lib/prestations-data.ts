export interface Prestation {
  id: string
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  benefits: string[]
  whatToExpect: string
  durationAndFormat: string
  category: string
}

export const prestationsData: Prestation[] = [
  {
    id: "1",
    slug: "accompagnement-grossesse",
    title: "Accompagnement durant la grossesse",
    shortDescription: "Préparez sereinement votre accouchement avec l'hypnose et la sophrologie.",
    fullDescription: `La grossesse est une période de transformation profonde. L'accompagnement par hypnose et sophrologie vous permet de vivre cette expérience avec sérénité et confiance.

Grâce à ces techniques, vous apprenez à gérer les émotions liées à la maternité, à préparer mentalement votre accouchement et à renforcer le lien avec votre bébé. Les séances sont adaptées à chaque trimestre de votre grossesse.`,
    benefits: [
      "Réduction de l'anxiété et du stress liés à la grossesse",
      "Préparation mentale à l'accouchement",
      "Meilleure connexion avec votre bébé",
      "Gestion de la douleur pendant le travail",
      "Confiance accrue pour le jour J",
    ],
    whatToExpect: `Chaque séance débute par un moment d'échange pour comprendre vos préoccupations. Ensuite, vous bénéficiez de techniques de relaxation, de visualisation positive et d'suggestions hypnotiques adaptées à votre stade de grossesse. Des outils d'autohypnose vous sont transmis pour pratiquer à la maison.`,
    durationAndFormat: "Séances individuelles de 1h - Aussi disponible en ateliers collectifs prénataux",
    category: "Accompagnement personnel",
  },
  {
    id: "2",
    slug: "addictions",
    title: "Addictions",
    shortDescription: "Libérez-vous des dépendances avec des méthodes éprouvées et bienveillantes.",
    fullDescription: `Les addictions (alcool, drogue, jeux vidéo, internet) prennent naissance dans l'inconscient. L'hypnothérapie accède à ce niveau profond pour identifier les causes réelles de votre dépendance et créer un changement durable.

Plutôt que de combattre votre dépendance de manière consciente, nous travaillons à reprogrammer les patterns inconscients qui l'entretiennent.`,
    benefits: [
      "Comprendre les causes réelles de l'addiction",
      "Reprogrammer les comportements automatiques",
      "Développer des stratégies de gestion alternatives",
      "Retrouver votre pouvoir personnel",
      "Construire une relation saine avec la substance ou le comportement",
    ],
    whatToExpect: `Les premières séances consistent à explorer vos antécédents et les déclencheurs de votre addiction. Nous utilisons ensuite l'hypnose Ericksonienne et le coaching pour créer de nouveaux patterns mentaux. Le processus est progressif et respectueux.`,
    durationAndFormat: "Séances individuelles de 1h - Durée moyenne: 4 à 8 séances selon votre situation",
    category: "Bien-être émotionnel",
  },
  {
    id: "3",
    slug: "arret-tabac",
    title: "Arrêt du tabac",
    shortDescription: "Stoppez la cigarette durablement avec l'hypnose Ericksonienne.",
    fullDescription: `L'arrêt du tabac par hypnose fonctionne car la dépendance au tabac n'est que 10% physique et 90% psychologique. L'hypnose Ericksonienne accède à votre inconscient où réside le véritable attachement à la cigarette.

Les statistiques montrent un taux de succès de 60-70% avec l'hypnose, bien supérieur aux autres méthodes.`,
    benefits: [
      "Élimination des envies de cigarette",
      "Rupture durable du cycle du tabagisme",
      "Éviter la prise de poids post-arrêt",
      "Amélioration immédiate de la santé respiratoire",
      "Gain d'estime de soi et de liberté",
    ],
    whatToExpect: `Une séance d'hypnose pour l'arrêt du tabac dure environ 1h. Vous repartirez avec des outils d'autohypnose et un enregistrement audio pour renforcer les suggestions. Le taux de succès augmente avec une ou deux séances de renforcement.`,
    durationAndFormat:
      "Séances individuelles de 1h - Tarif spécial: 90€ - Suivi recommandé: 1-2 séances de renforcement",
    category: "Bien-être physique",
  },
  {
    id: "4",
    slug: "ateliers-hypnose",
    title: "Ateliers d'hypnose",
    shortDescription: "Participez à des ateliers collectifs d'hypnose et sophrologie pour particuliers et entreprises.",
    fullDescription: `Les ateliers d'hypnose offrent une expérience collective enrichissante. Que vous soyez particulier ou entreprise, ces sessions vous permettent de découvrir l'hypnose dans un cadre bienveillant et dynamique.

Les ateliers abordent des thématiques spécifiques et combinent théorie, pratique et partage d'expériences.`,
    benefits: [
      "Découverte de l'hypnose en groupe",
      "Pratique d'exercices guidés",
      "Partage d'expériences avec d'autres participants",
      "Accès à des techniques immédiatement applicables",
      "Ambiance motivante et supportive",
    ],
    whatToExpect: `Un atelier typique dure 2h à 2h30. Il inclut une introduction théorique, des démonstrations, et plusieurs exercices pratiques d'hypnose ou de sophrologie. Les participants repartent avec des techniques à pratiquer chez eux.`,
    durationAndFormat: "Format collectif de 2h à 2h30 - 25-40€ par participant - Sur demande pour les entreprises",
    category: "Développement collectif",
  },
  {
    id: "5",
    slug: "confiance-soi",
    title: "Confiance en soi",
    shortDescription: "Développez une confiance authentique et durable en vous-même.",
    fullDescription: `La confiance en soi n'est pas innée, elle se construit. Si vous souffrez de doute, de perfectionnisme ou d'imposture, l'hypnose permet d'accéder aux racines de ces croyances limitantes et de les transformer en croyances positives.

Retrouver la confiance c'est accéder à votre véritable potentiel.`,
    benefits: [
      "Identifier et transformer les croyances limitantes",
      "Renforcer votre estime personnelle",
      "Améliorer votre présence et votre impact",
      "Surmonter la peur du jugement",
      "Accéder à votre authenticité",
    ],
    whatToExpect: `Nous explorons d'abord les origines de votre manque de confiance. Puis, grâce à l'hypnose et au coaching, nous reprogrammez votre inconscient avec des images et des ressources positives. Vous apprenez à puiser en vous la force et la certitude.`,
    durationAndFormat: "Séances individuelles de 1h - Durée moyenne: 4 à 6 séances",
    category: "Développement personnel",
  },
  {
    id: "6",
    slug: "depression-burnout",
    title: "Dépression et burn out",
    shortDescription: "Retrouvez l'équilibre et l'énergie face à la dépression ou l'épuisement professionnel.",
    fullDescription: `La dépression et le burn out sont des signaux d'un déséquilibre profond. L'hypnothérapie, combinée avec le coaching de vie, vous aide à identifier les causes, à retrouver votre énergie et à reconstruire une vie équilibrée et épanouissante.

C'est un accompagnement bienveillant vers la guérison.`,
    benefits: [
      "Comprendre les causes de la dépression ou du burn out",
      "Retrouver motivation et énergie",
      "Libérer les émotions bloquées",
      "Restructurer vos pensées négatives",
      "Construire une vie plus équilibrée",
    ],
    whatToExpect: `L'accompagnement est progressif et respectueux. Les premières séances permettent de comprendre votre situation et d'établir un diagnostic. Ensuite, nous combinons hypnose, sophrologie et coaching pour créer un véritable changement. Un suivi régulier est recommandé.`,
    durationAndFormat: "Séances individuelles de 1h - Suivi recommandé: 6 à 12 séances minimum",
    category: "Bien-être mental",
  },
  {
    id: "7",
    slug: "gestion-angoisses",
    title: "Gestion des angoisses",
    shortDescription: "Apprenez à maîtriser vos angoisses et retrouver la sérénité.",
    fullDescription: `Les angoisses sont le symptôme d'une peur inconsciente. L'hypnose vous permet d'accéder à cette source profonde, de la comprendre et de la transformer. Plutôt que de combattre l'angoisse, nous apprenons à vivre avec sérénité.

C'est une approche douce mais profonde du changement.`,
    benefits: [
      "Identifier la source réelle de vos angoisses",
      "Réduire l'intensité des crises d'angoisse",
      "Développer votre capacité à rester calme",
      "Retrouver votre sérénité au quotidien",
      "Prévenir les futures crises",
    ],
    whatToExpect: `Chaque séance débute par un échange pour comprendre votre angoisse. Nous utilisons ensuite des techniques de détente progressive, de visualisation et d'hypnose. Vous apprenez également des outils d'autohypnose à pratiquer à domicile pour maintenir vos progrès.`,
    durationAndFormat: "Séances individuelles de 1h - Durée moyenne: 4 à 8 séances",
    category: "Bien-être émotionnel",
  },
  {
    id: "8",
    slug: "hypnose-douleurs",
    title: "Hypnose et douleurs",
    shortDescription: "Diminuez la perception de la douleur avec l'hypnose thérapeutique.",
    fullDescription: `La douleur est une perception gérée par notre cerveau. L'hypnose permet de modifier cette perception et de réduire significativement l'intensité de la douleur chronique, qu'elle soit physique ou psychosomatique.

Les médecins et chirurgiens reconnaissent de plus en plus l'hypnose comme un complément efficace à la prise en charge médicale.`,
    benefits: [
      "Réduction de la perception de la douleur",
      "Diminution de la consommation d'antalgiques",
      "Amélioration de la qualité de vie",
      "Gestion de la douleur chronique",
      "Utilisation sécurisée sans effets secondaires",
    ],
    whatToExpect: `Les séances combinant hypnose, sophrologie et visualisation vous permettent de modifier votre perception de la douleur. Vous apprenez des techniques pour influencer votre système nerveux et réduire l'intensité des symptômes. L'approche est progressive et adaptée à votre cas.`,
    durationAndFormat: "Séances individuelles de 1h - Suivi recommandé: 4 à 8 séances selon la nature de la douleur",
    category: "Bien-être physique",
  },
  {
    id: "9",
    slug: "hypnose-enfants-ados",
    title: "Hypnose pour les enfants et adolescents",
    shortDescription: "Accompagnez vos enfants avec une hypnose adaptée à leur âge.",
    fullDescription: `Les enfants et adolescents répondent particulièrement bien à l'hypnose car leur imagination est plus libre. L'hypnose les aide à gérer les émotions difficiles, l'anxiété scolaire, les phobies et à développer leur confiance.

C'est un accompagnement ludique et bienveillant adapté à leur langage et leur capacité.`,
    benefits: [
      "Réduction de l'anxiété scolaire et des examens",
      "Gestion des phobies (école, animaux, etc.)",
      "Amélioration de la confiance et de l'estime de soi",
      "Gestion du stress et des émotions",
      "Développement de techniques de relaxation",
    ],
    whatToExpect: `Les séances avec enfants et ados combinent imagination, jeux et techniques adaptées. Nous utilisons des métaphores, des histoires et des visualisations ludiques. Les parents sont impliqués dans le suivi pour renforcer les acquis à la maison.`,
    durationAndFormat: "Séances individuelles de 45-50 min - Durée moyenne: 4 à 6 séances - Dès 5 ans",
    category: "Accompagnement familial",
  },
  {
    id: "10",
    slug: "preparation-evenement",
    title: "Préparation à un événement important",
    shortDescription: "Préparez-vous mentalement à un entretien, examen ou événement stressant.",
    fullDescription: `Qu'il s'agisse d'un entretien d'embauche, d'un examen, d'une présentation ou d'un événement majeur, la préparation mentale fait toute la différence. L'hypnose renforce votre confiance et votre capacité à performer sous pression.

C'est l'atout secret des champions et des professionnels.`,
    benefits: [
      "Confiance accrue le jour J",
      "Gestion de la nervosité et du stress",
      "Amélioration de la concentration",
      "Optimisation de vos performances",
      "Visualisation positive du succès",
    ],
    whatToExpect: `Nous travaillons ensemble pour visualiser votre réussite, renforcer vos ressources internes et programmer votre esprit pour performer. Les techniques incluent l'imagerie mentale, la sophrologie et l'hypnose. Vous recevez aussi des enregistrements audio pour la préparation chez vous.`,
    durationAndFormat: "Séances individuelles de 1h - Durée moyenne: 2 à 4 séances avant l'événement",
    category: "Performance personnelle",
  },
  {
    id: "11",
    slug: "troubles-alimentaires",
    title: "Troubles alimentaires",
    shortDescription: "Réconciliez-vous avec la nourriture et votre rapport au corps.",
    fullDescription: `Les troubles alimentaires (boulimie, restriction, compulsions, anorexie) sont souvent le symptôme d'une souffrance émotionnelle profonde. L'hypnothérapie explore cette souffrance et crée un nouveau rapport à la nourriture et au corps, basé sur l'amour et l'acceptation.

C'est un chemin vers la réconciliation et la liberté.`,
    benefits: [
      "Comprendre les causes émotionnelles des troubles",
      "Libérer les émotions bloquées",
      "Développer une relation saine à la nourriture",
      "Accepter et aimer votre corps",
      "Retrouver l'équilibre et l'autonomie",
    ],
    whatToExpect: `L'accompagnement combine hypnothérapie, sophrologie et coaching. Nous explorons les déclencheurs émotionnels, travaillons sur l'image de soi et créons de nouveaux patterns alimentaires sains. Le suivi est régulier pour assurer la stabilité des changements.`,
    durationAndFormat: "Séances individuelles de 1h - Suivi recommandé: 8 à 12 séances minimum",
    category: "Bien-être holistique",
  },
]
