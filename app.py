from flask import Flask, jsonify, request, send_from_directory
from database import get_connection, initialize_database


app = Flask(__name__, static_folder=".", static_url_path="")

# Create database and tables when application starts
initialize_database()


@app.route("/")
def home():
    return send_from_directory(".", "index.html")


@app.route("/<path:filename>")
def serve_frontend(filename):
    return send_from_directory(".", filename)


# -----------------------------
# CUSTOMER API
# -----------------------------

@app.route("/api/customers", methods=["GET"])
def get_customers():
    connection = get_connection()

    customers = connection.execute("""
        SELECT id, name, phone, email, created_at
        FROM customers
        ORDER BY id DESC
    """).fetchall()

    connection.close()

    return jsonify([dict(customer) for customer in customers])


@app.route("/api/customers", methods=["POST"])
def add_customer():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data received"}), 400

    name = data.get("name", "").strip()
    phone = data.get("phone", "").strip()
    email = data.get("email", "").strip()

    if not name:
        return jsonify({"error": "Customer name is required"}), 400

    connection = get_connection()

    cursor = connection.execute("""
        INSERT INTO customers (name, phone, email)
        VALUES (?, ?, ?)
    """, (name, phone, email))

    connection.commit()

    customer_id = cursor.lastrowid

    connection.close()

    return jsonify({
        "message": "Customer added successfully",
        "customer_id": customer_id
    }), 201


# -----------------------------
# BILL API
# -----------------------------

@app.route("/api/bills", methods=["GET"])
def get_bills():
    connection = get_connection()

    bills = connection.execute("""
        SELECT
            bills.id,
            bills.customer_id,
            customers.name AS customer_name,
            bills.subtotal,
            bills.total,
            bills.created_at
        FROM bills
        LEFT JOIN customers
            ON bills.customer_id = customers.id
        ORDER BY bills.id DESC
    """).fetchall()

    connection.close()

    return jsonify([dict(bill) for bill in bills])


@app.route("/api/bills", methods=["POST"])
def create_bill():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No bill data received"}), 400

    customer_id = data.get("customer_id")
    subtotal = data.get("subtotal", 0)
    total = data.get("total", 0)
    items = data.get("items", [])

    connection = get_connection()

    cursor = connection.execute("""
        INSERT INTO bills (customer_id, subtotal, total)
        VALUES (?, ?, ?)
    """, (customer_id, subtotal, total))

    bill_id = cursor.lastrowid

    for item in items:
        item_name = item.get("name", "Unknown Item")
        quantity = item.get("quantity", 1)
        price = item.get("price", 0)
        amount = item.get("amount", quantity * price)

        connection.execute("""
            INSERT INTO bill_items
            (bill_id, item_name, quantity, price, amount)
            VALUES (?, ?, ?, ?, ?)
        """, (
            bill_id,
            item_name,
            quantity,
            price,
            amount
        ))

    connection.commit()
    connection.close()

    return jsonify({
        "message": "Bill saved successfully",
        "bill_id": bill_id
    }), 201


# -----------------------------
# FEEDBACK API
# -----------------------------

@app.route("/api/feedback", methods=["GET"])
def get_feedback():
    connection = get_connection()

    feedback = connection.execute("""
        SELECT
            feedback.id,
            feedback.customer_id,
            customers.name AS customer_name,
            feedback.rating,
            feedback.comments,
            feedback.created_at
        FROM feedback
        LEFT JOIN customers
            ON feedback.customer_id = customers.id
        ORDER BY feedback.id DESC
    """).fetchall()

    connection.close()

    return jsonify([dict(item) for item in feedback])


@app.route("/api/feedback", methods=["POST"])
def add_feedback():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No feedback data received"}), 400

    customer_id = data.get("customer_id")
    rating = data.get("rating")
    comments = data.get("comments", "").strip()

    if rating is None:
        return jsonify({"error": "Rating is required"}), 400

    connection = get_connection()

    cursor = connection.execute("""
        INSERT INTO feedback
        (customer_id, rating, comments)
        VALUES (?, ?, ?)
    """, (
        customer_id,
        rating,
        comments
    ))

    connection.commit()

    feedback_id = cursor.lastrowid

    connection.close()

    return jsonify({
        "message": "Feedback saved successfully",
        "feedback_id": feedback_id
    }), 201


# -----------------------------
# DATABASE STATUS
# -----------------------------

@app.route("/api/status")
def database_status():
    connection = get_connection()

    customer_count = connection.execute(
        "SELECT COUNT(*) AS count FROM customers"
    ).fetchone()["count"]

    bill_count = connection.execute(
        "SELECT COUNT(*) AS count FROM bills"
    ).fetchone()["count"]

    feedback_count = connection.execute(
        "SELECT COUNT(*) AS count FROM feedback"
    ).fetchone()["count"]

    connection.close()

    return jsonify({
        "database": "SQLite",
        "status": "connected",
        "customers": customer_count,
        "bills": bill_count,
        "feedback": feedback_count
    })


if __name__ == "__main__":
    app.run(debug=True)