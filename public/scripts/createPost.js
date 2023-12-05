let costDiv = document.querySelector("#postCost");
let setupInput = document.querySelector('#sTag');
let prodInput = document.querySelector('#pTag');
let questInput = document.querySelector("#qTag");
let collSelect = document.querySelector('#postCol');
var tags = [];
setupInput.addEventListener('change',() => {
    if(setupInput.checked || prodInput.checked){
        costDiv.style.display = 'flex';
    }
    else{
        costDiv.style.display = 'none';
    
        }
    if(setupInput.checked || questInput.checked){
        collSelect.style.display = 'flex';
    }
    else{
        collSelect.style.display = 'none';
    }
    if(setupInput.checked){
        tags.push('Setups');
    }
    else{
        tags = tags.filter(function(string) {
            return string !== "Setups"});
    }
});
prodInput.addEventListener('change',() => {
    if(setupInput.checked || prodInput.checked){
        costDiv.style.display = 'flex';
    }
    else{
        costDiv.style.display = 'none';
    
    }
    if(prodInput.checked){
        tags.push('Products');
    }
    else{
        tags = tags.filter(function(string) {
            return string !== "Products"});
    }
});
questInput.addEventListener("change", () =>{
    if(setupInput.checked || questInput.checked){
        collSelect.style.display = 'flex';
    }
    else{
        collSelect.style.display = 'none';
    }
    if(questInput.checked){
        tags.push('Questions');
    }
    else{
        tags = tags.filter(function(string) {
            return string !== "Questions"});
    }
});

//Tags ^
//Image V
let img = "";

function showImage(e){
    
    const postPicUpload = document.querySelector('#uploadFile');
    const postPicDiv = document.querySelector("#picView");
    while(postPicDiv.firstChild){
        postPicDiv.removeChild(postPicDiv.firstChild);
    }

    var image = e.files[0];
    if (image) {
      var reader = new FileReader();
      reader.onload = (e) => {

        var uploadedDiv = document.createElement('div');
        uploadedDiv.className = "uploaded";

        var pic = document.createElement('img');
        pic.src = e.target.result;
        img = e.target.result;
        pic.className = "UpPic";
        uploadedDiv.appendChild(pic);

        var picName = document.createElement('p');
        picName.className = "UpPicName";
        picName.innerHTML = image.name;
        uploadedDiv.appendChild(picName);

        var removeI = document.createElement('img');
        removeI.className = "remImage";
        removeI.src = "assets/removeIcon.png";
        removeI.addEventListener("click", ()=>{
            postPicDiv.removeChild(uploadedDiv);
            postPicUpload.value = "";
            img = "";
        })
        uploadedDiv.appendChild(removeI);
        postPicDiv.append(uploadedDiv);
    
      };
      reader.readAsDataURL(image);
    }
}
const productsDiv = document.querySelector('#prodDiv');
function showProd(e){
    
    
    
    var images = e.files;
    if(images){
        
        Array.from(images).forEach((image)=>{
            
            var reader = new FileReader();
            reader.onload = (e) =>{
                
                let container = document.createElement('div');
                container.className = 'uploaded';
                
                let prodImg = document.createElement('img');
                prodImg.className = "UpPic";
                prodImg.src = e.target.result;
                container.appendChild(prodImg);
                
                let prodName = document.createElement('input');
                prodName.type = 'text';
                prodName.className = "prodName";
                prodName.placeholder = 'Product Name';
                container.appendChild(prodName);
                
                
                let costCont = document.createElement('div');
                costCont.className = 'prodCost';
                let addRemImg = document.createElement('img');
                addRemImg.src = "assets/addIcon2.png";
                let span = document.createElement('span');
                span.innerHTML = "$";
                span.style.display = "none";
                let costInput = document.createElement('input');
                costInput.type = "number";
                costInput.step = '10';
                costInput.placeholder = 'Cost';
                costInput.style.display = "none";
                
                addRemImg.addEventListener('click', ()=>{
                    if((span.style.display === "none")){
                        span.style.display = "block";
                        costInput.style.display = "block";
                        addRemImg.src = 'assets/minusIcon.png'
                    }
                    else{
                        span.style.display = "none";
                        costInput.style.display = "none"; 
                        costInput.value='';
                        addRemImg.src = "assets/addIcon2.png";
                    }
                })
                costCont.appendChild(addRemImg);
                costCont.appendChild(span);
                costCont.appendChild(costInput);
                container.appendChild(costCont);
                
                
                let removeImg = document.createElement('img');
                removeImg.className = 'remImage';
                removeImg.src = "assets/removeIcon.png";
                removeImg.addEventListener("click", ()=>{
                    productsDiv.removeChild(container);
                });
                container.appendChild(removeImg);
                productsDiv.appendChild(container);
            }
            reader.readAsDataURL(image);
        })
    }
}

class Product{
    constructor(name,src, cost){
        this.name = name;
        this.src = src;
        this.cost = cost;
    }
}


const createProduct = (div)=>{
    var name = '';
    var src = '';
    var cost = '';
    
    imgP = div.querySelector('.UpPic')
    nameP = div.querySelector('.prodName');
    costP = div.querySelector('.prodCost').querySelector('input');
    // return new Product();

} 
function createPost(){
    let Errors = [];
    const titleInput = document.querySelector('#pTitle');
    var title = title.value;
    if(title){

    }
    /*check of title:
    NOT EMPTY
    NO SPACES
    UNIQUE TO USER'S POST
    */
    const costInput = document.querySelector('#pCost');
    /*check if the cost:
    NOT EMPTY IF TAG == SETUPS, PRODUCTS WILL HAVE THEIR OWN COST
    */
    const collInput = document.querySelector('#userCollection');
    //THIS IS GOING TO BE COMPLICATED

    //img already declared;


    var products = [];
    prodDivs = productsDiv.querySelectorAll('.uploaded');
    if(prodDivs){
        //check for product names (filled)
    }
    productsDiv.forEach((pDiv) => {
        products.push(createProduct(pDiv));
    });


}
const checkText = function(string){
    //Empty
    if(string.length === 0){
        return false;
    }
    //Spaces
    else if(string.trim ===string.replace(/[^ ]/g, '')){
        return false;
    }
    //Good To Go
    else{return true;}
}