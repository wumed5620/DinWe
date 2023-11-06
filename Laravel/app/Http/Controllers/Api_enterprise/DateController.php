<?php

namespace App\Http\Controllers\Api_enterprise;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class DateController extends Controller
{
    public function gettoday()
    {
        $today = DB::select("call getDBdate()");
        return response()->json($today);
    }
}
