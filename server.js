// server.js
var express = require('express'),
     multipart = require('connect-multiparty'),
    azure = require('azure-storage'),
    fs = require('fs');
var multipartMiddleware = multipart();
var app = express();
//config
var config = require('./config.json');

var STORAGE_KEY = config.STORAGE_KEY;
var STORAGE_ACCOUNT = config.STORAGE_ACCOUNT;
var blobSvc = azure.createBlobService(STORAGE_ACCOUNT, STORAGE_KEY);
// set the view engine to ejs
app.set('view engine', 'ejs');



// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// for upload
app.post('/file-upload',multipartMiddleware, function(req, resp) {
    var file = req.files.uploadFile;

    uplFile(file,"something");
    console.log(req.body, req.files);
    resp.redirect('/');

});

// about page 
app.get('/about', function(req, res) {

    getBlobsList("something", function(result){
        var blobList = [];
        result.entries.forEach(function(entry){
            blobList.push({name: entry.name})
        });

        res.render('pages/about',{
            list: blobList
        });
    });
   /* res.setAttribute('list');*/
 /*   res.render('pages/about',{
        list: bloblist
    });*/
});
var port = process.env.PORT || 1337;
app.listen(port);
console.log(port + ' is listening port');

//
function createCont(name,callback){
    if(!name){
        name = 'container';
    }
    blobSvc.createContainerIfNotExists(name, {publicAccessLevel : 'blob'}, function(error, result, response){
        if(!error){
            // Container exists and is private
            callback();
        }
        else {
            console.log(error);
        }
    });
}

function uplFile(file,containerName){

    createCont(containerName, function(){
        var path = file.path;
        var name = file.originalFilename;

        blobSvc.createBlockBlobFromLocalFile(containerName, name, path, function(error, result, response){
            if(!error){
            }
            else {
                console.log(error);
            }
        });

    });

}

function getBlobsList(blobname, callback){
    blobSvc.listBlobsSegmented(blobname, null, function(error, result, response){
        if(!error){
            console.log(result);
            callback(result);
            //return result;
        }
        else {
            console.log(error);
        }
    });
}