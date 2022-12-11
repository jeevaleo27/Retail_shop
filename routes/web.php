<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Firstcontroller;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Auth\LoginController;

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
 //Route::get("/",[Firstcontroller::class,'index']);

Route::get('/', function () {
    return redirect(route('login'));
});
/*Route::get('/', function () {
    return view('welcome');
});*/
/*    Route::get('/', [LoginController::class, 'index'])->name('home');*/


Route::middleware(['PreventBackHistory'])->group(function(){
    Auth::routes();

    Route::get('/home', [HomeController::class, 'index'])->name('home');


    Route::get('/school', [SchoolController::class, 'index'])->name('school');
    Route::get('/add_school', [SchoolController::class, 'add_school'])->name('add_school');
    Route::post('/schoolsave', [SchoolController::class, 'schoolsave'])->name('schoolsave');
    Route::get('/edit-school/{id}', [SchoolController::class, 'edit_school'])->name('edit-school');
    Route::get('/new_order', [OrderController::class, 'index'])->name('new_order');
    Route::post('/ordertbale', [OrderController::class, 'get_ordertable'])->name('ordertbale');
    Route::post('/saveorder_details', [OrderController::class, 'save_order_details'])->name('saveorder_details');


});
