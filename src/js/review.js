/**
 * Created by madsbierrings on 05/12/2016.
 */

/**
 * Created by madsbierrings on 03/12/2016.
 */

$(document).ready(function () {


    //Fires on page-load
    SDK.Review.getAll(function(err, data){
        if(err) throw err;


        /*var decrypted = encryptDecrypt(courses);
         decrypted = JSON.parse(decrypted);
         */


                /* var decrypted = encryptDecrypt(data);
                 decrypted = JSON.parse(decrypted);*/

        var $reviewTableBody = $("#reviewTableBody");
        data.forEach(function (review) {

            $reviewTableBody.append(
                "<tr>" +
                "<td>" + review.userId + "</td>" +
                "<td>" + review.lectureId + "</td>" +
                "<td>" + review.rating + "</td>" +
                "<td>" + review.comment + "</td>" +
                "</tr>");
        });

    });

});