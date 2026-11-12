import sqlite3

conn = sqlite3.connect("restaurant.db")
cursor = conn.cursor()

# Orders Table
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

# Bills Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS bills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    total_amount REAL NOT NULL,
    bill_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

# Feedback Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    rating INTEGER,
    comments TEXT
)
""")

# Waiters Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS waiters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    waiter_name TEXT,
    shift TEXT,
    tables_served INTEGER DEFAULT 0
)
""")

conn.commit()
conn.close()

print("Database Created Successfully")