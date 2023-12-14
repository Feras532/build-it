function generateAmazonSearchLink(productName) {
  const baseUrl = "https://www.amazon.com/s?k=";
  // Encode the product name to be URL-friendly
  const encodedProductName = encodeURIComponent(productName);
  // Create the full URL for the product search
  const searchUrl = baseUrl + encodedProductName;
  return searchUrl;
}

// Example usage:
const productName = "GTX 3060"; // Your product name here
const amazonLink = generateAmazonSearchLink(productName);

console.log(amazonLink); // Outputs: https://www.amazon.com/s?k=GTX%203060

function generateNeweggSearchLink(productName) {
  const baseUrl = "https://www.newegg.com/p/pl?d=";
  // Encode the product name to be URL-friendly
  const encodedProductName = encodeURIComponent(productName);
  // Create the full URL for the product search
  const searchUrl = baseUrl + encodedProductName;
  return searchUrl;
}
const neweggLink = generateNeweggSearchLink(productName);

console.log(neweggLink); // Outputs: https://www.newegg.com/p/pl?d=GTX%203060
