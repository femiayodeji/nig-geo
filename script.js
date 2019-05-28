
	function download(content, fileName, contentType, displayName) {
	    var a = document.createElement("a");
	    var file = new Blob([content], {type: contentType});
	    a.href = URL.createObjectURL(file);
	    a.download = fileName;
	    a.text = "Download as " + displayName;
	    a.click();
		document.body.appendChild(a);
	}

	function readTextFile(file)
	{
		fetch('data.txt')
			.then(response => response.text())
			.then((text) => {
				text = text;
 				//remove empty lines
 				var lines = text.split('\n').filter((line) => {
					return line != "\r";
				});
				var nig_geo_result = [];
				var state = "";
				lines.forEach((line) => {
					line = line.toLowerCase();
					//get state
					if(line.indexOf("state") > 0){
						state = line.split("state")[0].split(". ")[1].trim();
						console.log();						
					}
					//get local government area
					else{
						let lga = line.trim().split(',')
						let group = {};
						group.state = state;
						group.lga = lga;
						nig_geo_result.push(group);
					}
				});
				//create download links
				download(text, 'nig_geo_raw_text.txt', 'text/plain', 'raw file');
				download(JSON.stringify(nig_geo_result), 'nig_geo.json', 'application/json; charset=utf-8', 'json');
				download(JSON.stringify(nig_geo_result), 'nig_geo.txt', 'text/plain', 'string');
			});
	}
