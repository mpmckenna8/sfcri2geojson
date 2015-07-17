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
  //console.log(process.getgid());

//  console.log(body);
  body = getSome(body);

  return body;
})
//.pipe(process.stdout)
.on('data', function(buff){
  console.log(buff.toString());
//  var pri = JSON.parse(buff);

})
.pipe(fs.createWriteStream('./crime.json'))
//.pipe(process.stdout)



//console.log(datRe);
function getSome (dat){
  //on('data')
//  fs.createWriteStream('./blah.json');


console.log( makegeojson(dat));

  var geojson = makegeojson(dat);

  fs.writeFileSync('sfcrime.geojson', geojson);

  return geojson;


}
