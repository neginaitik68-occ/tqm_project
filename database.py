import sqlite3

conn = sqlite3.connect("restaurant.db")
cursor = conn.cursor()

# Orders
cursor.execute("""
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    table_no INTEGER NOT NULL,
    food_item TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    status TEXT DEFAULT 'Pending'
)
""")

# Bills
cursor.execute("""
CREATE TABLE IF NOT EXISTS bills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    total_amount REAL NOT NULL,
    bill_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

# Feedback
cursor.execute("""
CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    rating INTEGER,
    comments TEXT
)
""")

# Waiters
cursor.execute("""
CREATE TABLE IF NOT EXISTS waiters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    waiter_name TEXT NOT NULL,
    table_no INTEGER NOT NULL,
    customer_name TEXT NOT NULL,
    order_status TEXT DEFAULT 'Pending'
)
""")

conn.commit()
conn.close()

print("Database Created Successfully")