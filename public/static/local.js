$(document).ready(function () {
   $("#rsvp-form").submit(function (e) {
      e.preventDefault(); //prevent default form submit
      var rsvpFormDataArray = $("#rsvp-form").serializeArray();

      var joiningFor = {name:"joiningfor"};

      var joiningForValue = "";
      if($("#friday").prop("checked") === true) {
         joiningForValue += "Friday ";
      }
      if($("#saturday").prop("checked") === true) {
         joiningForValue += "Saturday ";
      }
      if($("#sunday").prop("checked") === true) {
         joiningForValue += "Sunday";
      }

      joiningFor.value = joiningForValue;
      rsvpFormDataArray.push(joiningFor);



      const rsvpFormData = rsvpFormDataArray.reduce(function (obj, item) {
         obj[item.name] = item.value;
         return obj;
      }, {});

      console.log("RSVP FORM DATA");
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

   $("#rsvp-quick-link").click(function(e) {
      const element = document.getElementById('rsvp');
      element.scrollIntoView();
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

   const url = window.location.hostname;

   $.ajax({
      type: 'POST',
      url: 'http://'+url+'/rsvp',
      contentType: 'application/json; charset=utf-8',
      dataType: 'html',
      data: JSON.stringify(nameData)
   }).done(function (data) {
      console.log(data);
      $("#rsvp").html("Thanks " + name + " for your RSVP.  If you provided an email we will shortly be emailing you with confirmation :)");

   });
}

