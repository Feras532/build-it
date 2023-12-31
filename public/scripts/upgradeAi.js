const storedInput = localStorage.getItem("userInput");
const input = storedInput ? JSON.parse(storedInput) : {};
let inputString = JSON.stringify(input);
console.log(storedInput)
console.log(input)
console.log(inputString)
const responseFormat = {
  totalPrice: "XXX$",
  CPU: { brand: "AMD", model: "Ryzen 5 5600G", price: "XXX$", flag: ''},
  GPU: { brand: "Geforce", model: "1660gtx super", price: "XXX$", flag: '' },
  MotherBoard: { brand: "Gigabyte", model: "B450M DS3H", price: "XXX$", flag: '' },
  Case: { brand: "NZXT", model: "H510", price: "XXX$", flag: '' },
  Rams: {
    brand: "Corsair",
    model: "Vengeance LPX 16GB (2x8GB) DDR4 3200",
    price: "XXX$", flag: ''
  },
  SSD: { brand: "Crucial", model: "P2 500GB NVMe WASSD", price: "XXX$" , flag: ''},
  HDD: { brand: "Seagate", model: "Barracuda 2TB HDD", price: "XXX$", flag: '' },
  PSU: { brand: "EVGA", model: "600 BR 80+ Bronze", price: "XXX$" , flag: ''},
  Monitor: { brand: "LG", model: "32GN600-B", price: "XXX$", flag: '' },
  performance: {
    FPS: {
       Heavy:"XXX",
       Average:"XXX",
       Light:"XXX"
    }
    ,
    Bottleneck: "XX%",
    System_Booting_Time: "X",
    score: { Gaming: "XX", VR_Gaming: "XX", Montage: "XX", MultiTasking: "XX" },
  },
  
};

let systemMessageContent = ''
if(input.upgradeAll){
 systemMessageContent = `
  given the specified budget and PC specifications, find the most optimal way to upgrade this PC to solve these issues: ${input.issues}. if a part doesn't have to be upgraded, then type its specifications into its component.
  otherwise, if it should be upgraded, then type its suggested upgraded specifications inside its component. 
  Set the 'flag' field of a component to the value 'y' IF and ONLY IF any of its specifications were changed from the inputted ones, otherwise leave it empty.
  and for the price try to give an estimated price for each upgraded component, for components that were not upgraded set the price to 0.

  for the 'performance' field respond with numbers only, example Bottleneck:"470".
  for the 'FPS' field in 'performance', measure the value of each category (heavy, average, light) by using the following games respectively as an example to test the PC's FPS performace (Red Read Redemption 2, Rainbow Six Siege, Minecraft)
  answer style ONLY in this format: ${JSON.stringify(
    responseFormat
  )} .If you didn't follow my format, you will ruin my system.`;
  }else{
   systemMessageContent = `
  given the specified budget and PC specifications, find the most optimal way to upgrade the following parts: (${input.upgradeSpecific.toString()}) and type their new specifications into their components.
  For the rest of the components that are not listed, type their existing inputted specifications into their components.
  Set the 'flag' field of a component to the value 'y' IF and ONLY IF any of its specifications were changed from the inputted ones, otherwise leave it empty.
  and for the price try to give an estimated price for each upgraded component, for components that were not upgraded set the price to 0.
  for performance response with numbers only, example FPS:"470".
  For the 'FPS' field in 'performance', measure the FPS if the PC ran the game 'Red Dead Redemption 2' and set the result of it in the 'FPS' field
  To measure and calculate FPS performence of the resulting PC, measure its performance while running the game 'Red Dead Redemption 2' as an example.
  answer style ONLY in this format: ${JSON.stringify(
    responseFormat
  )}. If you didn't follow my format, you will ruin my system.`;
  }


let PC = {  };
async function fetchData() {
  try {
    const response = await fetch("/auth/upgrade-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemMessageContent: systemMessageContent,
        inputString: inputString,
      }),
    });
    const data = await response.json();
    console.log("Raw response data:", data); // Log the raw response data

    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
      console.log("Upgrade request created.");
      PC = JSON.parse(data.choices[0].message.content);
      console.log("PC:", PC);
    } else {
      console.error("Unexpected response structure:", data);
    }
  } catch (error) {
    console.error("Error in upgrade fetchData:", error);
  }
}

window.onload = async function () {
  // Show loading screen
  document.getElementById("loading-screen").style.display = "flex";

  await fetchData();

  // Hide loading screen
  document.getElementById("loading-screen").style.display = "none";
  createTable();
  createTotalDiv();
  createPerformanceCards();
};

let totalPrice = 0
function createTable() {
  // Create table

  let table = document.createElement("table");

  // Create table header
  let thead = document.createElement("thead");
  let headerRow = document.createElement("tr");
  ["Component", "Brand", "Model", "Price"].forEach((headerText) => {
    let th = document.createElement("th");
    th.appendChild(document.createTextNode(headerText));
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  let tbody = document.createElement("tbody");

  // Check if PC is an object before iterating over its keys
  if (typeof PC === "object" && PC !== null) {
    Object.keys(PC).forEach((key) => {
      if (key !== "totalPrice" && key !== "performance") {
        let tr = document.createElement("tr");

        // Check if PC[key] is an object before accessing its properties
        let brand = PC[key] && PC[key].brand ? PC[key].brand : "";
        let model = PC[key] && PC[key].model ? PC[key].model : "";
        let price = PC[key] && PC[key].price ? PC[key].price : "";

        [key, brand, model, price].forEach((tdText) => {
          let td = document.createElement("td");
          if(PC[key].flag === 'y'){
            td.className = 'upgraded'
          }
          td.appendChild(document.createTextNode(tdText));
          tr.appendChild(td);
        });
        totalPrice += parseInt(PC[key].price.replace("$",""))
        console.log(totalPrice)
        tbody.appendChild(tr);
      }
    });
  }

  table.appendChild(tbody);

  // Add table to container
  document.getElementById("pc-components").appendChild(table);
}

function createTotalDiv() {
  // Add total price to container
  let totalDiv = document.createElement("div");
  totalDiv.id = "total-price";
  totalDiv.innerHTML = `Total Price: ${totalPrice}$`;
  document.getElementById("results-container").appendChild(totalDiv);
}

function createPerformanceCards() {
  let performanceContainer = document.querySelector(".performance-container");

  if (typeof PC.performance === "object" && PC.performance !== null) {
    Object.keys(PC.performance).forEach((key) => {
      let card = document.createElement("div");
      card.classList.add("performance-card");
      if (
        key === "FPS" ||
        key === "Bottleneck" ||
        key === "System_Booting_Time"
      ) {
        card.classList.add("fixed-size-card");
      }
      let title = document.createElement("h2");
      title.textContent = key;
      card.appendChild(title);
      if(key === 'FPS'){
        Object.keys(PC.performance.FPS).forEach((skey) => {
          let subT = document.createElement("h3");

          subT.innerHTML = `${skey}: <span>${PC.performance.FPS[skey]}</span>`;
          card.appendChild(subT)
          
        })

      }

      if (
        typeof PC.performance[key] === "object" &&
        PC.performance[key] !== null &&
        key !== "FPS"
      ) {
        Object.keys(PC.performance[key]).forEach((subKey) => {
          let subCard = document.createElement("div");
          subCard.classList.add("performance-card");

          let subTitle = document.createElement("h3");
          subTitle.textContent = subKey;
          subCard.appendChild(subTitle);

          card.appendChild(subCard);

          if (key === "score") {
            google.charts.load("current", { packages: ["gauge"] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
              var data = google.visualization.arrayToDataTable([
                ["Label", "Value"],
                ["", parseInt(PC.performance[key][subKey])],
              ]);

              var options = {
                width: 600,
                height: 200,
                redFrom: 0,
                redTo: 50,
                yellowFrom: 50,
                yellowTo: 80,
                greenFrom: 80,
                greenTo: 100,
                minorTicks: 5,
              };

              var chartDiv = document.createElement("div");
              chartDiv.id = "chart_div_" + subKey;
              chartDiv.className = "gauge-chart";

              var chartWrapper = document.createElement("div");
              chartWrapper.style.display = "flex";
              chartWrapper.style.justifyContent = "center";
              chartWrapper.appendChild(chartDiv);

              var chart = new google.visualization.Gauge(chartDiv);
              chart.draw(data, options);

              subCard.appendChild(chartWrapper);
            }
          }
        });
      }
      else if(key !== 'FPS')
      {
        let value = document.createElement("p");
        let valueText = document.createTextNode("0"); // create a text node with a starting text of "0"
        value.appendChild(valueText); // append the text node to the p element
        card.appendChild(value);

        let progressBar = document.createElement("progress");
        progressBar.max = 100;
        progressBar.style.width = "100%";
        card.appendChild(progressBar);

        // animate the progress bar to its final value
        let finalValue =
          key === "Bottleneck"
            ? Number(PC.performance[key].replace("%", ""))
            : Number(PC.performance[key]);
        let animationTime = 9000; // duration of the animation in milliseconds

        animateProgressBar(progressBar, finalValue, animationTime, valueText);
      }

      performanceContainer.appendChild(card);
    });
  }
}

function animateProgressBar(progressBar, finalValue, duration, textNode) {
  let startTime = Date.now();

  let animationFrame = function () {
    let elapsedTime = Date.now() - startTime;
    if (elapsedTime < duration) {
      let currentValue = (elapsedTime / duration) * finalValue;
      progressBar.value = currentValue;
      textNode.nodeValue = currentValue.toFixed(0); // update text with current value, rounded to 2 decimal places
      requestAnimationFrame(animationFrame);
    } else {
      progressBar.value = finalValue;
      textNode.nodeValue = finalValue.toFixed(0); // ensure the final value text is set correctly
    }
  };

  requestAnimationFrame(animationFrame);
}
