const mainSection = document.querySelector("main");
const filterByBrand = document.querySelector(".filterByBrand")


const state = {
    products: []
};

// query selector to find the select element
// register an event listener that listens for the onchange event of the select element
// in the event handler function, we will filter the products based what the user selected
// rerender the filtered product list

// target select button
    //const select = document.getElementById("selectTVType"); 
//listen for onchange event and trigger fxn
    //select.addEventListener("change", function() {
//filter returned data
 // const returnedData = products.filter(test => test.productResolution === "4K");
 // console.log(returnedData);

  // return event.target;
 // console.log(filteredTv);
//})
// filter results




function setState(data, filteredPrices = [], myType = "") {
  console.log("setting state", data, filteredPrices);

  
   if( filteredPrices.length > 0 ) {
    const filteredData = data.filter(function(element) {
      console.log(element, "element");
        if (filteredPrices[0] === true && element.productCost >= 150 && element.productCost <= 400) {
          return true;
        } else if (filteredPrices[1] === true && element.productCost > 400 && element.productCost <= 700) {
          return true;
        } else if (filteredPrices[2] === true && element.productCost > 700) {
          return true 
        };
      
    })
    console.log("my string", filteredData);
    state.products = filteredData;
  } else {
    console.log("here", myType);
    const myTypes = data.filter(function(myProduct) {
      console.log(myProduct.productName, myType);
      if(myProduct.productName.includes(myType)) {
        console.log("bla");
        return true;
        
      }
    })
    console.log(myTypes);
    state.products = myTypes;
  }
  console.log(state.products);
}

//Fetch Data from server
function getProducts(event) {
    
    console.log(event)
    console.log("Lets go")

    event.preventDefault();

    fetch("http://localhost:3000/products")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setState(data);
        
        renderProductsList();
      });
 }

function renderProductsList() {
   
    const listEl = document.createElement("ul");
    listEl.className = "productsList";
    mainSection.append(listEl);

    for (let i=0; i < state.products.length; i++) {
        const product = state.products[i];
        
       
        const listItemEl = getProductsListItem(product);

        listEl.append(listItemEl);
    }
//     productsSection.append(listEl);
 };
function getFilteredProducts(event) {
  // console.log("Filtered p", event);


  const lowRangeValue = document.getElementById("lowRange").checked;    
  const midRangeValue = document.getElementById("midRange").checked;    
  const highRangeValue = document.getElementById("highRange").checked;    
  console.log(lowRangeValue);
  const myRanges = [lowRangeValue, midRangeValue, highRangeValue];

  // const hiSenseFilter = document.getElementById("hiSense");
  // const samsungFilter = document.getElementById("samsung");
  // const lgFilter = document.getElementById("lg");
  // const tclFilter = document.getElementById("tcl");
  // const sonyFilter = document.getElementById("sony");
  // const panasonicFilter = document.getElementById("panasonic");
  // const myBrandRanges = [hiSenseFilter, samsungFilter, lgFilter, tclFilter, sonyFilter, panasonicFilter];
  event.preventDefault();

    fetch("http://localhost:3000/products")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setState(data, myRanges);
        
        renderProductsList()
      });
}
function getProductType(event) {
    
  console.log("product type", event, event.target.elements[0].value);
  console.log("product type", event);
  

  event.preventDefault();

  fetch("http://localhost:3000/products")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // event.target.elements[0].value = select option
      setState(data, [], event.target.elements[0].value);
      
      renderProductsList();
    });
}



//Fetch data from event listener
function listenProduct() {
    const productTypeForm = document.getElementById("selectProductType");  
    productTypeForm.addEventListener("submit", getProductType);

    const lowRange = document.getElementById("lowRange");    
    lowRange.addEventListener("change", getFilteredProducts);  
    
    const midRange = document.getElementById("midRange");    
    midRange.addEventListener("change", getFilteredProducts);

    const highRange = document.getElementById("highRange");    
    highRange.addEventListener("change", getFilteredProducts);

    // const contactBtn = document.getElementById("userInfo");
    // contactBtn.addEventListener("click", contactPage) ;

    // const hiSense = document.getElementById("hiSense");
    // hiSense.addEventListener("change", getFilteredProducts);

    // const samsung = document.getElementById("samsung");
    // hiSense.addEventListener("change", getFilteredProducts);

    // const lg = document.getElementById("lg");
    // hiSense.addEventListener("change", getFilteredProducts);

    // const tcl = document.getElementById("tcl");
    // hiSense.addEventListener("change", getFilteredProducts);

    // const sony = document.getElementById("sony");
    // hiSense.addEventListener("change", getFilteredProducts);

    // const panasonic = document.getElementById("panasonic");
    // hiSense.addEventListener("change", getFilteredProducts);
}

listenProduct();

// contactPage() {
//   console.log("contact page");
// };

function getProductsListItem(product) {

  console.log("This is a string", product);
  console.log(product.productFeatures)


  const listItem = document.createElement("li");
  listItem.className = "listItem";
  // main.append(listItem);

  const productName = document.createElement("h2");
  productName.className = "productName";
  productName.innerText = `${product.productName}`;
  console.log("name check", productName);
  listItem.append(productName);

  const productImage = document.createElement("img");
  productImage.setAttribute("src", `/src/assets/images/${product.productImage}`)
  productImage.className = "productImage";
  listItem.append(productImage);


  const productPrice = document.createElement("h3");
  productPrice.innerText = `${product.productCost}`;
  productPrice.className = "productPrice";
  listItem.append(productPrice);

  const storeURL = document.createElement("a");
  storeURL.href = `${product.storeURL}`
  storeURL.target=  "_blank";
  storeURL.innerText= "Visit Website";
  listItem.append(storeURL);

  
  

  return listItem;
  
}


