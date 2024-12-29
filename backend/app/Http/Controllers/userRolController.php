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
        $userRol = userRol::where('userId', $id)->get();

        if (!$userRol) {
            return response()->json(['message' => 'user don`t find'], 404);
        }

        return response()->json(['user' => $userRol]);
    }

    public function postUserRol(Request $request){
        $validator = Validator::make($request->all(), [
            'userId' => 'required|integer',
            'rolId' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }else{
            $userRol = UserRol::create([
                'userId' => $request['userId'],
                'rolId' => $request['rolId']
            ]);
            return response()->json(['user' => $userRol], Response::HTTP_CREATED);
        }
    }

    public function deleteUserRolByIds($userId, $rolId)
    {
        $userRol = UserRol::where('userId', $userId)
                                ->where('rolId', $rolId)
                                ->first();

        if ($userRol) {
            $userRol->delete();
            return response()->json(['message' => 'Registro eliminado correctamente'], 200);
        } else {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }
    }
}
