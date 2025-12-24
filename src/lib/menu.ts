export enum MenuCategory {
    Drinks = 'Boissons',
    Breakfast = 'Petit Déjeuner',
    Snacks = 'Snacks',
    Gouter = 'Goûter'
}

export type MenuItem = {
    id: string;
    name: string;
    price: number;
    category: string;

    desc: string;
    image: string;
};

// Menu is now loaded from the database, not static
export const menu: MenuItem[] = [
    {
        id: 'jus-orange-pressée',
        name: 'Orange Fraîchement Pressée',
        price: 3,
        desc: "Jus d'orange fraîchement pressé pour bien commencer la journée !",
        image: '/assets/orange.webp',
        category: MenuCategory.Breakfast
    },
    {
        id: 'espresso',
        name: 'Espresso',
        price: 3,
        desc: "Un espresso fort et aromatique pour bien démarrer la journée.",
        image: '/assets/espresso.webp',
        category: MenuCategory.Breakfast
    },
    {
        id: 'cappuccino',
        name: 'Cappuccino',
        price: 3,
        desc: "Un cappuccino crémeux avec une mousse de lait onctueuse.",
        image: '/assets/cappuccino.webp',
        category: MenuCategory.Breakfast
    },
    {
        id: 'hot-chocolate',
        name: 'Chocolat Chaud Milka',
        price: 3,
        desc: "Un chocolat chaud riche et crémeux, parfait pour se réchauffer.",
        image: '/assets/hot-chocolate.webp',
        category: MenuCategory.Breakfast
    },
    {
        id: 'ice-tea-pêche',
        name: 'Ice Tea Pêche',
        price: 2,
        desc: "Rafraîchissant ice tea à la pêche, parfait pour une pause sucrée.",
        image: '/assets/ice-tea.webp',
        category: MenuCategory.Drinks
    },
    {
        id: 'coca-cola',
        name: 'Coca Cola',
        price: 2,
        desc: "Le classique Coca Cola, toujours aussi délicieux.",
        image: '/assets/coke.webp',
        category: MenuCategory.Drinks
    },
    {
        id: 'coca-cola-zero',
        name: 'Coca Cola Zero',
        price: 2,
        desc: "Le classique Coca Cola Zero, toujours aussi délicieux.",
        image: '/assets/coke-zero.webp',
        category: MenuCategory.Drinks
    },
    {
        id: 'orangina',
        name: 'Orangina',
        price: 2,
        desc: "Boisson pétillante à l'orange avec des morceaux de pulpe.",
        image: '/assets/orangina.webp',
        category: MenuCategory.Drinks
    },
    {
        id: 'sprite',
        name: 'Sprite',
        price: 2,
        desc: "Boisson gazeuse au citron-lime, idéale pour se rafraîchir.",
        image: '/assets/sprite.webp',
        category: MenuCategory.Drinks
    },
    {
        id: 'eau-plate',
        name: 'Eau Plate',
        price: 0.5,
        desc: "Eau plate fraîche et pure, idéale pour s'hydrater.",
        image: '/assets/water.webp',
        category: MenuCategory.Drinks
    },
    {
        id: 'eau-gazeuse',
        name: 'Eau Gazeuse',
        price: 0.75,
        desc: "Eau gazeuse fraîche et pétillante, idéale pour s'hydrater avec une touche de bulles.",
        image: '/assets/sparkle.webp',
        category: MenuCategory.Drinks
    },
    {
        id: 'brownie-chocolat',
        name: 'Brownie Chocolat',
        price: 3,
        desc: "Délicieux brownie au chocolat, parfait pour une pause gourmande.",
        image: '/assets/brownie.webp',
        category: MenuCategory.Gouter
    },
    {
        id: 'mini-cookies',
        name: 'Mini Cookies',
        price: 4,
        desc: "Petits cookies délicieux, parfaits pour une pause sucrée.",
        image: '/assets/cookies.webp',
        category: MenuCategory.Gouter
    },
    {
        id: 'burger-special',
        name: 'Burger Spécial',
        price: 12,
        desc: "Burger spécial confectionné avec 2 chips, de la sauce, de la salade et du fromage.",
        image: '/assets/burger.webp',
        category: MenuCategory.Snacks
    },
    // {
    //     id: 'pizza-margherita',
    //     name: 'Pizza Margherita',
    //     price: 9.5,
    //     desc: "Pizza Margherita avec ingrédients frais et savoureux.",
    //     image: '/assets/pizza.webp',
    //     category: MenuCategory.Snacks
    // },
    {
        id: 'crepe-whaou',
        name: 'Crêpe Whaou',
        price: 5,
        desc: "Délicieuse crêpe avec garnitures au choix, parfaite pour une pause gourmande.",
        image: '/assets/whaou.webp',
        category: MenuCategory.Gouter
    },
    {
        id: 'bn-fraise',
        name: 'BN Fraise',
        price: 3,
        desc: "Délicieux BN à la fraise.",
        image: '/assets/bn-fr.webp',
        category: MenuCategory.Gouter
    },
    {
        id: 'bn-chocolat',
        name: 'BN Chocolat',
        price: 3,
        desc: "Délicieux BN au chocolat.",
        image: '/assets/bn-ch.webp',
        category: MenuCategory.Gouter
    },
    {
        id: 'roule-fraise',
        name: 'Roulé Fraise',
        price: 2,
        desc: "Délicieux roulé à la fraise.",
        image: '/assets/roule-fr.webp',
        category: MenuCategory.Gouter
    },
    {
        id: 'ourson-fraise',
        name: 'Ourson Fraise',
        price: 2,
        desc: "Délicieux ourson à la fraise.",
        image: '/assets/lulu.webp',
        category: MenuCategory.Gouter
    },
    {
        id: 'pepito-chocolat',
        name: 'Pépito Chocolat',
        price: 2,
        desc: "Délicieux Pépito au chocolat.",
        image: '/assets/pepito.webp',
        category: MenuCategory.Gouter
    },
    // {
    //     id: 'ferrero-rocher',
    //     name: 'Ferrero Rocher',
    //     price: 2,
    //     desc: "Délicieux Ferrero Rocher.",
    //     image: '/assets/ferrero.webp',
    //     category: MenuCategory.Snacks
    // },
    {
        id: 'papillote-chocolat',
        name: 'Papillote Chocolat',
        price: 1.5,
        desc: "Délicieuse papillote au chocolat.",
        image: '/assets/papillote.webp',
        category: MenuCategory.Snacks
    },
    {
        id: 'papillote-guimauve',
        name: 'Papillote Guimauve',
        price: 1.5,
        desc: "Délicieuse papillote au coeur guimauve.",
        image: '/assets/papillote-gui.jpg',
        category: MenuCategory.Snacks
    },
];
