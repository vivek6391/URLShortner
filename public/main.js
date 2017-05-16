function getURL() {
var url = $('#url').val();
var result = {};
result['urlstr'] = url;
$.ajax({
    url: 'https://urlshortv.herokuapp.com/urls',
    type: 'POST',
    crossDomain: true,
    dataType: 'json',
    data: JSON.stringify(result),
    contentType: 'application/json',
    success: function(result) {
	init();
	$('#url').val('');
        // Do something with the result
    },
    error: function(result) {
	init();
	$('#url').val('');
        // Do something with the result
    }	
});
	
}
var dataStore = {}; 

function deleteAssociation(id) {
if (confirm("Are you sure you want to delete?")) {
	$.ajax({
	    url: 'https://urlshortv.herokuapp.com/urls/'+id,
	    type: 'DELETE',
	    success: function(result) {
		init();
		$('#url').val('');
		// Do something with the result
	    },
	    error: function(result) {
		init();
		$('#url').val('');
		// Do something with the result
	    }	
	});
}
}

function editAssociation(id) {
	$('#editForm').show();
        var data = dataStore[id];
	var url = data.urlstr;
	var temp = data.tinyurlstr.split('/');
	$('#urlid').text(id);
	$('#urlstr').val(url);
	$('#tinyurlstr').val(temp[temp.length-1]);
}

function editURL() {
var url = $('#urlstr').val();
var urlstr = 'https://urlshortv.herokuapp.com/' + $('#tinyurlstr').val();
var id = parseInt($('#urlid').text());

var result = {};
result['urlstr'] = url;
result['id'] = id;
result['tinyurlstr'] = urlstr;

$.ajax({
    url: 'https://urlshortv.herokuapp.com/urls/'+id,
    type: 'PUT',
    crossDomain: true,
    dataType: 'json',
    data: JSON.stringify(result),
    contentType: 'application/json',
    success: function(result) {
	init();
	$('#url').val('');
	$('#urlstr').val('');
	$('#tinyurlstr').val('');
	$('#urlid').val('');
	$('#editForm').hide();
        // Do something with the result
    },
    error: function(result) {
	init();
	$('#url').val('');
	$('#urlstr').val('');
	$('#tinyurlstr').val('');
	$('#urlid').val('');
	$('#editForm').hide();	
        // Do something with the result
    }	
});
	
}

function init () {
$('#result').html('');
dataStore = {};
$.ajax({
    url: 'https://urlshortv.herokuapp.com/urls',
    type: 'GET',
    contentType: 'application/json',
    success: function(result) {
	var html = '<table class="table table-bordered table-striped"><thead><tr><td>URL</td><td>TinyURL</td><td>Action</td></tr></thead><tbody>';
	for (var i = 0, len = result.length; i < len; ++i) {
	    dataStore[result[i].id] = result[i];
	    html += '<tr><td>'+ result[i].urlstr + '</td><td> <a href="'+ result[i].tinyurlstr +'" target="_blank">'+ result[i].tinyurlstr + '</a></td>' 
	    html += '<td><span class="glyphicon glyphicon-trash" onclick="deleteAssociation('+ result[i].id +');"></span>&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-pencil" onclick="editAssociation('+ result[i].id  + ');"></span></td></tr>';
	}
	html += '</tbody></table>';
	$('#editForm').hide();
	$(html).appendTo('#result');
	// Do something with the result
    }
});
}

$(document).ready(function() {
	init();  
});




