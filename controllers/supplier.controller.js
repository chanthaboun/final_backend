// backend/controllers/supplier.controller.js

const supplierModel = require('../models/supplier.model');
const { handleError, handleNotFound, handleBadRequest } = require('../utils/errorHandler');

/**
 * ດຶງຂໍ້ມູນຜູ້ສະໜອງທັງໝົດ
 */
exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await supplierModel.getAllSuppliers();
        return res.status(200).json(suppliers);
    } catch (err) {
        return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນຜູ້ສະໜອງ', res, 'ບໍ່ສາມາດດຶງຂໍ້ມູນຜູ້ສະໜອງໄດ້');
    }
};

/**
 * ດຶງຂໍ້ມູນຜູ້ສະໜອງຕາມ ID
 */
exports.getSupplierById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return handleBadRequest(res, 'ກະລຸນາລະບຸລະຫັດຜູ້ສະໜອງ');
        }

        const supplier = await supplierModel.getSupplierById(id);
        return res.status(200).json(supplier);
    } catch (err) {
        if (err.message === 'ບໍ່ພົບຂໍ້ມູນຜູ້ສະໜອງ') {
            return handleNotFound(res, err.message);
        }
        return handleError(err, `ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນຜູ້ສະໜອງລະຫັດ ${req.params.id}`, res, 'ບໍ່ສາມາດດຶງຂໍ້ມູນຜູ້ສະໜອງໄດ້');
    }
};

/**
 * ຄົ້ນຫາຜູ້ສະໜອງຕາມຂໍ້ຄວາມ
 */
exports.searchSuppliers = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || query.trim() === '') {
            // ຖ້າບໍ່ມີຄໍາຄົ້ນຫາ, ສົ່ງຄືນທັງໝົດ
            const suppliers = await supplierModel.getAllSuppliers();
            return res.status(200).json(suppliers);
        }

        const suppliers = await supplierModel.searchSuppliers(query);
        return res.status(200).json(suppliers);
    } catch (err) {
        return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການຄົ້ນຫາຜູ້ສະໜອງ', res, 'ບໍ່ສາມາດຄົ້ນຫາຜູ້ສະໜອງໄດ້');
    }
};

/**
 * ສ້າງຜູ້ສະໜອງໃໝ່
 */
exports.createSupplier = async (req, res) => {
    try {
        const supplierData = req.body;

        if (!supplierData.name) {
            return handleBadRequest(res, 'ກະລຸນາລະບຸຊື່ຜູ້ສະໜອງ');
        }

        const newSupplier = await supplierModel.createSupplier(supplierData);
        return res.status(201).json({
            message: 'ສ້າງຂໍ້ມູນຜູ້ສະໜອງສຳເລັດແລ້ວ',
            supplier: newSupplier
        });
    } catch (err) {
        return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການສ້າງຜູ້ສະໜອງ', res, 'ບໍ່ສາມາດສ້າງຂໍ້ມູນຜູ້ສະໜອງໄດ້');
    }
};

/**
 * ອັບເດດຂໍ້ມູນຜູ້ສະໜອງ
 */
exports.updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const supplierData = req.body;

        if (!id) {
            return handleBadRequest(res, 'ກະລຸນາລະບຸລະຫັດຜູ້ສະໜອງ');
        }

        if (!supplierData.name) {
            return handleBadRequest(res, 'ກະລຸນາລະບຸຊື່ຜູ້ສະໜອງ');
        }

        const updatedSupplier = await supplierModel.updateSupplier(id, supplierData);
        return res.status(200).json({
            message: 'ອັບເດດຂໍ້ມູນຜູ້ສະໜອງສຳເລັດແລ້ວ',
            supplier: updatedSupplier
        });
    } catch (err) {
        if (err.message === 'ບໍ່ພົບຂໍ້ມູນຜູ້ສະໜອງທີ່ຕ້ອງການອັບເດດ') {
            return handleNotFound(res, err.message);
        }
        return handleError(err, `ເກີດຂໍ້ຜິດພາດໃນການອັບເດດຜູ້ສະໜອງລະຫັດ ${req.params.id}`, res, 'ບໍ່ສາມາດອັບເດດຂໍ້ມູນຜູ້ສະໜອງໄດ້');
    }
};

/**
 * ລຶບຂໍ້ມູນຜູ້ສະໜອງ
 */
exports.deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return handleBadRequest(res, 'ກະລຸນາລະບຸລະຫັດຜູ້ສະໜອງ');
        }

        const result = await supplierModel.deleteSupplier(id);
        return res.status(200).json(result);
    } catch (err) {
        if (err.message === 'ບໍ່ພົບຂໍ້ມູນຜູ້ສະໜອງທີ່ຕ້ອງການລຶບ') {
            return handleNotFound(res, err.message);
        }
        return handleError(err, `ເກີດຂໍ້ຜິດພາດໃນການລຶບຜູ້ສະໜອງລະຫັດ ${req.params.id}`, res, 'ບໍ່ສາມາດລຶບຂໍ້ມູນຜູ້ສະໜອງໄດ້');
    }
};