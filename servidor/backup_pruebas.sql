/*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.6.18-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: lopez_repuestos
-- ------------------------------------------------------
-- Server version	10.6.18-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `lopez_repuestos`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `lopez_repuestos` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci */;

USE `lopez_repuestos`;

--
-- Table structure for table `Camiones`
--

DROP TABLE IF EXISTS `Camiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Camiones` (
  `Modelo` varchar(20) NOT NULL,
  `Potencia` int(11) NOT NULL,
  `Kilometraje` varchar(8) NOT NULL,
  `Vehiculos_Patente` varchar(7) NOT NULL,
  PRIMARY KEY (`Vehiculos_Patente`),
  KEY `fk_Camiones_Vehiculos1_idx` (`Vehiculos_Patente`),
  CONSTRAINT `fk_Camiones_Vehiculos1` FOREIGN KEY (`Vehiculos_Patente`) REFERENCES `Vehiculos` (`Patente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Camiones`
--

LOCK TABLES `Camiones` WRITE;
/*!40000 ALTER TABLE `Camiones` DISABLE KEYS */;
INSERT INTO `Camiones` VALUES ('G360',360,'223453','AC365RP'),('R400',400,'165342','AC960OX'),('R410',420,'123000','AE197DJ'),('R450',450,'63213','AF314JW');
/*!40000 ALTER TABLE `Camiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Choferes`
--

DROP TABLE IF EXISTS `Choferes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Choferes` (
  `Fecha_Psicotecnico` date NOT NULL,
  `Empleados_DNI` varchar(9) NOT NULL,
  PRIMARY KEY (`Empleados_DNI`),
  KEY `fk_Choferes_Empleados1_idx` (`Empleados_DNI`),
  CONSTRAINT `fk_Choferes_Empleados1` FOREIGN KEY (`Empleados_DNI`) REFERENCES `Empleados` (`DNI`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Choferes`
--

LOCK TABLES `Choferes` WRITE;
/*!40000 ALTER TABLE `Choferes` DISABLE KEYS */;
INSERT INTO `Choferes` VALUES ('2025-02-25','23945865'),('2024-12-06','24345967'),('2025-06-04','25965456'),('2025-01-23','30546978');
/*!40000 ALTER TABLE `Choferes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Empleados`
--

DROP TABLE IF EXISTS `Empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Empleados` (
  `DNI` varchar(9) NOT NULL,
  `CUIL` varchar(12) NOT NULL,
  `Nombre` varchar(20) NOT NULL,
  `Apellido` varchar(20) NOT NULL,
  `Domicilio` varchar(45) NOT NULL,
  `Fecha_Nacimiento` date NOT NULL,
  `Telefono` varchar(16) NOT NULL,
  `Es_Mec_Chof` enum('Mecanico','Chofer') NOT NULL,
  `EsActivo` tinyint(1) NOT NULL,
  PRIMARY KEY (`DNI`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Empleados`
--

LOCK TABLES `Empleados` WRITE;
/*!40000 ALTER TABLE `Empleados` DISABLE KEYS */;
INSERT INTO `Empleados` VALUES ('123','456','Roberto','Despedido','Paso 590 Once, CABA','2002-02-20','351999999','Mecanico',0),('23945865','12239458654','Carlos','Gualpa','Belgrano 1723, San Luis, San luis','1975-07-30','2664345678','Chofer',1),('24345967','12243459670','Ramon','Tobares','Av.Lafinur, San Luis, San luis','1976-11-20','2664236812','Chofer',1),('25965456','17259654564','Sergio','Lopez','Pedernera 123, San Luis, San luis','1979-02-12','2664896574','Chofer',1),('30546978','31305469788','Gerardo','Leyes','Moreno 903, La Punta, San luis','1982-04-01','2664540679','Chofer',1),('44643551','21446435516','Ezequiel','Nodar','Av.Belgrano, La Toma, San luis','2003-01-24','2664865158','Mecanico',1),('45382516','23453825161','Ezequiel','Bernaldez','3era rotonda, San luis, San Luis','2004-01-20','2664423254','Mecanico',1),('5978434','1259784342','Gerardo','Ragazzi','Av.Peron San luis, San Luis','1950-09-10','2664457890','Mecanico',1);
/*!40000 ALTER TABLE `Empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mantenimientos`
--

DROP TABLE IF EXISTS `Mantenimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Mantenimientos` (
  `idMantenimientos` int(11) NOT NULL AUTO_INCREMENT,
  `Trabajo_realizados` varchar(45) NOT NULL,
  `Fecha` date NOT NULL,
  `Costos_repuestos` float NOT NULL,
  `Costos_mano_de_obra` float NOT NULL,
  `Kilometros_en_que_se_realizo` int(11) NOT NULL,
  `Vehiculos_Patente` varchar(7) NOT NULL,
  PRIMARY KEY (`idMantenimientos`),
  KEY `fk_Mantenimientos_Vehiculos1_idx` (`Vehiculos_Patente`),
  CONSTRAINT `fk_Mantenimientos_Vehiculos1` FOREIGN KEY (`Vehiculos_Patente`) REFERENCES `Vehiculos` (`Patente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mantenimientos`
--

LOCK TABLES `Mantenimientos` WRITE;
/*!40000 ALTER TABLE `Mantenimientos` DISABLE KEYS */;
INSERT INTO `Mantenimientos` VALUES (1,'Cambio de gomas','2024-08-29',200000,30000,101453,'AE197DJ'),(2,'Cambio de filtros','2024-09-01',342534,24500,120000,'AE197DJ'),(3,'Rotar gomas','2024-09-23',0,29000,60000,'AF314JW'),(4,'Colocar vigia','2024-09-30',450000,500000,61000,'AF314JW'),(5,'Colocar parabrisas','2024-09-23',430000,120000,210000,'AC365RP'),(6,'Cambio de filtros','2024-09-30',140000,50000,220000,'AC365RP'),(7,'Quitar abolladura','2024-10-02',30000,167000,160000,'AC960OX'),(8,'Cambiar espejo del acompañante','2024-10-01',230000,25000,62000,'AC960OX'),(9,'Cambio de gomas','2024-09-30',340000,55000,0,'AD483PP'),(10,'Cambio de fuelle de suspension','2024-08-20',400000,87000,0,'JGP394'),(11,'Cambio de la baranda','2024-10-01',50000,67000,0,'PHP374'),(12,'Cambio de compresor','2024-09-04',1250000,140000,0,'AC463FR');
/*!40000 ALTER TABLE `Mantenimientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mantenimientos_has_Mecanicos`
--

DROP TABLE IF EXISTS `Mantenimientos_has_Mecanicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Mantenimientos_has_Mecanicos` (
  `Mantenimientos_idMantenimientos` int(11) NOT NULL,
  `Mecanicos_Empleados_DNI` varchar(9) NOT NULL,
  PRIMARY KEY (`Mantenimientos_idMantenimientos`,`Mecanicos_Empleados_DNI`),
  KEY `fk_Mantenimientos_has_Mecanicos_Mecanicos1_idx` (`Mecanicos_Empleados_DNI`),
  KEY `fk_Mantenimientos_has_Mecanicos_Mantenimientos1_idx` (`Mantenimientos_idMantenimientos`),
  CONSTRAINT `fk_Mantenimientos_has_Mecanicos_Mantenimientos1` FOREIGN KEY (`Mantenimientos_idMantenimientos`) REFERENCES `Mantenimientos` (`idMantenimientos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Mantenimientos_has_Mecanicos_Mecanicos1` FOREIGN KEY (`Mecanicos_Empleados_DNI`) REFERENCES `Mecanicos` (`Empleados_DNI`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mantenimientos_has_Mecanicos`
--

LOCK TABLES `Mantenimientos_has_Mecanicos` WRITE;
/*!40000 ALTER TABLE `Mantenimientos_has_Mecanicos` DISABLE KEYS */;
INSERT INTO `Mantenimientos_has_Mecanicos` VALUES (1,'44643551'),(1,'45382516'),(2,'44643551'),(3,'5978434'),(4,'45382516'),(5,'44643551'),(5,'45382516'),(6,'45382516'),(7,'44643551'),(8,'5978434'),(9,'45382516'),(10,'44643551'),(11,'45382516'),(11,'5978434'),(12,'44643551'),(12,'45382516'),(12,'5978434');
/*!40000 ALTER TABLE `Mantenimientos_has_Mecanicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mecanicos`
--

DROP TABLE IF EXISTS `Mecanicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Mecanicos` (
  `Empleados_DNI` varchar(9) NOT NULL,
  PRIMARY KEY (`Empleados_DNI`),
  KEY `fk_Mecanicos_Empleados1_idx` (`Empleados_DNI`),
  CONSTRAINT `fk_Mecanicos_Empleados1` FOREIGN KEY (`Empleados_DNI`) REFERENCES `Empleados` (`DNI`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mecanicos`
--

LOCK TABLES `Mecanicos` WRITE;
/*!40000 ALTER TABLE `Mecanicos` DISABLE KEYS */;
INSERT INTO `Mecanicos` VALUES ('44643551'),('45382516'),('5978434');
/*!40000 ALTER TABLE `Mecanicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Seguros`
--

DROP TABLE IF EXISTS `Seguros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Seguros` (
  `idSeguros` int(11) NOT NULL AUTO_INCREMENT,
  `Fecha_Emision` date NOT NULL,
  `Fecha_Vencimiento` date NOT NULL,
  `Pago` float NOT NULL,
  `Nombre_aseguradora` varchar(45) NOT NULL,
  `Tipo` varchar(20) NOT NULL,
  `Vehiculo` varchar(7) NOT NULL,
  PRIMARY KEY (`idSeguros`),
  KEY `fk_Seguros_vehiculos` (`Vehiculo`),
  CONSTRAINT `fk_Seguros_vehiculos` FOREIGN KEY (`Vehiculo`) REFERENCES `Vehiculos` (`Patente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Seguros`
--

LOCK TABLES `Seguros` WRITE;
/*!40000 ALTER TABLE `Seguros` DISABLE KEYS */;
INSERT INTO `Seguros` VALUES (1,'2024-09-23','2024-12-23',70233,'La Perseverancia','A','AE197DJ'),(2,'2024-08-21','2024-11-21',66043,'La Perseverancia','A','PHP374'),(3,'2024-10-12','2025-01-12',68432,'La Perseverancia','A','AE197DJ'),(4,'2024-09-01','2024-12-01',67043,'La Perseverancia','A','PHP374'),(5,'2024-08-01','2024-11-01',34123,'La Perseverancia','A','AE197DJ'),(6,'2024-10-01','2025-01-01',34123,'La Perseverancia','A','PHP374'),(7,'2024-10-04','2025-01-04',40213,'La Perseverancia','A','AE197DJ'),(8,'2024-09-24','2024-12-24',29435,'La Perseverancia','A','PHP374'),(9,'2024-08-22','2024-11-22',34523,'La Perseverancia','A','AE197DJ');
/*!40000 ALTER TABLE `Seguros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Semirremolques`
--

DROP TABLE IF EXISTS `Semirremolques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Semirremolques` (
  `Tipo` varchar(20) NOT NULL,
  `Carga` varchar(20) NOT NULL,
  `Vehiculos_Patente` varchar(7) NOT NULL,
  PRIMARY KEY (`Vehiculos_Patente`),
  KEY `fk_Semirremolques_Vehiculos1_idx` (`Vehiculos_Patente`),
  CONSTRAINT `fk_Semirremolques_Vehiculos1` FOREIGN KEY (`Vehiculos_Patente`) REFERENCES `Vehiculos` (`Patente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Semirremolques`
--

LOCK TABLES `Semirremolques` WRITE;
/*!40000 ALTER TABLE `Semirremolques` DISABLE KEYS */;
INSERT INTO `Semirremolques` VALUES ('Bilateral','Cemento en bolsa','AC463FR'),('Tolva','Cemento','AD483PP'),('Tolva','Cal','AG348FG'),('Tolva','Cemento','JGP394'),('Tolva','Cal','PHP374');
/*!40000 ALTER TABLE `Semirremolques` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tarjetas_Ruta`
--

DROP TABLE IF EXISTS `Tarjetas_Ruta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tarjetas_Ruta` (
  `idTarjetas_Ruta` int(11) NOT NULL AUTO_INCREMENT,
  `Fecha_Emision` date NOT NULL,
  `Fecha_Vencimiento` date NOT NULL,
  PRIMARY KEY (`idTarjetas_Ruta`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tarjetas_Ruta`
--

LOCK TABLES `Tarjetas_Ruta` WRITE;
/*!40000 ALTER TABLE `Tarjetas_Ruta` DISABLE KEYS */;
INSERT INTO `Tarjetas_Ruta` VALUES (1,'2024-04-27','2025-04-27'),(2,'2023-12-05','2024-12-05'),(3,'2024-01-24','2025-01-24'),(4,'2023-11-30','2024-11-30'),(5,'2024-08-11','2025-08-11'),(6,'2024-09-11','2025-09-11'),(7,'2024-01-20','2025-01-20'),(8,'2023-12-30','2024-12-30'),(9,'2024-10-09','2025-10-09');
/*!40000 ALTER TABLE `Tarjetas_Ruta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tecnicas`
--

DROP TABLE IF EXISTS `Tecnicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tecnicas` (
  `idTecnicas` int(11) NOT NULL AUTO_INCREMENT,
  `Fecha_Emision` date NOT NULL,
  `Fecha_Vencimiento` date NOT NULL,
  `Ubicacion` varchar(45) NOT NULL,
  `Vehiculo` varchar(7) NOT NULL,
  PRIMARY KEY (`idTecnicas`),
  KEY `fk_Tenicas_vehiculos` (`Vehiculo`),
  CONSTRAINT `fk_Tenicas_vehiculos` FOREIGN KEY (`Vehiculo`) REFERENCES `Vehiculos` (`Patente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tecnicas`
--

LOCK TABLES `Tecnicas` WRITE;
/*!40000 ALTER TABLE `Tecnicas` DISABLE KEYS */;
INSERT INTO `Tecnicas` VALUES (1,'2024-05-11','2025-05-11','Mendoza','AE197DJ'),(2,'2024-06-05','2025-06-05','San Luis','AG348FG'),(3,'2023-12-24','2024-12-24','Mendoza','AE197DJ'),(4,'2024-07-30','2025-07-30','Villa Mercedes','AG348FG'),(5,'2024-08-11','2025-08-11','Rio Cuarto','JGP394'),(6,'2024-01-11','2025-01-11','Rio Cuarto','AE197DJ'),(7,'2024-02-20','2025-02-20','Mendoza','AG348FG'),(8,'2024-09-11','2025-09-11','San Luis','AE197DJ'),(9,'2023-11-27','2024-11-27','San Luis','JGP394');
/*!40000 ALTER TABLE `Tecnicas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vehiculos`
--

DROP TABLE IF EXISTS `Vehiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Vehiculos` (
  `Marca` varchar(20) NOT NULL,
  `Patente` varchar(7) NOT NULL,
  `Es_Cam_Semi` enum('Camion','Semirremolque') NOT NULL,
  `Tarjetas_Ruta_idTarjetas_Ruta` int(11) NOT NULL,
  PRIMARY KEY (`Patente`),
  UNIQUE KEY `Patente_UNIQUE` (`Patente`),
  KEY `fk_Vehiculos_Tarjetas_Ruta1_idx` (`Tarjetas_Ruta_idTarjetas_Ruta`),
  CONSTRAINT `fk_Vehiculos_Tarjetas_Ruta1` FOREIGN KEY (`Tarjetas_Ruta_idTarjetas_Ruta`) REFERENCES `Tarjetas_Ruta` (`idTarjetas_Ruta`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vehiculos`
--

LOCK TABLES `Vehiculos` WRITE;
/*!40000 ALTER TABLE `Vehiculos` DISABLE KEYS */;
INSERT INTO `Vehiculos` VALUES ('Scania','AC365RP','Camion',3),('Randon','AC463FR','Semirremolque',9),('Scania','AC960OX','Camion',4),('Furtan','AD483PP','Semirremolque',5),('Scania','AE197DJ','Camion',1),('Scania','AF314JW','Camion',2),('Furtan','AG348FG','Semirremolque',6),('Randon','JGP394','Semirremolque',7),('Randon','PHP374','Semirremolque',8);
/*!40000 ALTER TABLE `Vehiculos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Viajes`
--

DROP TABLE IF EXISTS `Viajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Viajes` (
  `idViajes` int(11) NOT NULL AUTO_INCREMENT,
  `Fecha_partida` date NOT NULL,
  `Fecha_llegada` date NOT NULL,
  `Fecha_esperada` date NOT NULL,
  `Kilometros_realizados` varchar(8) NOT NULL,
  `Costos_combustibles` float NOT NULL,
  `Destino` varchar(45) NOT NULL,
  `Peso` int(11) NOT NULL,
  `Camiones_Vehiculos_Patente` varchar(7) NOT NULL,
  `Semirremolques_Vehiculos_Patente` varchar(7) NOT NULL,
  `Choferes_Empleados_DNI` varchar(9) NOT NULL,
  PRIMARY KEY (`idViajes`),
  KEY `fk_Viajes_Camiones1_idx` (`Camiones_Vehiculos_Patente`),
  KEY `fk_Viajes_Semirremolques1_idx` (`Semirremolques_Vehiculos_Patente`),
  KEY `fk_Viajes_Choferes1_idx` (`Choferes_Empleados_DNI`),
  CONSTRAINT `fk_Viajes_Camiones1` FOREIGN KEY (`Camiones_Vehiculos_Patente`) REFERENCES `Camiones` (`Vehiculos_Patente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Viajes_Choferes1` FOREIGN KEY (`Choferes_Empleados_DNI`) REFERENCES `Choferes` (`Empleados_DNI`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Viajes_Semirremolques1` FOREIGN KEY (`Semirremolques_Vehiculos_Patente`) REFERENCES `Semirremolques` (`Vehiculos_Patente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Viajes`
--

LOCK TABLES `Viajes` WRITE;
/*!40000 ALTER TABLE `Viajes` DISABLE KEYS */;
INSERT INTO `Viajes` VALUES (1,'2024-08-04','2024-08-09','2024-08-10','400',120000,'Cordoba',27000,'AE197DJ','AD483PP','30546978'),(2,'2024-09-18','2024-09-19','2024-09-20','300',60000,'Mendoza',24000,'AE197DJ','AD483PP','30546978'),(3,'2024-09-17','2024-09-20','2024-09-23','1100',250000,'Buenos Aires',32000,'AF314JW','AG348FG','24345967'),(4,'2024-09-01','2024-09-02','2024-09-04','540',196000,'San Juan',26000,'AF314JW','AG348FG','24345967'),(5,'2024-09-10','2024-09-11','2024-09-11','743',200000,'Entre Rios',30000,'AC365RP','JGP394','25965456'),(6,'2024-09-25','2024-09-29','2024-09-30','510',191000,'La Rioja',32000,'AC365RP','JGP394','25965456'),(7,'2024-10-01','2024-10-02','2024-10-02','143',120000,'Villa Mercedes',25000,'AC960OX','PHP374','23945865'),(8,'2024-10-02','2024-10-07','2024-10-08','1200',430000,'Buenos Aires',35000,'AC960OX','PHP374','23945865');
/*!40000 ALTER TABLE `Viajes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-13 18:35:01
