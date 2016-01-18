// JavaScript Document

//Settings
var ratio = 90;


$("#generate").click(function(e) {
	$("#generate").hide();
	$("#print").show();
	if(document.getElementById("useRatio").checked === true){
		console.log($("#ratioInput").val());
		ratio = Number($("#ratioInput").val());
	}	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		var connect = chrome.tabs.connect(tabs[0].id,{name: "extract"});
		connect.postMessage({job:"extract",ratio:ratio});
		connect.onMessage.addListener(function(msg) {
				$("#console").text(msg);
				console.log(msg);
		});		
	});
	
});

$("#print").click(function(e) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, "Print", function(response) {
			$("#console").text(response);
			console.log(response);
		});  
	});
});


$("#useRatio").change(function(e) {
	if(document.getElementById("useRatio").checked){
		console.log("checked!");
		$("#ratioInput").removeAttr("disabled");
	}
	else{
		console.log("unchecked!");
		$("#ratioInput").attr("disabled","disabled");
	}
});
