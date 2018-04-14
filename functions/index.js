
const hbs = require('hbs');
const express = require('express');
const socketIO  = require('socket.io');
const http = require('http');
const functions = require("firebase-functions");
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
var admin = require("firebase-admin");

var cookieParser = require('cookie-parser');
app.use(cookieParser());

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "cocreate-ac987",
    clientEmail: "firebase-adminsdk-uk4tx@cocreate-ac987.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDHwilcDSsVcnUr\n+vOGFLdL7Pm00oHjcZRfxvsZBCgpu9sgzUKazhHucL1LbAkxNnRVCeEh5MN1j5Sm\nfoS6izk117Zw9+EYp+mYt2lDyhUYQner+QxZ3zhto40mmvw+Vf9wjC81oKRNtDEo\nupHc8euzw7TOY/HX4O3vwbWDjfmrZmwUqBGCNqh0ks+lxxIKUGw5dqaiu2e/6Zzs\nYQDfgKY9uvxxU/7DlHzAp8cZaNmLCv8maooglKa/MuHB4x64UnTOpGdjL28DGRVL\nJw84NPp7UyOCRymTZ4tperaV8EUzJecjUAa+DJCNichShPyD8/7NX8hF1XhVyzOh\ntXs85IG5AgMBAAECggEABO8zBBj3rNuTUSMtb40Us4mOqASwrHB+bqi8xGMNxm0j\nZjGn0Ojg+MO8a0/ngLmUgVLBhsuut9lUfdHff7enccDquurmmqwwKSNztFbaM0uW\nBu+bml85Fr084/ydWUFY0lwGIQQfNuOp+LR2HK/1p27AyT3fCBsAaaUecZnY1l7h\ntF/1J3mEPud8XjqYoUYzWfJQ2sQMSJbJZZIHtohfazIIAkuqtGVa3UjGvbZQnM6v\nZ/GHrIZtv4sFuDreOUvO1E7AYBzwHWub9fSLOEaA6KyZ0rvtUs2L2NLmH+/b/n4h\nOGBWZmIxWzPyCvntNaghXeAw6KBZE6i/kuwFXieGoQKBgQD8fzjUXl+yme2dZGQk\ny18IjUS4JjZK9kqgg2z8PsaLeQfWDgIhawniEeNEhycN14LLOgR/rvvaHrHs22XF\nQxE5fp5+x9o+GPrWlaJfxfVgxNPhVf8FjuYMHnuYdOH8BT/4Arg63GkSkvxfkgkn\n531Kzn9Q+RyJAc6+fGY9eKqYIQKBgQDKh6GjvY8XyVUeDy8zFS7D5Nwdoxm2KAk3\nD5lXqIV0FXSEITs2OjCfwrCo//Q4CyupD50IhIRqgkv6xU6btc7mfqPlRJDzGzkW\nWtPS4JI8cdhtT3yIjgY/Se4HDDRO72A8uxnbns/o5OZIDNkFeziw3xo4HULgBwWm\n3zOPu0TWmQKBgQDT+U5RY4U9oGJOTxiPlziKKmb1ngbYedn+1TbqsRznvEzq1EnP\nmlfqtY+xWTFdOn7wdB2Qv+tpm3lN2oaey4YrWXRgBRHgLgJvoaF2e+9bNQKX2yVE\nmknhBLpILGAHvrSMVmQp7h473LAI38XV/U4/Pgq+hNQC5USWwELo+mNlYQKBgQDA\nnbfsG2dQzwklunlAUwAUDMAPa8QTSwZgmHRVOxAZNCKJW3WOAE+oUahkQnGJL46J\njjDiHe41wc/zIt29F288JetILCrTGuvzR9S3dR9/XyLf6z3cPX7RiEVZ7JB/Fgho\nGeXgyqyfqbsdgSKRpPxosvajsaidmfAVIahPJWK12QKBgQDLdYBt0DcBpjEUwXuF\nho3WOci5V4mJCEPzlnuggY9HDvvw0Bt5OL68FZIxGHcusE+iZiFrgeXYvLNY4Y9W\nGjfzzt1NAmnDIz36WLT8MHuBkWMFpyM0RrTQQCNGxjpKPiR9p0xYuk/uwcBdK3hA\n+uCuVNCIUZ1RyeOuf++89YlrUA==\n-----END PRIVATE KEY-----\n"
  }),
  databaseURL: "https://cocreate-ac987.firebaseio.com"
});






/*
app.use(function (req, res, next) {
    // check if client sent cookie
    if (cookie = req.cookies.cookieName)
    {
      // no: set a new cookie
      var randomNumber=Math.random().toString();
      randomNumber=randomNumber.substring(2,randomNumber.length);
      res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
      console.log('cookie created successfully');
    } 
    else
    {
      // yes, cookie was already present 
      console.log('cookie exists', cookie);
    } 
    next(); // <-- important!
  });
*/
app.set('view engine','hbs');
var revokedTime=0;


app.get("/data", function(request, response) {


    var idToken = request.param('token');
    console.log(idToken);
    //
    //var uid = request.param('uid')
    
    admin.auth().verifyIdToken(idToken)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
      response.cookie('name', 'express').send('cookie set');
      console.log("uid",uid);
    }).catch(function(error) {
      console.log(error);
    });
    
});

app.get('/cok',(request,response)=>{
  response.send(request.cookies.name);
});

app.get('/',(req,res)=>{
    res.render('auth.hbs');
    //res.sendFile(__dirname+'/../public/msg.html');
});
exports.server = functions.https.onRequest(app);