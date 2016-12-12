/**
 * Created by madsbierrings on 10/12/2016.
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

                $("#teacherLecturesTableBody").empty();



                /* var decrypted = encryptDecrypt(data);
                 decrypted = JSON.parse(decrypted);*/

                var $teacherLecturesTableBody = $("#teacherLecturesTableBody");
                data.forEach(function (lecture) {


                    $teacherLecturesTableBody.append(


                        "<tr>" +
                        "<td>" + lecture.id + "</td>" +
                        "<td>" + lecture.type + "</td>" +
                        "<td>" + lecture.description + "</td>" +
                        "<td>" + lecture.startDate + "</td>" +
                        "<td>" + lecture.endDate + "</td>" +
                        "<td>" + "<button id='knap2'>Se reviews</button>" + "</td>" +
                        "</tr>");

                    $('button[id^="knap2"]').click(function(){
                        SDK.Storage.persist("lectureId", lecture.id);
                        window.location.href='seReviewsTeacher.html';
                        knap1.close();
                    });


                });


            });
        });


    });

});