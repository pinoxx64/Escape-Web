<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\rolController;
use App\Http\Controllers\userController;
use App\Http\Controllers\userRolController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('user')->group(function () {
    Route::get('/', [userController::class, 'getUser']);
    Route::get('/{id}', [userController::class, 'getUserById']);
    Route::get('/email/{email}', [userController::class, 'getUserByEmail']);
    Route::post('/', [userController::class, 'postUser']);
    Route::put('/{id}', [userController::class, 'putUser']);

    Route::get('/emailExist/{email}', [userController::class, 'getIfEmailExist']);
});
Route::prefix('userScore')->group(function () {
    Route::get('/', [userController::class, 'getUserOrderByScore']);
});


Route::prefix('rol')->group(function () {
    Route::get('/', [rolController::class, 'getRol']);
    Route::get('/{id}', [rolController::class, 'getRolById']);
});

Route::prefix('userRol')->group(function () {
    Route::get('/', [userRolController::class, 'getUserRol']);
    Route::get('/user/{id}', [userRolController::class, 'getUserRolByUserId']);
    Route::get('/rol/{id}', [userRolController::class, 'getUserRolByRolId']);
    Route::post('/', [userRolController::class, 'postUserRol']);
    Route::delete('/{userId}/{rolId}', [userRolController::class, 'deleteUserRolByIds']);
});

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('logout', [AuthController::class, 'logout']);
