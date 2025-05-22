
// config/db.js
// module.exports = db;

const mysql = require('mysql2');

// ການເຊື່ອມຕໍ່ກັບຖານຂໍ້ມູນ MySQL
const db = mysql.createConnection({
    host: 'localhost',     // hostname ຂອງ MySQL server
    user: 'root',          // ຊື່ຜູ້ໃຊ້ MySQL
    password: '',          // ລະຫັດຜ່ານ MySQL (ຖ້າມີ)
    database: 'warehouse_db', // ຊື່ຖານຂໍ້ມູນ
    port: 3306,            // port MySQL
    charset: 'utf8mb4'     // ຮອງຮັບພາສາລາວໄດ້ດີກວ່າ
});

// ທົດສອບການເຊື່ອມຕໍ່
db.connect((err) => {
    if (err) {
        console.error('ເກີດຂໍ້ຜິດພາດໃນການເຊື່ອມຕໍ່ກັບ MySQL:', err);
        return;
    }
    console.log('connect database succefully!');
});

module.exports = db;