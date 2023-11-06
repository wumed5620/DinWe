<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Create User
     * @param Request $request
     * @return User
     */

    public function createUser(Request $request)
    {

        try {
            // validated
            $validateUser = validator::make($request->all(), [
                'name'      => 'required',
                'email'     => 'required|email|unique:users,email',
                'password'  => 'required'
            ]);

            if ($validateUser->fails()) {
                return response()->json([
                    'status'    => false,
                    'message'   => 'validation error',
                    'errors'    => $validateUser->errors()
                ], 401);
            }

            $user = User::create([
                'name'      => $request->name ,
                'email'     => $request->email,
                'password'  => Hash::make($request->password)
            ]);

            return response()->json([
                'status'    => true,
                'message'   => 'User Created Successfully',
                'token'     => $user->createToken("API TOKEN")->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            //throw $th;

            return response()->json([
                'status'    => false,
                'message'   => $th->getMessage()
            ], 500);
        }
    }

    public function loginUser(Request $request){
        try {
            $validateUser = validator::make($request->all(), [
                'email'     => 'required|email',
                'password'  => 'required'
            ]);

            if ($validateUser->fails()) {
                return response()->json([
                    'status'    => false,
                    'message'   => 'validation error',
                    'errors'    => $validateUser->errors()
                ], 401);
            }

            if(!Auth::attempt($request->only(['email','password' ]))){
                return response()->json([
                    'status'    => true,
                    'message'   => 'Email & Password does not match with our record'
                ], 401);
            }

            $user = User::where('email', $request->email)->first();

            return response()->json([
                'status'    => true,
                'message'   => 'User Logged In Successfully',
                'token'     => $user->createToken("API TOKEN")->plainTextToken
            ], 200);
        } catch (\Throwable $th) {

            return response()->json([
                'status'    => false,
                'message'   => $th->getMessage()
            ], 500);
        }
    }
}
