<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Member_like;
// use Illuminate\Support\Facades\DB;

class SearchIndexLike extends Controller
{
    public function index(Request $request)
  {
    $memberId = $request->input('member_id');
    $memberLikes = Member_like::where('member_id', $memberId)->get();
    return response()->json($memberLikes);
  }

    public function store(Request $request)
  {
    $validatedData = $request->validate([
      '*.member_id' => 'required',
      '*.resturant_id' => 'required',
    ]);

    foreach ($validatedData as $data) {
      // 搜尋是否已經存在相同的資料
      $existingData = Member_like::where('member_id', $data['member_id'])
        ->where('resturant_id', $data['resturant_id'])
        ->first();

      if (!$existingData) {
        // 若資料不存在，才新增資料
        $memberLike = new Member_like;
        $memberLike->member_id = $data['member_id'];
        $memberLike->resturant_id = $data['resturant_id'];
        $memberLike->save();
      }
    }
      return response()->json(['message' => 'Member likes created successfully'], 201);
  }

  public function destroy(Request $request)
  {
    $validatedData = $request->validate([
      'member_id' => 'required',
      'resturant_id' => 'required',
    ]);

    $deletedRows = Member_like::where([
      ['member_id', '=', $validatedData['member_id']],
      ['resturant_id', '=', $validatedData['resturant_id']],
    ])->delete();

    if ($deletedRows > 0) {
      return response()->json(['message' => 'Member like deleted successfully']);
    } else {
      return response()->json(['message' => 'No matching member like found']);
    }
  }
}
