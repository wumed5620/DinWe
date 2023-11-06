-- drop procedure getResturantActivity;
DELIMITER $$
create procedure getResturantActivity(rid int)
begin
    DECLARE isExist int DEFAULT 0;
    DECLARE notState4 int DEFAULT 0;
    
    SET @myCount = 0;
	SELECT count(*) into isExist from resturant_activities WHERE resturant_id = rid;
    SELECT count(*) into notState4 from resturant_activities WHERE resturant_id = rid AND prostate <> 4;
    
    if isExist > 0 THEN
   	 if notState4 > 0 THEN
    	SELECT @myCount:=@myCount+1 AS activity_id,
        	   id AS DB_id,
        	   resturant_id,
 			   title,
       		   editdate,
       		   releasedate,
       		   start_date AS startdate,
      		   end_date AS enddate,
      		   img,
               img_name,
               content,
               prostate
 			   from resturant_activities WHERE resturant_id = rid AND prostate <> 4
               ORDER BY releasedate DESC;
      ELSE
      	SELECT null as message;
      end if;
    else
        SELECT 'This resturant is not exist.' as message;
    end if;
end $$
DELIMITER ;