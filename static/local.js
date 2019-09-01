$(document).ready(function () {
   $("#rsvp-form").submit(function (e) {
      e.preventDefault(); //prevent default form submit
      var rsvpFormData = $('#rsvp-form').serializeArray().reduce(function (obj, item) {
         obj[item.name] = item.value;
         return obj;
      }, {});
      console.log(rsvpFormData);

      if(typeof rsvpFormData.rsvpname === "undefined" || rsvpFormData.rsvpname === null || rsvpFormData.rsvpname === "") {
         $("#rsvp-info").html("Sorry - we'd like to know who you are - name is required");
      } else {

         $.ajax({
            type: 'POST',
            url: 'http://rosolynwedding.com:8080',
            contentType: 'application/json; charset=utf-8',
            dataType: 'html',
            data: JSON.stringify(rsvpFormData)
         }).done(function (data) {
            console.log("done");
            alert(data);
            $("#rsvp-form").html("Thank you " + data);
         });
      }
   });
});
const displayInfo = function(button, id) {
   const btnText = $(button).text();
   if(btnText.toLocaleLowerCase() === 'more info') {
      $(id).show();
      $(button).text("Hide");
   } else {
      $(id).hide();
      $(button).text("More Info");
   }

};

$( window ).on( "orientationchange", function( event ) {
   const orientation = window.screen.orientation.type;
   if(orientation === 'landscape-primary') {
      $(".travel-info-btn").hide();
      $(".more-info").show();
   } else {
      $(".travel-info-btn").show();
      $(".more-info").hide();

   }
});