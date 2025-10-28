const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
let cart = [];

burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('max-h-0');
    mobileMenu.classList.toggle('max-h-screen');
});

function categoriesShowAndHide() {
    const categories = document.getElementById('categories');
    categories.classList.toggle('hidden');
}

const modal = document.getElementById('productDetailsModal');

window.onload = function(){
    updateCartUI();
    getCategories();
    loadAllPlants();

};

async function getCategories(){
    try{
        const response = await fetch('../asset/data/categories.json');
        const data = await response.json();
        const categories = data.categories

        let html = `<li class="category-item active px-[10px] py-[8px]"><a href="javascript:void(0);" onclick="setActive(this); loadAllPlants()" >All Trees</a></li>`

        categories.forEach(cat => {
            html+=`<li class="category-item px-[10px] py-[8px]"><a href="javascript:void(0);" onclick="setActive(this); getPlantByCategory('${cat.category_name}')">${cat.category_name}</a></li>`
        });

        document.getElementById('categories').innerHTML = html;
    }catch (error) {
        console.log("Error loading categories:", error);
    }
}

async function getPlantByCategory(categoryName){
    try{
        const response = await fetch(`../asset/data/allplants.json`);
        const data = await response.json();
        const plants = data.plants;

        const filteredPlants = plants.filter(item => item.category === categoryName);

        let html = "";
        filteredPlants.forEach(item => {
            html+= `<div onclick="getPlantDetails(${item.id})" class="plant_item bg-white rounded-xl p-4 flex flex-col h-fit gap-2">
            <div class="image h-[186px] overflow-hidden flex justify-center items-center">
              <img class="w-full" src="${item.image}" alt="${item.name}">
            </div>
            <div class="flex flex-col gap-2">
              <h6 class="font-bold text-lg">${item.name}</h6>
              <p class="text-sm">${item.description.substring(0, 80) + "..."}</p>
              <div class="flex justify-between">
                <span class="bg-[#DCFCE7] text-[#15803D] px-4 py-1 rounded-full">${item.category}</span>
                <span class="font-bold">৳ ${item.price}</span>
              </div>
              <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})" class="addToCart w-full bg-[#15803D] text-white py-2 rounded-full">Add to cart</button>
            </div>
          </div>`
        });
        document.getElementById('plants-items').innerHTML = html;
        this.classList.add('active');
    }catch (error){
        console.log("Error loading categories:", error);

    }
}

async function loadAllPlants() {
    try{
        const response = await fetch('../asset/data/allplants.json');
        const data = await response.json();
        const plants = data.plants;

        let html = "";
        plants.forEach(item => {
            html+= `<div  class="plant_item bg-white rounded-xl p-4 flex flex-col h-fit gap-2">
            <div onclick="getPlantDetails(${item.id})" class="image h-[186px] overflow-hidden flex justify-center items-center">
              <img class="w-full" src="${item.image}" alt="${item.name}">
            </div>
            <div class="flex flex-col gap-2">
              <h6 class="font-bold text-lg">${item.name}</h6>
              <p class="text-sm">${item.description.substring(0, 80) + "..."}</p>
              <div class="flex justify-between">
                <span class="bg-[#DCFCE7] text-[#15803D] px-4 py-1 rounded-full">${item.category}</span>
                <span class="font-bold">৳ ${item.price}</span>
              </div>
              <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})" class="addToCart w-full bg-[#15803D] text-white py-2 rounded-full">Add to cart</button>
            </div>
          </div>`
        });
        document.getElementById('plants-items').innerHTML = html;

    }catch (error){
        console.log("Error loading plants:", error);
    }
    
}


async function getPlantDetails(id){
    try{
        const response = await fetch(`../asset/data/allplants.json`);
        const data = await response.json();
        const plant = data.plants;

        const filteredPlant = plant.find(item => item.id === id);
        
        document.getElementById('plantTitle').innerText = filteredPlant.name;
        document.getElementById('plantImage').src = filteredPlant.image;
        document.getElementById('plantCategory').innerText = filteredPlant.category;
        document.getElementById('plantPrice').innerText = filteredPlant.price;
        document.getElementById('plantDetails').innerText = filteredPlant.description;


        modal.classList.remove('hidden');
        modal.classList.add('flex');

    }catch (error){
        console.log("Error loading plant details: ", error);
    }
    
}

function closeModal(){
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function setActive(element) {
    const items = document.querySelectorAll('.category-item');
    items.forEach(item => item.classList.remove('active'));

    element.parentElement.classList.add('active');
}



    function addToCart(id, name, price) {
        console.log(id, name, price);
        const existing = cart.find(item => item.id === id);

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ id, name, price, qty: 1 });
        }
        console.log(cart);
        updateCartUI();
    }

       
    function updateCartUI() {
        const cartList = document.getElementById("cartItems");
        const cartTotal = document.getElementById("total");

        cartList.innerHTML = "";
        let totalPrice = 0;

        cart.forEach(item => {
            totalPrice += item.qty * item.price;

            cartList.innerHTML += `<div class="cart-item flex justify-between items-center bg-[#F0FDF4] p-2">
                    <div class="flex flex-col justify-center items-start ">
                        <h6 class="mr-2 font-bold">${item.name}</h6>
                        <span class="text-gray-600 text-sm">৳ ${item.price} x ${item.qty}</span>
                    </div>
                    <button class="text-gray-600 hover:text-red-900 text-2xl" onclick="removeFromCart(${item.id})">
                        x
                    </button>
                </div>`;
        });

        cartTotal.innerText = totalPrice;
    }

    function removeFromCart(id) {
        const index = cart.findIndex(item => item.id === id);
        if (index !== -1) {
            cart.splice(index, 1);
            updateCartUI();
        }
    }
