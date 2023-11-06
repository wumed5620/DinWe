DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getDBdate`()
begin
	SET @today = now();
	SELECT DATE_FORMAT(@today, "%Y-%m-%d") as today;
    -- SELECT TIME_FORMAT(@today, "%H:%i") as today;
end$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getResturantActivity`(rid int)
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
end$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getResturantComment`(rid int)
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
end$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getResturantFacilities`(rid int)
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
end$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getResturantFoodCulture`(rid int)
begin
    DECLARE isExist int DEFAULT 0;
    
    SET @myCount = 0;
	SELECT count(*) into isExist from resturants WHERE resturant_id = rid;
    if isExist = 1 THEN
    		SELECT @myCount:=@myCount+1 AS id, 
            	   "素食" AS name,
        		   vegetarian AS isChecked
            from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "純素食" AS name,
        		   vegan AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "清真菜" AS name,
        		   muslin AS isChecked
 			from resturant_facilities WHERE resturant_id = rid
            union ALL
            SELECT @myCount:=@myCount+1 AS id, 
            	   "無麩質" AS name,
        		   glutenfree AS isChecked
 			from resturant_facilities WHERE resturant_id = rid;
            
    else
        SELECT 'http://fail.php.' as message;
    end if;
end$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getResturantImg`(rid int)
begin
    DECLARE isExist int DEFAULT 0;
    DECLARE item mediumblob DEFAULT '';
    
    SET @myCount = 0;
	SELECT count(*) into isExist from resturants WHERE resturant_id = rid;
    if isExist = 1 THEN
    		SELECT @myCount:=@myCount+1 AS id, resturant_image_names.image1 as name,
        		resturants.resturant_image1 AS item
            from resturants, resturant_image_names
            WHERE resturants.resturant_id = rid AND resturant_image_names.resturant_id = rid
            union all
            SELECT @myCount:=@myCount+1 AS id, resturant_image_names.image2 as name,
        		resturants.resturant_image2 AS item
            from resturants, resturant_image_names
            WHERE resturants.resturant_id = rid AND resturant_image_names.resturant_id = rid
            union all
            SELECT @myCount:=@myCount+1 AS id, resturant_image_names.image3 as name,
        		resturants.resturant_image3 AS item
            from resturants, resturant_image_names
            WHERE resturants.resturant_id = rid AND resturant_image_names.resturant_id = rid
            union all
            SELECT @myCount:=@myCount+1 AS id, resturant_image_names.image4 as name,
        		resturants.resturant_image4 AS item
            from resturants, resturant_image_names
            WHERE resturants.resturant_id = rid AND resturant_image_names.resturant_id = rid
            union all
            SELECT @myCount:=@myCount+1 AS id, resturant_image_names.image5 as name,
        		resturants.resturant_image5 AS item
            from resturants, resturant_image_names
            WHERE resturants.resturant_id = rid AND resturant_image_names.resturant_id = rid;
    else
        SELECT 'The resturant does not set Image.' as message;
    end if;
end$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getResturantInfo`(rid int)
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
end$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getResturantMenu`(rid int)
begin
    DECLARE isExist int DEFAULT 0;
    DECLARE item mediumblob DEFAULT '';
    
    SET @myCount = 0;
	SELECT count(*) into isExist from resturants WHERE resturant_id = rid;
    if isExist = 1 THEN
    		SELECT @myCount:=@myCount+1 AS id, resturant_image_names.menu1 as name,
        		resturants.resturant_menu1 AS item
            from resturants, resturant_image_names
            WHERE resturants.resturant_id = rid AND resturant_image_names.resturant_id = rid
            union all
            SELECT @myCount:=@myCount+1 AS id, resturant_image_names.menu2 as name,
        		resturants.resturant_menu2 AS item
            from resturants, resturant_image_names
            WHERE resturants.resturant_id = rid AND resturant_image_names.resturant_id = rid
            union all
            SELECT @myCount:=@myCount+1 AS id, resturant_image_names.menu3 as name,
        		resturants.resturant_menu3 AS item
            from resturants, resturant_image_names
            WHERE resturants.resturant_id = rid AND resturant_image_names.resturant_id = rid;
    else
        SELECT 'The resturant does not set Image.' as message;
    end if;
end$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getResturantOrders`(rid int)
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
end$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getResturantPandAvg`(rid int)
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
end$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getResturantPayments`(IN `rid` INT)
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
end$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getResturantServices`(rid int)
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
end$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getbusinessHours`(rid int)
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
end$$
DELIMITER ;
