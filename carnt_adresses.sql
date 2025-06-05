-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: carnet_adresses
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ajoutee`
--

DROP TABLE IF EXISTS `ajoutee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ajoutee` (
  `idUtilisateur` int NOT NULL,
  `idContact` int NOT NULL,
  PRIMARY KEY (`idUtilisateur`,`idContact`),
  KEY `idContact` (`idContact`),
  CONSTRAINT `ajoutee_ibfk_1` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateur` (`idUtilisateur`) ON DELETE CASCADE,
  CONSTRAINT `ajoutee_ibfk_2` FOREIGN KEY (`idContact`) REFERENCES `contact` (`idContact`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ajoutee`
--

LOCK TABLES `ajoutee` WRITE;
/*!40000 ALTER TABLE `ajoutee` DISABLE KEYS */;
INSERT INTO `ajoutee` VALUES (1,17),(1,18),(1,19),(1,20),(1,21),(1,22),(1,23),(1,24),(1,25),(1,26),(1,27),(1,28),(1,29),(1,30),(1,31),(1,32),(1,33),(1,34),(1,35),(1,36),(1,37),(1,38),(1,39),(1,40),(1,41),(1,42),(1,43),(1,44),(1,45);
/*!40000 ALTER TABLE `ajoutee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `idContact` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `prenom` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `telephone` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`idContact`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (1,'Test','Tilaoui','atest@gmail.com','0643577535'),(17,'Anderson','Alice','alice.anderson@example.com','0600000017'),(18,'Adams','Aaron','aaron.adams@example.com','0600000018'),(19,'Arnold','Amanda','amanda.arnold@example.com','0600000019'),(20,'Allan','Andrew','andrew.allan@example.com','0600000020'),(21,'Brown','Benjamin','benjamin.brown@example.com','0600000021'),(22,'Baker','Bella','bella.baker@example.com','0600000022'),(23,'Brooks','Brandon','brandon.brooks@example.com','0600000023'),(24,'Bennett','Beatrice','beatrice.bennett@example.com','0600000024'),(25,'Carter','Celine','celine.carter@example.com','0600000025'),(26,'Clark','Charles','charles.clark@example.com','0600000026'),(27,'Collins','Chloe','chloe.collins@example.com','0600000027'),(28,'Cooper','Caleb','caleb.cooper@example.com','0600000028'),(29,'Davis','Diana','diana.davis@example.com','0600000029'),(30,'Diaz','Daniel','daniel.diaz@example.com','0600000030'),(31,'Duncan','Daphne','daphne.duncan@example.com','0600000031'),(32,'Dalton','Derek','derek.dalton@example.com','0600000032'),(33,'Evans','Eva','eva.evans@example.com','0600000033'),(34,'Ellis','Ethan','ethan.ellis@example.com','0600000034'),(35,'Edwards','Elena','elena.edwards@example.com','0600000035'),(36,'Emerson','Eric','eric.emerson@example.com','0600000036'),(37,'Fisher','Fiona','fiona.fisher@example.com','0600000037'),(38,'Foster','Frank','frank.foster@example.com','0600000038'),(39,'Ford','Faith','faith.ford@example.com','0600000039'),(40,'Fields','Felix','felix.fields@example.com','0600000040'),(41,'Green','Grace','grace.green@example.com','0600000041'),(42,'Gomez','Gavin','gavin.gomez@example.com','0600000042'),(43,'Griffin','Georgia','georgia.griffin@example.com','0600000043'),(44,'Grant','George','george.grant@example.com','0600000044'),(45,'saad','saad','saad@gmail.com','6548944634');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur` (
  `idUtilisateur` int NOT NULL AUTO_INCREMENT,
  `nomUtilisateur` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `motDePasse` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`idUtilisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` VALUES (1,'test','test@gmail.com','$2b$10$gD19yDTZA7kPrxCHoy.XVu9Q7AXHOVNUch1aWmSnEZeYWWPSASMjW');
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-25 18:37:43
