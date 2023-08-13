-- DropForeignKey
ALTER TABLE `pageimage` DROP FOREIGN KEY `pageimage_ibfk_1`;

-- AddForeignKey
ALTER TABLE `pageimage` ADD CONSTRAINT `pageimage_ibfk_1` FOREIGN KEY (`id_component`) REFERENCES `pagecomponent`(`id_component`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- Procedure: AddLocation
CREATE PROCEDURE AddLocation(pageSlug VARCHAR(50),nomLocation VARCHAR(50),addressLocation VARCHAR(120),componentTitle VARCHAR(50),componentContent VARCHAR(500),imageImage_path VARCHAR(120))
BEGIN
	DECLARE page_id INT;
    DECLARE component_id INT;
	INSERT INTO page(slug,template_file) VALUES (pageSlug,'page_location');
    -- get id_page
    SELECT id_page INTO page_id FROM page WHERE slug = pageSlug;
	INSERT INTO location(nom,address,id_page) VALUES (nomLocation,addressLocation,page_id);
    -- there's only one row of pagecomponent.
    INSERT INTO pagecomponent(id_page,title,content,classSelector) VALUES (page_id,componentTitle,componentContent,'location-main');
    SELECT "good";
    -- there's only one row of pageimage.
    IF (imageImage_path != '') THEN
		-- get id_component
		SELECT id_component INTO component_id FROM pagecomponent WHERE id_page = page_id LIMIT 1;
        --
		INSERT INTO pageimage(id_component,image_path) VALUES (component_id,imageImage_path);
        SELECT "good image";
    END IF;
END;