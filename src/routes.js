//Memuat kode konfigurasi routing server, seperti menentukan path, method, dan handler yang digunakan.
const { 
  addNoteHandler, 
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler'); //11) import fungsi addNoteHandler pada berkas routes.js.

const routes = [
    {
      method: 'POST',
      path: '/notes',
      handler: addNoteHandler, //10) ganti fungsi handler
    },
    { //12a) menampilkan Catatan
      method: 'GET',
      path: '/notes',
      handler: getAllNotesHandler,
    },
    { //12b) membuat route untuk mendapatkan catatan secara spesifik.
      method: 'GET',
      path: '/notes/{id}',
      handler: getNoteByIdHandler,
    },
    { //13)Mengedit Catatan
      method: 'PUT',
      path: '/notes/{id}',
      handler: editNoteByIdHandler,
    },
    { //14) Menghapus Catatan
      method: 'DELETE',
      path: '/notes/{id}',
      handler: deleteNoteByIdHandler,
    },
  ];

  module.exports = routes; //agar routes dapat digunakan oleh berkas server.js