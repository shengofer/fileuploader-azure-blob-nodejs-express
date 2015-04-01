# file-uploader-azure-blob-nodejs-express
File Uploader using nodejs, express and azure, blob for hosting

Maybe still working project
[Visit Example!](http://shenazure.azurewebsites.net/)

## Table of Contents
- [Description](#description)
- [Run Local](#runlocal)
- [Host Remote](#howto)

## Description

## Using tools


## Run Local
If you want that it work, you must configure server blob!

1. go to project directory
2. install npm, node if needed
3. install node modules ~$npm install
4. run ~$node server.js

## Host Remote

1. go to  windows azure manage console [link](https://manage.windowsazure.com)
2. create web site
3. create storage
4. get Storage Account Name and Primary Access Key from Manage access keys  and put it into  config.json
5. upload it into azure web site [article how to deploy web sites on azure](http://azure.microsoft.com/en-us/documentation/articles/web-sites-deploy/)
     or if you prefer git [article how to deploy web sites on azure from local git](http://azure.microsoft.com/en-us/documentation/articles/web-sites-publish-source-control/)