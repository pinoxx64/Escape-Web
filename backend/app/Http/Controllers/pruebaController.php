<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Prueba;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class pruebaController extends Controller
{
    public function getPruebas(){
        $prueba = Prueba::all();
        return response()->json(['Prueba' => $prueba]);
    }

    public function getPruebaById($id){
        $prueba = Prueba::find($id);

        if (!$prueba) {
            return response()->json(['message' => 'Prueba don`t find'], 404);
        }

        return response()->json(['Prueba' => $prueba]);
    }

    public function postPrueba(Request $request){
        $validator = Validator::make($request->all(), [
            'question' => 'required|string|max:255',
            'answer' => 'required|string|max:255',
            'clue' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }else{
            $prueba = Prueba::create([
                'question' => $request['question'],
                'answer' => $request['answer'],
                'clue' => $request['clue']
            ]);
            return response()->json(['Prueba' => $prueba], Response::HTTP_CREATED);
        }
    }
}
