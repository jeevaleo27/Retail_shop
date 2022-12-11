<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class OrderModel extends Model
{
    use HasFactory;

    Protected function getOrderID(){
    $users = DB::table('mOrder')->select('*')->get();
        return $users;
    }

    Protected function save_customer($customer_details){

        $Customer =  DB::table('tCustomer')->insertGetId($customer_details);
        return $Customer;
    }

    Protected function save_order($Order_detail){
        $orderUID =  DB::table('mOrder')->insertGetId($Order_detail);
        return $orderUID;
    }

    Protected function save_order_type($order_type_details){

        $orderUID =  DB::table('mOrderDetails')->insertGetId($order_type_details);
        return $orderUID;
    }
}