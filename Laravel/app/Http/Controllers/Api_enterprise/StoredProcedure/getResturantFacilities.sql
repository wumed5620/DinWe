-- drop PROCEDURE getResturantFacilities;
DELIMITER $$
create procedure getResturantFacilities(rid int)
begin
    DECLARE isExist int DEFAULT 0;
    
    SET @myCount = 0;
	SELECT count(*) into isExist from resturants WHERE resturant_id = rid;
    if isExist = 1 THEN
    		SELECT @myCount:=@myCount+1 AS id, 
            	   "玩具區" AS name,
        		   toy AS isChecked
            from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "溜滑梯" AS name,
        		   slide AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "球池" AS name,
        		   ballpit AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "沙坑" AS name,
        		   sandpit AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "農場" AS name,
        		   farm AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "草地" AS name,
        		   lawn AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "動物" AS name,
        		   animal AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "魚池" AS name,
        		   fishpond AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "生態池" AS name,
        		   ecopond AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "戲水池" AS name,
        		   paddingpool AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "家家酒" AS name,
        		   home AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "電玩設施" AS name,
        		   videogame AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "兒童書區" AS name,
        		   childrenbook AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "課程體驗" AS name,
        		   course AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "滿月活動" AS name,
        		   fullmoon AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "收涎活動" AS name,
        		   saliva AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "抓周活動" AS name,
        		   oneyear AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "性別派對" AS name,
        		   sexparty AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "慶生派對" AS name,
        		   birthday AS isChecked
 			from resturant_facilities WHERE resturant_id = rid;
            
    else
        SELECT 'http://fail.php.' as message;
    end if;
end $$
DELIMITER ;