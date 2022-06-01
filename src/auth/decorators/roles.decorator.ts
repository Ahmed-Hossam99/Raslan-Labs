import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/models/_user.model';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
