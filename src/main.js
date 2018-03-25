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
      `https://api.betterdoctor.com/2016-03-01/practices?query=${medicalIssue}&location=47.606,-122.332,1000&skip=2&limit=10&user_key=c3dfed4a07279a16d0b71a5dc66d5b43`,//searched by practice so that input issue key word can get all info
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        $('#doctorListResult').text("Seattle area's doctor's list for " + medicalIssue + " as below:")
        for(let i = 0; i <= response.data.length; i++){
          $('#doctorListResult').append(`<br><li> ${response.data[i].name}</li>`);
          // $('#doctorInfo').text(`The location is ${response.results[i].vicinity}.`);
        }
      },
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.")
      }
    });
  });
});
