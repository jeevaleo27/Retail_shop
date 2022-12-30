@include('layouts.page_start')
@include('layouts.sidebar')
<style type="text/css">

  .datatable_checklist_div .dataTables_length{
    display:none;
  }
  .datatable_checklist_div .dataTables_filter{
    display:none;
  }
  table.checklist_table thead tr th{
    font-size: .8125rem;
    text-transform: capitalize;
    font-weight: 600;
    white-space: nowrap;
    color: #6c757d;
    padding: .5rem 1rem;
    background-color: #f8f9fa;
    border-color: #f8f9fa!important;
  }
  table.checklist_table tbody tr td{
    font-size: .8125rem;
    font-weight: 400;
    padding: .2rem 1rem;
    text-transform: lowercase;
    border-color: #e9ecef!important;
    color: #495057;
    vertical-align: middle;
  }
  .showpassword_icon, .hidepassword_icon{
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 4px;
  }

  /*To Hide the Unwanted DropDowns For Role Name @Author Karthiga V @ JULY 15 2021*/
  .hideshoww{
    display: none;
  }
  .form-label{
    font-weight: bold;
  }
  /*Ends*/
</style>



<div class="px-3 px-xxl-3 py-2 py-lg-2 pb-lg-3 border-bottom border-gray-200 after-header bg-custom-light-bg">
	<div class="container-fluid px-0">
		<div class="row align-items-center">
			<div class="col">
       <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
         <ol class="breadcrumb bcram mb-2">
           <li class="breadcrumb-item"><a href="">Dashboard</a></li>
           <li class="breadcrumb-item" aria-current="page">Order List</li>
         </ol>
       </nav>
       <h1 class="h2 mb-0 lh-sm text-white">
         <svg width="35" height="35" viewBox="0 0 16 16" class="bi bi-person me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
        </svg>
        <span class="head_name">Order List # {{$stitching_orderdetail->OrderUID}}</span></h1>
      </div>
      <input type="hidden" id="usertype" name="usertype" value="#">
    </div>
  </div>
</div>


<div class="p-3 p-xxl-5">
  <div class="container-fluid px-0">
    <div class="row">
      <div class="col-12">
        <div class="card rounded-12 shadow-dark-80 border border-gray-50 mb-2 mb-xl-4 p-2 py-2">
          <div class="card-body p-0 p-md-2">


            <div class="">
              <div class="mb-1 mb-md-3 mb-xl-1 pb-3">
                <ul class="nav nav-tabs nav-tabs-md nav-tabs-line position-relative zIndex-0 admin_menu_style" role="tablist" style="border-width: .15rem;">
                  <li class="nav-item">
                    <a href="#checklist_tab1" class="nav-link active" href="user-profile-general.html" role="tab" data-bs-toggle="pill">Order Details</a>
                  </li>
                </ul>
              </div>

              <!-- Tab Content -->
              <form action="#"  name="school_form" id="order_status_form">
                <div class="tab-content">
                	<div class="tab-pane fade show active" id="checklist_tab1" role="tabpanel" aria-labelledby="pills-one-code-features-example1-tab">

                		<input type="hidden" class="form-control form-control-sm" id="_token" name="_token" title="Enter User Name" data-toggle="tooltip" data-placement="right" value="{{ csrf_token() }}"/>
                		@if(isset($stitching_orderdetail))
                		<input type="hidden" class="form-control form-control-sm" id="orderUID" name="orderUID" data-placement="right" value="@if(isset($stitching_orderdetail)){{$stitching_orderdetail->OrderUID }}@endif"/>
                		@endif
                		<div class="row g-3">
                      <div class="col-md-3">
                        <label for="schoolname" class="form-label">Customer Name </label>: <span >{{$stitching_orderdetail->CustomerName}}</span>
                      </div>
                      <div class="col-md-3">
                        <label for="schoolname" class="form-label">Phone No </label>: {{$stitching_orderdetail->PhoneNo}}
                      </div>
                      <div class="col-md-3">
                        <label for="schoolname" class="form-label">School Name </label>: {{$stitching_orderdetail->School_Name}}
                      </div>
                      <div class="col-md-3">
                        <label for="schoolname" class="form-label">Class </label>: {{$stitching_orderdetail->ClassName}}
                      </div>
                      <div class="col-md-3">
                        <label for="schoolname" class="form-label">Current Status </label>: <button type="button" style="height: 1.5rem;" class="btn btn-sm {{$stitching_orderdetail->Color}}">{{$stitching_orderdetail->Status_Name}}</button>
                      </div>
                      <div class="col-md-3">
                        <label for="schoolname" class="form-label">Order Date </label>: {{$stitching_orderdetail->Order_Date}}
                      </div>
                      <div class="col-md-3">
                        <label for="schoolname" class="form-label">Due Date </label>: {{$stitching_orderdetail->Due_Date}}
                      </div>
                    </div><br>
                    <div class="row g-3">
                      <div class="col-md-3">
                        <label for="schoolname" class="form-label">Total Amount</label>: {{$stitching_orderdetail->Total_amount}}
                      </div>

                      <div class="col-md-3">
                        <label for="schoolname" class="form-label">Advance Amount </label>: {{$stitching_orderdetail->Advance_Amount}}
                      </div>

                      <div class="col-md-3">
                        <label for="schoolname" class="form-label">Balance Amount</label>: {{$stitching_orderdetail->Total_amount-$stitching_orderdetail->Advance_Amount}}
                      </div>
                    </div>
                    <div class="row g-3">


                      <div class="col-md-6">
                        <label for="schoolname" class="form-label">Order Satus</label>
                        <select class="form-select form-select-sm select2_singleselect" aria-label=".form-select-sm example" style="width:100%;" id="order_stauts"  name="order_stauts" >
                          <option value="">--Select--</option>
                         @foreach($order_stauts as $item)
                         @if($stitching_orderdetail->Status == $item->StatusUID)

                         <option value="{{$item->StatusUID}}" disabled>{{$item->Status_Name}}</option>
                         @else
                         <option value="{{$item->StatusUID}}">{{$item->Status_Name}}</option>
                         @endif

                         @endforeach
                          </select>
                      </div>


                    </div>
                  </div>

                </div>
              </form>
              <!-- End Tab Content -->

            </div>

            <div class="row g-3 pt-3 order_type_div">
              <div class="col-md-12">
                <div class="table-responsive">
                  <table class="table checklist_table nowrap" id="order_type_table">
                    <thead>
                      <tr>
                        <th >Order Type</th>
                        <th >Count</th>
                        <th >Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      @foreach($stitching_ordertype_detail as $item)
                      <tr>
                        @switch($item->OrderType)
                        @case(1)
                        <th scope="row">Shirt</th>
                        @break

                        @case(2)
                        <th scope="row">Trousers</th>
                        @break

                        @case(3)
                        <th scope="row">Pant</th>
                        @break

                        @case(4)
                        <th scope="row">Chudi Set</th>
                        @break

                        @case(5)
                        <th scope="row">Chudi + Shal</th>
                        @break

                        @case(6)
                        <th scope="row">Chudi + Coat</th>
                        @break

                        @case(7)
                        <th scope="row">Top</th>
                        @break

                        @case(8)
                        <th scope="row">Pant</th>
                        @break

                        @case(9)
                        <th scope="row">Skirts</th>
                        @break

                        @case(10)
                        <th scope="row">Coat</th>
                        @break

                        @case(11)
                        <th scope="row">Shal</th>
                        @break

                        @endswitch
                        <td >{{$item->Order_Qty}}</td>
                        <td >{{$item->Prize}}</td>
                      </tr>
                      @endforeach
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="row g-3 ">

              <div class="col-md-12 text-end mt-4 pt-5" style="float:right">
                <a href="" class="btn btn-md btn-outline-dark me-1">
                  <svg width="20" height="20" viewBox="0 0 16 16" class="bi bi-x me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"></path>
                    <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"></path>
                  </svg>

                Cancel</a>

                <a  class="btn btn-md btn-primary save_order_status disabled" id="save_order_status" name="save_order_status" style="border: 1px solid #0d6efd;">
                  <svg width="20" height="20" viewBox="0 0 16 16" class="bi bi-check me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"></path>
                  </svg>
                Save</a>
              </div>
            </div>  


          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>

  $(document).ready(function(){
    $('.select2_singleselect').select2({});
    loadmultipleselect();
  });

  function loadmultipleselect() {
    $(".mdb-fselect:not(.singlemdbfselect)").each(function () {
      var placeholder = $(this).attr('placeholder');
      $(this).fSelect({
        placeholder: placeholder,
        numDisplayed: 1,
        overflowText: '{n} selected',
        showSearch: true
      });
    });
  }

$(document).off('change','#order_stauts').on('change','#order_stauts', function(e) {
  $('#save_order_status').removeClass('disabled');
});

 $(document).off('click','.save_order_status').on('click','.save_order_status', function(e) {
  var formdata = $('#order_status_form').serialize(); 

  button = $(this);
  button_val = $(this).val();
  button_text = $(this).html();
  $.ajax({
    type: "POST",
    url: "{{route('order_stauts_save')}}",
    data: formdata,
    dataType:'json',
    beforeSend: function () {
      button.prop("disabled", true);
    },

    success: function (response) {
      if(response.Status == 0)
      { 
        swal({
          text: response.success,
          icon: "success",
          showCancelButton: true, 
          buttonsStyling: false,
          closeOnClickOutside: false,
          allowOutsideClick: false,
          showLoaderOnConfirm: true,
          position: 'top-end',
          buttons: {
            cancel: {
              text: "Close",
              value: "catch",
              visible: true,
              className: "btn-sm",
              closeModal: true,
            },
                    /*catch: {
                      text: "Add New User",
                      value: "catch",
                      className: "btn-sm",
                    },
                    defeat:{
                      text: "Go and Edit ",
                      className: "btn-sm",
                    },*/
          },
        }).then(function (confirm) {

          if (confirm == "catch") {
            window.location.reload();
          }

        }, function (dismiss) {});
      }
      else
      {  

       if(response.Status == 1){

        $Message=response.error;
      }else{
        $Message=response.error[0];

      }
      swal({
        text: $Message,
        icon: "warning",
        showCancelButton: true, 
        buttonsStyling: false,
        closeOnClickOutside: false,
        allowOutsideClick: false,
        showLoaderOnConfirm: true,
        position: 'top-end',
        buttons: {
          cancel: {
            text: "Close",
            value: false,
            visible: true,
            className: "btn-sm",
            closeModal: true,
          },
        },
      });
    }
    button.html(button_text);
    button.val(button_val);
    button.prop('disabled',false);
  }
});

});


</script>


@include('layouts.page_script')
@include('layouts.footer')



