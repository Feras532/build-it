const form = document.querySelector('#com');
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    checkCommentAndCreate();
})

function checkCommentAndCreate(){
    const commentInput = document.querySelector('.comment-send input');
    const commentContent = commentInput.value.trim();
    const errorMes = commentInput.parentElement.querySelector('.ErrorMes');
    // console.log("we got in but this query is not selected")
    if(commentContent===''){
        errorMes.innerHTML = "The field is empty";
    }
    else{
        const parent = commentInput.parentElement;
        errorMes.innerHTML = "";
        createComment();
    }

}
function createComment() {
    const commentContent = document.querySelector('.comment-send input').value.trim();
    const postId = document.querySelector('.hidden').innerHTML;
    const formData = new FormData();
    formData.append("comment", commentContent);
  
    fetch(`/community/${postId}/createComment`, {
      method: "POST",
      body: formData,
      redirect: "follow" // Ensure that the response follows redirects
    }).then((response) => {
      if (response.redirected) {
        window.location.href = response.url; // Redirect to the response URL
      }
    });
  }
//   
const formRate = document.querySelector('.rating');
formRate.addEventListener('submit',(e) =>{
    e.preventDefault()
    
})
$(':radio').change(function() {
    console.log('New star rating: ' + this.value);
  });