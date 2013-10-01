
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Kipling &gt; Agile Story Magic' });
};

exports.app = function(req, res){
  res.render('partials/app', { title: 'Express' });
};