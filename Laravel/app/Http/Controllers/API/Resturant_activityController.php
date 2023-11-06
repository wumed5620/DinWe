<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Resturant_activity;
use Illuminate\Http\Request;

class Resturant_activityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id){
        $result = Resturant_activity::where('resturant_id', $id)->get();
        return $result;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function get3activities()
    {
        $result = Resturant_activity::inRandomOrder()->limit(3)->get();
        return $result;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Resturant_activity $resturant_activity)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Resturant_activity $resturant_activity)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Resturant_activity $resturant_activity)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resturant_activity $resturant_activity)
    {
        //
    }
}
