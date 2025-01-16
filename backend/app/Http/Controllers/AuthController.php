<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request){
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:5',
            'active' => 'boolean'
        ];
        $messages = [
            'unique' => 'El :attribute ya está registrado.',
            'email' => 'Debe ser un correo electrónico válido.',
            'same' => 'Las contraseñas no coinciden.',
            'required' => 'El campo :attribute es obligatorio.'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $input = $request->all();
            $input['password'] = bcrypt($input['password']);
            $input['active'] = 0;

            $user = User::create($input);
            $user->remember_token = $user->createToken('LaravelSanctumAuth', ['alumno'])->plainTextToken;

            DB::table('UserRol')->insert([
                'userId' => $user->id,
                'rolId' => 2,
            ]);

            return response()->json([
                "success" => true,
                "data" => [
                    'token' => $user->remember_token,
                    'name' => $user->name,
                    'id' => $user->id,
                    'active' => $user->active,
                ],
                "message" => "Usuario registrado correctamente",
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en el registro: ' . $e->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            $usuarioRoles = DB::table('userRol')
                ->where('userId', $user->id)
                ->pluck('rolId')
                ->toArray();

            $abilities = [];

            foreach ($usuarioRoles as $rol) {
                switch ($rol) {
                    case 1:
                        $abilities[] = 'admin';
                        break;
                    case 2:
                        $abilities[] = 'user';
                        break;
                    case 3:
                        $abilities[] = 'almirante';
                        break;
                    case 4:
                        $abilities[] = 'editor';
                        break;
                    default:
                        break;
                }
            }

            $token = $user->createToken('access_token', $abilities)->plainTextToken;

            $success = [
                'token' => $token,
                'id' => $user->id,
                'nombre' => $user->name,
                'abilities' => $abilities
            ];

            return response()->json(["success" => true, "data" => $success, "message" => "¡Has iniciado sesión!"]);
        } else {
            return response()->json(["success" => false, "message" => "No autorizado"], 401);
        }
    }

    public function logout(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        try {
            if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                $user = Auth::user();
                $cantidad = $user->tokens()->delete();

                return response()->json(["success" => true, "message" => "Tokens quitados: " . $cantidad], 200);
            } else {
                return response()->json(["error" => "No autorizado"], 401);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en el logout: ' . $e->getMessage()], 500);
        }
    }
}
