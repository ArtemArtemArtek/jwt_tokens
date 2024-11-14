module.exports = class userDTO {
    email;
    id;
    isActive;

    constructor(userModel) {
        this.email = userModel.email
        this.id = userModel.id
        this.isActive = userModel.isActive
    }
}