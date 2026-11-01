import sqlite3

conn = sqlite3.connect("restaurant.db")

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS orders(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    table_no INTEGER,
    food_item TEXT,
    quantity INTEGER,
    status TEXT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS bills(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    amount REAL,
    bill_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS feedback(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    rating INTEGER,
    comments TEXT,
    feedback_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS waiters(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    waiter_name TEXT,
    shift TEXT,
    tables_served INTEGER DEFAULT 0
)
""")

conn.commit()

print("Database created successfully")

conn.close()