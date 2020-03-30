var express = require('express');
var router = express.Router();
var unit = require('../gulpTask/_unit.js');
var fs = require('fs');
var child_process = require('child_process');
var config = require('../config/index.js');
router.route('').post(function(req,res){
    var {data,prefix,fontName} = req.body,
        json = JSON.stringify({prefix,list:data},{space:2}),
        fileName = `fontmin_${fontName}_${Date.now()}`,
        jsonPath = unit.pathInterim(`${fileName}.json`);
    try{
        fs.writeFileSync(jsonPath,json,{encoding:'utf-8'});
        child_process.execSync(`gulp fontmin --prefix ${prefix} --fontName ${fontName} --fileName ${fileName}`,{cwd:__dirname});
        // child_process.execSync(`gulp fontmin --prefix ${prefix} --fontName ${fontName} --fileName ${fileName}`);
        res.send({rcode:0,zip:`${config.HOST}/zip/${fileName}.zip`});
    }catch(e){
        console.log(e);
        res.send({rcode:-1,e});
    }
})

module.exports = router;
