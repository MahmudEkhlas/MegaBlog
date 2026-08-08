import conf from "../conf/conf.js";

import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    tablesDB;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.tablesDB = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    //adding the data
    async createPost({ title, content, slug, featuredImage, status, userId }) {
        try {
            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            });
        }
        catch (error) {
            console.log("AppWrite Service :: Create Post :: error", error);
        }
    }
    // Updating  the post in the database
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status
                }
            });
        }
        catch (error) {
            console.log("AppWrite Service :: Update Post :: error", error);
        }

    }

    //Deleting the post 
    async deletePost(slug) {
        try {
            await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug
            });
            return true;
        } catch (error) {
            console.log("AppWrite Service :: Delete Post :: error", error);
            return false;
        }
    }

    //getting a specific row or post
    async getPost(slug) {
        try {
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug
            });
        } catch (error) {
            console.log("AppWrite Service :: Accessing Post :: error", error);
            return false
        }
    }

    //Getting all the posts with status = Active
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                queries: queries
            })
        } catch (error) {
            console.log("AppWrite Service :: Getting All The Posts:: error", error);
            return false
        }
    }

    //File Upload servive
    async fileUplaod(file) {
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file: file
            });
        }
        catch (error) {
            console.log("AppWrite Service :: File upload:: error", error);
            return false
        }
    }

    //Delete File 
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId: fileId
            });
            return true;
        }
        catch (error) {
            console.log("AppWrite Service :: File Delete:: error", error);
            return false
        }
    }

    //getting the file
    getFilePreview(fileId) {
        return this.bucket.getFilePreview({
            bucketId: conf.appwriteBucketId,
            fileId: fileId
        });
    }




}


//creating an object than exporting
const service = new Service();
export default service;