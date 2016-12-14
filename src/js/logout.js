/**
 * Created by madsbierrings on 01/12/2016.
 * Denne klasse håndterer når en bruger skal logge ud
 */

$(document).ready(function () {

    $("#logOutButton").on("click", function () {
        SDK.logOut();

        window.location.href = "login.html";

    });

});
