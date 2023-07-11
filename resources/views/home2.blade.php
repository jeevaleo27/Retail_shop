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
					</ol>
				</nav>
				<h1 class="h2 mb-0 lh-sm text-white">
					<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" class="bi bi-person me-1" viewBox="0 0 16 16" fill="currentColor">
						<path d="M.686,13.257a.686.686,0,0,1-.093-1.365l.093-.006H15.314a.686.686,0,0,1,.093,1.365l-.093.006ZM.394,9.535l-.089-.05a.688.688,0,0,1-.24-.863l.05-.088L3.773,3.048a.684.684,0,0,1,.782-.272l.095.039L7.811,4.4,11.121.257a.687.687,0,0,1,.945-.122L12.142.2,15.8,3.858a.686.686,0,0,1-.893,1.036l-.077-.067L11.713,1.712,8.536,5.685a.684.684,0,0,1-.743.225l-.1-.04L4.578,4.313,1.256,9.294a.684.684,0,0,1-.862.24Z" transform="translate(0 1)" fill=""></path>
					</svg>
					<span class="head_name">Dashboard</span>
				</h1>
			</div>
			<input type="hidden" id="usertype" name="usertype" value="#">
		</div>
	</div>
</div>

<input type="hidden" class="form-control form-control-sm" id="_token" name="_token" title="Enter User Name" data-toggle="tooltip" data-placement="right" value="{{ csrf_token() }}"/>

<div class="row g-0">
	<div class="col-md-7 col-xxl-12">
		<div class="p-3 p-xxl-5 border-end border-gray-200">
			<div class="container-fluid px-0">
				<div class="row list_price_table" >
									<!-- Prize List Tab show -->
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

</script>
@include('layouts.page_script')
@include('layouts.footer')