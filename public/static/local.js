$(document).ready(function () {
   $("#rsvp-form").submit(function (e) {
      e.preventDefault(); //prevent default form submit
      var rsvpFormData = $('#rsvp-form').serializeArray();
      console.log(rsvpFormData);
      $.post("localhost:8080", rsvpFormData, function(data) {
         alert(data);
      });
   });

});
