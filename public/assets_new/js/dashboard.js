// loan_statistics_chart JavaScript
var loan_statistics_options = {
  series: [{
    name: 'All Loans',
    data: [10, 20, 30, 40, 42, 39, 54, 30, 44, 42, 90, 40]
  }, {
    name: 'Completed',
    data: [30, 40, 45, 100, 70, 10, 35, 87, 27, 84, 32, 67]
  }, {
    name: 'Pending',
    data: [89, 23, 95, 34, 56, 23, 56, 79, 97, 35, 87, 10]
  }, {
    name: 'Cancelled',
    data: [87, 35, 35, 98, 67, 64, 90, 87, 54, 64, 78, 32]
  }],
  chart: {
  height: 500,
  type: 'area',
  zoom: {
    enabled: false
  },
  toolbar: {
    show: false,
  },
},
dataLabels: {
  enabled: false
},
stroke: {
  width: 1,
  curve: 'smooth'
},
legend: {
  show: true,
  position: 'top',
  horizontalAlign: 'left',
  fontSize: '13px',
  fontWeight: 400,
  labels: {
    colors: '#6C757D',
  },
  markers: {
    width: 12,
    height: 12,
    strokeWidth: 0,
    strokeColor: '#fff',
    fillColors: ['#0D6EFD','#00e396'],
    radius: 12,
  },
},
grid: {
  show: true,
  borderColor: '#E9ECEF',
  xaxis: {
    lines: {
      show: false
    }
  },
  row: {
    colors: undefined,
    opacity: 0
  },
},
yaxis: {
  show: true,
  labels: {
    style: {
      colors: '#6C757D',
      fontSize: '13px',
      fontWeight: 400,
    }
  },
},
xaxis: {
  categories: ['Jan - 2021', 'Feb - 2021', 'Mar - 2021', 'Apr - 2021', 'May - 2021', 'Jun - 2021', 'Jul - 2021', 'Aug - 2021', 'Sep - 2021', 'Oct - 2021', 'Nov - 2021', 'Dec - 2021'],
  labels: {
    show: true,
    style: {
      colors: '#6C757D',
      fontSize: '13px',
      fontWeight: 400,
    }
  },
  axisTicks: {
    show: false,
  },
  axisBorder: {
    show: false,
  },
  stroke: {
    width: 0,
  },
  tooltip: {
    enabled: false,
  }
},
};

var loan_statistics_chart_var = new ApexCharts(document.querySelector("#loan_statistics_chart"), loan_statistics_options);
loan_statistics_chart_var.render();



//Muze Pie Chart JavaScript
// Highcharts.chart('Loans_due_chart', {
//   chart: {
//     type: 'pie',
//     backgroundColor: null,
//   },
//   title: {
//     text: '',
//   },
//   credits: {
//     enabled: false,
//   },
//   xAxis: {
//     lineColor: 'transparent',
//     tickLength: 0,
//     labels: {
//       enabled: false,
//     },
//   },
//   yAxis: {
//     gridLineColor: 'transparent',
//     title: {
//       text: '',
//     },
//     labels: {
//       enabled: false,
//     },
//   },
//   legend: {
//     itemStyle: {
//       color: '#6C757D',
//       fontSize: '12px',
//       fontWeight: '500',
//     },
//     margin: 30,
//     padding: 0,
//     symbolWidth: 11,
//     symbolHeight: 11,
//     itemDistance: 30,
//     symbolPadding: 10,
//   },
//   plotOptions: {
//     pie: {
//       size: 230,
//       borderWidth: 0,
//       allowPointSelect: true,
//     },
//     series: {
//       lineWidth: 0,
//     },
//     column: {
//       pointPadding: 0,
//       borderWidth: 0,
//       pointWidth: 1,
//     },
//   },
//   accessibility: {
//     announceNewData: {
//       enabled: true,
//     },
//     point: {
//       valueSuffix: '%',
//     }
//   },
//   tooltip: {
//     headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
//     pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b>'
//   },
//   series: [{
//     innerSize: '86%',
//     dataLabels: [{
//       enabled: false,
//     }],
//     name: 'Loans Due',
//     showInLegend: true,
//     data: [
//       {name: 'Due Today', y: chartdata.pastdue, color: '#0d6efd',},
//       {name: 'Past Due', y: chartdata.presentdue, color: '#ff4560',},
//       {name: 'Future Due', y: chartdata.futuredue, color: '#00e396',}],
//     }
//   ],
// });


$(function () {
  $(document)
    .off("dp.change", "#chartfdate")
    .on("dp.change", "#chartfdate", function (e) {
      CustomerUID = $("#DashboardCustomer").val();
      ProductUID = $("#DashboardProduct").val();
      ProjectUID = $("#DashboardProject").val();
      DocTypeUID = $("#DashboardDocType").val();
      FromDate = $("#chartfdate").val();
      ToDate = $("#charttdate").val();
      if (CustomerUID == "") {
        CustomerUID = "all";
      }
      if (ProductUID == "") {
        ProductUID = "all";
      }
      if (ProjectUID == "") {
        ProjectUID = "all";
      }
      if (DocTypeUID == "") {
        DocTypeUID ="all";
      }
      var dategroup = $("#datefilter_type option:selected").attr(
        "data-groupby"
      );
FromDate = '<?php echo date("Y-m-d", strtotime("-90 DAYS")); ?>';
ToDate = '<?php echo date("Y-m-d"); ?>';
var dategroup='MONTH';
      var data = {};
      data.Customer = CustomerUID;
      data.Product = ProductUID;
      data.Project = ProjectUID;
      data.DocType = DocTypeUID;
      data.from = FromDate;
      data.to = ToDate;
      data.dategroup = dategroup;

      fn_Ajax_Init(data);
    });

  $(document)
    .off("dp.change", "#charttdate")
    .on("dp.change", "#charttdate", function (e) {
      CustomerUID = $("#DashboardCustomer").val();
      ProductUID = $("#DashboardProduct").val();
      ProjectUID = $("#DashboardProject").val();
      DocTypeUID = $("#DashboardDocType").val();
      FromDate = $("#chartfdate").val();
      ToDate = $("#charttdate").val();
      if (CustomerUID == "") {
        CustomerUID = "all";
      }
      if (ProductUID == "") {
        ProductUID = "all";
      }
      if (ProjectUID == "") {
        ProjectUID = "all";
      }
      if (DocTypeUID == "") {
        DocTypeUID ="all";
      }
      var dategroup = $("#datefilter_type option:selected").attr(
        "data-groupby"
      );
FromDate = '<?php echo date("Y-m-d", strtotime("-90 DAYS")); ?>';
ToDate = '<?php echo date("Y-m-d"); ?>';
var dategroup='MONTH';
      var data = {};
      data.Customer = CustomerUID;
      data.Product = ProductUID;
      data.Project = ProjectUID;
      data.DocType = DocTypeUID;
      data.from = FromDate;
      data.to = ToDate;
      data.dategroup = dategroup;

      fn_Ajax_Init(data);
    });

  $(document)
    .off("change", "#DashboardCustomer")
    .on("change", "#DashboardCustomer", function (e) {
      e.preventDefault();
      CustomerUID = $(this).val();

      ProductUID = $("#DashboardProduct").val();
      ProjectUID = $("#DashboardProject").val();
      DocTypeUID = $("#DashboardDocType").val();
      FromDate = $("#chartfdate").val();
      ToDate = $("#charttdate").val();
      if (CustomerUID == "") {
        CustomerUID = "all";
      }
      if (ProductUID == "") {
        ProductUID = "all";
      }
      if (ProjectUID == "") {
        ProjectUID = "all";
      }
      if (DocTypeUID == "") {
        DocTypeUID ="all";
      }
      var dategroup = $("#datefilter_type option:selected").attr(
        "data-groupby"
      );
FromDate = '<?php echo date("Y-m-d", strtotime("-90 DAYS")); ?>';
ToDate = '<?php echo date("Y-m-d"); ?>';
var dategroup='MONTH';
      var data = {};
      data.Customer = CustomerUID;
      data.Product = ProductUID;
      data.Project = ProjectUID;
      data.DocType = DocTypeUID;
      data.from = FromDate;
      data.to = ToDate;
      data.dategroup = dategroup;

      fn_Ajax_Init(data);
      var requestdata = "Customer=" + CustomerUID;

      $("#DashboardProject").html('');
      SendAsyncAjaxRequest(
          "POST",
          "Dashboard/GetCustomerProducts",
          requestdata,
          "json",
          true,
          true,
          function () {
            // Before Send
          }
        )
        .then(function (response) {
          if (response.length > 0) {
            var ProjectCustomer = response;

            var Project_select = ProjectCustomer.reduce(function (
                accumulator,
                value
              ) {
                return (
                  accumulator +
                  '<Option value="' +
                  value.ProductUID +
                  '">' +
                  value.ProductName +
                  "</Option>"
                );
              },
              "");

            $("#DashboardProduct").multiselect("destroy");

            $("#DashboardProduct").html(Project_select);
            //console.log(Project_select);
            Product_init_multiselect();
            Checkbox_init_multiselect();
          } else {
            $("#DashboardProduct").multiselect("destroy");

            $("#DashboardProduct").html('');

            Product_init_multiselect();
            Checkbox_init_multiselect();

            $("#DashboardProject").multiselect("destroy");

            $("#DashboardProject").html('');

            Project_init_multiselect();
            Checkbox_init_multiselect();

          }
          
        })
        .catch(function (reject) {});
    });

  $(document)
    .off("change", "#DashboardProduct")
    .on("change", "#DashboardProduct", function (e) {
      e.preventDefault();
      CustomerUID = $("#DashboardCustomer").val();

      ProductUID = $(this).val();
      ProjectUID = $("#DashboardProject").val();
      DocTypeUID =$("#DashboardDocType").val();
      FromDate = $("#chartfdate").val();
      ToDate = $("#charttdate").val();
      if (CustomerUID == "") {
        CustomerUID = "all";
      }
      if (ProductUID == "") {
        ProductUID = "all";
      }
      if (ProjectUID == "") {
        ProjectUID = "all";
      }
      if(DocTypeUID == ""){
        DocTypeUID="all";
      }
      var dategroup = $("#datefilter_type option:selected").attr(
        "data-groupby"
      );
FromDate = '<?php echo date("Y-m-d", strtotime("-90 DAYS")); ?>';
ToDate = '<?php echo date("Y-m-d"); ?>';
var dategroup='MONTH';
      var data = {};
      data.Customer = CustomerUID;
      data.Product = ProductUID;
      data.Project = ProjectUID;
      data.DocType = DocTypeUID;
      data.from = FromDate;
      data.to = ToDate;
      data.dategroup = dategroup;

      fn_Ajax_Init(data);

      var requestdata = "ProductUID=" + ProductUID;

      $("#DashboardProject").html('');
      SendAsyncAjaxRequest(
          "POST",
          "Dashboard/GetProductProject",
          requestdata,
          "json",
          true,
          true,
          function () {
            // Before Send
          }
        )
        .then(function (response) {
          console.log(response);
          if (response.length > 0) {
            var ProjectLender = response;

            var Lender_select = ProjectLender.reduce(function (
                accumulator,
                value
              ) {
                return (
                  accumulator +
                  '<Option value="' +
                  value.ProjectUID +
                  '">' +
                  value.ProjectName +
                  "</Option>"
                );
              },
              "");

            $("#DashboardProject").multiselect("destroy");

            $("#DashboardProject").html(Lender_select);
            console.log(Lender_select);
            Project_init_multiselect();
            Checkbox_init_multiselect();
          } else {
            $("#DashboardProject").multiselect("destroy");

            $("#DashboardProject").html('');

            Project_init_multiselect();
            Checkbox_init_multiselect();
          }
        })
        .catch(function (reject) {});
    });
    $(document)
    .off("change", "#DashboardProject")
    .on("change", "#DashboardProject", function (e) {
      e.preventDefault();
      CustomerUID = $("#DashboardCustomer").val();
      ProductUID = $("#DashboardProduct").val();
      ProjectUID = $("#DashboardProject").val();
      DocTypeUID =$("#DashboardDocType").val();
      FromDate = $("#chartfdate").val();
      ToDate = $("#charttdate").val();
      if (CustomerUID == "") {
        CustomerUID = "all";
      }
      if (ProductUID == "") {
        ProductUID = "all";
      }
      if (ProjectUID == "") {
        ProjectUID = "all";
      }
      if(DocTypeUID == ""){
        DocTypeUID="all";
      }
      var dategroup = $("#datefilter_type option:selected").attr(
        "data-groupby"
      );
FromDate = '<?php echo date("Y-m-d", strtotime("-90 DAYS")); ?>';
ToDate = '<?php echo date("Y-m-d"); ?>';
var dategroup='MONTH';
      var data = {};
      data.Customer = CustomerUID;
      data.Product = ProductUID;
      data.Project = ProjectUID;
      data.DocType = DocTypeUID;
      data.from = FromDate;
      data.to = ToDate;
      data.dategroup = dategroup;

      fn_Ajax_Init(data);

    });

    $(document)
    .off("change", "#DashboardDocType")
    .on("change", "#DashboardDocType", function (e) {
      e.preventDefault();
      PackageUID = $(this).val();
      CustomerUID = $("#DashboardCustomer").val();
      ProductUID = $("#DashboardProduct").val();
      ProjectUID = $("#DashboardProject").val();
      DocTypeUID =$("#DashboardDocType").val();
      FromDate = $("#chartfdate").val();
      ToDate = $("#charttdate").val();
      if (CustomerUID == "") {
        CustomerUID = "all";
      }
      if (ProductUID == "") {
        ProductUID = "all";
      }
      if (ProjectUID == "") {
        ProjectUID = "all";
      }
      if(DocTypeUID == ""){
        DocTypeUID="all";
      }
      var dategroup = $("#datefilter_type option:selected").attr(
        "data-groupby"
      );
FromDate = '<?php echo date("Y-m-d", strtotime("-90 DAYS")); ?>';
ToDate = '<?php echo date("Y-m-d"); ?>';
var dategroup='MONTH';
      var data = {};
      data.Customer = CustomerUID;
      data.Product = ProductUID;
      data.Project = ProjectUID;
      data.DocType = DocTypeUID;
      data.from = FromDate;
      data.to = ToDate;
      data.dategroup = dategroup;

      fn_Ajax_Init(data);
    });

  $(document)
    .off("change", "#datefilter_type")
    .on("change", "#datefilter_type", function (e) {
      e.preventDefault();

      var select = $(this);
      var selected_value = $(select).val();
      var option = $(select).find("option:selected");
      fromdate = $(option).attr("data-from");
      todate = $(option).attr("data-to");
      groupby = $(option).attr("data-groupby");
      $("#chartfdate").val(fromdate);
      $("#chartfdate").attr("value", fromdate);
      $("#charttdate").val(todate);
      $("#chartfdate").attr("value", todate);

      CustomerUID = $("#DashboardCustomer").val();
      ProductUID = $("#DashboardProduct").val();
      ProjectUID = $("#DashboardProject").val();
      DocTypeUID =$("#DashboardDocType").val();
      FromDate = $("#chartfdate").val();
      ToDate = $("#charttdate").val();
      if (CustomerUID == "") {
        CustomerUID = "all";
      }
      if (ProductUID == "") {
        ProductUID = "all";
      }
      if (ProjectUID == "") {
        ProjectUID = "all";
      }
      if(DocTypeUID == ""){
        DocTypeUID="all";
      }
      var dategroup = $("#datefilter_type option:selected").attr(
        "data-groupby"
      );
FromDate = '<?php echo date("Y-m-d", strtotime("-90 DAYS")); ?>';
ToDate = '<?php echo date("Y-m-d"); ?>';
var dategroup='MONTH';
      var data = {};
      data.Customer = CustomerUID;
      data.Product = ProductUID;
      data.Project = ProjectUID;
      data.DocType = DocTypeUID;
      data.from = FromDate;
      data.to = ToDate;
      data.dategroup = dategroup;

      fn_Ajax_Init(data);
    });
  $(document)
    .off("change", "#chartfdate")
    .on("change", "#chartfdate", function (e) {
      e.preventDefault();
      fromdate = $(this).val();
    });

  $(document)
    .off("change", "#charttdate")
    .on("change", "#charttdate", function (e) {
      e.preventDefault();
      todate = $(this).val();
    });
}); //Document Ends

var fn_Ajax_Init = function fn_Ajax_Init(data) {
  // addbodyspinner();
  var fn_Array = [];
  fn_Array[0] = dashboard(data);
  fn_Array[1] = DrawChartData(data);
  fn_Array[2] = DrawPieChart(data);
  //fn_Array[3] = OrderAging(data);
  fn_Array[3] = ProductionTAT(data);
  Promise.all(fn_Array).then(function (value) {
    console.log("caller");
    // removebodyspinner();
  });
};

$( document ).ajaxComplete(function() {
 setTimeout(function(){
   $('.bodyoverlaydiv').css('display','none');
  $('.d2tspinner-circular').css('display','none');
 },500);
});
