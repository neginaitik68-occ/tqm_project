import sqlite3

conn = sqlite3.connect("restaurant.db")
cursor = conn.cursor()

cursor.execute("PRAGMA table_info(bills)")

for row in cursor.fetchall():
    print(row)

conn.close()