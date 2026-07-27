import conf from "../conf/conf.js";

import { Client, Account, ID } from "appwrite";

export class Authservice {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    //creating an user 
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email,
                password,
                name
            });

            if (userAccount) {
                //call another method
                return this.login({ email, password });
            }
            else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }

    }

    // login function
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession({
                email: email,
                password: password
            });
        } catch (error) {

        }
    }
    //check Login Status
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("No active session");
        }
        return null;
    }
    //Logout function
    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new Authservice();
//exporting the object directly for better usuability
export default authService;