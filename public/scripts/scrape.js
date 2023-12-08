const puppet = require('puppeteer');

// const scrapedComponents = document.createElement('div')
// scrapedComponents.className = 'showPrices';

const amazonSearch = async function (component) {
    //We can let this function scrape information and create a div with each instance in it a complete anchor with href of the result we will get.
    //Of course after checking that the results we got matches with the component we provided.
    //something like this for each title and price we got
    // {if(title === component){
    //     scrapedComponents.appendChild(createDiv(item))
    //  }}
    //This should be written in all search functions.

    const browser = await puppet.launch({ headless : false}); //switch this to {headless : new} to make it run without showing what the browser doing.
    try{
        // const browser = await puppet.connect({browserWSEndpoint: "wss://chrome.browserless.io/?token=API"}); you dont need this.

        const page = await browser.newPage(); //Creates a new tab.

        page.setGeolocation({latitude: 24.655450, longitude: 46.638194}); 
        //Sets the location [currently near Riyadh] Amazon has a different style for our region.
        //if you remove the setGeolocation you will need to find out the searchbar and search button selectors of the website you will land on.

        await page.goto('https://www.amazon.com/'); //loads the url provided into the page.

        const content = await page.content(); //stores the content of the page inside the variable.

        await page.type("#twotabsearchtextbox", component); //Searches for the component that has the provided selector and type the second argument.

        await page.click("#nav-search-submit-button"); //dispatches a click event on the selector specified.

        // The div that represents the title of result card in amazon:

        
        //         <h2 class="a-size-mini a-spacing-none a-color-base s-line-clamp-2">                !what we want VV!
        //             <a class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal" href="/MSI-GeForce-4060-Gaming-Graphics/dp/B0CBK6Z8SV/ref=sr_1_1?keywords=Nvidia+RTX+4060&amp;qid=1702036216&amp;sr=8-1">
        //                 <span class="a-size-medium a-color-base a-text-normal">GeForce RTX 4060 Ti Gaming X 16G Graphics Card - NVIDIA RTX 4060 Ti, 16GB GDDR6 Memory, 18Gbps, PCIe 4.0, Twin Frozr 9, RGB, DLSS3</span> 
        //             </a>                                           !also what we want ^!
        //         </h2>

        //There is another thing we need which is the price but I will use it soon V

        //page functions you might need:
        // waitForSelector receives a selector and waits 30s for it to load into the DOM. if didn't, it throws an error.
        //$eval receives a selector and returns one element only (just like querySelector)
        //$$eval receives a selector and returns all elements (just like querySelectorAll)
        //evaluate lets you perform a function on the whole DOM.

        //Different approach
        //reading anchors 
        // const titles = await page.$$eval("a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal", (anchors) =>{
        //     let hrefs = []
        //     console.log('got Inside');
        //     let spsann = Array.from(anchors);
        //     spsann.forEach((a)=>{
        //         hrefs.push(a.href);
        //     })
        //     return hrefs;
        // })
        // console.log(titles);
        
      // Read titles 
      //Reading spans directly
      //Original approach
    //   const titles = await page.$$eval(".a-size-medium.a-color-base.a-text-normal", (As) =>
        
    //   As.map((n) => n.innerText)
    //   );
    
      // Read Prices
    //   const prices = await page.$$eval("[data-component-type='s-search-result'] span.a-price[data-a-color='base'] span.a-offscreen", (spans) => 
    //      spans.map((n) => n.innerText)
    //   );
        
    await page.waitForSelector('#search');
    await page.waitForSelector('.a-size-medium.a-color-base.a-text-normal');
    const title = await page.$$eval('.a-size-medium.a-color-base.a-text-normal',(items)=>{
        return items.map((item)=> item.innerHTML);
    })
    console.log(title);
    
}catch(error){
    console.log("evaluate is giving a/an",error);
}finally{
    browser.close(); //comment this so that the you can see where the browser stoped and inspect the elements
}
};
//if we do this correctly we can duplicate the same thing for different websites!!


const neweggSearch = async function(component){
    
}
const otherwebsite = async function(component){
    
}

const createDiv = (website, linkRef, title, price) =>{
    //example
    //Container div
    let retailer = document.createElement('div');
    retailer.className = 'retailer';

    //Clickable container (redirect)
    let anchor = document.createElement('a');
    anchor.className = 'img_title_price';
    anchor.href = linkRef;
    //Brand
    let img = document.createElement('img');
    img.className = 'brand';
    img.src = `assets/${website}.png`;
    anchor.appendChild(img);
    //Title
    let span = document.createElement('span');
    span.className = 'Title';
    anchor.appendChild(span);
    //Cost
    let costSpan = document.createElement('span');
    costSpan.className = 'Cost';
    anchor.appendChild(costSpan);
    //Final
    retailer.appendChild(anchor);
    return retailer;
}
const ee = "RTX 4070";
amazonSearch(ee);