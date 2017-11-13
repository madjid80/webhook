'use strict';

var git = require('simple-git');
var fs = require('fs');
var rimraf = require('rimraf');
var statuses = require('./statuses.js')

class Git{
  constructor(git_url, name, cb ){
    this.git_url = git_url
    this.name = name 
  }
  clone(cb){
    rimraf('./pr/'+this.name+'.patch', function (){})
    var gurl = this.git_url 
    var gname = this.name
    rimraf('./pr/'+this.name+'/', function () { 
      git("./pr/").raw(['clone',gurl, gname],function(err, res){ 
        cb()
      })
    });
  }
  git_cloned_cb(err, result){
    var expr = new RegExp(/(already exist)/, 'g')
    if(err && !err.match(expr)){
      console.log(">>> Git project can't clone "+err)
    }else{
      console.log(">>> Git Project cloned or already exist")
    }
  }
  apply_patch(patch, cb){
    var gname = this.name 
    var gurl = this.git_url
    this.store_patch(patch, function(err){
        git("./pr/"+gname+"/").raw(["apply", "../"+gname+".patch"], (err, result)=>{ 
          if(err){
            console.log(">>> Git patch apply failed "+ err)
            return 
          }
          console.log(">>> Git Patch applied")
          cb()
        })   
    })
  }
  store_patch(patch, cb){
      fs.writeFile("./pr/"+this.name+".patch", patch, function(err) {
        if(err){
          console.log(">>> Patch file can't save")
        }
        cb()
        console.log(">>> Patch file have saved")
      })
    }
}
module.exports = Git

