class GenericUser{
    constructor(username, password, email, id){
    this.username = username;
    this.password = password;
    this.email = email;
    this.ID = id;
    this.logged = false;
    this.posts = [];
    }

    createPost(title, desc, imgs){
        // later implemented
        return
    }

    isLogged(){
        return this.logged
    }

    logout(){
        this.logged = false
    }

    viewProfile(ID){
        // later implemented
        return
    }

    editProfile(){
        // later implemented
        return
    }

    createCollection(){
        // later implemented
        return
    }

    sendRequest(){
        // later implemented
        return
    }

    toString(){
        return this.username+  ' ' + this.password+  ' ' + this.email;
    }
}

class EndUser extends GenericUser{
    constructor(username, password, email, id){
        super(username, password, email, id)
        this.requests = []
        this.stat = 'unhold'
        this.points = 0
    }

    hold(){
        this.stat = 'hold'
    }
    unhold(){
        this.stat = 'unhold'
    }
}

class Admin extends GenericUser{
    constructor(username, password, email, id){
        super(username, password, email, id)
    }

    deletePost(userID, postID){
        //later implemented
        return
    }

    banProfile(ID){
        //later implemented

    }

}

class Adviser extends GenericUser{
    constructor(username, password, email, id){
        super(username, password, email, id)
        this.flag = 'expert'
    }

    displayAllRequests(){
        // later implemented
        return
    }

    sendResponseID(ID, text){
        // later implemented
        return
    }

    viewUserCollection(ID){
        // later implemented
        return
    }

}