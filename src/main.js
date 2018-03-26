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
      `https://api.betterdoctor.com/2016-03-01/practices?query=${medicalIssue}&location=47.606,-122.332,100&skip=0&limit=10&user_key=c3dfed4a07279a16d0b71a5dc66d5b43`,//searched by practice so that input issue key word can get all info
      //
      // https://api.betterdoctor.com/2016-03-01/practices?location=47.606,-122.332,100&skip=0&limit=10&user_key=c3dfed4a07279a16d0b71a5dc66d5b43&query=head
      data: {
        format: 'json'
      },
      success: function(response) {
        $('#doctorListResult').text("Seattle area's doctor's list for " + medicalIssue + " as below:")
        for(let i = 0; i <= response.data.length; i++){
          $('#doctorListResult').append(`<br><li> ${response.data[i].uid}</li>`);
          // $('#doctorInfo').text(`The location is ${response.results[i].vicinity}.`);
        }
      },
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.")
      }
    });
  });

$('#doctorInfo').click(function() {
  let doctorName = $('#doctorName').val();
  $('#doctorName').val("");

  $.ajax({
    url:
    `https://api.betterdoctor.com/2016-03-01/doctors?location=47.606,-122.332,100&skip=0&limit=10&user_key=c3dfed4a07279a16d0b71a5dc66d5b43&name=${doctorName}&user_key=c3dfed4a07279a16d0b71a5dc66d5b43`,//searched by doctors so that input name  can get all name related info
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        $('#doctorNameInfo').text("Seattle area's doctor's name related with " + doctorName + " as below:")
        for(let i = 0; i <= response.data.practices.length; i++){
          $('#doctorNameInfo').append(`<br><li> ${response.data.practices[i].profile.name}</li>`);
          // $('#doctorInfo').text(`The location is ${response.results[i].vicinity}.`);
        }
      },
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.")
      }
    });
  });

});
