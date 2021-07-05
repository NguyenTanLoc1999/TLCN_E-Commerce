const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const {OAuth2Client} = require('google-auth-library');
//const user = require("../models/user");

const client = new OAuth2Client("143478304318-nricvltt50mgn1vfqo26sbqc4hvkvi7m.apps.googleusercontent.com")

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        error: "User already registered",
      });

    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortid.generate(),
    });

    _user.save((error, user) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }

      if (user) {
        const token = generateJwtToken(user._id, user.role);
        const { _id, firstName, lastName, email, role, fullName } = user;
        return res.status(201).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword && user.role === "user") {
        // const token = jwt.sign(
        //   { _id: user._id, role: user.role },
        //   process.env.JWT_SECRET,
        //   { expiresIn: "1d" }
        // );
        const token = generateJwtToken(user._id, user.role);
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};


exports.googlelogin = (req,res) =>{
  const {tokenId} = req.body;

  client.verifyIdToken({idToken:tokenId, audience: "143478304318-nricvltt50mgn1vfqo26sbqc4hvkvi7m.apps.googleusercontent.com"})
   .then(response =>{
    const {email_verified, name, email} =response.payload;

    if(email_verified){
      User.findOne({email}).exec((err,user) => {
        if (err) return res.status(400).json({ error });
        else{
          if(user){

            const token = jwt.sign(
              { _id: user._id},
              process.env.JWT_SECRET,
              { expiresIn: "1h" }
            );
            const { _id, firstName, lastName, email, role, fullName } = user;
            res.status(200).json({
              token,
              user: { _id, firstName, lastName, email, role, fullName },
            });
    
          }else{
            let password=email+process.env.JWT_SECRET;
            let newUser = new User({
              firstName:response.payload.given_name,
              lastName: response.payload.family_name,
              email: response.payload.email,
              hash_password: password,
              username: shortid.generate(),
            });

            newUser.save((err,user)=>{
              if (err) {
                //console.log("Error -> Auth.js -> Google login: ",err)
                return res.status(400).json({ error:"Something went wrong..." });
              }

              const token = generateJwtToken(user._id, user.role);
              const { _id, firstName, lastName, email, role, fullName } = newUser;
              res.status(200).json({
                token,
                user: { _id, firstName, lastName, email, role, fullName },
            });
    
            })
          }
        }
      })
    }  
  })
}