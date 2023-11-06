<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Resturant;
use App\Models\Resturant_facility;
use App\Models\Order;
use App\Models\Member_like;
use Illuminate\Http\Request;
use App\Models\Resturant_operating_time;
use Carbon\Carbon;



class SearchIndexGet extends Controller
{
  public function index(Request $request)
  {
    $resturants = Resturant::select(
      'resturant_id as id', //resturant_id
      'resturant_name as name', //resturant_name
      'resturant_phone as tel', //resturant_phone
      'resturant_intro as text', //resturant_intro text
      'resturant_image1 as image', //resturant_image1
      'resturant_averageconsum as price' //resturant_averageconsum price
    )->get();
  
    //從前端傳入member_id!!!
    $memberId = $request->input('member_id');
    $memberLike = Member_like::where('member_id', $memberId)->get();

    //篩選器!!!
    $response = [];
    foreach ($resturants as $resturant) 
    {
      $resturantFacility = Resturant_facility::where('resturant_id', $resturant->id)->first();
      $filters = [];
      $facilityNames = [
      'toy' => '玩具區',
      'slide' => '溜滑梯',
      'ballpit' => '球池',
      'sandpit' => '沙坑',
      'farm' => '農場',
      'lawn' => '草地',
      'animal' => '動物',
      'fishpond' => '魚池',
      'ecopond' => '生態池',
      'paddingpool' => '戲水池',
      'home' => '家家酒',
      'videogame' => '電玩設施',
      'childrenbook' => '兒童書區',
      'course' => '課程體驗',
      'fullmoon' => '滿月活動',
      'saliva' => '收涎活動',
      'oneyear' => '抓周活動',
      'sexparty' => '性別派對',
      'birthday' => '慶生派對',
      'alcohol' => '供應酒精飲品',
      'wifi' => '免費無線網路',
      'socket' => '座充插座',
      'smoking' => '禁菸餐廳',
      'childseat' => '兒童座椅',
      'childware' => '兒童餐具',
      'nursingroom' => '哺乳室',
      'diaper' => '尿布台',
      'stroller' => '免費嬰兒車租借',
      'touristcard' => '國民旅遊卡',
      'shuttle' => '專車接送',
      'car' => '汽車專區',
      'scotter' => '機車專區',
      'parkdiscount' => '停車場折抵優惠',
      'venuerental' => '場地租借',
      'barrierfree' => '無障礙設施',
      'cash' => '現金支付',
      'visa' => 'Visa',
      'creditcard' => '信用卡',
      'streetpay' => '街口支付',
      'easycard' => '悠遊卡',
      'linepay' => 'LINE Pay',
      'applepay' => 'Apple Pay',
      'googlepay' => 'Google Pay',
      'taiwanpay' => '台灣 Pay',
      'vegetarian' => '素食',
      'vegan' => '純素食',
      'muslin' => '清真菜',
      'glutenfree' => '無麩質',
      ];

      if (!$resturantFacility) {
        continue;
      }
      
      foreach ($facilityNames as $key => $value) {
        if ($resturantFacility->$key == 1) {
          $filters[] = $value;
        }
      }

      //star平均!!!
      $orders = Order::select(
        'order_id as id',
        'resturant_id as resturant_id',
        'order_who as name',
        'order_stars as star',
        'order_comment as comment'
      )->where('resturant_id', $resturant->id)->get();

      $starSum = 0;
      $numOrders = 0;
      foreach ($orders as $order) {
        if (!is_null($order->star)) {
          $starSum += $order->star;
          $numOrders++;
        }
      }

      $average_star = ($numOrders > 0) ? $starSum / $numOrders : 0;
      $average_star = round($average_star, 1);

      //reviews!!!
      $reviews = [];
      foreach ($orders as $order) {
        $reviews[] = [
          'id' => $order->id,
          'storeId' => $order->resturant_id,
          'name' => $order->name,
          'star' => $order->star,
          'comment' => $order->comment
        ];
      }

      //營業時間區!!!
      $today = Carbon::today();
      $weekday = $today->dayOfWeekIso;
      // 取得當前時間字串
      $now = Carbon::now();

      // 取得符合條件的營業時間
      $operatingTimes = Resturant_operating_time::where('resturant_id', $resturant->id)
        ->where('weekday', $weekday)
        ->where('isOpen', 1)
        ->where('opentime', '<=', $now)
        ->where('closetime', '>=', $now)
        ->get();

      if (empty($operatingTimes)) {
        // 如果當前時間不在任何一家餐廳的營業時間內，回傳 404
        return response()->json(['error' => 'No restaurant is open now.'], 404);
      }

      $timeSlots = [];
      // 回傳時間區間資訊
      foreach ($operatingTimes as $operatingTime) {
        // 取得符合條件的時間區間
        $endTime = Carbon::createFromFormat('H:i:s', $operatingTime->closetime)->subHour();
        // 取得當前時間往後推的一小時的整點
        $currentTime = $now->ceilHour()->addHour();
        while ($currentTime <= $endTime) {
          $timeSlots[] = $currentTime->format('H:i');
          $currentTime->addHour();
        }
      }

      $response[] = [
        'id' => $resturant->id,
        'name' => $resturant->name ? $resturant->name : "",
        'tel' => $resturant->tel ? $resturant->tel : "",
        'text' => $resturant->text ? $resturant->text : "",
        'image' => $resturant->image,
        'filters' => $filters ? $filters : [],
        'time' => $timeSlots,
        'star' => $average_star,
        'price' => $resturant->price,
        'reviews' => $reviews,
        'memberlike' =>$memberLike
      ];
    }
      return response()->json($response);
  }
}
