<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Index;

use Illuminate\Support\Facades\App;

Route::get('/lang/{locale}', function ($locale) {
    if (!in_array($locale, ['ru', 'en'])) {
    }
 
    App::setLocale($locale);
});

Route::get('/', [Index::class, 'Catalog']);
Route::get('/{name}', [Index::class, 'Catalog']);
Route::get('/s/rules', [Index::class, 'Rules']);
Route::get('/s/addbase', [Index::class, 'AddBase']);
Route::get('/c/{name}', [Index::class, 'showCard']);