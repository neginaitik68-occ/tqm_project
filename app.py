# TQM RMS - Restaurant Billing System | Flask App
# Run: python app.py  -> open http://127.0.0.1:5000
from flask import Flask, render_template, request, jsonify
import database as db

app = Flask(__name__)

@app.route("/")
def dashboard():
    return render_template("index.html", stats=db.get_stats(), orders=db.get_orders(limit=5))

@app.route("/orders")
def orders():
    return render_template("orders.html", menu=db.get_menu(), orders=db.get_orders())

@app.route("/billing")
def billing():
    return render_template("billing.html", orders=db.get_orders(), bills=db.get_bills())

@app.route("/waiter")
def waiter():
    return render_template("waiter.html", waiters=db.get_waiters())

@app.route("/analytics")
def analytics():
    return render_template("analytics.html", analytics=db.get_analytics())

@app.route("/feedback")
def feedback():
    return render_template("feedback.html", feedbacks=db.get_feedbacks(), avg=db.get_avg_rating())

@app.route("/accessibility")
def accessibility():
    return render_template("accessibility.html")

# --- API used by JS ---
@app.route("/api/place_order", methods=["POST"])
def place_order():
    d = request.json
    order = db.add_order(d.get("customer","Guest"), d.get("items",""), d.get("amount",0), d.get("table",1))
    return jsonify({"ok": True, "order": order})

@app.route("/api/generate_bill", methods=["POST"])
def generate_bill():
    d = request.json
    bill = db.add_bill(d.get("order_id"), d.get("customer","Guest"), d.get("total",0))
    return jsonify({"ok": True, "bill": bill})

@app.route("/api/feedback", methods=["POST"])
def add_feedback():
    d = request.json
    f = db.add_feedback(d.get("name","Guest"), d.get("order_id",0), d.get("rating",5), d.get("comment",""))
    return jsonify({"ok": True, "feedback": f, "avg": db.get_avg_rating()})

@app.route("/api/update_status", methods=["POST"])
def update_status():
    d = request.json
    db.update_order_status(d.get("id"), d.get("status"))
    return jsonify({"ok": True})

if __name__ == "__main__":
    db.init_db()
    app.run(debug=True)
