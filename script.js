// ==========================================
// RESTAURANT BILLING SYSTEM
// Day 8 - Add Items to Bill
// ==========================================


// ==========================================
// Menu Items
// ==========================================

const menuItems = [

    {
        id: 1,
        name: "Classic Burger",
        price: 120,
        category: "Main Course",
        description: "Crispy vegetables with a delicious burger patty.",
        icon: "🍔"
    },

    {
        id: 2,
        name: "Cheese Pizza",
        price: 250,
        category: "Main Course",
        description: "Fresh pizza topped with melted cheese.",
        icon: "🍕"
    },

    {
        id: 3,
        name: "Italian Pasta",
        price: 180,
        category: "Main Course",
        description: "Creamy pasta prepared with Italian herbs.",
        icon: "🍝"
    },

    {
        id: 4,
        name: "Veg Sandwich",
        price: 100,
        category: "Main Course",
        description: "Fresh vegetables served in toasted bread.",
        icon: "🥪"
    },

    {
        id: 5,
        name: "French Fries",
        price: 90,
        category: "Snack",
        description: "Crispy golden fries served hot.",
        icon: "🍟"
    },

    {
        id: 6,
        name: "Hot Coffee",
        price: 80,
        category: "Drink",
        description: "Freshly brewed hot coffee.",
        icon: "☕"
    }

];


// ==========================================
// Bill
// ==========================================

let billItems = [];


// ==========================================
// Menu Containers
// ==========================================

const mainCourseMenu =
    document.getElementById("main-course-menu");

const snacksDrinksMenu =
    document.getElementById("snacks-drinks-menu");


// ==========================================
// Billing Elements
// ==========================================

const billItemsContainer =
    document.querySelector(".bill-items");

const billCount =
    document.querySelector(".bill-count");


// ==========================================
// Display Menu
// ==========================================

menuItems.forEach(function(item) {

    const menuCard = document.createElement("article");

    menuCard.className = "menu-item";

    menuCard.innerHTML = `
        <span class="food-icon">${item.icon}</span>

        <span class="food-category">${item.category}</span>

        <h3>${item.name}</h3>

        <p class="food-description">
            ${item.description}
        </p>

        <p class="food-price">
            ₹${item.price}
        </p>

        <button
            type="button"
            class="add-button"
            data-id="${item.id}">

            Add to Bill

        </button>
    `;


    if (item.category === "Main Course") {

        mainCourseMenu.appendChild(menuCard);

    } else {

        snacksDrinksMenu.appendChild(menuCard);

    }

});


// ==========================================
// Add Item to Bill
// ==========================================

const addButtons =
    document.querySelectorAll(".add-button");


addButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const itemId =
            Number(button.dataset.id);

        const selectedItem =
            menuItems.find(function(item) {

                return item.id === itemId;

            });


        if (selectedItem) {

            billItems.push(selectedItem);

            updateBill();

        }

    });

});


// ==========================================
// Update Bill
// ==========================================

function updateBill() {

    billItemsContainer.innerHTML = "";


    billItems.forEach(function(item) {

        const billItem =
            document.createElement("div");

        billItem.className = "bill-item";


        billItem.innerHTML = `

            <div class="bill-item-info">

                <span class="bill-item-icon">
                    ${item.icon}
                </span>

                <div>

                    <h3>${item.name}</h3>

                    <p>₹${item.price} × 1</p>

                </div>

            </div>


            <div class="bill-item-actions">

                <strong>
                    ₹${item.price}
                </strong>

            </div>

        `;


        billItemsContainer.appendChild(billItem);

    });


    // Update item count

    billCount.textContent =
        `${billItems.length} Items`;

}