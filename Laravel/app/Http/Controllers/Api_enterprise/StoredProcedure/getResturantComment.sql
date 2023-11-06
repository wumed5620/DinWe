-- DROP PROCEDURE getResturantComment;
DELIMITER $$
create procedure getResturantComment(rid int)
begin
    DECLARE isExist int DEFAULT 0;
	DECLARE isState4 int DEFAULT 0;

	SELECT count(*) into isExist from orders WHERE resturant_id = rid;
    SELECT count(*) into isState4 from orders WHERE resturant_id = rid AND order_state = 4;
    
    if isExist > 0 THEN
    	if isState4 >0 THEN
    		SELECT order_id, order_date as orderdate, order_stars as star, order_comment as comments
 			from orders WHERE resturant_id = rid AND order_state = 4
            ORDER BY orderdate DESC;
        ELSE
        	SELECT null as message;
    	end if;
    else
        SELECT null as message;
    end if;
end $$
DELIMITER ;