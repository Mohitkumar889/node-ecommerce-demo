const ResponseMiddleware = require("./ResponseMiddleware");
const UserService = require("../services/UserService");

module.exports = () => {

 const checkEmailAndMobileToEditProfile = async (req, res, next) => {
    console.log("AuthMiddleware => checkEmailAndMobileToEditProfile");
    
    try {
      let { name, countryCode, mobileNumber, email, password } = req.body;
  
      let mobileExist = null;
      if (countryCode && mobileNumber) {
        var query = { countryCode, mobileNumber };

        mobileExist = await UserService().fetchByQueryToEdit(query);
      }
      if (mobileExist) {
        req.rCode = 0;
        req.msg = "mobile_exist";
        ResponseMiddleware(req, res, next);
      } else {
        if (email) {
          query = { email };
          let emailExist = await UserService().fetchByQueryToEdit(query);
          if (emailExist) {
            req.rCode = 0;
            req.msg = "email_exist";
            ResponseMiddleware(req, res, next);
          } else {
            next();
          }
        } else {
          next();
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

return {
    
    checkEmailAndMobileToEditProfile,
   
  };

};