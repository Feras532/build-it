const storedBasket = localStorage.getItem("basket");
const basket = storedBasket ? JSON.parse(storedBasket) : {};
const basketString = JSON.stringify(basket);
import { showNotification } from "/scripts/generated.js";

const responseFormat = {
  totalPrice: "1000$",
  CPU: { brand: "AMD", model: "Ryzen 5 5600G", price: "XXX$" },
  GPU: { brand: "Geforce", model: "1660gtx super", price: "XXX$" },
  MotherBoard: { brand: "Gigabyte", model: "B450M DS3H", price: "XXX$" },
  Case: { brand: "NZXT", model: "H510", price: "XXX$" },
  Rams: {
    brand: "Corsair",
    model: "Vengeance LPX 16GB (2x8GB) DDR4 3200",
    price: "XXX$",
  },
  SSD: { brand: "Crucial", model: "P2 500GB NVMe SSD", price: "XXX$" },
  HDD: { brand: "Seagate", model: "Barracuda 2TB HDD", price: "XXX$" },
  M2: { brand: "none", model: "none", price: "none" },
  PSU: { brand: "EVGA", model: "600 BR 80+ Bronze", price: "XXX$" },
  performance: {
    FPS: "120",
    Bottleneck: "10%",
    System_Booting_Time: "5",
    score: { Gaming: "92", VR_Gaming: "90", Montage: "80", MultiTasking: "99" },
  },
};

const systemMessageContent = `
  if a part is not needed, then type none inside its component.
  and for the price try to give an estimated price from your last update.
  for the total price, just sum the price of each component and add it there (ACURATE summation).
  for spending prefrences when its useMax, try to spend all money by providing the best products in the market(expensive).
  performance response with numbers only, example FPS:"470" no string in FPS pls if its dead give it a 30.
  if their is no GPU in the collection bottleneck ==0.
  score system should be as much as possible accurate, even if the pc collection is bad give it a low score dont give (string nan or non) in this part, if it very dead give it a 0.
  answer style ONLY in this format: ${JSON.stringify(
    responseFormat
  )}. If you didn't follow my format, you will ruin my system.`;
let PC = {};
async function fetchData() {
  try {
    const response = await fetch("/auth/fetchData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        basket: basket,
        systemMessageContent: systemMessageContent,
      }),
    });
    const data = await response.json();
    console.log("request created.");
    PC = JSON.parse(data.choices[0].message.content);
    console.log("PC:", PC);
  } catch (error) {
    console.error("Error in fetchData:", error);
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

function createTable() {
  // Create table
  let table = document.createElement("table");

  // Create table header
  let thead = document.createElement("thead");
  let headerRow = document.createElement("tr");
  ["Component", "Brand", "Model", "Price", "Links"].forEach((headerText) => {
    let th = document.createElement("th");
    th.appendChild(document.createTextNode(headerText));
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  let tbody = document.createElement("tbody");

  // Import your links.js here or define your link generation logic
  const generateLink = (brand, model) => {
    if (brand.toLowerCase() === "none" || model.toLowerCase() === "none") {
      return {
        newegg: "none",
        amazon: "none",
      };
    }
    // Replace this with your actual link generation logic
    const encodedBrandModel = encodeURIComponent(brand + " " + model);
    return {
      newegg: `https://www.newegg.com/Product/ProductList.aspx?Submit=ENE&DEPA=0&Order=BESTMATCH&Description=${encodedBrandModel}&N=-1&isNodeId=1`,
      amazon: `https://www.amazon.com/s?k=${encodedBrandModel}`,
    };
  };

  // Check if PC is an object before iterating over its keys
  if (typeof PC === "object" && PC !== null) {
    Object.keys(PC).forEach((key) => {
      if (key !== "totalPrice" && key !== "performance") {
        let tr = document.createElement("tr");

        // Check if PC[key] is an object before accessing its properties
        let brand = PC[key] && PC[key].brand ? PC[key].brand : "none";
        let model = PC[key] && PC[key].model ? PC[key].model : "none";
        let price = PC[key] && PC[key].price ? PC[key].price : "none";

        [key, brand, model, price].forEach((tdText) => {
          let td = document.createElement("td");
          td.appendChild(document.createTextNode(tdText));
          tr.appendChild(td);
        });

        // Generate links and create icons for Newegg and Amazon or display "none"
        let links = generateLink(brand, model);
        let linksTd = document.createElement("td");

        if (links.newegg === "none" && links.amazon === "none") {
          linksTd.appendChild(document.createTextNode("none"));
        } else {
          if (links.newegg !== "none") {
            let neweggIcon = document.createElement("img");
            neweggIcon.src = "assets/newegg-icon.png";
            neweggIcon.style.height = "24px";
            neweggIcon.onclick = () => window.open(links.newegg, "_blank");
            neweggIcon.style.cursor = "pointer";
            linksTd.appendChild(neweggIcon);
          }

          if (links.amazon !== "none") {
            let amazonIcon = document.createElement("img");
            amazonIcon.src = "assets/amazon-icon.png";
            amazonIcon.style.width = "24px";
            amazonIcon.style.height = "24px";
            amazonIcon.onclick = () => window.open(links.amazon, "_blank");
            amazonIcon.style.cursor = "pointer";
            linksTd.appendChild(amazonIcon);
          }
        }

        tr.appendChild(linksTd);
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
  totalDiv.innerHTML = `Total Price: ${PC.totalPrice}`;
  document.getElementById("results-container").appendChild(totalDiv);
}

function createPerformanceCards() {
  let performanceContainer = document.querySelector(".performance-container");

  if (typeof PC.performance === "object" && PC.performance !== null) {
    Object.keys(PC.performance).forEach((key) => {
      if (PC.performance[key] === "none" || PC.performance[key] === "NaN") {
        return; // Skip to the next iteration
      }
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
      // Add the descriptive paragraph
      let description = document.createElement("p");
      description.style.fontSize = "0.8em"; // Set font size smaller for the description
      description.style.color = "#666"; // Optional: set a different color for description text
      description.style.marginTop = "0.25em"; // Add a small top margin
      description.style.marginBottom = "1em"; // Add bottom margin before content starts
      if (key === "FPS") {
        description.textContent = "More is better";
      } else if (key === "Bottleneck") {
        description.textContent = "Less is better";
      } else if (key === "System_Booting_Time") {
        description.textContent = "Less is better in (seconds)";
      }
      card.appendChild(description);

      if (
        typeof PC.performance[key] === "object" &&
        PC.performance[key] !== null
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
      } else {
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

async function savePC() {
  const saveButton = document.getElementById("saveButton");
  saveButton.disabled = true; // Disable the button
  saveButton.textContent = "Saving..."; // Change button text

  try {
    const response = await fetch("/auth/savePC", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(PC),
    });
    const result = await response.json();
    if (result.success) {
      showNotification("PC configuration saved successfully.");
      saveButton.textContent = "Saved"; // Update button text on success
    } else {
      showNotification("Failed to save PC configuration.");
      saveButton.textContent = "Failed to Save"; // Update button text on failure
    }
  } catch (error) {
    console.error("Error in savePC:", error);
    showNotification("Error in saving PC.");
    saveButton.textContent = "Error"; // Update button text on error
  }
}

// Expose savePC to be callable from your HTML
window.savePC = savePC;

function openPopup() {
  let popup = document.getElementById("successPopup");
  let span = document.getElementsByClassName("close")[0];

  popup.style.display = "block";

  span.onclick = function () {
    popup.style.display = "none";
  };

  // When the user clicks anywhere outside of the popup, close it
  window.onclick = function (event) {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  };
  // document.getElementById("btn-save").style.display = "none";
}

function closePopupAfterDelay(delayMs = 4000) {
  setTimeout(() => {
    let popup = document.getElementById("successPopup");
    popup.style.display = "none";
  }, delayMs);
}
