<?php

namespace App\Http\Controllers\Api;

use App\Models\Member_like;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Member_likeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getlike($memId, $resId)
    {
        //
        $like = Member_like::where('member_id', $memId)->where('resturant_id', $resId)->first();

        if ($like) {
            return response()->json([
                'status'    => 1,
            ], 200);
        } else {
            return response()->json([
                'status'    => 0
            ], 200);
        }
    }

    public function likeStore(Request $request)
    {
        try {
            $like = Member_like::create([
                'member_id' => $request->member_id,
                'resturant_id' => $request->resturant_id,
            ]);

            if ($like) {
                return response()->json([
                    'status'    => true,
                ], 200);
            } else {
                return response()->json([
                    'status'    => false
                ], 200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status'    => false,
                'message'   => $th->getMessage(),
            ], 500);
        }
    }

    public function unLikeStore(Request $request)
    {
        $like = Member_like::where('member_id', $request->member_id)
            ->where('resturant_id', $request->resturant_id)
            ->delete();

        if ($like) {
            return response()->json([
                'status'    => true,
            ], 200);
        } else {
            return response()->json([
                'status'    => false
            ], 200);
        }
    }
}
