-- drop PROCEDURE getResturantInfo;
DELIMITER $$
create procedure getResturantInfo(rid int)
begin
    DECLARE isExist int DEFAULT 0;
    
	SELECT count(*) into isExist from resturants WHERE resturant_id = rid;
    if isExist = 1 THEN
    	SELECT resturant_id,
 			   resturant_account,
       		   resturant_name,
       		   resturant_uninum,
       		   resturant_phone,
      		   resturant_address,
      		   resturant_email,
               resturant_intro,
               resturant_ifram,
               resturant_state,
               DATE_FORMAT(editdate, "%Y/%m/%d") as editdate,
               TIME_FORMAT(edittime, "%H:%i") as edittime
 			   from resturants WHERE resturant_id = rid;
--      SELECT * from resturants WHERE resturant_id = rid;
    else
        SELECT 'This resturant is not exist.' as message;
    end if;
end $$
DELIMITER ;