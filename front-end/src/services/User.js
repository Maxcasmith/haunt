export class User
{
    setId(id) {
        this.id = id;
        return this;
    }

    setAdmin(admin) {
        this.isAdmin = admin;
        return this;
    }
}

export const user = new User();
