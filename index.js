const express = require('express');
const bodyparser = require('body-parser');
const consolidate = require('consolidate');

const app = express();

app.engine('html', consolidate.nunjucks);
app.set('views', './views');

app.use('/static', express.static('./static'));
app.use(bodyparser.urlencoded());

app.get('/', function(req, res){
	var user = req.query.username;
	console.log(user);

	if(user){
		res.render('index.html', {
			username: user
		});
	} else {
		res.render('index.html', {
			username: 'Anonymous'
		});
	}
	// res.render('index.html');
	
});

app.get('/profile/:username', function(req, res){
	var user = req.body.username;
	res.render('profile.html', {
		username: user
	});
})

app.post('/submit', function(req, res){
	var username = req.body.username;
	if(username){
		res.redirect('/profile/' + username);
	} else {
		res.redirect('/');
	}
});

app.listen(3000, function(){
	console.log("listening");	
});