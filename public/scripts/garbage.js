const generatedMessage =
  '{"totalPrice":"2000$","CPU":{"brand":"Intel","model":"Core i7-12700K","price":"399$"},"MotherBoard":{"brand":"ASUS","model":"ROG Strix Z690-F Gaming WiFi","price":"300$"},"Case":{"brand":"Fractal Design","model":"Meshify C","price":"100$"},"Rams":{"brand":"G.Skill","model":"Trident Z RGB 32GB (2x16GB) DDR5-5600","price":"250$"},"SSD":{"brand":"Samsung","model":"970 EVO Plus 1TB NVMe","price":"120$"},"HDD":{"brand":"Seagate","model":"Barracuda 4TB HDD","price":"90$"},"M2":{},"PSU":{"brand":"Corsair","model":"RM750x 80+ Gold","price":"130$"}}';

const PC = JSON.parse(generatedMessage);

// Access properties
console.log(PC.totalPrice); // Output: 2000$
console.log(PC.CPU.model); // Output: Core i7-12700K
console.log(PC);
