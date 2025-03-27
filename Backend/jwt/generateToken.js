import jwt from 'jsonwebtoken';

const createTokenAndSaveCookie = (userId,res) => {
    const token=jwt.sign({userId},process.env.JWT_TOKEN,{
        expiresIn:'5d',
    });
res.cookie("jwt",token,{
    httpOnly:true,//save from xss attack
    secure:false,
    sameSite:"lax",
      //csrf attack
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
};

export default createTokenAndSaveCookie;