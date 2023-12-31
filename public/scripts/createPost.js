const costDiv = document.querySelector("#postCost");
const setupInput = document.querySelector("#sTag");
const prodInput = document.querySelector("#pTag");
const questInput = document.querySelector("#qTag");
const collSelect = document.querySelector("#postCol");

var tags = [];
setupInput.addEventListener("change", () => {
  if (setupInput.checked || prodInput.checked) {
    costDiv.style.display = "flex";
  } else {
    costDiv.style.display = "none";
  }
  if (setupInput.checked || questInput.checked) {
    collSelect.style.display = "flex";
  } else {
    collSelect.style.display = "none";
  }
  if (setupInput.checked) {
    tags.push("Setups");
  } else {
    tags = tags.filter(function (string) {
      return string !== "Setups";
    });
  }
  costDiv.querySelector(".errorMes").innerHTML = "";
  costDiv.querySelector("input").classList.remove("CorrInput");
  costDiv.querySelector("input").classList.remove("WrongInput");
  // console.log(tags);
});
prodInput.addEventListener("change", () => {
  if (setupInput.checked || prodInput.checked) {
    costDiv.style.display = "flex";
  } else {
    costDiv.style.display = "none";
  }
  if (prodInput.checked) {
    tags.push("Products");
  } else {
    tags = tags.filter(function (string) {
      return string !== "Products";
    });
  }
  costDiv.querySelector(".error").value = "";
  costDiv.querySelector("input").classList.remove("CorrInput");
  costDiv.querySelector("input").classList.remove("WrongInput");
});
questInput.addEventListener("change", () => {
  if (setupInput.checked || questInput.checked) {
    collSelect.style.display = "flex";
  } else {
    collSelect.style.display = "none";
  }
  if (questInput.checked) {
    tags.push("Questions");
  } else {
    tags = tags.filter(function (string) {
      return string !== "Questions";
    });
  }
});
//Prevent Form Default action
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  check_AND_create();
});

//Moving from field to field
const titleInput = document.querySelector("#pTitle");
const noteInput = document.querySelector("#pNote");
const costInput = document.querySelector("#pCost");
const collectInput = document.querySelector("select");
const bodyInput = document.querySelector("textarea");
const postPicUpload = document.querySelector("#uploadFile");

titleInput.addEventListener("keydown", (e) => {
  if (e.key === 13 || e.key === "Enter") {
    noteInput.focus();
  }
});
noteInput.addEventListener("keydown", (e) => {
  if (e.key === 13 || e.key === "Enter") {
    if (tags.indexOf("Setups") !== -1 || tags.indexOf("Products") !== -1) {
      costInput.focus();
    } else if (tags.indexOf("Questions") != -1) {
      collectInput.focus();
    } else {
      bodyInput.focus();
    }
  }
});
costInput.addEventListener("keydown", (e) => {
  if ((e.key === 13) | (e.key === "Enter")) {
    if (tags.indexOf("Setups") !== -1 || tags.indexOf("Questions") != -1) {
      collectInput.focus();
    }
  }
});
bodyInput.addEventListener("keydown", (e) => {
  if ((e.key === "Enter") | (e.key === 13)) {
    check_AND_create();
  }
});

//
function showImage(e) {
  const postPicDiv = document.querySelector("#picView");
  while (postPicDiv.firstChild) {
    postPicDiv.removeChild(postPicDiv.firstChild);
  }

  var image = e.files[0];
  if (image) {
    var reader = new FileReader();
    reader.onload = (e) => {
      var uploadedDiv = document.createElement("div");
      uploadedDiv.className = "uploaded";

      var pic = document.createElement("img");
      pic.src = e.target.result;
      // img = e.target.result;
      pic.className = "UpPic";
      uploadedDiv.appendChild(pic);

      var picName = document.createElement("p");
      picName.className = "UpPicName";
      picName.innerHTML = image.name;
      uploadedDiv.appendChild(picName);

      var removeI = document.createElement("img");
      removeI.className = "remImage";
      removeI.src = "assets/removeIcon.png";
      removeI.addEventListener("click", () => {
        postPicDiv.removeChild(uploadedDiv);
        postPicUpload.value = "";
      });
      uploadedDiv.appendChild(removeI);
      postPicDiv.append(uploadedDiv);
    };
    reader.readAsDataURL(image);
  }
}
// const productsDiv = document.querySelector('#prodDiv');
// function showProd(e){

//     var images = e.files;
//     if(images){

//         Array.from(images).forEach((image)=>{

//             var reader = new FileReader();
//             reader.onload = (e) =>{

//                 let container = document.createElement('div');
//                 container.className = 'uploaded';

//                 let prodImg = document.createElement('img');
//                 prodImg.className = "UpPic";
//                 prodImg.src = e.target.result;
//                 img = e.target.result; //img for submitting;
//                 container.appendChild(prodImg);

//                 let nameDiv = document.createElement('div');
//                 nameDiv.style.display ='flex';
//                 nameDiv.style.flexDirection='column';
//                 let prodName = document.createElement('input');
//                 prodName.type = 'text';
//                 prodName.className = "prodName";
//                 prodName.placeholder = 'Product Name';
//                 nameDiv.appendChild(prodName);
//                 //errorDiv
//                 let errorDiv = document.createElement('div');
//                 errorDiv.className = 'errorMes';
//                 nameDiv.appendChild(errorDiv);
//                 container.appendChild(nameDiv);

//                 //add errorMes for cost also
//                 let costCont = document.createElement('div');
//                 costCont.className = 'prodCost';
//                 let addRemImg = document.createElement('img');
//                 addRemImg.src = "assets/addIcon2.png";
//                 let span = document.createElement('span');
//                 span.innerHTML = "$";
//                 span.style.display = "none";
//                 let costDiv = document.createElement('div');
//                 costDiv.style.display ='flex';
//                 costDiv.style.flexDirection='column';
//                 let costInput = document.createElement('input');
//                 costInput.type = "number";
//                 costInput.step = '10';
//                 costInput.placeholder = 'Cost';
//                 costInput.style.display = "none";
//                 costDiv.appendChild(costInput);
//                 costDiv.appendChild(errorDiv);

//                 addRemImg.addEventListener('click', ()=>{
//                     if((span.style.display === "none")){
//                         span.style.display = "block";
//                         costInput.style.display = "block";
//                         addRemImg.src = 'assets/minusIcon.png'
//                     }
//                     else{
//                         span.style.display = "none";
//                         costInput.style.display = "none";
//                         costInput.value='';
//                         addRemImg.src = "assets/addIcon2.png";
//                     }
//                 })
//                 costCont.appendChild(addRemImg);
//                 costCont.appendChild(span);
//                 costCont.appendChild(costdiv);
//                 container.appendChild(costCont);

//                 let removeImg = document.createElement('img');
//                 removeImg.className = 'remImage';
//                 removeImg.src = "assets/removeIcon.png";
//                 removeImg.addEventListener("click", ()=>{
//                     productsDiv.removeChild(container);
//                 });
//                 container.appendChild(removeImg);
//                 productsDiv.appendChild(container);
//             }
//             reader.readAsDataURL(image);
//         })
//     }
// }

// class Product{
//     constructor(name,src, cost){
//         this.name = name;
//         this.src = src;
//         this.cost = cost;
//     }
// }

const showError = (element, message) => {
  const parentInput = element.parentElement;
  const errorDiv = parentInput.querySelector(".errorMes");

  errorDiv.innerHTML = message;
  element.classList.add("WrongInput");
  element.classList.remove("CorrInput");
};

const showSuccess = (element) => {
  const parentInput = element.parentElement;
  const errorDiv = parentInput.querySelector(".errorMes");

  errorDiv.innerHTML = "";
  element.classList.add("CorrInput");
  element.classList.remove("WrongInput");
};

// const createProduct = (div)=>{
//     imgP = div.querySelector('.UpPic').value;
//     nameP = div.querySelector('.prodName').value.trim();
//     costP = div.querySelector('.prodCost').querySelector('input').value.trim();
//     return  {
//         name:nameP,
//         path:imgP,
//         cost:costP
//     }
// }

function check_AND_create() {
  var SuccessFlag = true;
  //Tags (If Required)
  const tagDiv = document.querySelector("#formTag");
  if (tags.length === 0) {
    SuccessFlag = false;
    showError(tagDiv, "Please choose at least on tag!");
  } else {
    showSuccess(tagDiv);
  }

  //Title (Required)
  const title = titleInput.value.trim();
  // console.log(title);

  /*check if title:
    NOT EMPTY
    UNIQUE TO USER'S POSTS
    */
  if (title === "") {
    showError(titleInput, "This field is required!");
    SuccessFlag = false;
    titleFlag = false;
  } else {
    showSuccess(titleInput);
  }

  //Note (Optional)
  const note = noteInput.value.trim();

  //Cost (Depends on Tags)
  /*check if the cost:
    NOT EMPTY IF TAG == SETUPS or TAG == PRODUCTS, 
    Should Tag(PRODUCTS) have It's own cost? (like in the product adding section [make it required if tag == product])
    */
  const cost = costInput.value.trim();
  //    console.log(cost);
  if ((tags.indexOf("Setups") != -1) | (tags.indexOf("Products") != -1)) {
    if (cost === "") {
      showError(costInput, "This field is require!");
      SuccessFlag = false;
    } else if (cost.length > 10) {
      showError(costInput, "Be realistic");
      SuccessFlag = false;
    }
    // else if(scientific notation){
    //     showError(Input,"We like the precision, but please be normal"); //Change this later
    //     return false;
    // }
    else {
      showSuccess(costInput);
    }
  }

  //Collection (Optional)
  const selectedCollection = collectInput.value;

  // console.log(selectedCollection);

  //Image (Optional)

  var file = document.querySelector("#uploadFile").files[0];
  // if(path === ''){
  //     path = 'assets/default.png'; //will database default handle this?
  // }

  //Products (Optional) unless we change it to depend on Tag(Products)
  // var products = [];
  // prodDivs = productsDiv.querySelectorAll('.uploaded');
  // //check products names;
  // if(prodDivs){
  //     prodDivs.forEach((pDiv) => {
  //         var pFlag = true;
  //         const prodNameInput = pDiv.querySelector('.prodName');
  //         const prodCostInput = pDiv.querySelector('.prodCost');
  //         const pName = prodNameInput.value.trim();
  //         const pCost = prodCostInput.value.trim();
  //         if(pName === ''){
  //             showError(prodNameInput,"Kindly provide the name of the product");
  //             SuccessFlag = false;
  //             pFlag = false;
  //         }
  //         else{
  //             showSuccess(prodNameInput);
  //         }
  //         if(pCost){
  //             if(pCost.length>8){
  //                 showError(prodCostInput,"Be realistic"); //Change this later
  //                 pFlag = false;
  //                 SuccessFlag = false;
  //             }
  //             // else if(pCost in scienific notation){
  //             //     showError(prodCostInput,"Okay Einstein"); //Change this later
  //             //     pFlag = false;
  //             //     SuccessFlag
  //             // }
  //             else{
  //                 showSuccess(prodCostInput);
  //             }
  //         }
  //         if(pFlag){
  //             products.push(createProduct(pDiv));
  //         }
  //     });
  // }

  //Body (Optional) IDK about this one honestly
  const bodyContent = bodyInput.value.trim();
  // console.log(bodyContent);

  if (SuccessFlag) {
    //find a way to get the userID or username (since its unique)

    // const userid = document.querySelector('#userID').innerHTML;
    
    const userid = "6562fef5b865d9690deefa57";

    const formData = new FormData();
    formData.append("Tags", tags);
    formData.append("Title", title);
    formData.append("Note", note);
    formData.append("Cost", cost);
    formData.append("Collection", selectedCollection);
    formData.append("file", file);
    formData.append("Body", bodyContent);
    formData.append("user", userid);

    //if we use the controller I thing we should fetch this /community/createPost
    fetch("/community/createPost", {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      }
    });
  }

}
