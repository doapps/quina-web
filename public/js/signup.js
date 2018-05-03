$(document).ready(function () {

    $('#button-login').click(function (event) {
        console.log('---> send form lol');
        $.ajax({
            type: "POST",
            url: "/signup",
            // data: { mail: mail },
            success: function (data) {
                alert(data.message);
            },
            error: function (jqXHR, textStatus, err) {
                console.log('text status ' + textStatus + ', err ' + err)
            }
        });
    });

});