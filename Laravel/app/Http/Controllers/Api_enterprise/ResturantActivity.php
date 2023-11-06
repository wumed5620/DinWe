<?php

namespace App\Http\Controllers\Api_enterprise;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use App\Models\Resturant_activity;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ResturantActivity extends Controller
{
    public function show($id)
    {
        // $user_account = auth() -> id();
        // $restaurant = User::find($user_account)->restaurant;
        // $id = $restaurant->id;

        $activity = DB::select("call getResturantActivity(?)", [$id]);

        return response()->json($activity);
    }
  
    public function create($id, Request $request)
    {
        // $user_account = auth() -> id();
        // $restaurant = User::find($user_account)->restaurant;
        // $resturant_id = 1;

        $activity = new Resturant_activity();
        $activity->resturant_id = $id;
        $activity->title = $request->title;
        $activity->content = $request->content;
        $activity->img = $request->img;
        $activity->img_name = $request->img_name;
        $activity->releasedate = $request->releasedate;
        $activity->start_date = $request->startdate;
        $activity->end_date = $request->enddate;
        $activity->prostate = $request->prostate;
        
        $now = Carbon::now()->timezone('Asia/Taipei');
        $toDateString = $now->toDateString();

        $activity->editdate = $toDateString;

        $activity->save();
        return response()->json($activity);
    }

    public function update($id, Request $request)
    {
        $items = Resturant_activity::where('resturant_id', $id)
                                    ->where('id', $request->DB_id)
                                    ->get();

        $items[0]->title = $request->title;
        $items[0]->content = $request->content;
        $items[0]->img = $request->img;
        $items[0]->img_name = $request->img_name;
        $items[0]->releasedate = $request->releasedate;
        $items[0]->start_date = $request->startdate;
        $items[0]->end_date = $request->enddate;
        $items[0]->prostate = $request->prostate;
        
        $now = Carbon::now()->timezone('Asia/Taipei');
        $toDateString = $now->toDateString();

        $items[0]->editdate = $toDateString;

        foreach ($items as $item) {
            $item->save();
        }

        return response()->json($request);

    }

    public function delete($id, Request $request)
    {
        $item = Resturant_activity::where('resturant_id', $id)
                                    ->where('id', $request->DB_id)
                                    ->update(['prostate' => 4]);
        return response()->json($item);
    }

    public function index()
    {
        //
    }
    
}
