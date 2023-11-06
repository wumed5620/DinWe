-- drop PROCEDURE getResturantPandAvg
DELIMITER $$
create procedure getResturantPandAvg(rid int)
begin
    DECLARE isExist int DEFAULT 0;

	SELECT count(*) into isExist from resturants WHERE resturant_id = rid;
    if isExist = 1 THEN
    		SELECT resturants.resturant_id,
               resturants.resturant_max as people,
               resturants.resturant_averageconsum as averagesum,
               DATE_FORMAT(resturant_facilities.editdate, "%Y/%m/%d") as editdate,
               TIME_FORMAT(resturant_facilities.edittime, "%H:%i") as edittime
 			from resturants, resturant_facilities WHERE resturants.resturant_id = rid AND resturant_facilities.resturant_id = rid;
    else
        SELECT 'http://fail.php.' as message;
    end if;
end $$
DELIMITER ;
