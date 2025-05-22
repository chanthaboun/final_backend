// // backend/routes/auth.routes.js
// const express = require('express');
// const authController = require('../controllers/auth.controller');
// const authMiddleware = require('../middleware/auth.middleware');

// const router = express.Router();

// // ເສັ້ນທາງສຳລັບການ login
// router.post('/login', authController.login);

// // ເສັ້ນທາງສຳລັບການລົງທະບຽນ
// router.post('/register', authController.register);

// // ເສັ້ນທາງສຳລັບດຶງຂໍ້ມູນຜູ້ໃຊ້ປັດຈຸບັນ (ຕ້ອງມີການ authenticate)
// router.get('/user', authMiddleware.authenticateToken, authController.getUser);

// module.exports = router;


// backend/routes/auth.routes.js
const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// ເສັ້ນທາງສຳລັບການ login
router.post('/login', authController.login);

// ເສັ້ນທາງສຳລັບການລົງທະບຽນ
router.post('/register', authController.register);

// ເສັ້ນທາງສຳລັບດຶງຂໍ້ມູນຜູ້ໃຊ້ປັດຈຸບັນ (ຕ້ອງມີການ authenticate)
router.get('/user', authMiddleware.authenticateToken, authController.getUser);

// ເສັ້ນທາງສຳລັບດຶງຂໍ້ມູນຜູ້ໃຊ້ທັງໝົດ (ສິດທິ admin ເທົ່ານັ້ນ)
router.get('/users', authMiddleware.authenticateToken, authMiddleware.isAdmin, authController.getAllUsers);

// ເສັ້ນທາງສຳລັບອັບເດດຂໍ້ມູນຜູ້ໃຊ້
router.put('/users/:id', authMiddleware.authenticateToken, authMiddleware.isAdmin, authController.updateUser);

module.exports = router;