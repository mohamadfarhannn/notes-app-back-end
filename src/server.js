// Memuat kode untuk membuat, mengonfigurasi, dan menjalankan HTTP server menggunakan Hapi.
//nodemon berfungsi agar server dapat terus berjalan walaupun terdapat perubahan

const Hapi = require('@hapi/hapi');
const routes = require('./routes'); //12) 
const { addNoteHandler, 
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler');
 
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    // host: 'localhost', (local development)
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0', //online development
    routes: {
      cors: {
        origin: ['*'],
    },
  },
});
 
  server.route(routes);
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
init();