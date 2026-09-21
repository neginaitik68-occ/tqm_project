// ==========================================
// RESTAURANT BILLING SYSTEM
// Day 14 - Clear Bill Functionality
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

const clearButton =
    document.querySelector(".clear-button");

const checkoutButton =
    document.querySelector(".checkout-button");


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

    button.addEventListener(
        "click",
        function() {

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

        }
    );

});


// ==========================================
// Update Bill
// ==========================================

function updateBill() {

    billItemsContainer.innerHTML = "";


    // ==========================================
    // Check Empty Bill
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

                <button
                    type="button"
                    class="quantity-button decrease-button"
                    data-id="${item.id}"
                    aria-label="Decrease ${item.name} quantity">

                    −

                </button>


                <span class="quantity">

                    ${item.quantity}

                </span>


                <button
                    type="button"
                    class="quantity-button increase-button"
                    data-id="${item.id}"
                    aria-label="Increase ${item.name} quantity">

                    +

                </button>


                <strong>

                    ₹${item.price * item.quantity}

                </strong>


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
    // Calculate Item Count
    // ==========================================

    const totalQuantity =
        billItems.reduce(
            function(total, item) {

                return total + item.quantity;

            },
            0
        );


    billCount.textContent =
        `${totalQuantity} Items`;


    // ==========================================
    // Calculate Subtotal
    // ==========================================

    const subtotal =
        billItems.reduce(
            function(total, item) {

                return total +
                    (item.price * item.quantity);

            },
            0
        );


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
    // Enable / Disable Clear Button
    // ==========================================

    if (billItems.length > 0) {

        clearButton.disabled = false;

    }

    else {

        clearButton.disabled = true;

    }


    // ==========================================
    // Enable / Disable Checkout Button
    // ==========================================

    if (billItems.length > 0) {

        checkoutButton.disabled = false;

    }

    else {

        checkoutButton.disabled = true;

    }


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


// ==========================================
// Clear Bill
// ==========================================

clearButton.addEventListener(
    "click",
    function() {

        billItems = [];

        updateBill();

    }
);


// ==========================================
// Bill Validation - Day 16
// ==========================================

function validateBill() {

    if (billItems.length === 0) {

        return {
            valid: false,
            message:
                "Your bill is empty. Please add items first."
        };

    }


    for (let item of billItems) {

        if (
            typeof item.quantity !== "number" ||
            item.quantity <= 0
        ) {

            return {
                valid: false,
                message:
                    `Invalid quantity for ${item.name}.`
            };

        }


        if (
            typeof item.price !== "number" ||
            item.price < 0
        ) {

            return {
                valid: false,
                message:
                    `Invalid price for ${item.name}.`
            };

        }

    }


    const subtotal =
        billItems.reduce(
            function(total, item) {

                return total +
                    (item.price * item.quantity);

            },
            0
        );


    const tax =
        subtotal * 0.05;


    const total =
        subtotal + tax;


    if (
        typeof total !== "number" ||
        !Number.isFinite(total) ||
        total <= 0
    ) {

        return {
            valid: false,
            message:
                "Invalid bill total."
        };

    }


    return {
        valid: true,
        message:
            "Bill validation successful."
    };

}


// ==========================================
// Checkout Functionality
// ==========================================

checkoutButton.addEventListener(
    "click",
    function() {

        const validation =
            validateBill();


        if (!validation.valid) {

            alert(validation.message);

            return;

        }


        const finalTotal =
            totalElement.textContent;


        alert(
            `Checkout successful!\n\n` +
            `Final Amount: ${finalTotal}\n\n` +
            `Thank you for visiting our restaurant!`
        );


        billItems = [];

        updateBill();

    }
);


// ==========================================
// DAY 24 - HIGH CONTRAST ACCESSIBILITY MODE
// ==========================================

const highContrastToggle =
    document.getElementById(
        "high-contrast-toggle"
    );


const contrastStatus =
    document.getElementById(
        "contrast-status"
    );


// ==========================================
// Apply High Contrast Mode
// ==========================================

function applyHighContrastMode(enabled) {

    if (enabled) {

        document.body.classList.add(
            "high-contrast"
        );


        if (highContrastToggle) {

            highContrastToggle.textContent =
                "High Contrast: ON";


            highContrastToggle.setAttribute(
                "aria-pressed",
                "true"
            );

        }


        if (contrastStatus) {

            contrastStatus.textContent =
                "High contrast mode is currently on.";

        }

    }

    else {

        document.body.classList.remove(
            "high-contrast"
        );


        if (highContrastToggle) {

            highContrastToggle.textContent =
                "High Contrast: OFF";


            highContrastToggle.setAttribute(
                "aria-pressed",
                "false"
            );

        }


        if (contrastStatus) {

            contrastStatus.textContent =
                "High contrast mode is currently off.";

        }

    }

}


// ==========================================
// Load Saved High Contrast Preference
// ==========================================

const savedHighContrast =
    localStorage.getItem(
        "tqmHighContrast"
    ) === "true";


applyHighContrastMode(
    savedHighContrast
);


// ==========================================
// Toggle High Contrast Mode
// ==========================================

if (highContrastToggle) {

    highContrastToggle.addEventListener(
        "click",
        function() {

            const enabled =
                !document.body.classList.contains(
                    "high-contrast"
                );


            applyHighContrastMode(
                enabled
            );


            localStorage.setItem(
                "tqmHighContrast",
                enabled.toString()
            );

        }
    );

}


// ==========================================
// DAY 25 - FONT RESIZING ACCESSIBILITY
// ==========================================


// Font Size Buttons

const fontNormalButton =
    document.getElementById(
        "font-normal"
    );


const fontLargeButton =
    document.getElementById(
        "font-large"
    );


const fontExtraLargeButton =
    document.getElementById(
        "font-extra-large"
    );


// Font Size Status

const fontSizeStatus =
    document.getElementById(
        "font-size-status"
    );


// ==========================================
// Apply Font Size
// ==========================================

function applyFontSize(size) {

    // Remove previous font-size classes

    document.body.classList.remove(
        "font-large",
        "font-extra-large"
    );


    // Apply Large

    if (size === "large") {

        document.body.classList.add(
            "font-large"
        );

    }


    // Apply Extra Large

    else if (size === "extra-large") {

        document.body.classList.add(
            "font-extra-large"
        );

    }


    // Update buttons and status

    updateFontSizeControls(size);

}


// ==========================================
// Update Font Size Controls
// ==========================================

function updateFontSizeControls(size) {

    const buttons = [

        fontNormalButton,

        fontLargeButton,

        fontExtraLargeButton

    ];


    // Reset all buttons

    buttons.forEach(function(button) {

        if (button) {

            button.classList.remove(
                "active"
            );


            button.setAttribute(
                "aria-pressed",
                "false"
            );

        }

    });


    // Default selection

    let selectedButton =
        fontNormalButton;


    let statusMessage =
        "Normal font size is currently selected.";


    // Large

    if (size === "large") {

        selectedButton =
            fontLargeButton;


        statusMessage =
            "Large font size is currently selected.";

    }


    // Extra Large

    else if (size === "extra-large") {

        selectedButton =
            fontExtraLargeButton;


        statusMessage =
            "Extra large font size is currently selected.";

    }


    // Highlight selected button

    if (selectedButton) {

        selectedButton.classList.add(
            "active"
        );


        selectedButton.setAttribute(
            "aria-pressed",
            "true"
        );

    }


    // Update accessibility status

    if (fontSizeStatus) {

        fontSizeStatus.textContent =
            statusMessage;

    }

}


// ==========================================
// Load Saved Font Size
// ==========================================

const savedFontSize =
    localStorage.getItem(
        "tqmFontSize"
    ) || "normal";


applyFontSize(
    savedFontSize
);


// ==========================================
// Normal Font Size
// ==========================================

if (fontNormalButton) {

    fontNormalButton.addEventListener(
        "click",
        function() {

            applyFontSize(
                "normal"
            );


            localStorage.setItem(
                "tqmFontSize",
                "normal"
            );

        }
    );

}


// ==========================================
// Large Font Size
// ==========================================

if (fontLargeButton) {

    fontLargeButton.addEventListener(
        "click",
        function() {

            applyFontSize(
                "large"
            );


            localStorage.setItem(
                "tqmFontSize",
                "large"
            );

        }
    );

}


// ==========================================
// Extra Large Font Size
// ==========================================

if (fontExtraLargeButton) {

    fontExtraLargeButton.addEventListener(
        "click",
        function() {

            applyFontSize(
                "extra-large"
            );


            localStorage.setItem(
                "tqmFontSize",
                "extra-large"
            );

        }
    );

}