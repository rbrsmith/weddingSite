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
      }

      $.ajax({
         type: 'POST',
         url: 'http://rosolynwedding.com:8080',
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
