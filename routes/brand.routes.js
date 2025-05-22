// backend/routes/brand.routes.js
const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand.controller');
const { authMiddleware, isAdmin } = require('../middleware/auth.middleware');

// ດຶງຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າທັງໝົດ
router.get('/brands', authMiddleware, brandController.getAllBrands);

// ຄົ້ນຫາຍີ່ຫໍ້ສິນຄ້າດ້ວຍຄຳສັບ
router.get('/brands/search', authMiddleware, brandController.searchBrands);

// ດຶງຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າຕາມ ID
router.get('/brands/:id', authMiddleware, brandController.getBrandById);

// ສ້າງຍີ່ຫໍ້ສິນຄ້າໃໝ່
router.post('/brands', authMiddleware, isAdmin, brandController.createBrand);

// ອັບເດດຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າ
router.put('/brands/:id', authMiddleware, isAdmin, brandController.updateBrand);

// ລຶບຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າ
router.delete('/brands/:id', authMiddleware, isAdmin, brandController.deleteBrand);

module.exports = router;