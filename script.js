// ==========================================
// RESTAURANT BILLING SYSTEM
// DAY 27 - DARK MODE + ALL PREVIOUS FEATURES
// ==========================================


// ==========================================
// MENU ITEMS
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
// BILL
// ==========================================

let billItems = [];


// ==========================================
// MENU CONTAINERS
// ==========================================

const mainCourseMenu =
    document.getElementById("main-course-menu");

const snacksDrinksMenu =
    document.getElementById("snacks-drinks-menu");


// ==========================================
// BILLING ELEMENTS
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
// DAY 24 - HIGH CONTRAST ELEMENTS
// ==========================================

const highContrastToggle =
    document.getElementById("high-contrast-toggle");

const contrastStatus =
    document.getElementById("contrast-status");


// ==========================================
// DAY 25 - FONT SIZE ELEMENTS
// ==========================================

const fontNormalButton =
    document.getElementById("font-normal");

const fontLargeButton =
    document.getElementById("font-large");

const fontExtraLargeButton =
    document.getElementById("font-extra-large");

const fontSizeStatus =
    document.getElementById("font-size-status");


// ==========================================
// DAY 26 - KEYBOARD ELEMENTS
// ==========================================

const mainContent =
    document.getElementById("main-content");

const keyboardStatus =
    document.getElementById("keyboard-status");


// ==========================================
// DAY 27 - DARK MODE ELEMENTS
// ==========================================

const darkModeToggle =
    document.getElementById("dark-mode-toggle");

const darkModeStatus =
    document.getElementById("dark-mode-status");


// ==========================================
// DISPLAY MENU
// ==========================================

menuItems.forEach(function(item) {

    const menuCard =
        document.createElement("article");

    menuCard.className =
        "menu-item";

    menuCard.innerHTML = `

        <span
            class="food-icon"
            aria-hidden="true">

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
            data-id="${item.id}"
            aria-label="Add ${item.name} to bill">

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
// ADD ITEM TO BILL
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
// UPDATE BILL
// ==========================================

function updateBill() {

    billItemsContainer.innerHTML = "";


    // ==========================================
    // EMPTY BILL
    // ==========================================

    if (billItems.length === 0) {

        billItemsContainer.innerHTML = `

            <div class="empty-bill">

                <span
                    class="empty-icon"
                    aria-hidden="true">

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
    // DISPLAY BILL ITEMS
    // ==========================================

    billItems.forEach(function(item) {

        const billItem =
            document.createElement("div");

        billItem.className =
            "bill-item";


        billItem.innerHTML = `

            <div class="bill-item-info">

                <span
                    class="bill-item-icon"
                    aria-hidden="true">

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


                <span
                    class="quantity"
                    aria-label="${item.name} quantity">

                    ${item.quantity}

                </span>


                <button
                    type="button"
                    class="quantity-button increase-button"
                    data-id="${item.id}"
                    aria-label="Increase ${item.name} quantity">

                    +

                </button>


                <strong
                    aria-label="${item.name} total price">

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
    // ITEM COUNT
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
    // SUBTOTAL
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
    // TAX
    // ==========================================

    const taxRate = 0.05;

    const tax =
        subtotal * taxRate;


    taxElement.textContent =
        `₹${tax.toFixed(2)}`;


    // ==========================================
    // TOTAL
    // ==========================================

    const total =
        subtotal + tax;


    totalElement.textContent =
        `₹${total.toFixed(2)}`;


    // ==========================================
    // BUTTON STATES
    // ==========================================

    clearButton.disabled =
        billItems.length === 0;

    checkoutButton.disabled =
        billItems.length === 0;


    // ==========================================
    // INCREASE QUANTITY
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
    // DECREASE QUANTITY
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
    // REMOVE ITEM
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
// CLEAR BILL
// ==========================================

clearButton.addEventListener(
    "click",
    function() {

        billItems = [];

        updateBill();

        keyboardStatus.textContent =
            "Bill cleared using the keyboard.";

    }
);


// ==========================================
// BILL VALIDATION
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
// CHECKOUT
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

        keyboardStatus.textContent =
            "Checkout completed successfully.";

    }
);


// ==========================================
// DAY 24 - HIGH CONTRAST
// ==========================================

function applyHighContrast(enabled) {

    if (enabled) {

        document.body.classList.add(
            "high-contrast"
        );

        highContrastToggle.textContent =
            "High Contrast: ON";

        highContrastToggle.setAttribute(
            "aria-pressed",
            "true"
        );

        contrastStatus.textContent =
            "High contrast mode is currently on.";

    }

    else {

        document.body.classList.remove(
            "high-contrast"
        );

        highContrastToggle.textContent =
            "High Contrast: OFF";

        highContrastToggle.setAttribute(
            "aria-pressed",
            "false"
        );

        contrastStatus.textContent =
            "High contrast mode is currently off.";

    }

}


const savedContrast =
    localStorage.getItem("tqmHighContrast");


if (savedContrast === "true") {

    applyHighContrast(true);

}


highContrastToggle.addEventListener(
    "click",
    function() {

        const enabled =
            document.body.classList.contains(
                "high-contrast"
            );


        applyHighContrast(!enabled);


        localStorage.setItem(
            "tqmHighContrast",
            String(!enabled)
        );

    }
);


// ==========================================
// DAY 25 - FONT SIZE
// ==========================================

function applyFontSize(size) {

    document.body.classList.remove(
        "font-large",
        "font-extra-large"
    );


    if (size === "large") {

        document.body.classList.add(
            "font-large"
        );

        fontSizeStatus.textContent =
            "Large font size is currently selected.";

    }

    else if (size === "extra-large") {

        document.body.classList.add(
            "font-extra-large"
        );

        fontSizeStatus.textContent =
            "Extra Large font size is currently selected.";

    }

    else {

        fontSizeStatus.textContent =
            "Normal font size is currently selected.";

    }


    updateFontSizeControls(size);


    localStorage.setItem(
        "tqmFontSize",
        size
    );

}


function updateFontSizeControls(size) {

    fontNormalButton.classList.remove("active");

    fontLargeButton.classList.remove("active");

    fontExtraLargeButton.classList.remove("active");


    fontNormalButton.setAttribute(
        "aria-pressed",
        "false"
    );

    fontLargeButton.setAttribute(
        "aria-pressed",
        "false"
    );

    fontExtraLargeButton.setAttribute(
        "aria-pressed",
        "false"
    );


    if (size === "large") {

        fontLargeButton.classList.add("active");

        fontLargeButton.setAttribute(
            "aria-pressed",
            "true"
        );

    }

    else if (size === "extra-large") {

        fontExtraLargeButton.classList.add(
            "active"
        );

        fontExtraLargeButton.setAttribute(
            "aria-pressed",
            "true"
        );

    }

    else {

        fontNormalButton.classList.add("active");

        fontNormalButton.setAttribute(
            "aria-pressed",
            "true"
        );

    }

}


fontNormalButton.addEventListener(
    "click",
    function() {

        applyFontSize("normal");

    }
);


fontLargeButton.addEventListener(
    "click",
    function() {

        applyFontSize("large");

    }
);


fontExtraLargeButton.addEventListener(
    "click",
    function() {

        applyFontSize("extra-large");

    }
);


const savedFontSize =
    localStorage.getItem("tqmFontSize");


if (
    savedFontSize === "large" ||
    savedFontSize === "extra-large"
) {

    applyFontSize(savedFontSize);

}

else {

    applyFontSize("normal");

}


// ==========================================
// DAY 27 - DARK MODE
// ==========================================

function applyDarkMode(enabled) {

    // If the button does not exist yet,
    // simply do nothing.
    if (!darkModeToggle) {
        return;
    }


    if (enabled) {

        document.body.classList.add(
            "dark-mode"
        );

        darkModeToggle.textContent =
            "Dark Mode: ON";

        darkModeToggle.setAttribute(
            "aria-pressed",
            "true"
        );


        if (darkModeStatus) {

            darkModeStatus.textContent =
                "Dark mode is currently on.";

        }

    }

    else {

        document.body.classList.remove(
            "dark-mode"
        );

        darkModeToggle.textContent =
            "Dark Mode: OFF";

        darkModeToggle.setAttribute(
            "aria-pressed",
            "false"
        );


        if (darkModeStatus) {

            darkModeStatus.textContent =
                "Dark mode is currently off.";

        }

    }

}


const savedDarkMode =
    localStorage.getItem("tqmDarkMode");


if (savedDarkMode === "true") {

    applyDarkMode(true);

}

else {

    applyDarkMode(false);

}


if (darkModeToggle) {

    darkModeToggle.addEventListener(
        "click",
        function() {

            const enabled =
                document.body.classList.contains(
                    "dark-mode"
                );


            applyDarkMode(!enabled);


            localStorage.setItem(
                "tqmDarkMode",
                String(!enabled)
            );


            if (keyboardStatus) {

                keyboardStatus.textContent =
                    !enabled
                        ? "Dark mode enabled."
                        : "Dark mode disabled.";

            }

        }
    );

}


// ==========================================
// DAY 26 - KEYBOARD NAVIGATION
// ==========================================


// Focus main content with keyboard

mainContent.addEventListener(
    "focus",
    function() {

        keyboardStatus.textContent =
            "Main content is focused.";

    }
);


// ==========================================
// ESCAPE KEY
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            mainContent.focus();

            keyboardStatus.textContent =
                "Focus returned to main content.";

        }

    }
);


// ==========================================
// TRACK KEYBOARD NAVIGATION
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Tab") {

            keyboardStatus.textContent =
                "Keyboard navigation is active.";

        }

    }
);


// ==========================================
// ENTER AND SPACE FEEDBACK
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            if (
                document.activeElement &&
                document.activeElement.tagName === "BUTTON"
            ) {

                keyboardStatus.textContent =
                    "Keyboard button activation detected.";

            }

        }

    }
);


// ==========================================
// INITIAL BILL UPDATE
// ==========================================

updateBill();


// ==========================================
// INITIAL KEYBOARD STATUS
// ==========================================

keyboardStatus.textContent =
    "Keyboard navigation is available.";