import { Request } from 'express';
import { User } from '../../users/models/_user.model';

interface RequestWithUser extends Request {
  me: User;
}

export default RequestWithUser;
