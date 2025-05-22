// backend/utils/errorHandler.js - ຟັງຊັນຊ່ວຍຈັດການຂໍ້ຜິດພາດ

/**
 * ຟັງຊັນຈັດການຂໍ້ຜິດພາດທົ່ວໄປ
 * @param {Error} err - ຂໍ້ຜິດພາດທີ່ເກີດຂຶ້ນ
 * @param {string} logMessage - ຂໍ້ຄວາມທີ່ຕ້ອງການບັນທຶກລົງລອກ
 * @param {Response} res - Response object ຂອງ Express.js
 * @param {string} userMessage - ຂໍ້ຄວາມທີ່ສະແດງຕໍ່ຜູ້ໃຊ້
 * @returns {Response} Express Response object
 */
const handleError = (err, logMessage, res, userMessage = 'ເຊີບເວີມີຂໍ້ຜິດພາດ') => {
    console.error(`${logMessage}:`, err);
    return res.status(500).json({ message: userMessage });
};

/**
 * ຟັງຊັນຕອບກັບເມື່ອບໍ່ພົບຂໍ້ມູນ
 * @param {Response} res - Response object ຂອງ Express.js
 * @param {string} message - ຂໍ້ຄວາມທີ່ຕ້ອງການສົ່ງກັບ
 * @returns {Response} Express Response object
 */
const handleNotFound = (res, message = 'ບໍ່ພົບຂໍ້ມູນ') => {
    return res.status(404).json({ message });
};

/**
 * ຟັງຊັນຕອບກັບເມື່ອຂໍ້ມູນບໍ່ຖືກຕ້ອງ
 * @param {Response} res - Response object ຂອງ Express.js
 * @param {string} message - ຂໍ້ຄວາມທີ່ຕ້ອງການສົ່ງກັບ
 * @returns {Response} Express Response object
 */
const handleBadRequest = (res, message = 'ຂໍ້ມູນບໍ່ຖືກຕ້ອງ') => {
    return res.status(400).json({ message });
};

/**
 * ຟັງຊັນຈັດຮູບແບບວັນທີ
 * @returns {string} ວັນທີໃນຮູບແບບ YYYY-MM-DD HH:MM:SS
 */
const getFormattedDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} ${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}:${String(today.getSeconds()).padStart(2, '0')}`;
};

/**
 * ຟັງຊັນຈັດຮູບແບບຂໍ້ມູນພະນັກງານສຳລັບສົ່ງກັບໄປ frontend
 * @param {Object} emp - ຂໍ້ມູນພະນັກງານ
 * @returns {Object} ຂໍ້ມູນພະນັກງານທີ່ຈັດຮູບແບບແລ້ວ
 */
const formatEmployeeData = (emp) => {
    return {
        id: `EMP ${String(emp.employee_id).padStart(3, '0')}`,
        name: emp.employee_name,
        email: emp.employee_email,
        tel: emp.employee_Tel,
        province: emp.employeeProvince,
        district: emp.employeeDistrict,
        village: emp.employeeVillage,
        gender: emp.gender,
        role: emp.role || 'User',
        status: emp.status || 'active',
        user_id: emp.user_id,
        createdDate: emp.created_date ? new Date(emp.created_date).toISOString().slice(0, 19).replace('T', ' ') : getFormattedDate()
    };
};

module.exports = {
    handleError,
    handleNotFound,
    handleBadRequest,
    getFormattedDate,
    formatEmployeeData
};




