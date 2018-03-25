// import { doctor } from './doctor';
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
// var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('#doctorList').click(function() {
    let medicalIssue = $('#medicalIssue').val();
    $('#medicalIssue').val("");

    $.ajax({
      url:
      `https://api.betterdoctor.com/2016-03-01/practices?query=${medicalIssue}&location=47.606,-122.332,1000&skip=2&limit=10&user_key=c3dfed4a07279a16d0b71a5dc66d5b43`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        for(let i = 0; i <= response.data.length; i++){
          $('#doctorListResult').append(`<br>Doctor's list for ${medicalIssue} is ${response.data[i].name}.`);
          // $('#doctorInfo').text(`The location is ${response.results[i].vicinity}.`);
        }
      },
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.")
      }
    });
  });
});
