// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .


var Callbacks = (function() {

  var createSite = function(url, data) {
       // Make .ajax request here
    var authParam = $('meta[name=csrf-param]').attr('content');
    var authToken = $('meta[name=csrf-token]').attr('content');
    data[authParam] = authToken;
       $.ajax({
      type: "post",
      url: url,
      data: data
    }).done(postSuccessHandler);

  };

  var addNewUrlToTable = function(url, httpResponse) {
    // Actually add the url and response code to the table
    $('#siteTable').append("<td><a href=>" + url + "</a></td>");
    $('#siteTable').append("<td>" + httpResponse + "</td><br>");
    // Actually add the url and response code to the table
  };

  var postSuccessHandler = function(response) {
      // Call addNewUrlToTable and insert the results

    Callbacks.addNewUrlToTable(response.url, response.http_response);

  };

  var postFailureHandler  = function(jqXHR) {
      // The request failed.
  };

  var onSubmitSiteClickHandler =  function() {
      var site = $('#siteInput').val();
      var data = {};
      data.site = {url: site};
      var url = "/sites.json";

      Callbacks.createSite(url, data);

     

      
      // We have the site, now call create site
      // to make the request
  };
  return {
    postSuccessHandler : postSuccessHandler,


    postFailureHandler : postFailureHandler,

    onSubmitSiteClickHandler : onSubmitSiteClickHandler,
    createSite : createSite,

    addNewUrlToTable : addNewUrlToTable
  };  
})();

$(window).load(function() {
  $("<label>New Site</label><br /><input type=\"text\" id=\"siteInput\"></input><button id=\"checkSite\">Check Site</button>").insertBefore("#siteTable");

  // Adding the onSubmitSiteClickHandler to kick off the ajax
  // request      
  $('#checkSite').click(Callbacks.onSubmitSiteClickHandler);

});