<?php

namespace App\Http\Controllers;

use App\Models\OrderModel;
use App\Models\school;
use App\Models\product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Validator;
use PDF;

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
                /*code...*/
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
            &#8377 <span  class="order_type_price" name="">  </span>
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

        /*$basic  = new \Nexmo\Client\Credentials\Basic(getenv("NEXMO_KEY"), getenv("NEXMO_SECRET"));*/

        $status_update=OrderModel::update_order_status($orderUID,$order_stautsUID);

        if($status_update){

            if($order_stautsUID== 6 ){


                $stitching_list = DB::table('mOrder')->select('tCustomer.PhoneNo')->leftjoin('tCustomer','tCustomer.CustomerUID','=','mOrder.CustomerUID')->where("mOrder.OrderUID",$orderUID)->get();

                /*try {

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

    public function rs_order(){

        $this->data['page_number']=10;
        $this->data['rsproductdtl']=product::getproduct();   
        return view('order.rs_order',$this->data); 

    }

    public function rs_get_ordertable(){

        $html="";

        $productdtl=$_POST['productdtl'];
        foreach ($productdtl as $key => $value) {

            $product_data = product::get_product($value);
            $product_pricedata = product::get_productprisedtl($value);

            $html.='<tr>
            <td>' .($key+1).'</td>
            <td class="Order_type_name" style="width:30%;">'.$product_data->ProducrName.'</td>
            <input type="hidden" class="form-control form-control-sm productuid" name="product_id[]" data-deleterow="'.$product_data->ProductUID.'" value="'.$product_data->ProductUID.'">
            <input type="hidden" class="form-control form-control-sm "  value="">

            <td >
            <input type="number" class="form-control form-control-sm product_count" min="1" name="product_count[]" value="1">
            </td>
            <td class="input-group" style="width:90%;">
            <span class="input-group-text" id="basic-addon1">&#8377</span> <input type="text" class="form-control form-control-sm Fixed_price" name="Fixed_price[]" value="'.$product_pricedata->Prize.'">
            </td>

            <td class="">
            &#8377 <span  class="order_type_price" name="">'.$product_pricedata->Prize.'</span>
            <input type="hidden" class="form-control form-control-sm order_type_price_total" name="order_type_price_total[]" value="'.$product_pricedata->Prize.'"/>
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



    public function rs_save_order_details(Request $request){

        $validator = Validator::make($request->all(), [

            "customername" => 'required',
            "phoneno" => 'required',
            'product_id.*' => 'required',
            'product_count.*' => 'required',
            'Fixed_price.*' => 'required'
        ]);

        $user = Auth::user()->id;
        if ($validator->passes()) 
        {

            $customer_details = array(
                "CustomerName"  =>  $_POST['customername'],
                "PhoneNo"       =>  $_POST['phoneno'],
                "Custumer_type" =>  1, 
                "WhatsAppNo"    =>  $_POST['phoneno'],
                "Created_by"    =>  $user);

            $CustomerID=OrderModel::save_customer($customer_details);

            $Order_detail = array("CustomerUID" => $CustomerID,
                "CreatedBy"    => $user,
                "Order_Date"    => date('Y/m/d', strtotime($_POST['order_date'])));

            $orderID=OrderModel::save_order_rs($Order_detail);

            $product_id     = $_POST['product_id'];
            $product_count  = $_POST['product_count'];
            $Fixed_price       = $_POST['Fixed_price'];

            $total_amount=0;
            foreach ($product_id as $key =>$value) {

                $order_type_details = array( 
                    "OrderUID"    => $orderID,
                    "ProductUID"    => $product_id[$key],
                    "Order_Qty"    => $product_count[$key],
                    "Prize"    => $Fixed_price[$key],
                    "Created_by"    => $user
                );

                $total_amount=$total_amount+($Fixed_price[$key]*$product_count[$key]);

                $ordertypeID=OrderModel::save_product_rs($order_type_details);
            }

            $Order_prize = array('Total_amount' => $total_amount);
            $order_prize_data = DB::table('mOrderRs')->where("OrderUID",$orderID)->update($Order_prize);

            echo json_encode(['Status'=>0,"totalamount"=>$total_amount,"orderID"=>$orderID]);exit; 

        }
        return response()->json(['Status'=>1,'error'=>$validator->errors()->all()]);
    }

    public function validator_(array $request)
    {

        $request->validate([

            'customername' => 'required|string',
            'phoneno' => 'required|number',
        ]);
    }

    public function save_advance_amount_rs(){

        $Order_prize = array('Advance_Amount' => $_POST['advance_amount']);
        $order_prize_data = DB::table('mOrderRs')->where("OrderUID", $_POST['orderUID'])->update($Order_prize);
        echo json_encode(['Status'=>$order_prize_data]);exit; 
    }

    public function rohinisilks_orderlist(){
       $this->data['page_number']=11;
       $this->data['rsorderlist']=OrderModel::get_rsorderlist();
       return view('order.rs_orderlist',$this->data); 
    }


    public function get_rsorder_dtl(){

        $rsorderdetaillist=OrderModel::getrsreadymadedtl(base64_decode($_POST['orderid']));

        $html="<table  class='table datatable_Userlist subchecklist_table  nowrap' style='width:100%;' >
        <thead>
        <tr>
        <th>Product Name</th>
        <th>Product Code</th>
        <th>Qty</th>
        <th>Price</th>
        </tr>
        </thead>
        ";
        foreach ($rsorderdetaillist as $key => $value) {
           $html.="<tr><td>".$value->ProducrName."</td><td>".$value->Product_Code."</td><td>".$value->Order_Qty."</td><td>".$value->Prize."</td></tr>";
       }

       $html.= "<tr><td><b>Total Amount :  ".$rsorderdetaillist[0]->Total_amount." </b></td><td><b>Total Amount :  ".$rsorderdetaillist[0]->Advance_Amount." </b></td><td></td><td><b>Total Amount : <span  style='color:red'>  ".($rsorderdetaillist[0]->Total_amount - $rsorderdetaillist[0]->Advance_Amount)." </span></b></td></tr>";
       $html.="
       </table>";

       return response()->json(['html'=>$html]);
   }


    public function downloadincoice($id)
    {
        $users =Auth::user()->id;
        $rsorderdetaillist=OrderModel::getrsreadymadedtl(base64_decode($id));
        $data["value"]=array( "OrderUID" =>$rsorderdetaillist[0]->OrderUID,
            "Total_amount" => $rsorderdetaillist[0]->Total_amount,
            "Current_date"  => date('d-m-Y', strtotime(date('Y-m-d H:i:s'))),
            "Order_date"=>  date('d-m-Y', strtotime($rsorderdetaillist[0]->CreatedDateTime)),
            "billvalaue" => $rsorderdetaillist,
            "word_amount" =>  $this->numberToWord($rsorderdetaillist[0]->Total_amount)
        );

        $pdf = PDF::loadView('product.bill', $data);
        return $pdf->download($rsorderdetaillist[0]->OrderUID."-".$rsorderdetaillist[0]->CustomerName.'.pdf');
    }



    public function inv(){
          $this->data['page_number']=11;
       $this->data['rsorderlist']=OrderModel::get_rsorderlist();
       return view('product.invoice',$this->data);
    }


     public function numberToWord($num = '')
    {
        $num    = ( string ) ( ( int ) $num );
        
        if( ( int ) ( $num ) && ctype_digit( $num ) )
        {
            $words  = array( );
             
            $num    = str_replace( array( ',' , ' ' ) , '' , trim( $num ) );
             
            $list1  = array('','one','two','three','four','five','six','seven',
                'eight','nine','ten','eleven','twelve','thirteen','fourteen',
                'fifteen','sixteen','seventeen','eighteen','nineteen');
             
            $list2  = array('','ten','twenty','thirty','forty','fifty','sixty',
                'seventy','eighty','ninety','hundred');
             
            $list3  = array('','thousand','million','billion','trillion',
                'quadrillion','quintillion','sextillion','septillion',
                'octillion','nonillion','decillion','undecillion',
                'duodecillion','tredecillion','quattuordecillion',
                'quindecillion','sexdecillion','septendecillion',
                'octodecillion','novemdecillion','vigintillion');
             
            $num_length = strlen( $num );
            $levels = ( int ) ( ( $num_length + 2 ) / 3 );
            $max_length = $levels * 3;
            $num    = substr( '00'.$num , -$max_length );
            $num_levels = str_split( $num , 3 );
             
            foreach( $num_levels as $num_part )
            {
                $levels--;
                $hundreds   = ( int ) ( $num_part / 100 );
                $hundreds   = ( $hundreds ? ' ' . $list1[$hundreds] . ' Hundred' . ( $hundreds == 1 ? '' : 's' ) . ' ' : '' );
                $tens       = ( int ) ( $num_part % 100 );
                $singles    = '';
                 
                if( $tens < 20 ) { $tens = ( $tens ? ' ' . $list1[$tens] . ' ' : '' ); } else { $tens = ( int ) ( $tens / 10 ); $tens = ' ' . $list2[$tens] . ' '; $singles = ( int ) ( $num_part % 10 ); $singles = ' ' . $list1[$singles] . ' '; } $words[] = $hundreds . $tens . $singles . ( ( $levels && ( int ) ( $num_part ) ) ? ' ' . $list3[$levels] . ' ' : '' ); } $commas = count( $words ); if( $commas > 1 )
            {
                $commas = $commas - 1;
            }
             
            $words  = implode( ', ' , $words );
             
            $words  = trim( str_replace( ' ,' , ',' , ucwords( $words ) )  , ', ' );
            if( $commas )
            {
                $words  = str_replace( ',' , ' and' , $words );
            }
             
            return $words;
        }
        else if( ! ( ( int ) $num ) )
        {
            return 'Zero';
        }
        return '';
    }
}