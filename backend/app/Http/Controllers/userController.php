<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserRol;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;

class userController extends Controller
{
    public function getUser(){
        $user = User::all();
        return Response()->json(['user' => $user]);
    }

    public function getUserById($id){
        $user = user::find($id);

        if (!$user) {
            return response()->json(['message' => 'user don`t find'], 404);
        }

        return response()->json(['user' => $user]);
    }

    public function getUserByEmail($email){
        $user = user::where('email', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'user don`t find'], 404);
        }

        return response()->json(['user' => $user]);
    }

    public function postUser(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:5',
            'active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }else{
            $user = User::create([
                'name' => $request['name'],
                'email' => $request['email'],
                'password' => bcrypt($request['password']),
                'active' => $request['active']
            ]);
            return response()->json(['user' => $user], Response::HTTP_CREATED);
        }
    }

    public function putUser(Request $request, $id){
        $user = user::find($id);

        if (!$user) {
            return response()->json(['message' => 'user no encontrado'], 404);
        }

        $datosUser = [
            'name' => $request['name'],
            'email' => $request['email'],
            'active' => $request['active'],
            'score' => $request['score']
        ];

        if ($request->filled('password')) {
            $datosUser['password'] = bcrypt($request['password']);
        }

        $user->update($datosUser);

        return response()->json(['user' => $user], Response::HTTP_CREATED);
    }

    public function getIfEmailExist($email){
        $user = user::where('email', $email)->first();

        if ($user) {
            return response(1);
        }

        return response(0);
    }

    public function getUserOrderByScore(){
        $user = User::orderBy('score', 'desc')->take(10)->get();
        return response()->json(['user' => $user]);
    }

    public function getUsersWithUserRol(){
        $user = self::getUser();
        $userRol = UserRol::all();
        return response()->json(['user' => $user, 'userRol' => $userRol]);
    }

    public function getUsersExcludingId($id, $num)
    {
        $users = User::where('id', '!=', $id)->take($num)->get();

        if ($users->isEmpty()) {
            return response()->json(['message' => 'No users found'], 404);
        }

        return response()->json(['users' => $users]);
    }

    public function getUsersCantWithId($id, $cant)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $users = User::where('id', '!=', $id)->take($cant)->get();

        if ($users->isEmpty()) {
            return response()->json(['message' => 'No users found'], 404);
        }

        return response()->json(['user' => $user, 'user' => $users]);
    }
}
