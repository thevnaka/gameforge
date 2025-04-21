let Main_container = document.getElementsByClassName('hardware_main_con')[0];
let cart = JSON.parse(localStorage.getItem("cart")) || [];



function summaryCart(){
    console.log("summaryCart function is runninggg woohoo");

    let Sumdata = JSON.parse(localStorage.getItem("cart")) || [];
    const SumBody = document.getElementById("Summarybody");

    if (!SumBody) {
        console.log("Summarybody not found — skipping summaryCart()");
        return;
    }

    const Gtotal = document.getElementById("sumGtotal");
    let total = 0;
    
    Sumdata.forEach(sumitem=>{
            const sRow = document.createElement("tr");
            const sItem = document.createElement("td");
            const sQuan = document.createElement("td");
            const xtext = document.createElement("td");

            sItem.innerText = `${sumitem.name}`;
            sQuan.innerText = `${sumitem.quantity}`;
            xtext.innerText = "x";
        
            total += parseFloat(sumitem.price*sumitem.quantity);

            sRow.appendChild(sItem);
            sRow.appendChild(xtext)
            sRow.appendChild(sQuan);
            SumBody.appendChild(sRow);
    })

    Gtotal.innerText = (`${total} LKR`);
    
    }


summaryCart();



//< -------------------------------------FUNCTION 01------------------------------------->
// updates the cart count when an item has been added

function updatecart(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("itemCount").innerHTML = cart.length;
    }

    
//< -------------------------------------FUNCTION 01------------------------------------->

function loadCartpage(){
    let cartdata = JSON.parse(localStorage.getItem("cart")) || [];
    const CartBody = document.getElementById("cartBody");

    // empties the table before extracting data from the local storage to avoid duplicates
    CartBody.innerHTML = "" 

    const totalAmount = document.getElementById("totalPrice");
    const table = document.getElementById("cartTable");
    const emptyMsg = document.getElementById("backG");
    const options = document.getElementById("orderOptions");


    // if the cart is empty, then it'll display a msg. Else it'll display the table as usual

    if (cartdata.length === 0){ 
        table.hidden=true; 
        options.style.display = "none";
        emptyMsg.hidden = false; 
        return;
    }

    else{
    table.hidden = false;
    options.style.display = "flex";
    emptyMsg.hidden = true;}

    // const SumBody = document.getElementById("Summarybody");


    let total =0;

    cartdata.forEach(Data=>{
        const row = document.createElement("tr");

        const productName = document.createElement("td");
        productName.innerText = Data.name;
       

        const productPrice = document.createElement("td");
        productPrice.innerText = `Rs. ${Data.price}`;

        const quantity = document.createElement("td");
        quantity.innerText = Data.quantity;

        const totalcell = document.createElement("td");
        totalcell.innerText = parseInt(Data.quantity * Data.price);

        console.log("Quantity:", Data.quantity);
        console.log("Price:", Data.price);

        row.appendChild(productName);
        row.appendChild(quantity);
        row.appendChild(productPrice);
        row.appendChild(totalcell);
        CartBody.appendChild(row);
 

        total +=parseFloat(Data.price*Data.quantity);

   
        // const sRow = document.createElement("tr");
        // const sItem = document.createElement("td");
        // sItem.innerText = Data.name;
    
        // sRow.appendChild(sItem);
        // SumBody.appendChild(sRow);
    

    });
    
    totalAmount.innerText = `Rs. ${total} LKR`;
    updatecart();




}

//< -------------------------------------FUNCTION 03------------------------------------->

async function loadproducts(){
    try{
        const response = await fetch('./hardware_details.json');
        const products = await response.json();

        console.log("Data loaded");  // for troubleeshooting

        let ProcessorSection = document.getElementById("processorSection");
        let GraphicSection = document.getElementById("graphicSection");
        let MotherboardSection = document.getElementById("motherboardSection");
        let MemorySection = document.getElementById("memorySection");
        let StorageSection = document.getElementById("storageSection");

        
        products.forEach(product => {  // created a foreach loop here. for each element retrived from the json file, dynamic html elements will be created.

            let processorsDiv = document.createElement("div");
            let productPrice = document.createElement("p")
            let productName = document.createElement("h3");
            let productThumb = document.createElement("img");
            let ProductDeets = document.createElement("div");
            let orderButton = document.createElement("button");
            let quantityDiv = document.createElement("div");
            let minusBtn = document.createElement("button");
            let plusBtn = document.createElement("button");
            let quantityDis = document.createElement("span");
            
            let Category = product.category;
            let ProcessorContainer = ProcessorSection.querySelector(".hardware_main_con");
            let GraphicContainer = GraphicSection.querySelector(".hardware_main_con");
            let MotherboardContainer = MotherboardSection.querySelector(".hardware_main_con");
            let MemoryContainer = MemorySection.querySelector(".hardware_main_con");
            let StorageContainer = StorageSection.querySelector(".hardware_main_con");


           
            console.log("Creating element for:", product.product_name);  // for troubleshooting

            processorsDiv.classList.add("processors");
            ProductDeets.classList.add("hardware_deets");
            productPrice.id  = ("price");
            productThumb.src = product.img_path;
            productThumb.alt = product.alt_text;
            productThumb.classList.add("hardware_thumb");
            productName.innerText= product.product_name;
            productPrice.innerText= `${product.price} LKR`;

            quantityDiv.classList.add("quantityDisplay");
            minusBtn.classList.add("quantitySign");
            plusBtn.classList.add("quantitySign");
            quantityDis.classList.add("qty_Dis");

            quantityDiv.appendChild(minusBtn);
            quantityDiv.appendChild(quantityDis);
            quantityDiv.appendChild(plusBtn);

            minusBtn.innerText ="-";
            plusBtn.innerText ="+";
            quantityDis.innerText = "1";



            orderButton.innerText = "ORDER NOW"; 
            orderButton.classList.add("order-btn"); 

            processorsDiv.appendChild(productThumb);
            processorsDiv.appendChild(ProductDeets);
            processorsDiv.appendChild(quantityDiv);
            processorsDiv.appendChild(orderButton);
            ProductDeets.appendChild(productName);
            ProductDeets.appendChild(productPrice)
            // Main_container.appendChild(processorsDiv);

            if (Category === "processors"){
                ProcessorContainer.appendChild(processorsDiv);
            }

            else if(Category === "graphics"){
                GraphicContainer.appendChild(processorsDiv);
            }

            else if(Category === "motherboard"){
                MotherboardContainer.appendChild(processorsDiv);
            }

            else if (Category === "memory"){
                MemoryContainer.appendChild(processorsDiv);
            }

            else if(Category === "storage"){
                StorageContainer.appendChild(processorsDiv);
                
            }

            plusBtn.addEventListener("click",function(){
                let qty = parseInt(quantityDis.innerText);
                quantityDis.innerText =  qty + 1;
            })

            minusBtn.addEventListener("click",function(){
                let qty = parseFloat(quantityDis.innerText);
                if (qty>1){
                    quantityDis.innerText = qty - 1;
                }
            })

            //< -------------------------------------FUNCTION 04------------------------------------->

            function addToCart(){
                console.log("addToCart triggered"); //for troubleshooting

                let currentCart = JSON.parse(localStorage.getItem("cart")) || []; 
                let quantity = parseInt(quantityDis.innerText);

                let items_to_cart = {
                    name : product.product_name,
                    imagePath : product.img_path,
                    imageAltText : product.alt_text,
                    price : product.price,
                    quantity : quantity
                }

                currentCart.push(items_to_cart);
                localStorage.setItem("cart", JSON.stringify(currentCart));
                alert(`${product.product_name} added to cart`);
               
                

                updatecart(); //once the item is added, runs the updatecart function to update the cart count
                quantityDis.innerText = "1"

                
            }

            orderButton.addEventListener('click',addToCart)
            
        });

    
        
    }

    catch(error){
        console.error("Error fetching data:", error);
    }


}





document.addEventListener("DOMContentLoaded",function(){
    loadproducts();
    updatecart();
    loadCartpage();
 
 

    let addFav = document.getElementById("favs");
    let loadFav = document.getElementById("loadFav");

    //< -------------------------------------FUNCTION 05------------------------------------->


    loadFav.addEventListener("click",function(){

      
        let favCart =  JSON.parse(localStorage.getItem("favourite")) || [];
        localStorage.setItem("cart",JSON.stringify(favCart));
        document.getElementById("itemCount").innerHTML = favCart.length;

        const totalAmount = document.getElementById("totalPrice");
        const CartBody = document.getElementById("cartBody");
        let total = 0;
    
        CartBody.innerHTML = "";


        if (favCart.length === 0){
            alert(`No favourites have been added yet.`)
        }

    
        else{

            favCart.forEach(item=>{
            const row = document.createElement("tr");
            const productName = document.createElement("td");
            productName.innerText = item.name
    
            const productPrice = document.createElement("td");
            productPrice.innerText = item.price  

            const quantity = document.createElement("td");
            quantity.innerText =item.quantity

            const itemTotal = document.createElement("td");
            itemTotal.innerText = parseInt(`${item.quantity * item.price}`);


            row.appendChild(productName);
            row.appendChild(quantity);
            row.appendChild(productPrice);
            row.appendChild(itemTotal);
            CartBody.appendChild(row);
    
            total +=parseFloat(item.price*item.quantity);
        })
    
        totalAmount.innerText = `Rs. ${total} LKR`;
    
        cart = favCart;
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    })
    

    //< -------------------------------------FUNCTION 06------------------------------------->
    
    addFav.addEventListener("click", function() {
        localStorage.setItem("favourite",JSON.stringify(cart));
        alert("Order saved as favourite")
     });
    

});

window.onload=loadCartpage,updatecart();;

const checkOut = document.getElementById("checkout");
checkOut.addEventListener("click",function(){
    window.location.href = "./checkout.html";
})

// localStorage.clear();

// localStorage.removeItem("cart");


const thankyouMsg = document.getElementById("thankContainer")
const submitBtn = document.getElementById("submit")
const form = document.getElementById("main_payment_con");

thankyouMsg.hidden = "true";

submitBtn.addEventListener("click",function(e){
    e.preventDefault();
    thankyouMsg.hidden = "false";
    form.hidden = "true";
})