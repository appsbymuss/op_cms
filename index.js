const express = require('express');
const guestRoute = require('./routes/guest');
const adminRoute = require('./routes/admin');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const logger = require('./utilities/log/index');
const app = express();


app.use(fileUpload({}));
app.use(logger('FORMAT_MAIN'))

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session(
    {
      secret: 'secretsecret1112',
      resave: false,
      saveUninitialized: true
    }
));
app.use(express.static(__dirname + '/public'));

app.listen(3000,() => {
    console.log(__dirname + '/views/assets')
    console.log("Listening...\n");
});

app.get('/test',(req,res) => {
  console.log(...[req.headers['x-forwarded-proto']]);
  console.log((req.headers['x-forwarded-proto'] ? "yes" : "nein"))
  res.send(`
    <html>
      <head>
      </head>
      <body>
        <form method='POST' enctype='multipart/form-data'>
          <input type='file' name='image' />
          <button type='submit'>Send</button>
        </form>
      </body>
    </html>
  `)
})
app.post('/test',async (req,res) => {
  console.log(req.body);
  console.log(req.files)
  console.log(req.files['image']);
  await req.files['image'].mv(__dirname + '/public/assets/img/uploadedImages/' + req.files['image'].name)
  res.send("yes");
})

app.use(guestRoute);
app.use('/admin',adminRoute);



