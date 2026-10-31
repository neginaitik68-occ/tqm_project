from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def dashboard():
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


@app.route("/quality-evaluation")
def quality_evaluation():
    return render_template("quality-evaluation.html")


@app.route("/accessibility-testing")
def accessibility_testing():
    return render_template("accessibility_testing.html")


@app.route("/requirements")
def requirements():
    return render_template("requirements.html")


@app.route("/quality-mapping")
def quality_mapping():
    return render_template("quality_mapping.html")


if __name__ == "__main__":
    app.run(debug=True)