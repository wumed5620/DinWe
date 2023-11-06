<?php

namespace App\Http\Controllers\Api_enterprise;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use App\Models\Resturant;
use App\Models\Resturant_facility;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ResturantFacility extends Controller
{
    public function show($id) {
        // $user_account = auth() -> id();
        // $restaurant = User::find($user_account)->restaurant;
        // $id = $restaurant->id;

        $resturant = DB::select("call getResturantPandAvg(?)", [$id]);
        $payments = DB::select("call getResturantPayments(?)", [$id]);
        $services = DB::select("call getResturantServices(?)", [$id]);
        $facilities = DB::select("call getResturantFacilities(?)", [$id]);
        $foodCulture = DB::select("call getResturantFoodCulture(?)", [$id]);
        $resturant[0]->payments = $payments;
        $resturant[0]->services = $services;
        $resturant[0]->facilities = $facilities;
        $resturant[0]->foodCulture = $foodCulture;
        
        return response()->json($resturant);
    }

    public function update($id, Request $request)
    {
        $resturant = Resturant::findOrFail($id);
        $items = Resturant_facility::where('resturant_id', $id)->get();
        
        $resturant->resturant_max = $request->people;
        $resturant->resturant_averageconsum = $request->averagesum;
        $resturant->save();

        $payments = $request->payments;
        $services = $request->services;
        $facilities = $request->facilities;
        $foodCulture = $request->foodCulture;

        $items[0]->cash = $payments[0]['isChecked'];
        $items[0]->visa = $payments[1]['isChecked'];
        $items[0]->creditcard = $payments[2]['isChecked'];
        $items[0]->streetpay = $payments[3]['isChecked'];
        $items[0]->easycard = $payments[4]['isChecked'];
        $items[0]->linepay = $payments[5]['isChecked'];
        $items[0]->applepay = $payments[6]['isChecked'];
        $items[0]->googlepay = $payments[7]['isChecked'];
        $items[0]->taiwanpay = $payments[8]['isChecked'];

        $items[0]->alcohol = $services[0]['isChecked'];
        $items[0]->wifi = $services[1]['isChecked'];
        $items[0]->socket = $services[2]['isChecked'];
        $items[0]->smoking = $services[3]['isChecked'];
        $items[0]->childseat = $services[4]['isChecked'];
        $items[0]->childware = $services[5]['isChecked'];
        $items[0]->nursingroom = $services[6]['isChecked'];
        $items[0]->diaper = $services[7]['isChecked'];
        $items[0]->stroller = $services[8]['isChecked'];
        $items[0]->touristcard = $services[9]['isChecked'];
        $items[0]->shuttle = $services[10]['isChecked'];
        $items[0]->car = $services[11]['isChecked'];
        $items[0]->scotter = $services[12]['isChecked'];
        $items[0]->parkdiscount = $services[13]['isChecked'];
        $items[0]->venuerental = $services[14]['isChecked'];
        $items[0]->barrierfree = $services[15]['isChecked'];
        
        $items[0]->toy = $facilities[0]['isChecked'];
        $items[0]->slide = $facilities[1]['isChecked'];
        $items[0]->ballpit = $facilities[2]['isChecked'];
        $items[0]->sandpit = $facilities[3]['isChecked'];
        $items[0]->farm = $facilities[4]['isChecked'];
        $items[0]->lawn = $facilities[5]['isChecked'];
        $items[0]->animal = $facilities[6]['isChecked'];
        $items[0]->fishpond = $facilities[7]['isChecked'];
        $items[0]->ecopond = $facilities[8]['isChecked'];
        $items[0]->paddingpool = $facilities[9]['isChecked'];
        $items[0]->home = $facilities[10]['isChecked'];
        $items[0]->videogame = $facilities[11]['isChecked'];
        $items[0]->childrenbook = $facilities[12]['isChecked'];
        $items[0]->course = $facilities[13]['isChecked'];
        $items[0]->fullmoon = $facilities[14]['isChecked'];
        $items[0]->saliva = $facilities[15]['isChecked'];
        $items[0]->oneyear = $facilities[16]['isChecked'];
        $items[0]->sexparty = $facilities[17]['isChecked'];
        $items[0]->birthday = $facilities[18]['isChecked'];
        
        $items[0]->vegetarian = $foodCulture[0]['isChecked'];
        $items[0]->vegan = $foodCulture[1]['isChecked'];
        $items[0]->muslin = $foodCulture[2]['isChecked'];
        $items[0]->glutenfree = $foodCulture[3]['isChecked'];
        
                
        $now = Carbon::now()->timezone('Asia/Taipei');
        $toDateString = $now->toDateString();
        $toTimeString = $now->toTimeString();

        $items[0]->editdate = $toDateString;
        $items[0]->edittime = $toTimeString;

        foreach ($items as $item) {
            $item->save();
        }

        return response()->json($items);

    }

}
