/**
 * Created by madsbierrings on 01/12/2016.
 */

$(document).ready(function () {

    $("#logoutButton").on("click", function(e){
        e.preventDefault();

        var email = $("cbsMail").val();
        var pw = $("type").val();

        SDK.logOut(email, pw, function(err, data){

            //On wrong credentials
            if(err) {
                return $("#logoutForm").find(".form-group").addClass("has-error");
            }

            window.location.href = "../html/login.html";

        });

    });

});
