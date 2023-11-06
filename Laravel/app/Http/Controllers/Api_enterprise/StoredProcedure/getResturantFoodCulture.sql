-- drop PROCEDURE getResturantFoodCulture;
DELIMITER $$
create procedure getResturantFoodCulture(rid int)
begin
    DECLARE isExist int DEFAULT 0;
    
    SET @myCount = 0;
	SELECT count(*) into isExist from resturants WHERE resturant_id = rid;
    if isExist = 1 THEN
    		SELECT @myCount:=@myCount+1 AS id, 
            	   "素食" AS name,
        		   vegetarian AS isChecked
            from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "純素食" AS name,
        		   vegan AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "清真菜" AS name,
        		   muslin AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "無麩質" AS name,
        		   glutenfree AS isChecked
 			from resturant_facilities WHERE resturant_id = rid;
            
    else
        SELECT 'http://fail.php.' as message;
    end if;
end $$
DELIMITER ;