const User = require("../models/User");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");


//UPDATE
router.put("/:id", verify, async(req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            {new: true}
            )
            return res.status(200).json(updatedUser);
        }catch(err){
            return res.status(500).json(err);
        }

    } else{
        return res.status(403).json("Can't update someone else's account!")
    }
});

//DELETE
router.delete("/:id", verify, async(req,res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id)
            return res.status(200).json("User is deleted");
        }catch(err){
            return res.status(500).json(err);
        }
    } else{
        return res.status(403).json("Can't delete someone else's account!")
    }
});


//GET
router.get("/find/:id", async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const { password, ...info } = user._doc;
        return res.status(200).json(info);
    }catch(err){
        return res.status(500).json(err);
    }
});

//GET ALL
router.get("/", verify, async(req,res)=>{
    const query = req.query.new;
    if(req.user.isAdmin){
        try{
            const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
            return res.status(200).json(users);
        }catch(err){
            return res.status(500).json(err);
        }
    } else{
        return res.status(403).json("Only admin is allowed to get all users!")
    }
});

//GET USER STATS
router.get("/stats", async(req,res)=>{
    try{
        const data = await User.aggregate([
            {
                $project: {
                    monthanything: {$month: "$createdAt"}
                }
            },
            {
                $group: {
                    _id: "$monthanything",
                    total: {$sum: 1}
                }
            }
        ])
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
})

module.exports = router;