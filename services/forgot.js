const Users = require("../models/users")

const reset = async(email) => {
    try {
        const user = await Users.findOne({email: email});
        console.log('reset', user)
        if(user == null){
        return { success: false}
        } else {
            return { success: true, user: user}
        }
    } catch (err) {
        return { success: false}
    }
}

const changePassword = async(body) => {
    const { pass, conf, user_id } = body;

    console.log(body)

    if(pass != conf) {
        return { success: false, error: "Password must be same with confirm password"}
    }

    try{
        //get user doc by id
        let doc = await Users.findById(user_id)
        console.log(doc)
        //update user password
        doc.password = pass;

        await doc.save();
        return { success: true, user: doc}

    } catch(err) {
        return { success: false, error: err}
        
    }
}

module.exports = {
    reset,
    changePassword
}