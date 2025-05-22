// /**
//  * ໄຟລ໌: routes/upload.routes.js
//  * ໜ້າທີ່: ກຳນົດເສັ້ນທາງ API ສຳລັບການອັບໂຫລດໄຟລ໌
//  */
// const express = require('express');
// const router = express.Router();
// const uploadController = require('../controllers/upload.controller');
// const { authMiddleware, isAdmin } = require('../middleware/auth.middleware');

// // ອັບໂຫລດຮູບພາບສິນຄ້າ (ຕ້ອງເຂົ້າສູ່ລະບົບ)
// router.post('/upload/product-image', authMiddleware, uploadController.uploadProductImage);

// // ອັບໂຫລດຮູບພາບຫຼາຍຮູບ (ຕ້ອງເຂົ້າສູ່ລະບົບ)
// router.post('/upload/multiple', authMiddleware, uploadController.uploadMultipleFiles);

// // ເອົາຮູບພາບຈາກຄອມພິວເຕີ (ບໍ່ຈຳເປັນຕ້ອງເຂົ້າສູ່ລະບົບ)
// router.get('/images/:folder/:filename', uploadController.getImage);

// module.exports = router;