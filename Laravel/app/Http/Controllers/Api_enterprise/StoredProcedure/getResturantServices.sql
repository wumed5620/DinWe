-- drop PROCEDURE getResturantServices;
DELIMITER $$
create procedure getResturantServices(rid int)
begin
    DECLARE isExist int DEFAULT 0;
    
    SET @myCount = 0;
	SELECT count(*) into isExist from resturants WHERE resturant_id = rid;
    if isExist = 1 THEN
    		SELECT @myCount:=@myCount+1 AS id, 
            	   "供應酒精飲品" AS name,
        		   alcohol AS isChecked
            from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "免費無線網路" AS name,
        		   wifi AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "座充插座" AS name,
        		   socket AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "禁菸餐廳" AS name,
        		   smoking AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "兒童座椅" AS name,
        		   childseat AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "兒童餐具" AS name,
        		   childware AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "哺乳室" AS name,
        		   nursingroom AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "尿布台" AS name,
        		   diaper AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "免費嬰兒車租借" AS name,
        		   stroller AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "國民旅遊卡" AS name,
        		   touristcard AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "專車接送" AS name,
        		   shuttle AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "汽車專區" AS name,
        		   car AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "機車專區" AS name,
        		   scotter AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "停車場折抵優惠" AS name,
        		   parkdiscount AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "場地租借" AS name,
        		   venuerental AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "無障礙設施" AS name,
        		   barrierfree AS isChecked
 			from resturant_facilities WHERE resturant_id = rid;
            
    else
        SELECT 'http://fail.php.' as message;
    end if;
end $$
DELIMITER ;