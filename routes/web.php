<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Firstcontroller;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReadyMadeController;
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
    Route::get('/stitch_list', [OrderController::class, 'stitch_order_view'])->name('order_list');
    Route::get('/stitch_order_detail/{id}', [OrderController::class, 'stitch_order_fetch'])->name('view_order_details');
    Route::post('/order_stauts_save', [OrderController::class, 'order_stauts_save'])->name('order_stauts_save');
    Route::post('/save_advance_amount', [OrderController::class, 'save_advance_amount'])->name('save_advance_amount');
    Route::post('/delete_stitching_order', [OrderController::class, 'delete_stitching_order'])->name('delete_stitching_order');
    Route::get('/readymadesizelist', [ReadyMadeController::class, 'index'])->name('readymadesizelist');
    Route::get('/readymade_size_add', [ReadyMadeController::class, 'add_readymade_size'])->name('readymade_size_add');
    Route::post('/readymade_size_save', [ReadyMadeController::class, 'readymadesizesave'])->name('readymade_size_save');
    Route::get('/edit-readymadesize/{id}/{id2}', [ReadyMadeController::class, 'edit_readymadesize'])->name('edit-readymadesize');


});
