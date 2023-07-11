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
</style>

<div class="px-3 px-xxl-3 py-2 py-lg-2 pb-lg-3 border-bottom border-gray-200 after-header bg-custom-light-bg">
  <div class="container-fluid px-0">
    <div class="row align-items-center">
      <div class="col">
        <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
          <ol class="breadcrumb bcram mb-2">
            <li class="breadcrumb-item"><a href="">Dashboard</a></li>
            <li class="breadcrumb-item" aria-current="page">Product List</li>
          </ol>
        </nav>
        <h1 class="h2 mb-0 lh-sm text-white">
          <svg width="35" height="35" viewBox="0 0 16 16" class="bi bi-person me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
          </svg>
          <span class="head_name">Product</span>
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
                    <a href="#checklist_tab1" class="nav-link active" href="user-profile-general.html" role="tab" data-bs-toggle="pill">Product Details</a>
                  </li>
                </ul>
              </div>
              <!-- Tab Content -->
              <form action="#"  name="product_form" id="product_form">
                <div class="tab-content">
                  <div class="tab-pane fade show active" id="checklist_tab1" role="tabpanel" aria-labelledby="pills-one-code-features-example1-tab">
                    <input type="hidden" class="form-control form-control-sm" id="_token" name="_token" title="Enter Product Name" data-toggle="tooltip" data-placement="right" value="{{ csrf_token() }}"/>
                    @if(isset($product_details))
                    <input type="hidden" class="form-control form-control-sm" id="productid" name="productid" data-placement="right" value="@if(isset($product_details)){{$product_details->ProductUID  }}@endif"/>
                    @endif
                    <div class="row g-3">
                      <div class="col-md-3">
                        <label for="productname" class="form-label">Product Name <span class="mandatory"></span></label>
                        <input type="text" class="form-control form-control-sm  @error('productname') is-invalid @enderror" value="@if(isset($product_details)){{$product_details->ProducrName}}@endif"  id="productname" name="productname" title="Enter Product Name" data-toggle="tooltip" data-placement="right"/>
                      </div>
                      <div class="col-md-3">
                        <label for="productcode" class="form-label">Product Code <span class="mandatory"></span></label>
                        <input type="text" class="form-control form-control-sm  @error('productcode') is-invalid @enderror" value="@if(isset($product_details)){{$product_details->Product_Code}}@endif"  id="productcode" name="productcode" title="Enter Product Code" data-toggle="tooltip" data-placement="right"/>
                      </div>
                      <div class="tab-pane fade show" id="dynamic_mapping_tab" role="tabpanel" aria-labelledby="pills-one-code-features-example1-tab">
                        <div class="row g-3">
                          <div class="col-md-6">
                            <h5 class="card-header-title mb-0 font-weight-semibold">Size Fields</h5>
                          </div>
                          <form method="post" id="dynamicForm">
                            <div class="col-md-12 dynamic_append_row_div" id="dynamic_append_row_div">
                              <div class="row g-3 m-0 mb-3 pb-3 mt-0 border-blue-100 px-2 dynamic_append_row_child_div" style="    border: 1px dashed;">
                                <div class="col-md-12 m-0">
                                  <input type="hidden" class="sequence" id="sequence" name="sequence"/>
                                </div>
                                <div class="col-md-3">
                                  <label for="" class="form-label">Rate<span class="mandatory"></span></label>
                                  <input id="toolTip" name="productrate" type="text" class="form-control form-control-sm" value="@if(isset($product_prize_details)){{$product_prize_details->Prize}}@endif">
                                </div>

                                <div class="col-md-3">
                                  <label for="" class="form-label">Count</label>
                                  <input id="toolTip" name="productcount" type="text" class="form-control form-control-sm" value="@if(isset($product_prize_details)){{$product_prize_details->Product_Qty}}@endif">
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-8 text-end mt-4 pt-5" style="float:right">
                      <a href="" class="btn btn-md btn-outline-dark me-1">
                        <svg width="20" height="20" viewBox="0 0 16 16" class="bi bi-x me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"></path>
                          <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"></path>
                        </svg>
                      Cancel</a>
                      <a  class="btn btn-md btn-primary addproduct" name="addproduct" style="border: 1px solid #0d6efd;">
                        <svg width="20" height="20" viewBox="0 0 16 16" class="bi bi-check me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"></path>
                        </svg>
                      Save</a>
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

  $(document).off('click','.addproduct').on('click','.addproduct', function(e) {
    var formdata = $('#product_form').serialize(); 

    button = $(this);
    button_val = $(this).val();
    button_text = $(this).html();
    $.ajax({
      type: "POST",
      url: "{{route('productsave')}}",
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
              }
            },
          }).then(function (confirm) {

            if (confirm == "catch") {
              window.location.href = '{{route('product')}}';
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