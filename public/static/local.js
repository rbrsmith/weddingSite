$(document).ready(function () {
   $("#rsvp-form").submit(function (e) {
      e.preventDefault(); //prevent default form submit
      var rsvpFormData = $('#rsvp-form').serializeArray().reduce(function (obj, item) {
         if(item.name === "joiningfor" && obj[item.name] !== undefined) {
            const currentJoiningFor = obj[item.name];
            obj[item.name] = currentJoiningFor + " & " + item.value;
         } else {
            obj[item.name] = item.value;
         }
         return obj;

      }, {});
      console.log("RSVP FORM DATA:" )
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
            setCookie(data);
         });

         setCookie(rsvpFormData.rsvpname);

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
const setCookie = function(name) {
   const nameData = {
      name: name
   };

   $.ajax({
      type: 'POST',
      url: 'http://rosolynwedding.com:3000/rsvp',
      contentType: 'application/json; charset=utf-8',
      dataType: 'html',
      data: JSON.stringify(nameData)
   }).done(function (data) {
      console.log(data);
      $("#rsvp").html("Thanks " + name + " for your RSVP");

   });
}

