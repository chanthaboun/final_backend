// backend/controllers/brand.controller.js
const Brand = require('../models/brand.model');
const { handleError, handleNotFound } = require('../utils/errorHandler');

/**
 * ຄອນໂທຣເລີຈັດການຍີ່ຫໍ້ສິນຄ້າ
 */
const BrandController = {
    /**
     * ດຶງຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າທັງໝົດ
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    getAllBrands: (req, res) => {
        Brand.getAll((err, brands) => {
            if (err) {
                return handleError(err, 'ຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າ', res);
            }
            res.json(brands);
        });
    },

    /**
     * ດຶງຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າຕາມ ID
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    getBrandById: (req, res) => {
        const id = req.params.id;
        // ຮັບປະກັນວ່າ id ເປັນຕົວເລກ
        const numericId = Number.parseInt(id, 10);

        if (Number.isNaN(numericId)) {
            return res.status(400).json({ message: 'ລະຫັດບໍ່ຖືກຕ້ອງ' });
        }

        Brand.getById(id, (err, brand) => {
            if (err) {
                return handleError(err, `ຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າທີ່ມີລະຫັດ ${id}`, res);
            }

            if (!brand) {
                return handleNotFound(res, `ບໍ່ພົບຍີ່ຫໍ້ສິນຄ້າທີ່ມີລະຫັດ ${id}`);
            }

            res.json(brand);
        });
    },

    /**
     * ຄົ້ນຫາຍີ່ຫໍ້ສິນຄ້າດ້ວຍຄຳສັບ
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    searchBrands: (req, res) => {
        const keyword = req.query.keyword || '';

        Brand.search(keyword, (err, brands) => {
            if (err) {
                return handleError(err, 'ຂໍ້ຜິດພາດໃນການຄົ້ນຫາຍີ່ຫໍ້ສິນຄ້າ', res);
            }

            res.json(brands);
        });
    },

    /**
     * ສ້າງຍີ່ຫໍ້ສິນຄ້າໃໝ່
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    createBrand: (req, res) => {
        const { name, status = true } = req.body;

        // ກວດສອບຂໍ້ມູນພື້ນຖານ
        if (!name) {
            return res.status(400).json({ message: 'ກະລຸນາປ້ອນຊື່ຍີ່ຫໍ້ສິນຄ້າ' });
        }

        const brandData = {
            name,
            status: status === true || status === 'true' || status === 1 || status === '1'
        };

        Brand.create(brandData, (err, brand) => {
            if (err) {
                return handleError(err, 'ຂໍ້ຜິດພາດໃນການສ້າງຍີ່ຫໍ້ສິນຄ້າ', res);
            }

            res.status(201).json({
                message: 'ສ້າງຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າສຳເລັດແລ້ວ',
                brand
            });
        });
    },

    /**
     * ອັບເດດຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າທີ່ມີຢູ່ແລ້ວ
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    updateBrand: (req, res) => {
        const id = req.params.id;
        // ຮັບປະກັນວ່າ id ເປັນຕົວເລກ
        const numericId = Number.parseInt(id, 10);

        if (Number.isNaN(numericId)) {
            return res.status(400).json({ message: 'ລະຫັດບໍ່ຖືກຕ້ອງ' });
        }
        const { name, status } = req.body;

        // ກວດສອບຂໍ້ມູນພື້ນຖານ
        if (!name) {
            return res.status(400).json({ message: 'ກະລຸນາປ້ອນຊື່ຍີ່ຫໍ້ສິນຄ້າ' });
        }

        const brandData = {
            name,
            status: status === true || status === 'true' || status === 1 || status === '1'
        };

        Brand.update(id, brandData, (err, brand) => {
            if (err) {
                if (err.message.includes('ບໍ່ພົບຍີ່ຫໍ້ສິນຄ້າ')) {
                    return handleNotFound(res, `ບໍ່ພົບຍີ່ຫໍ້ສິນຄ້າທີ່ມີລະຫັດ ${id}`);
                }
                return handleError(err, `ຂໍ້ຜິດພາດໃນການອັບເດດຍີ່ຫໍ້ສິນຄ້າທີ່ມີລະຫັດ ${id}`, res);
            }

            res.json({
                message: 'ອັບເດດຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າສຳເລັດແລ້ວ',
                brand
            });
        });
    },

    /**
     * ລຶບຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າ
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    deleteBrand: (req, res) => {
        const id = req.params.id;
        // ຮັບປະກັນວ່າ id ເປັນຕົວເລກ
        const numericId = Number.parseInt(id, 10);

        if (Number.isNaN(numericId)) {
            return res.status(400).json({ message: 'ລະຫັດບໍ່ຖືກຕ້ອງ' });
        }

        Brand.delete(id, (err, result) => {
            if (err) {
                if (err.message.includes('ບໍ່ພົບຍີ່ຫໍ້ສິນຄ້າ')) {
                    return handleNotFound(res, `ບໍ່ພົບຍີ່ຫໍ້ສິນຄ້າທີ່ມີລະຫັດ ${id}`);
                }
                return handleError(err, `ຂໍ້ຜິດພາດໃນການລຶບຍີ່ຫໍ້ສິນຄ້າທີ່ມີລະຫັດ ${id}`, res);
            }

            res.json({
                message: 'ລຶບຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າສຳເລັດແລ້ວ'
            });
        });
    }
};

module.exports = BrandController;