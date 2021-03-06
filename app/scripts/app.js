FastClick.attach(document.body);

$(document).ready(function() {
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
});

if(localStorage.getItem('ipAddress') === null) {
    $("#ipModal").modal();
    $(".js-ip-save").on("click", function(e) {
        e.preventDefault();
        var ipAddress = $('#ipField').val()
        if(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(ipAddress)) {
            localStorage.setItem('ipAddress', ipAddress);
            $("#ipModal").modal("hide");
            start();
        } else {
            alert("Invalid IP");
        }
    });
} else {
    start();
}

function start() {
    var ipAddr = localStorage.getItem('ipAddress');
    $(".btn").each(function() {
        $(this).on("click", function(e) {
            e.preventDefault();
            $(this).blur();
            $.post("/tv/" + ipAddr + "/action", {"action": $(this).data("action")});
            $("ipModal").modal("hide");
        });
    });

    setInterval((function() {
        $.get("tv/" + ipAddr + "/volume", function(data) {
            $(".vol").text("Volume - " + data);
        });
    }), 1000);
};
