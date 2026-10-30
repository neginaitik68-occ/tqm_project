from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/orders")
def orders():
    return render_template("orders.html")

@app.route("/billing")
def billing():
    return render_template("billing.html")

@app.route("/reports")
def reports():
    return render_template("reports.html")

@app.route("/feedback")
def feedback():
    return render_template("feedback.html")

if __name__ == "__main__":
    app.run(debug=True)