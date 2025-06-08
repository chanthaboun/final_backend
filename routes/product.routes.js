// // backend/routes/product.routes.js
// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/product.controller');
// const { authMiddleware, isAdmin } = require('../middleware/auth.middleware');
// const multer = require('multer');

// // ກຳນົດການຈັດເກັບໄຟລ໌ຊົ່ວຄາວໃນ memory
// const storage = multer.memoryStorage();
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 } // ຈຳກັດຂະໜາດໄຟລ໌ 5MB
// });

// // ດຶງຂໍ້ມູນສິນຄ້າທັງໝົດ
// router.get('/products', productController.getAllProducts);

// // ຄົ້ນຫາສິນຄ້າຕາມຄຳຄົ້ນຫາ
// router.get('/products/search', productController.searchProducts);

// // ດຶງຂໍ້ມູນສິນຄ້າຕາມ ID
// router.get('/products/:id', productController.getProductById);

// // ເພີ່ມສິນຄ້າໃໝ່ (ຕ້ອງການການພິສູດຕົວຕົນ ແລະ ຕ້ອງເປັນຜູ້ດູແລລະບົບ)
// router.post('/products', [authMiddleware, isAdmin, upload.single('image')], productController.createProduct);

// // ອັບເດດຂໍ້ມູນສິນຄ້າ (ຕ້ອງການການພິສູດຕົວຕົນ ແລະ ຕ້ອງເປັນຜູ້ດູແລລະບົບ)
// router.put('/products/:id', [authMiddleware, isAdmin, upload.single('image')], productController.updateProduct);

// // ລຶບສິນຄ້າ (ຕ້ອງການການພິສູດຕົວຕົນ ແລະ ຕ້ອງເປັນຜູ້ດູແລລະບົບ)
// router.delete('/products/:id', [authMiddleware, isAdmin], productController.deleteProduct);

// // ອັບເດດຈຳນວນສິນຄ້າ (ຕ້ອງການການພິສູດຕົວຕົນ ແລະ ຕ້ອງເປັນຜູ້ດູແລລະບົບ)
// router.patch('/products/:id/quantity', [authMiddleware, isAdmin], productController.updateProductQuantity);

// // ດຶງລາຍການໜ່ວຍສິນຄ້າ
// router.get('/products/units/all', productController.getUnits);

// // ດຶງລາຍການປະເພດສິນຄ້າ
// router.get('/products/categories/all', productController.getCategories);

// // ດຶງລາຍການຍີ່ຫໍ້ສິນຄ້າ
// router.get('/products/brands/all', productController.getBrands);

// module.exports = router;



// // backend/routes/product.routes.js
// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/product.controller');
// const { authMiddleware, isAdmin } = require('../middleware/auth.middleware');
// const multer = require('multer');
// const path = require('node:path');

// // ກຳນົດການຈັດເກັບໄຟລ໌ຊົ່ວຄາວໃນ memory
// const storage = multer.memoryStorage();
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // ຈຳກັດຂະໜາດໄຟລ໌ 5MB
//     fileFilter: (req, file, cb) => {
//         // ກຳນົດປະເພດໄຟລ໌ທີ່ອະນຸຍາດ
//         const allowedTypes = /jpeg|jpg|png|gif/;
//         // ກວດສອບນາມສະກຸນໄຟລ໌
//         const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//         // ກວດສອບ mime type
//         const mimetype = allowedTypes.test(file.mimetype);

//         // if (extname && mimetype) {
//         //     return cb(null, true);
//         // } else {
//         //     cb(new Error('ຊະນິດຂອງໄຟລ໌ບໍ່ໄດ້ຮັບອະນຸຍາດ. ກະລຸນາອັບໂຫຼດຮູບພາບໃນຮູບແບບ JPEG, JPG, PNG ຫຼື GIF.'));
//         // }
//         if (extname && mimetype) {
//             return cb(null, true);
//         }
//         cb(new Error('ຊະນິດຂອງໄຟລ໌ບໍ່ໄດ້ຮັບອະນຸຍາດ. ກະລຸນາອັບໂຫຼດຮູບພາບໃນຮູບແບບ JPEG, JPG, PNG ຫຼື GIF.'));
//     }
// });

// // ເສັ້ນທາງທີ່ມີຄວາມຈະແຈ້ງຕ້ອງມາກ່ອນເສັ້ນທາງທີ່ໃຊ້ພາລາມິເຕີ

// // ດຶງລາຍການໜ່ວຍສິນຄ້າ
// router.get('/products/units/all', productController.getUnits);

// // ດຶງລາຍການປະເພດສິນຄ້າ
// router.get('/products/categories/all', productController.getCategories);

// // ດຶງລາຍການຍີ່ຫໍ້ສິນຄ້າ
// router.get('/products/brands/all', productController.getBrands);

// // ຄົ້ນຫາສິນຄ້າຕາມຄຳຄົ້ນຫາ
// router.get('/products/search', productController.searchProducts);

// // ອັບເດດຈຳນວນສິນຄ້າ (ຕ້ອງການການພິສູດຕົວຕົນ ແລະ ຕ້ອງເປັນຜູ້ດູແລລະບົບ)
// router.patch('/products/:id/quantity', [authMiddleware, isAdmin], productController.updateProductQuantity);

// // ດຶງຂໍ້ມູນສິນຄ້າທັງໝົດ
// router.get('/products', productController.getAllProducts);

// // ດຶງຂໍ້ມູນສິນຄ້າຕາມ ID (ຕ້ອງຢູ່ຫຼັງຈາກເສັ້ນທາງທີ່ມີຮູບແບບສະເພາະ)
// router.get('/products/:id', productController.getProductById);

// // ເພີ່ມສິນຄ້າໃໝ່ (ຕ້ອງການການພິສູດຕົວຕົນ ແລະ ຕ້ອງເປັນຜູ້ດູແລລະບົບ)
// router.post('/products', [authMiddleware, isAdmin, upload.single('image')], (req, res, next) => {
//     // ການຈັດການກັບຂໍ້ຜິດພາດຈາກການອັບໂຫຼດໄຟລ໌
//     if (req.fileValidationError) {
//         return res.status(400).json({ success: false, message: req.fileValidationError });
//     }
//     // ຖ້າບໍ່ມີຂໍ້ຜິດພາດ, ສືບຕໍ່ໄປຍັງ controller
//     productController.createProduct(req, res, next);
// });

// // ອັບເດດຂໍ້ມູນສິນຄ້າ (ຕ້ອງການການພິສູດຕົວຕົນ ແລະ ຕ້ອງເປັນຜູ້ດູແລລະບົບ)
// router.put('/products/:id', [authMiddleware, isAdmin, upload.single('image')], (req, res, next) => {
//     // ການຈັດການກັບຂໍ້ຜິດພາດຈາກການອັບໂຫຼດໄຟລ໌
//     if (req.fileValidationError) {
//         return res.status(400).json({ success: false, message: req.fileValidationError });
//     }
//     // ຖ້າບໍ່ມີຂໍ້ຜິດພາດ, ສືບຕໍ່ໄປຍັງ controller
//     productController.updateProduct(req, res, next);
// });

// // ລຶບສິນຄ້າ (ຕ້ອງການການພິສູດຕົວຕົນ ແລະ ຕ້ອງເປັນຜູ້ດູແລລະບົບ)
// router.delete('/products/:id', [authMiddleware, isAdmin], productController.deleteProduct);

// // ການຈັດການຂໍ້ຜິດພາດໃນການອັບໂຫຼດໄຟລ໌
// router.use((err, req, res, next) => {
//     // if (err instanceof multer.MulterError) {
//     //     // ຂໍ້ຜິດພາດຈາກ multer
//     //     if (err.code === 'LIMIT_FILE_SIZE') {
//     //         return res.status(400).json({
//     //             success: false,
//     //             message: 'ໄຟລ໌ມີຂະໜາດໃຫຍ່ເກີນໄປ. ຂະໜາດສູງສຸດທີ່ອະນຸຍາດແມ່ນ 5MB.'
//     //         });
//     //     }
//     //     return res.status(400).json({
//     //         success: false,
//     //         message: `ເກີດຂໍ້ຜິດພາດໃນການອັບໂຫຼດໄຟລ໌: ${err.message}`
//     //     });
//     // } else if (err) {
//     //     // ຂໍ້ຜິດພາດອື່ນໆ
//     //     return res.status(500).json({
//     //         success: false,
//     //         message: err.message || 'ເກີດຂໍ້ຜິດພາດໃນການດຳເນີນການກັບຄຳຮ້ອງຂໍ'
//     //     });
//     // }
//     // next();
//     if (err instanceof multer.MulterError) {
//         // ຂໍ້ຜິດພາດຈາກ multer
//         if (err.code === 'LIMIT_FILE_SIZE') {
//             return res.status(400).json({
//                 success: false,
//                 message: 'ໄຟລ໌ມີຂະໜາດໃຫຍ່ເກີນໄປ. ຂະໜາດສູງສຸດທີ່ອະນຸຍາດແມ່ນ 5MB.'
//             });
//         }
//         return res.status(400).json({
//             success: false,
//             message: `ເກີດຂໍ້ຜິດພາດໃນການອັບໂຫຼດໄຟລ໌: ${err.message}`
//         });
//     }

//     if (err) {
//         // ຂໍ້ຜິດພາດອື່ນໆ
//         return res.status(500).json({
//             success: false,
//             message: err.message || 'ເກີດຂໍ້ຜິດພາດໃນການດຳເນີນການກັບຄຳຮ້ອງຂໍ'
//         });
//     }

//     next();

// });

// module.exports = router;





// // backend/routes/product.routes.js
// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/product.controller');
// const { authMiddleware, isAdmin } = require('../middleware/auth.middleware');
// const multer = require('multer');
// const path = require('node:path');

// // ກຳນົດການຈັດເກັບໄຟລ໌ຊົ່ວຄາວໃນ memory
// const storage = multer.memoryStorage();
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // ຈຳກັດຂະໜາດໄຟລ໌ 5MB
//     fileFilter: (req, file, cb) => {
//         // ກຳນົດປະເພດໄຟລ໌ທີ່ອະນຸຍາດ
//         const allowedTypes = /jpeg|jpg|png|gif/;
//         // ກວດສອບນາມສະກຸນໄຟລ໌
//         const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//         // ກວດສອບ mime type
//         const mimetype = allowedTypes.test(file.mimetype);

//         if (extname && mimetype) {
//             return cb(null, true);
//         }
//         cb(new Error('ຊະນິດຂອງໄຟລ໌ບໍ່ໄດ້ຮັບອະນຸຍາດ. ກະລຸນາອັບໂຫຼດຮູບພາບໃນຮູບແບບ JPEG, JPG, PNG ຫຼື GIF.'));
//     }
// });

// // ເສັ້ນທາງທີ່ມີຄວາມຈະແຈ້ງຕ້ອງມາກ່ອນເສັ້ນທາງທີ່ໃຊ້ພາລາມິເຕີ

// // ດຶງລາຍການໜ່ວຍສິນຄ້າ
// router.get('/products/units/all', productController.getUnits);

// // ດຶງລາຍການປະເພດສິນຄ້າ
// router.get('/products/categories/all', productController.getCategories);

// // ດຶງລາຍການຍີ່ຫໍ້ສິນຄ້າ
// router.get('/products/brands/all', productController.getBrands);

// // ຄົ້ນຫາສິນຄ້າຕາມຄຳຄົ້ນຫາ
// router.get('/products/search', productController.searchProducts);

// // ອັບເດດຈຳນວນສິນຄ້າ
// router.patch('/products/:id/quantity', [authMiddleware, isAdmin], productController.updateProductQuantity);

// // ດຶງຂໍ້ມູນສິນຄ້າທັງໝົດ
// router.get('/products', productController.getAllProducts);

// // ດຶງຂໍ້ມູນສິນຄ້າຕາມ ID
// router.get('/products/:id', productController.getProductById);

// // ເພີ່ມສິນຄ້າໃໝ່
// router.post('/products', [authMiddleware, isAdmin, upload.single('image')], (req, res, next) => {
//     try {
//         productController.createProduct(req, res, next);
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: err.message || 'ເກີດຂໍ້ຜິດພາດໃນການເພີ່ມສິນຄ້າ'
//         });
//     }
// });

// // ອັບເດດຂໍ້ມູນສິນຄ້າ
// router.put('/products/:id', [authMiddleware, isAdmin, upload.single('image')], (req, res, next) => {
//     try {
//         productController.updateProduct(req, res, next);
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: err.message || 'ເກີດຂໍ້ຜິດພາດໃນການອັບເດດສິນຄ້າ'
//         });
//     }
// });

// // ລຶບສິນຄ້າ
// router.delete('/products/:id', [authMiddleware, isAdmin], productController.deleteProduct);

// // ການຈັດການຂໍ້ຜິດພາດໃນການອັບໂຫຼດໄຟລ໌
// router.use((err, req, res, next) => {
//     if (err instanceof multer.MulterError) {
//         // ຂໍ້ຜິດພາດຈາກ multer
//         if (err.code === 'LIMIT_FILE_SIZE') {
//             return res.status(400).json({
//                 success: false,
//                 message: 'ໄຟລ໌ມີຂະໜາດໃຫຍ່ເກີນໄປ. ຂະໜາດສູງສຸດທີ່ອະນຸຍາດແມ່ນ 5MB.'
//             });
//         }
//         return res.status(400).json({
//             success: false,
//             message: `ເກີດຂໍ້ຜິດພາດໃນການອັບໂຫຼດໄຟລ໌: ${err.message}`
//         });
//     }

//     if (err) {
//         // ຂໍ້ຜິດພາດອື່ນໆ
//         return res.status(500).json({
//             success: false,
//             message: err.message || 'ເກີດຂໍ້ຜິດພາດໃນການດຳເນີນການກັບຄຳຮ້ອງຂໍ'
//         });
//     }

//     next();
// });

// module.exports = router;








// backend/routes/product.routes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { authMiddleware, isAdmin } = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('node:path');

// ກຳນົດການຈັດເກັບໄຟລ໌ຊົ່ວຄາວໃນ memory
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // ຈຳກັດຂະໜາດໄຟລ໌ 5MB
    fileFilter: (req, file, cb) => {
        // ກຳນົດປະເພດໄຟລ໌ທີ່ອະນຸຍາດ
        const allowedTypes = /jpeg|jpg|png|gif/;
        // ກວດສອບນາມສະກຸນໄຟລ໌
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        // ກວດສອບ mime type
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('ຊະນິດຂອງໄຟລ໌ບໍ່ໄດ້ຮັບອະນຸຍາດ. ກະລຸນາອັບໂຫຼດຮູບພາບໃນຮູບແບບ JPEG, JPG, PNG ຫຼື GIF.'));
    }
});

// ເສັ້ນທາງທີ່ມີຄວາມຈະແຈ້ງຕ້ອງມາກ່ອນເສັ້ນທາງທີ່ໃຊ້ພາລາມິເຕີ

// ດຶງລາຍການໜ່ວຍສິນຄ້າ
router.get('/products/units/all', productController.getUnits);

// 🆕 ດຶງລາຍການປະເພດສິນຄ້າແບບ hierarchical
router.get('/products/categories/hierarchy', productController.getCategoriesWithHierarchy);

// 🆕 ດຶງລາຍການປະເພດສິນຄ້າຍ່ອຍຕາມ parent ID
router.get('/products/categories/sub/:parentId', productController.getSubCategoriesByParent);

// ດຶງລາຍການປະເພດສິນຄ້າ (ຮູບແບບເດີມ)
router.get('/products/categories/all', productController.getCategories);

// ດຶງລາຍການຍີ່ຫໍ້ສິນຄ້າ
router.get('/products/brands/all', productController.getBrands);

// ດຶງລາຍການຜູ້ສະໜອງ
router.get('/products/suppliers/all', productController.getSuppliers);

// ຄົ້ນຫາສິນຄ້າຕາມຄຳຄົ້ນຫາ
router.get('/products/search', productController.searchProducts);

// ອັບເດດຈຳນວນສິນຄ້າ
router.patch('/products/:id/quantity', [authMiddleware, isAdmin], productController.updateProductQuantity);

// ດຶງຂໍ້ມູນສິນຄ້າທັງໝົດ
router.get('/products', productController.getAllProducts);

// ດຶງຂໍ້ມູນສິນຄ້າຕາມ ID
router.get('/products/:id', productController.getProductById);

// ເພີ່ມສິນຄ້າໃໝ່
router.post('/products', [authMiddleware, isAdmin, upload.single('image')], (req, res, next) => {
    try {
        productController.createProduct(req, res, next);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'ເກີດຂໍ້ຜິດພາດໃນການເພີ່ມສິນຄ້າ'
        });
    }
});

// ອັບເດດຂໍ້ມູນສິນຄ້າ
router.put('/products/:id', [authMiddleware, isAdmin, upload.single('image')], (req, res, next) => {
    try {
        productController.updateProduct(req, res, next);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'ເກີດຂໍ້ຜິດພາດໃນການອັບເດດສິນຄ້າ'
        });
    }
});

// ລຶບສິນຄ້າ
router.delete('/products/:id', [authMiddleware, isAdmin], productController.deleteProduct);

// ການຈັດການຂໍ້ຜິດພາດໃນການອັບໂຫຼດໄຟລ໌
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // ຂໍ້ຜິດພາດຈາກ multer
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'ໄຟລ໌ມີຂະໜາດໃຫຍ່ເກີນໄປ. ຂະໜາດສູງສຸດທີ່ອະນຸຍາດແມ່ນ 5MB.'
            });
        }
        return res.status(400).json({
            success: false,
            message: `ເກີດຂໍ້ຜິດພາດໃນການອັບໂຫຼດໄຟລ໌: ${err.message}`
        });
    }

    if (err) {
        // ຂໍ້ຜິດພາດອື່ນໆ
        return res.status(500).json({
            success: false,
            message: err.message || 'ເກີດຂໍ້ຜິດພາດໃນການດຳເນີນການກັບຄຳຮ້ອງຂໍ'
        });
    }

    next();
});

module.exports = router;



