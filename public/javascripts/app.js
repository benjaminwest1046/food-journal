$(document).ready(function() {
  console.log("Jquery is ready")
  $(".button-collapse").sideNav();

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });

  $('.carousel.carousel-slider').carousel({full_width: true});

  document.getElementById('myFood').onblur = function() {
    console.log("I am here")
             function createRequest(method, url) {
                 var xhr = new XMLHttpRequest();
                 if ('withCredentials' in xhr) {
                     xhr.open(method, url, true);
                 } else if (typeof XDomainRequest != 'undefined') {
                     xhr = new XDomainRequest();
                     xhr.open(method, url);
                 } else {
                     xhr = null;
                 }
                 return xhr;
             }

             var selectedFood = encodeURIComponent(document.getElementById('myFood').value.trim());
             var request = createRequest('GET', 'https://api.nutritionix.com/v1_1/search/' + selectedFood + '?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=a2858467&appKey=5477f871d07dcb2cda61bf74ba24de65');
             document.getElementById('foods').innerHTML = " "
             if (request) {
                 request.onload = function(){
                     if(request.status === 200) {
                        var food_array = JSON.parse(request.response);
                        var foods = food_array.hits
                        foods.forEach(function(food){
                          document.getElementById('foods').innerHTML += ("Food Name: " + food.fields.item_name + "------- " + "Brand Name: " + food.fields.brand_name + " ------- " + "Calories: " + food.fields.nf_calories + "</br>")
                        })
                     }
                 };
                 request.send();
             }
         }

})
