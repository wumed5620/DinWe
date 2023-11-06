-- drop procedure getResturantMenu;
DELIMITER $$
create procedure getResturantMenu(rid int)
begin
    DECLARE isExist int DEFAULT 0;
    DECLARE item mediumblob DEFAULT '';
    
    SET @myCount = 0;
	SELECT count(*) into isExist from resturants WHERE resturant_id = rid;
    if isExist = 1 THEN
    		SELECT @myCount:=@myCount+1 AS id, resturant_image_names.menu1 as name,
        		resturants.resturant_menu1 AS item
            from resturants, resturant_image_names
            WHERE resturants.resturant_id = rid AND resturant_image_names.resturant_id = rid
            union all
            SELECT @myCount:=@myCount+1 AS id, resturant_image_names.menu2 as name,
        		resturants.resturant_menu2 AS item
            from resturants, resturant_image_names
            WHERE resturants.resturant_id = rid AND resturant_image_names.resturant_id = rid
            union all
            SELECT @myCount:=@myCount+1 AS id, resturant_image_names.menu3 as name,
        		resturants.resturant_menu3 AS item
            from resturants, resturant_image_names
            WHERE resturants.resturant_id = rid AND resturant_image_names.resturant_id = rid;
    else
        SELECT 'The resturant does not set Image.' as message;
    end if;
end $$
DELIMITER ;
