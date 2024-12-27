<?php

use App\Http\Controllers\userController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('user')->group(function () {
    Route::get('/', [userController::class, 'getUser']);
    Route::get('/{id}', [userController::class, 'getUserById']);
    Route::get('/{email}', [userController::class, 'getUserById']);
    Route::post('/', [userController::class, 'postUser']);
    Route::put('/{id}', [userController::class, 'putUser']);
});
