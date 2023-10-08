<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['json.response']], function () {
    Route::post('getCountries', [Api::class, 'getCountries']);
    Route::post('getCategories', [Api::class, 'getCategories']);
    Route::post('addRatingCategory', [Api::class, 'addRatingCategory']);
    Route::post('addBase', [Api::class, 'addBase']);
});

Route::any('{any}', function(){
    return response()->json([
        'status'    => false,
        'message'   => 'Page Not Found.',
    ], 404);
})->where('any', '.*');
