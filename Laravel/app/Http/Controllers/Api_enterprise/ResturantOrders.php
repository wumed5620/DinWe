<?php

namespace App\Http\Controllers\Api_enterprise;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Member;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ResturantOrders extends Controller
{
    public function show($id)
    {
        // $user_account = auth() -> id();
        // $restaurant = User::find($user_account)->restaurant;
        // $id = $restaurant->id;

        $order = DB::select("call getResturantOrders(?)", [$id]);
        return response()->json($order);
    }

    public function create($id, Request $request)
    {
        // $user_account = auth() -> id();
        // $restaurant = User::find($user_account)->restaurant;
        $member = Member::where('member_cellphone', $request->tel)->get();
        $resturant_id = $id;

        $order = new Order();
        
        $order->resturant_id = $resturant_id;
        $order->member_id = $member[0]->member_id;
        $order->order_who = $request->name;
        $order->order_phone = $request->tel;
        $order->order_date = $request->orderdate;
        $order->order_time = $request->ordertime;
        $order->order_adult = $request->adult;
        $order->order_child = $request->child;
        $order->order_chair = $request->chair;
        $order->order_tableware = $request->tableware;
        $order->order_notes = $request->notes;
        $order->order_state = $request->orderstate;
        
        $order->save();

        return response()->json($member);
    }
    
    public function update($id, Request $request)
    {
        $items = Order::where('resturant_id', $id)
                        ->where('order_id', $request->DB_order_id)
                        ->get();

        $items[0]->order_who = $request->name;
        $items[0]->order_phone = $request->tel;
        $items[0]->order_date = $request->orderdate;
        $items[0]->order_time = $request->ordertime;
        $items[0]->order_adult = $request->adult;
        $items[0]->order_child = $request->child;
        $items[0]->order_chair = $request->chair;
        $items[0]->order_tableware = $request->tableware;
        $items[0]->order_notes = $request->notes;
        $items[0]->order_state = $request->orderstate;

        foreach ($items as $item) {
            $item->save();
        }

        return response()->json($items);
    }

    public function updatestate($id, Request $request)
    {
        $items = Order::where('resturant_id', $id)
                        ->where('order_id', $request->DB_order_id)
                        ->update(['order_state' => $request->orderstate]);

        return response()->json(['message' => 'success']);
    }

    // public function updateseat($id, Request $request)
    // {
    //     $items = Order::where('resturant_id', $id)
    //                     ->where('order_id', $request->DB_order_id)
    //                     ->update(['order_state' => 2]);

    //     return response()->json(['message' => 'success']);
    // }

    // public function updatepaid($id, Request $request)
    // {
    //     $items = Order::where('resturant_id', $id)
    //                     ->where('order_id', $request->DB_order_id)
    //                     ->update(['order_state' => 3]);

    //     return response()->json(['message' => 'success']);
    // }

    // public function cancel($id,Request $request)
    // {
    //     $items = Order::where('resturant_id', $id)
    //                     ->where('order_id', $request->DB_order_id)
    //                     ->update(['order_state' => 0]);

    //     return response()->json(['message' => 'success']);
    // }
}
