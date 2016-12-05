/**
 * Created by madsbierrings on 03/12/2016.
 */


$(document).ready(function () {




    //Fires on page-load
    SDK.Course.getById(function (err, courses) {
        if (err) throw err;



        /*var decrypted = encryptDecrypt(courses);
         decrypted = JSON.parse(decrypted);
         */

        var $courseDropdown = $("#courseDropdown");
        courses.forEach(function (course) {


            $courseDropdown.append(
                "<button style='background-color: transparent; type: button; border-color: transparent;" +
                "cursor: pointer;' data-course=" + course.displaytext + ">" + "<li>" + course.code + "</li>" +
                "</button>");
            console.log(course);

        });


        $courseDropdown.on('click', "button", function () {
            var course = $(this).data("course");
            console.log(course);
            // console.log(event);
            SDK.Lectures.getById(course, function (err, data) {
                if (err) throw err;

                console.log(data);

                $("#lecturesTableBody").empty();



                /* var decrypted = encryptDecrypt(data);
                 decrypted = JSON.parse(decrypted);*/

                var $lecturesTableBody = $("#lecturesTableBody");
                data.forEach(function (lecture) {


                    $lecturesTableBody.append(


                        "<tr>" +
                        "<td>" + lecture.id + "</td>" +
                        "<td>" + lecture.type + "</td>" +
                        "<td>" + lecture.description + "</td>" +
                        "<td>" + lecture.startDate + "</td>" +
                        "<td>" + lecture.endDate + "</td>" +
                        "<td>" + "<button id='knap1'>Skriv review</button>" + "</td>" +
                        "</tr>");

                    $('button[id^="knap1"]').click(function(){
                        alert(this.id);
                        knap1.close();
                    });


                });


            });
        });


    });

});