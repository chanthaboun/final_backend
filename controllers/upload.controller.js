/**
 * ໄຟລ໌: controllers/upload.controller.js
 * ໜ້າທີ່: ຈັດການຄຳຂໍຂອງ API ສຳລັບການອັບໂຫລດໄຟລ໌
 */
const fs = require('node:fs');
const path = require('node:path');
const { v4: uuidv4 } = require('uuid');
const { handleError, handleBadRequest } = require('../utils/errorHandler');

// ຕັ້ງຄ່າເສັ້ນທາງສຳລັບເກັບຮູບພາບ
const UPLOAD_DIR = path.join(__dirname, '../uploads');
const PRODUCT_IMAGES_DIR = path.join(UPLOAD_DIR, 'products');

// ສ້າງໂຟລເດີສຳລັບເກັບຮູບພາບຖ້າຍັງບໍ່ມີ
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

if (!fs.existsSync(PRODUCT_IMAGES_DIR)) {
    fs.mkdirSync(PRODUCT_IMAGES_DIR, { recursive: true });
}

/**
 * ອັບໂຫລດຮູບພາບສິນຄ້າ
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 */
const uploadProductImage = (req, res) => {
    try {
        // ກວດວ່າມີໄຟລ໌ທີ່ຈະອັບໂຫລດຫຼືບໍ່
        if (!req.files || Object.keys(req.files).length === 0) {
            return handleBadRequest(res, 'ບໍ່ພົບໄຟລ໌ທີ່ຈະອັບໂຫລດ');
        }

        // ເອົາໄຟລ໌ຮູບພາບທີ່ສົ່ງມາ
        const imageFile = req.files.image;

        // ກວດຊະນິດຂອງໄຟລ໌
        const fileType = imageFile.mimetype;
        if (!fileType.startsWith('image/')) {
            return handleBadRequest(res, 'ກະລຸນາອັບໂຫລດສະເພາະໄຟລ໌ຮູບພາບເທົ່ານັ້ນ');
        }

        // ກວດຂະໜາດຂອງໄຟລ໌ (ຈຳກັດທີ່ 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (imageFile.size > maxSize) {
            return handleBadRequest(res, 'ຂະໜາດໄຟລ໌ຕ້ອງບໍ່ເກີນ 5MB');
        }

        // ສ້າງຊື່ໄຟລ໌ໃໝ່ແບບສຸ່ມເພື່ອປ້ອງກັນການຊ້ຳກັນ
        const fileExtension = path.extname(imageFile.name).toLowerCase();
        const newFileName = `product_${uuidv4()}${fileExtension}`;
        const uploadPath = path.join(PRODUCT_IMAGES_DIR, newFileName);

        // ບັນທຶກໄຟລ໌
        imageFile.mv(uploadPath, (err) => {
            if (err) {
                return handleError(err, 'ຂໍ້ຜິດພາດໃນການບັນທຶກໄຟລ໌', res);
            }

            // ສ້າງ URL ສຳລັບເຂົ້າເຖິງຮູບພາບ
            const imageUrl = `/uploads/products/${newFileName}`;

            res.status(201).json({
                success: true,
                message: 'ອັບໂຫລດຮູບພາບສຳເລັດແລ້ວ',
                data: {
                    fileName: newFileName,
                    fileType: fileType,
                    fileSize: imageFile.size,
                    url: imageUrl
                }
            });
        });
    } catch (err) {
        return handleError(err, 'ຂໍ້ຜິດພາດໃນການອັບໂຫລດຮູບພາບ', res);
    }
};

/**
 * ອັບໂຫລດໄຟລ໌ຫຼາຍໄຟລ໌
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 */
const uploadMultipleFiles = async (req, res) => {
    try {
        // ກວດວ່າມີໄຟລ໌ທີ່ຈະອັບໂຫລດຫຼືບໍ່
        if (!req.files || Object.keys(req.files).length === 0) {
            return handleBadRequest(res, 'ບໍ່ພົບໄຟລ໌ທີ່ຈະອັບໂຫລດ');
        }

        // ກວດວ່າສົ່ງໄຟລ໌ມາໃນຮູບແບບຂອງອາເຣ
        const files = req.files.files;
        if (!Array.isArray(files)) {
            return handleBadRequest(res, 'ຮູບແບບຂໍ້ມູນບໍ່ຖືກຕ້ອງ');
        }

        const uploadResults = [];
        const promises = [];

        // ອັບໂຫລດແຕ່ລະໄຟລ໌ໂດຍໃຊ້ for...of ແທນທີ່ຈະໃຊ້ forEach
        for (const file of files) {
            // ກວດຊະນິດຂອງໄຟລ໌
            const fileType = file.mimetype;
            if (!fileType.startsWith('image/')) {
                uploadResults.push({
                    originalName: file.name,
                    success: false,
                    message: 'ກະລຸນາອັບໂຫລດສະເພາະໄຟລ໌ຮູບພາບເທົ່ານັ້ນ'
                });
                continue; // ໃຊ້ continue ແທນ return ໃນ for loop
            }

            // ກວດຂະໜາດຂອງໄຟລ໌
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                uploadResults.push({
                    originalName: file.name,
                    success: false,
                    message: 'ຂະໜາດໄຟລ໌ຕ້ອງບໍ່ເກີນ 5MB'
                });
                continue; // ໃຊ້ continue ແທນ return ໃນ for loop
            }

            // ສ້າງຊື່ໄຟລ໌ໃໝ່
            const fileExtension = path.extname(file.name).toLowerCase();
            const newFileName = `product_${uuidv4()}${fileExtension}`;
            const uploadPath = path.join(PRODUCT_IMAGES_DIR, newFileName);

            // ສ້າງ Promise ສຳລັບການອັບໂຫລດໄຟລ໌
            const promise = new Promise((resolve, reject) => {
                file.mv(uploadPath, (err) => {
                    if (err) {
                        uploadResults.push({
                            originalName: file.name,
                            success: false,
                            message: 'ຂໍ້ຜິດພາດໃນການບັນທຶກໄຟລ໌'
                        });
                        resolve();
                        return;
                    }

                    uploadResults.push({
                        originalName: file.name,
                        newFileName: newFileName,
                        success: true,
                        fileType: fileType,
                        fileSize: file.size,
                        url: `/uploads/products/${newFileName}`
                    });
                    resolve();
                });
            });

            promises.push(promise);
        }

        // ລໍຖ້າໃຫ້ທຸກໄຟລ໌ຖືກອັບໂຫລດສຳເລັດ
        try {
            await Promise.all(promises);
            res.status(201).json({
                success: true,
                message: 'ອັບໂຫລດໄຟລ໌ສຳເລັດແລ້ວ',
                data: uploadResults
            });
        } catch (err) {
            return handleError(err, 'ຂໍ້ຜິດພາດໃນການອັບໂຫລດໄຟລ໌', res);
        }
    } catch (err) {
        return handleError(err, 'ຂໍ້ຜິດພາດໃນການອັບໂຫລດໄຟລ໌', res);
    }
};

/**
 * ເອົາຮູບພາບຈາກຄອມພິວເຕີ
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 */
const getImage = (req, res) => {
    const { folder, filename } = req.params;

    // ກວດສອບຄວາມປອດໄພຂອງເສັ້ນທາງໄຟລ໌ (ປ້ອງກັນການເຂົ້າເຖິງໄຟລ໌ໂດຍບໍ່ໄດ້ຮັບອະນຸຍາດ)
    if (filename.includes('..') || folder.includes('..')) {
        return handleBadRequest(res, 'ບໍ່ສາມາດເຂົ້າເຖິງໄຟລ໌ນີ້ໄດ້');
    }

    // ສ້າງເສັ້ນທາງສຳລັບເຂົ້າເຖິງໄຟລ໌
    const filePath = path.join(UPLOAD_DIR, folder, filename);

    // ກວດສອບວ່າໄຟລ໌ມີຢູ່ຫຼືບໍ່
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ message: 'ບໍ່ພົບໄຟລ໌' });
        }

        // ສົ່ງໄຟລ໌ກັບໄປໃຫ້ຜູ້ໃຊ້
        res.sendFile(filePath);
    });
};

module.exports = {
    uploadProductImage,
    uploadMultipleFiles,
    getImage
};