-- drop PROCEDURE getResturantPayments;
DELIMITER $$
create procedure getResturantPayments(rid int)
begin
    DECLARE isExist int DEFAULT 0;
    
    SET @myCount = 0;
	SELECT count(*) into isExist from resturants WHERE resturant_id = rid;
    if isExist = 1 THEN
    		SELECT @myCount:=@myCount+1 AS id, 
            	   "現金支付" AS name,
        		   cash AS isChecked
            from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "VISA" AS name,
        		   visa AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "信用卡" AS name,
        		   creditcard AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "街口支付" AS name,
        		   streetpay AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "悠遊付" AS name,
        		   easycard AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "LINE Pay" AS name,
        		   linepay AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "Apple Pay" AS name,
        		   applepay AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "Google Pay" AS name,
        		   googlepay AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "台灣 Pay" AS name,
        		   taiwanpay AS isChecked
 			from resturant_facilities WHERE resturant_id = rid;
            
    else
        SELECT 'http://fail.php.' as message;
    end if;
end $$
DELIMITER ;
