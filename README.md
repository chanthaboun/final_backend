



-- ສ້າງຕາຕະລາງພະນັກງານ
CREATE TABLE IF NOT EXISTS `employees` (
  `employee_id` int(2) NOT NULL AUTO_INCREMENT,
  `employee_name` varchar(30) NOT NULL,
  `employee_email` varchar(30) DEFAULT NULL,
  `employee_Tel` varchar(15) DEFAULT NULL,
  `employee_address` varchar(55) DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ເພີ່ມຂໍ້ມູນພະນັກງານຕົວຢ່າງ
INSERT INTO `employees` (`employee_name`, `employee_email`, `employee_Tel`, `employee_address`, `gender`) VALUES
('ທ. ສົມພອນ', 'somphon@example.com', '020xxxxxxxx', 'ນະຄອນຫຼວງວຽງຈັນ', 'ຊາຍ'),
('ນ. ສີວິໄລ', 'sivilai@example.com', '030xxxxxxxx', 'ສະຫວັນນະເຂດ', 'ຍິງ'),
('ທ. ບຸນມີ', 'bounmy@example.com', '020xxxxxxxx', 'ຫຼວງພະບາງ', 'ຊາຍ'),
('ນ. ມະນີຈັນ', 'manychan@example.com', '030xxxxxxxx', 'ຈຳປາສັກ', 'ຍິງ'),
('ທ. ສົມສະຫວັນ', 'somsavanh@example.com', '020xxxxxxxx', 'ນະຄອນຫຼວງວຽງຈັນ', 'ຊາຍ'),
('ນ. ດາວໄລ', 'daolai@example.com', '030xxxxxxxx', 'ສະຫວັນນະເຂດ', 'ຍິງ'),
('ທ. ທອງພັນ', 'thongphanh@example.com', '020xxxxxxxx', 'ຫຼວງພະບາງ', 'ຊາຍ'),
('ນ. ນຸ້ຍ', 'noy@example.com', '030xxxxxxxx', 'ຈຳປາສັກ', 'ຍິງ'),
('ທ. ກໍຣະວີ', 'koravee@example.com', '020xxxxxxxx', 'ນະຄອນຫຼວງວຽງຈັນ', 'ຊາຍ'),
('ນ. ນາງ', 'nang@example.com', '030xxxxxxxx', 'ສະຫວັນນະເຂດ', 'ຍິງ');






===== ໜ້າຈັດການພະນັກງານ=====

1.ພະນັກງານຕ້ອງສະໝັກກ່ອນ Register (ສຳລັບ Admin ແລະ User)
2.ເຮົາຈະແບ່ງໜ້າ Login ສຳລັບ Admin(ຜູ້ຈັດການສາງ,ຜູ້ບໍລີຫານ) ແລະ User(ພະນັກງານຊ່າງສ້ອມແປງ) ເຮົາຈະກຳນົດສິດທິໃນການ Login ເຂົ້າແບບໃດດີ?





-- ສ້າງຕາຕະລາງປະເພດສິນຄ້າ (Category)
CREATE TABLE category (
    category_id INT(15) PRIMARY KEY AUTO_INCREMENT COMMENT 'ລະຫັດປະເພດ',
    categoryName VARCHAR(25) NOT NULL COMMENT 'ຊື່ປະເພດສິນຄ້າ',
    categoryStatus INT(15) DEFAULT 1 COMMENT 'ສະຖານະ'
);

-- ສ້າງຕາຕະລາງຍີ່ຫໍ້ສິນຄ້າ (Brand)
CREATE TABLE brand (
    brand_id INT(15) PRIMARY KEY AUTO_INCREMENT COMMENT 'ລະຫັດຍີ່ຫໍ້',
    brandName VARCHAR(25) NOT NULL COMMENT 'ຊື່ຍີ່ຫໍ້ສິນຄ້າ',
    brandStatus INT(15) DEFAULT 1 COMMENT 'ສະຖານະ'
);

-- ສ້າງຕາຕະລາງສິນຄ້າ (Product) ພ້ອມສາຍສຳພັນເຊື່ອມໂຍງກັບຕາຕະລາງ Category ແລະ Brand
CREATE TABLE product (
    product_id INT(5) PRIMARY KEY AUTO_INCREMENT COMMENT 'ລະຫັດສິນຄ້າ',
    productName VARCHAR(15) NOT NULL COMMENT 'ຊື່ສິນຄ້າ',
    quantity INT(5) DEFAULT 0 COMMENT 'ຈຳນວນ',
    status VARCHAR(5) DEFAULT 'active' COMMENT 'ສະຖານະ',
    brand_id INT(2) COMMENT 'ລະຫັດຍີ່ຫໍ້ສິນຄ້າ',
    category_id INT(2) COMMENT 'ລະຫັດປະເພດສິນຄ້າ',
    
    -- ສ້າງສາຍສຳພັນກັບຕາຕະລາງ Brand
    CONSTRAINT fk_product_brand
    FOREIGN KEY (brand_id) REFERENCES brand(brand_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
    
    -- ສ້າງສາຍສຳພັນກັບຕາຕະລາງ Category
    CONSTRAINT fk_product_category
    FOREIGN KEY (category_id) REFERENCES category(category_id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- ສ້າງດັດຊະນີເພື່ອເພີ່ມປະສິດທິພາບໃນການຄົ້ນຫາ
CREATE INDEX idx_product_brand ON product(brand_id);
CREATE INDEX idx_product_category ON product(category_id);



"low-stock" (ເຫຼືອໜ້ອຍ) - ສິນຄ້າທີ່ມີຈຳນວນຕໍ່າກວ່າເກນທີ່ກຳນົດ
"inactive" (ບໍ່ໃຊ້ງານ) - ສິນຄ້າທີ່ບໍ່ໄດ້ໃຊ້ໃນການເບີກຈ່າຍອີກຕໍ່ໄປ
"expired" (ໝົດອາຍຸ) - ສິນຄ້າທີ່ໝົດອາຍຸແລ້ວ (ສຳລັບສິນຄ້າທີ່ມີວັນໝົດອາຍຸ)
"damaged" (ເສຍຫາຍ) - ສິນຄ້າທີ່ເສຍຫາຍບໍ່ສາມາດນຳໃຊ້ໄດ້ ຂ້ອຍຕ້ອງການກຳນົດພວກນີ້




-- ເພີ່ມຂໍ້ມູນປະເພດສິນຄ້າ (Category)
INSERT INTO category (categoryName, categoryStatus) VALUES
('ອຸປະກອນຄອມພິວເຕີ້', 1),
('ອຸປະກອນເຄື່ອງຂຽນ', 1),
('ເຄື່ອງໃຊ້ຫ້ອງການ', 1),
('ອຸປະກອນໄຟຟ້າ', 1),
('ວັດສະດຸສິ້ນເປືອງ', 1),
('ອາໄຫຼ່ອຸປະກອນ', 1),
('ອຸປະກອນຮັກສາຄວາມປອດໄພ', 1),
('ເຄື່ອງມືຊ່າງ', 1),
('ອຸປະກອນອະນາໄມ', 1),
('ອື່ນໆ', 1);

-- ເພີ່ມຂໍ້ມູນຍີ່ຫໍ້ສິນຄ້າ (Brand)
INSERT INTO brand (brandName, brandStatus) VALUES
('HP', 1),
('Dell', 1),
('Lenovo', 1),
('Canon', 1),
('Brother', 1),
('Epson', 1),
('Panasonic', 1),
('Samsung', 1),
('3M', 1),
('Double A', 1),
('Scotch', 1),
('Philips', 1),
('Schneider', 1),
('Stanley', 1),
('Uni', 1);