// server.js
// load the things we need
var express = require('express'),
     multipart = require('connect-multiparty'),
    azure = require('azure-storage'),
    fs = require('fs');
var multipartMiddleware = multipart();
var app = express();

var STORAGE_KEY = "6pqmHc7FXko4wxRztssS9AAfMShKUxZ+mMgzx2vA6IK3BitQ3XlM0tK/RTvYsMDB8PZKO/BdIqeSiFa3UHZ4/Q==";
var STORAGE_ACCOUNT = "shenazure";
var blobSvc = azure.createBlobService(STORAGE_ACCOUNT, STORAGE_KEY);
// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file


// index page 
app.get('/', function(req, res) {
    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

    res.render('pages/index', {
        drinks: drinks,
        tagline: tagline
    });
});

// for upload
app.post('/file-upload',multipartMiddleware, function(req, resp) {
    var file = req.files.uploadFile;
/*    var files = req.files;
    var path =req.files*/
    uplFile(file,"something");
    console.log(req.body, req.files);
    resp.redirect('/');
/*    var file = req.files.file1;
    console.log(file.body);
    console.log(file.files);*/
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