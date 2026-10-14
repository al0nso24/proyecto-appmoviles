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
    { id: 14, nombre: 'Pingüino', precio: 55.90, categoria: 'Animales', imagen: require('../../imagenes/pinwino.jpg') },
    { id: 15, nombre: 'Delfín', precio: 34.90, categoria: 'Animales', imagen: require('../../imagenes/delfin.jpg') },
    { id: 16, nombre: 'Chiikabu', precio: 66.90, categoria: 'Anime', imagen: require('../../imagenes/chiikabu.jpg') },
    { id: 17, nombre: 'Bulbasaur', precio: 79.90, categoria: 'Juegos', imagen: require('../../imagenes/bulbasaur.jpg') },
    { id: 18, nombre: 'Cerdito', precio: 89.90, categoria: 'Animales', imagen: require('../../imagenes/cerdo.jpg') },
    { id: 19, nombre: 'Creeper', precio: 69.90, categoria: 'Juegos', imagen: require('../../imagenes/creeper.jpg') },
    { id: 20, nombre: 'Deadpool', precio: 89.00, categoria: 'Peliculas', imagen: require('../../imagenes/depul.jpg') },
    { id: 21, nombre: 'R2D2', precio: 69.00, categoria: 'Peliculas', imagen: require('../../imagenes/r2d2.jpg') },
    { id: 22, nombre: 'Iron Man', precio: 70.90, categoria: 'Peliculas', imagen: require('../../imagenes/ironman.jpg') },
];

export const CATEGORIAS = ['Todos', 'Animales', 'Anime', 'Juegos', 'Peliculas'];

export const MAS_VENDIDOS = [1, 2];

export const productoPorId = (id) => productos.find((p) => p.id === id);
