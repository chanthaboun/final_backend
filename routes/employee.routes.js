// const express = require('express');
// const employeeController = require('../controllers/employee.controller');
// const authMiddleware = require('../middleware/auth.middleware');

// const router = express.Router();

// // ດຶງຂໍ້ມູນພະນັກງານທັງໝົດ
// router.get('/employees', authMiddleware.authenticateToken, employeeController.getAllEmployees);

// // ຄົ້ນຫາພະນັກງານ
// router.get('/employees/search', authMiddleware.authenticateToken, employeeController.searchEmployees);

// // ດຶງຂໍ້ມູນພະນັກງານຕາມ ID
// router.get('/employees/:id', authMiddleware.authenticateToken, employeeController.getEmployeeById);

// // ເພີ່ມຂໍ້ມູນພະນັກງານໃໝ່
// router.post('/employees', authMiddleware.authenticateToken, employeeController.createEmployee);

// // ອັບເດດຂໍ້ມູນພະນັກງານ
// router.put('/employees/:id', authMiddleware.authenticateToken, employeeController.updateEmployee);

// // ລຶບຂໍ້ມູນພະນັກງານ
// router.delete('/employees/:id', authMiddleware.authenticateToken, employeeController.deleteEmployee);

// module.exports = router;



// backend/routes/employee.routes.js
const express = require('express');
const employeeController = require('../controllers/employee.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// ດຶງຂໍ້ມູນພະນັກງານທັງໝົດ - ຕ້ອງການສິດ authenticate
router.get('/employees', authMiddleware.authenticateToken, employeeController.getAllEmployees);

// ຄົ້ນຫາພະນັກງານ - ຕ້ອງການສິດ authenticate
router.get('/employees/search', authMiddleware.authenticateToken, employeeController.searchEmployees);

// ດຶງຂໍ້ມູນພະນັກງານຕາມ ID - ຕ້ອງການສິດ authenticate
router.get('/employees/:id', authMiddleware.authenticateToken, employeeController.getEmployeeById);

// ເພີ່ມຂໍ້ມູນພະນັກງານໃໝ່ - ຕ້ອງການສິດ authenticate ແລະ ສິດ admin
router.post('/employees',
    authMiddleware.authenticateToken,
    authMiddleware.isAdmin,
    employeeController.createEmployee
);

// ອັບເດດຂໍ້ມູນພະນັກງານ - ຕ້ອງການສິດ authenticate ແລະ ສິດ admin 
// ຫຼື ເປັນເຈົ້າຂອງຂໍ້ມູນເອງ
router.put('/employees/:id',
    authMiddleware.authenticateToken,
    (req, res, next) => {
        // ຖ້າເປັນ admin ຫຼື ເປັນຂໍ້ມູນຂອງຕົນເອງ
        if (req.user.role === 'admin') {
            return next();
        }

        // ດຶງຂໍ້ມູນພະນັກງານເພື່ອກວດສອບວ່າແມ່ນຂໍ້ມູນຂອງຕົນເອງຫຼືບໍ່
        const employeeId = req.params.id.replace('EMP ', '').trim();
        req.app.locals.db.query(
            'SELECT user_id FROM employees WHERE employee_id = ?',
            [employeeId],
            (err, results) => {
                if (err || results.length === 0) {
                    return res.status(403).json({ message: 'ບໍ່ມີສິດໃນການແກ້ໄຂຂໍ້ມູນນີ້' });
                }

                if (results[0].user_id === req.user.id) {
                    return next();
                }

                res.status(403).json({ message: 'ບໍ່ມີສິດໃນການແກ້ໄຂຂໍ້ມູນນີ້' });
            }
        );
    },
    employeeController.updateEmployee
);

// ລຶບຂໍ້ມູນພະນັກງານ - ຕ້ອງການສິດ admin ເທົ່ານັ້ນ
router.delete('/employees/:id',
    authMiddleware.authenticateToken,
    authMiddleware.isAdmin,
    employeeController.deleteEmployee
);

module.exports = router;