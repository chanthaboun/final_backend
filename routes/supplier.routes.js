// backend/routes/supplier.routes.js

const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplier.controller');
const { authenticateToken, isAdmin } = require('../middleware/auth.middleware');

/**
 * ເສັ້ນທາງສຳລັບຂໍ້ມູນຜູ້ສະໜອງ
 * ທຸກເສັ້ນທາງຕ້ອງມີການພິສູດຕົວຕົນດ້ວຍ token
 */

// ດຶງຂໍ້ມູນຜູ້ສະໜອງທັງໝົດ
router.get('/suppliers', authenticateToken, supplierController.getAllSuppliers);

// ຄົ້ນຫາຜູ້ສະໜອງຕາມຂໍ້ຄວາມ
router.get('/suppliers/search', authenticateToken, supplierController.searchSuppliers);

// ດຶງຂໍ້ມູນຜູ້ສະໜອງຕາມ ID
router.get('/suppliers/:id', authenticateToken, supplierController.getSupplierById);

// ສ້າງຜູ້ສະໜອງໃໝ່ (ສະເພາະ admin ເທົ່ານັ້ນ)
router.post('/suppliers', authenticateToken, isAdmin, supplierController.createSupplier);

// ອັບເດດຂໍ້ມູນຜູ້ສະໜອງ (ສະເພາະ admin ເທົ່ານັ້ນ)
router.put('/suppliers/:id', authenticateToken, isAdmin, supplierController.updateSupplier);

// ລຶບຂໍ້ມູນຜູ້ສະໜອງ (ສະເພາະ admin ເທົ່ານັ້ນ)
router.delete('/suppliers/:id', authenticateToken, isAdmin, supplierController.deleteSupplier);

module.exports = router;