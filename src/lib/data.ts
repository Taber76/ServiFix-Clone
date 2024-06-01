export const allServices = [
    {
        "id": 1,
        "name": "Electrician",
        "description": "Electrical installation and repair services.",
        "url_image": "https://i.imgur.com/DOBR5JJ.png",
        "createdAt": "2024-05-24T13:38:32.234Z",
        "updatedAt": "2024-05-24T13:38:32.234Z"
    },
    {
        "id": 2,
        "name": "Plumber",
        "description": "Plumbing services and pipe repair.",
        "url_image": "https://i.imgur.com/YSrURLz.png",
        "createdAt": "2024-05-24T13:40:29.692Z",
        "updatedAt": "2024-05-24T13:40:29.692Z"
    },
    {
        "id": 3,
        "name": "Moving",
        "description": "Transportation and moving services.",
        "url_image": "https://i.imgur.com/3OvShwu.png",
        "createdAt": "2024-05-24T13:41:06.420Z",
        "updatedAt": "2024-05-24T13:41:06.420Z"
    },
    {
        "id": 4,
        "name": "Gardening",
        "description": "Garden maintenance and design.",
        "url_image": "https://i.imgur.com/EbThbZM.png",
        "createdAt": "2024-05-24T13:41:45.062Z",
        "updatedAt": "2024-05-24T13:41:45.062Z"
    },
    {
        "id": 5,
        "name": "House Cleaning",
        "description": "Cleaning services for homes and offices.",
        "url_image": "https://i.imgur.com/054xUyX.png",
        "createdAt": "2024-05-24T13:42:18.918Z",
        "updatedAt": "2024-05-24T13:42:18.918Z"
    },
    {
        "id": 6,
        "name": "Painter",
        "description": "Interior and exterior painting and decoration services.",
        "url_image": "https://i.imgur.com/66DcZ14.png",
        "createdAt": "2024-05-24T13:42:54.997Z",
        "updatedAt": "2024-05-24T13:42:54.997Z"
    },
    {
        "id": 7,
        "name": "Carpenter",
        "description": "Furniture and wooden structure fabrication and repair services.",
        "url_image": "https://i.imgur.com/8xkVOZI.png",
        "createdAt": "2024-05-24T13:44:15.137Z",
        "updatedAt": "2024-05-24T13:44:15.137Z"
    },
    {
        "id": 8,
        "name": "Locksmith",
        "description": "Lock opening and changing services.",
        "url_image": "https://i.imgur.com/L2Q6UXQ.png",
        "createdAt": "2024-05-24T13:45:17.990Z",
        "updatedAt": "2024-05-24T13:45:17.990Z"
    },
    {
        "id": 9,
        "name": "Mechanic",
        "description": "Vehicle repair and maintenance services.",
        "url_image": "https://i.imgur.com/w3xagPw.png",
        "createdAt": "2024-05-24T13:45:58.842Z",
        "updatedAt": "2024-05-24T13:45:58.842Z"
    },
    {
        "id": 10,
        "name": "Pet Care",
        "description": "Pet walking, feeding, and care services.",
        "url_image": "https://i.imgur.com/RePh2J7.png",
        "createdAt": "2024-05-24T13:46:49.202Z",
        "updatedAt": "2024-05-24T13:46:49.202Z"
    },
    {
        "id": 11,
        "name": "Veterinarian",
        "description": "Veterinary services for animal health and care.",
        "url_image": "https://i.imgur.com/DMSWrq4.png",
        "createdAt": "2024-05-24T13:47:46.623Z",
        "updatedAt": "2024-05-24T13:47:46.623Z"
    },
    {
        "id": 12,
        "name": "Nanny",
        "description": "Childcare and babysitting services.",
        "url_image": "https://i.imgur.com/nkMi3mO.png",
        "createdAt": "2024-05-24T13:54:56.104Z",
        "updatedAt": "2024-05-24T13:54:56.104Z"
    }
]

export const posts = [
    {
        id: 1,
        by: 'Pedro Pérez',
        isVerified: true,
        category: 'electrician',
        description: 'Electricista con experiencia en instalaciones residenciales y comerciales.',
        url_image: 'https://raviniaplumbing.com/wp-content/webp-express/webp-images/uploads/2023/03/Why-hire-a-professional-electrician_-scaled.jpeg.webp',
        price: '5000',
        currency: 'ARS',
        location: 'Buenos Aires, Argentina',
        title: 'Electricista para tu casa',
        stars: 0,
        reviews: [
            {
                id: 1,
                by: 'María López',
                commentarie: 'Buen servicio, recomendable',
                rating: 4,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 2,
                by: 'Carlos Díaz',
                commentarie: 'Mal servicio, no recomendable',
                rating: 1,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 3,
                by: 'Lucas Martínez',
                commentarie: 'Servicio aceptable, pero podría mejorar',
                rating: 3,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
        ],
        createdAt: '2024-05-24T13:38:32.234Z',
        updatedAt: '2024-05-24T13:38:32.234Z',
    },
    {
        id: 2,
        by: 'Lucía González',
        isVerified: false,
        category: 'plumber',
        description: 'Fontanero disponible para reparaciones y nuevas instalaciones.',
        url_image: 'https://www.1sthomeandcommercialservices.com/images/blog/Plumber-Under-Sink.jpg',
        price: '120',
        currency: 'USD',
        location: 'Rosario, Argentina',
        title: 'Fontanero para tu hogar',
        stars: 3,
        reviews: [
            {
                id: 1,
                by: 'Ana Gómez',
                commentarie: 'Servicio rápido y eficiente',
                rating: 5,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 2,
                by: 'Juan Rodríguez',
                commentarie: 'No cumplió con las expectativas',
                rating: 2,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 3,
                by: 'Esteban Morales',
                commentarie: 'Normal, nada fuera de lo común',
                rating: 3,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 4,
                by: 'Camila Silva',
                commentarie: 'Demasiado caro para lo que ofrece',
                rating: 2,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
        ],
        createdAt: '2024-05-24T13:38:32.234Z',
        updatedAt: '2024-05-24T13:38:32.234Z',
    },
    {
        id: 3,
        by: 'Martín Fernández',
        isVerified: true,
        category: 'electrician',
        description: 'Especialista en sistemas eléctricos industriales.',
        url_image: 'https://www.cefcolorado.org/wp-content/uploads/2021/08/electrician-800x533.jpg',
        price: '4500',
        currency: 'ARS',
        location: 'Córdoba, Argentina',
        title: 'Electricista industrial',
        stars: 4,
        reviews: [
            {
                id: 1,
                by: 'Luis Suárez',
                commentarie: 'Muy profesional',
                rating: 5,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 2,
                by: 'Claudia Núñez',
                commentarie: 'Servicio adecuado',
                rating: 3,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 3,
                by: 'Carlos Ortiz',
                commentarie: 'No resolvió todos los problemas',
                rating: 2,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
        ],
        createdAt: '2024-05-24T13:38:32.234Z',
        updatedAt: '2024-05-24T13:38:32.234Z',
    },
    {
        id: 4,
        by: 'Laura Méndez',
        isVerified: false,
        category: 'plumber',
        description: 'Experta en reparaciones de tuberías y desagües.',
        url_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLb2Rk3-Bu-WJaHejwSb1fNYcwNZqE7TIbsQ&s',
        price: '90',
        currency: 'USD',
        location: 'Mendoza, Argentina',
        title: 'Fontanera experta',
        stars: 2,
        reviews: [
            {
                id: 1,
                by: 'Diego Martínez',
                commentarie: 'Servicio eficiente',
                rating: 4,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 2,
                by: 'Carla López',
                commentarie: 'Demasiado caro para lo ofrecido',
                rating: 2,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 3,
                by: 'Mariano González',
                commentarie: 'Trabajo mediocre, esperaba más',
                rating: 2,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 4,
                by: 'Natalia Vega',
                commentarie: 'Muy profesional y rápida',
                rating: 5,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
        ],
        createdAt: '2024-05-24T13:38:32.234Z',
        updatedAt: '2024-05-24T13:38:32.234Z',
    },
    {
        id: 5,
        by: 'Sofía Sánchez',
        isVerified: true,
        category: 'electrician',
        description: 'Electricista residencial con 10 años de experiencia.',
        url_image: 'https://raviniaplumbing.com/wp-content/webp-express/webp-images/uploads/2023/03/Why-hire-a-professional-electrician_-scaled.jpeg.webp',
        price: '6000',
        currency: 'ARS',
        location: 'Mar del Plata, Argentina',
        title: 'Electricista experimentado',
        stars: 5,
        reviews: [
            {
                id: 1,
                by: 'Fernando Gutiérrez',
                commentarie: 'Excelente trabajo y puntualidad',
                rating: 5,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 2,
                by: 'Lucía Torres',
                commentarie: 'Muy recomendable',
                rating: 5,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 3,
                by: 'Hugo Ramírez',
                commentarie: 'Satisfactorio, pero nada espectacular',
                rating: 3,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
        ],
        createdAt: '2024-05-24T13:38:32.234Z',
        updatedAt: '2024-05-24T13:38:32.234Z',
    },
    {
        id: 6,
        by: 'Javier Morales',
        isVerified: false,
        category: 'plumber',
        description: 'Servicios de fontanería con garantía de calidad.',
        url_image: 'https://www.1sthomeandcommercialservices.com/images/blog/Plumber-Under-Sink.jpg',
        price: '110',
        currency: 'USD',
        location: 'Salta, Argentina',
        title: 'Fontanero garantizado',
        stars: 3,
        reviews: [
            {
                id: 1,
                by: 'Natalia Rojas',
                commentarie: 'Servicio aceptable',
                rating: 3,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 2,
                by: 'Pedro Ruiz',
                commentarie: 'Buena atención al cliente',
                rating: 4,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 3,
                by: 'Carla Herrera',
                commentarie: 'Podría mejorar en puntualidad',
                rating: 3,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
        ],
        createdAt: '2024-05-24T13:38:32.234Z',
        updatedAt: '2024-05-24T13:38:32.234Z',
    },
    {
        id: 7,
        by: 'Andrés Castro',
        isVerified: true,
        category: 'electrician',
        description: 'Electricista con certificación en energía renovable.',
        url_image: 'https://raviniaplumbing.com/wp-content/webp-express/webp-images/uploads/2023/03/Why-hire-a-professional-electrician_-scaled.jpeg.webp',
        price: '7000',
        currency: 'ARS',
        location: 'Santa Fe, Argentina',
        title: 'Electricista en energía renovable',
        stars: 4,
        reviews: [
            {
                id: 1,
                by: 'Patricia Ramírez',
                commentarie: 'Gran conocimiento en energía renovable',
                rating: 5,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 2,
                by: 'Raúl Iglesias',
                commentarie: 'Podría ser más económico',
                rating: 3,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 3,
                by: 'Elena Torres',
                commentarie: 'No tan eficiente como esperaba',
                rating: 2,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 4,
                by: 'Miguel Lara',
                commentarie: 'Trabajo satisfactorio',
                rating: 4,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
        ],
        createdAt: '2024-05-24T13:38:32.234Z',
        updatedAt: '2024-05-24T13:38:32.234Z',
    },
    {
        id: 8,
        by: 'Daniela Rojas',
        isVerified: false,
        category: 'plumber',
        description: 'Fontanera con amplia experiencia en reparaciones urgentes.',
        url_image: 'https://www.1sthomeandcommercialservices.com/images/blog/Plumber-Under-Sink.jpg',
        price: '100',
        currency: 'USD',
        location: 'La Plata, Argentina',
        title: 'Reparaciones urgentes de fontanería',
        stars: 5,
        reviews: [
            {
                id: 1,
                by: 'Jorge Paredes',
                commentarie: 'Muy rápida y eficiente',
                rating: 5,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 2,
                by: 'Sofía López',
                commentarie: 'Un poco cara, pero buen servicio',
                rating: 4,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 3,
                by: 'Esteban Fernández',
                commentarie: 'No llegó a tiempo, pero solucionó el problema',
                rating: 3,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
        ],
        createdAt: '2024-05-24T13:38:32.234Z',
        updatedAt: '2024-05-24T13:38:32.234Z',
    },
    {
        id: 9,
        by: 'Fernando Álvarez',
        isVerified: true,
        category: 'electrician',
        description: 'Experto en instalaciones eléctricas para empresas.',
        url_image: 'https://www.cefcolorado.org/wp-content/uploads/2021/08/electrician-800x533.jpg',
        price: '8000',
        currency: 'ARS',
        location: 'San Miguel de Tucumán, Argentina',
        title: 'Electricista para empresas',
        stars: 4,
        reviews: [
            {
                id: 1,
                by: 'Roberto García',
                commentarie: 'Muy buen trabajo, profesional',
                rating: 5,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 2,
                by: 'Lorena Vega',
                commentarie: 'Servicio aceptable, pero caro',
                rating: 3,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 3,
                by: 'Diego Ruiz',
                commentarie: 'No resolvió todos los problemas eléctricos',
                rating: 2,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
        ],
        createdAt: '2024-05-24T13:38:32.234Z',
        updatedAt: '2024-05-24T13:38:32.234Z',
    },
    {
        id: 10,
        by: 'Gabriela Muñoz',
        isVerified: false,
        category: 'plumber',
        description: 'Fontanera disponible para mantenimientos preventivos.',
        url_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLb2Rk3-Bu-WJaHejwSb1fNYcwNZqE7TIbsQ&s',
        price: '95',
        currency: 'USD',
        location: 'Neuquén, Argentina',
        title: 'Mantenimiento preventivo de fontanería',
        stars: 3,
        reviews: [
            {
                id: 1,
                by: 'Martín Gómez',
                commentarie: 'Buen trabajo, aunque algo caro',
                rating: 4,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 2,
                by: 'Sara González',
                commentarie: 'No muy puntual, pero buen servicio',
                rating: 3,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
            {
                id: 3,
                by: 'Héctor Vargas',
                commentarie: 'Servicio mediocre, esperaba más',
                rating: 2,
                url_image: 'https://i.imgur.com/DOBR5JJ.png',
                createdAt: '2024-05-24T13:38:32.234Z',
                updatedAt: '2024-05-24T13:38:32.234Z',
            },
        ],
        createdAt: '2024-05-24T13:38:32.234Z',
        updatedAt: '2024-05-24T13:38:32.234Z',
    },
];