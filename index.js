var geoson = {
  "type": "FeatureCollection",
  "features":[

  ]

}


function feature(){
  this.type = "Feature";
  //  this.index = i;
  this.properties = {};
  this.geometry = {"type": "Point",
                    "coordinates":[]};
}


function gejson(dat){
//  console.log('type of dat ' +typeof(dat))
  dat = JSON.parse(dat);

  var tots = dat.length;
  console.log(tots)
  for(i in dat){
    var obj = dat[i];
  //  console.log(dat[i])
  var feats = pushfeatparts(dat[i])
  var blah = new feature();
  blah.properties= (feats);

  var geom = makeGeom(obj);
  blah.geometry.coordinates.push(Number(geom[0]),Number(geom[1]))
  //console.log(feats)
  //console.log(blah)
  var whoee = {}
  whoee[i] = (blah);
//  console.log(blah)
  geoson.features.push(blah);


//console.log(geoson);

  }



//geoson = geoson.toString()
var blabber = JSON.stringify(geoson)


   return blabber


}



function pushfeatparts(d){

//  console.log(d.date)

  return {
    "time": d.time,
    "date": new Date(d.date*1000),
    "category": d.category,
    "pddistrict": d.pddistrict,
    "dayofweek": d.dayofweek,
    "resolution": d.resolution,
    "incidntnum": d.incidntnum,
    "desc":d.descript
  }
}

function makeGeom (d){

  return [d.x, d.y]

}

module.exports = gejson
