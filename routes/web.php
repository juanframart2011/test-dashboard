<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {

    $data["metaTitle"] = "Login";
    return view( 'welcome', $data );
})->name( "home" );

Route::post( 'login', [ 'as' => 'login', 'uses' => 'App\Http\Controllers\User@login' ] );
Route::get( 'logout', [ 'as' => 'logout', 'uses' => 'App\Http\Controllers\User@logout' ] );

Route::group(['prefix' => 'admin', 'middleware' => 'validAdmin'], function(){

    Route::get( 'dashboard', [ 'as' => 'dashboard', 'uses' => 'App\Http\Controllers\Home@home' ] );

    //require __DIR__ . '/availability.php';
    //require __DIR__ . '/user.php';
});