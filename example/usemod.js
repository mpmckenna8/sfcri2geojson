var makegeojson = require('../index.js');


var req = require('request');
var fs = require('fs');

// data from https://data.sfgov.org/Public-Safety/SFPD-Incidents-Previous-Three-Months/tmnf-yvry
var numbRes = 8;

var url = 'http://data.sfgov.org/resource/gxxq-x39z.json?$limit='+ numbRes;

var datRe = req(url,function(err,res,body){
  if(err){
    throw err;
  }
  //console.log(res);

//  console.log(body);
  body = getSome(body);

  return body;
})
//.pipe(process.stdout)
.on('data', function(buff){
//  console.log('now buffer to stringing', buff.toString());
//  var pri = JSON.parse(buff);
  // I can do stuff with a buffer of the data here if I so choose.


})
//.pipe(getSome)
.on('error', function(err){
  console.log('something wrong with the rewquest', err)
})
// I should try and pipe into a stream transform so that this jam can handle bigger amounts of data in case SF's data portal actually gets useful with their api.



//console.log(datRe);
function getSome (dat){
  //on('data')
//  fs.createWriteStream('./blah.json');


//  console.log( makegeojson(dat));

  var geojson = makegeojson(dat);

  fs.writeFileSync('sfcrime.geojson', geojson);

  return geojson;


}
