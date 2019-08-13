$(document).ready(function () {
   $("#rsvp-form").submit(function (e) {
      e.preventDefault(); //prevent default form submit
      var rsvpFormData = $('#rsvp-form').serializeArray().reduce(function (obj, item) {
         obj[item.name] = item.value;
         return obj;
      }, {});
      console.log(rsvpFormData);

      $.ajax({
         type: 'POST',
         url: 'http://localhost:8080',
         contentType: 'application/json; charset=utf-8',
         dataType: 'html',
         data: JSON.stringify(rsvpFormData)
      }).done(function (data) {
         console.log("done");
         alert(data);
           $( "#rsvp-form" ).html("Thank you " + data);
      });
   });
});
