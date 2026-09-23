const http = require('http');
const dateTimeET = require('./src/dateTimeET.js');
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Kris Mozgovoi | Veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Kris Mozgovoi | Veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sisalda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>\n';
const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res){
	res.writeHead(200, {"Content-type": "text/html"});
	//res.write('Meie veeb käivitus!');
	res.write(pageHead);
	res.write(pageBody);
	// Leidsin lahenduse mis ei toiminud mul kuni ma asendasin ' märgid ära ` märkidega chatgpt abiga. Kuid me ei ole veel sellest õppinud seega ma ei kasutanud seda.
	//res.write(`\t<p>Hetkel on ${dateTimeET.dayET()}.</p>\n\t<p>Kuupäev on: ${dateTimeET.dateET()}</p>\n\t<p>Lehekülg avati kell: ${dateTimeET.timeET()}</p>`);
	res.write('\t<p>Hetkel on ' + dateTimeET.dayET() + '.</p>\n\t<p>Kuupäev on: ' + dateTimeET.dateET() + '</p>\n\t<p>Lehekülg avati kell: ' + dateTimeET.timeET() + '</p>');
	res.write(pageFoot);
	return res.end();
}).listen(5313);