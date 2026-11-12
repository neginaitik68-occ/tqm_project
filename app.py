from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)

# -----------------------
# Dashboard
# -----------------------

@app.route("/")
def dashboard():
    return render_template("index.html")


# -----------------------
# Orders Module
# -----------------------

@app.route("/orders")
def orders():

    conn = sqlite3.connect("restaurant.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM orders")
    all_orders = cursor.fetchall()

    conn.close()

    return render_template(
        "orders.html",
        orders=all_orders
    )


@app.route("/add_order", methods=["POST"])
def add_order():

    customer_name = request.form["customer_name"]
    table_no = request.form["table_no"]
    food_item = request.form["food_item"]
    quantity = request.form["quantity"]

    conn = sqlite3.connect("restaurant.db")
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO orders
        (customer_name, table_no, food_item, quantity)
        VALUES (?, ?, ?, ?)
    """, (
        customer_name,
        table_no,
        food_item,
        quantity
    ))

    conn.commit()
    conn.close()

    return redirect("/orders")


# -----------------------
# Billing Module
# -----------------------

@app.route("/billing")
def billing():

    return render_template(
        "billing.html",
        total=None,
        customer=None
    )


@app.route("/generate_bill", methods=["POST"])
def generate_bill():

    customer_name = request.form["customer_name"]

    burger_qty = int(request.form["burger"])
    pizza_qty = int(request.form["pizza"])
    pasta_qty = int(request.form["pasta"])
    fries_qty = int(request.form["fries"])

    total = (
        burger_qty * 200 +
        pizza_qty * 350 +
        pasta_qty * 250 +
        fries_qty * 150
    )

    conn = sqlite3.connect("restaurant.db")
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO bills
        (customer_name, total_amount)
        VALUES (?, ?)
    """, (
        customer_name,
        total
    ))

    conn.commit()
    conn.close()

    return render_template(
        "billing.html",
        total=total,
        customer=customer_name
    )


# -----------------------
# Feedback Module
# -----------------------

@app.route("/feedback")
def feedback():
    return render_template("feedback.html")


# -----------------------
# Accessibility Module
# -----------------------

@app.route("/accessibility")
def accessibility():
    return render_template("accessibility.html")


# -----------------------
# Analytics Module
# -----------------------

@app.route("/analytics")
def analytics():
    return render_template("analytics.html")


# -----------------------
# Waiter Module
# -----------------------

@app.route("/waiter")
def waiter():
    return render_template("waiter.html")


# -----------------------
# Run Application
# -----------------------

if __name__ == "__main__":
    app.run(debug=True)