/**
 * Created by madsbierrings on 03/12/2016.
 * Denne klasse henter en studerendes fag og lektioner
 */


$(document).ready(function () {


    SDK.Course.getById(function (err, courses) {
        if (err) throw err;

        /**
         * Her oprettes en dropdown menu der skal vise den studerendes fag
         * @type {any}
         */

        var $courseDropdown = $("#courseDropdown");
        courses.forEach(function (course) {


            /**
             * Her tildeles værdierne i dropdown menuen
             */
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


                /**
                 * Lektioner loades og bliver appendet i en tabel
                 * @type {any}
                 */

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

                    /**
                     * Skriv review knappen sender brugeren videre til createReview viewet og sender lectureId med
                     */

                    $('button[id^="knap1"]').click(function () {
                        SDK.Storage.persist("lectureId", lecture.id);
                        window.location.href = 'createReview.html';
                        knap1.close();
                    });


                });


            });
        });


    });

});