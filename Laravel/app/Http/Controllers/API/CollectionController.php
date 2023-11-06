<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Member_like;
use App\Models\Member_tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CollectionController extends Controller
{
    public function getTags(Request $request) {
        $tags = Member_tag::where('member_id', '=', $request->member_id)
            ->where('enable', '>', 0)
            ->get(['tag_id', 'tag_name']);
        return response()->json($tags);
    }

    public function getResturants(Request $request) {
        $resturants = DB::select("select members.member_id, resturants.resturant_id, resturants.resturant_name, resturant_address, resturant_phone, resturant_image1 from members, member_likes, resturants where members.member_id = member_likes.member_id AND member_likes.resturant_id = resturants.resturant_id and members.member_id = ?", [$request->member_id]);
        
        return response()->json($resturants);
    }

    public function getTagsOnResturant(Request $request) {
        $tagsOnResturant = DB::select("select members.member_id, member_tags.tag_name, member_tag_resturants.tag_id, member_tag_resturants.resturant_id from members, member_tags, member_tag_resturants where member_tags.tag_id = member_tag_resturants.tag_id and members.member_id = member_tags.member_id and members.member_id = ? ", [$request->member_id]);

        return response()->json($tagsOnResturant);
    }

    public function setNewTags(Request $request) {
        $message = 'Done';
        DB::insert("insert into member_tags (tag_name, member_id, enable) values (?, ?, ?)", [$request->tag_name, $request->member_id, 1]);
        return response()->json($message);
    }

    public function deleteTags(Request $request) {
        $message = 'Done';
        DB::update("update member_tags set enable = 0 where tag_id = ?",
        [$request->tag_id]);
        return response()->json($message);
    }

    public function removeTags(Request $request) {
        $message = 'delete done';
        DB::delete("delete from member_tag_resturants where tag_id = ? and resturant_id = ?", [$request->tag_id, $request->resturant_id]);
        return response()->json($message);
    }

    public function addTags(Request $request) {
        $message = 'add done';
        DB::insert("insert into member_tag_resturants (tag_id, resturant_id) values (?, ?)", [$request->tag_id, $request->resturant_id]);
        return response()->json($message);
    }

    public function unlike(Request $request) {
        $message = '取消收藏';
        DB::delete("delete from member_likes where resturant_id = ? and member_id = ?", [$request->resturant_id, $request->member_id]);
        return response()->json($message);
    }
}
