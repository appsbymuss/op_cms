-- AlterTable
ALTER TABLE `pageimage` MODIFY `image_path` VARCHAR(120) NULL;

-- Insert Data
INSERT INTO `admin` VALUES (1,'admin','admin');
INSERT INTO `websiteparams` VALUES (1,'istockphoto-522143732-612x612.jpg','MyBaaaaa22','0144241010','e@gmail.com',NULL,NULL);
INSERT INTO `page` VALUES (1,'accueil','2023-03-30','accueil'),(6,'nador-am','2023-04-12','page_location'),(7,'aaazea','2023-04-12','page_location'),(8,'yes-ah','2023-04-12','page_location'),(10,'abd-qadr-location','2023-04-12','page_location');
INSERT INTO `location` VALUES (7,'testtest',8,'hey eyeyey eye ye'),(9,'Abd Al Qadr',10,'358 Exchange Place Kazakhestan, N.Y. 10099 fax 212 555 6390 telex 10 4534');
INSERT INTO `pagecomponent` VALUES (2,1,'Our_services','Lorem....','about-us'),(4,1,'Our_services','Lorem....','our-service'),(6,1,'Your_fees','Lorem...','b'),(10,6,'teeeeest','qs qsdqsqsqsqsqsqsqsqsqsqsqsqsqsqsqsqsqsqsqsqsdqsdqs','location-main'),(11,7,'test','sqttqstq','location-main'),(12,8,'testtest000000','testtesttesttesttesttesttesttesttesttest','location-main'),(14,10,'The Abd Lqadr Location','358 Exchange Place Kazakhestan, N.Y. 10099 fax 212 555 6390 telex 10 4534358 Exchange Place Kazakhestan, N.Y. 10099 fax 212 555 6390 telex 10 4534358 Exchange Place Kazakhestan, N.Y. 10099 fax 212 555 6390 telex 10 4534','location-main');
INSERT INTO `pageimage` VALUES (7,11,'benne2.jpg'),(8,12,'WhatsApp Image 2023-04-08 at 04.02.05.jpeg'),(9,14,'marcin-blaszczak-marcin-blaszczak-thumb.jpg');