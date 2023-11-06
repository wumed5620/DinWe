-- drop PROCEDURE getResturantImg;
DELIMITER $$
create procedure getResturantImg(rid int)
begin
    DECLARE isExist int DEFAULT 0;
    DECLARE item mediumblob DEFAULT '';
    
    SET @myCount = 0;
	SELECT count(*) into isExist from resturants WHERE resturant_id = rid;
    if isExist = 1 THEN
    		SELECT @myCount:=@myCount+1 AS id, resturant_image_names.image1 as name,
        		resturants.resturant_image1 AS item
            from resturants, resturant_image_names
            WHERE resturants.resturant_id = rid AND resturant_image_names.resturant_id = rid
            union all
            SELECT @myCount:=@myCount+1 AS id, resturant_image_names.image2 as name,
        		resturants.resturant_image2 AS item
            from resturants, resturant_image_names
            WHERE resturants.resturant_id = rid AND resturant_image_names.resturant_id = rid
            union all
            SELECT @myCount:=@myCount+1 AS id, resturant_image_names.image3 as name,
        		resturants.resturant_image3 AS item
            from resturants, resturant_image_names
            WHERE resturants.resturant_id = rid AND resturant_image_names.resturant_id = rid
            union all
            SELECT @myCount:=@myCount+1 AS id, resturant_image_names.image4 as name,
        		resturants.resturant_image4 AS item
            from resturants, resturant_image_names
            WHERE resturants.resturant_id = rid AND resturant_image_names.resturant_id = rid
            union all
            SELECT @myCount:=@myCount+1 AS id, resturant_image_names.image5 as name,
        		resturants.resturant_image5 AS item
            from resturants, resturant_image_names
            WHERE resturants.resturant_id = rid AND resturant_image_names.resturant_id = rid;
    else
        SELECT 'The resturant does not set Image.' as message;
    end if;
end $$
DELIMITER ;