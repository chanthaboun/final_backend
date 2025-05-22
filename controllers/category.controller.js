// // backend/controllers/category.controller.js
// const Category = require('../models/category.model');
// const { handleError, handleNotFound } = require('../utils/errorHandler');

// /**
//  * ຄອນໂທຣເລີຈັດການປະເພດສິນຄ້າ
//  */
// const CategoryController = {
//     /**
//      * ດຶງຂໍ້ມູນປະເພດສິນຄ້າທັງໝົດ
//      * @param {Object} req - Request object
//      * @param {Object} res - Response object
//      */
//     getAllCategories: (req, res) => {
//         Category.getAll((err, categories) => {
//             if (err) {
//                 return handleError(err, 'ຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນປະເພດສິນຄ້າ', res);
//             }
//             res.json(categories);
//         });
//     },

//     /**
//      * ດຶງຂໍ້ມູນປະເພດສິນຄ້າຕາມ ID
//      * @param {Object} req - Request object
//      * @param {Object} res - Response object
//      */
//     getCategoryById: (req, res) => {
//         const id = req.params.id;
//         // ຮັບປະກັນວ່າ id ເປັນຕົວເລກ
//         const numericId = Number.parseInt(id, 10);

//         if (Number.isNaN(numericId)) {
//             return res.status(400).json({ message: 'ລະຫັດບໍ່ຖືກຕ້ອງ' });
//         }

//         Category.getById(id, (err, category) => {
//             if (err) {
//                 return handleError(err, `ຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນປະເພດສິນຄ້າທີ່ມີລະຫັດ ${id}`, res);
//             }

//             if (!category) {
//                 return handleNotFound(res, `ບໍ່ພົບປະເພດສິນຄ້າທີ່ມີລະຫັດ ${id}`);
//             }

//             res.json(category);
//         });
//     },

//     /**
//      * ຄົ້ນຫາປະເພດສິນຄ້າດ້ວຍຄຳສັບ
//      * @param {Object} req - Request object
//      * @param {Object} res - Response object
//      */
//     searchCategories: (req, res) => {
//         const keyword = req.query.keyword || '';

//         Category.search(keyword, (err, categories) => {
//             if (err) {
//                 return handleError(err, 'ຂໍ້ຜິດພາດໃນການຄົ້ນຫາປະເພດສິນຄ້າ', res);
//             }

//             res.json(categories);
//         });
//     },

//     /**
//      * ສ້າງປະເພດສິນຄ້າໃໝ່
//      * @param {Object} req - Request object
//      * @param {Object} res - Response object
//      */
//     createCategory: (req, res) => {
//         const { name, status = true } = req.body;

//         // ກວດສອບຂໍ້ມູນພື້ນຖານ
//         if (!name) {
//             return res.status(400).json({ message: 'ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ' });
//         }

//         const categoryData = {
//             name,
//             status: status === true || status === 'true' || status === 1 || status === '1'
//         };

//         Category.create(categoryData, (err, category) => {
//             if (err) {
//                 return handleError(err, 'ຂໍ້ຜິດພາດໃນການສ້າງປະເພດສິນຄ້າ', res);
//             }

//             res.status(201).json({
//                 message: 'ສ້າງຂໍ້ມູນປະເພດສິນຄ້າສຳເລັດແລ້ວ',
//                 category
//             });
//         });
//     },

//     /**
//      * ອັບເດດຂໍ້ມູນປະເພດສິນຄ້າທີ່ມີຢູ່ແລ້ວ
//      * @param {Object} req - Request object
//      * @param {Object} res - Response object
//      */
//     updateCategory: (req, res) => {
//         const id = req.params.id;
//         const { name, status } = req.body;

//         // ກວດສອບຂໍ້ມູນພື້ນຖານ
//         if (!name) {
//             return res.status(400).json({ message: 'ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ' });
//         }

//         const categoryData = {
//             name,
//             status: status === true || status === 'true' || status === 1 || status === '1'
//         };

//         Category.update(id, categoryData, (err, category) => {
//             if (err) {
//                 if (err.message.includes('ບໍ່ພົບປະເພດສິນຄ້າ')) {
//                     return handleNotFound(res, `ບໍ່ພົບປະເພດສິນຄ້າທີ່ມີລະຫັດ ${id}`);
//                 }
//                 return handleError(err, `ຂໍ້ຜິດພາດໃນການອັບເດດປະເພດສິນຄ້າທີ່ມີລະຫັດ ${id}`, res);
//             }

//             res.json({
//                 message: 'ອັບເດດຂໍ້ມູນປະເພດສິນຄ້າສຳເລັດແລ້ວ',
//                 category
//             });
//         });
//     },

//     /**
//      * ລຶບຂໍ້ມູນປະເພດສິນຄ້າ
//      * @param {Object} req - Request object
//      * @param {Object} res - Response object
//      */
//     deleteCategory: (req, res) => {
//         const id = req.params.id;

//         Category.delete(id, (err, result) => {
//             if (err) {
//                 if (err.message.includes('ບໍ່ພົບປະເພດສິນຄ້າ')) {
//                     return handleNotFound(res, `ບໍ່ພົບປະເພດສິນຄ້າທີ່ມີລະຫັດ ${id}`);
//                 }
//                 return handleError(err, `ຂໍ້ຜິດພາດໃນການລຶບປະເພດສິນຄ້າທີ່ມີລະຫັດ ${id}`, res);
//             }

//             res.json({
//                 message: 'ລຶບຂໍ້ມູນປະເພດສິນຄ້າສຳເລັດແລ້ວ'
//             });
//         });
//     }
// };

// module.exports = CategoryController;





// backend/controllers/category.controller.js
const Category = require('../models/category.model');
const { handleError, handleNotFound } = require('../utils/errorHandler');

/**
 * ຄອນໂທຣເລີຈັດການປະເພດສິນຄ້າ
 */
const CategoryController = {
    /**
     * ດຶງຂໍ້ມູນປະເພດສິນຄ້າທັງໝົດ
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    getAllCategories: (req, res) => {
        // ກວດສອບວ່າຕ້ອງການຂໍ້ມູນແບບໝວດໝູ່ຫຼືບໍ່
        const hierarchical = req.query.hierarchical === 'true';

        if (hierarchical) {
            Category.getAllHierarchical((err, categories) => {
                if (err) {
                    return handleError(err, 'ຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນປະເພດສິນຄ້າ', res);
                }
                res.json(categories);
            });
        } else {
            Category.getAll((err, categories) => {
                if (err) {
                    return handleError(err, 'ຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນປະເພດສິນຄ້າ', res);
                }
                res.json(categories);
            });
        }
    },

    /**
     * ດຶງຂໍ້ມູນປະເພດສິນຄ້າຫຼັກ (ບໍ່ມີ parent)
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    getMainCategories: (req, res) => {
        Category.getMainCategories((err, categories) => {
            if (err) {
                return handleError(err, 'ຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນປະເພດສິນຄ້າຫຼັກ', res);
            }
            res.json(categories);
        });
    },

    /**
     * ດຶງຂໍ້ມູນປະເພດສິນຄ້າຍ່ອຍຕາມ parentId
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    getSubCategories: (req, res) => {
        const parentId = req.params.parentId;
        // ຮັບປະກັນວ່າ parentId ເປັນຕົວເລກ
        const numericParentId = Number.parseInt(parentId.toString().replace(/\D/g, ''), 10);

        if (Number.isNaN(numericParentId)) {
            return res.status(400).json({ message: 'ລະຫັດໝວດໝູ່ແມ່ບໍ່ຖືກຕ້ອງ' });
        }

        Category.getSubCategories(numericParentId, (err, categories) => {
            if (err) {
                return handleError(err, `ຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນປະເພດສິນຄ້າຍ່ອຍຂອງ ${parentId}`, res);
            }
            res.json(categories);
        });
    },

    /**
     * ດຶງຂໍ້ມູນປະເພດສິນຄ້າຕາມ ID
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    getCategoryById: (req, res) => {
        const id = req.params.id;
        // ຮັບປະກັນວ່າ id ເປັນຕົວເລກ
        const numericId = Number.parseInt(id.toString().replace(/\D/g, ''), 10);

        if (Number.isNaN(numericId)) {
            return res.status(400).json({ message: 'ລະຫັດບໍ່ຖືກຕ້ອງ' });
        }

        Category.getById(numericId, (err, category) => {
            if (err) {
                return handleError(err, `ຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນປະເພດສິນຄ້າທີ່ມີລະຫັດ ${id}`, res);
            }

            if (!category) {
                return handleNotFound(res, `ບໍ່ພົບປະເພດສິນຄ້າທີ່ມີລະຫັດ ${id}`);
            }

            res.json(category);
        });
    },

    /**
     * ຄົ້ນຫາປະເພດສິນຄ້າດ້ວຍຄຳສັບ
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    searchCategories: (req, res) => {
        const keyword = req.query.keyword || '';

        Category.search(keyword, (err, categories) => {
            if (err) {
                return handleError(err, 'ຂໍ້ຜິດພາດໃນການຄົ້ນຫາປະເພດສິນຄ້າ', res);
            }

            res.json(categories);
        });
    },

    /**
     * ສ້າງປະເພດສິນຄ້າໃໝ່
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    createCategory: (req, res) => {
        const { name, status = true, parentId = null, level = 0 } = req.body;

        // ກວດສອບຂໍ້ມູນພື້ນຖານ
        if (!name) {
            return res.status(400).json({ message: 'ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ' });
        }

        const categoryData = {
            name,
            status: status === true || status === 'true' || status === 1 || status === '1',
            parentId,
            level
        };

        Category.create(categoryData, (err, category) => {
            if (err) {
                return handleError(err, 'ຂໍ້ຜິດພາດໃນການສ້າງປະເພດສິນຄ້າ', res);
            }

            res.status(201).json({
                message: 'ສ້າງຂໍ້ມູນປະເພດສິນຄ້າສຳເລັດແລ້ວ',
                category
            });
        });
    },

    /**
     * ອັບເດດຂໍ້ມູນປະເພດສິນຄ້າທີ່ມີຢູ່ແລ້ວ
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    updateCategory: (req, res) => {
        const id = req.params.id;
        const { name, status, parentId, level } = req.body;

        // ກວດສອບຂໍ້ມູນພື້ນຖານ
        if (!name) {
            return res.status(400).json({ message: 'ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ' });
        }

        const categoryData = {
            name,
            status: status === true || status === 'true' || status === 1 || status === '1',
            parentId,
            level
        };

        // ຮັບປະກັນວ່າ id ເປັນຕົວເລກ
        const numericId = Number.parseInt(id.toString().replace(/\D/g, ''), 10);

        if (Number.isNaN(numericId)) {
            return res.status(400).json({ message: 'ລະຫັດບໍ່ຖືກຕ້ອງ' });
        }

        Category.update(numericId, categoryData, (err, category) => {
            if (err) {
                if (err.message.includes('ບໍ່ພົບປະເພດສິນຄ້າ')) {
                    return handleNotFound(res, `ບໍ່ພົບປະເພດສິນຄ້າທີ່ມີລະຫັດ ${id}`);
                }
                return handleError(err, `ຂໍ້ຜິດພາດໃນການອັບເດດປະເພດສິນຄ້າທີ່ມີລະຫັດ ${id}`, res);
            }

            res.json({
                message: 'ອັບເດດຂໍ້ມູນປະເພດສິນຄ້າສຳເລັດແລ້ວ',
                category
            });
        });
    },

    /**
     * ລຶບຂໍ້ມູນປະເພດສິນຄ້າ
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    deleteCategory: (req, res) => {
        const id = req.params.id;
        // ຮັບປະກັນວ່າ id ເປັນຕົວເລກ
        const numericId = Number.parseInt(id.toString().replace(/\D/g, ''), 10);

        if (Number.isNaN(numericId)) {
            return res.status(400).json({ message: 'ລະຫັດບໍ່ຖືກຕ້ອງ' });
        }

        Category.delete(numericId, (err, result) => {
            if (err) {
                if (err.message.includes('ບໍ່ພົບປະເພດສິນຄ້າ')) {
                    return handleNotFound(res, `ບໍ່ພົບປະເພດສິນຄ້າທີ່ມີລະຫັດ ${id}`);
                }
                if (err.message.includes('ມີປະເພດສິນຄ້າຍ່ອຍຢູ່')) {
                    return res.status(400).json({ message: err.message });
                }
                return handleError(err, `ຂໍ້ຜິດພາດໃນການລຶບປະເພດສິນຄ້າທີ່ມີລະຫັດ ${id}`, res);
            }

            res.json({
                message: 'ລຶບຂໍ້ມູນປະເພດສິນຄ້າສຳເລັດແລ້ວ'
            });
        });
    }
};

module.exports = CategoryController;