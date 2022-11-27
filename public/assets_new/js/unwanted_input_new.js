/*@Decs script to check the unwanted input link HTML Tags..@Author JeevaKaleeeswar @Added on June 11 2021 */
 function unwanted_input(data){

        var formdatavalue=data.split("&");
        var formdatavaluedecode=decodeURIComponent(formdatavalue);
        var reg =/<(.|\n)*?>/g;
        if (reg.test(formdatavaluedecode)) {
         swal({
          text: "HTML Tag are not allowed",
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
         return false;   
       }
       return true;
 }

  /*@Decs script to check the unwanted input link HTML Tags..@Author JeevaKaleeeswar @Added on June 30 2021 */
     function unwanted_input_emailtemplate(data){

      var formdatavaluedecode=decodeURIComponent(data);
      var formdatavalue=formdatavaluedecode.split("&");
      for (var i = 0; i <= formdatavalue.length - 1; i++) {
        if (formdatavalue[i].includes('body')) {
          continue;
        }
        var str = formdatavalue[i];
        var reg =/<(.|\n)*?>/g;
        if (reg.test(str)) {
          swal({
          text: "HTML Tag are not allowed",
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
          return false;
        }

      }
      return true;

   }
   /*End*/


 function unwanted_input_data(datavalue){

        // var formdatavalue=datavalue.toString();
        // var formdatavaluedecode=formdatavalue.split("&");
        var formdatavaluedecode=decodeURIComponent(datavalue);
        // var formdatavaluedecode = implode(",",datavalue);
        // alert(formdatavaluedecode);
        var reg =/<(.|\n)*?>/g;
        if (reg.test(formdatavaluedecode)) {
         swal({
          text: "HTML Tag are not allowed",
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
         return false;   
       }
       return true;
 }
