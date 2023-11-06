<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
        try {
            $validateUser = validator::make($request->all(), [
                'order_date'     => 'required',
                'order_time'     => 'required',
                'order_adult'    => 'required',
            ]);

            //失敗後回傳並終止
            if ($validateUser->fails()) {
                return response()->json([
                    'status'    => false,
                    'message'   => '請確認所有欄位皆有填寫',
                    'errors'    => $validateUser->errors(),
                    'data'      => $request->order_date,
                    'time'      => $request->order_time,
                    'adult'      => $request->order_adult,
                ], 401);
            }

            $member = Member::where('member_id', $request->member_id)->first();

            $carbonTime = Carbon::createFromFormat('H:i:s', $request->order_time);
            $time = $carbonTime->toTimeString();

            $order  = Order::Create([
                'member_id'         => $request->member_id,
                'resturant_id'      => $request->resturant_id,
                'order_date'        => $request->order_date,
                'order_who'         => $member->member_name,
                'order_phone'       => $member->member_account,
                'order_time'        => $time,
                'order_adult'       => $request->order_adult,
                'order_child'       => $request->order_child,
                'order_chair'       => $request->order_chair,
                'order_tableware'   => $request->order_tableware,
                'order_notes'       => $request->order_notes,
            ]);
            if ($order) {
                return response()->json([
                    'status'    => true,
                    'message'   => "訂單成立",
                ], 200);
            } else {
                return response()->json([
                    'status'        => false,
                    'message'       => "訂單送出失敗",
                ], 401);
            }
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status'    => false,
                'message'   => $th->getMessage(),
                'member_id'     => $request->member_id,
            ], 500);
        }

        return response()->json([
            'status'    => true,
            'message'   => "註冊成功"
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function getComments($id)
    {
        //
        $comments = Order::select('order_who', 'order_stars', 'order_comment')
            ->where('resturant_id', $id)
            ->where('order_state', 4)
            ->get();

        if ($comments) {
            return response()->json([
                'status'    => true,
                'message'   => "取得成功",
                "data"      => $comments
            ], 200);
        } else {
            return response()->json([
                'status'    => false,
                'message'   => "失敗",
            ], 401);
        }
    }

    public function getOrders(Request $request)
    {
        $orders = DB::select("select members.member_id, orders.order_id, orders.order_who, orders.order_phone, orders.order_date, orders.order_time, orders.order_adult, orders.order_child, orders.order_chair, orders.order_tableware, orders.order_notes, orders.order_state, resturants.resturant_name, resturants.resturant_address from members, orders, resturants where members.member_id = orders.member_id and orders.resturant_id = resturants.resturant_id and members.member_id = ? and orders.order_state = 1;", [$request->member_id]);
        return response()->json($orders);
    }

    public function cancelOrders(Request $request)
    {
        $message = '訂單取消成功';
        DB::update("update orders set orders.order_state = 0 where orders.order_id = ?;", [$request->order_id]);
        return response()->json($message);
    }

    public function modOrders(Request $request)
    {
        $message = '訂單修改成功';
        DB::update("update orders set orders.order_adult = ?, orders.order_child = ?, orders.order_who = ?, orders.order_phone = ?, orders.order_chair = ?, orders.order_tableware =?, orders.order_notes = ? where orders.order_id = ?;", [$request->order_adult, $request->order_child, $request->order_who, $request->order_phone, $request->order_chair, $request->order_tableware, $request->order_notes, $request->order_id]);
        return response()->json($message);
    }

    public function getOrderDones(Request $request)
    {
        $orderDones = DB::select("select members.member_id, orders.order_id, orders.order_who, orders.order_phone, orders.order_date, orders.order_time, orders.order_adult, orders.order_child, orders.order_chair, orders.order_tableware, orders.order_notes, orders.order_state, orders.order_stars, orders.order_comment, resturants.resturant_name, resturants.resturant_address from members, orders, resturants where members.member_id = orders.member_id and orders.resturant_id = resturants.resturant_id and members.member_id = ? and orders.order_state > 2;", [$request->member_id]);
        return response()->json($orderDones);
    }

    public function addComment(Request $request)
    {
        $message = '訂單完成評價';
        DB::update("update orders set orders.order_state = 4, orders.order_stars = ?, orders.order_comment = ? where orders.order_id = ?", [$request->order_stars, $request->order_comment, $request->order_id]);
        return response()->json($message);
    }
}
