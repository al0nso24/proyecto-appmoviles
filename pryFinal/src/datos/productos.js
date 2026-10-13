export const productos = [
    { id: 1, nombre: 'Chiikawa', precio: 65.90, categoria: 'Anime', imagen: require('../../imagenes/chiikawafondo.png') },
    { id: 2, nombre: 'Hachiware', precio: 59.90, categoria: 'Anime', imagen: require('../../imagenes/hachifondo.png') },
    { id: 3, nombre: 'Stormtropper', precio: 59.90, categoria: 'Peliculas', imagen: require('../../imagenes/stormfondo.png') },
    { id: 4, nombre: 'Darth Vader', precio: 54.90, categoria: 'Peliculas', imagen: require('../../imagenes/darthfondo.png') },
    { id: 5, nombre: 'Yoshi', precio: 49.90, categoria: 'Juegos', imagen: require('../../imagenes/yoshifondo.png') },
    { id: 6, nombre: 'Kirby', precio: 65.90, categoria: 'Juegos', imagen: require('../../imagenes/kirbyfondo.png') },
    { id: 7, nombre: 'Freddy Fazbear', precio: 79.90, categoria: 'Juegos', imagen: require('../../imagenes/freddyfondo.png') },
    { id: 8, nombre: 'Triceratops', precio: 74.90, categoria: 'Animales', imagen: require('../../imagenes/tricepfondo.png') },
    { id: 9, nombre: 'Perrito', precio: 65.90, categoria: 'Animales', imagen: require('../../imagenes/perro.png') },
    { id: 10, nombre: 'Usagi', precio: 120.90, categoria: 'Anime', imagen: require('../../imagenes/usagi.png') },
    { id: 11, nombre: 'Spider-Man', precio: 89.90, categoria: 'Peliculas', imagen: require('../../imagenes/spiderman.png') },
    { id: 12, nombre: 'Beluga', precio: 50.90, categoria: 'Animales', imagen: require('../../imagenes/belugaa.png') },
    { id: 13, nombre: 'Momonga', precio: 450.90, categoria: 'Anime', imagen: require('../../imagenes/momonga.png') },
];

export const CATEGORIAS = ['Todos', 'Animales', 'Anime', 'Juegos', 'Peliculas'];

export const MAS_VENDIDOS = [1, 2];

export const productoPorId = (id) => productos.find((p) => p.id === id);
