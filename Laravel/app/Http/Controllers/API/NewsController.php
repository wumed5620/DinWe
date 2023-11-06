<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use PhpParser\Node\Stmt\TryCatch;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try {
            $news = News::orderBy('id', 'desc')->get();
            if ($news) {
                return response()->json([
                    'status'    => true,
                    'message'   => "取得成功",
                    'data'      => $news,
                ], 200);
            }else{
                return response()->json([
                    'status'    => true,
                    'message'   => "取得成功",
                    'data'      => $news,
                ], 200);
            }
            //code...
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status'    => false,
                'message'   => "取得成功",
                'data'      => $news,
                'error'     => $th
            ], 200);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function getput()
    {
        try {
            $news = News::where('state',1)->orderBy('id', 'desc')->get();
            if ($news) {
                return response()->json([
                    'status'    => true,
                    'message'   => "取得成功",
                    'data'      => $news,
                ], 200);
            }else{
                return response()->json([
                    'status'    => true,
                    'message'   => "取得成功",
                    'data'      => $news,
                ], 200);
            }
            //code...
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status'    => false,
                'message'   => "取得成功",
                'data'      => $news,
                'error'     => $th
            ], 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $title = $request->title;
        $text = $request->content;
        $state = $request->state;
        $subtitle = $request->subtitle;
        $resturant_id = $request->resturant_id;
        $resturant_name = $request->resturant_name;

        $dateTimeStr = Carbon::now()->toDateTimeString();
        $created_at = $dateTimeStr;
        $updated_at = $dateTimeStr;


        if (isset($request->image)) {

            $image = $request->image;
            $result = DB::table('news')->insert([
                'title'             => $title,
                'resturant_id'      => $resturant_id,
                'resturant_name'    => $resturant_name,
                'text'              => $text,
                'subtitle'          => $subtitle,
                'image'             => $image,
                'state'             => $state,
                'created_at'        => $created_at,
                'updated_at'        => $updated_at,
            ]);

            if ($result) {

                return response()->json([
                    'status'    => true,
                    'message'   => "上傳廣告成功",
                    'title'         => $title,
                    'text'          => $text,
                    'subtitle'      => $subtitle,
                    'image'         => $image,
                    'state'         => $state,
                    'created_at'    => $created_at,
                    'updated_at'    => $updated_at,
                    // 'token'     => $member->createToken('API TOKEN')->plainTextToken,
                ], 200);
            } else {
                return response()->json([
                    'status'    => false,
                    'message'   => "上傳廣告成功",
                    'title'         => $title,
                    'text'          => $text,
                    'subtitle'      => $subtitle,
                    'image'         => $image,
                    'state'         => $state,
                    'created_at'    => $created_at,
                    'updated_at'    => $updated_at,
                    // 'token'     => $member->createToken('API TOKEN')->plainTextToken,
                ], 200);
            }
        } else {

            $image = null;
            $result = DB::table('news')->insert([
                'title'     => $title,
                'text'      => $text,
                'image'    => $image,
                'state'     => $state,
                'created_at'    => $created_at,
                'updated_at'    => $updated_at,
            ]);

            if ($result) {
                return response()->json([
                    'status'    => true,
                    'message'   => "上傳成功",
                    'title'     => $title,
                    'text'      => $text,
                    'image'    => $image,
                    'state'     => $state,
                    'created_at'    => $created_at,
                    'updated_at'    => $updated_at,
                    // 'token'     => $member->createToken('API TOKEN')->plainTextToken,
                ], 200);
            } else {
                return response()->json([
                    'status'    => false,
                    'message'   => "上傳失敗",
                    'title'     => $title,
                    'text'      => $text,
                    'image'    => $image,
                    'state'     => $state,
                    'created_at'    => $created_at,
                    'updated_at'    => $updated_at,
                    // 'token'     => $member->createToken('API TOKEN')->plainTextToken,
                ], 200);
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
        $updated_at = Carbon::now()->toDateTimeString();

        try {
            $news = News::find($request->id); // 取得 ID 為 $request->id 的資料
            if ($news) {
                $news->image        = $request->image;
                $news->title        = $request->title;
                $news->subtitle     = $request->subtitle;
                $news->text         = $request->text;
                $news->state        = $request->state;
                $news->updated_at   = $updated_at;
                $news->save();
                return response()->json([
                    'status'    => true,
                    'message'   => "更新成功",
                ], 200);
                // ...
            } else {
                return response()->json([
                    'status'    => false,
                    'message'   => "更新失敗",
                ], 200);
                // 找不到 ID 為 $request->id 的資料
            }
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status'    => false,
                'message'   => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        //
    }
}
