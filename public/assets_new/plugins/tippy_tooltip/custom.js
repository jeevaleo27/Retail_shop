
  $(document).ready(function(){

        // Tooltips
    $(".tooltip_new").each(function () {
        let options = {
            content: $(this).attr("title"),
        };

        if ($(this).data("trigger") !== undefined) {
            options.trigger = $(this).data("trigger");
        }

        if ($(this).data("placement") !== undefined) {
            options.placement = $(this).data("placement");
        }

        if ($(this).data("theme") !== undefined) {
            options.theme = $(this).data("theme");
        }

        if ($(this).data("tooltip-content") !== undefined) {
            options.content = $($(this).data("tooltip-content"))[0];
        }

        $(this).removeAttr("title");

        tippy(this, {
            // arrow: roundArrow,
            animation: "shift-away",
            ...options,
        });
    });


    });
      function tooltip_new(){
                // Tooltips
    $(".tooltip_new").each(function () {
        let options = {
            content: $(this).attr("title"),
        };

        if ($(this).data("trigger") !== undefined) {
            options.trigger = $(this).data("trigger");
        }

        if ($(this).data("placement") !== undefined) {
            options.placement = $(this).data("placement");
        }

        if ($(this).data("theme") !== undefined) {
            options.theme = $(this).data("theme");
        }

        if ($(this).data("tooltip-content") !== undefined) {
            options.content = $($(this).data("tooltip-content"))[0];
        }

        $(this).removeAttr("title");

        tippy(this, {
            // arrow: roundArrow,
            animation: "shift-away",
            ...options,
        });
    });
    }