import mongoose from "mongoose";
const schema = mongoose.Schema;

const authSchema = new schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true , unique: true},
    profile: { type: String, required: true },
},{timestamps : true});

const Auth = mongoose.model('Auth', authSchema);
export default Auth;
