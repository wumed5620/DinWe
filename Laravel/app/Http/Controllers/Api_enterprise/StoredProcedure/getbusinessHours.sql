-- drop PROCEDURE getbusinessHours;
DELIMITER $$
create procedure getbusinessHours(rid int)
begin
    DECLARE isExist int DEFAULT 0;
    
    SET @myCount = 0;
	SELECT count(*) into isExist from resturants_operating_time WHERE resturant_id = rid;
    if isExist > 1 THEN
    	SELECT @myCount:=@myCount+1 AS id,
			CASE
    			WHEN weekday = 1 THEN "一"
    			WHEN weekday = 2 THEN "二"
				WHEN weekday = 3 THEN "三"
                WHEN weekday = 4 THEN "四"
                WHEN weekday = 5 THEN "五"
                WHEN weekday = 6 THEN "六"
                WHEN weekday = 7 THEN "日"
    			ELSE weekday
			END as weekday,
            CASE
    			WHEN isOpen IS NULL THEN 1
    			ELSE isOpen
			END as isOpen,
            CASE
    			WHEN opentime IS NULL THEN TIME_FORMAT("11:30", "%H:%i")
    			ELSE TIME_FORMAT(opentime, "%H:%i")
			END as opentime,
            CASE
    			WHEN closetime IS NULL THEN TIME_FORMAT("21:00", "%H:%i")
    			ELSE TIME_FORMAT(closetime, "%H:%i")
			END as closetime, 
            CASE
    			WHEN break_optime IS NULL THEN TIME_FORMAT("15:00", "%H:%i")
    			ELSE TIME_FORMAT(break_optime, "%H:%i")
			END as breaktimeOP,
            CASE
    			WHEN break_edtime IS NULL THEN TIME_FORMAT("17:30", "%H:%i")
    			ELSE TIME_FORMAT(break_edtime, "%H:%i")
			END as breaktimeED
                from resturants_operating_time WHERE resturant_id = rid;
    else
        SELECT 'The resturant does not set Operating Time.' as message;
    end if;
end $$
DELIMITER ;