module.exports = function(app, passport, db, multer, ObjectId, querystring, request, unirest) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    // app.get('/', function(req, res) {
    //     res.render('index.ejs');
    // });

      // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        db.collection('home').find().toArray((err, result) => {
          if (err) return console.log(err)

          // loging the returned object
          console.log(result);

          // db.collection('clip').find().toArray((err, image) => {
          //   if (err) return console.log(err)

            res.render('home.ejs', {
              userExperience: result,
              isAuthenticated: req.isAuthenticated()
              // image: image
            })


          // })

        })
      });

      //home page after the user logs in (also has sign out link)
    app.get('/home', isLoggedIn, function(req, res) {
        db.collection('home').find().toArray((err, result) => {
          if (err) return console.log(err)

          // loging the returned object
          console.log(result);

          // db.collection('clip').find().toArray((err, image) => {
          //   if (err) return console.log(err)

            res.render('home.ejs', {
              user : req.user,
              userExperience: result,
              isAuthenticated: req.isAuthenticated()
              // image: image
            })


          // })

        })
    });

      // show the home page (will also have our login links)
    app.get('/recipe', async function(req, res) {
        // db.collection('home').find().toArray((err, result) => {
        //   if (err) return console.log(err)

          // loging the returned object
          // console.log(result);

          // db.collection('clip').find().toArray((err, image) => {
          //   if (err) return console.log(err)

          // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
          // Api Call Start
          // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

          const options = {
          url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?diet=vegetarian&excludeIngredients=coconut&intolerances=egg%2C+gluten&number=10&offset=0&type=main+course&query=chicken`,
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Accept-Charset': 'utf-8',
              "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
              "X-RapidAPI-Key": process.env.API_KEY
                }
              };

              let json = null;

           request.get(options, function(err, response, body) {
              json = JSON.parse(body);

              let id = json.results.map( object => object.id )

              let summary = []

              for(let i = 0; i < id.length; i++){

              unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id[i]}/summary`)
                .header("X-RapidAPI-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
                .header("X-RapidAPI-Key", "3b9cef5eb9msh67190bd6115d508p1d9459jsna3090c8e884c")
                .end(function (result) {
                  summary.push(result)
                  console.log(result.status, result.headers, result.body, "summary in the loop: ", summary);
                });

              }

              console.log("javascript Object Notation: ", json, "id: ", id, "summary: ", summary);

              res.render('recipes.ejs', {
                     recipes: json,
                     recipeDescription: summary,
                     isAuthenticated: req.isAuthenticated()
                   })

            });

            // res.send(json);



          // })

        // })
      });

      // APi Data Call ####################
        // show the home page (will also have our login links)

        // fetch(`./search?search=${food}`)

      app.get('/search', function(req, res) {
           let search = req.query.search;


               // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
               // Api Call Start
               // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

               const options = {
               url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?cuisine=american&diet=vegetarian&excludeIngredients=meat&intolerances=soy&number=50&offset=0&type=main+course&query=${search}`,
               method: 'GET',
               headers: {
                   'Accept': 'application/json',
                   'Accept-Charset': 'utf-8',
                   "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                   "X-RapidAPI-Key": process.env.API_KEY
                     }
                   };

                   let json = null;

               request.get(options, function(err, response, body) {
                   json = JSON.parse(body);
                   console.log(json);

                   // res.send(json);
                   res.render('recipes.ejs', {
                         recipes: json,
                         isAuthenticated: req.isAuthenticated()
                       })
                 });

                 // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                 // Api Call End
                 // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

          });


      //home page after the user logs in (also has sign out link)
    app.get('/profileChef', isLoggedIn, function(req, res) {
        db.collection('home').find().toArray((err, result) => {
          if (err) return console.log(err)

          // loging the returned object
          console.log(result);

          // db.collection('clip').find().toArray((err, image) => {
          //   if (err) return console.log(err)

            res.render('profileChef.ejs', {
              user : req.user,
              userExperience: result,
              isAuthenticated: req.isAuthenticated()
              // image: image
            })


          // })

        })
    });

      //home page after the user logs in (also has sign out link)
    app.get('/creations', isLoggedIn, function(req, res) {
        db.collection('home').find().toArray((err, result) => {
          if (err) return console.log(err)

          // loging the returned object
          console.log(result);

          // db.collection('clip').find().toArray((err, image) => {
          //   if (err) return console.log(err)

            res.render('creations.ejs', {
              user : req.user,
              userExperience: result,
              isAuthenticated: req.isAuthenticated()
              // image: image
            })


          // })

        })
    });




    // DUE TO BE DELETE ************************************************
    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('messages').find().toArray((err, result) => {
          if (err) return console.log(err)

          db.collection('clip').find().toArray((err, image) => {
            if (err) return console.log(err)

            res.render('profile.ejs', {
              user : req.user,
              messages: result,
              image: image
            })


          })

        })
    });
    // DUE TO BE DELETE ************************************************


    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

//Test =========================================================================
    app.get('/test', isLoggedIn, function(req, res) {
        console.log(req.session.passport.user)
    });
// message board routes ========================================================

    // DUE TO BE DELETE ************************************************
    app.post('/messages', (req, res) => {
      db.collection('messages').save({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })
    // DUE TO BE DELETE ************************************************

    // DUE TO BE DELETE ************************************************
    app.put('/messages', (req, res) => {
      db.collection('messages')
      .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
        $set: {
          thumbUp:req.body.thumbUp + 1
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })
    // DUE TO BE DELETE ************************************************

    // DUE TO BE DELETE ************************************************
    app.delete('/messages', (req, res) => {
      db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })
    // DUE TO BE DELETE ************************************************
    //---------------------------------------
    // IMAGE CODE
    //---------------------------------------
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'public/images/uploads')
        },
        filename: (req, file, cb) => {
          cb(null, file.fieldname + '-' + Date.now() + ".png")
        }
    });
    var upload = multer({storage: storage});

    app.post('/up', upload.single('file-to-upload'), (req, res, next) => {

        insertDocuments(db, req, 'images/uploads/' + req.file.filename, () => {
            // db.close();
            // res.json({'message': 'File uploaded successfully'});
            res.redirect('/profile')
        });
    });


    // DUE TO BE DELETE ************************************************
    // Loading one image so the user can view one picture at a time
    app.get('/photo', isLoggedIn, (req, res) => {

      let imageId = req.query.id

      console.log("id: ", imageId);

    db.collection('clip').find().toArray((err, image) => {
      if (err) return console.log(err)

      const imgArray= image.map(element => element._id);

      var filename = req.params.id;

        console.log("Array: ", imgArray, "Querry: ", imageId);

        db.collection('clip').findOne({'_id': ObjectId(imageId) }, (err, onePic) => {

            if (err) return console.log(err)

            console.log("picture", onePic);


          // res.contentType('image/jpeg');
          // res.send(onePic.image.buffer)
          // res.send(imgArray)

          res.render('picture.ejs', {
            user : req.user,
            picture: onePic,
            image: image
          })

        })

      })
    })
    // DUE TO BE DELETE ************************************************

      //saving to hom collection for user's story
    app.post('/home', upload.single('picture'), isLoggedIn, (req, res, next) => {
      let id = req.session.passport.user
      let picture = 'images/uploads/' + req.file.filename
      console.log("userID: ", id, "Image: ", picture);
      db.collection('home').save({userId: id, title: req.body.title, picture: picture, story: req.body.story}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/home')
      })
    })

    // DUE TO BE DELETE ************************************************
    app.post('/gallery', upload.single('gallery'), isLoggedIn, (req, res, next) => {
      let id = req.session.passport.user
      let image = 'images/uploads/' + req.file.filename
      console.log("userID: ", id, "Image: ", image);
      db.collection('clip').save({ userId: id, image: image}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })
    // DUE TO BE DELETE ************************************************

    var insertDocuments = function(db, req, filePath, callback) {
        var collection = db.collection('users');
        var uId = ObjectId(req.session.passport.user)
        collection.findOneAndUpdate({"_id": uId}, {
          $set: {
            profileImg: filePath
          }
        }, {
          sort: {_id: -1},
          upsert: false
        }, (err, result) => {
          if (err) return res.send(err)
          callback(result)
        })
        // collection.findOne({"_id": uId}, (err, result) => {
        //     //{'imagePath' : filePath }
        //     //assert.equal(err, null);
        //     callback(result);
        // });
    }
    //---------------------------------------
    // IMAGE CODE END
    //---------------------------------------

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // Loging out the user
        app.get('/logout', function(req, res){
          req.logout();
          req.session.destroy().next();
          console.log("I'm Logged Out!");
          res.redirect('/');
        });

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

      // local -----------------------------------
      app.get('/unlink/local', isLoggedIn, function(req, res) {
          var user            = req.user;
          user.local.email    = undefined;
          user.local.password = undefined;
          user.save(function(err) {
              res.redirect('/home');
          });
        });

      };

// route middleware to ensure user is logged in
      function isLoggedIn(req, res, next) {
          if (req.isAuthenticated()) {
            console.log("I'm logged in!");
            return next();
          }
              // return next();

          res.redirect('/');
      }
