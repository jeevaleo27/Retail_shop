<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use Validator;

class Productcontroller extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function product(){

        $this->data['page_number']=9;
        $this->data['product'] = Product::getproduct();
        return view('product/product_list',$this->data);
    }

    public function add_product(){

        $this->data['page_number']=9;
        return view('product/product_add',$this->data);
    }

    public function productsave(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'productname' => 'required',
            'productcode'  => 'required',
            'productrate'   => 'required',
        ]);
        $user = Auth::user()->id;
        if ($validator->passes()) {

            $productname=$_POST['productname'];
            $productcode=$_POST['productcode'];
            $productrate=$_POST['productrate'];
            $productcount=$_POST['productcount'];

            if(empty($request->productid)){

                $product_code_details = Product::check_product_code($productcode);
            }else{

                $product_code_details = Product::check_product_code_exist($productcode,$request->productid);
            }

            if(!empty($product_code_details)){
                return response()->json(['Status'=>1,'error'=>'Product Code Already Available.']);
            }else{

                if(!empty($request->productid)){

                    $ProductUID=$_POST['productid'];
                    $product_details=Product::update_product($ProductUID,$productname,$productcode,$user);

                    $updateproductDtlAry=array(
                        "Product_Qty"  =>$productcount, 
                        "Prize"  => $productrate,
                        "Created_by"  => $user
                    );

                    $product_details=Product::update_product_detail($ProductUID,$updateproductDtlAry);

                }else{

                    $product_details=Product::add_product($productname,$productcode,$user);

                    $productDtlAry=array(
                        "ProductUID"  => $product_details,
                        "Product_Qty"  =>$productcount, 
                        "Prize"  => $productrate,
                        "Created_by"  => $user
                    );

                    $productdtlUID=Product::saveproductdetail($productDtlAry);
                }
                return response()->json(['Status'=>0,'success'=>'Product Added Successfully.']);
            }
        }
        return response()->json(['error'=>$validator->errors()->all()]);
    }

    public function validation(array $request)
    {
        $request->validate([
            'productname' => 'required|string',
            'productcode' => 'required|string',
        ]);
    }

    public function edit_product($id)
    {
        $this->data['page_number']=9;
        $this->data['product_details']=Product::get_product(base64_decode($id));
        $this->data['product_prize_details']=Product::get_productprisedtl(base64_decode($id));
        return view('product.product_add',$this->data);
    }

    public function productdetails(){

        $this->data['page_number']=10;
        //$this->data['product_details']=Product::get_product(base64_decode($id));
        return view('product.product_add',$this->data);
    }
}