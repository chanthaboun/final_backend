
// backend/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

// ຄ່າລັບສຳລັບ JWT (ຄວນໃຊ້ຄ່າດຽວກັນກັບໃນ auth.controller.js) 
const JWT_SECRET = 'warehouse_byd_2025';

// Middleware ສຳລັບກວດສອບ token
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; // ແຍກເອົາ token ຈາກ "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: 'ຕ້ອງການ token ການພິສູດຕົວຕົນ' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token ບໍ່ຖືກຕ້ອງ ຫຼື ໝົດອາຍຸແລ້ວ' });
        }

        req.user = decoded;
        next();
    });
};

// Middleware ສຳລັບກວດສອບບົດບາດຂອງຜູ້ໃຊ້ວ່າແມ່ນ admin ຫຼືບໍ່
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'ຕ້ອງການສິດທິຂອງຜູ້ດູແລລະບົບ' });
    }
};

// Middleware ສຳລັບກວດສອບວ່າຜູ້ໃຊ້ເປັນເຈົ້າຂອງຂໍ້ມູນຫຼືບໍ່
const isOwner = (req, res, next) => {
    if (req.user && (req.user.id === Number.parseInt(req.params.userId) || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ message: 'ທ່ານບໍ່ມີສິດໃນການເຂົ້າເຖິງຂໍ້ມູນນີ້' });
    }
};

module.exports = {
    authMiddleware,
    authenticateToken: authMiddleware, // ລວມເອົາຊື່ທັງສອງເຂົ້າມີຄວາມໝາຍອັນດຽວກັນ
    isAdmin,
    isOwner
};



