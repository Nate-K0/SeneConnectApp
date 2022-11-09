const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

mongoose.Promise = global.Promise; // Added to get around the deprecation warning: "Mongoose: promise (mongoose's default promise library) is deprecated"

// Load the schemas
const postSchema = require('./post-schema.js');
const userSchema = require('./user-schema.js');

module.exports = function(mongoDBConnectionString){

    let Post; // defined on connection to the new db instance
    let User;

    return {
        connect: function(){
            return new Promise(function(resolve,reject){
                let db = mongoose.createConnection(mongoDBConnectionString,{ useNewUrlParser: true, useUnifiedTopology: true });
                
                db.on('error', (err)=>{
                    reject(err);
                });
        
                db.once('open', ()=>{
                    Post = db.model("Post", postSchema);
                    User = db.model("User", userSchema);
                    resolve();
                });
            });
        },
        addNewPost: function(data){
            return new Promise((resolve,reject)=>{

                let newPost = new Post(data);

                newPost.save((err) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(`new post: ${newPost._id} successfully added`);
                    }
                });
            });
        },
        addNewUser: function(data){
            return new Promise((resolve,reject)=>{
                bcrypt.hash(data.password, 10).then(hash=>{
                    data.password = hash;

                    let newUser = new User(data);

                    User.find({userName: data.userName}).limit(1).exec().then((users)=>{
                        if (users.length == 0) {
                            newUser.save((err) => {
                                if(err) {
                                    reject(err);
                                } else {
                                    resolve(`new user: ${newUser._id} successfully added`);
                                }
                            });
                        } else {
                            reject("Username already taken");
                        }
                    })
                }).catch(err=>reject(err));
            });
        },
        LoginUser: function(data){
            return new Promise((resolve,reject)=>{
                User.find({userName: data.userName}).limit(1).exec().then((user) => {
                    if (user.length == 0) {
                        reject("No user with that username is registered")
                    } else {
                        bcrypt.compare(data.password, user[0].password).then((res) => {
                            if (res === true) {
                                resolve(user[0]);
                            } else {
                                reject("Incorrect password");
                            }
                        })
                    }
                }).catch(() => {
                    reject("No user with that username is registered");
                })
            });
        },
        getAllPosts: function(page, perPage){
            return new Promise((resolve,reject)=>{
                if(+page && +perPage){
                        page = (+page) - 1;                      
                        Post.find({}).sort({postDate: -1}).skip(page * +perPage).limit(+perPage).exec().then(posts=>{
                            resolve(posts)
                        }).catch(err=>{
                            reject(err);
                        });
                }else{
                    reject('page and perPage query parameters must be present');
                }
            });
        },
        getAllUsers: function(){
            return new Promise((resolve,reject)=>{             
                User.find({}).exec().then(posts=>{
                    resolve(posts)
                }).catch(err=>{
                    reject(err);
                });
            });
        },
        getPostById: function(id){
            return new Promise((resolve,reject)=>{
                Post.findOne({_id: id}).exec().then(post=>{
                    resolve(post)
                }).catch(err=>{
                    reject(err);
                });
            });
        },
        getUserById: function(id){
            return new Promise((resolve,reject)=>{
                User.findOne({_id: id}).exec().then(user=>{
                    resolve(user)
                }).catch(err=>{
                    reject(err);
                });
            });
        },

        deletePostById: function(id){
            return new Promise((resolve,reject)=>{
                Post.deleteOne({_id: id}).exec().then(()=>{
                    resolve(`post ${id} successfully deleted`)
                }).catch(err=>{
                    reject(err);
                });
            });
        }
    }
}