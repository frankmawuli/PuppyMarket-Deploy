import mongoose from "mongoose";
import Message from "../Models/MessagingModel.js";


//get all messages
export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(404).json({ sucess : false, message: error.message });
    }
}

//create a message
export const createMessage = async (req, res) => {
    const message = req.body;

    if(!message.SenderId || !message.ReceiverId || !message.Status || !message.Content){
        return res.status(400).json({ message: 'Please fill in all the fields' });
    }
    const newMessage = new Message(message);
    try {
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


//delete a message
export const deleteMessage = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No message with that id');
 try{
    await Message.findByIdAndRemove(id);
    res.json({ message: 'Message deleted successfully' });

 }catch(error){
     console.log('error in deleting the product', error.message);
     res.status(409).json({sucess : false, message: 'server Error'});
 }
}