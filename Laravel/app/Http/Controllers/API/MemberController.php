<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\User;
use App\Models\Email;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\StoreMemberRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
use App\Mail\TestEmail;
use Illuminate\Support\Facades\Mail;



class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param Request $request
     * @return User
     */

    public function register(Request $request)
    {
        //驗證所需欄位
        try {
            $validateUser = validator::make($request->all(), [
                'member_account'      => 'required|unique:members,member_account',
                'member_password'     => 'required',
                'member_name'         => 'required',
                'member_birthday'     => 'required',
                'member_email'        => 'required',
            ]);

            //失敗後回傳並終止
            if ($validateUser->fails()) {
                return response()->json([
                    'status'    => false,
                    'message'   => '所有欄位必填',
                    'errors'    => $validateUser->errors()
                ], 401);
            }

            $member = Member::create([
                'member_account'    => $request->member_account,
                'member_password'   => Hash::make($request->member_password),
                'member_name'       => $request->member_name,
                'member_birthday'   => $request->member_birthday,
                'member_email'      => $request->member_email,
                'member_cellphone'  => $request->member_account
            ]);

            if ($member) {
                return response()->json([
                    'status'    => true,
                    'message'   => "註冊成功",
                    // 'token'     => $member->createToken('API TOKEN')->plainTextToken,
                ], 200);
            }else{
                return response()->json([
                    'status'    => false,
                    'message'   => "註冊失敗"
                ], 401);
            }
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status'    => false,
                'message'   => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'status'    => true,
            'message'   => "註冊成功"
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function login(Request $request)
    {
        try {
            $validateUser = validator::make($request->all(), [
                'member_account'    => 'required',
                'member_password'   => 'required'
            ]);

            if ($validateUser->fails()) {
                return response()->json([
                    'status'    => false,
                    'message'   => 'validation error',
                    'errors'    => $validateUser->errors()
                ], 401);
            }

            if (DB::table('members')->where('member_account', $request->member_account)->exists()) {
                $member = Member::where('member_account', $request->member_account)->first();
                $password = $member->member_password;

                // id 加密解密
                // $ency = Crypt::encryptString($member->member_id);
                // $ori = substr(Crypt::decryptString($ency),0,-1) ;

                // 確認密碼
                if (Hash::check($request->member_password, $password) && $member->member_state === 9) {
                    return response()->json([
                        'status'    => true,
                        'message'   => '登入成功',
                        'token'     => $member->createToken("API TOKEN")->plainTextToken,
                        'id'        => $member->member_id,
                        'god'       => 'yes',
                    ], 200);
                } elseif (Hash::check($request->member_password, $password)) {
                    return response()->json([
                        'status'    => true,
                        'message'   => '登入成功',
                        'token'     => $member->createToken("API TOKEN")->plainTextToken,
                        'id'        => $member->member_id,
                    ], 200);
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => '帳號或密碼錯誤',
                        'inputpassword' => $request->member_password,
                        'hashpassword'  => $password,
                    ], 401);
                }
            }else{
                return response()->json([
                    'status' => false,
                    'message' => '帳號不存在，請確認是否註冊',
                ], 200);
            }

            // 原生方法對應的為users資料表，透過修改auth.php仍無法指向到members資料表
            // if(!Auth::attempt($request->only(['member_account', 'member_password']), true, 'members')){
            //     return response()->json([
            //         'status'    => false,
            //         'message'   => '帳號或密碼錯誤'
            //     ], 401);
            // }




        } catch (\Throwable $th) {
            return response()->json([
                'status'    => false,
                'message'   => $th->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {

        try {
            $token = $request->token;
            $result = explode("|", $token);
            $id = $result[0];
            $result = DB::table('personal_access_tokens')->where('id', $id)->delete();
            // return response()->json([
            //     'status'    => true,
            //     'message'   => "登出成功",
            //     'id'        => $result
            // ], 200);
            if ($result > 0) {
                return response()->json([
                    'status'    => true,
                    'message'   => "登出成功"
                ], 200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status'    => false,
                'message'   => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function show(Request $request)
    {
        //
        $validateUser = validator::make($request->all(), [
            'member_id'    => 'required',
        ]);

        if ($validateUser->fails()) {
            return response()->json([
                'status'    => false,
                'message'   => 'validation error',
                'errors'    => $validateUser->errors(),
                'id'        => $request->member_id
            ], 401);
        }

        $member = Member::where('member_id',$request->member_id)
            ->select(
                'member_id',
                'member_image',
                'member_email',
                'member_name',
                'member_birthday',
                'member_cellphone',
                'member_account')
            ->first();
        if ($member) {

            return response()->json([
                'status'    => true,
                'message'   => "取得成功",
                'data'      => $member,
            ], 200);
        } else {
            return response()->json([
                'status'    => false,
                'message'   => "更新失敗",
                'data'      => $member,
            ], 200);
            // 找不到 ID 為 1 的 Member 資料
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateInfo(Request $request, Member $member)
    {
        //

        try {
            $member = Member::find($request->member_id); // 取得 ID 為 1 的 Member 物件
            if ($member) {
                $member->member_name = $request->member_name;
                $member->member_birthday = $request->member_birthday;
                $member->member_email = $request->member_email;
                $member->member_image = $request->member_image;
                $member->save();
                return response()->json([
                    'status'    => true,
                    'message'   => "更新成功",
                    'member_name' => $request->member_name,
                    'member_birthday' => $request->member_birthday,
                    'member_email' => $request->member_email,
                    'member_id' => $request->id,
                    
                ], 200);
                // ...
            } else {
                return response()->json([
                    'status'    => false,
                    'message'   => "更新失敗",
                    'id'        => $request->member_id
                ], 200);
                // 找不到 ID 為 1 的 Member 資料
            }
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status'    => false,
                'message'   => $th->getMessage(),
                'id'        => $request->member_id
            ], 500);
        }
    }

    public function getResetToken(Request $request)
    {
        $member = Member::where('member_account', $request->member_account)->first();
        // $token = $member->createToken('API TOKEN')->plainTextToken;


        // dd("Mail Sent Successfully!");
        if ($member) {
            $emails = Email::create([
                'token_id' => "0x" . $member->member_id . "x2x85x66x",
            ]);

            $mailData = [
                "帳號" => $request->member_account,
                "重設密碼網址" => "http://127.0.0.1:3000/resetPwd/" . $member->createToken("API TOKEN")->plainTextToken . "/" . "0x" . $member->member_id . "x2x85x66x",
            ];
            Mail::to($member->member_email)->send(new TestEmail($mailData));
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
        try {
            $validateUser = validator::make($request->all(), [
                'member_password'     => 'required',
                'member_password2'    => 'required'
            ]);

            $id = explode("x", $request->member_id)[1];

            //失敗後回傳並終止
            if ($validateUser->fails()) {
                return response()->json([
                    'status'    => "1",
                    'message'   => '所有欄位必填',
                    'errors'    => $validateUser->errors(),
                ], 401);
            }

            //確認密碼相同，若失敗後回傳並終止
            if ($request->member_password !== $request->member_password2) {
                return response()->json([
                    'status'    => "2",
                    'message'   => "密碼不相等",
                ], 401);
            }

            $member = Member::where('member_id', $id)->first();
            $email = Email::where('token_id', $request->member_id)->first();

            if ($member && $email) {
                $member->member_password = Hash::make($request->member_password);
                $member->save();
            }

            return response()->json([
                'status'    => true,
                'message'   => "更改成功",
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status'    => false,
                'message'   => $th->getMessage(),
                'id'        => $id
            ], 500);
        }

    }

    public function changePwd(Request $request){
        try {
            $validateUser = validator::make($request->all(), [
                'member_password'     => 'required',
                'member_password2'     => 'required',
                'member_password3'    => 'required'
            ]);

            // $id = explode("x", $request->member_id)[1];
            $id = $request->member_id;

            //失敗後回傳並終止
            if ($validateUser->fails()) {
                return response()->json([
                    'status'    => "1",
                    'message'   => '所有欄位必填',
                    'errors'    => $validateUser->errors(),
                    'id'        => $id
                ], 401);
            }

            //確認密碼相同，若失敗後回傳並終止
            if ($request->member_password2 !== $request->member_password3) {
                return response()->json([
                    'status'    => "2",
                    'message'   => "密碼不相等",
                    'id'        => $id
                ], 401);
            }

            $member = Member::find($id);
            if ($member && Hash::check($request->member_password,$member->member_password)) {
                $member->member_password = Hash::make($request->member_password2);
                $member->save();
                return response()->json([
                    'status'    => true,
                    'message'   => '更改成功',
                    'id'        => $id
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => '未知錯誤',
                    'member'    => $member,

                ], 401);
            }

        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status'    => false,
                'message'   => $th->getMessage(),
                'id'        => $id
            ], 500);
        }

    }

    public function destroy(Request $request){
        try {
            $member = Member::where('member_id',$request->member_id)->first(); // 取得 ID 為 1 的 Member 物件
            if ($member) {
                $member->member_state = 0;
                $member->save();
                return response()->json([
                    'status'    => true,
                    'message'   => "註銷成功，感謝您過去對於平台的支持，隨時歡迎您重新回來申辦帳號",
                    'id'        => $request->member_id
                ], 200);
                // ...
            } else {
                return response()->json([
                    'status'    => false,
                    'message'   => "註銷失敗",
                    'id'        => $request->member_id
                ], 200);
                // 找不到 ID 為 1 的 Member 資料
            }

        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status'    => false,
                'message'   => $th->getMessage(),
                'id'        => $request->member_id
            ], 500);
        }
    }
}
