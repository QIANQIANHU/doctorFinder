// import { weather } from './weather';
import './styles.css';
import $ from 'jquery';
import 'bootstrap';

$(document).ready(function() {
  $('#list').click(function() {
    let museumName = $('#museumName').val();
    $('#museumName').val("");

    $.ajax({
      url:
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=47.6061,-122.3421&radius=500&types=museum&name=${museumName}&key=AIzaSyDSFM9lXQaRZG4pnnUg5CtGyiT_Gjb0lCU`,
      
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        for(let i = 0; i < response.results.length; i++){
          $('#name').text(`The name of ${museumName} is ${response.results[i].name}.`);
          $('#address').text(`The location is ${response.results[i].vicinity}.`);
        }
      },
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.")
      }
    });
  });
});
