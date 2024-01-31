<?php

use App\Http\Controllers\HolidayController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/get-holidays', [HolidayController::class, 'getHolidays']);
Route::post('/store-holiday', [HolidayController::class, 'storeHoliday']);
Route::put('/holidays/{id}', [HolidayController::class, 'updateHoliday']);
Route::get('/get-countries', [HolidayController::class, 'getCountries']);
Route::get('/holidays', [HolidayController::class, 'getHolidaysFromTable']);
Route::get('/stored-holiday-days', [HolidayController::class, 'getHolidaysDateFromTable']);
