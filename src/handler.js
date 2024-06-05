// Memuat seluruh fungsi-fungsi handler yang digunakan pada berkas routes.
const { nanoid } = require('nanoid'); //5)import nanoid dari package-nya.
const notes = require('./notes');

const addNoteHandler = (request, h) => { //1)dua parameter request dan h (khusus utk Hapi)
    const { title, tags, body } = request.payload; //3)mendapatkan body request di Hapi

    const id = nanoid(16); //4)penggunaan library nanoid() dan memberikan parameter number yang merupakan ukuran dari string-nya.
    const createdAt = new Date().toISOString(); //6) Menambahkan properti createdAt dan updatedAt
    const updatedAt = createdAt;

    const newNote = { //7) menambahkan catatan baru
        title, tags, body, id, createdAt, updatedAt,
      };

    notes.push(newNote); //8) masukan nilai-nilai tersebut ke dalam array notes menggunakan method push()

    const isSuccess = notes.filter((note) => note.id === id).length > 0;//9) menentukan apakah newNote sudah masuk ke dalam array notes. gunakan isSuccess untuk menentukan respons yang diberikan server. Jika isSuccess bernilai true, silakan beri respons berhasil. Jika false, silakan beri respons gagal.

    if (isSuccess) { //9)
        const response = h.response({
          status: 'success',
          message: 'Catatan berhasil ditambahkan',
          data: {
            noteId: id,
          },
        });
        response.code(201);
        return response;
      }
      const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
      });
      response.code(500);
      return response;
};

//12) menampilkan Catatan
const getAllNotesHandler = () => ({ 
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => { //handler untuk mendapatkan catatan secara spesifik
  const { id } = request.params; //mendapatkan nilai id

  const note = notes.filter((n) => n.id === id)[0]; //dapatkan objek note dengan id tersebut dari objek array notes. Manfaatkan method array filter() untuk mendapatkan objeknya.

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

//13)Mengedit Catatan
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString(); //perbarui juga nilai dari properti updatedAt dapatkan nilai terbaru dengan menggunakan new Date().toISOString().

  const index = notes.findIndex((note) => note.id === id); //mengubah catatan lama dengan data terbaru

  // Bila note dengan id yang dicari ditemukan, index akan bernilai array index dari objek catatan yang dicari. Namun, bila tidak ditemukan, index akan bernilai -1. Jadi, kita bisa menentukan gagal atau tidaknya permintaan dari nilai index menggunakan if else.
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;

};

  //14) Menghapus Catatan
  const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params; //dapatkan dulu nilai id yang dikirim melalui path parameter.

    const index = notes.findIndex((note) => note.id === id); //dapatkan index dari objek catatan sesuai dengan id yang didapat.

    //Lakukan pengecekan terhadap nilai index, pastikan nilainya tidak -1 bila hendak menghapus catatan. Nah, untuk menghapus data pada array berdasarkan index, gunakan method array splice().
    if (index !== -1) {
      notes.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil dihapus',
      });
      response.code(200);
      return response;
    }

    //Bila index bernilai -1, kembalikan handler dengan respons gagal.
    const response = h.response({
      status: 'fail',
      message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  };


module.exports = { 
  addNoteHandler, 
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
 }; //2)objek literals ya. Ini bertujuan untuk memudahkan ekspor lebih dari satu nilai pada satu berkas JavaScript.