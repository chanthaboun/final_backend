// // product.controller.js 

// // backend/controllers/product.controller.js
// const productModel = require('../models/product.model');
// const db = require('../config/db');
// const { handleError, handleNotFound, handleBadRequest } = require('../utils/errorHandler');
// const path = require('node:path');
// const fs = require('node:fs');

// // ກຳນົດ directory ສຳລັບບັນທຶກຮູບພາບ
// const uploadDir = path.join(__dirname, '../uploads/products');

// // ສ້າງ directory ຖ້າບໍ່ມີ
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// // ດຶງລາຍການສິນຄ້າທັງໝົດ
// const getAllProducts = (req, res) => {
//     productModel.getAllProducts((err, products) => {
//         if (err) {
//             return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນສິນຄ້າ', res);
//         }
//         res.status(200).json({ success: true, products });
//     });
// };

// // ດຶງຂໍ້ມູນສິນຄ້າຕາມ ID
// const getProductById = (req, res) => {
//     const id = req.params.id;

//     // ແຍກລະຫັດຕົວເລກອອກຈາກ ID ທີ່ຮັບມາ (ເຊັ່ນ: P001 -> 1)
//     let productId = id;
//     if (id.startsWith('P')) {
//         productId = Number.parseInt(id.substring(1));
//     } else {
//         productId = Number.parseInt(id);
//     }

//     if (Number.isNaN(productId)) {
//         return handleBadRequest(res, 'ID ສິນຄ້າບໍ່ຖືກຕ້ອງ');
//     }

//     productModel.getProductById(productId, (err, product) => {
//         if (err) {
//             return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນສິນຄ້າ', res);
//         }

//         if (!product) {
//             return handleNotFound(res, 'ບໍ່ພົບສິນຄ້າທີ່ຮ້ອງຂໍ');
//         }

//         res.status(200).json({ success: true, product });
//     });
// };

// // ຄົ້ນຫາສິນຄ້າຕາມຄຳຄົ້ນຫາ
// const searchProducts = (req, res) => {
//     const { query } = req.query;

//     if (!query) {
//         return getAllProducts(req, res);
//     }

//     productModel.searchProducts(query, (err, products) => {
//         if (err) {
//             return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການຄົ້ນຫາສິນຄ້າ', res);
//         }

//         res.status(200).json({ success: true, products });
//     });
// };

// // ເພີ່ມສິນຄ້າໃໝ່
// const createProduct = (req, res) => {
//     const productData = req.body;

//     // ກວດສອບຂໍ້ມູນພື້ນຖານ
//     if (!productData.name) {
//         return handleBadRequest(res, 'ກະລຸນາປ້ອນຊື່ສິນຄ້າ');
//     }

//     // ຈັດການກັບການອັບໂຫຼດຮູບພາບ (ຖ້າມີ)
//     let imageUrl = '';
//     if (req.file) {
//         const filename = `product_${Date.now()}${path.extname(req.file.originalname)}`;
//         const filepath = path.join(uploadDir, filename);

//         // ບັນທຶກໄຟລ໌ໃສ່ server
//         fs.writeFileSync(filepath, req.file.buffer);
//         imageUrl = `/uploads/products/${filename}`;
//     }

//     // ຖ້າມີຮູບພາບ, ໃຫ້ໃຊ້ url ຂອງຮູບພາບທີ່ອັບໂຫຼດ
//     if (imageUrl) {
//         productData.imageUrl = imageUrl;
//     }

//     productModel.createProduct(productData, (err, product) => {
//         if (err) {
//             return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການເພີ່ມສິນຄ້າ', res);
//         }

//         res.status(201).json({
//             success: true,
//             message: 'ສ້າງຂໍ້ມູນສິນຄ້າສຳເລັດແລ້ວ',
//             product
//         });
//     });
// };

// // ອັບເດດຂໍ້ມູນສິນຄ້າ
// const updateProduct = (req, res) => {
//     const id = req.params.id;
//     const productData = req.body;

//     // ແຍກລະຫັດຕົວເລກອອກຈາກ ID ທີ່ຮັບມາ (ເຊັ່ນ: P001 -> 1)
//     let productId = id;
//     if (id.startsWith('P')) {
//         productId = Number.parseInt(id.substring(1));
//     } else {
//         productId = Number.parseInt(id);
//     }

//     if (Number.isNaN(productId)) {
//         return handleBadRequest(res, 'ID ສິນຄ້າບໍ່ຖືກຕ້ອງ');
//     }

//     // ກວດສອບຂໍ້ມູນພື້ນຖານ
//     if (!productData.name) {
//         return handleBadRequest(res, 'ກະລຸນາປ້ອນຊື່ສິນຄ້າ');
//     }

//     // ດຶງຂໍ້ມູນສິນຄ້າປັດຈຸບັນ ເພື່ອເກັບຂໍ້ມູນຮູບພາບເກົ່າໄວ້
//     productModel.getProductById(productId, (err, currentProduct) => {
//         if (err) {
//             return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນສິນຄ້າ', res);
//         }

//         if (!currentProduct) {
//             return handleNotFound(res, 'ບໍ່ພົບສິນຄ້າທີ່ຮ້ອງຂໍ');
//         }

//         // ຈັດການກັບການອັບໂຫຼດຮູບພາບໃໝ່ (ຖ້າມີ)
//         let imageUrl = currentProduct.imageUrl;
//         if (req.file) {
//             const filename = `product_${Date.now()}${path.extname(req.file.originalname)}`;
//             const filepath = path.join(uploadDir, filename);

//             // ບັນທຶກໄຟລ໌ໃໝ່ໃສ່ server
//             fs.writeFileSync(filepath, req.file.buffer);
//             imageUrl = `/uploads/products/${filename}`;

//             // ລຶບຮູບພາບເກົ່າ (ຖ້າມີ)
//             if (currentProduct.imageUrl && currentProduct.imageUrl !== imageUrl) {
//                 const oldImagePath = path.join(__dirname, '..', currentProduct.imageUrl);
//                 if (fs.existsSync(oldImagePath)) {
//                     fs.unlinkSync(oldImagePath);
//                 }
//             }
//         }

//         // ຖ້າມີຮູບພາບ, ໃຫ້ໃຊ້ url ຂອງຮູບພາບທີ່ອັບໂຫຼດ
//         if (imageUrl) {
//             productData.imageUrl = imageUrl;
//         }

//         productModel.updateProduct(productId, productData, (err, product) => {
//             if (err) {
//                 return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການອັບເດດສິນຄ້າ', res);
//             }

//             if (!product) {
//                 return handleNotFound(res, 'ບໍ່ພົບສິນຄ້າທີ່ຮ້ອງຂໍ');
//             }

//             res.status(200).json({
//                 success: true,
//                 message: 'ອັບເດດຂໍ້ມູນສິນຄ້າສຳເລັດແລ້ວ',
//                 product
//             });
//         });
//     });
// };

// // ລຶບສິນຄ້າ
// const deleteProduct = (req, res) => {
//     const id = req.params.id;

//     // ແຍກລະຫັດຕົວເລກອອກຈາກ ID ທີ່ຮັບມາ (ເຊັ່ນ: P001 -> 1)
//     let productId = id;
//     if (id.startsWith('P')) {
//         productId = Number.parseInt(id.substring(1));
//     } else {
//         productId = Number.parseInt(id);
//     }

//     if (Number.isNaN(productId)) {
//         return handleBadRequest(res, 'ID ສິນຄ້າບໍ່ຖືກຕ້ອງ');
//     }

//     // ດຶງຂໍ້ມູນສິນຄ້າເພື່ອໃຫ້ໄດ້ເສັ້ນທາງຮູບພາບ
//     productModel.getProductById(productId, (err, product) => {
//         if (err) {
//             return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນສິນຄ້າ', res);
//         }

//         if (!product) {
//             return handleNotFound(res, 'ບໍ່ພົບສິນຄ້າທີ່ຮ້ອງຂໍ');
//         }

//         // ລຶບສິນຄ້າຈາກຖານຂໍ້ມູນ
//         productModel.deleteProduct(productId, (err, result) => {
//             if (err) {
//                 return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການລຶບສິນຄ້າ', res);
//             }

//             if (!result.success) {
//                 return handleNotFound(res, 'ບໍ່ພົບສິນຄ້າທີ່ຮ້ອງຂໍ');
//             }

//             // ລຶບຮູບພາບທີ່ກ່ຽວຂ້ອງ (ຖ້າມີ)
//             if (product.imageUrl) {
//                 const imagePath = path.join(__dirname, '..', product.imageUrl);
//                 if (fs.existsSync(imagePath)) {
//                     fs.unlinkSync(imagePath);
//                 }
//             }

//             res.status(200).json({
//                 success: true,
//                 message: 'ລຶບຂໍ້ມູນສິນຄ້າສຳເລັດແລ້ວ'
//             });
//         });
//     });
// };

// // ອັບເດດຈຳນວນສິນຄ້າ
// const updateProductQuantity = (req, res) => {
//     const id = req.params.id;
//     const { quantity } = req.body;

//     // ແຍກລະຫັດຕົວເລກອອກຈາກ ID ທີ່ຮັບມາ (ເຊັ່ນ: P001 -> 1)
//     let productId = id;
//     if (id.startsWith('P')) {
//         productId = Number.parseInt(id.substring(1));
//     } else {
//         productId = Number.parseInt(id);
//     }

//     if (Number.isNaN(productId) || Number.isNaN(quantity)) {
//         return handleBadRequest(res, 'ຂໍ້ມູນບໍ່ຖືກຕ້ອງ');
//     }

//     productModel.updateProductQuantity(productId, quantity, (err, product) => {
//         if (err) {
//             return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການອັບເດດຈຳນວນສິນຄ້າ', res);
//         }

//         if (!product) {
//             return handleNotFound(res, 'ບໍ່ພົບສິນຄ້າທີ່ຮ້ອງຂໍ');
//         }

//         res.status(200).json({
//             success: true,
//             message: 'ອັບເດດຈຳນວນສິນຄ້າສຳເລັດແລ້ວ',
//             product
//         });
//     });
// };

// // ເອົາລາຍການໜ່ວຍສິນຄ້າ
// const getUnits = (req, res) => {
//     // ຕາມທີ່ກຳນົດໄວ້ໃນ frontend
//     const units = [
//         "ອັນ", "ຕຸກ", "ເສັ້ນ", "ຄັນ", "ຫົວ", "ຂວດ", "ກ່ອງ", "ຊອງ", "ຖົງ",
//         "ໜ່ວຍ", "ເຄື່ອງ", "ຊຸດ", "ກິໂລກຣາມ", "ແມັດ", "ລິດ", "ຈອກ",
//         "ຊຸດ", "ແພັກ", "ແຜ່ນ"
//     ];

//     res.status(200).json({ success: true, units });
// };

// // ເອົາລາຍການປະເພດສິນຄ້າ
// const getCategories = (req, res) => {
//     // ດຶງຂໍ້ມູນຈາກຖານຂໍ້ມູນຈິງ
//     const query = 'SELECT * FROM category ORDER BY categoryName';

//     db.query(query, (err, results) => {
//         if (err) {
//             return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນປະເພດສິນຄ້າ', res);
//         }

//         const categories = results.map(cat => cat.categoryName);
//         res.status(200).json({ success: true, categories });
//     });
// };

// // ເອົາລາຍການຍີ່ຫໍ້ສິນຄ້າ
// const getBrands = (req, res) => {
//     // ດຶງຂໍ້ມູນຈາກຖານຂໍ້ມູນຈິງ
//     const query = 'SELECT * FROM brand ORDER BY brandName';

//     db.query(query, (err, results) => {
//         if (err) {
//             return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າ', res);
//         }

//         const brands = results.map(brand => brand.brandName);
//         res.status(200).json({ success: true, brands });
//     });
// };

// module.exports = {
//     getAllProducts,
//     getProductById,
//     searchProducts,
//     createProduct,
//     updateProduct,
//     deleteProduct,
//     updateProductQuantity,
//     getUnits,
//     getCategories,
//     getBrands
// };


// // backend/controllers/product.controller.js
// const productModel = require('../models/product.model');
// const db = require('../config/db');
// const { handleError, handleNotFound, handleBadRequest, getFormattedDate } = require('../utils/errorHandler');
// const path = require('node:path');
// const fs = require('node:fs');

// // ກຳນົດ directory ສຳລັບບັນທຶກຮູບພາບ
// const uploadDir = path.join(__dirname, '../uploads/products');

// // ສ້າງ directory ຖ້າບໍ່ມີ
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
//     // console.log('ສ້າງໂຟລເດີ uploads/products ສຳເລັດ');
// }

// // ດຶງລາຍການສິນຄ້າທັງໝົດ
// const getAllProducts = (req, res) => {
//     productModel.getAllProducts((err, products) => {
//         if (err) {
//             return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນສິນຄ້າ', res);
//         }
//         // console.log(`ພົບສິນຄ້າຈຳນວນ ${products.length} ລາຍການ`);
//         res.status(200).json({ success: true, products });
//     });
// };

// // ດຶງຂໍ້ມູນສິນຄ້າຕາມ ID
// const getProductById = (req, res) => {
//     const id = req.params.id;

//     // ແຍກລະຫັດຕົວເລກອອກຈາກ ID ທີ່ຮັບມາ (ເຊັ່ນ: P001 -> 1)
//     let productId = id;
//     if (id.startsWith('P')) {
//         productId = Number.parseInt(id.substring(1));
//     } else {
//         productId = Number.parseInt(id);
//     }

//     if (Number.isNaN(productId)) {
//         return handleBadRequest(res, 'ID ສິນຄ້າບໍ່ຖືກຕ້ອງ');
//     }

//     productModel.getProductById(productId, (err, product) => {
//         if (err) {
//             return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນສິນຄ້າ', res);
//         }

//         if (!product) {
//             return handleNotFound(res, 'ບໍ່ພົບສິນຄ້າທີ່ຮ້ອງຂໍ');
//         }

//         // console.log('ດຶງຂໍ້ມູນສິນຄ້າ ID:', productId, 'imageUrl:', product.imageUrl);
//         res.status(200).json({ success: true, product });
//     });
// };

// // ຄົ້ນຫາສິນຄ້າຕາມຄຳຄົ້ນຫາ
// const searchProducts = (req, res) => {
//     const { query } = req.query;

//     if (!query) {
//         return getAllProducts(req, res);
//     }

//     productModel.searchProducts(query, (err, products) => {
//         if (err) {
//             return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການຄົ້ນຫາສິນຄ້າ', res);
//         }

//         // console.log(`ຄົ້ນຫາ "${query}" ພົບ ${products.length} ລາຍການ`);
//         res.status(200).json({ success: true, products });
//     });
// };

// // ເພີ່ມສິນຄ້າໃໝ່
// const createProduct = (req, res) => {
//     const productData = req.body;

//     // ກວດສອບຂໍ້ມູນພື້ນຖານ
//     if (!productData.name) {
//         return handleBadRequest(res, 'ກະລຸນາປ້ອນຊື່ສິນຄ້າ');
//     }

//     // console.log('ເລີ່ມຕົ້ນການເພີ່ມສິນຄ້າ:', productData.name);

//     // ຈັດການກັບການອັບໂຫຼດຮູບພາບ (ຖ້າມີ)
//     let imageUrl = '';
//     if (req.file) {
//         // console.log('ພົບໄຟລ໌ຮູບພາບ:', req.file.originalname, 'ຂະໜາດ:', req.file.size, 'bytes');
//         const filename = `product_${Date.now()}${path.extname(req.file.originalname)}`;
//         const filepath = path.join(uploadDir, filename);

//         try {
//             // ບັນທຶກໄຟລ໌ໃສ່ server
//             fs.writeFileSync(filepath, req.file.buffer);
//             // console.log('ບັນທຶກຮູບພາບສຳເລັດທີ່:', filepath);

//             // ຕ້ອງເລີ່ມຕົ້ນດ້ວຍ "/"
//             imageUrl = `/uploads/products/${filename}`;
//             // console.log('URL ຂອງຮູບພາບ:', imageUrl);
//         } catch (error) {
//             // console.error('ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຮູບພາບ:', error);
//             return handleError(error, 'ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຮູບພາບ', res);
//         }
//     }

//     // ຖ້າມີຮູບພາບ, ໃຫ້ໃຊ້ url ຂອງຮູບພາບທີ່ອັບໂຫຼດ
//     if (imageUrl) {
//         productData.imageUrl = imageUrl;
//     }

//     productModel.createProduct(productData, (err, product) => {
//         if (err) {
//             return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການເພີ່ມສິນຄ້າ', res);
//         }

//         // console.log('ເພີ່ມສິນຄ້າສຳເລັດ:', product.id);
//         res.status(201).json({
//             success: true,
//             message: 'ສ້າງຂໍ້ມູນສິນຄ້າສຳເລັດແລ້ວ',
//             product
//         });
//     });
// };

// // ອັບເດດຂໍ້ມູນສິນຄ້າ
// const updateProduct = (req, res) => {
//     const id = req.params.id;
//     const productData = req.body;

//     // ແຍກລະຫັດຕົວເລກອອກຈາກ ID ທີ່ຮັບມາ (ເຊັ່ນ: P001 -> 1)
//     let productId = id;
//     if (id.startsWith('P')) {
//         productId = Number.parseInt(id.substring(1));
//     } else {
//         productId = Number.parseInt(id);
//     }

//     if (Number.isNaN(productId)) {
//         return handleBadRequest(res, 'ID ສິນຄ້າບໍ່ຖືກຕ້ອງ');
//     }

//     // ກວດສອບຂໍ້ມູນພື້ນຖານ
//     if (!productData.name) {
//         return handleBadRequest(res, 'ກະລຸນາປ້ອນຊື່ສິນຄ້າ');
//     }

//     // console.log('ເລີ່ມຕົ້ນການອັບເດດສິນຄ້າ ID:', productId);

//     // ດຶງຂໍ້ມູນສິນຄ້າປັດຈຸບັນ ເພື່ອເກັບຂໍ້ມູນຮູບພາບເກົ່າໄວ້
//     productModel.getProductById(productId, (err, currentProduct) => {
//         if (err) {
//             return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນສິນຄ້າ', res);
//         }

//         if (!currentProduct) {
//             return handleNotFound(res, 'ບໍ່ພົບສິນຄ້າທີ່ຮ້ອງຂໍ');
//         }

//         // ຈັດການກັບການອັບໂຫຼດຮູບພາບໃໝ່ (ຖ້າມີ)
//         let imageUrl = currentProduct.imageUrl;
//         if (req.file) {
//             // console.log('ພົບໄຟລ໌ຮູບພາບໃໝ່:', req.file.originalname);
//             const filename = `product_${Date.now()}${path.extname(req.file.originalname)}`;
//             const filepath = path.join(uploadDir, filename);

//             try {
//                 // ບັນທຶກໄຟລ໌ໃໝ່ໃສ່ server
//                 fs.writeFileSync(filepath, req.file.buffer);
//                 // console.log('ບັນທຶກຮູບພາບໃໝ່ສຳເລັດທີ່:', filepath);

//                 // ຕ້ອງເລີ່ມຕົ້ນດ້ວຍ "/"
//                 imageUrl = `/uploads/products/${filename}`;
//                 // console.log('URL ຂອງຮູບພາບໃໝ່:', imageUrl);

//                 // ລຶບຮູບພາບເກົ່າ (ຖ້າມີ)
//                 if (currentProduct.imageUrl && currentProduct.imageUrl !== imageUrl) {
//                     const oldImagePath = path.join(__dirname, '..', currentProduct.imageUrl);
//                     if (fs.existsSync(oldImagePath)) {
//                         fs.unlinkSync(oldImagePath);
//                         console.log('ລຶບຮູບພາບເກົ່າສຳເລັດ:', oldImagePath);
//                     }
//                 }
//             } catch (error) {
//                 // console.error('ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຮູບພາບໃໝ່:', error);
//                 return handleError(error, 'ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຮູບພາບໃໝ່', res);
//             }
//         }

//         // ຖ້າມີຮູບພາບ, ໃຫ້ໃຊ້ url ຂອງຮູບພາບທີ່ອັບໂຫຼດ
//         if (imageUrl) {
//             productData.imageUrl = imageUrl;
//         }

//         productModel.updateProduct(productId, productData, (err, product) => {
//             if (err) {
//                 return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການອັບເດດສິນຄ້າ', res);
//             }

//             if (!product) {
//                 return handleNotFound(res, 'ບໍ່ພົບສິນຄ້າທີ່ຮ້ອງຂໍ');
//             }

//             // console.log('ອັບເດດສິນຄ້າສຳເລັດ:', product.id);
//             res.status(200).json({
//                 success: true,
//                 message: 'ອັບເດດຂໍ້ມູນສິນຄ້າສຳເລັດແລ້ວ',
//                 product
//             });
//         });
//     });
// };

// // ລຶບສິນຄ້າ
// const deleteProduct = (req, res) => {
//     const id = req.params.id;

//     // ແຍກລະຫັດຕົວເລກອອກຈາກ ID ທີ່ຮັບມາ (ເຊັ່ນ: P001 -> 1)
//     let productId = id;
//     if (id.startsWith('P')) {
//         productId = Number.parseInt(id.substring(1));
//     } else {
//         productId = Number.parseInt(id);
//     }

//     if (Number.isNaN(productId)) {
//         return handleBadRequest(res, 'ID ສິນຄ້າບໍ່ຖືກຕ້ອງ');
//     }

//     // console.log('ເລີ່ມຕົ້ນການລຶບສິນຄ້າ ID:', productId);

//     // ດຶງຂໍ້ມູນສິນຄ້າເພື່ອໃຫ້ໄດ້ເສັ້ນທາງຮູບພາບ
//     productModel.getProductById(productId, (err, product) => {
//         if (err) {
//             return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນສິນຄ້າ', res);
//         }

//         if (!product) {
//             return handleNotFound(res, 'ບໍ່ພົບສິນຄ້າທີ່ຮ້ອງຂໍ');
//         }

//         // ລຶບສິນຄ້າຈາກຖານຂໍ້ມູນ
//         productModel.deleteProduct(productId, (err, result) => {
//             if (err) {
//                 return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການລຶບສິນຄ້າ', res);
//             }

//             if (!result.success) {
//                 return handleNotFound(res, 'ບໍ່ພົບສິນຄ້າທີ່ຮ້ອງຂໍ');
//             }

//             // ລຶບຮູບພາບທີ່ກ່ຽວຂ້ອງ (ຖ້າມີ)
//             if (product.imageUrl) {
//                 const imagePath = path.join(__dirname, '..', product.imageUrl);
//                 // console.log('ກຳລັງລຶບຮູບພາບທີ່:', imagePath);
//                 if (fs.existsSync(imagePath)) {
//                     fs.unlinkSync(imagePath);
//                     console.log('ລຶບຮູບພາບສຳເລັດ');
//                 } else {
//                     console.log('ບໍ່ພົບໄຟລ໌ຮູບພາບ');
//                 }
//             }

//             // console.log('ລຶບສິນຄ້າສຳເລັດ:', productId);
//             res.status(200).json({
//                 success: true,
//                 message: 'ລຶບຂໍ້ມູນສິນຄ້າສຳເລັດແລ້ວ'
//             });
//         });
//     });
// };

// // ອັບເດດຈຳນວນສິນຄ້າ
// const updateProductQuantity = (req, res) => {
//     const id = req.params.id;
//     const { quantity } = req.body;

//     // ແຍກລະຫັດຕົວເລກອອກຈາກ ID ທີ່ຮັບມາ (ເຊັ່ນ: P001 -> 1)
//     let productId = id;
//     if (id.startsWith('P')) {
//         productId = Number.parseInt(id.substring(1));
//     } else {
//         productId = Number.parseInt(id);
//     }

//     if (Number.isNaN(productId) || Number.isNaN(quantity)) {
//         return handleBadRequest(res, 'ຂໍ້ມູນບໍ່ຖືກຕ້ອງ');
//     }

//     // console.log('ອັບເດດຈຳນວນສິນຄ້າ ID:', productId, 'ຈຳນວນໃໝ່:', quantity);

//     productModel.updateProductQuantity(productId, quantity, (err, product) => {
//         if (err) {
//             return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການອັບເດດຈຳນວນສິນຄ້າ', res);
//         }

//         if (!product) {
//             return handleNotFound(res, 'ບໍ່ພົບສິນຄ້າທີ່ຮ້ອງຂໍ');
//         }

//         // console.log('ອັບເດດຈຳນວນສິນຄ້າສຳເລັດ');
//         res.status(200).json({
//             success: true,
//             message: 'ອັບເດດຈຳນວນສິນຄ້າສຳເລັດແລ້ວ',
//             product
//         });
//     });
// };

// // ເອົາລາຍການໜ່ວຍສິນຄ້າ
// const getUnits = (req, res) => {
//     // ຕາມທີ່ກຳນົດໄວ້ໃນ frontend
//     const units = [
//         "ອັນ", "ຕຸກ", "ເສັ້ນ", "ຄັນ", "ຫົວ", "ຂວດ", "ກ່ອງ", "ຊອງ", "ຖົງ",
//         "ໜ່ວຍ", "ເຄື່ອງ", "ຊຸດ", "ກິໂລກຣາມ", "ແມັດ", "ລິດ", "ຈອກ",
//         "ຊຸດ", "ແພັກ", "ແຜ່ນ"
//     ];

//     // console.log('ສົ່ງຂໍ້ມູນໜ່ວຍສິນຄ້າ', units.length, 'ລາຍການ');
//     res.status(200).json({ success: true, units });
// };

// // ເອົາລາຍການປະເພດສິນຄ້າ
// const getCategories = (req, res) => {
//     // ດຶງຂໍ້ມູນຈາກຖານຂໍ້ມູນຈິງ
//     const query = 'SELECT * FROM category ORDER BY categoryName';

//     db.query(query, (err, results) => {
//         if (err) {
//             return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນປະເພດສິນຄ້າ', res);
//         }

//         const categories = results.map(cat => cat.categoryName);
//         // console.log('ສົ່ງຂໍ້ມູນປະເພດສິນຄ້າ', categories.length, 'ລາຍການ');
//         res.status(200).json({ success: true, categories });
//     });
// };

// // ເອົາລາຍການຍີ່ຫໍ້ສິນຄ້າ
// const getBrands = (req, res) => {
//     // ດຶງຂໍ້ມູນຈາກຖານຂໍ້ມູນຈິງ
//     const query = 'SELECT * FROM brand ORDER BY brandName';

//     db.query(query, (err, results) => {
//         if (err) {
//             return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າ', res);
//         }

//         const brands = results.map(brand => brand.brandName);
//         // console.log('ສົ່ງຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າ', brands.length, 'ລາຍການ');
//         res.status(200).json({ success: true, brands });
//     });
// };

// module.exports = {
//     getAllProducts,
//     getProductById,
//     searchProducts,
//     createProduct,
//     updateProduct,
//     deleteProduct,
//     updateProductQuantity,
//     getUnits,
//     getCategories,
//     getBrands
// };




// backend/controllers/product.controller.js
const productModel = require('../models/product.model');
const db = require('../config/db');
const { handleError, handleNotFound, handleBadRequest, getFormattedDate } = require('../utils/errorHandler');
const path = require('node:path');
const fs = require('node:fs');

// ກຳນົດ directory ສຳລັບບັນທຶກຮູບພາບ
const uploadDir = path.join(__dirname, '../uploads/products');

// ສ້າງ directory ຖ້າບໍ່ມີ
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('ສ້າງໂຟລເດີ uploads/products ສຳເລັດ');
}

// ຟັງຊັນຊ່ວຍແປງ ID
const parseProductId = (id) => {
    if (typeof id === 'string' && id.startsWith('P')) {
        return Number.parseInt(id.substring(1));
    }
    return Number.parseInt(id);
};

// ດຶງລາຍການສິນຄ້າທັງໝົດ
const getAllProducts = (req, res) => {
    productModel.getAllProducts((err, products) => {
        if (err) {
            return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນສິນຄ້າ', res);
        }
        console.log(`ພົບສິນຄ້າຈຳນວນ ${products.length} ລາຍການ`);
        res.status(200).json({ success: true, products });
    });
};

// ດຶງຂໍ້ມູນສິນຄ້າຕາມ ID
const getProductById = (req, res) => {
    const id = req.params.id;
    const productId = parseProductId(id);

    if (Number.isNaN(productId)) {
        return handleBadRequest(res, 'ID ສິນຄ້າບໍ່ຖືກຕ້ອງ');
    }

    productModel.getProductById(productId, (err, product) => {
        if (err) {
            return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນສິນຄ້າ', res);
        }

        if (!product) {
            return handleNotFound(res, 'ບໍ່ພົບສິນຄ້າທີ່ຮ້ອງຂໍ');
        }

        console.log('ດຶງຂໍ້ມູນສິນຄ້າ ID:', productId, 'imageUrl:', product.imageUrl);
        res.status(200).json({ success: true, product });
    });
};

// ຄົ້ນຫາສິນຄ້າຕາມຄຳຄົ້ນຫາ
const searchProducts = (req, res) => {
    const { query } = req.query;

    if (!query) {
        return getAllProducts(req, res);
    }

    productModel.searchProducts(query, (err, products) => {
        if (err) {
            return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການຄົ້ນຫາສິນຄ້າ', res);
        }

        console.log(`ຄົ້ນຫາ "${query}" ພົບ ${products.length} ລາຍການ`);
        res.status(200).json({ success: true, products });
    });
};

// ເພີ່ມສິນຄ້າໃໝ່
const createProduct = (req, res) => {
    const productData = req.body;

    // ກວດສອບຂໍ້ມູນພື້ນຖານ
    if (!productData.name) {
        return handleBadRequest(res, 'ກະລຸນາປ້ອນຊື່ສິນຄ້າ');
    }

    console.log('ເລີ່ມຕົ້ນການເພີ່ມສິນຄ້າ:', productData.name);

    // ຈັດການກັບການອັບໂຫຼດຮູບພາບ (ຖ້າມີ)
    let imageUrl = '';
    if (req.file) {
        console.log('ພົບໄຟລ໌ຮູບພາບ:', req.file.originalname, 'ຂະໜາດ:', req.file.size, 'bytes');
        const filename = `product_${Date.now()}${path.extname(req.file.originalname)}`;
        const filepath = path.join(uploadDir, filename);

        try {
            // ບັນທຶກໄຟລ໌ໃສ່ server
            fs.writeFileSync(filepath, req.file.buffer);
            console.log('ບັນທຶກຮູບພາບສຳເລັດທີ່:', filepath);

            // ຕ້ອງເລີ່ມຕົ້ນດ້ວຍ "/"
            imageUrl = `/uploads/products/${filename}`;
            console.log('URL ຂອງຮູບພາບ:', imageUrl);
        } catch (error) {
            console.error('ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຮູບພາບ:', error);
            return handleError(error, 'ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຮູບພາບ', res);
        }
    }

    // ຖ້າມີຮູບພາບ, ໃຫ້ໃຊ້ url ຂອງຮູບພາບທີ່ອັບໂຫຼດ
    if (imageUrl) {
        productData.imageUrl = imageUrl;
    }

    productModel.createProduct(productData, (err, product) => {
        if (err) {
            return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການເພີ່ມສິນຄ້າ', res);
        }

        console.log('ເພີ່ມສິນຄ້າສຳເລັດ:', product.id);
        res.status(201).json({
            success: true,
            message: 'ສ້າງຂໍ້ມູນສິນຄ້າສຳເລັດແລ້ວ',
            product
        });
    });
};

// ອັບເດດຂໍ້ມູນສິນຄ້າ
const updateProduct = (req, res) => {
    const id = req.params.id;
    const productData = req.body;
    const productId = parseProductId(id);

    if (Number.isNaN(productId)) {
        return handleBadRequest(res, 'ID ສິນຄ້າບໍ່ຖືກຕ້ອງ');
    }

    // ກວດສອບຂໍ້ມູນພື້ນຖານ
    if (!productData.name) {
        return handleBadRequest(res, 'ກະລຸນາປ້ອນຊື່ສິນຄ້າ');
    }

    console.log('ເລີ່ມຕົ້ນການອັບເດດສິນຄ້າ ID:', productId);

    // ດຶງຂໍ້ມູນສິນຄ້າປັດຈຸບັນ ເພື່ອເກັບຂໍ້ມູນຮູບພາບເກົ່າໄວ້
    productModel.getProductById(productId, (err, currentProduct) => {
        if (err) {
            return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນສິນຄ້າ', res);
        }

        if (!currentProduct) {
            return handleNotFound(res, 'ບໍ່ພົບສິນຄ້າທີ່ຮ້ອງຂໍ');
        }

        // ຈັດການກັບການອັບໂຫຼດຮູບພາບໃໝ່ (ຖ້າມີ)
        let imageUrl = currentProduct.imageUrl;
        if (req.file) {
            console.log('ພົບໄຟລ໌ຮູບພາບໃໝ່:', req.file.originalname);
            const filename = `product_${Date.now()}${path.extname(req.file.originalname)}`;
            const filepath = path.join(uploadDir, filename);

            try {
                // ບັນທຶກໄຟລ໌ໃໝ່ໃສ່ server
                fs.writeFileSync(filepath, req.file.buffer);
                console.log('ບັນທຶກຮູບພາບໃໝ່ສຳເລັດທີ່:', filepath);

                // ຕ້ອງເລີ່ມຕົ້ນດ້ວຍ "/"
                imageUrl = `/uploads/products/${filename}`;
                console.log('URL ຂອງຮູບພາບໃໝ່:', imageUrl);

                // ລຶບຮູບພາບເກົ່າ (ຖ້າມີ)
                if (currentProduct.imageUrl && currentProduct.imageUrl !== imageUrl) {
                    const oldImagePath = path.join(__dirname, '..', currentProduct.imageUrl);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                        console.log('ລຶບຮູບພາບເກົ່າສຳເລັດ:', oldImagePath);
                    }
                }
            } catch (error) {
                console.error('ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຮູບພາບໃໝ່:', error);
                return handleError(error, 'ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຮູບພາບໃໝ່', res);
            }
        }

        // ຖ້າມີຮູບພາບ, ໃຫ້ໃຊ້ url ຂອງຮູບພາບທີ່ອັບໂຫຼດ
        if (imageUrl) {
            productData.imageUrl = imageUrl;
        }

        productModel.updateProduct(productId, productData, (err, product) => {
            if (err) {
                return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການອັບເດດສິນຄ້າ', res);
            }

            if (!product) {
                return handleNotFound(res, 'ບໍ່ພົບສິນຄ້າທີ່ຮ້ອງຂໍ');
            }

            console.log('ອັບເດດສິນຄ້າສຳເລັດ:', product.id);
            res.status(200).json({
                success: true,
                message: 'ອັບເດດຂໍ້ມູນສິນຄ້າສຳເລັດແລ້ວ',
                product
            });
        });
    });
};

// ລຶບສິນຄ້າ
const deleteProduct = (req, res) => {
    const id = req.params.id;
    const productId = parseProductId(id);

    if (Number.isNaN(productId)) {
        return handleBadRequest(res, 'ID ສິນຄ້າບໍ່ຖືກຕ້ອງ');
    }

    console.log('ເລີ່ມຕົ້ນການລຶບສິນຄ້າ ID:', productId);

    // ດຶງຂໍ້ມູນສິນຄ້າເພື່ອໃຫ້ໄດ້ເສັ້ນທາງຮູບພາບ
    productModel.getProductById(productId, (err, product) => {
        if (err) {
            return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນສິນຄ້າ', res);
        }

        if (!product) {
            return handleNotFound(res, 'ບໍ່ພົບສິນຄ້າທີ່ຮ້ອງຂໍ');
        }

        // ລຶບສິນຄ້າຈາກຖານຂໍ້ມູນ
        productModel.deleteProduct(productId, (err, result) => {
            if (err) {
                return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການລຶບສິນຄ້າ', res);
            }

            if (!result.success) {
                return handleNotFound(res, 'ບໍ່ພົບສິນຄ້າທີ່ຮ້ອງຂໍ');
            }

            // ລຶບຮູບພາບທີ່ກ່ຽວຂ້ອງ (ຖ້າມີ)
            if (product.imageUrl) {
                const imagePath = path.join(__dirname, '..', product.imageUrl);
                console.log('ກຳລັງລຶບຮູບພາບທີ່:', imagePath);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                    console.log('ລຶບຮູບພາບສຳເລັດ');
                } else {
                    console.log('ບໍ່ພົບໄຟລ໌ຮູບພາບ');
                }
            }

            console.log('ລຶບສິນຄ້າສຳເລັດ:', productId);
            res.status(200).json({
                success: true,
                message: 'ລຶບຂໍ້ມູນສິນຄ້າສຳເລັດແລ້ວ'
            });
        });
    });
};

// ອັບເດດຈຳນວນສິນຄ້າ
const updateProductQuantity = (req, res) => {
    const id = req.params.id;
    const { quantity } = req.body;
    const productId = parseProductId(id);

    if (Number.isNaN(productId) || Number.isNaN(quantity)) {
        return handleBadRequest(res, 'ຂໍ້ມູນບໍ່ຖືກຕ້ອງ');
    }

    console.log('ອັບເດດຈຳນວນສິນຄ້າ ID:', productId, 'ຈຳນວນໃໝ່:', quantity);

    productModel.updateProductQuantity(productId, quantity, (err, product) => {
        if (err) {
            return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການອັບເດດຈຳນວນສິນຄ້າ', res);
        }

        if (!product) {
            return handleNotFound(res, 'ບໍ່ພົບສິນຄ້າທີ່ຮ້ອງຂໍ');
        }

        console.log('ອັບເດດຈຳນວນສິນຄ້າສຳເລັດ');
        res.status(200).json({
            success: true,
            message: 'ອັບເດດຈຳນວນສິນຄ້າສຳເລັດແລ້ວ',
            product
        });
    });
};

// ເອົາລາຍການໜ່ວຍສິນຄ້າ
const getUnits = (req, res) => {
    // ຕາມທີ່ກຳນົດໄວ້ໃນ frontend
    const units = [
        "ອັນ", "ຕຸກ", "ເສັ້ນ", "ຄັນ", "ຫົວ", "ຂວດ", "ກ່ອງ", "ຊອງ", "ຖົງ",
        "ໜ່ວຍ", "ເຄື່ອງ", "ຊຸດ", "ກິໂລກຣາມ", "ແມັດ", "ລິດ", "ຈອກ",
        "ແພັກ", "ແຜ່ນ"
    ];

    // console.log('ສົ່ງຂໍ້ມູນໜ່ວຍສິນຄ້າ', units.length, 'ລາຍການ');
    res.status(200).json({ success: true, units });
};

// ເອົາລາຍການປະເພດສິນຄ້າ (ຮູບແບບເດີມ)
const getCategories = (req, res) => {
    // ດຶງຂໍ້ມູນຈາກຖານຂໍ້ມູນ - ສະເພາະປະເພດສິນຄ້າທີ່ເປີດໃຊ້ງານ
    const query = 'SELECT * FROM category WHERE categoryStatus = 1 ORDER BY categoryName';

    db.query(query, (err, results) => {
        if (err) {
            return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນປະເພດສິນຄ້າ', res);
        }

        const categories = results.map(cat => cat.categoryName);
        // console.log('ສົ່ງຂໍ້ມູນປະເພດສິນຄ້າ', categories.length, 'ລາຍການ');
        res.status(200).json({ success: true, categories });
    });
};

// 🆕 ເອົາລາຍການປະເພດສິນຄ້າແບບ hierarchical
const getCategoriesWithHierarchy = (req, res) => {
    // ດຶງຂໍ້ມູນປະເພດສິນຄ້າທັງໝົດ - ສະເພາະທີ່ເປີດໃຊ້ງານ
    const query = `
        SELECT 
            category_id,
            categoryName,
            categoryStatus,
            parent_id,
            category_level,
            created_date
        FROM category 
        WHERE categoryStatus = 1 
        ORDER BY parent_id, categoryName
    `;

    db.query(query, (err, results) => {
        if (err) {
            return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນປະເພດສິນຄ້າ', res);
        }

        // ແປງຂໍ້ມູນໃຫ້ເປັນຮູບແບບທີ່ frontend ຕ້ອງການ
        const flatList = results.map(item => ({
            id: `C${item.category_id.toString().padStart(3, '0')}`,
            name: item.categoryName,
            status: item.categoryStatus === 1,
            createdDate: new Date(item.created_date).toISOString().slice(0, 19).replace('T', ' '),
            parentId: item.parent_id ? `C${item.parent_id.toString().padStart(3, '0')}` : null,
            level: item.category_level || 0
        }));

        // ສ້າງໂຄງສ້າງແບບ tree
        const categoryMap = {};
        const rootCategories = [];

        // ສ້າງການອ້າງອີງໂດຍໃຊ້ ID
        for (const category of flatList) {
            categoryMap[category.id] = {
                ...category,
                children: [],
                hasChildren: false
            };
        }

        // ສ້າງໂຄງສ້າງແບບ tree ແລະ ກຳນົດວ່າມີລູກຫຼືບໍ່
        for (const category of flatList) {
            if (category.parentId && categoryMap[category.parentId]) {
                categoryMap[category.parentId].children.push(categoryMap[category.id]);
                categoryMap[category.parentId].hasChildren = true;
            } else {
                rootCategories.push(categoryMap[category.id]);
            }
        }

        res.status(200).json({
            success: true,
            flatList: flatList,
            hierarchical: rootCategories
        });
    });
};

// 🆕 ເອົາລາຍການປະເພດສິນຄ້າຍ່ອຍຕາມ parent ID
const getSubCategoriesByParent = (req, res) => {
    const parentId = req.params.parentId;

    if (!parentId || Number.isNaN(Number.parseInt(parentId))) {
        return res.status(400).json({
            success: false,
            message: 'ລະຫັດໝວດໝູ່ແມ່ບໍ່ຖືກຕ້ອງ'
        });
    }

    // ດຶງຂໍ້ມູນປະເພດສິນຄ້າຍ່ອຍ - ສະເພາະທີ່ເປີດໃຊ້ງານ
    const query = `
        SELECT 
            category_id,
            categoryName,
            categoryStatus,
            parent_id,
            category_level,
            created_date
        FROM category 
        WHERE parent_id = ? AND categoryStatus = 1 
        ORDER BY categoryName
    `;

    db.query(query, [parentId], (err, results) => {
        if (err) {
            return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນປະເພດສິນຄ້າຍ່ອຍ', res);
        }

        // ແປງຂໍ້ມູນໃຫ້ເປັນຮູບແບບທີ່ frontend ຕ້ອງການ
        const subCategories = results.map(item => ({
            id: `C${item.category_id.toString().padStart(3, '0')}`,
            name: item.categoryName,
            status: item.categoryStatus === 1,
            createdDate: new Date(item.created_date).toISOString().slice(0, 19).replace('T', ' '),
            parentId: `C${parentId.toString().padStart(3, '0')}`,
            level: item.category_level || 0
        }));

        res.status(200).json(subCategories);
    });
};

// ເອົາລາຍການຍີ່ຫໍ້ສິນຄ້າ
const getBrands = (req, res) => {
    // ດຶງຂໍ້ມູນຈາກຖານຂໍ້ມູນຈິງ
    const query = 'SELECT * FROM brand ORDER BY brandName';

    db.query(query, (err, results) => {
        if (err) {
            return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າ', res);
        }

        const brands = results.map(brand => brand.brandName);
        // console.log('ສົ່ງຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າ', brands.length, 'ລາຍການ');
        res.status(200).json({ success: true, brands });
    });
};


// ເອົາລາຍການຜູ້ສະໜອງສິນຄ້າ
const getSuppliers = (req, res) => {
    // ດຶງຂໍ້ມູນຈາກຖານຂໍ້ມູນຈິງ
    const query = 'SELECT * FROM suppliers ORDER BY supName';

    db.query(query, (err, results) => {
        if (err) {
            return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນຜູ້ສະໜອງສິນຄ້າ', res);
        }

        const suppliers = results.map(supplier => supplier.supName);
        console.log('ສົ່ງຂໍ້ມູນຜູ້ສະໜອງສິນຄ້າ', suppliers.length, 'ລາຍການ');
        res.status(200).json({ success: true, suppliers });
    });
};
module.exports = {
    getAllProducts,
    getProductById,
    searchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    updateProductQuantity,
    getUnits,
    getCategories,
    getBrands,
    getSuppliers,  // 🆕 ເພີ່ມບັນທັດນີ້
    getCategoriesWithHierarchy,  // 🆕 ເພີ່ມຟັງຊັນໃໝ່
    getSubCategoriesByParent     // 🆕 ເພີ່ມຟັງຊັນໃໝ່
};


