const http = require('http');
//moodul URL päringu parsimiseks
const url = require('url');
//moodul failitee haldamiseks
const path = require('path');
//const fs = require('fs');
const fs = require('fs').promises;
const randomJpg = require('./src/pildid.js');
const dateTimeET = require('./src/dateTimeET.js');
const wisdomET = require('./src/vanasona.js');
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Kris Mozgovoi | Veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBanner = '\t<img src="veebiprogrammeerimine_2026_AA.png" alt="banner">';
const pageBody = '\t<h1>Kris Mozgovoi | Veebiprogrammeerimine</h1>\n\t<p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sisalda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>\n';
const pageFoot = '\n</body>\n</html>';

http.createServer(async function(req, res){
	console.log(req.url);
	let currentURL = url.parse(req.url, true);
	console.log('Parsituna: ' + currentURL.pathname);
	
	if(currentURL.pathname === '/'){
		res.writeHead(200, {"Content-type": "text/html"});
		//res.write('Meie veeb käivitus!');
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		// Leidsin lahenduse mis ei toiminud mul kuni ma asendasin ' märgid ära ` märkidega chatgpt abiga. Kuid me ei ole veel sellest õppinud seega ma ei kasutanud seda.
		//res.write(`\t<p>Hetkel on ${dateTimeET.dayET()}.</p>\n\t<p>Kuupäev on: ${dateTimeET.dateET()}</p>\n\t<p>Lehekülg avati kell: ${dateTimeET.timeET()}</p>`);
		res.write('\t<p>Täna on ' + dateTimeET.dayET() + ', ' + dateTimeET.dateET() + '</p>\n\t<p>Lehekülg avati kell: ' + dateTimeET.timeET() + '</p>\n\t<hr>\n');
		res.write('\t<ul>\n\t<li><a href="/vanasona">Vanasõna</a></li>\n\t<li><a href="/faq">FAQ</a></li>\n\t<li><a href="/pildid">Pildid</a></li>\n\t</ul>\n');
		res.write('\t<img src="/pic/' + await randomJpg.randomJpgPicture() + '" alt="juhuslik pilt">');
		res.write(pageFoot);
		return res.end();
	}
	else if(currentURL.pathname === '/vanasona'){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write('\t<h1>Tänase päeva vanasõna</h1>\n\t<p><a href="..">Avaleht</a></p>\n\t<p>Siin näed tänaseks loositud Eesti vanasõna.</p>\n\t<hr>\n\t<p>' + await wisdomET.folkWisdomET() + '</p>');
		res.write('\t<img src="/pic/' + await randomJpg.randomJpgPicture() + '" alt="juhuslik pilt">');
		res.write(pageFoot);
		return res.end();
	}
	else if(currentURL.pathname === '/faq'){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write('\t<h1>FAQ</h1>\n\t<p><a href="..">Avaleht</a></p>\n\t<p><b>Miks TLÜ?</b></p>\n\t<p>Tulin õppima Tallinna Ülikooli kuna mind on suurem osa elust huvitanud tehnoloogia ja arvutid ning soovin arendada oma teadmisi ja oskusi.</p><hr>');
		res.write('\t<img src="/pic/' + await randomJpg.randomJpgPicture() + '" alt="juhuslik pilt">');
		res.write(pageFoot);
		return res.end();
	}
	else if(currentURL.pathname === '/pildid'){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write('\t<p><a href="..">Avaleht</a></p>');
		for (const picture of await randomJpg.allJpgPictures()) {
			res.write('\t<img src="/pic/' + picture + '" alt="' + picture + '">\n');
		}
		res.write(pageFoot);
		return res.end();
	}
/* 	else if(currentURL.pathname === '/veebiprogrammeerimine_2026_AA.png'){
		//liidame virtuaalse serveri päris kataloogiga
		let bannerPath = path.join(__dirname, 'pic', currentURL.pathname);
		fs.readFile(bannerPath, (err, data)=>{
			if(err){
				throw(err);
			} else{
				res.writeHead(200, {"Content-type": "image/png"});
				res.end(data);
			}
		});
	} */
	else if(path.extname(currentURL.pathname) === '.jpg'){
		let pictureName = path.basename(currentURL.pathname);
		let picturePath = path.join(__dirname, 'pic', pictureName);
		try{
			const data = await fs.readFile(picturePath);
			res.writeHead(200, {"Content-type": "image/jpeg"});
			return res.end(data);
		} catch (err){
			res.writeHead(404, {"Content-type": "text/plain; charset=utf8"});
			return res.end('Pilti ei leitud');
		}
	}
	else if(currentURL.pathname === '/veebiprogrammeerimine_2026_AA.png'){
		//liidame virtuaalse serveri päris kataloogiga
		let bannerPath = path.join(__dirname, 'pic', currentURL.pathname);
		try{
			const data = await fs.readFile(bannerPath);
			res.writeHead(200, {"Content-type": "image/png"});
			return res.end(data);
		} catch(err){
			res.writeHead(404, {"Content-type": "text/plain; charset=utf8"});
			return res.end('Pilti ei leitud');
		}
	}
	else{
		res.end("Viga 404! Ei leia sellist lehte.");
	}
}).listen(5313);