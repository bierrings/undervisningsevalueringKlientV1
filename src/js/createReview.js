/**
 * Denne klasse håndterer oprettelse af reviews
 */

$(document).ready(function () {

    getAllReviews();

    function getAllReviews() {

        SDK.LectureReview.getAll(function (err, data) {
            if (err) throw err;


            $("#makeReview").on("click", function () {
                $('#createReview').modal('show');
            });


            var $lectureReviewBody = $("#lectureReviewBody");
            data.forEach(function (review) {

                //Her appender jeg værdierne ind i en tabel
                $lectureReviewBody.append(
                    "<tr>" +
                    "<td>" + review.rating + "</td>" +
                    "<td>" + review.comment + "</td>" +
                    "</tr>");

            });

        });
    }

    $("#createReviewButton").on("click", function () {
        createReview();
    })

    /**
     * Her oprettes den funktion der skal kaldes, når createReviewButton aktiveres
     */
    function createReview() {
        var review = {
            comment: $("#comment").val(),
            rating: $("#rating").val(),
            userId: SDK.Storage.load("userId"),
            lectureId: SDK.Storage.load("lectureId"),

        };

        SDK.LectureReview.create(review, function (err, data) {

            console.log(review);
            location.reload();

            $("#createReviewButton").modal("hide");

        });

    }

});