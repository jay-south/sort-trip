import { useParams, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { Hero, Card, SectionHeader } from '../components/ui';
import { getExperiencesByCategory } from '../../infrastructure/data/mock-experiences';
import type { ExperienceCategory } from '../../core/entities';
import styles from './CategoryPage.module.css';

const categoryConfig: Record<ExperienceCategory, { title: string; subtitle: string; image: string }> = {
  'travel-around': {
    title: 'Travel Around',
    subtitle: 'Explore the wonders of Cuzco and its magical surroundings',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1920&q=80',
  },
  stays: {
    title: 'Stays',
    subtitle: 'Find your perfect home away from home in the heart of Peru',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
  },
  transportation: {
    title: 'Transportation',
    subtitle: 'Travel comfortably between destinations with our trusted partners',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1920&q=80',
  },
  'tours-activities': {
    title: 'Tours & Activities',
    subtitle: 'Unforgettable experiences that will stay with you forever',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1920&q=80',
  },
  'eat-drink': {
    title: 'Eat & Drink',
    subtitle: 'Savor the incredible flavors of Peruvian cuisine',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80',
  },
  flights: {
    title: 'Book Flights',
    subtitle: 'Find the best deals for your journey to Cuzco',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80',
  },
};

export const CategoryPage = () => {
  const { category: categoryParam } = useParams<{ category: ExperienceCategory }>();
  const location = useLocation();
  
  // Get category from URL path since routes are fixed, not dynamic
  const pathname = location.pathname;
  const categoryFromPath = pathname.replace('/', '') as ExperienceCategory;
  const category = categoryParam || categoryFromPath;

  const config = categoryConfig[category as ExperienceCategory] || {
    title: 'Explore',
    subtitle: 'Discover amazing experiences in Cuzco',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1920&q=80',
  };

  const experiences = useMemo(() => {
    return getExperiencesByCategory(category || '');
  }, [category]);

  const isEatDrink = category === 'eat-drink';
  const isToursActivities = category === 'tours-activities';
  const isTransportation = category === 'transportation';
  const wanderlogUrl = 'https://wanderlog.com/list/geoCategory/7701/best-bars-and-drinks-in-cusco';

  // Transportation - Train data
  const trainDeparturePoints = [
    {
      id: 'cusco',
      name: 'From Cusco',
      description: 'Take a taxi or bus to stations like Poroy (closer but fewer options), Wanchaq, or San Pedro.',
      stations: ['Poroy', 'Wanchaq', 'San Pedro'],
    },
    {
      id: 'sacred-valley',
      name: 'From Sacred Valley',
      description: 'Most popular option. Take a taxi or shuttle to Ollantaytambo, a charming town and major train departure point.',
      highlight: true,
      stations: ['Ollantaytambo'],
    },
    {
      id: 'urubamba',
      name: 'From Urubamba',
      description: 'Another Sacred Valley option, served by PeruRail.',
      stations: ['Urubamba'],
    },
  ];

  const trainCompanies = [
    {
      id: 'inca-rail',
      name: 'Inca Rail',
      tagline: 'Variety of sitting options and features depending on your budget',
      link: 'https://incarail.com/en',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&h=800&fit=crop&q=80',
      options: [
        {
          name: 'The Voyager',
          type: 'Budget-Friendly',
          features: ['Large windows', 'Snacks for purchase'],
        },
        {
          name: 'The 360°',
          type: 'Panoramic',
          features: ['Panoramic windows', 'Observatory car', 'Complimentary snack/drink'],
        },
        {
          name: 'The Prime',
          type: 'Premium',
          features: ['Spacious seats', 'Live Andean music', 'Gourmet snacks'],
        },
        {
          name: 'The First Class',
          type: 'Luxury',
          features: ['Gourmet 3-course meal', 'Lounge/bar', 'Open-air balcony', 'Wine ceremony'],
        },
      ],
    },
    {
      id: 'peru-rail',
      name: 'PeruRail',
      tagline: 'Several categories from economical to luxury',
      link: 'https://www.perurail.com/',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=800&fit=crop&q=80',
      options: [
        {
          name: 'Expedition',
          type: 'Budget-Friendly',
          features: ['Basic comfort', 'Economical option'],
        },
        {
          name: 'Vistadome',
          type: 'Panoramic',
          features: ['Panoramic windows', 'Snacks included', 'Cultural shows'],
        },
        {
          name: 'Vistadome Observatory',
          type: 'Premium',
          features: ['All Vistadome features', 'Open-air balcony'],
        },
        {
          name: 'Hiram Bingham',
          type: 'Ultra-Luxury',
          features: ['Gourmet dining', 'Bar car', 'Live music', 'All-inclusive experience'],
        },
      ],
    },
  ];

  // Eat & Drink places data - Complete list
  const eatDrinkPlaces = {
    traditional: [
      {
        id: 'mercado-san-pedro',
        name: 'Mercado San Pedro',
        description: 'Where all of Cusco comes to eat. Walk through aisles, every vendor will vie for your attention. You will find variety of local options.',
        location: 'Mercado Central de San Pedro, Cusco',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mercado+San+Pedro+Cusco',
        image: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=800&h=600&fit=crop&q=80',
        highlight: true,
      },
      {
        id: 'yaku',
        name: 'Yaku Restaurant',
        description: 'If you need to find a restaurant that has something for everyone, this is your answer. Large, varied menu including Peruvian dishes like lomo saltado, ají de gallina, quinoa soup, plus pizza, burgers, and salads with a Peruvian twist.',
        location: 'Cusco',
        image: 'https://images.unsplash.com/photo-1555396273-367ba0b6ee97?w=800&h=600&fit=crop&q=80',
      },
      {
        id: 'campo-cocina',
        name: 'Campo Cocina Andina',
        description: 'Slightly fancier versions of traditional Cusqueñian dishes.',
        location: 'Cusco',
      },
      {
        id: 'cusquenisima',
        name: 'Cusqueñísima',
        description: 'Every Cusqueñian grandmother\'s best recipes.',
        location: 'Cusco',
      },
      {
        id: 'el-encuentro',
        name: 'El Encuentro',
        description: 'Vegetarian and vegan versions of Peruvian classics.',
        location: 'Cusco',
      },
      {
        id: 'pachapapa',
        name: 'Pachapapa',
        description: 'Cusqueñian recipes and woodfired breads.',
        location: 'Cusco',
      },
      {
        id: 'rico-rico',
        name: 'Rico Rico\'s Pollo a la Brasa',
        description: 'To eat where locals eat, head to Rico Rico\'s Pollo a la Brasa, an affordable place to try Peruvian chicken.',
        location: 'Cusco',
      },
      {
        id: 'chakruna',
        name: 'Chakruna Native Burgers',
        description: 'Specializes in burgers made with local meat and cheese. They also have beef, chicken, and vegetarian options. If you want to try alpaca, having it in a burger is a good introduction.',
        location: 'Cusco',
      },
      {
        id: 'buenazo',
        name: 'Buenazo',
        description: 'Peruvian cuisine, traditional excellent dishes.',
        location: 'Cusco',
      },
      {
        id: 'nuna-raymi',
        name: 'Nuna Raymi',
        description: 'Peruvian organic local sustainable food.',
        location: 'Cusco',
      },
      {
        id: 'kusykay',
        name: 'Kusykay',
        description: 'Excellent Peruvian craft traditional food and ceviche.',
        location: 'Cusco',
      },
    ],
    casual: [
      {
        id: 'piano-piano',
        name: 'Piano Piano Osteria',
        description: 'Cool Italian style pizza.',
        location: 'Cusco',
      },
      {
        id: 'carpe-diem',
        name: 'Carpe Diem',
        description: 'Pizza & pasta, always get the tiramisu.',
        location: 'Cusco',
      },
      {
        id: 'casalino',
        name: 'Casalino',
        description: 'Focaccia & pizza.',
        location: 'Cusco',
      },
      {
        id: 'green-point',
        name: 'Green Point',
        description: 'Vegan Peruvian & international cuisine.',
        location: 'Cusco',
      },
      {
        id: 'il-olivo',
        name: 'Il Olivo',
        description: 'Freshly made pasta and Italian favorites.',
        location: 'Cusco',
      },
      {
        id: 'jacks',
        name: 'Jack\'s',
        description: 'International favorites with big portions & breakfast all day.',
        location: 'Cusco',
      },
      {
        id: 'la-bodega',
        name: 'La Bodega 138',
        description: 'Pizza, pasta & beer.',
        location: 'Cusco',
      },
      {
        id: 'la-boheme',
        name: 'La Bohème',
        description: 'French crêpes, soups & salads with some Peruvian fusion.',
        location: 'Cusco',
      },
      {
        id: 'la-cantina',
        name: 'La Cantina',
        description: 'Wine bar with Italian bites and desserts.',
        location: 'Cusco',
      },
    ],
    fancy: [
      {
        id: 'chicha',
        name: 'Chicha',
        description: 'Haute Peruvian cuisine by famous Limeñian chef Gaston Acurio.',
        location: 'Cusco',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&q=80',
        highlight: true,
      },
      {
        id: 'chikara',
        name: 'Chikara Sushi',
        description: 'Peruvian Nikkei cuisine is a Japanese-Andean fusion.',
        location: 'Cusco',
      },
      {
        id: 'cicciolina',
        name: 'Cicciolina',
        description: 'Mediterranean-Peruvian fusion with great tapas & wine list.',
        location: 'Cusco',
      },
      {
        id: 'limo',
        name: 'Limo',
        description: 'Peruvian seafood and Nikkei cuisine.',
        location: 'Cusco',
      },
      {
        id: 'miwa',
        name: 'Miwa Peruvian Asian Kitchen',
        description: 'Peruvian-Japanese fusion.',
        location: 'Cusco',
      },
      {
        id: 'morena',
        name: 'Morena Peruvian Kitchen',
        description: 'Peruvian haute cuisine.',
        location: 'Cusco',
      },
      {
        id: 'oculto',
        name: 'Oculto',
        description: 'Peruvian-international fusion small plates, tapas & wine.',
        location: 'Cusco',
      },
      {
        id: 'osda',
        name: 'Osda',
        description: 'Peruvian-Mediterranean fusion & cocktails.',
        location: 'Cusco',
      },
      {
        id: 'sagrado',
        name: 'Sagrado',
        description: 'Peruvian haute cuisine.',
        location: 'Cusco',
      },
      {
        id: 'uchu',
        name: 'Uchu',
        description: 'Peruvian steakhouse that cooks signature dishes on stone.',
        location: 'Cusco',
      },
      {
        id: 'suyu',
        name: 'Suyu',
        description: 'Peruvian latin cuisine.',
        location: 'Cusco',
      },
      {
        id: 'mil-centro',
        name: 'Mil Centro',
        description: 'Andean Peruvian with vegetarian options.',
        location: 'Cusco',
      },
    ],
    coffee: [
      {
        id: 'three-monkeys',
        name: 'Three Monkeys',
        description: '#22 World Best Coffee Shop, Sprudge Design Awards 2025. Features a menu of locally grown coffees that reads like a wine menu.',
        location: 'Cusco',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&q=80',
        highlight: true,
      },
      {
        id: 'florencia-fortunata',
        name: 'Florencia y Fortunata Café',
        description: 'The shop is an amazing place to hang out and have a coffee.',
        location: 'Cusco',
      },
      {
        id: 'xapiri',
        name: 'Xapiri Ground',
        description: 'The space functions as a museum, a gallery, and a cafe. Xapiri Ground is a space dedicated to celebrating the Peruvian Amazon.',
        location: 'Cusco',
      },
      {
        id: 'indie-cafe',
        name: 'Indie Café & Concept store',
        description: 'Very tiny but extremely cute concept. In the morning hours before noon, it gets direct sunlight.',
        location: 'Cusco',
      },
      {
        id: 'cafe-dwasi',
        name: 'Café D\'Wasi',
        description: 'Where you want to go if you love good coffee and want to choose your brewing method. They have everything from French press and Aeropress to Chemex and Siphon.',
        location: 'Cusco',
      },
      {
        id: 'cicciolina-cafe',
        name: 'Cicciolina Cafe',
        description: 'Fantastic homemade bread and pastries plus well trained baristas who make great coffee.',
        location: 'Cusco',
      },
    ],
    drinks: [
      {
        id: 'aurora',
        name: 'Aurora Bar',
        description: 'Amazing and beautiful outdoor terrace to enjoy your drinks.',
        location: 'Cusco',
        image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop&q=80',
      },
      {
        id: 'cerveceria-110',
        name: 'La Cervecería 110',
        description: 'Craft beer, food, live music, dance, good ambience.',
        location: 'Cusco',
      },
      {
        id: 'calle-medio',
        name: 'Calle del Medio',
        description: 'Plaza de Armas balcony views & sportsball in the bar.',
        location: 'Plaza de Armas, Cusco',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Calle+del+Medio+Plaza+de+Armas+Cusco',
      },
      {
        id: 'garibaldi',
        name: 'Garibaldi Cocktail Bar',
        description: 'Cusco\'s best mixologists. 5pm-midnight, closed Sunday.',
        location: 'Calle Maruri 320, Historic center',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Garibaldi+Cocktail+Bar+Calle+Maruri+320+Cusco',
        highlight: true,
      },
      {
        id: 'km0',
        name: 'Km.0 Arte y Tapas',
        description: 'Friendly bar with live music downstairs and boardgames upstairs. 6pm-midnight.',
        location: 'Tandapata 100, San Blas',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Km.0+Arte+y+Tapas+Tandapata+100+Cusco',
      },
      {
        id: 'massimo',
        name: 'Massimo',
        description: 'Amsterdam-themed with plaza balcony views. 5pm-midnight.',
        location: 'Cusco',
      },
      {
        id: 'museo-pisco',
        name: 'Museo del Pisco',
        description: 'Pisco specials. 3pm-midnight.',
        location: 'Santa Catalina Ancha 398, Historic center',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Museo+del+Pisco+Santa+Catalina+Ancha+398+Cusco',
      },
      {
        id: 'norton',
        name: 'Norton Pub',
        description: 'Solid rock\'n\'roll bar. 5pm-midnight.',
        location: 'Calle San Agustín 280, Historic center',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Norton+Pub+Calle+San+Agustín+280+Cusco',
      },
      {
        id: 'paddys',
        name: 'Paddy\'s',
        description: 'Cusco\'s Irish Pub with many sportsball screens. 10am-1am.',
        location: 'Calle Triunfo 124, Plaza de Armas',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Paddys+Irish+Pub+Calle+Triunfo+124+Cusco',
      },
      {
        id: 'library',
        name: 'The Library',
        description: 'Cusco\'s first speakeasy. 6:30-midnight, closed Monday.',
        location: 'Portal Comercio 121, Plaza de Armas',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=The+Library+speakeasy+Portal+Comercio+121+Cusco',
      },
      {
        id: 'cerveceria-valle',
        name: 'Cervecería Del Valle Sagrado',
        description: 'Local craft beer. Open later than restaurants. The taproom is fairly large, with a couple of different rooms to sit in.',
        location: 'Cusco Centro',
      },
      {
        id: 'cholos',
        name: 'Cholos Craft Beer',
        description: 'Tap room and restaurant with the best pizza, burgers and more. Craft beers from Cusco city and Peru in a colonial and historical house from 1600.',
        location: 'Cusco',
      },
      {
        id: 'el-barril',
        name: 'El Barril Cusco',
        description: 'New Place Peruvian Food and Drink - New Option to Enjoy the best Drinks and foods from Cusco and Peruvians.',
        location: 'Cusco',
      },
      {
        id: 'el-bar',
        name: 'El Bar',
        description: 'The ideal spot to unwind in Machu Picchu Pueblo. Enjoy a warm, inviting atmosphere.',
        location: 'Machu Picchu Pueblo',
      },
    ],
  };

  const tourPlatforms = [
    {
      id: 'tripadvisor',
      name: 'TripAdvisor',
      description: 'Discover top-rated tours and activities in Cusco with over 30,000 reviews',
      url: 'https://www.tripadvisor.com/Attractions-g294314-Activities-c42-Cusco_Cusco_Region.html',
      logo: '/logos/tripadvisor.png',
      highlight: false,
      style: 'image',
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop&q=80&auto=format',
      fallbackImage: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop&q=80&auto=format',
      badge: '30K+ Reviews',
    },
    {
      id: 'alpaca',
      name: 'Alpaca Expeditions',
      description: 'The only Peru tour operator with over 30,000 excellent reviews on TripAdvisor',
      url: 'https://www.alpacaexpeditions.com/',
      logo: '/logos/alpaca.png',
      highlight: true,
      style: 'hero',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200&h=800&fit=crop&q=80&auto=format',
      fallbackImage: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73a6e?w=1200&h=800&fit=crop&q=80&auto=format',
      badge: 'Top Rated',
      color: '#34d399',
    },
    {
      id: 'civitatis',
      name: 'Civitatis',
      description: 'Book tours, activities and excursions in Cusco with instant confirmation',
      url: 'https://www.civitatis.com/ar/cusco/?aid=121&cmp=es_RoW&page=5&aid=121&cmp=es_AR_PMax&cmpint=Pmax_Generica&gclsrc=aw.ds&gad_source=1&gad_campaignid=20824763228&gbraid=0AAAAADSEWH3UHhnjMdyoQ9XDbFN3I5VSq&gclid=CjwKCAiAjc7KBhBvEiwAE2BDOT2PAdqcHpKxE3otn3-MBD-CODPBQSepD3L2M5TsUr_N0MXbW4lYERoCt_gQAvD_BwE',
      logo: '/logos/civitatis.png',
      highlight: false,
      style: 'minimal',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73a6e?w=800&h=600&fit=crop&q=80&auto=format',
      fallbackImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80&auto=format',
      badge: 'Instant Booking',
    },
    {
      id: 'cuscoperu',
      name: 'CuscoPeru.com',
      description: 'Official tours and travel packages for Cusco and Machu Picchu',
      url: 'https://www.cuscoperu.com/en/tours/cusco/',
      logo: '/logos/cuscoperu.png',
      highlight: false,
      style: 'image',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80&auto=format',
      fallbackImage: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop&q=80&auto=format',
      badge: 'Official',
    },
    {
      id: 'viator',
      name: 'Viator',
      description: 'Find and book the best tours, activities and experiences in Cusco',
      url: 'https://www.viator.com/es-ES/Cusco/d937-ttd',
      logo: '/logos/viator.png',
      highlight: false,
      style: 'minimal',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&q=80&auto=format',
      fallbackImage: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop&q=80&auto=format',
      badge: 'Best Deals',
    },
    {
      id: 'getyourguide',
      name: 'GetYourGuide',
      description: 'Skip the line tickets and tours for Cusco attractions',
      url: 'https://www.getyourguide.com/-l359/-tc1/?cmp=ga&campaign_id=6774521688&adgroup_id=80243578055&target_id=kwd-245910889&loc_physical_ms=20023&match_type=e&ad_id=778638788158&keyword=tours%20cusco&ad_position=&feed_item_id=&placement=&device=c&assetgroup_id=&partner_id=CD951&gad_source=1&gad_campaignid=6774521688&gbraid=0AAAAADmzJCPW4QQSUawscYS6O81w6VCoy&gclid=CjwKCAiAjc7KBhBvEiwAE2BDOazybvu9lH6lLYwA5Eo-M24T4FPvdujBihJjD3rKh_W1J0MznplfQBoCtn0QAvD_BwE',
      logo: '/logos/getyourguide.png',
      highlight: false,
      style: 'hero',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=800&fit=crop&q=80&auto=format',
      fallbackImage: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200&h=800&fit=crop&q=80&auto=format',
      badge: 'Skip the Line',
    },
  ];

  return (
    <div className={styles.page}>
      <Hero title={config.title} subtitle={config.subtitle} backgroundImage={config.image} />

      {/* Tour Platforms Section for Tours & Activities */}
      {isToursActivities && (
        <section className={styles.section} style={{ background: '#f9fafb' }}>
          <div className={styles.sectionContainer}>
            <SectionHeader
              title="Tours - Cusco & Surroundings"
              description="Book your perfect tour with our trusted partners. Compare prices and read reviews from thousands of travelers."
            />
            <div className={styles.tourPlatformsGrid}>
              {tourPlatforms.map((platform) => {
                const cardClass = platform.style === 'hero' 
                  ? styles.tourPlatformCardHero 
                  : platform.style === 'minimal'
                  ? styles.tourPlatformCardMinimal
                  : styles.tourPlatformCardImage;
                
                return (
                  <a
                    key={platform.id}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cardClass} ${platform.highlight ? styles.tourPlatformCardHighlight : ''}`}
                    style={platform.style === 'hero' ? {
                      backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%), url(${platform.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    } : {}}
                  >
                    {platform.style === 'hero' && (
                      <>
                        <img
                          src={platform.image}
                          alt=""
                          className={styles.tourPlatformHeroBgImage}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (platform.fallbackImage && target.src !== platform.fallbackImage) {
                              target.src = platform.fallbackImage;
                            } else {
                              target.style.display = 'none';
                            }
                          }}
                        />
                        <div className={styles.tourPlatformHeroOverlay} />
                        <div className={styles.tourPlatformHeroContent}>
                          {platform.badge && (
                            <span className={styles.tourPlatformBadge} style={{ background: platform.color || '#006ce4' }}>
                              {platform.badge}
                            </span>
                          )}
                          <div className={styles.tourPlatformHeroLogo}>
                            <img
                              src={platform.logo}
                              alt={`${platform.name} logo`}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.style.display = 'none';
                                }
                              }}
                            />
                          </div>
                          <h3 className={styles.tourPlatformHeroName}>{platform.name}</h3>
                          <p className={styles.tourPlatformHeroDescription}>{platform.description}</p>
                          <span className={styles.tourPlatformHeroLink}>
                            Explore Tours →
                          </span>
                        </div>
                      </>
                    )}

                    {platform.style === 'image' && (
                      <>
                        <div className={styles.tourPlatformImageWrapper}>
                          <img 
                            src={platform.image} 
                            alt={platform.name} 
                            className={styles.tourPlatformImage}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              if (platform.fallbackImage && target.src !== platform.fallbackImage) {
                                target.src = platform.fallbackImage;
                              } else {
                                target.style.display = 'none';
                              }
                            }}
                          />
                          <div className={styles.tourPlatformImageOverlay} />
                          {platform.badge && (
                            <span className={styles.tourPlatformBadge}>
                              {platform.badge}
                            </span>
                          )}
                        </div>
                        <div className={styles.tourPlatformImageContent}>
                          <div className={styles.tourPlatformImageLogo}>
                            <img
                              src={platform.logo}
                              alt={`${platform.name} logo`}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.style.display = 'none';
                                }
                              }}
                            />
                          </div>
                          <h3 className={styles.tourPlatformImageName}>{platform.name}</h3>
                          <p className={styles.tourPlatformImageDescription}>{platform.description}</p>
                          <span className={styles.tourPlatformImageLink}>
                            View Tours →
                          </span>
                        </div>
                      </>
                    )}

                    {platform.style === 'minimal' && (
                      <>
                        <div className={styles.tourPlatformMinimalHeader}>
                          <div className={styles.tourPlatformMinimalLogo}>
                            <img
                              src={platform.logo}
                              alt={`${platform.name} logo`}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.style.display = 'none';
                                }
                              }}
                            />
                          </div>
                          {platform.badge && (
                            <span className={styles.tourPlatformMinimalBadge}>
                              {platform.badge}
                            </span>
                          )}
                        </div>
                        <div className={styles.tourPlatformMinimalContent}>
                          <h3 className={styles.tourPlatformMinimalName}>{platform.name}</h3>
                          <p className={styles.tourPlatformMinimalDescription}>{platform.description}</p>
                        </div>
                        <div className={styles.tourPlatformMinimalImage}>
                          <img 
                            src={platform.image} 
                            alt={platform.name}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              if (platform.fallbackImage && target.src !== platform.fallbackImage) {
                                target.src = platform.fallbackImage;
                              } else {
                                target.style.display = 'none';
                              }
                            }}
                          />
                        </div>
                        <span className={styles.tourPlatformMinimalLink}>
                          Book Now →
                        </span>
                      </>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Transportation Section - Trains to Machu Picchu */}
      {isTransportation && (
        <>
          {/* Hero Intro with Background */}
          <section className={styles.transportHero}>
            <img 
              src="https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1920&h=1080&fit=crop&q=80" 
              alt="Train to Machu Picchu" 
              className={styles.transportHeroBg}
            />
            <div className={styles.transportHeroOverlay} />
            <div className={styles.transportHeroContent}>
              <span className={styles.transportHeroEyebrow}>🚂 The Journey</span>
              <h1 className={styles.transportHeroTitle}>
                Trains to<br />Machu Picchu
              </h1>
              <p className={styles.transportHeroSubtitle}>
                Experience one of the world's most scenic train journeys through the Sacred Valley
              </p>
              <div className={styles.transportHeroStats}>
                <div className={styles.transportHeroStat}>
                  <span className={styles.transportHeroStatNumber}>3-4h</span>
                  <span className={styles.transportHeroStatLabel}>Journey Time</span>
                </div>
                <div className={styles.transportHeroStatDivider} />
                <div className={styles.transportHeroStat}>
                  <span className={styles.transportHeroStatNumber}>2</span>
                  <span className={styles.transportHeroStatLabel}>Train Companies</span>
                </div>
                <div className={styles.transportHeroStatDivider} />
                <div className={styles.transportHeroStat}>
                  <span className={styles.transportHeroStatNumber}>8+</span>
                  <span className={styles.transportHeroStatLabel}>Service Classes</span>
                </div>
              </div>
            </div>
          </section>

          {/* Important Notice - Floating Style */}
          <section className={styles.transportNoticeSection}>
            <div className={styles.sectionContainer}>
              <div className={styles.transportNotice}>
                <div className={styles.transportNoticeIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <div className={styles.transportNoticeContent}>
                  <h4>Book in Advance</h4>
                  <p>Secure train tickets and Machu Picchu entrance tickets <strong>weeks or months in advance</strong>, especially during peak season (May-October).</p>
                </div>
              </div>
            </div>
          </section>

          {/* Departure Points - Visual Cards */}
          <section className={styles.section}>
            <div className={styles.sectionContainer}>
              <div className={styles.transportSectionHeader}>
                <span className={styles.transportSectionNumber}>01</span>
                <div>
                  <h3 className={styles.transportSectionTitle}>Choose Your Departure</h3>
                  <p className={styles.transportSectionDesc}>Select your boarding point based on your itinerary</p>
                </div>
              </div>

              <div className={styles.transportDepartureGrid}>
                {trainDeparturePoints.map((point, index) => (
                  <div 
                    key={point.id} 
                    className={`${styles.transportDepartureCard} ${point.highlight ? styles.transportDepartureCardHighlight : ''}`}
                  >
                    <div className={styles.transportDepartureCardInner}>
                      {point.highlight && (
                        <span className={styles.transportDepartureBadge}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          Recommended
                        </span>
                      )}
                      <span className={styles.transportDepartureIndex}>0{index + 1}</span>
                      <h4>{point.name}</h4>
                      <p>{point.description}</p>
                      <div className={styles.transportDepartureStations}>
                        <span className={styles.transportDepartureStationsLabel}>Stations:</span>
                        {point.stations.map((station) => (
                          <span key={station} className={styles.transportDepartureStation}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <circle cx="12" cy="12" r="8"/>
                            </svg>
                            {station}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Train Companies - Premium Cards */}
          <section className={styles.transportTrainsSection}>
            <div className={styles.sectionContainer}>
              <div className={styles.transportSectionHeader}>
                <span className={styles.transportSectionNumber}>02</span>
                <div>
                  <h3 className={styles.transportSectionTitle}>Select Your Train</h3>
                  <p className={styles.transportSectionDesc}>From budget-friendly to ultra-luxury experiences</p>
                </div>
              </div>

              <div className={styles.transportTrainsGrid}>
                {trainCompanies.map((company, companyIndex) => (
                  <div key={company.id} className={styles.transportTrainCard}>
                    <div className={styles.transportTrainHeader}>
                      <img src={company.image} alt={company.name} />
                      <div className={styles.transportTrainHeaderOverlay}>
                        <span className={styles.transportTrainBadge}>{companyIndex === 0 ? 'Most Options' : 'Most Popular'}</span>
                        <h4>{company.name}</h4>
                        <p>{company.tagline}</p>
                      </div>
                    </div>
                    
                    <div className={styles.transportTrainBody}>
                      <div className={styles.transportTrainOptions}>
                        {company.options.map((option, optIndex) => (
                          <div 
                            key={option.name} 
                            className={`${styles.transportTrainOption} ${optIndex === company.options.length - 1 ? styles.transportTrainOptionLuxury : ''}`}
                          >
                            <div className={styles.transportTrainOptionLeft}>
                              <span className={styles.transportTrainOptionName}>{option.name}</span>
                              <span className={`${styles.transportTrainOptionType} ${styles[`transportTrainOptionType${option.type.replace(/[^a-zA-Z]/g, '')}`]}`}>
                                {option.type}
                              </span>
                            </div>
                            <div className={styles.transportTrainOptionFeatures}>
                              {option.features.slice(0, 2).map((feature) => (
                                <span key={feature}>{feature}</span>
                              ))}
                              {option.features.length > 2 && (
                                <span className={styles.transportTrainOptionMore}>+{option.features.length - 2} more</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <a 
                        href={company.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.transportTrainLink}
                      >
                        <span>Book on {company.name}</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className={styles.transportCTA}>
            <div className={styles.sectionContainer}>
              <div className={styles.transportCTAContent}>
                <div className={styles.transportCTAText}>
                  <h3>Ready to Book?</h3>
                  <p>Compare prices and schedules on the official websites</p>
                </div>
                <div className={styles.transportCTAButtons}>
                  <a href="https://incarail.com/en" target="_blank" rel="noopener noreferrer" className={styles.transportCTABtn}>
                    <span>Inca Rail</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                  <a href="https://www.perurail.com/" target="_blank" rel="noopener noreferrer" className={styles.transportCTABtn}>
                    <span>PeruRail</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Eat & Drink Sections - Airbnb Style Layout */}
      {isEatDrink && (
        <>
          {/* Hero Intro Text */}
          <section className={styles.eatDrinkIntro}>
            <div className={styles.sectionContainer}>
              <p className={styles.eatDrinkIntroEyebrow}>Culinary Guide</p>
              <h2 className={styles.eatDrinkIntroTitle}>
                From street markets to fine dining, Cusco's food scene is a journey through Peru's rich flavors
              </h2>
              <p className={styles.eatDrinkIntroSubtitle}>
                Whether you're craving traditional Andean dishes, world-class Nikkei fusion, or a perfectly brewed specialty coffee — we've got you covered.
              </p>
            </div>
          </section>

          {/* Featured: Mercado San Pedro */}
          <section className={styles.section} style={{ paddingTop: 0 }}>
            <div className={styles.sectionContainer}>
              <div className={styles.eatDrinkFeatured}>
                <div className={styles.eatDrinkFeaturedImage}>
                  <img 
                    src="https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=1200&h=800&fit=crop&q=80" 
                    alt="Mercado San Pedro" 
                  />
                  <span className={styles.eatDrinkFeaturedBadge}>Must Visit</span>
                </div>
                <div className={styles.eatDrinkFeaturedContent}>
                  <p className={styles.eatDrinkFeaturedEyebrow}>Local Experience</p>
                  <h3 className={styles.eatDrinkFeaturedTitle}>Mercado San Pedro</h3>
                  <p className={styles.eatDrinkFeaturedDesc}>
                    Where all of Cusco comes to eat. Walk through the aisles and every vendor will vie for your attention. From fresh juices to ceviche, empanadas to roasted meats — this is Cusco's beating heart.
                  </p>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Mercado+San+Pedro+Cusco" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.eatDrinkFeaturedLink}
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Divider Quote */}
          <div className={styles.eatDrinkQuote}>
            <blockquote>
              "Peruvian cuisine is not just food — it's history, culture, and passion on a plate."
            </blockquote>
          </div>

          {/* Traditional Section */}
          <section className={styles.section}>
            <div className={styles.sectionContainer}>
              <div className={styles.eatDrinkSectionIntro}>
                <h3 className={styles.eatDrinkSectionTitle}>Locals & Traditional Food</h3>
                <p className={styles.eatDrinkSectionDesc}>
                  Authentic Cusqueñan flavors. These are the places where locals eat — from grandma's recipes to organic farm-to-table experiences.
                </p>
              </div>
              
              <div className={styles.eatDrinkCardsGrid}>
                {eatDrinkPlaces.traditional.slice(1, 6).map((place) => (
                  <div key={place.id} className={styles.eatDrinkCard}>
                    <h4 className={styles.eatDrinkCardTitle}>{place.name}</h4>
                    <p className={styles.eatDrinkCardDesc}>{place.description}</p>
                    <span className={styles.eatDrinkCardLocation}>📍 {place.location}</span>
                  </div>
                ))}
              </div>

              {/* Simple list for remaining */}
              <div className={styles.eatDrinkSimpleList}>
                <p className={styles.eatDrinkSimpleListTitle}>More traditional spots:</p>
                <div className={styles.eatDrinkSimpleListItems}>
                  {eatDrinkPlaces.traditional.slice(6).map((place) => (
                    <span key={place.id} className={styles.eatDrinkSimpleListItem}>
                      <strong>{place.name}</strong> — {place.description}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Casual Restaurants */}
          <section className={styles.section} style={{ background: '#fafaf9' }}>
            <div className={styles.sectionContainer}>
              <div className={styles.eatDrinkSectionIntro}>
                <h3 className={styles.eatDrinkSectionTitle}>Casual Restaurants</h3>
                <p className={styles.eatDrinkSectionDesc}>
                  Relaxed vibes, delicious food. Perfect for a laid-back meal with friends.
                </p>
              </div>
              
              <div className={styles.eatDrinkCardsRow}>
                {eatDrinkPlaces.casual.map((place) => (
                  <div key={place.id} className={styles.eatDrinkCardCompact}>
                    <h4 className={styles.eatDrinkCardCompactTitle}>{place.name}</h4>
                    <p className={styles.eatDrinkCardCompactDesc}>{place.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Fine Dining Feature */}
          <section className={styles.section}>
            <div className={styles.sectionContainer}>
              <div className={styles.eatDrinkSectionIntro}>
                <h3 className={styles.eatDrinkSectionTitle}>Fine Dining</h3>
                <p className={styles.eatDrinkSectionDesc}>
                  World-class gastronomy in the heart of the Andes. Nikkei fusion, haute Peruvian, and unforgettable tasting menus.
                </p>
              </div>

              {/* Chicha Featured */}
              <div className={styles.eatDrinkFeaturedAlt}>
                <div className={styles.eatDrinkFeaturedAltContent}>
                  <span className={styles.eatDrinkFeaturedAltBadge}>Chef's Pick</span>
                  <h4 className={styles.eatDrinkFeaturedAltTitle}>Chicha</h4>
                  <p className={styles.eatDrinkFeaturedAltDesc}>
                    Haute Peruvian cuisine by famous Limeñian chef Gaston Acurio. A must-visit for anyone serious about Peruvian gastronomy.
                  </p>
                </div>
                <div className={styles.eatDrinkFeaturedAltImage}>
                  <img 
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&q=80" 
                    alt="Fine Dining" 
                  />
                </div>
              </div>

              {/* Rest of fancy restaurants */}
              <div className={styles.eatDrinkCardsGrid}>
                {eatDrinkPlaces.fancy.filter(p => p.id !== 'chicha').slice(0, 6).map((place) => (
                  <div key={place.id} className={styles.eatDrinkCard}>
                    <h4 className={styles.eatDrinkCardTitle}>{place.name}</h4>
                    <p className={styles.eatDrinkCardDesc}>{place.description}</p>
                  </div>
                ))}
              </div>

              <div className={styles.eatDrinkSimpleList}>
                <p className={styles.eatDrinkSimpleListTitle}>Also worth trying:</p>
                <div className={styles.eatDrinkSimpleListItems}>
                  {eatDrinkPlaces.fancy.filter(p => p.id !== 'chicha').slice(6).map((place) => (
                    <span key={place.id} className={styles.eatDrinkSimpleListItem}>
                      <strong>{place.name}</strong> — {place.description}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Coffee Section */}
          <section className={styles.eatDrinkCoffeeSection}>
            <div className={styles.sectionContainer}>
              <div className={styles.eatDrinkCoffeeHeader}>
                <div className={styles.eatDrinkCoffeeText}>
                  <p className={styles.eatDrinkCoffeeEyebrow}>Coffee Lovers</p>
                  <h3 className={styles.eatDrinkCoffeeTitle}>Great Coffee Shops</h3>
                  <p className={styles.eatDrinkCoffeeDesc}>
                    Peru grows some of the world's best coffee. These spots take it seriously.
                  </p>
                </div>
                
                {/* Three Monkeys Featured */}
                <div className={styles.eatDrinkCoffeeFeature}>
                  <span className={styles.eatDrinkCoffeeBadge}>#22 World's Best</span>
                  <h4>Three Monkeys</h4>
                  <p>Sprudge Design Awards 2025. A menu of locally grown coffees that reads like a wine menu.</p>
                </div>
              </div>

              <div className={styles.eatDrinkCoffeeGrid}>
                {eatDrinkPlaces.coffee.filter(p => p.id !== 'three-monkeys').map((place) => (
                  <div key={place.id} className={styles.eatDrinkCoffeeCard}>
                    <h4>{place.name}</h4>
                    <p>{place.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Drinks Section */}
          <section className={styles.section}>
            <div className={styles.sectionContainer}>
              <div className={styles.eatDrinkSectionIntro}>
                <h3 className={styles.eatDrinkSectionTitle}>Bars & Nightlife</h3>
                <p className={styles.eatDrinkSectionDesc}>
                  From craft beer taprooms to speakeasies and rooftop terraces — Cusco knows how to have a good time.
                </p>
              </div>

              {/* Garibaldi Featured */}
              <div className={styles.eatDrinkDrinksFeatured}>
                <img 
                  src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1000&h=600&fit=crop&q=80" 
                  alt="Garibaldi Cocktail Bar" 
                />
                <div className={styles.eatDrinkDrinksFeaturedOverlay}>
                  <span className={styles.eatDrinkDrinksFeaturedBadge}>Best Cocktails</span>
                  <h4>Garibaldi Cocktail Bar</h4>
                  <p>Cusco's best mixologists. 5pm-midnight, closed Sunday.</p>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Garibaldi+Cocktail+Bar+Calle+Maruri+320+Cusco" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Calle Maruri 320 →
                  </a>
                </div>
              </div>

              {/* Drinks grid */}
              <div className={styles.eatDrinkDrinksGrid}>
                {eatDrinkPlaces.drinks.filter(p => p.id !== 'garibaldi').slice(0, 8).map((place) => (
                  <div key={place.id} className={styles.eatDrinkDrinksCard}>
                    <div className={styles.eatDrinkDrinksCardHeader}>
                      <h4>{place.name}</h4>
                      {place.mapUrl && (
                        <a href={place.mapUrl} target="_blank" rel="noopener noreferrer">Map</a>
                      )}
                    </div>
                    <p>{place.description}</p>
                    <span className={styles.eatDrinkDrinksCardLoc}>{place.location}</span>
                  </div>
                ))}
              </div>

              {/* More bars list */}
              <div className={styles.eatDrinkSimpleList}>
                <p className={styles.eatDrinkSimpleListTitle}>More places to drink:</p>
                <div className={styles.eatDrinkSimpleListItems}>
                  {eatDrinkPlaces.drinks.filter(p => p.id !== 'garibaldi').slice(8).map((place) => (
                    <span key={place.id} className={styles.eatDrinkSimpleListItem}>
                      <strong>{place.name}</strong> — {place.description} ({place.location})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className={styles.mapSection}>
            <div className={styles.sectionContainer}>
              <SectionHeader
                title="Explore All Places on Map"
                description="Find restaurants, cafes and bars across Cusco."
              />
              <div className={styles.mapContainer}>
                <div className={styles.mapInner}>
                  <iframe
                    src={wanderlogUrl}
                    title="Best Bars and Drinks in Cusco Map"
                    className={styles.mapIframe}
                    allowFullScreen
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                  />
                  <div className={styles.blogOverlay} />
                </div>
                <div className={styles.mapFallback}>
                  <a
                    href={wanderlogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mapLink}
                  >
                    View map on Wanderlog →
                  </a>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {!isToursActivities && !isEatDrink && !isTransportation && (
        <section className={styles.section}>
          <div className={styles.sectionContainer}>
            <SectionHeader
              title={`${experiences.length} options available`}
              description="Browse our curated selection and find the perfect experience for you."
            />

            {experiences.length > 0 ? (
              <div className={styles.grid}>
                {experiences.map((experience) => (
                  <Card key={experience.id} experience={experience} />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p className={styles.emptyStateText}>No experiences available in this category yet.</p>
                <p className={styles.emptyStateSubtext}>Check back soon for updates!</p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
