// backend/controllers/employee.controller.js
const db = require('../config/db');
const {
    handleError,
    handleNotFound,
    handleBadRequest,
    formatEmployeeData
} = require('../utils/errorHandler');

// ດຶງຂໍ້ມູນພະນັກງານທັງໝົດ
exports.getAllEmployees = (req, res) => {
    const query = `
        SELECT 
            e.employee_id,
            e.employee_name,
            e.employee_email,
            e.employee_Tel,
            e.province,
            e.district,
            e.village,
            e.gender,
            e.user_id,
            u.role,
            u.username,
            'active' as status
        FROM 
            employees e
        LEFT JOIN
            users u ON e.user_id = u.id
        ORDER BY
            e.employee_id DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນພະນັກງານ', res);
        }

        // ແປງຮູບແບບຂໍ້ມູນໃຫ້ຕົງກັບ frontend
        const formattedResults = results.map(emp => formatEmployeeData(emp, emp.role || 'User'));
        res.json(formattedResults);
    });
};

// ດຶງຂໍ້ມູນພະນັກງານຕາມ ID
exports.getEmployeeById = (req, res) => {
    const employeeId = req.params.id.replace('EMP ', '').trim();

    db.query(`
        SELECT 
            e.employee_id,
            e.employee_name,
            e.employee_email,
            e.employee_Tel,
            e.province,
            e.district,
            e.village,
            e.gender,
            e.user_id,
            u.role,
            u.username,
            'active' as status
        FROM 
            employees e
        LEFT JOIN
            users u ON e.user_id = u.id
        WHERE 
            e.employee_id = ?
    `, [employeeId], (err, results) => {
        if (err) {
            return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນພະນັກງານ', res);
        }

        if (results.length === 0) {
            return handleNotFound(res, 'ບໍ່ພົບຂໍ້ມູນພະນັກງານ');
        }

        res.json(formatEmployeeData(results[0], results[0].role || 'User'));
    });
};

// ເພີ່ມຂໍ້ມູນພະນັກງານໃໝ່
exports.createEmployee = (req, res) => {
    const {
        name,
        email,
        tel,
        province,
        district,
        village,
        gender,
        username,
        role,
        password
    } = req.body;

    // ກວດສອບຂໍ້ມູນທີ່ຈຳເປັນ
    if (!name) {
        return handleBadRequest(res, 'ກະລຸນາປ້ອນຊື່ພະນັກງານ');
    }

    // ເລີ່ມ transaction ເພື່ອເພີ່ມຂໍ້ມູນຜູ້ໃຊ້ແລະພະນັກງານ
    db.beginTransaction(err => {
        if (err) {
            return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການເລີ່ມຕົ້ນ transaction', res);
        }

        let userId = null;

        // ຖ້າມີ username ແລະ password, ໃຫ້ສ້າງຜູ້ໃຊ້ໃໝ່
        if (username && password) {
            const bcrypt = require('bcrypt');
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    db.rollback();
                    return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການເຂົ້າລະຫັດລະຫັດຜ່ານ', res);
                }

                // ສ້າງຜູ້ໃຊ້ໃໝ່
                db.query(
                    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
                    [username, hash, role || 'user'],
                    (err, userResult) => {
                        if (err) {
                            db.rollback();
                            if (err.code === 'ER_DUP_ENTRY') {
                                return handleBadRequest(res, 'ຊື່ຜູ້ໃຊ້ນີ້ມີຢູ່ແລ້ວ');
                            }
                            return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການສ້າງຜູ້ໃຊ້', res);
                        }

                        userId = userResult.insertId;
                        insertEmployee(userId);
                    }
                );
            });
        } else {
            // ຖ້າບໍ່ມີຂໍ້ມູນຜູ້ໃຊ້, ໃຫ້ເພີ່ມສະເພາະຂໍ້ມູນພະນັກງານ
            insertEmployee(userId);
        }

        function insertEmployee(userId) {
            const query = `
                INSERT INTO employees 
                    (employee_name, employee_email, employee_Tel, 
                    province, district, village, 
                    gender, user_id) 
                VALUES 
                    (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            db.query(query, [
                name,
                email || null,
                tel || null,
                province || null,
                district || null,
                village || null,
                gender || null,
                userId
            ], (err, results) => {
                if (err) {
                    db.rollback();
                    return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການເພີ່ມຂໍ້ມູນພະນັກງານ', res);
                }

                db.commit(err => {
                    if (err) {
                        db.rollback();
                        return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ', res);
                    }

                    // ດຶງຂໍ້ມູນພະນັກງານທີ່ເພີ່ມລ່າສຸດ
                    db.query(`
                        SELECT 
                            e.employee_id,
                            e.employee_name,
                            e.employee_email,
                            e.employee_Tel,
                            e.province,
                            e.district,
                            e.village,
                            e.gender,
                            e.user_id,
                            u.role,
                            'active' as status
                        FROM 
                            employees e
                        LEFT JOIN
                            users u ON e.user_id = u.id
                        WHERE 
                            e.employee_id = ?
                    `, [results.insertId], (err, newEmployee) => {
                        if (err || newEmployee.length === 0) {
                            return res.status(201).json({
                                message: 'ເພີ່ມຂໍ້ມູນພະນັກງານສຳເລັດແລ້ວ',
                                id: `EMP ${String(results.insertId).padStart(3, '0')}`
                            });
                        }

                        res.status(201).json({
                            message: 'ເພີ່ມຂໍ້ມູນພະນັກງານສຳເລັດແລ້ວ',
                            employee: formatEmployeeData(newEmployee[0], newEmployee[0].role || 'User')
                        });
                    });
                });
            });
        }
    });
};

// ອັບເດດຂໍ້ມູນພະນັກງານ
exports.updateEmployee = (req, res) => {
    const employeeId = req.params.id.replace('EMP ', '').trim();
    const {
        name,
        email,
        tel,
        province,
        district,
        village,
        gender,
        role
    } = req.body;

    // ກວດສອບວ່າມີຂໍ້ມູນໃຫ້ອັບເດດຫຼືບໍ່
    if (!name && !email && !tel && !province && !district && !village && !gender && !role) {
        return handleBadRequest(res, 'ກະລຸນາປ້ອນຂໍ້ມູນທີ່ຕ້ອງການອັບເດດ');
    }

    // ດຶງຂໍ້ມູນພະນັກງານທີ່ຈະອັບເດດເພື່ອກວດສອບວ່າມີ user_id ຫຼືບໍ່
    db.query('SELECT user_id FROM employees WHERE employee_id = ?',
        [employeeId],
        (err, employeeResults) => {
            if (err) {
                return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນພະນັກງານ', res);
            }

            if (employeeResults.length === 0) {
                return handleNotFound(res, 'ບໍ່ພົບຂໍ້ມູນພະນັກງານ');
            }

            const userId = employeeResults[0].user_id;

            // ເລີ່ມ transaction
            db.beginTransaction(err => {
                if (err) {
                    return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການເລີ່ມຕົ້ນ transaction', res);
                }

                // ອັບເດດຂໍ້ມູນພະນັກງານ
                const updateEmployeeFields = [];
                const employeeValues = [];

                if (name) {
                    updateEmployeeFields.push('employee_name = ?');
                    employeeValues.push(name);
                }
                if (email !== undefined) {
                    updateEmployeeFields.push('employee_email = ?');
                    employeeValues.push(email);
                }
                if (tel !== undefined) {
                    updateEmployeeFields.push('employee_Tel = ?');
                    employeeValues.push(tel);
                }
                if (province !== undefined) {
                    updateEmployeeFields.push('province = ?');
                    employeeValues.push(province);
                }
                if (district !== undefined) {
                    updateEmployeeFields.push('district = ?');
                    employeeValues.push(district);
                }
                if (village !== undefined) {
                    updateEmployeeFields.push('village = ?');
                    employeeValues.push(village);
                }
                if (gender !== undefined) {
                    updateEmployeeFields.push('gender = ?');
                    employeeValues.push(gender);
                }

                // ເພີ່ມ ID ສຳລັບເງື່ອນໄຂ WHERE
                employeeValues.push(employeeId);

                const employeeQuery = `
                UPDATE employees 
                SET ${updateEmployeeFields.join(', ')} 
                WHERE employee_id = ?
            `;

                db.query(employeeQuery, employeeValues, (err, employeeUpdateResult) => {
                    if (err) {
                        db.rollback();
                        return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການອັບເດດຂໍ້ມູນພະນັກງານ', res);
                    }

                    // ຖ້າມີ userId ແລະ role ໃຫ້ອັບເດດຂໍ້ມູນຜູ້ໃຊ້ດ້ວຍ
                    if (userId && role) {
                        db.query('UPDATE users SET role = ? WHERE id = ?',
                            [role, userId],
                            (err, userUpdateResult) => {
                                if (err) {
                                    db.rollback();
                                    return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການອັບເດດຂໍ້ມູນຜູ້ໃຊ້', res);
                                }

                                db.commit(err => {
                                    if (err) {
                                        db.rollback();
                                        return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ', res);
                                    }
                                    returnUpdatedEmployee();
                                });
                            });
                    } else {
                        db.commit(err => {
                            if (err) {
                                db.rollback();
                                return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ', res);
                            }
                            returnUpdatedEmployee();
                        });
                    }
                });

                function returnUpdatedEmployee() {
                    // ດຶງຂໍ້ມູນພະນັກງານທີ່ອັບເດດ
                    db.query(`
                    SELECT 
                        e.employee_id,
                        e.employee_name,
                        e.employee_email,
                        e.employee_Tel,
                        e.province,
                        e.district,
                        e.village,
                        e.gender,
                        e.user_id,
                        u.role,
                        'active' as status
                    FROM 
                        employees e
                    LEFT JOIN
                        users u ON e.user_id = u.id
                    WHERE 
                        e.employee_id = ?
                `, [employeeId], (err, updatedEmployee) => {
                        if (err || updatedEmployee.length === 0) {
                            return res.json({ message: 'ອັບເດດຂໍ້ມູນພະນັກງານສຳເລັດແລ້ວ' });
                        }

                        res.json({
                            message: 'ອັບເດດຂໍ້ມູນພະນັກງານສຳເລັດແລ້ວ',
                            employee: formatEmployeeData(updatedEmployee[0], updatedEmployee[0].role || 'User')
                        });
                    });
                }
            });
        });
};

// ລຶບຂໍ້ມູນພະນັກງານ
exports.deleteEmployee = (req, res) => {
    const employeeId = req.params.id.replace('EMP ', '').trim();

    // ດຶງຂໍ້ມູນພະນັກງານທີ່ຈະລຶບເພື່ອກວດສອບວ່າມີ user_id ຫຼືບໍ່
    db.query('SELECT user_id FROM employees WHERE employee_id = ?',
        [employeeId],
        (err, results) => {
            if (err) {
                return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນພະນັກງານ', res);
            }

            if (results.length === 0) {
                return handleNotFound(res, 'ບໍ່ພົບຂໍ້ມູນພະນັກງານ');
            }

            const userId = results[0].user_id;

            // ເລີ່ມ transaction
            db.beginTransaction(err => {
                if (err) {
                    return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການເລີ່ມຕົ້ນ transaction', res);
                }

                // ລຶບຂໍ້ມູນພະນັກງານ
                db.query('DELETE FROM employees WHERE employee_id = ?',
                    [employeeId],
                    (err, employeeDeleteResult) => {
                        if (err) {
                            db.rollback();
                            return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການລຶບຂໍ້ມູນພະນັກງານ', res);
                        }

                        // ຖ້າມີ userId ແລະ ຕ້ອງການລຶບຜູ້ໃຊ້ດ້ວຍ
                        if (userId && req.query.deleteUser === 'true') {
                            db.query('DELETE FROM users WHERE id = ?',
                                [userId],
                                (err, userDeleteResult) => {
                                    if (err) {
                                        db.rollback();
                                        return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການລຶບຂໍ້ມູນຜູ້ໃຊ້', res);
                                    }

                                    db.commit(err => {
                                        if (err) {
                                            db.rollback();
                                            return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ', res);
                                        }
                                        res.json({
                                            message: 'ລຶບຂໍ້ມູນພະນັກງານແລະຜູ້ໃຊ້ສຳເລັດແລ້ວ'
                                        });
                                    });
                                });
                        } else {
                            db.commit(err => {
                                if (err) {
                                    db.rollback();
                                    return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ', res);
                                }
                                res.json({
                                    message: 'ລຶບຂໍ້ມູນພະນັກງານສຳເລັດແລ້ວ'
                                });
                            });
                        }
                    });
            });
        });
};

// ຄົ້ນຫາພະນັກງານ
exports.searchEmployees = (req, res) => {
    const { query: searchTerm } = req.query;

    if (!searchTerm) {
        return this.getAllEmployees(req, res);
    }

    const sql = `
        SELECT 
            e.employee_id,
            e.employee_name,
            e.employee_email,
            e.employee_Tel,
            e.province,
            e.district,
            e.village,
            e.gender,
            e.user_id,
            u.role,
            'active' as status
        FROM 
            employees e
        LEFT JOIN
            users u ON e.user_id = u.id
        WHERE 
            e.employee_name LIKE ? OR 
            e.employee_email LIKE ? OR
            e.employee_Tel LIKE ? OR
            e.province LIKE ? OR
            e.district LIKE ? OR
            e.village LIKE ? OR
            e.employee_id LIKE ? OR
            u.username LIKE ?
    `;

    const searchValue = `%${searchTerm}%`;
    const searchParams = Array(8).fill(searchValue);

    db.query(sql, searchParams, (err, results) => {
        if (err) {
            return handleError(err, 'ເກີດຂໍ້ຜິດພາດໃນການຄົ້ນຫາພະນັກງານ', res);
        }

        // ແປງຮູບແບບຂໍ້ມູນໃຫ້ຕົງກັບ frontend
        const formattedResults = results.map(emp => formatEmployeeData(emp, emp.role || 'User'));
        res.json(formattedResults);
    });
};