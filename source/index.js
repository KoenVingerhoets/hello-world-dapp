/*
 * Hello World!
 *
 * This is the javascript for a hello world dapp that runs in Eris' DeCerver.
 * It lets you run a typical Ethereum-style 'namereg' contract. You will register
 * your public address as a , but storing large files using IPFS 
 * (Interplanetary Filesystem) instead of a string.
 *																				  
 * Licence: https://github.com/eris-ltd/hello-world-dapp/blob/master/LICENSE.txt             
 *																				  
 */

'use strict';

var
  alertify = require('alertifyjs'),
  concat = require('concat-stream'),
  Promise = require('bluebird'),
  ipfs = require('ipfs-api')(window.location.hostname);

Promise.promisifyAll(ipfs);
ipfs.dht.getAsync = Promise.promisify(ipfs.dht.get);
ipfs.dht.putAsync = Promise.promisify(ipfs.dht.put);

module.exports = {
  getItem: getItem,
  setItem: setItem,
  getFile: getFile,
  addFile: addFile
};

function keyToBuffer(key, index) {
  return new Buffer("Eris Industries/Hello World/" + key + "/" + index);
}

// Get a value from IPFS.
function getItem(key, index, previousName) {
  index = index || 1;

  return ipfs.addAsync(keyToBuffer(key, index)).then(function (nameResult) {
    var
      hash;

    hash = nameResult[0].Hash;

    return ipfs.dht.getAsync(hash).then(
      function () {
        console.log("Found an entry for " + key + " at index " + index + ".");
        return getItem(key, index + 1, hash);
      },
      function (response) {
        if (previousName)
          return ipfs.dht.getAsync(previousName).then(function (valueHash) {
            // We create our own promise here insead of using the promisified
            // version of ipfs.cat because using that function causes a delay
            // long enough for us to miss incoming data in the stream.  A better
            // solution would be for the libraries we depend on to use a
            // buffered stream, etc., that isn't so sensitive to timing.
            return new Promise(function (resolve, reject) {
              ipfs.cat(valueHash, function (error, stream) {
                if (error)
                  reject(error);
                else
                  resolve(stream.pipe(concat()));
              });
            });
          });
        else
          throw new ReferenceError(key + " not found.");
      });
  });
}

// Store a key/value pair in IPFS.
function setItem(key, value, index) {
  index = index || 1;

  return ipfs.addAsync(keyToBuffer(key, index)).then(function (nameResult) {
    var
      hash;

    hash = nameResult[0].Hash;

    return ipfs.dht.getAsync(hash).then(
      function () {
        console.log("Found an entry for " + key + " at index " + index + ".");
        return setItem(key, value, index + 1);
      },
      function () {
        return ipfs.addAsync(new Buffer(value)).then(function (valueResult) {
          console.log("Storing " + [key, value] + " at index " + index + ".");
          return ipfs.dht.putAsync(hash, valueResult[0].Hash);
        });
      });
  });
}

function getFile(){
  var
    fName = document.getElementById('filenameGet').value,
    newValue;

  alertify.message("Getting file.", 0);

  getItem(fName).then(function (value) {
      alertify.dismissAll();
      alertify.success("Got file.");
      newValue = value;
    },
    function () {
      newValue = "";
      alertify.dismissAll();
      alertify.error("File not found");
    }).finally(function () {
      document.getElementById('output').value = newValue;
    });
};

function addFile(){
	var fName = document.getElementById('filenameAdd').value;
	var body = document.getElementById('input').value;
	
	if(body === "" || fName === ""){
		window.alert("You must provide a file name and some data.");
		return;
	}

  setItem(fName, body).then(function () {
    alertify.success("File sent! You can now get it by its name.");
  });
};
