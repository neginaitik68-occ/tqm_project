from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)


@app.route("/")
def dashboard():
    return render_template("index.html")


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


if __name__ == "__main__":
    app.run(debug=True)