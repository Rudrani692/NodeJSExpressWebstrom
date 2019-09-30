var express = require('express');
var router = express.Router();

//**************************************************************************
//***** mongodb get all of the Routes in Routes collection where frequence>=1
//      and sort by the name of the route.  Render information in the views/pages/mongodb.ejs
router.get('/mongodb', function (request, response) {

  mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if(err) throw err;
    //get collection of routes
    var Routes = db.collection('Routes');
    //get all Routes with frequency >=1
    Routes.find({ frequency : { $gte: 0 } }).sort({ name: 1 }).toArray(function (err, docs) {
      if(err) throw err;

      response.render('pages/mongodb', {results: docs});

    });

    //close connection when your app is terminating.
    db.close(function (err) {
      if(err) throw err;
    });
  });//end of connect
});//end app.get

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CS at CSUEB' });
});

module.exports = router;

