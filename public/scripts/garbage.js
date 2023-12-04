const path = require('path')
var fs=require('fs');
const data=fs.readFileSync(path.join(path.dirname(__dirname),'/assets/part_dataset/speakers.json'), 'utf8');
const words=JSON.parse(data);
console.log(words);

