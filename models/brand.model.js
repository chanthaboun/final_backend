// backend/models/brand.model.js
const db = require('../config/db');
const { getFormattedDate } = require('../utils/errorHandler');

/**
 * ໂມເດວຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າ
 */
const Brand = {
    /**
     * ດຶງຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າທັງໝົດ
     * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
     */
    // getAll: (callback) => {
    //     db.query(
    //         'SELECT * FROM brand ORDER BY brand_id DESC',
    //         (err, results) => {
    //             if (err) {
    //                 return callback(err, null);
    //             }

    //             // ແປງຂໍ້ມູນໃຫ້ເປັນຮູບແບບທີ່ frontend ຕ້ອງການ
    //             const brands = results.map(item => ({
    //                 id: `B${item.brand_id.toString().padStart(3, '0')}`, // ຕ້ອງໃສ່ 'B' ນຳໜ້າ
    //                 name: item.brandName,
    //                 status: item.brandStatus === 1,
    //                 createdDate: new Date(item.created_date).toISOString().slice(0, 19).replace('T', ' ')
    //             }));

    //             callback(null, brands);
    //         }
    //     );
    // },

    getAll: (callback) => {
        db.query(
            'SELECT * FROM brand ORDER BY brand_id DESC',
            (err, results) => {
                if (err) {
                    return callback(err, null);
                }

                // ແປງຂໍ້ມູນໃຫ້ເປັນຮູບແບບທີ່ frontend ຕ້ອງການ
                const brands = results.map(item => ({
                    id: `B${item.brand_id.toString().padStart(3, '0')}`,
                    name: item.brandName,
                    status: item.brandStatus === 1,
                    createdDate: item.created_date ?
                        new Date(item.created_date).toISOString().slice(0, 19).replace('T', ' ') :
                        getFormattedDate()
                }));

                callback(null, brands);
            }
        );
    },
    /**
     * ຄົ້ນຫາຍີ່ຫໍ້ສິນຄ້າຕາມລະຫັດ
     * @param {number} id - ລະຫັດຍີ່ຫໍ້ສິນຄ້າ
     * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
     */
    getById: (id, callback) => {
        db.query(
            'SELECT * FROM brand WHERE brand_id = ?',
            [id],
            (err, results) => {
                if (err) {
                    return callback(err, null);
                }

                if (results.length === 0) {
                    return callback(null, null);
                }

                const item = results[0];
                const brand = {
                    id: `B${item.brand_id.toString().padStart(3, '0')}`,
                    name: item.brandName,
                    status: item.brandStatus === 1,
                    createdDate: item.created_date ?
                        new Date(item.created_date).toISOString().slice(0, 19).replace('T', ' ') :
                        getFormattedDate()
                };

                callback(null, brand);
            }
        );
    },

    /**
     * ຄົ້ນຫາຍີ່ຫໍ້ສິນຄ້າດ້ວຍຄຳສັບ
     * @param {string} keyword - ຄຳສັບທີ່ໃຊ້ຄົ້ນຫາ
     * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
     */
    search: (keyword, callback) => {
        db.query(
            'SELECT * FROM brand WHERE brand_id LIKE ? OR brandName LIKE ? ORDER BY brand_id DESC',
            [`%${keyword}%`, `%${keyword}%`],
            (err, results) => {
                if (err) {
                    return callback(err, null);
                }

                // ແປງຂໍ້ມູນໃຫ້ເປັນຮູບແບບທີ່ frontend ຕ້ອງການ
                const brands = results.map(item => ({
                    id: item.brand_id.toString(),
                    name: item.brandName,
                    status: item.brandStatus === 1,
                    createdDate: new Date(item.created_date).toISOString().slice(0, 19).replace('T', ' ')
                }));

                callback(null, brands);
            }
        );
    },

    /**
     * ເພີ່ມຍີ່ຫໍ້ສິນຄ້າໃໝ່
     * @param {Object} brandData - ຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າທີ່ຕ້ອງການເພີ່ມ
     * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
     */
    create: (brandData, callback) => {
        // ກວດສອບຂໍ້ມູນພື້ນຖານ
        if (!brandData.name) {
            return callback(new Error('ກະລຸນາປ້ອນຊື່ຍີ່ຫໍ້ສິນຄ້າ'), null);
        }

        const now = getFormattedDate();

        db.query(
            'INSERT INTO brand (brandName, brandStatus, created_date) VALUES (?, ?, ?)',
            [brandData.name, brandData.status ? 1 : 0, now],
            (err, result) => {
                if (err) {
                    return callback(err, null);
                }

                // ຖ້າບັນທຶກສຳເລັດ ໃຫ້ດຶງຂໍ້ມູນລ່າສຸດທີ່ຖືກເພີ່ມໄປ
                Brand.getById(result.insertId, callback);
            }
        );
    },

    /**
     * ອັບເດດຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າທີ່ມີຢູ່ແລ້ວ
     * @param {number} id - ລະຫັດຍີ່ຫໍ້ສິນຄ້າທີ່ຕ້ອງການອັບເດດ
     * @param {Object} brandData - ຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າທີ່ຕ້ອງການອັບເດດ
     * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
     */
    update: (id, brandData, callback) => {
        // ກວດສອບຂໍ້ມູນພື້ນຖານ
        if (!brandData.name) {
            return callback(new Error('ກະລຸນາປ້ອນຊື່ຍີ່ຫໍ້ສິນຄ້າ'), null);
        }

        db.query(
            'UPDATE brand SET brandName = ?, brandStatus = ? WHERE brand_id = ?',
            [brandData.name, brandData.status ? 1 : 0, id],
            (err, result) => {
                if (err) {
                    return callback(err, null);
                }

                if (result.affectedRows === 0) {
                    return callback(new Error('ບໍ່ພົບຍີ່ຫໍ້ສິນຄ້າທີ່ຕ້ອງການອັບເດດ'), null);
                }

                // ຖ້າບັນທຶກສຳເລັດ ໃຫ້ດຶງຂໍ້ມູນລ່າສຸດທີ່ຖືກອັບເດດໄປ
                Brand.getById(id, callback);
            }
        );
    },

    /**
     * ລຶບຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າ
     * @param {number} id - ລະຫັດຍີ່ຫໍ້ສິນຄ້າທີ່ຕ້ອງການລຶບ
     * @param {function} callback - ຟັງຊັນ callback ສຳລັບຮັບຂໍ້ມູນຫຼືຂໍ້ຜິດພາດ
     */
    delete: (id, callback) => {
        db.query(
            'DELETE FROM brand WHERE brand_id = ?',
            [id],
            (err, result) => {
                if (err) {
                    return callback(err, null);
                }

                if (result.affectedRows === 0) {
                    return callback(new Error('ບໍ່ພົບຍີ່ຫໍ້ສິນຄ້າທີ່ຕ້ອງການລຶບ'), null);
                }

                callback(null, { message: 'ລຶບຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າສຳເລັດແລ້ວ' });
            }
        );
    }
};

module.exports = Brand;