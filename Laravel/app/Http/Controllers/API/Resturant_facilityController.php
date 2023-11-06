<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Resturant_facility;
use Illuminate\Http\Request;

class Resturant_facilityController extends Controller
{
    //
    public function show($id)
    {
        $result = Resturant_facility::where('resturant_id', $id)->first()->get();

        $array = is_object($result[0]);
        $array = json_decode($result, true);
        $array = $array[0];
        // $array = array_keys($array,1); //轉值為1的轉換成字串陣列
        // is_array($array[0]);

        global $info;
        $info = array( "現金", "VISA金融卡", "信用卡", "街口支付", "悠遊付", "LINEPAY", "APPLEPAY", "GOOGLEPAY", "台灣PAY", "供應酒精飲料", "免費無線網路", "座充插座", "禁菸餐廳", "兒童座椅", "兒童餐具", "哺乳室", "尿布台", "免費嬰兒車租借", "國民旅遊卡", "專車接送", "汽車專區", "機車專區", "停車場折抵優惠", "場地租借", "無障礙設施", "玩具區", "溜滑梯", "球池", "沙坑", "農場", "草地", "動物", "魚池", "生態池", "戲水池", "家家酒", "電玩遊戲", "童書", "課程體驗", "滿月活動", "收涎", "抓週", "性別派對", "慶生派對", "素食", "純素食", "清真菜", "無麩質");
        // $result = [];
        $result2 = [];
        $i = 0;

        foreach ($array as $facility => $value) {
            // 檢查值是否為 1，若是則將設施名稱存儲到陣列中
            if ($value == 1) {
                // $result[$i] = $facility;
                $result2[$facility] = $i;
            }
            $i++;
        };

        $result3 = [];

        global $pay;
        global $facility;
        global $child;
        global $food;
        $pay = [];
        $facility = [];
        $child = [];
        $food = [];
        foreach ($result2 as $item => $value) {
            if ($value <= 8) {
                if($item === "resturant_id"){ continue;}
                array_push($pay,$info[$value]);
            } elseif ($value <= 24) {
                array_push($facility,$info[$value]);
            } elseif ($value <= 43) {
                array_push($child,$info[$value]);
            } else {
                array_push($food,$info[$value]);
            }
        };
        $result3['pay'] = $pay;
        $result3['facility'] = $facility;
        $result3['child'] = $child;
        $result3['food'] = $food;


        // return json_encode($result3);

        return response()->json([
            'status'    => true,
            'message'   => 'success',
            'data'      => $result3
        ], 200);
    }


}
