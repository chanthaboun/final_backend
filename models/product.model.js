// // backend/models/product.model.js

// // backend/models/product.model.js
// const db = require('../config/db');
// const { getFormattedDate } = require('../utils/errorHandler');

// // ເອົາຂໍ້ມູນສິນຄ້າທັງໝົດ
// const getAllProducts = (callback) => {
//     const query = `
//         SELECT p.*, b.brandName as brand, c.categoryName as category 
//         FROM product p
//         LEFT JOIN brand b ON p.brand_id = b.brand_id
//         LEFT JOIN category c ON p.category_id = c.category_id
//         ORDER BY p.product_id DESC
//     `;

//     db.query(query, (err, results) => {
//         if (err) {
//             return callback(err, null);
//         }

//         // ແປງຂໍ້ມູນໃຫ້ຢູ່ໃນຮູບແບບທີ່ frontend ຕ້ອງການ
//         const formattedProducts = results.map(product => {
//             return {
//                 id: `P${String(product.product_id).padStart(3, '0')}`,
//                 name: product.productName,
//                 price: product.price || 0,
//                 quantity: product.quantity || 0,
//                 minQuantity: product.min_quantity || 0,
//                 maxQuantity: product.max_quantity || 100,
//                 unit: product.unit || '',
//                 category: product.category || '',
//                 brand: product.brand || '',
//                 description: product.description || '',
//                 imageUrl: product.image_url || '',
//                 status: product.status || 'ມີໃນສາງ',
//                 createdDate: product.created_date ? new Date(product.created_date).toISOString().slice(0, 19).replace('T', ' ') : ''
//             };
//         });

//         callback(null, formattedProducts);
//     });
// };

// // ຄົ້ນຫາສິນຄ້າດ້ວຍ ID
// const getProductById = (id, callback) => {
//     const query = `
//         SELECT p.*, b.brandName as brand, c.categoryName as category 
//         FROM product p
//         LEFT JOIN brand b ON p.brand_id = b.brand_id
//         LEFT JOIN category c ON p.category_id = c.category_id
//         WHERE p.product_id = ?
//     `;

//     db.query(query, [id], (err, results) => {
//         if (err) {
//             return callback(err, null);
//         }

//         if (results.length === 0) {
//             return callback(null, null);
//         }

//         const product = results[0];
//         const formattedProduct = {
//             id: `P${String(product.product_id).padStart(3, '0')}`,
//             name: product.productName,
//             price: product.price || 0,
//             quantity: product.quantity || 0,
//             minQuantity: product.min_quantity || 0,
//             maxQuantity: product.max_quantity || 100,
//             unit: product.unit || '',
//             category: product.category || '',
//             brand: product.brand || '',
//             description: product.description || '',
//             imageUrl: product.image_url || '',
//             status: product.status || 'ມີໃນສາງ',
//             createdDate: product.created_date ? new Date(product.created_date).toISOString().slice(0, 19).replace('T', ' ') : ''
//         };

//         callback(null, formattedProduct);
//     });
// };

// // ຄົ້ນຫາສິນຄ້າດ້ວຍຄຳຄົ້ນຫາ
// const searchProducts = (searchQuery, callback) => {
//     const query = `
//         SELECT p.*, b.brandName as brand, c.categoryName as category 
//         FROM product p
//         LEFT JOIN brand b ON p.brand_id = b.brand_id
//         LEFT JOIN category c ON p.category_id = c.category_id
//         WHERE p.productName LIKE ? 
//         OR p.description LIKE ? 
//         OR b.brandName LIKE ? 
//         OR c.categoryName LIKE ?
//         ORDER BY p.product_id DESC
//     `;

//     const searchParam = `%${searchQuery}%`;

//     db.query(query, [searchParam, searchParam, searchParam, searchParam], (err, results) => {
//         if (err) {
//             return callback(err, null);
//         }

//         // ແປງຂໍ້ມູນໃຫ້ຢູ່ໃນຮູບແບບທີ່ frontend ຕ້ອງການ
//         const formattedProducts = results.map(product => {
//             return {
//                 id: `P${String(product.product_id).padStart(3, '0')}`,
//                 name: product.productName,
//                 price: product.price || 0,
//                 quantity: product.quantity || 0,
//                 minQuantity: product.min_quantity || 0,
//                 maxQuantity: product.max_quantity || 100,
//                 unit: product.unit || '',
//                 category: product.category || '',
//                 brand: product.brand || '',
//                 description: product.description || '',
//                 imageUrl: product.image_url || '',
//                 status: product.status || 'ມີໃນສາງ',
//                 createdDate: product.created_date ? new Date(product.created_date).toISOString().slice(0, 19).replace('T', ' ') : ''
//             };
//         });

//         callback(null, formattedProducts);
//     });
// };

// // ຄົ້ນຫາ brand_id ແລະ category_id ຈາກຊື່
// const findBrandAndCategoryIds = (brandName, categoryName, callback) => {
//     let brand_id = null;
//     let category_id = null;

//     // ຄົ້ນຫາ brand_id
//     const brandQuery = 'SELECT brand_id FROM brand WHERE brandName = ?';
//     db.query(brandQuery, [brandName], (err, brandResults) => {
//         if (err) {
//             return callback(err, null);
//         }

//         if (brandResults.length > 0) {
//             brand_id = brandResults[0].brand_id;
//         }

//         // ຄົ້ນຫາ category_id
//         const categoryQuery = 'SELECT category_id FROM category WHERE categoryName = ?';
//         db.query(categoryQuery, [categoryName], (err, categoryResults) => {
//             if (err) {
//                 return callback(err, null);
//             }

//             if (categoryResults.length > 0) {
//                 category_id = categoryResults[0].category_id;
//             }

//             callback(null, { brand_id, category_id });
//         });
//     });
// };

// // ເພີ່ມສິນຄ້າໃໝ່
// const createProduct = (productData, callback) => {
//     // ຄົ້ນຫາ brand_id ແລະ category_id ຈາກຊື່
//     findBrandAndCategoryIds(productData.brand, productData.category, (err, ids) => {
//         if (err) {
//             return callback(err, null);
//         }

//         const { brand_id, category_id } = ids;

//         // ກຳນົດສະຖານະຂອງສິນຄ້າໂດຍອັດຕະໂນມັດຕາມຈຳນວນ
//         let status = 'active';
//         if (productData.quantity <= productData.minQuantity) {
//             status = 'low-stock';
//         } else if (productData.quantity <= 0) {
//             status = 'out-of-stock';
//         }

//         const query = `
//             INSERT INTO product (
//                 productName, quantity, min_quantity, unit, 
//                 brand_id, category_id, description, image_url, 
//                 status, created_date
//             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;

//         const values = [
//             productData.name,
//             productData.quantity || 0,
//             productData.minQuantity || 0,
//             productData.unit || '',
//             brand_id,
//             category_id,
//             productData.description || '',
//             productData.imageUrl || '',
//             status,
//             getFormattedDate()
//         ];

//         db.query(query, values, (err, result) => {
//             if (err) {
//                 return callback(err, null);
//             }

//             // ດຶງຂໍ້ມູນສິນຄ້າທີ່ຫາກໍສ້າງ
//             getProductById(result.insertId, callback);
//         });
//     });
// };

// // ອັບເດດຂໍ້ມູນສິນຄ້າ
// const updateProduct = (id, productData, callback) => {
//     // ຄົ້ນຫາ brand_id ແລະ category_id ຈາກຊື່
//     findBrandAndCategoryIds(productData.brand, productData.category, (err, ids) => {
//         if (err) {
//             return callback(err, null);
//         }

//         const { brand_id, category_id } = ids;

//         // ກຳນົດສະຖານະຂອງສິນຄ້າໂດຍອັດຕະໂນມັດຕາມຈຳນວນ ຫຼື ໃຊ້ຄ່າທີ່ສົ່ງມາ
//         let status = productData.status || 'active';
//         if (!productData.status) {
//             if (productData.quantity <= productData.minQuantity) {
//                 status = 'low-stock';
//             } else if (productData.quantity <= 0) {
//                 status = 'out-of-stock';
//             }
//         }

//         const query = `
//             UPDATE product SET
//                 productName = ?,
//                 quantity = ?,
//                 min_quantity = ?,
//                 unit = ?,
//                 brand_id = ?,
//                 category_id = ?,
//                 description = ?,
//                 image_url = ?,
//                 status = ?
//             WHERE product_id = ?
//         `;

//         const values = [
//             productData.name,
//             productData.quantity || 0,
//             productData.minQuantity || 0,
//             productData.unit || '',
//             brand_id,
//             category_id,
//             productData.description || '',
//             productData.imageUrl || '',
//             status,
//             id
//         ];

//         db.query(query, values, (err, result) => {
//             if (err) {
//                 return callback(err, null);
//             }

//             if (result.affectedRows === 0) {
//                 return callback(null, null);
//             }

//             // ດຶງຂໍ້ມູນສິນຄ້າທີ່ອັບເດດ
//             getProductById(id, callback);
//         });
//     });
// };

// // ລຶບສິນຄ້າ
// const deleteProduct = (id, callback) => {
//     const query = 'DELETE FROM product WHERE product_id = ?';

//     db.query(query, [id], (err, result) => {
//         if (err) {
//             return callback(err, null);
//         }

//         callback(null, { success: result.affectedRows > 0 });
//     });
// };

// // ອັບເດດຈຳນວນສິນຄ້າ
// const updateProductQuantity = (id, quantity, callback) => {
//     // ດຶງຂໍ້ມູນສິນຄ້າປັດຈຸບັນ
//     db.query('SELECT * FROM product WHERE product_id = ?', [id], (err, results) => {
//         if (err) {
//             return callback(err, null);
//         }

//         if (results.length === 0) {
//             return callback(new Error('ບໍ່ພົບສິນຄ້າ'), null);
//         }

//         const product = results[0];
//         const newQuantity = quantity;

//         // ກຳນົດສະຖານະຂອງສິນຄ້າໂດຍອັດຕະໂນມັດຕາມຈຳນວນ
//         let status = 'active';
//         if (newQuantity <= product.min_quantity) {
//             status = 'low-stock';
//         } else if (newQuantity <= 0) {
//             status = 'out-of-stock';
//         }

//         // ອັບເດດຈຳນວນ ແລະ ສະຖານະ
//         const query = 'UPDATE product SET quantity = ?, status = ? WHERE product_id = ?';

//         db.query(query, [newQuantity, status, id], (err, result) => {
//             if (err) {
//                 return callback(err, null);
//             }

//             // ດຶງຂໍ້ມູນສິນຄ້າທີ່ອັບເດດແລ້ວ
//             getProductById(id, callback);
//         });
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
//     findBrandAndCategoryIds
// };





// backend/models/product.model.js
const db = require('../config/db');
const { getFormattedDate } = require('../utils/errorHandler');

// ເອົາຂໍ້ມູນສິນຄ້າທັງໝົດ
const getAllProducts = (callback) => {
    const query = `
        SELECT p.*, b.brandName as brand, c.categoryName as category 
        FROM product p
        LEFT JOIN brand b ON p.brand_id = b.brand_id
        LEFT JOIN category c ON p.category_id = c.category_id
        ORDER BY p.product_id DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            // console.error('Error in getAllProducts:', err);
            return callback(err, null);
        }

        // console.log(`Found ${results.length} products in database`);

        // ແປງຂໍ້ມູນໃຫ້ຢູ່ໃນຮູບແບບທີ່ frontend ຕ້ອງການ
        const formattedProducts = results.map(product => {
            return {
                id: `P${String(product.product_id).padStart(3, '0')}`,
                name: product.productName,
                price: product.price || 0,
                quantity: product.quantity || 0,
                minQuantity: product.min_quantity || 0,
                maxQuantity: product.max_quantity || 100,
                unit: product.unit || '',
                category: product.category || '',
                brand: product.brand || '',
                description: product.description || '',
                imageUrl: product.image_url || '',
                status: product.status || 'active',
                createdDate: product.created_date ? new Date(product.created_date).toISOString().slice(0, 19).replace('T', ' ') : ''
            };
        });

        callback(null, formattedProducts);
    });
};

// ຄົ້ນຫາສິນຄ້າດ້ວຍ ID
const getProductById = (id, callback) => {
    const query = `
        SELECT p.*, b.brandName as brand, c.categoryName as category 
        FROM product p
        LEFT JOIN brand b ON p.brand_id = b.brand_id
        LEFT JOIN category c ON p.category_id = c.category_id
        WHERE p.product_id = ?
    `;

    db.query(query, [id], (err, results) => {
        if (err) {
            // console.error('Error in getProductById:', err);
            return callback(err, null);
        }

        if (results.length === 0) {
            // console.log(`Product ID ${id} not found`);
            return callback(null, null);
        }

        const product = results[0];
        // console.log(`Found product ID ${id}:`, product.productName);

        const formattedProduct = {
            id: `P${String(product.product_id).padStart(3, '0')}`,
            name: product.productName,
            price: product.price || 0,
            quantity: product.quantity || 0,
            minQuantity: product.min_quantity || 0,
            maxQuantity: product.max_quantity || 100,
            unit: product.unit || '',
            category: product.category || '',
            brand: product.brand || '',
            description: product.description || '',
            imageUrl: product.image_url || '',
            status: product.status || 'active',
            createdDate: product.created_date ? new Date(product.created_date).toISOString().slice(0, 19).replace('T', ' ') : ''
        };

        callback(null, formattedProduct);
    });
};

// ຄົ້ນຫາສິນຄ້າດ້ວຍຄຳຄົ້ນຫາ
const searchProducts = (searchQuery, callback) => {
    const query = `
        SELECT p.*, b.brandName as brand, c.categoryName as category 
        FROM product p
        LEFT JOIN brand b ON p.brand_id = b.brand_id
        LEFT JOIN category c ON p.category_id = c.category_id
        WHERE p.productName LIKE ? 
        OR p.description LIKE ? 
        OR b.brandName LIKE ? 
        OR c.categoryName LIKE ?
        ORDER BY p.product_id DESC
    `;

    const searchParam = `%${searchQuery}%`;

    db.query(query, [searchParam, searchParam, searchParam, searchParam], (err, results) => {
        if (err) {
            // console.error('Error in searchProducts:', err);
            return callback(err, null);
        }

        // console.log(`Search "${searchQuery}" returned ${results.length} results`);

        // ແປງຂໍ້ມູນໃຫ້ຢູ່ໃນຮູບແບບທີ່ frontend ຕ້ອງການ
        const formattedProducts = results.map(product => {
            return {
                id: `P${String(product.product_id).padStart(3, '0')}`,
                name: product.productName,
                price: product.price || 0,
                quantity: product.quantity || 0,
                minQuantity: product.min_quantity || 0,
                maxQuantity: product.max_quantity || 100,
                unit: product.unit || '',
                category: product.category || '',
                brand: product.brand || '',
                description: product.description || '',
                imageUrl: product.image_url || '',
                status: product.status || 'active',
                createdDate: product.created_date ? new Date(product.created_date).toISOString().slice(0, 19).replace('T', ' ') : ''
            };
        });

        callback(null, formattedProducts);
    });
};

// ຄົ້ນຫາ brand_id ແລະ category_id ຈາກຊື່
const findBrandAndCategoryIds = (brandName, categoryName, callback) => {
    let brand_id = null;
    let category_id = null;

    // ຖ້າບໍ່ມີຊື່ຍີ່ຫໍ້ແລະປະເພດສິນຄ້າ
    if (!brandName && !categoryName) {
        return callback(null, { brand_id, category_id });
    }

    // ຄົ້ນຫາ brand_id
    if (brandName) {
        const brandQuery = 'SELECT brand_id FROM brand WHERE brandName = ?';
        db.query(brandQuery, [brandName], (err, brandResults) => {
            if (err) {
                // console.error('Error finding brand_id:', err);
                return callback(err, null);
            }

            if (brandResults.length > 0) {
                brand_id = brandResults[0].brand_id;
                // console.log(`Found brand_id ${brand_id} for "${brandName}"`);
            } else {
                // console.log(`Brand "${brandName}" not found, creating new brand`);
                // ສ້າງຍີ່ຫໍ້ໃໝ່ຖ້າບໍ່ພົບ
                const insertBrandQuery = 'INSERT INTO brand (brandName, created_date) VALUES (?, ?)';
                db.query(insertBrandQuery, [brandName, getFormattedDate()], (err, result) => {
                    if (err) {
                        // console.error('Error creating new brand:', err);
                        return callback(err, null);
                    }

                    brand_id = result.insertId;
                    // console.log(`Created new brand_id ${brand_id} for "${brandName}"`);

                    // ດຳເນີນການຄົ້ນຫາ category_id
                    findCategoryId();
                });
                return; // ຢຸດ execution ເພາະເຮົາຈະເອີ້ນຊ້ຳ callback ໃນການສ້າງຍີ່ຫໍ້ໃໝ່
            }

            // ດຳເນີນການຄົ້ນຫາ category_id
            findCategoryId();
        });
    } else {
        // ບໍ່ມີຊື່ຍີ່ຫໍ້, ດຳເນີນການຄົ້ນຫາ category_id ເລີຍ
        findCategoryId();
    }

    // ຟັງຊັນຄົ້ນຫາ category_id
    function findCategoryId() {
        if (categoryName) {
            const categoryQuery = 'SELECT category_id FROM category WHERE categoryName = ?';
            db.query(categoryQuery, [categoryName], (err, categoryResults) => {
                if (err) {
                    // console.error('Error finding category_id:', err);
                    return callback(err, null);
                }

                if (categoryResults.length > 0) {
                    category_id = categoryResults[0].category_id;
                    // console.log(`Found category_id ${category_id} for "${categoryName}"`);
                } else {
                    // console.log(`Category "${categoryName}" not found, creating new category`);
                    // ສ້າງປະເພດສິນຄ້າໃໝ່ຖ້າບໍ່ພົບ
                    const insertCategoryQuery = 'INSERT INTO category (categoryName, created_date) VALUES (?, ?)';
                    db.query(insertCategoryQuery, [categoryName, getFormattedDate()], (err, result) => {
                        if (err) {
                            // console.error('Error creating new category:', err);
                            return callback(err, null);
                        }

                        category_id = result.insertId;
                        // console.log(`Created new category_id ${category_id} for "${categoryName}"`);
                        callback(null, { brand_id, category_id });
                    });
                    return; // ຢຸດ execution ເພາະເຮົາຈະເອີ້ນຊ້ຳ callback ໃນການສ້າງປະເພດສິນຄ້າໃໝ່
                }

                callback(null, { brand_id, category_id });
            });
        } else {
            // ບໍ່ມີຊື່ປະເພດສິນຄ້າ, ສົ່ງຂໍ້ມູນກັບໄປເລີຍ
            callback(null, { brand_id, category_id });
        }
    }
};

// ເພີ່ມສິນຄ້າໃໝ່
const createProduct = (productData, callback) => {
    // ຄົ້ນຫາ brand_id ແລະ category_id ຈາກຊື່
    findBrandAndCategoryIds(productData.brand, productData.category, (err, ids) => {
        if (err) {
            return callback(err, null);
        }

        const { brand_id, category_id } = ids;

        // ກຳນົດສະຖານະຂອງສິນຄ້າໂດຍອັດຕະໂນມັດຕາມຈຳນວນ
        let status = productData.status || 'active';
        if (!productData.status) {
            if (productData.quantity <= productData.minQuantity) {
                status = 'low-stock';
            } else if (productData.quantity <= 0) {
                status = 'out-of-stock';
            }
        }

        const query = `
            INSERT INTO product (
                productName, quantity, min_quantity, unit, 
                brand_id, category_id, description, image_url, 
                status, created_date
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            productData.name,
            productData.quantity || 0,
            productData.minQuantity || 0,
            productData.unit || '',
            brand_id,
            category_id,
            productData.description || '',
            productData.imageUrl || '',
            status,
            getFormattedDate()
        ];

        db.query(query, values, (err, result) => {
            if (err) {
                // console.error('Error in createProduct:', err);
                return callback(err, null);
            }

            // console.log(`Product created with ID ${result.insertId}`);

            // ດຶງຂໍ້ມູນສິນຄ້າທີ່ຫາກໍສ້າງ
            getProductById(result.insertId, callback);
        });
    });
};

// ອັບເດດຂໍ້ມູນສິນຄ້າ
const updateProduct = (id, productData, callback) => {
    // ຄົ້ນຫາ brand_id ແລະ category_id ຈາກຊື່
    findBrandAndCategoryIds(productData.brand, productData.category, (err, ids) => {
        if (err) {
            return callback(err, null);
        }

        const { brand_id, category_id } = ids;

        // ກຳນົດສະຖານະຂອງສິນຄ້າໂດຍອັດຕະໂນມັດຕາມຈຳນວນ ຫຼື ໃຊ້ຄ່າທີ່ສົ່ງມາ
        let status = productData.status || 'active';
        if (!productData.status) {
            if (productData.quantity <= productData.minQuantity) {
                status = 'low-stock';
            } else if (productData.quantity <= 0) {
                status = 'out-of-stock';
            }
        }

        const query = `
            UPDATE product SET
                productName = ?,
                quantity = ?,
                min_quantity = ?,
                unit = ?,
                brand_id = ?,
                category_id = ?,
                description = ?,
                image_url = ?,
                status = ?
            WHERE product_id = ?
        `;

        const values = [
            productData.name,
            productData.quantity || 0,
            productData.minQuantity || 0,
            productData.unit || '',
            brand_id,
            category_id,
            productData.description || '',
            productData.imageUrl || '',
            status,
            id
        ];

        db.query(query, values, (err, result) => {
            if (err) {
                // console.error('Error in updateProduct:', err);
                return callback(err, null);
            }

            if (result.affectedRows === 0) {
                // console.log(`No product found with ID ${id} to update`);
                return callback(null, null);
            }

            // console.log(`Product ${id} updated successfully`);

            // ດຶງຂໍ້ມູນສິນຄ້າທີ່ອັບເດດ
            getProductById(id, callback);
        });
    });
};

// ລຶບສິນຄ້າ
const deleteProduct = (id, callback) => {
    const query = 'DELETE FROM product WHERE product_id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            // console.error('Error in deleteProduct:', err);
            return callback(err, null);
        }

        // console.log(`Delete product ${id}, affected rows: ${result.affectedRows}`);
        callback(null, { success: result.affectedRows > 0 });
    });
};

// ອັບເດດຈຳນວນສິນຄ້າ
const updateProductQuantity = (id, quantity, callback) => {
    // ດຶງຂໍ້ມູນສິນຄ້າປັດຈຸບັນ
    db.query('SELECT * FROM product WHERE product_id = ?', [id], (err, results) => {
        if (err) {
            // console.error('Error fetching product for quantity update:', err);
            return callback(err, null);
        }

        if (results.length === 0) {
            // console.log(`No product found with ID ${id} to update quantity`);
            return callback(new Error('ບໍ່ພົບສິນຄ້າ'), null);
        }

        const product = results[0];
        const newQuantity = quantity;

        // ກຳນົດສະຖານະຂອງສິນຄ້າໂດຍອັດຕະໂນມັດຕາມຈຳນວນ
        let status = 'active';
        if (newQuantity <= product.min_quantity) {
            status = 'low-stock';
        } else if (newQuantity <= 0) {
            status = 'out-of-stock';
        }

        // console.log(`Updating product ${id} quantity to ${newQuantity}, status: ${status}`);

        // ອັບເດດຈຳນວນ ແລະ ສະຖານະ
        const query = 'UPDATE product SET quantity = ?, status = ? WHERE product_id = ?';

        db.query(query, [newQuantity, status, id], (err, result) => {
            if (err) {
                // console.error('Error updating product quantity:', err);
                return callback(err, null);
            }

            // console.log(`Product ${id} quantity updated successfully`);

            // ດຶງຂໍ້ມູນສິນຄ້າທີ່ອັບເດດແລ້ວ
            getProductById(id, callback);
        });
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
    findBrandAndCategoryIds
};