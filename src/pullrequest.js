var Statuses = require('./statuses.js')
var Git = require('./gitmng.js')
var curljs = require('curljs');

var open_pr = function(request_body){
  var pr = request_body.pull_request
  var syntax_checking = new Statuses(pr.statuses_url, "Syntax Checking", "")
  var build_checking = new Statuses(pr.statuses_url, "Build Checking", "")
  var test_checking = new Statuses(pr.statuses_url, "Test Checking", "")
  syntax_checking.pending(); 
  build_checking.pending();
  var curlOpts = curljs.opts.silent()
                   .follow_redirects()
                   .connect_timeout(300)
  var git = new Git(pr.base.repo.clone_url, pr.id)
  git.clone(function(){
    curljs(pr.patch_url, curlOpts, function(err, data, stderr){
      git.apply_patch(data, function(){
        syntax_checking.success();
      })
    });
  });
  
}

exports.process = function(request_body){
  var expr = new RegExp( /[a-z]*(open)[a-z]*/ , 'g')
  var propen = request_body.action.match(expr)
  if(propen){
    open_pr(request_body)
  }
}
