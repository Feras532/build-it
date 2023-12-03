const storedBasket = localStorage.getItem("basket");
const basket = storedBasket ? JSON.parse(storedBasket) : {};
// const basketString = JSON.stringify(basket);

const responseFormat = {
  CPU: { brand: "AMD", model: "Ryzen 5 5600G", price: "119$" },
  GPU: { brand: "Gigabyte", model: "1660gtx super", price: "XXX$" },
  MotherBoard: { brand: "Gigabyte", model: "B450M DS3H", price: "120$" },
  Case: { brand: "NZXT", model: "H510", price: "XXX$" },
  Rams: {
    brand: "Corsair",
    model: "Vengeance LPX 16GB (2x8GB) DDR4 3200",
    price: "XXX$",
  },
  M2_SSD: { brand: "Samsung", model: "Samsung 990 PRO", price: "233$" },
  SSD: { brand: "Crucial", model: "P2 500GB NVMe SSD", price: "343$" },
  HDD: { brand: "Seagate", model: "Barracuda 2TB HDD", price: "223$" },
  PSU: { brand: "EVGA", model: "600 BR 80+ Bronze", price: "231$" },
  totalPrice: "total$",
};

const systemMessageContent = `
  if a part is not needed, then type none inside its component.
  and for the price try to give an estimated price from your last update.
  for the total price, just sum the price of each component and add it there (ACURATE summation).
  for spending prefrences when its useMax, try to spend all money by providing the best products in the market(expensive). 
  answer style ONLY in this format: ${JSON.stringify(
    responseFormat
  )}. If you didn't follow my format, you will ruin my system.`;

let PC = {};
async function fetchData() {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content: systemMessageContent,
        },
        {
          role: "user",
          content: "Iam a gamer 4000$",
        },
      ],
    }),
  });
  const data = await response.json();
  console.log("request created.");
  console.log(data.choices[0].message.content);
  // Parse the API response into a JSON object
  PC = JSON.parse(data.choices[0].message.content);
}

// let generated = {
//   totalPrice: "1000$",
//   CPU: { brand: "AMD", model: "Ryzen 5 5600G", price: "XXX$", },
//   GPU: { brand: "Geforce", model: "1660gtx super", price: "XXX$", },
//   MotherBoard: { brand: "Gigabyte", model: "B450M DS3H", price: "XXX$", },
//   Case: { brand: "NZXT", model: "H510", price: "XXX$", },
//   Rams: { brand: "Corsair", model: "Vengeance LPX 16GB (2x8GB) DDR4 3200", price: "XXX$", },
//   SSD: { brand: "Crucial", model: "P2 500GB NVMe SSD", price: "XXX$", },
//   HDD: { brand: "Seagate", model: "Barracuda 2TB HDD", price: "XXX$", },
//   M2: { brand: "none", model: "none", price: "none", },
//   PSU: { brand: "EVGA", model: "600 BR 80+ Bronze", price: "XXX$", },
// };

window.onload = async function () {
  // Show loading screen
  document.getElementById("loading-screen").style.display = "flex";

  await fetchData();

  // Hide loading screen
  document.getElementById("loading-screen").style.display = "none";
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
      if (key !== "totalPrice") {
        let tr = document.createElement("tr");

        // Check if PC[key] is an object before accessing its properties
        let brand = PC[key] && PC[key].brand ? PC[key].brand : "";
        let model = PC[key] && PC[key].model ? PC[key].model : "";
        let price = PC[key] && PC[key].price ? PC[key].price : "";

        [key, brand, model, price].forEach((tdText) => {
          let td = document.createElement("td");
          td.appendChild(document.createTextNode(tdText));
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      }
    });
  }

  table.appendChild(tbody);

  // Add table to container
  document.getElementById("pc-components").appendChild(table);

  // Add total price to container
  let totalDiv = document.createElement("div");
  totalDiv.id = "total-price";
  totalDiv.innerHTML = `Total Price: ${PC.totalPrice}`;
  document.getElementById("results-container").appendChild(totalDiv);
};
