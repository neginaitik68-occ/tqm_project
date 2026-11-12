import sqlite3

conn = sqlite3.connect("restaurant.db")
cursor = conn.cursor()

cursor.execute("SELECT * FROM bills")

rows = cursor.fetchall()

for row in rows:
    print(row)

conn.close()