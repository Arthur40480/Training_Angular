import { Role } from "./role.model";

export class UserRole {
    id: number;
    role: Role;

    constructor(id: number, role: Role) {
        this.id = id;
        this.role = role;
    }
}