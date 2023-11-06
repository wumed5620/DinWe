<?php
namespace App\Http\Controllers\Api;

//admin
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\ResturantController;
use App\Http\Controllers\Api\Resturant_facilityController;
use App\Http\Controllers\Api\Resturant_activityController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\Member_likeController;
use App\Models\Member_like;

//enterprise
use App\Http\Controllers\Api_enterprise\ResturantInfoController;
use App\Http\Controllers\Api_enterprise\ResturantFacility;
use App\Http\Controllers\Api_enterprise\ResturantOrderComment;
use App\Http\Controllers\Api_enterprise\ResturantActivity;
use App\Http\Controllers\Api_enterprise\ResturantOrders;
use App\Http\Controllers\Api_enterprise\DateController;

//search
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\http\Controllers\API\SearchIndexPost;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//admin---------------------------
// 會員
Route::post('/register', [MemberController::class, 'register']); //註冊
Route::post('/login', [MemberController::class, 'login']); //登入
Route::post('/logout', [MemberController::class, 'logout']); //消滅token
Route::post('/updateInfo',[MemberController::class, 'updateInfo']); //更新基本資料
Route::post('/getResetToken', [MemberController::class, 'getResetToken']); //取得重設信件
Route::post('/resetPwd', [MemberController::class, 'resetPwd'])->middleware('auth:sanctum'); //接受前端重設密碼

// 訂單
Route::post('/order/submit', [OrderController::class, 'create']); //訂單建立
Route::get('/order/getComments/{id}', [OrderController::class, 'getComments']); //

// 餐廳
Route::post('/regStore', [ResturantController::class, 'create']); //註冊店家p
Route::post('/loginStore', [ResturantController::class, 'login']);
Route::post('/openStore', [ResturantController::class, 'open']);
Route::post('/sendMail', [ResturantController::class, 'sendMail']); //後臺發信用
Route::get('/getAllStore', [ResturantController::class, 'getAll']); //後台取得店家審核資料
Route::get('/getRes/{id}', [ResturantController::class, 'show']); //store頁面渲染用
Route::post('/storeToken', [ResturantController::class, 'getResetToken']); //店家重設密碼申請
Route::post('/resetStore', [ResturantController::class, 'resetPwd'])->middleware('auth:sanctum');

Route::get('/getActivity/{id}',[Resturant_activityController::class, 'index']); //取得餐廳活動(store頁面渲染用)
Route::get('/facilitiesStore/{id}', [Resturant_facilityController::class, 'show']); //取得餐廳設施(store頁面渲染用)
Route::get('/getlike/{memId}/{resId}', [Member_likeController::class, 'getlike']); //取得收藏店家
Route::get('/get3activities', [Resturant_activityController::class, 'get3activities']); //取得收藏店家
Route::post('/likeStore', [Member_likeController::class, 'likeStore']); //收藏店家
Route::post('/unLikeStore', [Member_likeController::class, 'unLikeStore']); //不收藏店家


// 範例
Route::post('/auth/register', [AuthController::class, 'createUser']);
Route::post('/auth/login', [AuthController::class, 'loginUser']);

// 管理員
Route::post('/storeNews',[NewsController::class, 'store']);
Route::post('/updateNews',[NewsController::class, 'update']);
Route::get('/getNews',[NewsController::class, 'index']);
Route::get('/getput',[NewsController::class, 'getput']);

//search---------------------------
Route::get('/searchindexget', [SearchIndexGet::class, 'index']);
Route::post('/searchindexpost', [SearchIndexLike::class, 'store']);
Route::delete('/searchindexdelete', [SearchIndexLike::class, 'destroy']);
Route::get('/searchindexlikeget', [SearchIndexLike::class, 'index']);
// Route::get('/searchindextime', [SearchIndextime::class, 'index']);

//member---------------------------
Route::post('/member/collection/tags', [CollectionController::class, 'getTags']);
Route::post ('/member/collection/resturants', [CollectionController::class, 'getResturants']);
Route::post ('/member/collection/tagsOnResturant', [CollectionController::class, 'getTagsOnResturant']);
Route::post('/member/collection/edit', [CollectionController::class, 'setNewTags']);
Route::put('/member/collection/delete', [CollectionController::class, 'deleteTags']);
Route::delete('/member/collection/remove', [CollectionController::class, 'removeTags']);
Route::post('/member/collection/add', [CollectionController::class, 'addTags']);
Route::delete('/member/collection/unlike', [CollectionController::class, 'unlike']);

Route::post('/member/orders', [OrderController::class, 'getOrders']);
Route::put('/member/orders/cancel', [OrderController::class, 'cancelOrders']);
Route::put('/member/orders/mod', [OrderController::class, 'modOrders']);
Route::post('/member/orderdones', [OrderController::class, 'getOrderDones']);
Route::put('/member/orderdones/addcomment', [OrderController::class, 'addComment']);
Route::post('/member/changePwd',[MemberController::class,'changePwd']);
Route::post('/member/updateInfo',[MemberController::class,'updateInfo']);
Route::post('/member/show',[MemberController::class,'show']);
Route::post('/member/destroy',[MemberController::class,'destroy']);
Route::post('/member/logout',[MemberController::class,'logout']);

//enterprise---------------------------
Route::get('/enterprise/getDBdate', [DateController::class, 'gettoday']);
Route::get('/enterprise/getResturantName/{id}', [ResturantInfoController::class, 'getName']);

Route::get('/enterprise/getInfo/{id}', [ResturantInfoController::class, 'show']);
Route::put('/enterprise/updateInfo/{id}', [ResturantInfoController::class, 'update']);

Route::get('/enterprise/getfacility/{id}', [ResturantFacility::class, 'show']);
Route::put('/enterprise/updatefacility/{id}', [ResturantFacility::class, 'update']);

Route::get('/enterprise/getcomment/{id}', [ResturantOrderComment::class, 'show']);
Route::get('/enterprise/gettotal/{id}', [ResturantOrderComment::class, 'selectAll']);

Route::get('/enterprise/getactivity/{id}', [ResturantActivity::class, 'show']);
Route::put('/enterprise/updateactivity/{id}', [ResturantActivity::class, 'update']);
Route::put('/enterprise/deleteactivity/{id}', [ResturantActivity::class, 'delete']);
Route::post('/enterprise/addactivity/{id}', [ResturantActivity::class, 'create']);

Route::get('/enterprise/getOrders/{id}', [ResturantOrders::class, 'show']);
Route::put('/enterprise/updateOrder/{id}', [ResturantOrders::class, 'update']);
Route::put('/enterprise/updateOrderstate/{id}', [ResturantOrders::class, 'updatestate']);
// Route::put('/enterprise/updateOrderseat/{id}', [ResturantOrders::class, 'updateseat']);
// Route::put('/enterprise/updateOrderpaid/{id}', [ResturantOrders::class, 'updatepaid']);
// Route::put('/enterprise/cancelOrder/{id}', [ResturantOrders::class, 'cancel']);
Route::post('/enterprise/addOrder/{id}', [ResturantOrders::class, 'create']);
