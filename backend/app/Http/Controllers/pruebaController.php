<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Prueba;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class pruebaController extends Controller
{
    public function getPruebas()
    {
        $prueba = Prueba::all();
        return response()->json(['Prueba' => $prueba]);
    }

    public function getPruebaById($id)
    {
        $prueba = Prueba::find($id);

        if (!$prueba) {
            return response()->json(['message' => 'Prueba don`t find'], 404);
        }

        return response()->json(['Prueba' => $prueba]);
    }

    public function postPrueba(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'clue' => 'required|string',
            'answerSelect' => 'string',
            'active' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $prueba = Prueba::create([
                'question' => $request['question'],
                'answer' => $request['answer'],
                'clue' => $request['clue'],
                'answerSelect' => $request['answerSelect'],
                'active' => $request['active']
            ]);
            return response()->json(['Prueba' => $prueba], Response::HTTP_CREATED);
        }
    }

    public function putPrueba(Request $request, $id)
    {
        $prueba = Prueba::find($id);

        $prueba->question = $request['question'];
        $prueba->answer = $request['answer'];
        $prueba->clue = $request['clue'];
        $prueba->answerSelect = $request['answerSelect'];
        $prueba->active = $request['active'];
        $prueba->save();
        return response()->json(['Prueba' => $prueba], Response::HTTP_OK);
    }
}   
