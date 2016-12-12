/**
 * Created by madsbierrings on 10/12/2016.
 */

$(document).ready(function () {


    //Fires on page-load
    SDK.LectureReview.getAll(function(err, data){
        if(err) throw err;



        var $reviewTeacherBody = $("#reviewTeacherBody");
        data.forEach(function (review) {


            $reviewTeacherBody.append(
                "<tr>" +
                "<td>" + review.rating + "</td>" +
                "<td>" + review.comment + "</td>" +
                "<td>" + "<button class='delete' data-review=" + review.id + "> Slet </button>" + "</td>" +
                "</tr>");
        });

    });


    $('#reviewTeacherBody').on("click",".delete",function () {
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