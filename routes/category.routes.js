// // backend/routes/category.routes.js
// const express = require('express');
// const router = express.Router();
// const categoryController = require('../controllers/category.controller');
// const { authMiddleware, isAdmin } = require('../middleware/auth.middleware');

// // ດຶງຂໍ້ມູນປະເພດສິນຄ້າທັງໝົດ
// router.get('/categories', authMiddleware, categoryController.getAllCategories);

// // ຄົ້ນຫາປະເພດສິນຄ້າດ້ວຍຄຳສັບ
// router.get('/categories/search', authMiddleware, categoryController.searchCategories);

// // ດຶງຂໍ້ມູນປະເພດສິນຄ້າຕາມ ID
// router.get('/categories/:id', authMiddleware, categoryController.getCategoryById);

// // ສ້າງປະເພດສິນຄ້າໃໝ່
// router.post('/categories', authMiddleware, isAdmin, categoryController.createCategory);

// // ອັບເດດຂໍ້ມູນປະເພດສິນຄ້າ
// router.put('/categories/:id', authMiddleware, isAdmin, categoryController.updateCategory);

// // ລຶບຂໍ້ມູນປະເພດສິນຄ້າ
// router.delete('/categories/:id', authMiddleware, isAdmin, categoryController.deleteCategory);

// module.exports = router;





// backend/routes/category.routes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { authMiddleware, isAdmin } = require('../middleware/auth.middleware');

// ດຶງຂໍ້ມູນປະເພດສິນຄ້າທັງໝົດ
router.get('/categories', authMiddleware, categoryController.getAllCategories);

// ດຶງຂໍ້ມູນປະເພດສິນຄ້າຫຼັກ (ບໍ່ມີ parent)
router.get('/categories/main', authMiddleware, categoryController.getMainCategories);

// ຄົ້ນຫາປະເພດສິນຄ້າດ້ວຍຄຳສັບ
router.get('/categories/search', authMiddleware, categoryController.searchCategories);

// ດຶງຂໍ້ມູນປະເພດສິນຄ້າຍ່ອຍຕາມ parentId
router.get('/categories/sub/:parentId', authMiddleware, categoryController.getSubCategories);

// ດຶງຂໍ້ມູນປະເພດສິນຄ້າຕາມ ID
router.get('/categories/:id', authMiddleware, categoryController.getCategoryById);

// ສ້າງປະເພດສິນຄ້າໃໝ່
router.post('/categories', authMiddleware, isAdmin, categoryController.createCategory);

// ອັບເດດຂໍ້ມູນປະເພດສິນຄ້າ
router.put('/categories/:id', authMiddleware, isAdmin, categoryController.updateCategory);

// ລຶບຂໍ້ມູນປະເພດສິນຄ້າ
router.delete('/categories/:id', authMiddleware, isAdmin, categoryController.deleteCategory);

module.exports = router;
