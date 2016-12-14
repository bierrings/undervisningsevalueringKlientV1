/**
 * Created by madsbierrings on 10/12/2016.
 * Denne klasse henter en undervisers fag og lektioner
 */


$(document).ready(function () {


    SDK.Course.getById(function (err, courses) {
        if (err) throw err;


        /**
         * Drowdown menu der lister en undervisers fag
         * @type {any}
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


                /**
                 * Lektioner appendes i en tabel
                 * @type {any}
                 */
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


                    /**
                     * Knap der sender brugeren videre til review viewet og sender lectureId med
                     */
                    $('button[id^="knap2"]').click(function () {
                        SDK.Storage.persist("lectureId", lecture.id);
                        window.location.href = 'seReviewsTeacher.html';
                        knap1.close();
                    });


                });


            });
        });


    });

});