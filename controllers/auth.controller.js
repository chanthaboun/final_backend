// // backend/controllers/auth.controller.js
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const db = require('../config/db');

// // ຄ່າລັບສຳລັບ JWT (ຄວນເກັບໄວ້ໃຫ້ປອດໄພໃນສະພາບແວດລ້ອມຈິງ)
// const JWT_SECRET = 'warehouse_byd_2025';

// // ການ login
// exports.login = (req, res) => {
//     const { username, password } = req.body;

//     // ກວດສອບວ່າໄດ້ສົ່ງຂໍ້ມູນຄົບຖ້ວນຫຼືບໍ່
//     if (!username || !password) {
//         return res.status(400).json({ message: 'ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ ແລະ ລະຫັດຜ່ານ' });
//     }

//     // ຄົ້ນຫາຜູ້ໃຊ້ໃນຖານຂໍ້ມູນ
//     db.query(
//         'SELECT * FROM users WHERE username = ?',
//         [username],
//         (err, results) => {
//             if (err) {
//                 console.error('ເກີດຂໍ້ຜິດພາດກັບຖານຂໍ້ມູນ:', err);
//                 return res.status(500).json({ message: 'ເຊີບເວີມີຂໍ້ຜິດພາດ' });
//             }

//             // ຖ້າບໍ່ພົບຜູ້ໃຊ້
//             if (results.length === 0) {
//                 return res.status(401).json({ message: 'ຊື່ຜູ້ໃຊ້ຫຼືລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ' });
//             }

//             const user = results[0];

//             // ປຽບທຽບລະຫັດຜ່ານ
//             bcrypt.compare(password, user.password, (err, match) => {
//                 if (err) {
//                     console.error('ເກີດຂໍ້ຜິດພາດໃນການປຽບທຽບລະຫັດຜ່ານ:', err);
//                     return res.status(500).json({ message: 'ເຊີບເວີມີຂໍ້ຜິດພາດ' });
//                 }

//                 // ຖ້າລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ
//                 if (!match) {
//                     return res.status(401).json({ message: 'ຊື່ຜູ້ໃຊ້ຫຼືລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ' });
//                 }

//                 // ສ້າງ token
//                 const token = jwt.sign(
//                     { id: user.id, username: user.username, role: user.role },
//                     JWT_SECRET,
//                     { expiresIn: '1h' }
//                 );

//                 // ສົ່ງຄຳຕອບພ້ອມ token ແລະ ຂໍ້ມູນຜູ້ໃຊ້
//                 res.json({
//                     message: 'ເຂົ້າສູ່ລະບົບສຳເລັດ',
//                     token,
//                     user: {
//                         id: user.id,
//                         username: user.username,
//                         role: user.role
//                     }
//                 });
//             });
//         }
//     );
// };

// // ການລົງທະບຽນຜູ້ໃຊ້ໃໝ່
// exports.register = (req, res) => {
//     const { username, password, role = 'user' } = req.body;

//     // ກວດສອບວ່າໄດ້ສົ່ງຂໍ້ມູນຄົບຖ້ວນຫຼືບໍ່
//     if (!username || !password) {
//         return res.status(400).json({ message: 'ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ ແລະ ລະຫັດຜ່ານ' });
//     }

//     // ເຂົ້າລະຫັດລະຫັດຜ່ານ
//     bcrypt.hash(password, 10, (err, hash) => {
//         if (err) {
//             console.error('ເກີດຂໍ້ຜິດພາດໃນການເຂົ້າລະຫັດລະຫັດຜ່ານ:', err);
//             return res.status(500).json({ message: 'ເຊີບເວີມີຂໍ້ຜິດພາດ' });
//         }

//         // ບັນທຶກຜູ້ໃຊ້ໃໝ່ລົງໃນຖານຂໍ້ມູນ
//         db.query(
//             'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
//             [username, hash, role],
//             (err, results) => {
//                 if (err) {
//                     // ກວດສອບກໍລະນີຊື່ຜູ້ໃຊ້ຊ້ຳກັນ
//                     if (err.code === 'ER_DUP_ENTRY') {
//                         return res.status(409).json({ message: 'ຊື່ຜູ້ໃຊ້ນີ້ມີຢູ່ແລ້ວ' });
//                     }
//                     console.error('ເກີດຂໍ້ຜິດພາດກັບຖານຂໍ້ມູນ:', err);
//                     return res.status(500).json({ message: 'ເຊີບເວີມີຂໍ້ຜິດພາດ' });
//                 }

//                 res.status(201).json({
//                     message: 'ລົງທະບຽນຜູ້ໃຊ້ສຳເລັດແລ້ວ',
//                     userId: results.insertId
//                 });
//             }
//         );
//     });
// };

// // ດຶງຂໍ້ມູນຜູ້ໃຊ້ປັດຈຸບັນ
// exports.getUser = (req, res) => {
//     res.json(req.user);
// };


// // ສ້າງຜູ້ໃຊ້ admin ເລີ່ມຕົ້ນ (ໃຊ້ເວລາເປີດໃຊ້ງານຄັ້ງທຳອິດ)
// exports.createDefaultAdmin = () => {
//     db.query('SELECT * FROM users WHERE role = "admin" LIMIT 1', (err, results) => {
//         if (err) {
//             console.error('ເກີດຂໍ້ຜິດພາດໃນການກວດສອບຜູ້ໃຊ້ admin:', err);
//         } else if (results.length === 0) {
//             // ສ້າງຜູ້ໃຊ້ admin ເລີ່ມຕົ້ນ
//             bcrypt.hash('admin123', 10, (err, hash) => {
//                 if (err) {
//                     console.error('ເກີດຂໍ້ຜິດພາດໃນການເຂົ້າລະຫັດລະຫັດຜ່ານ:', err);
//                 } else {
//                     db.query(
//                         'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
//                         ['admin', hash, 'admin'],
//                         (err) => {
//                             if (err) {
//                                 console.error('ເກີດຂໍ້ຜິດພາດໃນການສ້າງຜູ້ໃຊ້ admin:', err);
//                             } else {
//                                 console.log('ສ້າງຜູ້ໃຊ້ admin ເລີ່ມຕົ້ນສຳເລັດແລ້ວ');
//                             }
//                         }
//                     );
//                 }
//             });
//         }
//     });
// };





// backend/controllers/auth.controller.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// ຄ່າລັບສຳລັບ JWT (ຄວນເກັບໄວ້ໃຫ້ປອດໄພໃນສະພາບແວດລ້ອມຈິງ)
const JWT_SECRET = 'warehouse_byd_2025';

// ການ login
exports.login = (req, res) => {
    const { username, password } = req.body;

    // ກວດສອບວ່າໄດ້ສົ່ງຂໍ້ມູນຄົບຖ້ວນຫຼືບໍ່
    if (!username || !password) {
        return res.status(400).json({ message: 'ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ ແລະ ລະຫັດຜ່ານ' });
    }

    // ຄົ້ນຫາຜູ້ໃຊ້ໃນຖານຂໍ້ມູນ
    db.query(
        'SELECT u.*, e.employee_id, e.employee_name FROM users u LEFT JOIN employees e ON u.id = e.user_id WHERE u.username = ?',
        [username],
        (err, results) => {
            if (err) {
                console.error('ເກີດຂໍ້ຜິດພາດກັບຖານຂໍ້ມູນ:', err);
                return res.status(500).json({ message: 'ເຊີບເວີມີຂໍ້ຜິດພາດ' });
            }

            // ຖ້າບໍ່ພົບຜູ້ໃຊ້
            if (results.length === 0) {
                return res.status(401).json({ message: 'ຊື່ຜູ້ໃຊ້ຫຼືລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ' });
            }

            const user = results[0];

            // ປຽບທຽບລະຫັດຜ່ານ
            bcrypt.compare(password, user.password, (err, match) => {
                if (err) {
                    console.error('ເກີດຂໍ້ຜິດພາດໃນການປຽບທຽບລະຫັດຜ່ານ:', err);
                    return res.status(500).json({ message: 'ເຊີບເວີມີຂໍ້ຜິດພາດ' });
                }

                // ຖ້າລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ
                if (!match) {
                    return res.status(401).json({ message: 'ຊື່ຜູ້ໃຊ້ຫຼືລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ' });
                }

                // ສ້າງ token
                const token = jwt.sign(
                    {
                        id: user.id,
                        username: user.username,
                        role: user.role,
                        employee_id: user.employee_id || null,
                        employee_name: user.employee_name || null
                    },
                    JWT_SECRET,
                    { expiresIn: '24h' }
                );

                // ສົ່ງຄຳຕອບພ້ອມ token ແລະ ຂໍ້ມູນຜູ້ໃຊ້
                res.json({
                    message: 'ເຂົ້າສູ່ລະບົບສຳເລັດ',
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        role: user.role,
                        employee_id: user.employee_id ? `EMP ${String(user.employee_id).padStart(3, '0')}` : null,
                        employee_name: user.employee_name || null
                    }
                });
            });
        }
    );
};

// ການລົງທະບຽນຜູ້ໃຊ້ໃໝ່
exports.register = (req, res) => {
    const {
        username,
        password,
        role = 'user',
        employeeName,
        employeeEmail,
        employeeTel,
        gender
    } = req.body;

    // ກວດສອບວ່າໄດ້ສົ່ງຂໍ້ມູນຄົບຖ້ວນຫຼືບໍ່
    if (!username || !password) {
        return res.status(400).json({ message: 'ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ ແລະ ລະຫັດຜ່ານ' });
    }

    db.beginTransaction(err => {
        if (err) {
            console.error('ເກີດຂໍ້ຜິດພາດໃນການເລີ່ມຕົ້ນ transaction:', err);
            return res.status(500).json({ message: 'ເຊີບເວີມີຂໍ້ຜິດພາດ' });
        }

        // ເຂົ້າລະຫັດລະຫັດຜ່ານ
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                db.rollback();
                console.error('ເກີດຂໍ້ຜິດພາດໃນການເຂົ້າລະຫັດລະຫັດຜ່ານ:', err);
                return res.status(500).json({ message: 'ເຊີບເວີມີຂໍ້ຜິດພາດ' });
            }

            // ບັນທຶກຜູ້ໃຊ້ໃໝ່ລົງໃນຖານຂໍ້ມູນ
            db.query(
                'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
                [username, hash, role],
                (err, results) => {
                    if (err) {
                        db.rollback();
                        // ກວດສອບກໍລະນີຊື່ຜູ້ໃຊ້ຊ້ຳກັນ
                        if (err.code === 'ER_DUP_ENTRY') {
                            return res.status(409).json({ message: 'ຊື່ຜູ້ໃຊ້ນີ້ມີຢູ່ແລ້ວ' });
                        }
                        console.error('ເກີດຂໍ້ຜິດພາດກັບຖານຂໍ້ມູນ:', err);
                        return res.status(500).json({ message: 'ເຊີບເວີມີຂໍ້ຜິດພາດ' });
                    }

                    const userId = results.insertId;

                    // ຖ້າມີຂໍ້ມູນພະນັກງານໃຫ້ບັນທຶກພ້ອມກັນ
                    if (employeeName) {
                        db.query(
                            'INSERT INTO employees (employee_name, employee_email, employee_Tel, gender, user_id) VALUES (?, ?, ?, ?, ?)',
                            [employeeName, employeeEmail || null, employeeTel || null, gender || null, userId],
                            (err, empResults) => {
                                if (err) {
                                    db.rollback();
                                    console.error('ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນພະນັກງານ:', err);
                                    return res.status(500).json({ message: 'ເຊີບເວີມີຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນພະນັກງານ' });
                                }

                                db.commit(err => {
                                    if (err) {
                                        db.rollback();
                                        console.error('ເກີດຂໍ້ຜິດພາດໃນການ commit transaction:', err);
                                        return res.status(500).json({ message: 'ເຊີບເວີມີຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ' });
                                    }

                                    res.status(201).json({
                                        message: 'ລົງທະບຽນຜູ້ໃຊ້ແລະຂໍ້ມູນພະນັກງານສຳເລັດແລ້ວ',
                                        userId: userId,
                                        employeeId: `EMP ${String(empResults.insertId).padStart(3, '0')}`
                                    });
                                });
                            }
                        );
                    } else {
                        db.commit(err => {
                            if (err) {
                                db.rollback();
                                console.error('ເກີດຂໍ້ຜິດພາດໃນການ commit transaction:', err);
                                return res.status(500).json({ message: 'ເຊີບເວີມີຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ' });
                            }

                            res.status(201).json({
                                message: 'ລົງທະບຽນຜູ້ໃຊ້ສຳເລັດແລ້ວ',
                                userId: userId
                            });
                        });
                    }
                }
            );
        });
    });
};

// ດຶງຂໍ້ມູນຜູ້ໃຊ້ປັດຈຸບັນ
exports.getUser = (req, res) => {
    // ດຶງຂໍ້ມູນເພີ່ມເຕີມຈາກຕາຕະລາງ employees ຖ້າມີການເຊື່ອມໂຍງ
    db.query(
        'SELECT u.*, e.employee_id, e.employee_name, e.employee_email, e.employee_Tel, e.gender FROM users u LEFT JOIN employees e ON u.id = e.user_id WHERE u.id = ?',
        [req.user.id],
        (err, results) => {
            if (err) {
                console.error('ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນຜູ້ໃຊ້:', err);
                return res.status(500).json({ message: 'ເຊີບເວີມີຂໍ້ຜິດພາດ' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'ບໍ່ພົບຂໍ້ມູນຜູ້ໃຊ້' });
            }

            // ສ້າງຂໍ້ມູນຜູ້ໃຊ້ໃໝ່ໂດຍບໍ່ລວມລະຫັດຜ່ານ (ຫຼີກລ່ຽງການໃຊ້ delete ເພື່ອປະສິດທິພາບທີ່ດີກວ່າ)
            const { password, ...userWithoutPassword } = results[0];

            // ຈັດຮູບແບບ employee_id ຖ້າມີ
            if (user.employee_id) {
                user.employee_id = `EMP ${String(user.employee_id).padStart(3, '0')}`;
            }

            res.json(userWithoutPassword);
        }
    );
};

// ອັບເດດຂໍ້ມູນຜູ້ໃຊ້
exports.updateUser = (req, res) => {
    const { username, password, role } = req.body;
    const userId = req.params.id;

    db.beginTransaction(err => {
        if (err) {
            console.error('ເກີດຂໍ້ຜິດພາດໃນການເລີ່ມຕົ້ນ transaction:', err);
            return res.status(500).json({ message: 'ເຊີບເວີມີຂໍ້ຜິດພາດ' });
        }

        // ສ້າງ array ສຳລັບເກັບຄໍລຳທີ່ຈະອັບເດດ
        const updateFields = [];
        const values = [];

        if (username) {
            updateFields.push('username = ?');
            values.push(username);
        }

        if (role) {
            updateFields.push('role = ?');
            values.push(role);
        }

        // ຖ້າມີການອັບເດດລະຫັດຜ່ານ
        if (password) {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    db.rollback();
                    console.error('ເກີດຂໍ້ຜິດພາດໃນການເຂົ້າລະຫັດລະຫັດຜ່ານ:', err);
                    return res.status(500).json({ message: 'ເຊີບເວີມີຂໍ້ຜິດພາດ' });
                }

                updateFields.push('password = ?');
                values.push(hash);
                executeUpdate();
            });
        } else {
            executeUpdate();
        }

        function executeUpdate() {
            if (updateFields.length === 0) {
                db.rollback();
                return res.status(400).json({ message: 'ບໍ່ມີຂໍ້ມູນທີ່ຈະອັບເດດ' });
            }

            values.push(userId);
            const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;

            db.query(query, values, (err, results) => {
                if (err) {
                    db.rollback();
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(409).json({ message: 'ຊື່ຜູ້ໃຊ້ນີ້ມີຢູ່ແລ້ວ' });
                    }
                    console.error('ເກີດຂໍ້ຜິດພາດໃນການອັບເດດຂໍ້ມູນຜູ້ໃຊ້:', err);
                    return res.status(500).json({ message: 'ເຊີບເວີມີຂໍ້ຜິດພາດ' });
                }

                if (results.affectedRows === 0) {
                    db.rollback();
                    return res.status(404).json({ message: 'ບໍ່ພົບຂໍ້ມູນຜູ້ໃຊ້' });
                }

                db.commit(err => {
                    if (err) {
                        db.rollback();
                        console.error('ເກີດຂໍ້ຜິດພາດໃນການ commit transaction:', err);
                        return res.status(500).json({ message: 'ເຊີບເວີມີຂໍ້ຜິດພາດໃນການບັນທຶກຂໍ້ມູນ' });
                    }

                    res.json({ message: 'ອັບເດດຂໍ້ມູນຜູ້ໃຊ້ສຳເລັດແລ້ວ' });
                });
            });
        }
    });
};

// ດຶງຂໍ້ມູນຜູ້ໃຊ້ທັງໝົດ
exports.getAllUsers = (req, res) => {
    db.query(
        'SELECT u.id, u.username, u.role, u.created_at, e.employee_id, e.employee_name FROM users u LEFT JOIN employees e ON u.id = e.user_id ORDER BY u.id DESC',
        (err, results) => {
            if (err) {
                console.error('ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນຜູ້ໃຊ້:', err);
                return res.status(500).json({ message: 'ເຊີບເວີມີຂໍ້ຜິດພາດ' });
            }

            // ຈັດຮູບແບບຂໍ້ມູນກ່ອນສົ່ງກັບ
            const formattedResults = results.map(user => ({
                id: user.id,
                username: user.username,
                role: user.role,
                created_at: user.created_at,
                employee_id: user.employee_id ? `EMP ${String(user.employee_id).padStart(3, '0')}` : null,
                employee_name: user.employee_name || null
            }));

            res.json(formattedResults);
        }
    );
};

// ສ້າງຜູ້ໃຊ້ admin ເລີ່ມຕົ້ນ (ໃຊ້ເວລາເປີດໃຊ້ງານຄັ້ງທຳອິດ)
exports.createDefaultAdmin = () => {
    db.query('SELECT * FROM users WHERE role = "admin" LIMIT 1', (err, results) => {
        if (err) {
            console.error('ເກີດຂໍ້ຜິດພາດໃນການກວດສອບຜູ້ໃຊ້ admin:', err);
        } else if (results.length === 0) {
            // ສ້າງຜູ້ໃຊ້ admin ເລີ່ມຕົ້ນ
            bcrypt.hash('admin123', 10, (err, hash) => {
                if (err) {
                    console.error('ເກີດຂໍ້ຜິດພາດໃນການເຂົ້າລະຫັດລະຫັດຜ່ານ:', err);
                } else {
                    db.query(
                        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
                        ['admin', hash, 'admin'],
                        (err) => {
                            if (err) {
                                console.error('ເກີດຂໍ້ຜິດພາດໃນການສ້າງຜູ້ໃຊ້ admin:', err);
                            } else {
                                console.log('ສ້າງຜູ້ໃຊ້ admin ເລີ່ມຕົ້ນສຳເລັດແລ້ວ');
                            }
                        }
                    );
                }
            });
        }
    });
};