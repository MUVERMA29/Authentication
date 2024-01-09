const userdb = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate")

exports.register = async (req, res) => {
  const { fname, email, password, cpassword } = req.body;

  if (!fname || !email || !password || !cpassword) {
    return res.status(422).json({ error: "fill all the details" });
  }
  try {
    const preuser = await userdb.findOne({ email: email });
    if (preuser) {
      return res.status(422).json({ error: "This email is alredy exist" });
    } else if (password !== cpassword) {
      return res
        .status(422)
        .json({ error: "Password or confirm password is not matched" });
    } else {
      const finalUser = new userdb({
        fname,
        email,
        password,
        cpassword,
      });

      //here password hasing
      const stroredata = await finalUser.save();
      console.log(stroredata);
      return res.status(201).json(stroredata);
    }
  } catch (error) {
    res.status(422).json(error);
    console.log("catch block error");
  }
};
// login
exports.login = async (req, res) => {
  //console.log("inside login");
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).json({ error: "fill all the details" });
  }
  try {
    const userValid = await userdb.findOne({ email: email });
    //console.log("userValid=>",userValid);
    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);
      console.log("isMatch=>", isMatch);

      if (!isMatch) {
        return res.status(422).json({ error: "Invalid details" });
      } else {
        //token generate
        const token = await userValid.generateAuthtoken();
        //console.log(token);
        //creating cookies
        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });
        const result = {
          userValid,
          token,
        };
        res.status(201).json({ status: 201, result });
      }
    }
  } catch (error) {}
   //res.status(401).json(error);
};

// user validation
exports.validuser = async(req,res)=>{

  try {
      const validUserOne = await userdb.findOne({_id:req.userId});
      res.status(201).json({status:201,validUserOne});
      
  } catch (error) {
      res.status(401).json({status:401,error});
  }
  
};

//logout
exports.logout =async(req,res)=>{
  try {
      req.rootUser.tokens = req.rootUser.tokens.filter((curelem)=>{
          return curelem.token !== req.token;
      });
      
      res.clearCookie("usercookie",{path:"/"});

      req.rootUser.save();

      res.status(201).json(req.rootUser.tokens);
      console.log("user logout");

  } catch (error) {
      res.status(401).json({error:"not logout"});
      
  }
};