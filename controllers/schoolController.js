const School = require("../models/School");

function calculateDistance(lat1,lon1,lat2,lon2){
    const R = 6371;
    const dLat = (lat2-lat1)*Math.PI/180;
    const dLon = (lon2-lon1)*Math.PI/180;

    const a = 
    Math.sin(dLat/2)**2+
    Math.cos(lat1*Math.PI/180)*
    Math.cos(lat2*Math.PI/180)*
    Math.sin(dLon/2)**2;
    const c = 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    return R*c;
}

exports.addSchool = async(req,res)=>{
    try{
        const {name,address,latitude,longitude}= req.body;
        if(!name||!address||!latitude||!longitude){
            return res.status(400).json({message:"all fields are required"});
        }
        const newSchool = new School({name,address,latitude,longitude});
        await newSchool.save();
        res.status(201).json({message:"School added successfully",school:newSchool})
    }catch(error){
        console.error(error);
        res.status(500).json({message:"server error"});
    }
};

//list schools sorted by proximity

exports.listSchools = async(req,res)=>{
    try{
        const {latitude,longitude}=req.query;
        if(!latitude ||!longitude){
            return res.status(400).json({message:"latitude and longitude required"})
        }
        const schools = await School.find();
        const sortedSchools = schools.map(school=>{
            const distance = calculateDistance(
                parseFloat(latitude),
                parseFloat(longitude),
                school.latitude,
                school.longitude
            );
            return {...school._doc,distance};
        }).sort((a,b)=>a.distance-b.distance);

        res.json(sortedSchools);

    }catch(error){
        console.error(error);
        res.status(500).json({message:"server error"});
    }
};
