<?php

namespace App\Http\Controllers;

use App\Models\OrderModel;
use App\Models\school;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Validator;

class OrderController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    use AuthenticatesUsers;

    public function __construct()
    {
        $this->middleware('auth');
        /* $this->library('form_validation');*/
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {   
        $this->data['page_number']=3;
        $this->data['SchoolInfo']=School::getSchoolDetails();
        $this->data['ClassInfo']= DB::table('mClass')->get();
        return view('order/neworder',$this->data);
    }

    public function get_ordertable(){

     $html="";

     $ordertype=$_POST['ordertype'];

     foreach ($ordertype as $key => $value) {
        switch ($value) {
            case 1:
            $ordername="Shirt";
            break;
            case 2:
            $ordername="Trousers";
            break;
            case 3:
            $ordername="Pant";
            break;
            case 4:
            $ordername="Chudi Set";
            break;
            case 5:
            $ordername="Chudi + Shal";
            break;
            case 6:
            $ordername="Chudi + Coat";
            break;
            case 7;
            $ordername="Top";
            break;
            case 8:
            $ordername="Pant";
            break;
            case 9:
            $ordername="Skirts";
            break;
            case 10:
            $ordername="Coat";
            break;
            case 11:
            $ordername="Shal";
            break;
            
            default:
                // code...
            break;
        }

        $html.='<tr>
        <td>' .($key+1).'</td>
        <td class="Order_type_name" style="width:30%;">'.$ordername.'</td>
        <input type="hidden" class="form-control form-control-sm Order_type_UID" name="order_type_id[]" data-deleterow="'.$value.'" value="'.$value.'">
        <input type="hidden" class="form-control form-control-sm "  value="">

        <td >
        <input type="number" class="form-control form-control-sm order_type_count" min="1" name="order_type_count[]" value="1">
        </td>
        <td class="input-group" style="width:90%;">
        <span class="input-group-text" id="basic-addon1">&#8377</span> <input type="text" class="form-control form-control-sm Fixed_price" name="Fixed_price[]" value="">
        </td>

        <td class="">
        &#8377 <span  class="order_type_price" name="">  </sapn>
        </td>

        <td class="text-center delete_order_type" id="delete_order_type">
        <svg title="Delete" style="cursor: pointer;" width="16" height="16" viewBox="0 0 16 16" class="bi bi-trash text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
        </svg>
        </td>
        </tr>';

    }

    echo json_encode($html);

}

public function save_order_details(Request $request){

    $validator = Validator::make($request->all(), [
       
        "customername" => 'required',
        "phoneno" => 'required',
        "schooluid" => 'required',
        "classuid" => 'required',
        'order_type_id.*' => 'required',
        'order_type_count.*' => 'required',
        'Fixed_price.*' => 'required'
    ]);

    $user = Auth::user()->id;
    if ($validator->passes()) 
    {
     
        $customer_details = array("CustomerName"    =>   $_POST['customername'],
            "PhoneNo"    =>   $_POST['phoneno'],
            "WhatsAppNo"    =>   $_POST['phoneno'],
            "Created_by" =>  $user);

        $CustomerID=OrderModel::save_customer($customer_details);

        $Order_detail = array("CustomerUID" => $CustomerID,
            "SchoolUID"    => $_POST['schooluid'],
            "ClassUID"    => $_POST['classuid'],
            "Status"    => 1,
            "CreatedBy"    => $user,
            "Order_Date"    => date('Y/m/d', strtotime($_POST['order_date'])),
            "Due_Date"    => date('Y/m/d', strtotime($_POST['order_due_date'])));

        $orderID=OrderModel::save_order($Order_detail);

        $order_type_id     = $_POST['order_type_id'];
        $order_type_count  = $_POST['order_type_count'];
        $Fixed_price       = $_POST['Fixed_price'];

        $total_amount=0;
        foreach ($order_type_id as $key =>$value) {

            $order_type_details = array( 
                "OrderUID"    => $orderID,
                "OrderType"    => $order_type_id[$key],
                "Order_Qty"    => $order_type_count[$key],
                "Prize"    => $Fixed_price[$key],
                "Created_by"    => $user
            );

            $total_amount=$total_amount+($Fixed_price[$key]*$order_type_count[$key]);

            $ordertypeID=OrderModel::save_order_type($order_type_details);
        }

        $Order_prize = array('Total_amount' => $total_amount);
        $order_prize_data = DB::table('mOrder')->where("OrderUID",$orderID)->update($Order_prize);

        echo json_encode(['Status'=>0,"totalamount"=>$total_amount,"orderID"=>$orderID]);exit; 

    }
    return response()->json(['Status'=>1,'error'=>$validator->errors()->all()]);
}

public function validation(array $request)
{

    $request->validate([

        'customername' => 'required|string',
        'phoneno' => 'required|number',
        'schooluid' => 'required|number',
        'classuid' => 'required|number',
    ]);
}


public function stitch_order_view(Request $request){

    $this->data['page_number']=4;
    $this->data['orderlist']=OrderModel::getstitchlist();
    return view('order.stitchinglist',$this->data);  
}

public function stitch_order_fetch($id){

    $this->data['page_number']=4;
    $this->data['stitching_orderdetail']=OrderModel::getstitchdetail(base64_decode($id));
    $this->data['stitching_ordertype_detail']=OrderModel::getstitch_ordertypedetail(base64_decode($id));
    $this->data['order_stauts']=OrderModel::get_status();
    return view('order.stitchingorderview',$this->data);
}
public function order_stauts_save(){

    $orderUID = $_POST['orderUID'];
    $order_stautsUID = $_POST['order_stauts'];

//  $basic  = new \Nexmo\Client\Credentials\Basic(getenv("NEXMO_KEY"), getenv("NEXMO_SECRET"));

    $status_update=OrderModel::update_order_status($orderUID,$order_stautsUID);

    if($status_update){

        if($order_stautsUID== 6 ){


            $stitching_list = DB::table('mOrder')->select('tCustomer.PhoneNo')->leftjoin('tCustomer','tCustomer.CustomerUID','=','mOrder.CustomerUID')->where("mOrder.OrderUID",$orderUID)->get();

       /* try {
   
            $basic  = new \Nexmo\Client\Credentials\Basic(getenv("NEXMO_KEY"), getenv("NEXMO_SECRET"));
            $client = new \Nexmo\Client($basic);
   
            $receiverNumber = $stitching_list[0]->PhoneNo;
            $message = "You uniform order is ready to delivery ";
   
            $message = $client->message()->send([
                'to' => $receiverNumber,
                'from' => 'Vonage APIs',
                'text' => $message
            ]);
   
            // dd('SMS Sent Successfully.');
               
        } catch (Exception $e) {
            dd("Error: ". $e->getMessage());
        }*/
    }



        return response()->json(['Status'=>0,'success'=>'Order Status Updated :).']);
    }else{
        return response()->json(['Status'=>1,'success'=>'Order Status Update Failed :(']);
    }
 
}

public function save_advance_amount(){

$Order_prize = array('Advance_Amount' => $_POST['advance_amount']);
$order_prize_data = DB::table('mOrder')->where("OrderUID", $_POST['orderUID'])->update($Order_prize);
echo json_encode(['Status'=>$order_prize_data]);exit; 

}

public function delete_stitching_order(){
   
    $Order_prize = array('is_delete' => 1);
    $order_prize_data = DB::table('mOrder')->where("OrderUID", base64_decode($_POST['orderid']))->update($Order_prize);
    echo json_encode(['Status'=>$order_prize_data]);exit; 
}

}
