import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    SenderId :{
        type : String,
        required : true
    },
    ReceiverId : {
        type : String,
        required : true
    },
    Status:{
        type : String,
        required : true
    },
    Content : {
        type : String,
        required : true
    }
}, {timestamps : true})

const Message = mongoose.model('Message', messageSchema);
export default Message;