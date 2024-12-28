<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\UserRol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class userRolController extends Controller
{
    public function getUserRol(){
        $userRol = UserRol::all();
        return Response()->json(['user' => $userRol]);
    }

    public function getUserRolByUserId($id){
        $userRol = userRol::find($id);

        if (!$userRol) {
            return response()->json(['message' => 'user don`t find'], 404);
        }

        return response()->json(['user' => $userRol]);
    }

    public function postUserRol(Request $request){
        $validator = Validator::make($request->all(), [
            
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }else{
            $userRol = UserRol::create([

            ]);
            return response()->json(['user' => $userRol], Response::HTTP_CREATED);
        }
    }

    public function putUserRol(Request $request, $id){
        $userRol = userRol::find($id);

        if (!$userRol) {
            return response()->json(['message' => 'user no encontrado'], 404);
        }

        $datosUserRol = [

        ];

        $userRol->update($datosUserRol);

        return response()->json(['user' => $userRol], Response::HTTP_CREATED);
    }
}
