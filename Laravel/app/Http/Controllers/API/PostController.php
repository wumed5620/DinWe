<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $post = Post::all();
        //
        return response()->json([
            'status'    => true,
            'posts'     => $post
        ],200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        //
        $post = Post::create($request->all());

        return response()->json([
            'status'    => true,
            'message'   => "Post Created Seccussly",
            'post'      => $post
        ],200);
        // dd($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorePostRequest $request, Post $post)
    {
        //
        $post->update($request->all());

        return response()->json([
            'status'    => true,
            'message'   => "Post Updated Seccussly",
            'post'      => $post
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
        $post->delete();

        return response()->json([
            'status'    => true,
            'message'   => "Post Deleted successfully",
        ], 200);
    }
}
