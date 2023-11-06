-- drop procedure getResturantOrders;
DELIMITER $$
create procedure getResturantOrders(rid int)
begin
    DECLARE isExist int DEFAULT 0;
    
    SET @myCount = 0;
	SELECT count(*) into isExist from orders WHERE resturant_id = rid;
    
    if isExist > 0 THEN
    	SELECT @myCount:=@myCount+1 AS id,
        	   order_id AS DB_order_id,
        	   resturant_id,
 			   order_who AS name,
       		   order_phone AS tel,
       		   order_date AS orderdate,
       		   order_time AS ordertime,
      		   order_adult AS adult,
               CASE
    				WHEN order_child IS NULL THEN 0
    				ELSE order_child
			   END AS child,
               CASE
    				WHEN order_chair IS NULL THEN 0
    				ELSE order_chair
			   END AS chair,
               CASE
    				WHEN order_tableware IS NULL THEN 0
    				ELSE order_tableware
			   END AS tableware,  
               CASE
    				WHEN order_notes IS NULL THEN ""
    				ELSE order_notes
			   END AS notes,
               order_state AS orderstate
 			   from orders WHERE resturant_id = rid
               ORDER BY orderdate DESC, ordertime;
    else
        SELECT null as message;
    end if;
end $$
DELIMITER ;