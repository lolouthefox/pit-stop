const deliveryAddresses = [
	{
		name: 'Jardin',
		addresses: [
			{ value: 'JARDIN Piscine', name: 'Piscine', img: '/rooms/floorplan-0-pool.svg' },
			{ value: 'JARDIN Terrasse', name: 'Terrasse', img: '/rooms/floorplan-0-terrasse.svg' },
			{ value: 'JARDIN Pelouse', name: 'Pelouse', img: '/rooms/floorplan-0-pelouse.svg' }
		]
	},
	{
		name: 'Rez-de-Chaussée',
		addresses: [
			{ value: 'RDC Cuisine', name: 'Cuisine', img: '/rooms/floorplan-0-kitchen.svg' },
			{ value: 'RDC Salon', name: 'Salon', img: '/rooms/floorplan-0-living-room.svg' },
			{
				value: 'RDC Salle à Manger',
				name: 'Salle à Manger',
				img: '/rooms/floorplan-0-dining-room.svg'
			},
			{ value: 'RDC Bureau', name: 'Bureau', img: '/rooms/floorplan-0-bureau.svg' },
			{ value: 'RDC Salle de Bain', name: 'Salle de Bain', img: '/rooms/floorplan-0-bathroom.svg' },
			{ value: 'RDC Studio', name: 'Studio', img: '/rooms/floorplan-0-studio.svg' },
			{ value: 'RDC Verranda', name: 'Verranda', img: '/rooms/floorplan-0-verranda.svg' }
		]
	},
	{
		name: '1er Étage',
		addresses: [
			{ value: '1ER Chambre Jess', name: 'Chambre Jess', img: '/rooms/floorplan-1-jess.svg' },
			{ value: '1ER Garde-robe', name: 'Garde-robe', img: '/rooms/floorplan-1-dressing-room.svg' },
			{ value: '1ER Chambre Marido', name: 'Chambre Marido', img: '/rooms/floorplan-1-marido.svg' }
		]
	},
	{
		name: '2em Étage',
		addresses: [
			{ value: '2EM Chambre Liam', name: 'Chambre Liam', img: '/rooms/floorplan-2-liam.svg' },
			{
				value: '2EM Chambre Rom & Nad',
				name: 'Chambre Rom & Nad',
				img: '/rooms/floorplan-2-rom-nad.svg'
			},
			{ value: '2EM Salle de Bain', name: 'Salle de Bain', img: '/rooms/floorplan-2-bathroom.svg' }
		]
	},
	{
		name: '3em Étage',
		addresses: [
			{ value: '3EM Salon', name: 'Salon', img: '/rooms/floorplan-3-living-room.svg' },
			{ value: '3EM Studio', name: 'Studio', img: '/rooms/floorplan-3-studio.svg' }
		]
	}
];

export default deliveryAddresses;

export function getImageFromValue(value: string): string | undefined {
	for (const floor of deliveryAddresses) {
		for (const address of floor.addresses) {
			if (address.value === value) {
				return address.img;
			}
		}
	}
	return undefined;
}
