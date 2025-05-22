
// backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('node:path');
const db = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const employeeRoutes = require('./routes/employee.routes');
const supplierRoutes = require('./routes/supplier.routes');
const productRoutes = require('./routes/product.routes');
const brandRoutes = require('./routes/brand.routes');
const categoryRoutes = require('./routes/category.routes');
const authController = require('./controllers/auth.controller');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // ຫຼື URL ຂອງ frontend ຂອງທ່ານ
    credentials: true
}));
app.use(express.json());

// ສ້າງຜູ້ໃຊ້ admin ເລີ່ມຕົ້ນ
authController.createDefaultAdmin();

// ເຊີບສິນຄ້າສະຖິກຟາຍລ໌ - ສຳຄັນສຳລັບການສະແດງຮູບພາບ
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ກວດສອບວ່າໂຟລເດີ uploads ແລະ uploads/products ມີຢູ່ແລ້ວຫຼືຍັງ
const fs = require('node:fs');
const uploadDir = path.join(__dirname, 'uploads');
const productsUploadDir = path.join(__dirname, 'uploads/products');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });

}

if (!fs.existsSync(productsUploadDir)) {
    fs.mkdirSync(productsUploadDir, { recursive: true });
}

// Routes
app.use('/api', authRoutes);
app.use('/api', employeeRoutes);
app.use('/api', supplierRoutes);
app.use('/api', brandRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

// Route ເລີ່ມຕົ້ນເພື່ອທົດສອບວ່າເຊີບເວີເຮັດວຽກຢູ່
app.get('/', (req, res) => {
    res.json({ message: 'API ເຮັດວຽກຢູ່!' });
});

// ຈັດການກໍລະນີທີ່ບໍ່ພົບເສັ້ນທາງ
app.use((req, res) => {
    res.status(404).json({ message: 'ບໍ່ພົບເສັ້ນທາງທີ່ຮ້ອງຂໍ' });
});

// ຈັດການຂໍ້ຜິດພາດ
app.use((err, req, res, next) => {
    res.status(500).json({ message: 'ເກີດຂໍ້ຜິດພາດໃນເຊີບເວີ', error: err.message });
});

// ເລີ່ມຕົ້ນເຊີບເວີ
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});