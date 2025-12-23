export type MenuItem = {
    id: string;
    name: string;
    price: number;

    desc?: string;
    image?: string;
};

export const menu: MenuItem[] = [
    {
        id: 'jus-orange-pressée',
        name: 'Orange Fraîchement Pressée',
        price: 3,
        desc: "Jus d'orange fraîchement pressé pour bien commencer la journée !",
        image: '/assets/orange.jpg'
    },
    {
        id: 'ice-tea-pêche',
        name: 'Ice Tea Pêche',
        price: 2,
        desc: "Rafraîchissant ice tea à la pêche, parfait pour une pause sucrée.",
        image: '/assets/ice-tea.jpg'
    },
    {
        id: 'coca-cola',
        name: 'Coca Cola',
        price: 2,
        desc: "Le classique Coca Cola, toujours aussi délicieux.",
        image: '/assets/coke.webp'
    },
    {
        id: 'coca-cola-zero',
        name: 'Coca Cola Zero',
        price: 2,
        desc: "Le classique Coca Cola Zero, toujours aussi délicieux.",
        image: '/assets/coke-zero.webp'
    },
    {
        id: 'orangina',
        name: 'Orangina',
        price: 2,
        desc: "Boisson pétillante à l'orange avec des morceaux de pulpe.",
        image: '/assets/orangina.webp'
    },
    {
        id: 'sprite',
        name: 'Sprite',
        price: 2,
        desc: "Boisson gazeuse au citron-lime, idéale pour se rafraîchir.",
        image: '/assets/sprite.jpeg'
    },
    {
        id: 'eau-plate',
        name: 'Eau Plate',
        price: 0.5,
        desc: "Eau plate fraîche et pure, idéale pour s'hydrater.",
        image: '/assets/water.jpg'
    },
    {
        id: 'eau-gazeuse',
        name: 'Eau Gazeuse',
        price: 0.75,
        desc: "Eau gazeuse fraîche et pétillante, idéale pour s'hydrater avec une touche de bulles.",
        image: '/assets/sparkle.webp'
    },
    {
        id: 'brownie-chocolat',
        name: 'Brownie Chocolat',
        price: 3,
        desc: "Délicieux brownie au chocolat, parfait pour une pause gourmande.",
        image: '/assets/brownie.jpg'
    },
    {
        id: 'mini-cookies',
        name: 'Mini Cookies',
        price: 4,
        desc: "Petits cookies délicieux, parfaits pour une pause sucrée.",
        image: '/assets/cookies.webp'
    },
    {
        id: 'burger-special',
        name: 'Burger Spécial',
        price: 12,
        desc: "Burger spécial avec ingrédients frais et savoureux. AVEC CADEAU !",
        image: '/assets/burger.webp'
    },
    {
        id: 'pizza-margherita',
        name: 'Pizza Margherita',
        price: 9.5,
        desc: "Pizza Margherita avec ingrédients frais et savoureux.",
        image: '/assets/pizza.jpg'
    },
    {
        id: 'crepe-whaou',
        name: 'Crêpe Whaou',
        price: 5,
        desc: "Délicieuse crêpe avec garnitures au choix, parfaite pour une pause gourmande.",
        image: '/assets/whaou.jpeg'
    },
    {
        id: 'bn-fraise',
        name: 'BN Fraise',
        price: 3,
        desc: "Délicieux BN à la fraise.",
        image: '/assets/bn-fr.webp'
    },
    {
        id: 'bn-chocolat',
        name: 'BN Chocolat',
        price: 3,
        desc: "Délicieux BN au chocolat.",
        image: '/assets/bn-ch.png'
    },
    {
        id: 'roule-fraise',
        name: 'Roulé Fraise',
        price: 2,
        desc: "Délicieux roulé à la fraise.",
        image: '/assets/roule-fr.webp'
    },
    {
        id: 'ourson-fraise',
        name: 'Ourson Fraise',
        price: 2,
        desc: "Délicieux ourson à la fraise.",
        image: '/assets/lulu.jpg'
    },
    {
        id: 'pepito-chocolat',
        name: 'Pépito Chocolat',
        price: 2,
        desc: "Délicieux Pépito au chocolat.",
        image: '/assets/pepito.jpg'
    },
    {
        id: 'ferrero-rocher',
        name: 'Ferrero Rocher',
        price: 2,
        desc: "Délicieux Ferrero Rocher.",
        image: '/assets/ferrero.avif'
    },
    {
        id: 'papillote-chocolat',
        name: 'Papillote Chocolat',
        price: 1.5,
        desc: "Délicieuse papillote au chocolat.",
        image: '/assets/papillote.jpg'
    },
];
