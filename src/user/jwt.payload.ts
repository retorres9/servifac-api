import { UserRole } from './user-role.enum';

export interface JwtPayload {
    user_username: string;
    user_userRole: UserRole;
}