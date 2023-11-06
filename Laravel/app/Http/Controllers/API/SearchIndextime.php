<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Resturant_operating_time;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class SearchIndextime extends Controller
{
    public function index()
{
    // 取得今天星期幾
    $today = Carbon::today();
    $weekday = $today->dayOfWeekIso;

    // 取得當前時間字串
    $now = Carbon::now();

    

    // 取得符合條件的營業時間
    $operatingTimes = Resturant_operating_time::where('resturant_id', 2)
        ->where('weekday', $weekday)
        ->where('opentime', '<=', $now)
        ->where('closetime', '>=', $now)
        ->get();

    if (Empty($operatingTimes)) {
        // 如果當前時間不在任何一家餐廳的營業時間內，回傳 404
        return response()->json(['error' => 'No restaurant is open now.'], 404);
    }

    // 回傳時間區間資訊
    $timeSlotsByResturant = [];
    foreach ($operatingTimes as $operatingTime) {
        // 取得符合條件的時間區間
        $endTime = Carbon::createFromFormat('H:i:s', $operatingTime->closetime);

        // 取得當前時間往後推的一小時的整點
        $currentTime = $now->ceilHour()->addHour();

        $timeSlots = [];
        while ($currentTime <= $endTime) {
            $timeSlots[] = $currentTime->format('H:i');
            $currentTime->addHour();
        }

        $timeSlotsByResturant[$operatingTime->resturant_id] = $timeSlots;
    }

    return response()->json($timeSlotsByResturant);
}







    
}
