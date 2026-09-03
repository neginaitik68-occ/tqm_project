// ==========================================
// RESTAURANT BILLING SYSTEM
// Day 6 - Menu Data Structure
// ==========================================


// Menu Items

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
// Display Menu Items
// ==========================================

const mainCourseMenu = document.getElementById("main-course-menu");
const snacksDrinksMenu = document.getElementById("snacks-drinks-menu");


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

        <button type="button" class="add-button">
            Add to Bill
        </button>
    `;


    if (item.category === "Main Course") {

        mainCourseMenu.appendChild(menuCard);

    } else {

        snacksDrinksMenu.appendChild(menuCard);

    }

});


// Check Menu Data

console.log("Menu items loaded:", menuItems);