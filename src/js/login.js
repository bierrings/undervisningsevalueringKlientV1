/**
 * Denne klasse håndterer login funktionen hos klienten
 */

$(document).ready(function () {

    $("#loginButton").on("click", function (e) {
        e.preventDefault();

        var email = $("#inputEmail").val();
        var pw = $("#inputPassword").val();

        SDK.login(email, pw, function (err, data) {

            //On wrong credentials
            if (err) {
                return $("#loginForm").find(".form-group").addClass("has-error");
            }

            $("#loginForm").find(".form-group").addClass("has-success");


            /**
             * If statement der verificerer om det er en studerende eller underviser der looger ind
             */

            if (data.type == "student") {
                window.alert("Student");
                window.location.href = "indexStudent.html";
            }


            else if (data.type == "teacher") {
                window.alert("Teacher");
                window.location.href = "indexTeacher.html";

            }
            else {
                window.alert("Lol");
            }

        });
    });
});