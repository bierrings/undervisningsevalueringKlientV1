/**
 * Created by madsbierrings on 05/12/2016.
 */

/**
 * Created by madsbierrings on 03/12/2016.
 */

$(document).ready(function () {


    //Fires on page-load
    SDK.LectureReview.getAll(function(err, data){
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
                "<td>" + "<button id='knap2'>Slet review</button>" + "</td>" +
                "</tr>");

            $('button[id^="knap2"]').click(function(){
               var confirm = window.confirm("Vil du slette dit review?");

                if(confirm === true){
                    $(review).remove();
                }
                knap1.close();
            });


        });

    });

});