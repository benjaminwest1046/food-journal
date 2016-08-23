$(document).ready(function() {
  console.log("Jquery is ready")
  $(".button-collapse").sideNav();

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });

  $('.carousel.carousel-slider').carousel({full_width: true});

})
