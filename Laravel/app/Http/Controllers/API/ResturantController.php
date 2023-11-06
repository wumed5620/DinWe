<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Resturant;
use App\Models\Email;
use App\Models\Resturant_operating_time;
use App\Models\Resturant_image_name;
use App\Models\Resturant_facility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Mail\RegEmail;
use App\Mail\TestEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;

class ResturantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $resturants = Resturant::take(4)->get();
        if($resturants){
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
        try {
            $validateUser = validator::make($request->all(), [
                'resturant_account'      => 'required|unique:resturants,resturant_account',
                'resturant_password'     => 'required',
                'resturant_name'         => 'required',
                'resturant_address'      => 'required|unique:resturants,resturant_address',
                'resturant_phone'        => 'required|unique:resturants,resturant_phone',
                'resturant_email'        => 'required',
            ]);

            //失敗後回傳並終止
            if ($validateUser->fails()) {
                return response()->json([
                    'status'    => false,
                    'message'   => '所有欄位必填',
                    'errors'    => $validateUser->errors()
                ], 401);
            }

            $resturant = Resturant::create([
                'resturant_account'    => $request->resturant_account,
                'resturant_password'   => Hash::make($request->resturant_password),
                'resturant_name'       => $request->resturant_name,
                'resturant_address'    => $request->resturant_address,
                'resturant_phone'      => $request->resturant_phone,
                'resturant_email'      => $request->resturant_email,
            ]);



            // $resturant = Resturant::where('resturant_account', $request->resturant_account)->first();

            if ($resturant) {
                $target = Resturant::where('resturant_account', $request->resturant_account)->get();
                $id = $target->pluck('resturant_id');
                $id = $id[0];

                Resturant_operating_time::create(['resturant_id' => $id, 'weekday' => '1']);
                Resturant_operating_time::create(['resturant_id' => $id, 'weekday' => '2']);
                Resturant_operating_time::create(['resturant_id' => $id, 'weekday' => '3']);
                Resturant_operating_time::create(['resturant_id' => $id, 'weekday' => '4']);
                Resturant_operating_time::create(['resturant_id' => $id, 'weekday' => '5']);
                Resturant_operating_time::create(['resturant_id' => $id, 'weekday' => '6']);
                Resturant_operating_time::create(['resturant_id' => $id, 'weekday' => '7']);

                $result2    = Resturant_image_name::create(['resturant_id' => $id]);
                $result3    = Resturant_facility::create(['resturant_id' => $id]);

                if ($target && $result2 && $result3) {
                    return response()->json([
                        'status'    => true,
                        'message'   => "7天內會有審核結果通知，請定期檢查您的信箱",
                        'id'        => $id
                    ], 200);
                } else {
                    return response()->json([
                        'status'    => false,
                        'message'   => "註冊失敗",
                        'id'        => $id
                    ], 401);
                }
            } else {
                $target = Resturant::where('resturant_account', $request->resturant_account)->get();
                $id = $target->pluck('resturant_id');
                return response()->json([
                    'status'    => false,
                    'message'   => "註冊失敗",
                    'id'        => $id
                ], 401);
            }
        } catch (\Throwable $th) {
            $target = Resturant::where('resturant_account', $request->resturant_account)->get();
            $id = $target->pluck('resturant_id');
            //throw $th;
            return response()->json([
                'status'    => false,
                'message'   => $th->getMessage(),
                'id'        => $id
            ], 500);
        }
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
    public function show($id)
    {
        //
        $restaurant = Resturant::select(
            "resturant_id",
            "resturant_name",
            "resturant_address",
            "resturant_uninum",
            "resturant_phone",
            "resturant_email",
            "resturant_image1",
            "resturant_image2",
            "resturant_image3",
            "resturant_image4",
            "resturant_image5",
            "resturant_menu1",
            "resturant_menu2",
            "resturant_menu3",
            "resturant_intro",
            "resturant_state",
            "resturant_averageconsum",
            "resturant_ifram",
            "resturant_max",
            "editdate",
            "edittime",
        )
            ->where('resturant_id', $id)
            ->get();

        return $restaurant; // 返回获取到的 Restaurant 模型对象
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function getAll()
    {
        //
        $resturants = Resturant::select(
            'resturant_id',
            'resturant_name',
            'resturant_account',
            'resturant_address',
            'resturant_phone',
            'resturant_email',
            'resturant_state'
        )
        ->get();

        if ($resturants) {
            return response()->json([
                'status'    => true,
                'message'   => 'success',
                'data'      => $resturants
            ], 200);
        } else {
            return response()->json([
                'status'    => false,
                'message'   => '無法取得'
            ], 401);
        }
    }

    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Resturant $resturant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function open(Request $request)
    {
        //
        try {
            $validateUser = validator::make($request->all(), [
                'resturant_account'     => 'required',
            ]);

            $resturant_account = explode("x", $request->resturant_account)[1];

            //失敗後回傳並終止
            if ($validateUser->fails()) {
                return response()->json([
                    'status'    => "1",
                    'message'   => '驗證錯誤',
                    'errors'    => $validateUser->errors(),
                    'id'        => $resturant_account
                ], 401);
            }

            //確認密碼相同，若失敗後回傳並終止

            $resturant = Resturant::where('resturant_account', $resturant_account)->first();
            if ($resturant) {
                // 修改特定欄位資料
                $resturant->resturant_state = 2;

                $resturant->save();
            }

            return response()->json([
                'status'            => true,
                'message'           => "更改成功",
                // 'token'          => $resturant->createToken('API TOKEN')->plainTextToken,
                'resturant_account' => $resturant_account
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status'    => false,
                'message'   => $th->getMessage(),
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $validateUser = validator::make($request->all(), [
                'resturant_account'    => 'required',
                'resturant_password'   => 'required'
            ]);

            if ($validateUser->fails()) {
                return response()->json([
                    'status'    => false,
                    'message'   => 'validation error',
                    'errors'    => $validateUser->errors()
                ], 401);
            }

            if (DB::table('resturants')->where('resturant_account', $request->resturant_account)->exists()) {
                $resturant = Resturant::where('resturant_account', $request->resturant_account)->first();
                $password = $resturant->resturant_password;

                // 確認密碼
                if ($resturant->resturant_state === 2) {
                    if (Hash::check($request->resturant_password, $password)) {
                        return response()->json([
                            'status'    => true,
                            'message'   => '登入成功',
                            'token'     => $resturant->createToken("API TOKEN")->plainTextToken,
                            'id'        => $resturant->resturant_id,
                        ], 200);
                    } else {
                        return response()->json([
                            'status' => false,
                            'message' => '帳號或密碼錯誤',
                            // 'inputpassword' => $request->resturant_password,
                            // 'hashpassword'  => $password,
                        ], 200);
                    }
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => '店家尚未通過審核',
                        // 'inputpassword' => $request->resturant_password,
                        // 'hashpassword'  => $password,
                    ], 200);
                }
            }else{
                return response()->json([
                    'status' => false,
                    'message' => '帳號不存在，請確認是否註冊',
                ], 200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status'    => false,
                'message'   => $th->getMessage()
            ], 500);
        }
    }

    public function sendMail(Request $request)
    {
        $resturant = Resturant::where('resturant_account', $request->resturant_account)->first();

        if ($resturant) {
            $emails = Email::create([
                'token_id' => "0x" . $request->resturant_account . "x2x85x66x",
            ]);

            $mailData = [
                "resturant_name" => $resturant->resturant_name,
                "url" => "http://127.0.0.1:3000/openStore/" . $resturant->createToken("API TOKEN")->plainTextToken . "/" . "0x" . $request->resturant_account . "x2x85x66x",
            ];

            Mail::to($resturant->resturant_email)->send(new RegEmail($mailData));
            return response()->json([
                'status'    => true,
                'message'   => "請檢查您的信箱",
                // 'token'     => $resturant->createToken("API TOKEN")->plainTextToken,
                // 'token'     => $resturant->createToken("API TOKEN")->plainTextToken,
            ], 200);
        } else {
            return response()->json([
                'status'    => false,
                'message'   => "驗證失敗",
                'account'   => $request->resturant_account,
                'resturant' => $resturant
            ], 401);
        }
    }

    public function getResetToken(Request $request)
    {
        $resturant = Resturant::where('resturant_account', $request->resturant_account)->first();

        if ($resturant) {
            $emails = Email::create([
                'token_id' => "0x" . $resturant->resturant_id . "x2x85x66x",
            ]);

            $mailData = [
                "帳號" => $request->resturant_account,
                "重設密碼網址" => "http://127.0.0.1:3000/resetStore/" . $resturant->createToken("API TOKEN")->plainTextToken . "/" . "0x" . $resturant->resturant_id . "x2x85x66x",
            ];

            Mail::to($resturant->resturant_email)->send(new TestEmail($mailData));
            return response()->json([
                'status'    => true,
                'message'   => "請檢查您的信箱",
            ], 200);
        } else {
            return response()->json([
                'status'    => false,
                'message'   => "查無此帳號"
            ], 401);
        }
    }

    public function resetPwd(Request $request)
    {
        $id = explode("x", $request->resturant_id)[1];
        try {
            $validateUser = validator::make($request->all(), [
                'resturant_password'     => 'required',
                'resturant_password2'    => 'required'
            ]);


            //失敗後回傳並終止
            if ($validateUser->fails()) {
                return response()->json([
                    'status'    => "1",
                    'message'   => '所有欄位必填',
                    'errors'    => $validateUser->errors(),
                    'id'        => $id,
                    'rID'       => explode("x", $request->resturant_id)
                ], 401);
            }

            //確認密碼相同，若失敗後回傳並終止
            if ($request->resturant_password !== $request->resturant_password2) {
                return response()->json([
                    'status'    => "2",
                    'message'   => "密碼不相等",
                    'id'        => $id,
                    'rID'       => explode("x", $request->resturant_id)
                ], 401);
            }

            $resturant = Resturant::where('resturant_id', $id)->first();
            $email = Email::where('token_id', $request->resturant_id)->first();

            if ($resturant && $email) {
                $resturant->resturant_password = Hash::make($request->resturant_password);
                $resturant->save();
            }

            return response()->json([
                'status'    => true,
                'message'   => "更改成功",
                'id'        => $id,
                'rID'       => explode("x", $request->resturant_id)
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status'    => false,
                'message'   => $th->getMessage(),
                'id'        => $id,
                'rID'       => explode("x", $request->resturant_id)
            ], 500);
        }
    }
}
