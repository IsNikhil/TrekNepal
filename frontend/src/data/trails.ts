export type Difficulty = 'easy' | 'moderate' | 'hard' | 'expert';

export interface ElevationPoint {
  distance: number; // km
  elevation: number; // meters
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  photos?: string[];
}

export interface Lodge {
  name: string;
  elevation: number;
  amenities: string[];
}

export interface Trail {
  id: string;
  name: string;
  region: string;
  difficulty: Difficulty;
  distance: number;       // km
  duration: string;       // e.g. "14 days"
  elevationGain: number;  // meters
  maxElevation: number;   // meters
  rating: number;
  reviewCount: number;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  tags: string[];
  lat: number;
  lng: number;
  coordinates: [number, number][]; // route polyline [lat, lng]
  elevationProfile: ElevationPoint[];
  highlights: string[];
  permits: string[];
  bestSeason: string[];
  startPoint: string;
  endPoint: string;
  lodges: Lodge[];
  reviews: Review[];
  emergency: {
    nearestHospital: string;
    helicopterLandingZones: string[];
    emergencyContact: string;
  };
}

export const trails: Trail[] = [
  {
    id: 'everest-base-camp',
    name: 'Everest Base Camp Trek',
    region: 'Khumbu / Solukhumbu',
    difficulty: 'hard',
    distance: 130,
    duration: '14 days',
    elevationGain: 4000,
    maxElevation: 5364,
    rating: 4.9,
    reviewCount: 3847,
    description: 'The world\'s most iconic trek, walking in the footsteps of Hillary and Tenzing to the base of the highest mountain on Earth.',
    longDescription: `The Everest Base Camp Trek is the most celebrated high-altitude trek in the world. Starting from Lukla (2,860m), the trail winds through the heart of the Khumbu region, passing through Sherpa villages, ancient monasteries, and rhododendron forests before reaching the foot of Mount Everest at 5,364m.

Along the way, you'll acclimatize in Namche Bazaar — the "Gateway to the Everest Region" — visit the iconic Tengboche Monastery with its backdrop of Ama Dablam, and push through Dingboche and Lobuche before reaching the famous Khumbu glacier moraine that leads to Base Camp.

The route offers unparalleled views of some of the world's highest peaks: Everest (8,849m), Lhotse (8,516m), Nuptse (7,861m), Ama Dablam (6,812m), and Cho Oyu (8,188m). Most trekkers also detour to Kala Patthar (5,545m) for the best panoramic view of Everest's summit.`,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
      'https://images.unsplash.com/photo-1516911897011-1c4dda3b1b78?w=800&q=80',
      'https://images.unsplash.com/photo-1571985887039-1e5ebcdfc3e5?w=800&q=80',
    ],
    tags: ['Classic', 'High Altitude', 'Sherpa Culture', 'Glaciers', 'World Heritage'],
    lat: 27.9881,
    lng: 86.9253,
    coordinates: [
      [27.6870, 86.7294], // Lukla
      [27.7199, 86.7136], // Phakding
      [27.8069, 86.7139], // Namche
      [27.8360, 86.7631], // Tengboche
      [27.8903, 86.8303], // Dingboche
      [27.9219, 86.8122], // Lobuche
      [27.9570, 86.8478], // Gorak Shep
      [27.9881, 86.9253], // EBC
    ],
    elevationProfile: [
      { distance: 0, elevation: 2860 },
      { distance: 9, elevation: 2610 },
      { distance: 19, elevation: 3440 },
      { distance: 32, elevation: 3870 },
      { distance: 42, elevation: 4050 },
      { distance: 55, elevation: 4360 },
      { distance: 67, elevation: 4700 },
      { distance: 79, elevation: 4940 },
      { distance: 90, elevation: 5140 },
      { distance: 100, elevation: 5364 },
    ],
    highlights: [
      'Kala Patthar viewpoint (5,545m) — best Everest panorama',
      'Tengboche Monastery — largest monastery in Khumbu',
      'Namche Bazaar — Sherpa capital & acclimatization hub',
      'Khumbu Icefall views from base camp',
      'Ama Dablam — "Mother\'s Necklace" peak views',
    ],
    permits: ['Sagarmatha National Park Permit (NPR 3,000)', 'TIMS Card (NPR 2,000)', 'Khumbu Pasang Lhamu Rural Municipality Entry Fee'],
    bestSeason: ['March', 'April', 'May', 'October', 'November'],
    startPoint: 'Lukla Airport (2,860m)',
    endPoint: 'Everest Base Camp (5,364m)',
    lodges: [
      { name: 'Namche Bazaar', elevation: 3440, amenities: ['Hot shower', 'WiFi', 'Charging', 'Restaurant', 'Medical post'] },
      { name: 'Tengboche', elevation: 3870, amenities: ['Monastery stay', 'Hot meals', 'Views'] },
      { name: 'Dingboche', elevation: 4360, amenities: ['Heated dining', 'Charging', 'Medical kit'] },
      { name: 'Gorak Shep', elevation: 5140, amenities: ['Basic lodge', 'Hot meals', 'Altitude medication'] },
    ],
    reviews: [
      {
        id: 'r1',
        user: 'Sarah M.',
        avatar: 'SM',
        rating: 5,
        date: '2024-11-15',
        comment: 'Life-changing experience. The views from Kala Patthar at sunrise were worth every difficult step. Our guide Pemba was incredible — knowledgeable and very safety-conscious.',
      },
      {
        id: 'r2',
        user: 'James K.',
        avatar: 'JK',
        rating: 5,
        date: '2024-10-28',
        comment: 'Tough but absolutely doable for fit hikers. Take acclimatization seriously — spend extra days in Namche and Dingboche. The teahouses are better than expected.',
      },
      {
        id: 'r3',
        user: 'Yuki T.',
        avatar: 'YT',
        rating: 4,
        date: '2024-05-02',
        comment: 'Spectacular scenery. Got mild AMS above Lobuche but descent helped immediately. Carry Diamox as a precaution. Crowds can be intense in peak season.',
      },
    ],
    emergency: {
      nearestHospital: 'Khunde Hospital (3,840m) — 2km from Namche',
      helicopterLandingZones: ['Namche Bazaar', 'Pheriche', 'Gorak Shep', 'Dingboche'],
      emergencyContact: 'Nepal Police: 100 | Mountain Rescue: +977-1-4411105',
    },
  },
  {
    id: 'annapurna-circuit',
    name: 'Annapurna Circuit Trek',
    region: 'Annapurna / Gandaki',
    difficulty: 'hard',
    distance: 220,
    duration: '18 days',
    elevationGain: 4800,
    maxElevation: 5416,
    rating: 4.8,
    reviewCount: 2961,
    description: 'One of the world\'s greatest treks — a full circuit around the Annapurna massif crossing the dramatic Thorong La pass at 5,416m.',
    longDescription: `The Annapurna Circuit is arguably the finest trekking route in the world, circumnavigating the entire Annapurna massif (8,091m) through an incredible diversity of landscapes, cultures, and climatic zones.

Starting from the subtropical lowlands of Besisahar, the trail climbs through terraced rice fields, oak forests, and alpine meadows before crossing the high-altitude Manang valley. The centrepiece is the Thorong La Pass (5,416m) — a demanding but magnificent crossing that separates the green Marsyangdi valley from the arid rain-shadow desert of Mustang.

The descent brings you to Muktinath — a sacred pilgrimage site for both Hindus and Buddhists — and then through the dramatic Kali Gandaki Gorge, the world's deepest gorge, before ending in the lakeside city of Pokhara.`,
    image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    ],
    tags: ['Circuit', 'Thorong La', 'Diverse Culture', 'Mustang', 'World Heritage'],
    lat: 28.7059,
    lng: 83.9301,
    coordinates: [
      [28.2310, 84.3760], // Besisahar
      [28.3870, 84.2650], // Chame
      [28.5420, 84.1270], // Manang
      [28.7059, 83.9301], // Thorong La
      [28.8200, 83.8720], // Muktinath
      [28.6950, 83.5810], // Jomsom
      [28.4260, 83.5870], // Tatopani
      [28.1940, 83.9740], // Nayapul
    ],
    elevationProfile: [
      { distance: 0, elevation: 760 },
      { distance: 22, elevation: 1430 },
      { distance: 55, elevation: 2710 },
      { distance: 85, elevation: 3500 },
      { distance: 110, elevation: 3519 },
      { distance: 130, elevation: 5416 },
      { distance: 145, elevation: 3760 },
      { distance: 165, elevation: 2720 },
      { distance: 190, elevation: 1190 },
      { distance: 220, elevation: 820 },
    ],
    highlights: [
      'Thorong La Pass (5,416m) — dramatic high-altitude crossing',
      'Muktinath Temple — sacred Hindu & Buddhist pilgrimage site',
      'Kali Gandaki Gorge — world\'s deepest gorge',
      'Manang village — traditional Tibetan-influenced culture',
      'Poon Hill detour — 360° Annapurna sunrise panorama',
    ],
    permits: ['ACAP Permit (NPR 3,000)', 'TIMS Card (NPR 2,000)'],
    bestSeason: ['March', 'April', 'October', 'November'],
    startPoint: 'Besisahar (760m)',
    endPoint: 'Nayapul / Pokhara',
    lodges: [
      { name: 'Chame', elevation: 2710, amenities: ['Hot shower', 'WiFi', 'Restaurant', 'Charging'] },
      { name: 'Manang', elevation: 3519, amenities: ['Altitude clinic', 'Bakery', 'Cinema room', 'Hot meals'] },
      { name: 'Muktinath', elevation: 3760, amenities: ['Temple visit', 'Hot meals', 'Guesthouses'] },
      { name: 'Tatopani', elevation: 1190, amenities: ['Hot springs', 'Restaurant', 'WiFi'] },
    ],
    reviews: [
      {
        id: 'r4',
        user: 'Emma R.',
        avatar: 'ER',
        rating: 5,
        date: '2024-10-20',
        comment: 'The diversity of this trek is unmatched. Subtropical forests to Tibetan plateau in 18 days. Thorong La crossing at sunrise was the highlight of my life.',
      },
      {
        id: 'r5',
        user: 'Carlos V.',
        avatar: 'CV',
        rating: 5,
        date: '2024-04-15',
        comment: 'Better than the EBC in my opinion — more diverse and less crowded. The Kali Gandaki gorge section is stunning. Roads have been built in parts but most trail is unchanged.',
      },
    ],
    emergency: {
      nearestHospital: 'Manang Altitude Medical Center (3,519m)',
      helicopterLandingZones: ['Manang', 'Muktinath', 'Jomsom', 'Tatopani'],
      emergencyContact: 'Nepal Police: 100 | ACAP Office: +977-61-690190',
    },
  },
  {
    id: 'langtang-valley',
    name: 'Langtang Valley Trek',
    region: 'Langtang / Rasuwa',
    difficulty: 'moderate',
    distance: 68,
    duration: '8 days',
    elevationGain: 2200,
    maxElevation: 4984,
    rating: 4.7,
    reviewCount: 1423,
    description: 'The "Valley of Glaciers" — a hidden gem close to Kathmandu offering stunning Himalayan scenery and rich Tamang culture.',
    longDescription: `Often called the "Valley of Glaciers," Langtang is Nepal's closest major trekking region to Kathmandu yet remains one of the least crowded. The valley was severely affected by the 2015 earthquake — trekking here directly supports the resilient communities rebuilding their lives.

The trail follows the Langtang Khola river through dense forests of rhododendron and oak, past traditional Tamang villages, to the wide, glaciated Langtang Valley. At Kyanjin Gompa (3,870m), you can explore ancient monasteries, taste yak cheese at the local factory, and climb Kyanjin Ri (4,773m) or Tserko Ri (4,984m) for panoramic views of Langtang Lirung (7,227m).`,
    image: 'https://images.unsplash.com/photo-1571985887039-1e5ebcdfc3e5?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1571985887039-1e5ebcdfc3e5?w=800&q=80',
    ],
    tags: ['Valley', 'Accessible', 'Tamang Culture', 'Glaciers', 'Close to Kathmandu'],
    lat: 28.2120,
    lng: 85.5180,
    coordinates: [
      [28.1000, 85.2400], // Syabrubesi
      [28.1550, 85.3620], // Lama Hotel
      [28.1960, 85.5120], // Langtang Village
      [28.2120, 85.5180], // Kyanjin Gompa
    ],
    elevationProfile: [
      { distance: 0, elevation: 1503 },
      { distance: 11, elevation: 2380 },
      { distance: 22, elevation: 3430 },
      { distance: 34, elevation: 3870 },
      { distance: 38, elevation: 4984 },
    ],
    highlights: [
      'Kyanjin Gompa — ancient Buddhist monastery',
      'Tserko Ri (4,984m) — panoramic views of Langtang Lirung',
      'Yak cheese factory visit',
      'Langtang Lirung glacier views',
      'Tamang heritage villages',
    ],
    permits: ['Langtang National Park Fee (NPR 3,000)', 'TIMS Card (NPR 2,000)'],
    bestSeason: ['March', 'April', 'May', 'October', 'November', 'December'],
    startPoint: 'Syabrubesi (1,503m) — 7hrs by bus from Kathmandu',
    endPoint: 'Kyanjin Gompa (3,870m)',
    lodges: [
      { name: 'Lama Hotel', elevation: 2380, amenities: ['Hot shower', 'Restaurant', 'Charging'] },
      { name: 'Langtang Village', elevation: 3430, amenities: ['Hot meals', 'Bakery', 'Charging'] },
      { name: 'Kyanjin Gompa', elevation: 3870, amenities: ['Cheese factory', 'Hot meals', 'Basic lodge', 'Gompa'] },
    ],
    reviews: [
      {
        id: 'r6',
        user: 'Maria L.',
        avatar: 'ML',
        rating: 5,
        date: '2024-11-05',
        comment: 'Perfect first Himalayan trek. Accessible, beautiful, and a great way to support the earthquake-affected communities. Tserko Ri summit was stunning.',
      },
    ],
    emergency: {
      nearestHospital: 'Rasuwa District Hospital, Dhunche',
      helicopterLandingZones: ['Kyanjin Gompa', 'Langtang Village', 'Syabrubesi'],
      emergencyContact: 'Nepal Police: 100 | Park HQ: +977-10-690099',
    },
  },
  {
    id: 'manaslu-circuit',
    name: 'Manaslu Circuit Trek',
    region: 'Gorkha / Mansiri',
    difficulty: 'expert',
    distance: 177,
    duration: '16 days',
    elevationGain: 5100,
    maxElevation: 5160,
    rating: 4.8,
    reviewCount: 892,
    description: 'A remote and dramatic circuit around the world\'s 8th highest mountain — wilder and less crowded than Annapurna.',
    longDescription: `The Manaslu Circuit is considered the crown jewel of Nepal's restricted trekking routes. Circling the world's eighth highest peak (8,163m) through the remote Mansiri Himal, the trail offers everything the classic circuits promise but with far fewer trekkers.

The route follows ancient trade routes linking Nepal and Tibet, passing through ethnic Gurung and Tibetan Buddhist communities. The dramatic Larkya La Pass (5,160m) is the centrepiece, rewarding trekkers with spectacular close-up views of Manaslu, Himlung, Cheo Himal, and Annapurna II.

A restricted area permit adds to the exclusivity — making this trek feel genuinely wild and remote.`,
    image: 'https://images.unsplash.com/photo-1516911897011-1c4dda3b1b78?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1516911897011-1c4dda3b1b78?w=800&q=80',
    ],
    tags: ['Remote', 'Restricted Area', 'Larkya La', 'Off the Beaten Path', 'Cultural'],
    lat: 28.5496,
    lng: 84.5597,
    coordinates: [
      [28.1100, 84.6610], // Arughat
      [28.2740, 84.6410], // Jagat
      [28.3690, 84.6020], // Deng
      [28.4630, 84.5600], // Namrung
      [28.5496, 84.5597], // Larkya La
      [28.6280, 84.4720], // Bhimthang
    ],
    elevationProfile: [
      { distance: 0, elevation: 610 },
      { distance: 28, elevation: 1410 },
      { distance: 55, elevation: 2160 },
      { distance: 83, elevation: 3430 },
      { distance: 110, elevation: 4460 },
      { distance: 130, elevation: 5160 },
      { distance: 145, elevation: 3720 },
      { distance: 177, elevation: 855 },
    ],
    highlights: [
      'Larkya La Pass (5,160m) — dramatic high Himalayan crossing',
      'Tibetan Buddhist villages — Samagaon & Samdo',
      'Manaslu (8,163m) close-up views',
      'Birendra Lake — glacial lake near Samagaon',
      'Ancient Pungen Gompa monastery',
    ],
    permits: ['Manaslu Restricted Area Permit (USD 70/week)', 'Manaslu Conservation Area Permit (NPR 3,000)', 'TIMS Card — mandatory guide'],
    bestSeason: ['March', 'April', 'May', 'October', 'November'],
    startPoint: 'Soti Khola (710m) via Arughat from Kathmandu',
    endPoint: 'Dharapani — connects to Annapurna Circuit',
    lodges: [
      { name: 'Jagat', elevation: 1410, amenities: ['Permit checkpoint', 'Basic lodge', 'Restaurant'] },
      { name: 'Samagaon', elevation: 3530, amenities: ['Altitude clinic', 'Hot meals', 'Monastery'] },
      { name: 'Samdo', elevation: 3690, amenities: ['Basic lodge', 'Hot meals'] },
      { name: 'Larkya Phedi', elevation: 4460, amenities: ['Basic lodge', 'Hot meals', 'Early start point'] },
    ],
    reviews: [
      {
        id: 'r7',
        user: 'David H.',
        avatar: 'DH',
        rating: 5,
        date: '2024-10-30',
        comment: 'The best trek I\'ve ever done. Fewer crowds than Annapurna but equally dramatic. Larkya La at sunrise with Manaslu glowing — I\'ll never forget it.',
      },
    ],
    emergency: {
      nearestHospital: 'Samagaon Medical Post (3,530m) | Gorkha Hospital',
      helicopterLandingZones: ['Samagaon', 'Samdo', 'Bhimthang', 'Philim'],
      emergencyContact: 'Nepal Police: 100 | Manaslu Conservation: +977-64-420132',
    },
  },
  {
    id: 'upper-mustang',
    name: 'Upper Mustang Trek',
    region: 'Mustang / Gandaki',
    difficulty: 'moderate',
    distance: 170,
    duration: '15 days',
    elevationGain: 2400,
    maxElevation: 3840,
    rating: 4.9,
    reviewCount: 741,
    description: 'Journey to the "Forbidden Kingdom" — a Tibetan plateau enclave with ancient cave cities, walled towns, and surreal lunar landscapes.',
    longDescription: `Upper Mustang is one of Nepal's most exclusive and enchanting trekking destinations. Until 1992, this ancient Tibetan Buddhist kingdom was completely closed to foreigners, and even today it requires a special restricted area permit costing USD 500 for 10 days.

The landscape is unlike anything else in Nepal — a rain-shadow desert of eroded red and ochre cliffs, ancient cave monasteries, walled medieval towns, and flat-topped buttes that feel more like the American Southwest or Mars than the Himalaya. The walled capital of Lo Manthang (3,840m) is the centrepiece: a living medieval city with whitewashed buildings, chortens, and the 15th-century royal palace of the King of Mustang.`,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    ],
    tags: ['Restricted Area', 'Tibetan Culture', 'Desert', 'Ancient Kingdom', 'Unique'],
    lat: 29.1910,
    lng: 83.9650,
    coordinates: [
      [28.7820, 83.7200], // Jomsom
      [28.9180, 83.8290], // Kagbeni
      [29.0240, 83.9430], // Chele
      [29.1910, 83.9650], // Lo Manthang
    ],
    elevationProfile: [
      { distance: 0, elevation: 2720 },
      { distance: 10, elevation: 2800 },
      { distance: 35, elevation: 3050 },
      { distance: 60, elevation: 3640 },
      { distance: 85, elevation: 3840 },
    ],
    highlights: [
      'Lo Manthang — walled medieval capital of the Mustang Kingdom',
      'Ancient cave monasteries (Luri, Chungsi)',
      'Surreal lunar desert landscapes',
      'Tiji Festival (May) — masked dance festival',
      'Sky caves — prehistoric burial chambers',
    ],
    permits: ['Upper Mustang Restricted Area Permit (USD 500/10 days)', 'ACAP Permit (NPR 3,000)', 'Mandatory licensed guide'],
    bestSeason: ['May', 'June', 'July', 'August', 'September', 'October'],
    startPoint: 'Jomsom (2,720m) — flight from Pokhara',
    endPoint: 'Lo Manthang (3,840m)',
    lodges: [
      { name: 'Kagbeni', elevation: 2800, amenities: ['WiFi', 'Hot shower', 'Permit checkpoint'] },
      { name: 'Chele', elevation: 3050, amenities: ['Basic lodge', 'Hot meals'] },
      { name: 'Lo Manthang', elevation: 3840, amenities: ['Guesthouses', 'Restaurant', 'Royal Palace visit'] },
    ],
    reviews: [
      {
        id: 'r8',
        user: 'Anna P.',
        avatar: 'AP',
        rating: 5,
        date: '2024-06-10',
        comment: 'Worth every penny of the permit cost. Lo Manthang feels like stepping 500 years into the past. The cliff monasteries are extraordinary. Go during Tiji Festival if you can.',
      },
    ],
    emergency: {
      nearestHospital: 'Jomsom Hospital (2,720m)',
      helicopterLandingZones: ['Jomsom', 'Lo Manthang', 'Kagbeni'],
      emergencyContact: 'Nepal Police Jomsom: +977-69-440022',
    },
  },
  {
    id: 'gokyo-lakes',
    name: 'Gokyo Lakes & Ri Trek',
    region: 'Khumbu / Solukhumbu',
    difficulty: 'hard',
    distance: 70,
    duration: '12 days',
    elevationGain: 3500,
    maxElevation: 5357,
    rating: 4.8,
    reviewCount: 1156,
    description: 'Turquoise sacred lakes, the world\'s highest freshwater lake system, and a panoramic view rivaling Kala Patthar.',
    longDescription: `The Gokyo Lakes trek offers an alternative to the classic EBC route with arguably even more dramatic scenery. The route climbs through the Khumbu region to the Gokyo Valley — home to a chain of six sacred turquoise lakes, the Ngozumpa Glacier (the longest glacier in Nepal), and the summit of Gokyo Ri (5,357m).

From Gokyo Ri's summit, the 360° panorama includes four of the world's six highest peaks: Everest (8,849m), Lhotse (8,516m), Cho Oyu (8,188m), and Makalu (8,481m). Many trekkers combine this with the EBC route via the high Cho La Pass (5,420m) for the ultimate Khumbu experience.`,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
    ],
    tags: ['Lakes', 'Panoramic Views', 'Glaciers', 'Alternative EBC', 'High Altitude'],
    lat: 27.9616,
    lng: 86.6892,
    coordinates: [
      [27.6870, 86.7294], // Lukla
      [27.7199, 86.7136], // Phakding
      [27.8069, 86.7139], // Namche
      [27.8790, 86.6520], // Dole
      [27.9040, 86.6700], // Machhermo
      [27.9616, 86.6892], // Gokyo
    ],
    elevationProfile: [
      { distance: 0, elevation: 2860 },
      { distance: 9, elevation: 2610 },
      { distance: 19, elevation: 3440 },
      { distance: 30, elevation: 4038 },
      { distance: 40, elevation: 4470 },
      { distance: 50, elevation: 4750 },
      { distance: 55, elevation: 5357 },
    ],
    highlights: [
      'Gokyo Ri (5,357m) — 4-peak panorama including Everest',
      'Gokyo Sacred Lakes — turquoise high-altitude gems',
      'Ngozumpa Glacier — Nepal\'s largest glacier',
      'Optional Cho La Pass crossing to EBC route',
      'Renjo La Pass (5,360m) alternative route',
    ],
    permits: ['Sagarmatha National Park Permit (NPR 3,000)', 'TIMS Card (NPR 2,000)'],
    bestSeason: ['March', 'April', 'May', 'October', 'November'],
    startPoint: 'Lukla Airport (2,860m)',
    endPoint: 'Gokyo Village (4,750m)',
    lodges: [
      { name: 'Namche Bazaar', elevation: 3440, amenities: ['Hot shower', 'WiFi', 'Charging', 'Restaurant', 'Medical post'] },
      { name: 'Machhermo', elevation: 4470, amenities: ['Basic lodge', 'Hot meals', 'Yak herder community'] },
      { name: 'Gokyo', elevation: 4750, amenities: ['Basic lodge', 'Hot meals', 'Lake access', 'Gokyo Ri base'] },
    ],
    reviews: [
      {
        id: 'r9',
        user: 'Tom W.',
        avatar: 'TW',
        rating: 5,
        date: '2024-11-12',
        comment: 'I preferred this to EBC — fewer people, the lakes are magical, and the Gokyo Ri view beats Kala Patthar in my opinion. Do it before it gets too popular.',
      },
    ],
    emergency: {
      nearestHospital: 'Khunde Hospital (3,840m) | Machhermo Medical Post',
      helicopterLandingZones: ['Gokyo', 'Machhermo', 'Namche'],
      emergencyContact: 'Nepal Police: 100 | Mountain Rescue: +977-1-4411105',
    },
  },
  {
    id: 'poon-hill',
    name: 'Poon Hill Sunrise Trek',
    region: 'Annapurna / Myagdi',
    difficulty: 'easy',
    distance: 50,
    duration: '5 days',
    elevationGain: 1900,
    maxElevation: 3210,
    rating: 4.7,
    reviewCount: 4230,
    description: 'Nepal\'s most popular short trek — stunning Annapurna sunrise views accessible to all fitness levels.',
    longDescription: `Poon Hill is Nepal's most accessible Himalayan viewpoint trek and the perfect introduction to the Himalayas. Starting from Nayapul near Pokhara, the trail follows the Modi Khola river through rhododendron forests and traditional Gurung villages to reach the famous viewpoint at 3,210m.

The pre-dawn hike to Poon Hill's summit rewards trekkers with one of the most photographed sunrises in the Himalayas — Dhaulagiri (8,167m), Annapurna I (8,091m), Annapurna South, Machhapuchhre (Fish Tail), and dozens of other peaks turning gold and pink in the morning light.

With good infrastructure, teahouses every hour, and a well-maintained trail, this trek is perfect for families, beginners, or those with limited time.`,
    image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
    ],
    tags: ['Beginner Friendly', 'Sunrise', 'Annapurna Views', 'Short Trek', 'Family Friendly'],
    lat: 28.3996,
    lng: 83.6929,
    coordinates: [
      [28.2100, 83.7870], // Nayapul
      [28.2750, 83.7430], // Tikhedhunga
      [28.3260, 83.7180], // Ghorepani
      [28.3996, 83.6929], // Poon Hill
    ],
    elevationProfile: [
      { distance: 0, elevation: 1070 },
      { distance: 7, elevation: 1480 },
      { distance: 14, elevation: 2853 },
      { distance: 18, elevation: 3210 },
    ],
    highlights: [
      'Poon Hill (3,210m) — iconic Annapurna & Dhaulagiri sunrise',
      'Rhododendron forests — spectacular in March/April',
      'Ghorepani — traditional Gurung village',
      'Machhapuchhre (Fishtail) mountain views',
      'Option to extend to Annapurna Base Camp',
    ],
    permits: ['ACAP Permit (NPR 3,000)', 'TIMS Card (NPR 2,000)'],
    bestSeason: ['January', 'February', 'March', 'April', 'October', 'November', 'December'],
    startPoint: 'Nayapul (1,070m) — 1.5hrs by car from Pokhara',
    endPoint: 'Poon Hill (3,210m) / return to Nayapul',
    lodges: [
      { name: 'Tikhedhunga', elevation: 1480, amenities: ['Hot shower', 'Restaurant', 'Charging'] },
      { name: 'Ghorepani', elevation: 2853, amenities: ['Hot shower', 'WiFi', 'Restaurant', 'Good teahouses'] },
    ],
    reviews: [
      {
        id: 'r10',
        user: 'Lucy F.',
        avatar: 'LF',
        rating: 5,
        date: '2024-03-22',
        comment: 'Perfect first trek! We did it as a family with our 10-year-old. The sunrise from Poon Hill was beyond words. Trails are well-maintained and teahouses are excellent.',
      },
      {
        id: 'r11',
        user: 'Raj S.',
        avatar: 'RS',
        rating: 4,
        date: '2024-11-08',
        comment: 'Great trek, very busy in peak season. Go mid-week if you want fewer people. The rhododendron bloom in March/April is absolutely incredible.',
      },
    ],
    emergency: {
      nearestHospital: 'Beni Hospital (40km) | Pokhara hospitals (90km)',
      helicopterLandingZones: ['Ghorepani', 'Tadapani'],
      emergencyContact: 'Nepal Police: 100 | ACAP Office Pokhara: +977-61-690190',
    },
  },
  {
    id: 'mardi-himal',
    name: 'Mardi Himal Trek',
    region: 'Annapurna / Kaski',
    difficulty: 'moderate',
    distance: 55,
    duration: '7 days',
    elevationGain: 2800,
    maxElevation: 4500,
    rating: 4.6,
    reviewCount: 678,
    description: 'A hidden gem in the Annapurna region — intimate, less-crowded trail with extraordinary close-up views of Machhapuchhre and Annapurna.',
    longDescription: `The Mardi Himal Trek is the Annapurna region's best-kept secret — a newer, officially designated route that offers incredibly intimate views of Machhapuchhre (Fish Tail, 6,993m) and the Annapurna massif without the crowds of Poon Hill or ABC.

The trail climbs steeply through rhododendron and bamboo forests to a beautiful high ridge, then continues to the Mardi Himal Base Camp at 4,500m. The ridgeline views are breathtaking — with Machhapuchhre so close you feel you could touch its distinctive double summit, and the full Annapurna range stretching beyond.`,
    image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
    ],
    tags: ['Hidden Gem', 'Off the Beaten Path', 'Machhapuchhre Views', 'Short Trek', 'Ridge Walking'],
    lat: 28.4320,
    lng: 83.9180,
    coordinates: [
      [28.2000, 83.9800], // Kande
      [28.2850, 83.9500], // Forest Camp
      [28.3620, 83.9220], // High Camp
      [28.4320, 83.9180], // Mardi Himal Base Camp
    ],
    elevationProfile: [
      { distance: 0, elevation: 1770 },
      { distance: 8, elevation: 2520 },
      { distance: 18, elevation: 3580 },
      { distance: 28, elevation: 4500 },
    ],
    highlights: [
      'Machhapuchhre (Fishtail) close-up views from the ridge',
      'High Camp ridge walk — 360° panorama',
      'Pristine rhododendron & bamboo forests',
      'Far fewer trekkers than Poon Hill / ABC',
      'Good option combined with ABC or Poon Hill circuit',
    ],
    permits: ['ACAP Permit (NPR 3,000)', 'TIMS Card (NPR 2,000)'],
    bestSeason: ['February', 'March', 'April', 'May', 'October', 'November'],
    startPoint: 'Kande (1,770m) — 45mins from Pokhara by jeep',
    endPoint: 'Mardi Himal Base Camp (4,500m)',
    lodges: [
      { name: 'Forest Camp', elevation: 2520, amenities: ['Basic lodge', 'Hot meals', 'Camping option'] },
      { name: 'High Camp', elevation: 3580, amenities: ['Basic lodge', 'Hot meals', 'Panoramic views'] },
    ],
    reviews: [
      {
        id: 'r12',
        user: 'Finn O.',
        avatar: 'FO',
        rating: 5,
        date: '2024-04-08',
        comment: 'This ridge has the most intimate mountain views I\'ve ever experienced. Machhapuchhre looming above you is extraordinary. Do this instead of (or in addition to) Poon Hill.',
      },
    ],
    emergency: {
      nearestHospital: 'Pokhara hospitals (1.5hrs by jeep)',
      helicopterLandingZones: ['High Camp', 'Sidhing village'],
      emergencyContact: 'Nepal Police: 100 | ACAP: +977-61-690190',
    },
  },
];

export const difficultyColors: Record<Difficulty, string> = {
  easy: 'text-green-600 bg-green-50 border-green-200',
  moderate: 'text-blue-600 bg-blue-50 border-blue-200',
  hard: 'text-orange-600 bg-orange-50 border-orange-200',
  expert: 'text-red-600 bg-red-50 border-red-200',
};

export const difficultyLabel: Record<Difficulty, string> = {
  easy: 'Easy',
  moderate: 'Moderate',
  hard: 'Hard',
  expert: 'Expert',
};
