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
  .hideshoww{
    display: none;
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
            <!-- <li class="breadcrumb-item" aria-current="page"></li> -->
          </ol>
        </nav>
        <h1 class="h2 mb-0 lh-sm text-white">
          <svg width="35" height="35" viewBox="0 0 16 16" class="bi bi-person me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
          </svg>
          <span class="head_name">New Order</span></h1>
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
                      <a href="#checklist_tab1" class="nav-link active" href="user-profile-general.html" role="tab" data-bs-toggle="pill">New Order</a>
                    </li>
                  </ul>
                </div>

                <!-- Tab Content -->
                <form action="#"  name="order_type_data_form" id="order_type_data_form">
                  <div class="tab-content">
                    <div class="tab-pane fade show active" id="checklist_tab1" role="tabpanel" aria-labelledby="pills-one-code-features-example1-tab">

                      <input type="hidden" class="form-control form-control-sm" id="_token" name="_token" title="Enter User Name" data-toggle="tooltip" data-placement="right" value="{{ csrf_token() }}"/>
                      @if(isset($school_details))
                      <!--  <input type="hidden" class="form-control form-control-sm" id="schoolid" name="schoolid" data-placement="right" value="@if(isset($school_details)){{$school_details->SchoolUID }}@endif"/> -->
                      @endif
                      <div class="row g-3">

                        <div class="col-md-3">
                          <label for="schoolname" class="form-label">Customer Name <span class="mandatory"></span></label>
                          <input type="text" class="form-control form-control-sm  @error('schoolname') is-invalid @enderror" value="@if(isset($school_details)){{$school_details->School_Name}}@endif"  id="customername" name="customername" title="Enter Customer Name" data-toggle="tooltip" data-placement="right"/>
                        </div>

                        <div class="col-md-3">
                          <label for="schoolname" class="form-label">Phone No <span class="mandatory"></span></label>
                          <input type="text" class="form-control form-control-sm  @error('schoolname') is-invalid @enderror" value="@if(isset($school_details)){{$school_details->School_Name}}@endif"  id="phoneno" name="phoneno" title="Enter phone Number" data-toggle="tooltip" data-placement="right"/>
                        </div>


                        <div class="col-md-3">
                          <label for="roleuid" class="form-label">School Name <span class="mandatory"></span></label>
                          <select class="form-select form-select-sm select2_singleselect"  id="schooluid" name="schooluid">
                            <option value="">Select School</option>
                            <?php foreach ($SchoolInfo as $schoolkey => $schoolvalue) { ?>
                              <option value="<?php echo $schoolvalue->SchoolUID; ?>"><?php echo $schoolvalue->School_Name; ?></option>
                            <?php } ?>             
                          </select>
                        </div>

                        <div class="col-md-3">
                          <label for="roleuid" class="form-label">Class <span class="mandatory"></span></label>
                          <select class="form-select form-select-sm select2_singleselect"  id="classuid" name="classuid">
                            <option value="">Select Class</option>
                            <?php foreach ($ClassInfo as $classkey => $classvalue) { ?>
                              <option value="<?php echo $classvalue->ClassUID; ?>"><?php echo $classvalue->ClassName; ?></option>
                            <?php } ?>             
                          </select>
                        </div>

                        <div class="col-md-3">
                          <label for="roleuid" class="form-label">Order Date <span class="mandatory"></span></label>
                          <input type="text" class="form-control form-control-sm flatpickr_date datetimepicker" name="order_date" id="order_date">
                        </div>

                        <div class="col-md-3">
                          <label for="roleuid" class="form-label">Due Date <span class="mandatory"></span></label>
                          <input type="text" class="form-control form-control-sm flatpickr_date datetimepicker" name="order_due_date" id="order_due_date">
                        </div>
                      </div>

                      <div class="row g-3 mt-4">

                        <div class="col-md-3">
                          <label for="" class="form-label">Order Type</label>
                          <select class="form-select form-select-sm mdb-fselect" aria-label=".form-select-sm example" style="width:100%;" id="orderType"  name="orderType" multiple="">
                            <optgroup label="Boys">
                              <option value="1">Shirt</option>
                              <option value="2">Trousers</option>
                              <option value="3">Pant</option>
                            </optgroup>
                            <optgroup label="Girls">
                              <option value="4">Chudi Set</option>
                              <option value="5">Chudi + Shal</option>
                              <option value="6">Chudi + Coat</option>
                              <option value="7">Top</option>
                              <option value="8">Pant</option>
                              <option value="9">Skirts</option>
                              <option value="10">Coat</option>
                              <option value="11">Shal</option>
                            </optgroup>
                          </select>
                        </div>

                        <div class="col-md-3 mt-4 pt-4">
                          <a  class="btn btn-md btn-warning add_order_type" name="add_order_type" style="border: 1px solid #0d6efd;">
                            <svg width="20" height="20" viewBox="0 0 16 16" class="bi bi-plus me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"></path>
                              <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"></path>
                            </svg>
                          Add</a>
                        </div>

                      </div >
                      <div class="row g-3 pt-3 order_type_div" style="display:none;">
                        <div class="col-md-12">
                          <div class="table-responsive">

                            <table class="table checklist_table nowrap " id="order_type_table">
                              <thead>
                                <tr>
                                  <th style="width:50px;">S.No </th>
                                  <th style="width:;">Order Type </th>
                                  <th style="width:100%;">Count </th>
                                  <th style="width:80;">Rate Per Count</th>
                                  <th style="width:100%;">Rate </th>
                                  <th class="text-center">Action </th>
                                </tr>
                              </thead>
                              <tbody>


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

                          <a  class="btn btn-md btn-primary save_order_type_details disabled" id="save_order_type_details" name="save_order_type_details" style="border: 1px solid #0d6efd;">
                            <svg width="20" height="20" viewBox="0 0 16 16" class="bi bi-check me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"></path>
                            </svg>
                          Save</a>
                        </div>
                      </div>
                    </div>

                  </div>
                </form>
                <!-- End Tab Content -->

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Advance Amount modal -->
  <div id="exportdoc_Popup" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content shadow-dark-80">
        <div class="modal-header border-0 pb-0 align-items-start ps-4">
          <h5 class="modal-title pb-3" id="">Prize Model</h5>
          <button type="button" class="btn btn-icon p-0" data-bs-dismiss="modal" aria-label="Close">
            <svg data-name="icons/tabler/close" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
              <rect data-name="Icons/Tabler/Close background" width="16" height="16" fill="none"></rect>
              <path d="M.82.1l.058.05L6,5.272,11.122.151A.514.514,0,0,1,11.9.82l-.05.058L6.728,6l5.122,5.122a.514.514,0,0,1-.67.777l-.058-.05L6,6.728.878,11.849A.514.514,0,0,1,.1,11.18l.05-.058L5.272,6,.151.878A.514.514,0,0,1,.75.057Z" transform="translate(2 2)" fill="#1e1e1e"></path>
            </svg>
          </button>
        </div>
        <div class="modal-body pt-2 px-4 mt-2">
          <form action="#"  name="advance_amount_from" id="advance_amount_from">
            <div class="col-md-6">
              <label for="schoolname" class="form-label"><b>Total Amount : </b><span class="tatal_amount"></span> </label>
              <input type="hidden" class="form-control form-control-sm" id="_token" name="_token" title="Enter User Name" data-toggle="tooltip" data-placement="right" value="{{ csrf_token() }}"/>
              <input type="hidden" class="form-control form-control-sm" value=""  id="orderUID" name="orderUID" title="Enter phone Number" data-toggle="tooltip" data-placement="right"/>
            </div>
            <div class="col-md-6">
              <label for="schoolname" class="form-label">Advance Amount</label>
              <input type="text" class="form-control form-control-sm " value=""  id="advance_amount" name="advance_amount" title="Enter Avance Number" data-toggle="tooltip" data-placement="right"/>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary px-2 ms-2 save_advance_amount" id="save_advance_amount"><span class="px-1">Save</span></button>
        </div>
      </div>
    </div>
  </div>


  <!-- <script src="{{asset('assets_new/plugins/jquery-ui/jquery-ui.min.js')}}"></script> -->

  <script>
    $(document).ready(function(){
      $('.select2_singleselect').select2({});

      $("#order_date").flatpickr({
        dateFormat: "d-m-Y",
        defaultDate:new Date()
      });

      var order_due_date = new Date();
      order_due_date.setDate(order_due_date.getDate() + 15);

      $("#order_due_date").flatpickr({
        dateFormat: "d-m-Y",
        defaultDate:order_due_date
      });
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


    $(document).off("click",".save_order_type_details").on("click",".save_order_type_details", function(event) {

      var formdata = $('#order_type_data_form').serialize(); 
      button = $(this);
      button_val = $(this).val();
      button_text = $(this).html();
      $.ajax({
        type: "POST",
        url: "{{route('saveorder_details')}}",
        data: formdata,
        dataType:'json',
        beforeSend: function () {
          button.prop("disabled", true);
        },

        success: function (response) {
          if(response.Status == 0)
          { 

            swal({
              text: "Order Placed Successfully :)",
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
                }
              },
            }).then(function (confirm) {

              if (confirm == "catch") {
                $('.tatal_amount').html(response.totalamount);
                $('#orderUID').val(response.orderID);
                $("#exportdoc_Popup").modal({
                  backdrop: 'static',
                  keyboard: false
                });
                $('#exportdoc_Popup').modal('show');
              }

            }, function (dismiss) {});
          }
          else
          {  

            if(response.Status == 1){

              $Message="Please Fill Required Fields :(";
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

    $(document).off("click",".save_advance_amount").on("click",".save_advance_amount", function(event) {

      var formdata = $('#advance_amount_from').serialize(); 
      /*button = $(this);
      button_val = $(this).val();
      button_text = $(this).html();*/
      $.ajax({
        type: "POST",
        url: "{{route('save_advance_amount')}}",
        data: formdata,
        dataType:'json',
        beforeSend: function () {
          button.prop("disabled", true);
        },

        success: function (response) {
          if(response.Status == 1)
          { 
            swal({
              text: "Amount saved Successfully :)",
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
                }
              },
            }).then(function (confirm) {

              if (confirm == "catch") {
               window.location.href = '{{route('new_order')}}';
             }

           }, function (dismiss) {});
          }

          button.html(button_text);
          button.val(button_val);
          button.prop('disabled',false);
        }
      });

    });

    $(document).off('click','.add_order_type').on('click','.add_order_type', function(e) {

      $('.page_loader_div').show();
      var DocumentTypeUID =$('#orderType').val();
      $(".multiple .fs-option").removeClass("selected");
      $('.fs-label').html('Select some options');


      $('#order_type_table tbody').html("");

      $('#order_type_table').dataTable().fnClearTable();
      $('#order_type_table').dataTable().fnDestroy();


      var ordertype = $("#orderType").val();
      var _token = $("#_token").val();

      $.ajax({
        type: "POST",
        url: "{{route('ordertbale')}}",
        data: {ordertype:ordertype,_token:_token},
        dataType:'json',
        cache:false,

        success: function (response) {

          $('#order_type_table tbody').html(response);
          $('.select2_single_select').select2({});
          $('#order_type_table').DataTable({
            "searching": true,
            scrollCollapse: true,
            paging:  true,
            "bDestroy": true,
            "autoWidth": true,
            "pageLength": 10,
            "lengthMenu":[[10, 15, 20, 25, 50, 100], [10, 15, 20, 25, 50, 100]],
            language: {
              "paginate": {
                "previous": '<',
                "next":     '>'
              },
              sLengthMenu: "Show _MENU_",
              emptyTable:     "No Loans Found",
              info:           "Showing _START_ to _END_ of _TOTAL_ Loans",
              infoEmpty:      "Showing 0 to 0 of 0 Loans",
              infoFiltered:   "(filtered from _MAX_ total loans)",
              zeroRecords:    "No matching loans found",
              search: "",
              searchPlaceholder: "Search..."
            },
            "columnDefs": [ {
              "targets": 'no-sort',
              "orderable": false,
            } ] 
          });
          $(".order_type_div").show();
          $('#save_order_type_details').removeClass('disabled');
//$('.page_loader_div').hide();

        }
      });

    });


    $(document).off("click","#delete_order_type").on("click","#delete_order_type", function(event) {
      event.preventDefault();

      var thisdata=this;
      var Order_type_UID=$(this).closest('tr').find('.Order_type_UID').attr('data-deleterow');

      $(this).closest('tr').remove();
      var Order_type_UID_data =$('#orderType').val();
      $('#orderType').val('data', null);

      const index = Order_type_UID_data.indexOf(Order_type_UID);
      if (index > -1) {
        Order_type_UID_data.splice(index, 1);
      }

      $('#orderType').val(Order_type_UID_data);
      $('.add_order_type').trigger('click');

    });

    $(document).off("change",".order_type_count").on("change",".order_type_count", function(event) {
      event.preventDefault();
      var Fixed_price=$(this).closest('tr').find(".Fixed_price").val();
      var order_type_count=$(this).val();
      var new_value=order_type_count*Fixed_price;
      $(this).closest('tr').find(".order_type_price").html(new_value);
    });

    $(document).off("keyup",".Fixed_price").on("keyup",".Fixed_price", function(event) {
      event.preventDefault();
      var Fixed_price=$(this).closest('tr').find(".order_type_count").val();
      var order_type_count=$(this).val();
      var new_value=order_type_count*Fixed_price;
      $(this).closest('tr').find(".order_type_price").html(new_value);
    });


  </script>


  @include('layouts.page_script')
  @include('layouts.footer')



