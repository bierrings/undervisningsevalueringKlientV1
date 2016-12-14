/**
 * Created by madsbierrings on 05/12/2016.
 */

/**
 * Created by madsbierrings on 03/12/2016.
 */

$(document).ready(function () {


    //Fires on page-load
    SDK.UserReview.getAll(function (err, data) {
        if (err) throw err;


        var $reviewBody = $("#reviewBody");
        data.forEach(function (review) {


            $reviewBody.append(
                "<tr>" +
                "<td>" + review.lectureId + "</td>" +
                "<td>" + review.rating + "</td>" +
                "<td>" + review.comment + "</td>" +
                "<td>" + "<button class='delete' data-review=" + review.id + "> Slet </button>" + "</td>" +
                "</tr>");
        });

    });
    $('#reviewBody').on("click", ".delete", function () {
        var reviewId = $(this).data("review");
        var deleteReview = {
            reviewId: reviewId
        };

        SDK.DeleteReview.deleteReview(reviewId, function (err, reviewId) {
            location.reload();
            console.log("delete");
        });
    });
});