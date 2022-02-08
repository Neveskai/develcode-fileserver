var path = require('path');
var express = require('express');
const cors = require('cors');
var fileUpload = require('express-fileupload');
var app = express();

var dir = path.join(__dirname, 'public');

app.use(express.static(dir));
app.use(fileUpload());
app.use(cors());

app.post('/setProfilePicture/:cod', function(req, res) {
    const cod = req.params.cod;
    const sampleFile = req.files['files'];
    const uploadPath = dir +'/users/'+ cod +'.jpg';

    if (!req.files || Object.keys(req.files).length === 0) return res.status(400).send(req.body.files);

    sampleFile.mv(uploadPath, function(err) {
        if (err) return res.status(500).send(err);
        res.send({foto: 'http://localhost:3002/users'+cod+'.jpg', cod: cod});
    });
});

app.listen(3002, function () {
    console.log('Listening on http://localhost:3002/');
});
