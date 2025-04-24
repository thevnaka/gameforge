let Main_container = document.getElementsByClassName('hardware_main_con')[0];
let cart = JSON.parse(localStorage.getItem("cart")) || [];





//< -------------------------------------FUNCTION 01 (SUMMARY CART)------------------------------------->
//displays the order one last time before the user fills the form and pays
function summaryCart(){
    console.log("summaryCart function is runninggg woohoo");

    let Sumdata = JSON.parse(localStorage.getItem("cart")) || [];
    const SumBody = document.getElementById("Summarybody");

    
    if (!SumBody) { //if the user is not in the checkout page, the code below wont run
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







//< -------------------------------------FUNCTION 02 (UPDATE CART)------------------------------------->
// updates the cart count when an item has been added

function updatecart(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("itemCount").innerHTML = cart.length;
    }





    
//< -------------------------------------FUNCTION 03 (LOAD CART PAGE)------------------------------------->
// all the items the user has added to the cart will be shown

function loadCartpage(){
    let cartdata = JSON.parse(localStorage.getItem("cart")) || [];
    const CartBody = document.getElementById("cartBody");

    // empties the table before extracting data from the local storage to avoid duplicates
    CartBody.innerHTML = "" 


    //intialize the dynamic elements
    const totalAmount = document.getElementById("totalPrice");
    const table = document.getElementById("cartTable");
    const emptyMsg = document.getElementById("emptyCart");
    const options = document.getElementById("orderOptions");
    const favs = document.getElementById("favs");
    const checkout = document.getElementById("checkout");
    const clearCart =  document.getElementById("clearCart");
    // let favCart =  JSON.parse(localStorage.getItem("favourite")) || [];



    // if the cart is empty, then it'll display a msg. Else it'll display the table as usual
    if (cartdata.length === 0){ 
        table.hidden=true; 
        // options.style.display = "none";
        favs.style.display = "none";
        checkout.style.display = "none";
        clearCart.style.display = "none";
        emptyMsg.classList.remove("emptycard_hidden");
        return;
    }

    else{
    table.hidden = false;
    options.style.display = "flex";
    favs.style.display = "flex";
    checkout.style.display = "flex";
    clearCart.style.display = "flex";
    emptyMsg.classList.add("emptycard_hidden")
    }


    // const SumBody = document.getElementById("Summarybody");


    let total =0;


    //creates dynamic elements according to what the user has addded to cart
    cartdata.forEach(Data=>{
        const row = document.createElement("tr");

        const productName = document.createElement("td");
        productName.innerText = Data.name;
       

        const productPrice = document.createElement("td");
        productPrice.innerText = ` ${Data.price} LKR`;

        const quantity = document.createElement("td");
        quantity.innerText = Data.quantity;

        const totalcell = document.createElement("td");
        totalcell.innerText = `${parseInt(Data.quantity * Data.price)} LKR`;


        // const removeBtn = document.createElement("button");

        console.log("Quantity:", Data.quantity);
        console.log("Price:", Data.price);

        row.appendChild(productName);
        row.appendChild(quantity);
        row.appendChild(productPrice);
        row.appendChild(totalcell);
        CartBody.appendChild(row);
 

        total +=parseFloat(Data.price*Data.quantity);

        })

        const clearBtn = document.getElementById("clearCart");
        clearBtn.addEventListener("click",function(){
            localStorage.removeItem("cart")
            updatecart();
            loadCartpage();

        // const sRow = document.createElement("tr");
        // const sItem = document.createElement("td");
        // sItem.innerText = Data.name;
    
        // sRow.appendChild(sItem);
        // SumBody.appendChild(sRow);
    
    });
    
    totalAmount.innerText = `${total} LKR`;
    updatecart();
}





//< -------------------------------------FUNCTION 04 (LOAD PRODUCTS)------------------------------------->
// creates dynamic html elements after retreiving data from json to display on the hardware page


async function loadproducts(){
    try{
        const response = await fetch('./hardware_details.json');
        const products = await response.json();

        console.log("Data loaded");  // for troubleeshooting purposes

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
            let quantityDis = document.createElement("input");

            quantityDis.type = "number"
            quantityDis.min = "1";
            quantityDis.value = "1";
            
            let Category = product.category;
            let ProcessorContainer = ProcessorSection.querySelector(".hardware_main_con");
            let GraphicContainer = GraphicSection.querySelector(".hardware_main_con");
            let MotherboardContainer = MotherboardSection.querySelector(".hardware_main_con");
            let MemoryContainer = MemorySection.querySelector(".hardware_main_con");
            let StorageContainer = StorageSection.querySelector(".hardware_main_con");


           
            console.log("Creating element for:", product.product_name);  // for troubleshooting

            //assigning classes and ids for dynamic elements
            processorsDiv.classList.add("processors");
            quantityDis.id = ("quantityNo");
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



            //depending on the category, elements will be assigned to different sections in the checkout page

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
                let qty = parseInt(quantityDis.value);
                quantityDis.value =  qty + 1;
            })

            minusBtn.addEventListener("click",function(){
                let qty = parseFloat(quantityDis.value);
                if (qty>1){
                    quantityDis.value = qty - 1;
                }
            })






            //< -------------------------------------FUNCTION 04.1 (ADD TO CART)------------------------------------->
            //when the user click add to cart, the item will get saved into local storage as an array


            function addToCart(){
                console.log("addToCart triggered"); //for troubleshooting

                let currentCart = JSON.parse(localStorage.getItem("cart")) || []; 
                let quantity = parseInt(quantityDis.value);

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




//< -------------------------------------FUNCTION 05 (LOAD FAVORITE)------------------------------------->
//loads the favorite order into the table


    loadFav.addEventListener("click",function(){

      
        let favCart =  JSON.parse(localStorage.getItem("favourite")) || []; //checks if there's anything in the favorite variable, if not returns null

        localStorage.setItem("cart",JSON.stringify(favCart));

        
        const emptyMsg = document.getElementById("emptyCart");

        const totalAmount = document.getElementById("totalPrice");
        const CartBody = document.getElementById("cartBody");
        let total = 0;
    
        // CartBody.innerHTML = "";


        if (favCart.length === 0){
            alert(`No favourites have been added yet.`)
        }

    
        //creates dynamic elements and forms a table depending on the favorites
        else{
            CartBody.innerHTML = ""; 
            document.getElementById("itemCount").innerHTML = favCart.length; //adjusts the itemCount according to the favorites
            
            favCart.forEach(item=>{
            const row = document.createElement("tr");
            const productName = document.createElement("td");
            productName.innerText = item.name
    
            const productPrice = document.createElement("td");
            productPrice.innerText = (` ${item.price} LKR`)  

            const quantity = document.createElement("td");
            quantity.innerText =item.quantity

            const itemTotal = document.createElement("td");
            itemTotal.innerText = parseInt(`${item.quantity * item.price} LKR`);


            row.appendChild(productName);
            row.appendChild(quantity);
            row.appendChild(productPrice);
            row.appendChild(itemTotal);
            CartBody.appendChild(row);
    
            total +=parseFloat(item.price*item.quantity);
        })
    
        totalAmount.innerText = `${total} LKR`;
    
        cart = favCart;
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCartpage();

         }


    })


    

    //< -------------------------------------FUNCTION 06 (ADD TO FAVORITE)------------------------------------->
    //when the user clicks the button, it will assign the cart variable to a new variable called favourite and save in local storage
    
    addFav.addEventListener("click", function() {
        localStorage.setItem("favourite",JSON.stringify(cart));
        alert("Order saved as favourite")
     });
    

});

window.onload=loadCartpage,updatecart();; //runs the functions when the page is being loaded

const checkOut = document.getElementById("checkout");
checkOut.addEventListener("click",function(){
    window.location.href = "./checkout.html";
})



const shop = document.getElementById("shop");
shop.addEventListener("click",function(){
    window.location.href = "./hardware.html";
})



// localStorage.clear();
// localStorage.removeItem("cart");