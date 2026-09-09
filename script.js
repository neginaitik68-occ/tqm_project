// ==========================================
// RESTAURANT BILLING SYSTEM
// Day 13 - Total Calculation
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


const subtotalElement =
    document.getElementById("subtotal");


const taxElement =
    document.getElementById("tax");


const totalElement =
    document.getElementById("total");



// ==========================================
// Display Menu
// ==========================================

menuItems.forEach(function(item) {


    const menuCard =
        document.createElement("article");


    menuCard.className =
        "menu-item";


    menuCard.innerHTML = `

        <span class="food-icon">
            ${item.icon}
        </span>


        <span class="food-category">
            ${item.category}
        </span>


        <h3>
            ${item.name}
        </h3>


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

    }

    else {

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


            const existingItem =
                billItems.find(function(item) {

                    return item.id === itemId;

                });



            if (existingItem) {

                existingItem.quantity++;

            }

            else {

                billItems.push({

                    ...selectedItem,

                    quantity: 1

                });

            }



            updateBill();

        }

    });

});



// ==========================================
// Update Bill
// ==========================================

function updateBill() {


    // Clear current bill

    billItemsContainer.innerHTML = "";



    // ==========================================
    // Empty Bill
    // ==========================================

    if (billItems.length === 0) {


        billItemsContainer.innerHTML = `

            <div class="empty-bill">

                <span class="empty-icon">
                    🧾
                </span>


                <h3>
                    No items added
                </h3>


                <p>
                    Select an item from the menu
                    to add it to your bill.
                </p>

            </div>

        `;

    }



    // ==========================================
    // Display Bill Items
    // ==========================================

    billItems.forEach(function(item) {


        const billItem =
            document.createElement("div");


        billItem.className =
            "bill-item";



        billItem.innerHTML = `

            <div class="bill-item-info">

                <span class="bill-item-icon">

                    ${item.icon}

                </span>


                <div>

                    <h3>

                        ${item.name}

                    </h3>


                    <p>

                        ₹${item.price} × ${item.quantity}

                    </p>

                </div>

            </div>



            <div class="bill-item-actions">


                <!-- Decrease -->

                <button
                    type="button"
                    class="quantity-button decrease-button"
                    data-id="${item.id}"
                    aria-label="Decrease ${item.name} quantity">

                    −

                </button>



                <!-- Quantity -->

                <span class="quantity">

                    ${item.quantity}

                </span>



                <!-- Increase -->

                <button
                    type="button"
                    class="quantity-button increase-button"
                    data-id="${item.id}"
                    aria-label="Increase ${item.name} quantity">

                    +

                </button>



                <!-- Item Total -->

                <strong>

                    ₹${item.price * item.quantity}

                </strong>



                <!-- Remove -->

                <button
                    type="button"
                    class="remove-button"
                    data-id="${item.id}"
                    aria-label="Remove ${item.name} from bill">

                    Remove

                </button>

            </div>

        `;



        billItemsContainer.appendChild(billItem);

    });



    // ==========================================
    // Item Count
    // ==========================================

    const totalQuantity =
        billItems.reduce(function(total, item) {

            return total + item.quantity;

        }, 0);



    billCount.textContent =
        `${totalQuantity} Items`;



    // ==========================================
    // Calculate Subtotal
    // ==========================================

    const subtotal =
        billItems.reduce(function(total, item) {

            return total +
                (item.price * item.quantity);

        }, 0);



    subtotalElement.textContent =
        `₹${subtotal}`;



    // ==========================================
    // Calculate Tax
    // ==========================================

    const taxRate = 0.05;


    const tax =
        subtotal * taxRate;



    taxElement.textContent =
        `₹${tax.toFixed(2)}`;



    // ==========================================
    // Calculate Total
    // ==========================================

    const total =
        subtotal + tax;



    totalElement.textContent =
        `₹${total.toFixed(2)}`;



    // ==========================================
    // Increase Quantity
    // ==========================================

    const increaseButtons =
        document.querySelectorAll(
            ".increase-button"
        );



    increaseButtons.forEach(function(button) {


        button.addEventListener(
            "click",
            function() {


                const itemId =
                    Number(button.dataset.id);



                const item =
                    billItems.find(function(item) {

                        return item.id === itemId;

                    });



                if (item) {

                    item.quantity++;

                    updateBill();

                }

            }
        );

    });



    // ==========================================
    // Decrease Quantity
    // ==========================================

    const decreaseButtons =
        document.querySelectorAll(
            ".decrease-button"
        );



    decreaseButtons.forEach(function(button) {


        button.addEventListener(
            "click",
            function() {


                const itemId =
                    Number(button.dataset.id);



                const item =
                    billItems.find(function(item) {

                        return item.id === itemId;

                    });



                if (item) {


                    if (item.quantity > 1) {

                        item.quantity--;

                    }

                    else {

                        billItems =
                            billItems.filter(
                                function(item) {

                                    return item.id !== itemId;

                                }
                            );

                    }



                    updateBill();

                }

            }
        );

    });



    // ==========================================
    // Remove Item
    // ==========================================

    const removeButtons =
        document.querySelectorAll(
            ".remove-button"
        );



    removeButtons.forEach(function(button) {


        button.addEventListener(
            "click",
            function() {


                const itemId =
                    Number(button.dataset.id);



                billItems =
                    billItems.filter(
                        function(item) {

                            return item.id !== itemId;

                        }
                    );



                updateBill();

            }
        );

    });

}