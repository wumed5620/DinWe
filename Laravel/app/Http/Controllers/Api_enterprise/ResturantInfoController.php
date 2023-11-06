<?php

namespace App\Http\Controllers\Api_enterprise;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use App\Models\Resturant;
use App\Models\Resturant_operating_time;
use App\Models\ResturantImageName;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ResturantInfoController extends Controller
{
    public function getName($id) {
        // $user_account = auth() -> id();
        // $restaurant = User::find($user_account)->restaurant;
        // $id = $restaurant->id;

        $resturant = DB::select("select resturant_name from resturants where resturant_id = ?", [$id]);
        
        return response()->json($resturant);
    }

    public function show($id) {
        // $user_account = auth() -> id();
        // $restaurant = User::find($user_account)->restaurant;
        // $id = $restaurant->id;

        $resturant = DB::select("call getResturantInfo(?)", [$id]);
        $businessHours = DB::select("call getbusinessHours(?)", [$id]);
        $image = DB::select("call getResturantImg(?)", [$id]);
        $menuImg = DB::select("call getResturantMenu(?)", [$id]);
        $resturant[0]->businessHours = $businessHours;
        $resturant[0]->img = $image;
        $resturant[0]->menuImg = $menuImg;

        return response()->json($resturant);
    }

    public function update($id, Request $request)
    {
        $item = Resturant::findOrFail($id);
        $imageName = ResturantImageName::where('resturant_id', $id)->get();
        
        $item->resturant_uninum = $request->resturant_uninum;
        $item->resturant_phone = $request->resturant_phone;
        $item->resturant_address = $request->resturant_address;
        $item->resturant_email = $request->resturant_email;
        $item->resturant_intro = $request->resturant_intro;
        $item->resturant_ifram = $request->resturant_ifram;
        $item->resturant_state = $request->resturant_state;

        $item->resturant_image1 = $request->img[0]['item'];
        $item->resturant_image2 = $request->img[1]['item'];
        $item->resturant_image3 = $request->img[2]['item'];
        $item->resturant_image4 = $request->img[3]['item'];
        $item->resturant_image5 = $request->img[4]['item'];
        
        $item->resturant_menu1 = $request->menuImg[0]['item'];
        $item->resturant_menu2 = $request->menuImg[1]['item'];
        $item->resturant_menu3 = $request->menuImg[2]['item'];

        $now = Carbon::now()->timezone('Asia/Taipei');
        $toDateString = $now->toDateString();
        $toTimeString = $now->toTimeString();
        $item->editdate = $toDateString;
        $item->edittime = $toTimeString;

        $item->save();

        $imageName[0] -> image1 = $request->img[0]['name'];
        $imageName[0] -> image2 = $request->img[1]['name'];
        $imageName[0] -> image3 = $request->img[2]['name'];
        $imageName[0] -> image4 = $request->img[3]['name'];
        $imageName[0] -> image5 = $request->img[4]['name'];

        $imageName[0] -> menu1 = $request->menuImg[0]['name'];
        $imageName[0] -> menu2 = $request->menuImg[1]['name'];
        $imageName[0] -> menu3 = $request->menuImg[2]['name'];

        foreach ($imageName as $imagename) {
            $imagename->save();
        }

        $OPtimes = Resturant_operating_time::where('resturant_id', $id)->get();
        $businessHours = $request->businessHours;
        $arrLength = count($OPtimes);
        
        if ($arrLength > 0) {
            foreach ($businessHours as $index => $businessHour) {
                if ($index < $arrLength) {
                    $OPtimes[$index]->isOpen = $businessHour['isOpen'];
                    $OPtimes[$index]->opentime = $businessHour['opentime'];
                    $OPtimes[$index]->closetime = $businessHour['closetime'];
                    $OPtimes[$index]->break_optime = $businessHour['breaktimeOP'];
                    $OPtimes[$index]->break_edtime = $businessHour['breaktimeED'];
                } else {
                    break;
                }
            }
        }

        foreach ($OPtimes as $OPtime) {
            $OPtime->save();
        }

        return response()->json(['status' => true]);

        // return response()->json(
        //     [
        //         'fromMySQL' => $item,
        //         'fromMySQLoptime' => $OPtimes,
        //         'fromMySQLimgName' => $imageName,
        //         'fromReact' => $request->menuImg
        //     ]
        // );

    }

}
