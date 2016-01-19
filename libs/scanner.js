var addr = ["http://202.116.13.24:8077/ss2jpg/ss2jpg.dll?did=a174&pid=C3C0BFC3B8905CF2E8DCDAE2FB119C065A4550FD3D6992417A7C9CA14D96F75C78C3BE8780EACB175272C5721B4F8AC473745D29B37D8F96709B3CBB47B927F69D4CFD2063A8D4304D1807EE22297C0ABCD060161C286870827E72206AF9000D8174E6EAC0F1E7A787522D1B37079BD4411B&jid=/!00004.jpg","http://202.116.13.24:8077/ss2jpg/ss2jpg.dll?did=a174&pid=343377D16C19467B3E9C35B21FBF2DB7B283EC0AAEB3A1025EAE9FEFE467B63AF492F6D10C5FB01FC21581982119FE929CC738817572128059224967C48C79C906E2F39B39A03B1E1C539472D32AE21BD73FA1A50B4021F2A51FADE7A6D72C19C0043D6322FF7C65CE462B35D05A501B0DDE&jid=/000002.jpg&uf=ssr&zoom=0"];

function pageURIScanner(){
	var pageImageSrc = new Array([]);
	imageNodes = $("#Readweb").find("input").get();
	//console.log(imageNodes);
	for(i=0;i<imageNodes.length;i++){
		pageImageSrc[i] = imageNodes[i].src;
	}
	return pageImageSrc;
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message === "Print"){	
	window.print();		
    }
});


chrome.runtime.onConnect.addListener(function(port) {
	console.assert(port.name === "extract");
	port.onMessage.addListener(function(msg) {
		if(msg.job === "extract"){	
			document.getElementsByTagName("style")[0].appendChild(document.createTextNode("@media print {.pageImg{width:" + msg.ratio + "%}}"));
			port.postMessage("Processing...");	
			addr = pageURIScanner();		
			var bodyOld = document.getElementsByTagName("body")[0];
			bodyOld.remove();
			bodyNew = document.createElement('body');
			bodyNew.style.height = "auto";
			var bodyInnerHTML = "";
			for(i=0;i<addr.length;i++){
			var pageHTMLString = "<img class='pageImg' src='" + addr[i] + "'></img>";
			bodyInnerHTML += pageHTMLString;
			}
			bodyNew.innerHTML = bodyInnerHTML;
			document.getElementsByTagName("html")[0].appendChild(bodyNew);
			document.getElementsByTagName("html")[0].style.overflow = "scroll";
			port.postMessage('Page analysis success! Now press "Print" button to generate PDF file.');
			//window.print();				  
		}
	});
});

//var layer = document.createElement("div");
//layer.id = "layer";
//layer.innerHTML = "Printing Layer 123";
