-- drop procedure getDBdate;
DELIMITER $$
create procedure getDBdate()
begin
	SET @today = now();
	SELECT DATE_FORMAT(@today, "%Y-%m-%d") as today;
    -- SELECT TIME_FORMAT(@today, "%H:%i") as today;
end $$
DELIMITER ;
