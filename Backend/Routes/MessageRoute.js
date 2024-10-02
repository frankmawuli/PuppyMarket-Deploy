import express from 'express';
import {createMessage,deleteMessage,getMessages} from '../Controllers/MessageControllers.js';
const router = express.Router();

router.get('/', getMessages);
router.post('/', createMessage);
router.delete('/:id', deleteMessage)


export default router;
