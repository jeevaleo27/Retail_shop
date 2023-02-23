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
            <span class="head_name">New Order</span>
          </h1>
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
                          <label for="schoolname" class="form-label">Customer Name<span class="mandatory"></span></label>
                          <input type="text" class="form-control form-control-sm  @error('schoolname') is-invalid @enderror" value="@if(isset($school_details)){{$school_details->School_Name}}@endif"  id="customername" name="customername" title="Enter Customer Name" data-toggle="tooltip" data-placement="right"/>
                        </div>

                        <div class="col-md-3">
                          <label for="schoolname" class="form-label">Phone No<span class="mandatory"></span></label>
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
                      </div>

                      <div class="row g-3 mt-4" id="order_type_select" style="display:none;">
                        <div class="col-md-3">
                          <label for="" class="form-label">Order Type</label>
                          <select class="form-select form-select-sm mdb-fselect" aria-label=".form-select-sm example" style="width:100%;" id="orderType"  name="orderType" multiple="">
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
                          <div class="">
                            <table class="table checklist_table nowrap " id="order_type_table" >
                              <thead>
                                <tr>
                                  <th style="width:50px;">S.No </th>
                                  <th style="width:;">Order Type </th>
                                  <th style="width:;">select size </th>
                                  <th style="width:80;">Rate Per Count</th>
                                  <th style="width:100%;">Count </th>
                                  <th style="width:100%;">Rate </th>
                                  <th class="text-center">Action </th>
                                </tr>
                              </thead>
                              <tbody id="order_type_table_div">
                              </tbody>
                            </table>
                            <div class="row" style="float:right;margin-right: 107px;">
                              <div class="col-md-2 text-end mt-4 pt-5 input-group" style="float:right;margin-right: 20px;">
                                <h1 for="schoolname" class="form-label mt-2" style="margin-right: 20px;">Total:</h1>
                                <span class="input-group-text" id="basic-addon1">&#8377</span> <input type="text" class="form-control form-control-sm readymade_total"  readonly style=" font-size: 19px;font-weight: bolder;" value="0">
                              </div>
                            </div>
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


  <script>
    $(document).ready(function(){
      $('.select2_singleselect').select2({});
      loadmultipleselect();
    });

    var total_value=0;

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
        url: "{{route('savereadymadeorder_details')}}",
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
                  text: "OK",
                  value: "catch",
                  visible: true,
                  className: "btn-sm",
                  closeModal: true,
                }
              },
            }).then(function (confirm) {

              if (confirm == "catch") {
                window.location.href = '{{route('new_readymaadeorder')}}';
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

    var  orderType_array=[];
    $(document).off('click','.add_order_type').on('click','.add_order_type', function(e) {
      total_value=0;
      $('.readymade_total').val(total_value);

      $('.page_loader_div').show();
      var DocumentTypeUID =$('#orderType').val();
      $(DocumentTypeUID).each(function(value,key){
        orderType_array.push(key);
      })
      $(".multiple .fs-option").removeClass("selected");
      $('.fs-label').html('Select some options');
      $('#order_type_table tbody').html("");
      $('#order_type_table').dataTable().fnClearTable();
      $('#order_type_table').dataTable().fnDestroy();

      var ordertype = $("#orderType").val();
      var _token = $("#_token").val();
      var schooluid = $("#schooluid").val();
      $.ajax({
        type: "POST",
        url: "{{route('readdymade_ordertbale')}}",
        data: {schooluid:schooluid,ordertype:orderType_array,_token:_token},
        dataType:'json',
        cache:false,
        success: function (response) {
          $('#order_type_table_div').append(response);
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
          $('.select2_singleselect').select2({});
          $('#save_order_type_details').removeClass('disabled');
        }
      });
    });

    $(document).off("click","#delete_order_type").on("click","#delete_order_type", function(event) {
      event.preventDefault();
      var thisdata=this;
      var Order_type_UID=$(this).closest('tr').find('.Order_type_UID').attr('data-deleterow');
  /* console.log(Order_type_UID);*/
      $(this).closest('tr').remove();
      var Order_type_UID_data = orderType_array;
      $('#orderType').val('data', null);
      if (Order_type_UID > -1) {
        Order_type_UID_data.splice(Order_type_UID, 1);
      }
      $('.add_order_type').trigger('click');
    });

    $(document).off("change",".order_type_count").on("change",".order_type_count", function(event) {
      event.preventDefault();
      var Fixed_price=$(this).closest('tr').find(".Fixed_price").val();
      var order_type_count=$(this).val();
      var new_value=order_type_count*Fixed_price;
      $(this).closest('tr').find(".order_type_price").html(new_value);
      $(this).closest('tr').find(".order_type_price_total").val(new_value).trigger('change');
    });

    $(document).off("keyup",".Fixed_price").on("keyup",".Fixed_price", function(event) {
      event.preventDefault();
      var Fixed_price=$(this).closest('tr').find(".order_type_count").val();
      var order_type_count=$(this).val();
      var new_value=order_type_count*Fixed_price;
      $(this).closest('tr').find(".order_type_price").html(new_value);
      $(this).closest('tr').find(".order_type_price_total").val(new_value).trigger('change');
    });

    $(document).off("change","#schooluid").on("change","#schooluid", function(event) {
      $('#orderType').fSelect('destroy');
      var schooluid = $("#schooluid").val();
      var _token = $("#_token").val();
      $.ajax({
        type: "POST",
        url: "{{route('fetch_ordertype')}}",
        data:{schooluid:schooluid,_token:_token},
        dataType:'json',
        success: function (response) {
          $('#orderType').html(response.html);
          $('#orderType').fSelect('create');
          if(schooluid){
            $('#order_type_select').show();
          }else{
            $('#order_type_select').hide();
          }
        }
      })
    });

    $(document).off("change",".orderwisw_size").on("change",".orderwisw_size", function(event) {
      var order_size = $(this).val();
      var changesdone_class = this ;
      var _token = $("#_token").val();
      $.ajax({
        type: "POST",
        url: "{{route('get_size_rise')}}",
        data:{order_size:order_size,_token:_token},
        dataType:'json',
        success: function (response) {
          $(changesdone_class).closest('tr').find(".Fixed_price").val(response.Rate);
          $(changesdone_class).closest('tr').find(".Fixed_price").trigger('keyup');
          $(changesdone_class).closest('tr').find(".Fixed_price").css('dispaly',"");
          $(changesdone_class).closest('tr').find(".order_type_count").css('dispaly',"");
        }
      });
    });

    $(document).off("change",".order_type_price_total").on("change",".order_type_price_total", function(event) {
      var id=document.getElementsByClassName("order_type_price_total");
      total_value=0;
      $(id).each(function(value,key){
        console.log(key.value)
        total_value+=Number(key.value);
      })
      $('.readymade_total').val(total_value);
    });

  </script>
  @include('layouts.page_script')
  @include('layouts.footer')