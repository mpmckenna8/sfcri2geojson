var geoson = {
  "type": "FeatureCollection",
  "features":[]
}

let final_object = {
geojson: geoson,
nongeo: [ ]
}

/* The exported function
Takes the data returned from the request for SF crime data and parses it into an object with a geojon object and an array of things with no coordinates

{
geojson: {
geo object here
}
nongeo: [ array of other things.]
}
*/
function gejsonify(dat){
//  console.log('type of dat ' +typeof(dat))
  dat = JSON.parse(dat);

  var tots = dat.length;
  //console.log(tots)
  for(i in dat){
    var obj = dat[i];
  //  console.log(dat[i])
    var feats = pushfeatparts(dat[i])
    var blah = new feature();
    blah.properties= (feats);


    if(obj.latitude) {
    var geom = makeGeom(obj);
    blah.geometry.coordinates = geom
    //console.log(blah)
    geoson.features.push(blah);

    }
    else {

      console.log('this has no lat, ', obj)
      final_object.nongeo.push(obj)
    }

  }


  final_object.geojson = geoson;

  return final_object


}



function pushfeatparts(d){

//  console.log(d.date)

  return {
    "datetime": d.incident_datetime,
    //"date": new Date(d.date*1000),
    report_type_description: d.report_type_description,
    "category": d.incident_category,
    incident_subcategory: d.incident_subcategory,
    "pddistrict": d.police_district,
    "dayofweek": d.dayofweek,
    "resolution": d.resolution,
    "incident_number": d.incident_number,
    "desc":d.incident_description
  }
}

function makeGeom (d){

  return [parseFloat(d.latitude), parseFloat(d.longitude)]

}

function feature(){
  this.type = "Feature";
  //  this.index = i;
  this.properties = {};
  this.geometry = {"type": "Point",
                    "coordinates":[]};
}



module.exports = gejsonify
