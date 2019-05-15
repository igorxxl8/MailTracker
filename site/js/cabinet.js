$(document).ready(() => {
    $('#dismiss, .overlay').click(() => {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').click(() => {
        $('#sidebar').addClass('active');
        $('.overlay').addClass('active');
    });

    $('#upBut').click(() => {
        $('html, body').animate({
            scrollTop: 0
            }, 1000);
    });

    $(window).onscroll = ()=> {
        if ($(document).body.scrollTop > 0 || $(document).documentElement.scrollTop > 0) {
            $('#upBDiv').removeClass('d-none');
        } else {
            $('#upBDiv').addClass('d-none');
        }
    };
    
    var orders = [
        {
            name: "order 1",
            status: "active",
            info: ""
        },
        {
            name: "order 2",
            status: "active",
            info: ""
        },
        {
            name: "order 3",
            status: "active",
            info: ""
        }
    ];

    if (orders.length > 0){
        $('conc').removeClass('show');
    }

    
    $('#newOrderTab,#historyTab').click(()=>{
        $('.conc').removeClass('show')
        $('.overlay').trigger('click');
    });
    
    $('#newOrderTab').click(()=>{
        $('#orderDiv').addClass('show');
    });

    $('#historyTab').click(() => {
        //var id = startProgress();
        $('#historyDiv').addClass('show');
    })


    function startProgress() {
        $('#trProg').show();
        var progress = 0;
        var id = setInterval(function() {
            if (progress > 140) progress = -40;
            $('#progressbar').css('width', progress + '%');
            progress+=10;
        }, 100);
        return id;
    }

    function stopProgress(id) {
        $('#progressbar').css('width', 0 + '%');
        $('#trProg').hide();
        clearInterval(id);
    }
});