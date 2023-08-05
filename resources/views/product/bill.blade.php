<!DOCTYPE html>
<html>
<head>
    <title>How To Generate Invoice PDF In Laravel 9 - Techsolutionstuff</title>
</head>
<style type="text/css">
    body{
        font-family: 'Roboto Condensed', sans-serif;
    }
    .m-0{
        margin: 0px;
    }
    .p-0{
        padding: 0px;
    }
    .pt-5{
        padding-top:5px;
    }
    .mt-10{
        margin-top:10px;
    }
    .text-center{
        text-align:center !important;
    }
    .w-100{
        width: 100%;
    }
    .w-50{
        width:50%;   
    }
    .w-85{
        width:85%;   
    }
    .w-15{
        width:15%;   
    }
    .logo img{
        width:200px;
        height:60px;        
    }
    .gray-color{
        color:#5D5D5D;
    }
    .text-bold{
        font-weight: bold;
    }
    .border{
        border:1px solid black;
    }
    table tr,th,td{
        border: 1px solid #d2d2d2;
        border-collapse:collapse;
        padding:7px 8px;
    }
    table tr th{
        background: #F4F4F4;
        font-size:15px;
    }
    table tr td{
        font-size:13px;
    }
    table{
        border-collapse:collapse;
    }
    .box-text p{
        line-height:10px;
    }
    .float-left{
        float:left;
    }
    .total-part{
        font-size:16px;
        line-height:12px;
    }
    .total-right p{
        padding-right:20px;
    }

</style>
<body>
    <div class="head-title">
        <table class="table w-100 " style="border:none !important;">

            <tr style="border:none !important;">
                <td style="border:none !important;">
                    <span class="text-bold" style="font-size: 30px;"><b>Rohini Silks</b></span> 
                </td>
                <td style="border:none !important;">

                   <div class="total-left w-100 float-left text-bold" align="right" style="font-size: 15px;">
                    <p>Tax Invoice/Bill of Supply/Cash Memo</p>

                </div>
            </td>
        </tr>
    </table>
</div>
<div class="total-right float-right " align="right">
  <p  class="m-0 pt-5 text-bold w-100">Billing Address</p>
  <p  class="m-0 pt-5  w-100">Rohini Silks</p>
  <p  class="m-0 pt-5  w-100">Vedathalangadu Main str,Karuvampalayam</p>              
  <p  class="m-0 pt-5  w-100">Mangalam Road, Tiruppur-641604.</p>
  <p  class="m-0 pt-5  w-100">Ph:9943078233</p>
</div>
<div class="add-detail mt-10">
    <div class="w-50 float-left mt-10">
        <p class="m-0 pt-5 text-bold w-100">Invoice Id - <span class="gray-color">{{$value['OrderUID']}}</span></p>
        <p class="m-0 pt-5 text-bold w-100">Invoice Id - <span class="gray-color">{{$value['Current_date']}}</span></p>
        <p class="m-0 pt-5 text-bold w-100">Order Id - <span class="gray-color">{{$value['OrderUID']}}</span></p>
        <p class="m-0 pt-5 text-bold w-100">Order Date - <span class="gray-color">{{$value['Order_date']}}</span></p>
    </div>
    <div style="clear: both;"></div>
</div>
<div class="table-section bill-tbl w-100 mt-10">
    <table class="table w-100 mt-10">
        <tr>
            <th class="w-50">Product number</th>
            <th class="w-50">Product Name</th>
            <th class="w-50">Price</th>
            <th class="w-50">Qty</th>
            <th class="w-50">Grand Total</th>
        </tr>
        @foreach ($value['billvalaue'] as $key => $valuedata) {
            <tr align="center">
                <td>{{$valuedata->Product_Code}}</td>
                <td>{{$valuedata->ProducrName}}</td>
                <td> <span style="font-family: DejaVu Sans; sans-serif;">₹</span> {{$valuedata->Prize}}</td>
                <td>{{$valuedata->Order_Qty}}</td>
                <td> <span style="font-family: DejaVu Sans; sans-serif;">₹</span> {{($valuedata->Prize * $valuedata->Order_Qty)}}</td>
            </tr>
        }
        @endforeach

        <tr>
            <td colspan="5">
                <div class="total-part">
                    <div class="total-left w-85 float-left" align="right">
                        <p>Sub Total</p>
                        <p>Total Payable</p>
                    </div>
                    <div class="total-right w-15 float-left text-bold" align="right">
                        <p> <span style="font-family: DejaVu Sans; sans-serif;">₹</span>{{$value['Total_amount']}}</p>
                        <p> <span style="font-family: DejaVu Sans; sans-serif;">₹</span>  {{$value['Total_amount']}}</p>
                    </div>
                    <div style="clear: both;"></div>
                </div> 
            </td>
        </tr>
        <tr>
            <td colspan="6">
                <div class="total-part">
                    <div class="total-left w-100 float-left" align="left">
                        <p>Amount In Words</p>
                        <p>{{$value['word_amount']}}</p>
                    </div>
                    <div style="clear: both;"></div>
                </div> 
            </td>
        </tr>
    </table>
</div>
</html>