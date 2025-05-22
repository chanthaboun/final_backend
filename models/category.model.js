// // backend/models/category.model.js
// const db = require('../config/db');
// const { getFormattedDate } = require('../utils/errorHandler');

// /**
//  * ໂມເດວຂໍ້ມູນປະເພດສິນຄ້າ
//  */
// const Category = {
//     /**
//      * ດຶງຂໍ້ມູນປະເພດສິນຄ້າທັງໝົດ
//      * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
//      */
//     getAll: (callback) => {
//         db.query(
//             'SELECT * FROM category ORDER BY category_id DESC',
//             (err, results) => {
//                 if (err) {
//                     return callback(err, null);
//                 }

//                 // ແປງຂໍ້ມູນໃຫ້ເປັນຮູບແບບທີ່ frontend ຕ້ອງການ
//                 const categories = results.map(item => ({
//                     id: `C${item.category_id.toString().padStart(3, '0')}`,
//                     name: item.categoryName,
//                     status: item.categoryStatus === 1,
//                     createdDate: new Date(item.created_date).toISOString().slice(0, 19).replace('T', ' ')
//                 }));

//                 callback(null, categories);
//             }
//         );
//     },

//     /**
//      * ຄົ້ນຫາປະເພດສິນຄ້າຕາມລະຫັດ
//      * @param {number} id - ລະຫັດປະເພດສິນຄ້າ
//      * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
//      */
//     getById: (id, callback) => {
//         db.query(
//             'SELECT * FROM category WHERE category_id = ?',
//             [id],
//             (err, results) => {
//                 if (err) {
//                     return callback(err, null);
//                 }

//                 if (results.length === 0) {
//                     return callback(null, null);
//                 }

//                 const item = results[0];
//                 const category = {
//                     // ຮັບປະກັນວ່າມີ 'C' ນຳໜ້າ
//                     id: `C${item.category_id.toString().padStart(3, '0')}`,
//                     name: item.categoryName,
//                     status: item.categoryStatus === 1,
//                     createdDate: item.created_date ?
//                         new Date(item.created_date).toISOString().slice(0, 19).replace('T', ' ') :
//                         getFormattedDate()
//                 };

//                 callback(null, category);
//             }
//         );
//     },


//     /**
//      * ຄົ້ນຫາປະເພດສິນຄ້າດ້ວຍຄຳສັບ
//      * @param {string} keyword - ຄຳສັບທີ່ໃຊ້ຄົ້ນຫາ
//      * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
//      */
//     search: (keyword, callback) => {
//         db.query(
//             'SELECT * FROM category WHERE category_id LIKE ? OR categoryName LIKE ? ORDER BY category_id DESC',
//             [`%${keyword}%`, `%${keyword}%`],
//             (err, results) => {
//                 if (err) {
//                     return callback(err, null);
//                 }

//                 // ແປງຂໍ້ມູນໃຫ້ເປັນຮູບແບບທີ່ frontend ຕ້ອງການ
//                 const categories = results.map(item => ({
//                     id: item.category_id.toString(),
//                     name: item.categoryName,
//                     status: item.categoryStatus === 1,
//                     createdDate: new Date(item.created_date).toISOString().slice(0, 19).replace('T', ' ')
//                 }));

//                 callback(null, categories);
//             }
//         );
//     },

//     /**
//      * ເພີ່ມປະເພດສິນຄ້າໃໝ່
//      * @param {Object} categoryData - ຂໍ້ມູນປະເພດສິນຄ້າທີ່ຕ້ອງການເພີ່ມ
//      * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
//      */
//     create: (categoryData, callback) => {
//         // ກວດສອບຂໍ້ມູນພື້ນຖານ
//         if (!categoryData.name) {
//             return callback(new Error('ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ'), null);
//         }

//         const now = getFormattedDate();

//         db.query(
//             'INSERT INTO category (categoryName, categoryStatus, created_date) VALUES (?, ?, ?)',
//             [categoryData.name, categoryData.status ? 1 : 0, now],
//             (err, result) => {
//                 if (err) {
//                     return callback(err, null);
//                 }

//                 // ຖ້າບັນທຶກສຳເລັດ ໃຫ້ດຶງຂໍ້ມູນລ່າສຸດທີ່ຖືກເພີ່ມໄປ
//                 Category.getById(result.insertId, callback);
//             }
//         );
//     },

//     /**
//      * ອັບເດດຂໍ້ມູນປະເພດສິນຄ້າທີ່ມີຢູ່ແລ້ວ
//      * @param {number} id - ລະຫັດປະເພດສິນຄ້າທີ່ຕ້ອງການອັບເດດ
//      * @param {Object} categoryData - ຂໍ້ມູນປະເພດສິນຄ້າທີ່ຕ້ອງການອັບເດດ
//      * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
//      */
//     update: (id, categoryData, callback) => {
//         // ກວດສອບຂໍ້ມູນພື້ນຖານ
//         if (!categoryData.name) {
//             return callback(new Error('ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ'), null);
//         }

//         db.query(
//             'UPDATE category SET categoryName = ?, categoryStatus = ? WHERE category_id = ?',
//             [categoryData.name, categoryData.status ? 1 : 0, id],
//             (err, result) => {
//                 if (err) {
//                     return callback(err, null);
//                 }

//                 if (result.affectedRows === 0) {
//                     return callback(new Error('ບໍ່ພົບປະເພດສິນຄ້າທີ່ຕ້ອງການອັບເດດ'), null);
//                 }

//                 // ຖ້າບັນທຶກສຳເລັດ ໃຫ້ດຶງຂໍ້ມູນລ່າສຸດທີ່ຖືກອັບເດດໄປ
//                 Category.getById(id, callback);
//             }
//         );
//     },

//     /**
//      * ລຶບຂໍ້ມູນປະເພດສິນຄ້າ
//      * @param {number} id - ລະຫັດປະເພດສິນຄ້າທີ່ຕ້ອງການລຶບ
//      * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
//      */
//     delete: (id, callback) => {
//         db.query(
//             'DELETE FROM category WHERE category_id = ?',
//             [id],
//             (err, result) => {
//                 if (err) {
//                     return callback(err, null);
//                 }

//                 if (result.affectedRows === 0) {
//                     return callback(new Error('ບໍ່ພົບປະເພດສິນຄ້າທີ່ຕ້ອງການລຶບ'), null);
//                 }

//                 callback(null, { message: 'ລຶບຂໍ້ມູນປະເພດສິນຄ້າສຳເລັດແລ້ວ' });
//             }
//         );
//     }
// };

// module.exports = Category;





// backend/models/category.model.js
const db = require('../config/db');
const { getFormattedDate } = require('../utils/errorHandler');

/**
 * ໂມເດວຂໍ້ມູນປະເພດສິນຄ້າ
 */
const Category = {
    /**
     * ດຶງຂໍ້ມູນປະເພດສິນຄ້າທັງໝົດ
     * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
     */
    getAll: (callback) => {
        db.query(
            'SELECT * FROM category ORDER BY category_id DESC',
            (err, results) => {
                if (err) {
                    return callback(err, null);
                }

                // ແປງຂໍ້ມູນໃຫ້ເປັນຮູບແບບທີ່ frontend ຕ້ອງການ
                const categories = results.map(item => ({
                    id: `C${item.category_id.toString().padStart(3, '0')}`,
                    name: item.categoryName,
                    status: item.categoryStatus === 1,
                    createdDate: new Date(item.created_date).toISOString().slice(0, 19).replace('T', ' '),
                    parentId: item.parent_id ? `C${item.parent_id.toString().padStart(3, '0')}` : null,
                    level: item.category_level || 0
                }));

                callback(null, categories);
            }
        );
    },

    /**
     * ດຶງຂໍ້ມູນປະເພດສິນຄ້າແບບຈັດໝວດໝູ່ (hierarchical)
     * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
     */
    getAllHierarchical: (callback) => {
        db.query(
            'SELECT * FROM category ORDER BY parent_id, category_id',
            (err, results) => {
                if (err) {
                    return callback(err, null);
                }

                // ແປງຂໍ້ມູນໃຫ້ເປັນຮູບແບບທີ່ frontend ຕ້ອງການ
                const categories = results.map(item => ({
                    id: `C${item.category_id.toString().padStart(3, '0')}`,
                    name: item.categoryName,
                    status: item.categoryStatus === 1,
                    createdDate: new Date(item.created_date).toISOString().slice(0, 19).replace('T', ' '),
                    parentId: item.parent_id ? `C${item.parent_id.toString().padStart(3, '0')}` : null,
                    level: item.category_level || 0
                }));

                // ແປງຂໍ້ມູນໃຫ້ເປັນໂຄງສ້າງແບບ tree
                const categoryMap = {};
                const rootCategories = [];

                // ສ້າງການອ້າງອີງໂດຍໃຊ້ ID
                for (const category of categories) {
                    categoryMap[category.id] = { ...category, children: [] };
                }

                // ສ້າງໂຄງສ້າງແບບ tree
                for (const category of categories) {
                    if (category.parentId && categoryMap[category.parentId]) {
                        categoryMap[category.parentId].children.push(categoryMap[category.id]);
                    } else {
                        rootCategories.push(categoryMap[category.id]);
                    }
                }

                callback(null, {
                    flatList: categories,
                    hierarchical: rootCategories
                });
            }
        );
    },

    /**
     * ດຶງຂໍ້ມູນປະເພດສິນຄ້າຫຼັກ (ບໍ່ມີ parent)
     * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
     */
    getMainCategories: (callback) => {
        db.query(
            'SELECT * FROM category WHERE parent_id IS NULL OR parent_id = 0 ORDER BY category_id DESC',
            (err, results) => {
                if (err) {
                    return callback(err, null);
                }

                // ແປງຂໍ້ມູນໃຫ້ເປັນຮູບແບບທີ່ frontend ຕ້ອງການ
                const categories = results.map(item => ({
                    id: `C${item.category_id.toString().padStart(3, '0')}`,
                    name: item.categoryName,
                    status: item.categoryStatus === 1,
                    createdDate: new Date(item.created_date).toISOString().slice(0, 19).replace('T', ' '),
                    level: item.category_level || 0
                }));

                callback(null, categories);
            }
        );
    },

    /**
     * ດຶງຂໍ້ມູນປະເພດສິນຄ້າຍ່ອຍຕາມ parentId
     * @param {number} parentId - ລະຫັດປະເພດສິນຄ້າຫຼັກ
     * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
     */
    getSubCategories: (parentId, callback) => {
        db.query(
            'SELECT * FROM category WHERE parent_id = ? ORDER BY category_id DESC',
            [parentId],
            (err, results) => {
                if (err) {
                    return callback(err, null);
                }

                // ແປງຂໍ້ມູນໃຫ້ເປັນຮູບແບບທີ່ frontend ຕ້ອງການ
                const categories = results.map(item => ({
                    id: `C${item.category_id.toString().padStart(3, '0')}`,
                    name: item.categoryName,
                    status: item.categoryStatus === 1,
                    createdDate: new Date(item.created_date).toISOString().slice(0, 19).replace('T', ' '),
                    parentId: `C${parentId.toString().padStart(3, '0')}`,
                    level: item.category_level || 0
                }));

                callback(null, categories);
            }
        );
    },

    /**
     * ຄົ້ນຫາປະເພດສິນຄ້າຕາມລະຫັດ
     * @param {number} id - ລະຫັດປະເພດສິນຄ້າ
     * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
     */
    getById: (id, callback) => {
        db.query(
            'SELECT * FROM category WHERE category_id = ?',
            [id],
            (err, results) => {
                if (err) {
                    return callback(err, null);
                }

                if (results.length === 0) {
                    return callback(null, null);
                }

                const item = results[0];
                const category = {
                    // ຮັບປະກັນວ່າມີ 'C' ນຳໜ້າ
                    id: `C${item.category_id.toString().padStart(3, '0')}`,
                    name: item.categoryName,
                    status: item.categoryStatus === 1,
                    createdDate: item.created_date ?
                        new Date(item.created_date).toISOString().slice(0, 19).replace('T', ' ') :
                        getFormattedDate(),
                    parentId: item.parent_id ? `C${item.parent_id.toString().padStart(3, '0')}` : null,
                    level: item.category_level || 0
                };

                callback(null, category);
            }
        );
    },

    /**
     * ຄົ້ນຫາປະເພດສິນຄ້າດ້ວຍຄຳສັບ
     * @param {string} keyword - ຄຳສັບທີ່ໃຊ້ຄົ້ນຫາ
     * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
     */
    search: (keyword, callback) => {
        db.query(
            'SELECT * FROM category WHERE category_id LIKE ? OR categoryName LIKE ? ORDER BY parent_id, category_id DESC',
            [`%${keyword}%`, `%${keyword}%`],
            (err, results) => {
                if (err) {
                    return callback(err, null);
                }

                // ແປງຂໍ້ມູນໃຫ້ເປັນຮູບແບບທີ່ frontend ຕ້ອງການ
                const categories = results.map(item => ({
                    id: `C${item.category_id.toString().padStart(3, '0')}`,
                    name: item.categoryName,
                    status: item.categoryStatus === 1,
                    createdDate: new Date(item.created_date).toISOString().slice(0, 19).replace('T', ' '),
                    parentId: item.parent_id ? `C${item.parent_id.toString().padStart(3, '0')}` : null,
                    level: item.category_level || 0
                }));

                callback(null, categories);
            }
        );
    },

    /**
     * ເພີ່ມປະເພດສິນຄ້າໃໝ່
     * @param {Object} categoryData - ຂໍ້ມູນປະເພດສິນຄ້າທີ່ຕ້ອງການເພີ່ມ
     * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
     */
    create: (categoryData, callback) => {
        // ກວດສອບຂໍ້ມູນພື້ນຖານ
        if (!categoryData.name) {
            return callback(new Error('ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ'), null);
        }

        const now = getFormattedDate();
        let parentId = null;
        let level = 0;

        // ຟັງຊັນສຳລັບບັນທຶກຂໍ້ມູນ
        const insertCategory = () => {
            db.query(
                'INSERT INTO category (categoryName, categoryStatus, created_date, parent_id, category_level) VALUES (?, ?, ?, ?, ?)',
                [categoryData.name, categoryData.status ? 1 : 0, now, parentId, level],
                (err, result) => {
                    if (err) {
                        return callback(err, null);
                    }

                    // ຖ້າບັນທຶກສຳເລັດ ໃຫ້ດຶງຂໍ້ມູນລ່າສຸດທີ່ຖືກເພີ່ມໄປ
                    Category.getById(result.insertId, callback);
                }
            );
        };

        // ກວດສອບ parentId ຖ້າມີ
        if (categoryData.parentId) {
            // ຕັດເອົາແຕ່ຕົວເລກ
            parentId = Number.parseInt(categoryData.parentId.toString().replace(/\D/g, ''), 10);
        }

        // ກວດສອບ level
        if (categoryData.level) {
            level = Number.parseInt(categoryData.level, 10);
        } else if (parentId) {
            // ຖ້າມີ parent, ໃຫ້ level ເພີ່ມຂຶ້ນ 1 ຈາກ parent
            db.query(
                'SELECT category_level FROM category WHERE category_id = ?',
                [parentId],
                (err, results) => {
                    if (!err && results.length > 0) {
                        level = (results[0].category_level || 0) + 1;
                    }

                    // ບັນທຶກຂໍ້ມູນ
                    insertCategory();
                }
            );
            return; // ອອກຈາກຟັງຊັນ ເພາະຈະເຮັດການບັນທຶກໃນ callback ຂ້າງເທິງ
        }

        // ເອີ້ນໃຊ້ຟັງຊັນບັນທຶກຂໍ້ມູນ (ຖ້າບໍ່ໄດ້ກວດສອບ parent level)
        insertCategory();
    },

    /**
     * ອັບເດດຂໍ້ມູນປະເພດສິນຄ້າທີ່ມີຢູ່ແລ້ວ
     * @param {number} id - ລະຫັດປະເພດສິນຄ້າທີ່ຕ້ອງການອັບເດດ
     * @param {Object} categoryData - ຂໍ້ມູນປະເພດສິນຄ້າທີ່ຕ້ອງການອັບເດດ
     * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
     */
    update: (id, categoryData, callback) => {
        // ກວດສອບຂໍ້ມູນພື້ນຖານ
        if (!categoryData.name) {
            return callback(new Error('ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ'), null);
        }

        let parentId = null;
        let level = 0;

        // ຟັງຊັນອັບເດດລະດັບໝວດໝູ່ລູກ
        const updateChildLevels = (parentId, parentLevel, doneCallback) => {
            db.query(
                'SELECT category_id FROM category WHERE parent_id = ?',
                [parentId],
                (err, results) => {
                    if (err || results.length === 0) {
                        return doneCallback();
                    }

                    const childIds = results.map(r => r.category_id);
                    const childLevel = parentLevel + 1;

                    // ອັບເດດລະດັບຂອງລູກທັງໝົດ
                    db.query(
                        'UPDATE category SET category_level = ? WHERE category_id IN (?)',
                        [childLevel, childIds],
                        (err) => {
                            if (err) {
                                console.error('Error updating child levels:', err);
                            }

                            // ອັບເດດລະດັບຂອງລູກຂອງລູກອີກຕໍ່
                            let processed = 0;
                            for (const childId of childIds) {
                                updateChildLevels(childId, childLevel, () => {
                                    processed++;
                                    if (processed === childIds.length) {
                                        doneCallback();
                                    }
                                });
                            }

                            // ຖ້າບໍ່ມີລູກໃຫ້ເອີ້ນໃຊ້ callback
                            if (childIds.length === 0) {
                                doneCallback();
                            }
                        }
                    );
                }
            );
        };

        // ຟັງຊັນສຳລັບອັບເດດຂໍ້ມູນ
        const updateCategory = () => {
            db.query(
                'UPDATE category SET categoryName = ?, categoryStatus = ?, parent_id = ?, category_level = ? WHERE category_id = ?',
                [categoryData.name, categoryData.status ? 1 : 0, parentId, level, id],
                (err, result) => {
                    if (err) {
                        return callback(err, null);
                    }

                    if (result.affectedRows === 0) {
                        return callback(new Error('ບໍ່ພົບປະເພດສິນຄ້າທີ່ຕ້ອງການອັບເດດ'), null);
                    }

                    // ຖ້າບັນທຶກສຳເລັດ ໃຫ້ອັບເດດລະດັບໝວດໝູ່ລູກດ້ວຍ
                    updateChildLevels(id, level, () => {
                        // ດຶງຂໍ້ມູນລ່າສຸດທີ່ຖືກອັບເດດໄປ
                        Category.getById(id, callback);
                    });
                }
            );
        };

        // ກວດສອບ parentId ຖ້າມີ
        if (categoryData.parentId) {
            // ຕັດເອົາແຕ່ຕົວເລກ
            parentId = Number.parseInt(categoryData.parentId.toString().replace(/\D/g, ''), 10);

            // ກວດສອບວ່າ parentId ບໍ່ແມ່ນໂຕເອງ
            if (parentId === Number.parseInt(id, 10)) {
                return callback(new Error('ບໍ່ສາມາດເລືອກໂຕເອງເປັນໝວດໝູ່ແມ່ໄດ້'), null);
            }

            // ກວດສອບວ່າ parentId ບໍ່ແມ່ນລູກຂອງຕົນເອງ
            db.query(
                'SELECT category_id FROM category WHERE parent_id = ?',
                [id],
                (err, results) => {
                    if (err) {
                        return callback(err, null);
                    }

                    const childIds = results.map(r => r.category_id);
                    if (childIds.includes(parentId)) {
                        return callback(new Error('ບໍ່ສາມາດເລືອກໝວດໝູ່ລູກເປັນໝວດໝູ່ແມ່ໄດ້'), null);
                    }

                    // ກວດສອບລະດັບຂອງ parent
                    if (parentId) {
                        db.query(
                            'SELECT category_level FROM category WHERE category_id = ?',
                            [parentId],
                            (err, results) => {
                                if (!err && results.length > 0) {
                                    level = (results[0].category_level || 0) + 1;
                                }

                                // ອັບເດດຂໍ້ມູນ
                                updateCategory();
                            }
                        );
                        return; // ອອກຈາກຟັງຊັນ ເພາະຈະເຮັດການອັບເດດໃນ callback ຂ້າງເທິງ
                    }

                    // ຖ້າບໍ່ມີ parentId ຫຼື parentId ເປັນ 0
                    updateCategory();
                }
            );
            return; // ອອກຈາກຟັງຊັນ ເພາະຈະເຮັດການອັບເດດໃນ callback ຂ້າງເທິງ
        }

        // ກໍລະນີບໍ່ມີ parentId
        if (!categoryData.parentId) {
            // ຖ້າເປັນໝວດໝູ່ຫຼັກ (ບໍ່ມີແມ່), ລະດັບແມ່ນ 0
            level = 0;
            updateCategory();
        }
    },

    /**
     * ລຶບຂໍ້ມູນປະເພດສິນຄ້າ
     * @param {number} id - ລະຫັດປະເພດສິນຄ້າທີ່ຕ້ອງການລຶບ
     * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
     */
    delete: (id, callback) => {
        // ກວດສອບວ່າມີໝວດໝູ່ສິນຄ້າໃນປະເພດນີ້ຫຼືບໍ່
        db.query(
            'SELECT COUNT(*) as count FROM category WHERE parent_id = ?',
            [id],
            (err, results) => {
                if (err) {
                    return callback(err, null);
                }

                const childCount = results[0].count;
                if (childCount > 0) {
                    return callback(new Error('ບໍ່ສາມາດລຶບປະເພດສິນຄ້ານີ້ໄດ້ ເນື່ອງຈາກມີປະເພດສິນຄ້າຍ່ອຍຢູ່'), null);
                }

                // ກວດສອບວ່າມີສິນຄ້າໃນປະເພດນີ້ຫຼືບໍ່ (ຖ້າມີຕາຕະລາງສິນຄ້າ)
                // ຖ້າມີຕາຕະລາງ product ທີ່ເຊື່ອມຕໍ່ກັບປະເພດສິນຄ້າ, ເພີ່ມການກວດສອບຢູ່ທີ່ນີ້
                // db.query(
                //     'SELECT COUNT(*) as count FROM product WHERE category_id = ?',
                //     [id],
                //     (err, results) => {
                //         if (err) {
                //             return callback(err, null);
                //         }
                //
                //         const productCount = results[0].count;
                //         if (productCount > 0) {
                //             return callback(new Error('ບໍ່ສາມາດລຶບປະເພດສິນຄ້ານີ້ໄດ້ ເນື່ອງຈາກມີສິນຄ້າຢູ່ໃນປະເພດນີ້'), null);
                //         }
                //
                //         // ດຳເນີນການລຶບປະເພດສິນຄ້າ
                //         deleteCategory();
                //     }
                // );

                // ດຳເນີນການລຶບປະເພດສິນຄ້າ
                db.query(
                    'DELETE FROM category WHERE category_id = ?',
                    [id],
                    (err, result) => {
                        if (err) {
                            return callback(err, null);
                        }

                        if (result.affectedRows === 0) {
                            return callback(new Error('ບໍ່ພົບປະເພດສິນຄ້າທີ່ຕ້ອງການລຶບ'), null);
                        }

                        callback(null, { message: 'ລຶບຂໍ້ມູນປະເພດສິນຄ້າສຳເລັດແລ້ວ' });
                    }
                );
            }
        );
    }
};

module.exports = Category;