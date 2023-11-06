<?php

namespace App\Http\Controllers\Api_enterprise;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ResturantOrderComment extends Controller
{
    public function show($id)
    {
        // $user_account = auth() -> id();
        // $restaurant = User::find($user_account)->restaurant;
        // $id = $restaurant->id;

        $comment = DB::select("call getResturantComment(?)", [$id]);
        return response()->json($comment);
    }

    public function selectAll($id)
    {
        // $user_account = auth() -> id();
        // $restaurant = User::find($user_account)->restaurant;
        // $id = $restaurant->id;

        $count = DB::select("SELECT COUNT(*) as count from orders where resturant_id = ? AND order_state <>0 AND DATE_FORMAT(order_date, '%m') = DATE_FORMAT(now(), '%m'); ", [$id]);
        return response()->json($count);
    }

}
