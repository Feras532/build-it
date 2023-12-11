
let totalQuestions = 4;
let currentQuestion = 1;

let userInput = {
  budget: "0",
  motherboard: "not specified",
  CPU: "not specified",
  GPU: "not specified",
  HDD: "not specified",
  powerSupply: "not specified",
  caseFan: "not specified",
  RAM: "not specified",
  SSD: "not specified",
  monitor: "not specified",
  case: "not specified",
  upgradeAll: true, //Default option is to upgrade all parts
  upgradeSpecific: [],
  issues: ''
};

function previousQuestion() {
  if (currentQuestion > 1) {
    // Hide current question
    document
      .getElementById(`question${currentQuestion}`)
      .classList.remove("active");

    // Show previous question
    currentQuestion -= 1;
    let previousQuestion = document.getElementById(
      `question${currentQuestion}`
    );
    previousQuestion.style.opacity = 0;
    previousQuestion.classList.add("active");
    setTimeout(() => {
      previousQuestion.style.opacity = 1;
    }, 100);

    // Update progress bar
    let progress = ((currentQuestion - 1) / totalQuestions) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
  }
}

window.previousQuestion = previousQuestion;

function nextQuestion() {
  // Store answer before moving to the next question
  switch (currentQuestion) {
    case 1:
      userInput.budget = document.getElementById("budgetDisplay").textContent;
      break;
    case 2:
      //Getting core components
      userInput.motherboard = document.getElementById("motherboard").value;
      userInput.CPU = document.getElementById("cpu").value;
      userInput.GPU = document.getElementById("gpu").value;
      userInput.HDD = document.getElementById("hdd").value;
      userInput.powerSupply = document.getElementById("power").value;
      userInput.caseFan = document.getElementById("casefan").value;
      userInput.RAM = document.getElementById("ram").value;
    
      //Addition Components
      if(document.getElementById("ssd").value.length !== 0){
        userInput.SSD = document.getElementById("ssd").value;
      }
      if(document.getElementById("monitor").value.length !== 0){
        userInput.monitor = document.getElementById("monitor").value
      }
      if(document.getElementById("case").value.length !== 0){
        userInput.case = document.getElementById("case").value
      }

      break;
    case 3:
      //Getting checked boxes of specific upgrades.
      if(!userInput.upgradeAll){
        let labels = document.querySelectorAll('.container')
        let checkboxes = document.querySelectorAll('.container input')
        for(let i = 0; i<checkboxes.length; i++){
          if(checkboxes[i].checked){
            userInput.upgradeSpecific.push(labels[i].innerText)
          }
        }
      }

      break;
    default:
      break;  
  }


  if (currentQuestion <= totalQuestions) {
    // Hide current question
    document
      .getElementById(`question${currentQuestion}`)
      .classList.remove("active");

    // Show next question
    if(currentQuestion<totalQuestions){
    currentQuestion += 1;
    let nextQuestion = document.getElementById(`question${currentQuestion}`);
    nextQuestion.style.opacity = 0;
    nextQuestion.classList.add("active");
    setTimeout(() => {
      nextQuestion.style.opacity = 1;
    }, 100);
  }
    // Update progress bar
    let progress = ((currentQuestion - 1) / totalQuestions) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
    populateDatalists();
  }
}

window.nextQuestion = nextQuestion;

function updateValue(value) {
  var scaledValue = value * 100;
  document.getElementById("budgetDisplay").textContent = "$" + scaledValue;
}
window.updateValue = updateValue;

// ========================Question 3=====================
if(!(document.querySelector('.left') === null)){
  let leftPart = document.querySelector('.left')
  let rightPart = document.querySelector('.right')
  let prompt = document.querySelector('.firstprompt')
  let choices = document.querySelector('.choices-container')
  let nextBttn = document.querySelector('.left button')

  leftPart.addEventListener('click', (event) => {
    leftPart.className = 'left selected'
    rightPart.className = 'right'
    prompt.className = 'firstprompt leftselected'
    choices.style.display = 'flex'
    nextBttn.style.display= 'block'
    userInput.upgradeAll = false
  })

  rightPart.addEventListener('click', (event) => {
    rightPart.className = 'right selected'
    leftPart.className = 'left'
    prompt.className = 'firstprompt'
    choices.style.display = 'none'
    nextBttn.style.display= 'none'
    userInput.upgradeAll = true
  })
}
// ========================================================

 async function populateDatalists(){
    
    //Motherboard list
    let data = await fetchJson('../public/assets/part_dataset/motherboard.json')
      let motherboards = data.map((o) => o.name)
      let list = document.getElementById('mbdata')
      for(let i = 0; i<motherboards.length; i++){
        let option = document.createElement("option")
        option.value = motherboards[i]
        list.appendChild(option)
      }

    //CPU list
    data = await fetchJson('../public/assets/part_dataset/cpu.json')
    motherboards = data.map((o) => o.name)
    list = document.getElementById('cpudata')
    for(let i = 0; i<motherboards.length; i++){
      let option = document.createElement("option")
      option.value = motherboards[i]
      list.appendChild(option)
    }

    //GPU list
    data = await fetchJson('../public/assets/part_dataset/video-card.json')
    motherboards = data.map((o) => o.name)
    list = document.getElementById('gpudata')
    for(let i = 0; i<motherboards.length; i++){
      let option = document.createElement("option")
      option.value = motherboards[i]
      list.appendChild(option)
    }

    //PowerSupply list
    data = await fetchJson('../public/assets/part_dataset/power-supply.json')
    motherboards = data.map((o) => o.name)
    list = document.getElementById('powerdata')
    for(let i = 0; i<motherboards.length; i++){
      let option = document.createElement("option")
      option.value = motherboards[i]
      list.appendChild(option)
    }

    //Case Fan list
    data = await fetchJson('../public/assets/part_dataset/case-fan.json')
    motherboards = data.map((o) => o.name)
    list = document.getElementById('casefandata')
    for(let i = 0; i<motherboards.length; i++){
      let option = document.createElement("option")
      option.value = motherboards[i]
      list.appendChild(option)
    }

    //HDD list
    data = await fetchJson('../public/assets/part_dataset/external-hard-drive.json')
    motherboards = data.map((o) => o.name)
    list = document.getElementById('hdddata')
    for(let i = 0; i<motherboards.length; i++){
      let option = document.createElement("option")
      option.value = motherboards[i]
      list.appendChild(option)
    }

    //SSD list
    data = await fetchJson('../public/assets/part_dataset/internal-hard-drive.json')
    motherboards = data.map((o) => o.name)
    list = document.getElementById('ssddata')
    for(let i = 0; i<motherboards.length; i++){
      let option = document.createElement("option")
      option.value = motherboards[i]
      list.appendChild(option)
    }

    //RAM list
    data = await fetchJson('../public/assets/part_dataset/memory.json')
    motherboards = data.map((o) => o.name)
    list = document.getElementById('ramdata')
    for(let i = 0; i<motherboards.length; i++){
      let option = document.createElement("option")
      option.value = motherboards[i]
      list.appendChild(option)
    }

    //Monitor list
    data = await fetchJson('../public/assets/part_dataset/monitor.json')
    motherboards = data.map((o) => o.name)
    list = document.getElementById('monitordata')
    for(let i = 0; i<motherboards.length; i++){
      let option = document.createElement("option")
      option.value = motherboards[i]
      list.appendChild(option)
    }

    //Case list
    data = await fetchJson('../public/assets/part_dataset/case.json')
    motherboards = data.map((o) => o.name)
    list = document.getElementById('casedata')
    for(let i = 0; i<motherboards.length; i++){
      let option = document.createElement("option")
      option.value = motherboards[i]
      list.appendChild(option)
    }
}

function submitForm() {
  // Save userInput to localStorage
  let issues = document.querySelector('#answer-container')
  userInput.issues = issues.value;
  
  localStorage.setItem("userInput", JSON.stringify(userInput));
  console.log("submitted.");

}
window.submitForm = submitForm

const fetchJson = async url => {
    const response = await fetch(url)
    return response.json()
}

export default function getInput(){
  return JSON.stringify(userInput);
}


