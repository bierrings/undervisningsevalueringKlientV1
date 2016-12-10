/**
 * Created by madsbierrings on 01/12/2016.
 */

$(document).ready(function () {

    $("#logOutButton").on("click", function(){
        SDK.logOut();

        window.location("login.html");

    });

});
