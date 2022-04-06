export class Customer {

    public _id?: string = "";
    public first_name: string = "";
    public last_name: string = "";
    public email: string = "";

    constructor(_id: string, first_name: string, last_name: string, email:string) {
        this._id = _id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
    }
}
