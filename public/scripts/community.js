class Cardpost {

    constructor(postJson){ //we will change the naming and retrieval later
        this.src = postJson.img
        // ..
    }
}

let createCardString = function(CardpostEntity){
    let cardString = `
                    <figure>
                        <img src=${CardpostEntity.src} alt="">
                    </figure>
                    <figcaption>
                        <div id="userPost">
                            <img src=${CardpostEntity.userImg} alt="">
                            <p>${CardpostEntity.username}</p>
                        </div>
                        <h1>${CardpostEntity.title}</h1>
                        <h2>${CardpostEntity.cost}</h2>
                        <h3>${CardpostEntity.notes}</h3>
                        <div id="postTags">
                        </div>
                    </figcaption>
                    <div id="postStats">
                        <div id="postData">
                            <p>Created in ${CardpostEntity.date}</p>
                        </div>
                        <div id="stats">
                            <div id="postRating">
                                <img src="assets/ratingStar.png" alt="">
                                <p>${CardpostEntity.rating}</p>
                            </div>
                            <div id="postComments">
                                <img src="assets/comment.png" alt="">
                                <p>${CardpostEntity.commentsCount}</p>
                            </div>
                            <div id="postViews">
                                <img src="assets/views.png" alt="">
                                <p>${CardpostEntity.viewCount}</p>
                            </div>
                        </div>
    `
    let cardP = document.createElement('div');
    cardP.className = "card";
    cardP.innerHTML = cardString;
    let cardTag = cardP.querySelector("#postTags");
    
    CardpostEntity.tags.forEach((tag) =>{
        tagDiv = (document.createElement('div'));
        tagDiv.className = "pTag";
        tagDiv.id = tag;
        tagDiv.innerHTML = tag;
        cardTag.appendChild(tagDiv);
    })
    return cardP;
}

let postAdding = function(posts){
    let postDiv = document.querySelector("#posts");
    posts.forEach(post => {
        postDiv.appendChild(createCardString(post))
    });
}

const postsObj = [
    {
        src:"assets/placeholder.png",
        userImg:"assets/loginIcon.png",
        username:'Feras532',
        title:"Please don't mess with the lengths of strings",
        cost:"3400 SAR",
        notes: "Hates the English Department",
        tags: ["Workaholic"],
        date:"1 Dec",
        rating:4.3,
        commentsCount:13,
        viewCount:490
    },
    {
        src:"assets/placeholder.png",
        userImg:"assets/loginIcon.png",
        username:'TanKhalid',
        title:"Is document live editor the best method of communication?",
        cost:"",
        notes: "Ex-Professional minecraft UHC player",
        tags: ["Questions"],
        date:"1 Dec",
        rating:4.1,
        commentsCount:400,
        viewCount:900
    },
    {
        src:"assets/rtx.png",
        userImg:"assets/loginIcon.png",
        username:'afateel2',
        title:"nvidia geforce rtx 4090",
        cost:"8700 SAR",
        notes: "I am thinking of changing from 3060 to 4090",
        tags: ["Products"],
        date:"1 Dec",
        rating:2.5,
        commentsCount:260,
        viewCount:503
    },
    {
        src:"assets/setUp.jpeg",
        userImg:"assets/loginIcon.png",
        username:'matrouk',
        title:"Change my mind: The perfect setup!",
        cost:"10700 SAR",
        notes: "",
        tags: ["Setups"],
        date:"1 Dec",
        rating:5.0,
        commentsCount:"10k",
        viewCount:"56k"
    },
]
postAdding(postsObj);


