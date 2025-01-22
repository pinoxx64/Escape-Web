<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Rol;
use Illuminate\Http\Request;

class rolController extends Controller
{
    public function getRol(){
        $rol = Rol::all();
        return Response()->json(['rol' => $rol]);
    }

    public function getRolById($id){
        $rol = Rol::find($id);

        if (!$rol) {
            return response()->json(['message' => 'rol don`t find'], 404);
        }

        return response()->json(['rol' => $rol]);
    }
}
