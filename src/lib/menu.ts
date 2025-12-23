export type MenuItem = {
    id: string;
    name: string;
    price: number;
    desc?: string;
    image?: string;
};

export const menu: MenuItem[] = [
    { id: 'burger', name: 'Classic Burger', price: 5.99, desc: 'Beef patty, cheese, lettuce, tomato', image: '/default.jpg' },
    { id: 'cheeseburger', name: 'Cheeseburger', price: 6.99, desc: 'Classic with extra cheese', image: '/default.jpg' },
    { id: 'fries', name: 'French Fries', price: 2.49, desc: 'Crispy salted fries', image: '/default.jpg' },
    { id: 'nuggets', name: 'Chicken Nuggets', price: 3.99, desc: '6 pcs with dip', image: '/default.jpg' },
    { id: 'cola', name: 'Cola', price: 1.5, desc: 'Cold soda', image: '/default.jpg' }
];
