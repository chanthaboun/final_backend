// backend/models/supplier.model.js

const db = require('../config/db');
const { handleError, getFormattedDate } = require('../utils/errorHandler');

/**
 * ຟັງຊັນຈັດຮູບແບບຂໍ້ມູນຜູ້ສະໜອງສຳລັບສົ່ງກັບໄປ frontend
 */
const formatSupplierData = (sup) => {
    return {
        id: `SUP${String(sup.supId).padStart(3, '0')}`,
        name: sup.supName,
        email: sup.supEmail || '',
        tel: sup.supTel || '',
        province: sup.supProvince || '',
        district: sup.supDistrict || '',
        village: sup.supVillage || '',
        contact: sup.supContact || '',
        createdDate: sup.created_date
            ? new Date(sup.created_date).toISOString().slice(0, 19).replace('T', ' ')
            : getFormattedDate()
    };
};

/**
 * ດຶງຂໍ້ມູນຜູ້ສະໜອງທັງໝົດ
 */
exports.getAllSuppliers = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM suppliers ORDER BY supId DESC";

        db.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            }

            // ແປງຂໍ້ມູນໃຫ້ຢູ່ໃນຮູບແບບທີ່ຕ້ອງການ
            const formattedResults = results.map(sup => formatSupplierData(sup));
            resolve(formattedResults);
        });
    });
};

/**
 * ດຶງຂໍ້ມູນຜູ້ສະໜອງຕາມ ID
 */
exports.getSupplierById = (id) => {
    return new Promise((resolve, reject) => {
        // ດຶງລະຫັດຕົວເລກຈາກສະຕຣິງ SUP001 => 1
        let numericId;
        if (typeof id === 'string' && id.startsWith('SUP')) {
            numericId = Number.parseInt(id.substring(3), 10);
        } else {
            numericId = Number.parseInt(id, 10);
        }

        if (Number.isNaN(numericId)) {
            return reject(new Error('ລະຫັດຜູ້ສະໜອງບໍ່ຖືກຕ້ອງ'));
        }

        const sql = "SELECT * FROM suppliers WHERE supId = ?";

        db.query(sql, [numericId], (err, results) => {
            if (err) {
                return reject(err);
            }

            if (results.length === 0) {
                return reject(new Error('ບໍ່ພົບຂໍ້ມູນຜູ້ສະໜອງ'));
            }

            resolve(formatSupplierData(results[0]));
        });
    });
};

/**
 * ຄົ້ນຫາຜູ້ສະໜອງຕາມຂໍ້ຄວາມ
 */
exports.searchSuppliers = (searchQuery) => {
    return new Promise((resolve, reject) => {
        const sql = `
      SELECT * FROM suppliers 
      WHERE 
        supName LIKE ? OR 
        supEmail LIKE ? OR 
        supTel LIKE ? OR 
        supProvince LIKE ? OR 
        supDistrict LIKE ? OR 
        supVillage LIKE ? OR 
        supContact LIKE ?
      ORDER BY supId DESC
    `;

        const searchParam = `%${searchQuery}%`;
        const params = Array(7).fill(searchParam); // 7 ຟິລທີ່ຕ້ອງການຄົ້ນຫາ

        db.query(sql, params, (err, results) => {
            if (err) {
                return reject(err);
            }

            const formattedResults = results.map(sup => formatSupplierData(sup));
            resolve(formattedResults);
        });
    });
};

/**
 * ສ້າງຜູ້ສະໜອງໃໝ່
 */
exports.createSupplier = (supplierData) => {
    return new Promise((resolve, reject) => {
        const { name, email, tel, province, district, village, contact } = supplierData;

        if (!name) {
            return reject(new Error('ກະລຸນາລະບຸຊື່ຜູ້ສະໜອງ'));
        }

        const sql = `
      INSERT INTO suppliers 
        (supName, supEmail, supTel, supProvince, supDistrict, supVillage, supContact) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

        const params = [name, email || null, tel || null, province || null, district || null, village || null, contact || null];

        db.query(sql, params, (err, result) => {
            if (err) {
                return reject(err);
            }

            // ຖ້າສຳເລັດ, ດຶງຂໍ້ມູນທີ່ສ້າງໃໝ່ແບບສົມບູນ
            this.getSupplierById(result.insertId)
                .then(supplier => resolve(supplier))
                .catch(error => reject(error));
        });
    });
};

/**
 * ອັບເດດຂໍ້ມູນຜູ້ສະໜອງ
 */
exports.updateSupplier = (id, supplierData) => {
    return new Promise((resolve, reject) => {
        // ດຶງລະຫັດຕົວເລກຈາກສະຕຣິງ SUP001 => 1
        let numericId;
        if (typeof id === 'string' && id.startsWith('SUP')) {
            numericId = Number.parseInt(id.substring(3), 10);
        } else {
            numericId = Number.parseInt(id, 10);
        }

        if (Number.isNaN(numericId)) {
            return reject(new Error('ລະຫັດຜູ້ສະໜອງບໍ່ຖືກຕ້ອງ'));
        }

        const { name, email, tel, province, district, village, contact } = supplierData;

        if (!name) {
            return reject(new Error('ກະລຸນາລະບຸຊື່ຜູ້ສະໜອງ'));
        }

        const sql = `
      UPDATE suppliers SET 
        supName = ?, 
        supEmail = ?, 
        supTel = ?, 
        supProvince = ?, 
        supDistrict = ?, 
        supVillage = ?, 
        supContact = ?
      WHERE supId = ?
    `;

        const params = [
            name,
            email || null,
            tel || null,
            province || null,
            district || null,
            village || null,
            contact || null,
            numericId
        ];

        db.query(sql, params, (err, result) => {
            if (err) {
                return reject(err);
            }

            if (result.affectedRows === 0) {
                return reject(new Error('ບໍ່ພົບຂໍ້ມູນຜູ້ສະໜອງທີ່ຕ້ອງການອັບເດດ'));
            }

            // ດຶງຂໍ້ມູນທີ່ອັບເດດແບບສົມບູນ
            this.getSupplierById(numericId)
                .then(supplier => resolve(supplier))
                .catch(error => reject(error));
        });
    });
};

/**
 * ລຶບຂໍ້ມູນຜູ້ສະໜອງ
 */
exports.deleteSupplier = (id) => {
    return new Promise((resolve, reject) => {
        // ດຶງລະຫັດຕົວເລກຈາກສະຕຣິງ SUP001 => 1
        let numericId;
        if (typeof id === 'string' && id.startsWith('SUP')) {
            numericId = Number.parseInt(id.substring(3), 10);
        } else {
            numericId = Number.parseInt(id, 10);
        }

        if (Number.isNaN(numericId)) {
            return reject(new Error('ລະຫັດຜູ້ສະໜອງບໍ່ຖືກຕ້ອງ'));
        }

        const sql = "DELETE FROM suppliers WHERE supId = ?";

        db.query(sql, [numericId], (err, result) => {
            if (err) {
                return reject(err);
            }

            if (result.affectedRows === 0) {
                return reject(new Error('ບໍ່ພົບຂໍ້ມູນຜູ້ສະໜອງທີ່ຕ້ອງການລຶບ'));
            }

            resolve({ message: 'ລຶບຂໍ້ມູນຜູ້ສະໜອງສຳເລັດແລ້ວ', id });
        });
    });
};