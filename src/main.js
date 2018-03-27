// import { doctor } from './doctor';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import './../.env';
const apiKey = process.env.exports.apiKey;


$(document).ready(function() {
  $('#doctorList').click(function() {
    let medicalIssue = $('#medicalIssue').val();
    $('#medicalIssue').val("");

    $.ajax({
      url:
      `https://api.betterdoctor.com/2016-03-01/doctors?query=${medicalIssue}&location=47.606,-122.332,100&skip=0&limit=10&user_key=${apiKey}`,//searched by practice so that input issue key word can get all info

      data: {
        format: 'json'
      },
      success: function(response) {
        if (response.data.length === 0) {
          $('#doctorListResult').text("Sorry, we didn't find doctors to your criteria!");
        } else {
          $('#doctorListResult').text("Seattle area's doctor's name list for " + medicalIssue + " as below:")
          for(let i = 0; i <= response.data.length; i++){
            $('#doctorListResult').append(`<br><li class="list-group-item"> ${response.data[i].profile.first_name} ${response.data[i].profile.last_name}</li>`);
          }
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
      `https://api.betterdoctor.com/2016-03-01/doctors?location=47.606,-122.332,100&skip=0&limit=10&name=${doctorName}&user_key=${apiKey}`,//searched by doctors so that input name  can get all name related info
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
          if (response.data.length === 0) {
            $('#doctorNameInfo').text("Sorry, we didn't find doctors to your criteria!");
          }else {
            $('#doctorNameInfo').text("The infomation of Seattle area's doctors with " + doctorName + " in name as below:")
              for(let i = 0; i <= response.data.length; i++){
                $('#doctorNameInfo').append(`<br><div class="list-group-item">
                <li>Full name: ${response.data[i].profile.first_name} ${response.data[i].profile.middle_name} ${response.data[i].profile.last_name}</li>
                <li>Address: <br><div id="address">${response.data[i].practices[0].visit_address.street}<br> ${response.data[i].practices[0].visit_address.city}<br> ${response.data[i].practices[0].visit_address.state}${response.data[i].practices[0].visit_address.zip}</div></li>
                <li>Phone number: ${response.data[i].practices[0].phones[0].number}</li>
                <li>Accepting new patients or not: ${response.data[i].practices[0].accepts_new_patients}</li>
                </div>`);
                }
              }
            },
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.")
      }
    });
  });

});
