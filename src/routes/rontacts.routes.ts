import { Router } from 'express';
import ContactController from '../controllers/contacts.controller';
import { 
  validateContactId, 
  validateContactData, 
} from '../middlewares/validators';

const router = Router();
const controller = new ContactController();

router.get('/', controller.getAllContacts.bind(controller));
router.get('/:id', validateContactId, controller.getContactById.bind(controller));
router.post('/', validateContactData, controller.createContact.bind(controller));
router.put('/:id', [validateContactId, validateContactData], controller.updateContact.bind(controller));
router.delete('/:id', validateContactId, controller.deleteContact.bind(controller));

export default router;