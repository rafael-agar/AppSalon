CREATE SCHEMA `appsalon_mvc` DEFAULT CHARACTER SET utf8 ;

USE appsalon_mvc;

-- creando tabla usuarios
CREATE TABLE `usuarios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(60) NULL,
  `apellido` VARCHAR(60) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(255) NULL,
  `telefono` VARCHAR(11) NULL,
  `admin` TINYINT(1) NULL,
  `confirmado` TINYINT(1) NULL,
  `token` VARCHAR(15) NULL,
  PRIMARY KEY (`id`)
);

-- creando tabla servicios
CREATE TABLE `appsalon_mvc`.`servicios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(60) NULL,
  `precio` DECIMAL(5,2) NULL,
  PRIMARY KEY (`id`)
);

-- Insertar datos en la tabla de servicios
INSERT INTO servicios (nombre, precio) VALUES
('Corte de cabello', 25.00),
('Coloración', 50.00),
('Mechas', 60.00),
('Tratamiento capilar', 40.00),
('Manicura', 20.00),
('Pedicura', 30.00),
('Depilación con cera', 35.00),
('Masaje facial', 45.00),
('Maquillaje profesional', 70.00),
('Peinado de fiesta', 80.00);

-- Verificar que los datos se han insertado correctamente
SELECT * FROM servicios;

-- Crear la tabla de citas con la clave foránea usuarioId
CREATE TABLE `citas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `fecha` DATE NULL,
  `hora` TIME NULL,
  `usuarioId` INT(11) NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE SET NULL
);


-- tabla pivote
CREATE TABLE `appsalon_mvc`.`citaServicios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `citaId` INT(11) NULL,
  `servicioId` INT(11) NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`citaId`) REFERENCES `citas`(`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  FOREIGN KEY (`servicioId`) REFERENCES `servicios`(`id`) ON DELETE SET NULL ON UPDATE SET NULL
);



