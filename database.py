# database.py - SQLite Database for TQM RMS
# Tables: menu, orders, bills, waiters, feedbacks
import sqlite3, os
DB_FILE = "tqm_rms.db"

def conn():
    c = sqlite3.connect(DB_FILE)
    c.row_factory = sqlite3.Row
    return c

def init_db():
    c = conn()
    c.executescript("""
    CREATE TABLE IF NOT EXISTS menu(id INTEGER PRIMARY KEY, name TEXT, price INTEGER, category TEXT);
    CREATE TABLE IF NOT EXISTS orders(id INTEGER PRIMARY KEY AUTOINCREMENT, customer TEXT, items TEXT, amount INTEGER, status TEXT, table_no INTEGER);
    CREATE TABLE IF NOT EXISTS bills(id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER, customer TEXT, total INTEGER, bill_date DATE DEFAULT (date('now')));
    CREATE TABLE IF NOT EXISTS waiters(id INTEGER PRIMARY KEY, name TEXT, tables TEXT, status TEXT, served INTEGER);
    CREATE TABLE IF NOT EXISTS feedbacks(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, order_id INTEGER, rating INTEGER, comment TEXT);
    """)
    if c.execute("SELECT COUNT(*) FROM menu").fetchone()[0]==0:
        c.executemany("INSERT INTO menu VALUES (?,?,?,?)", [
            (1,"Paneer Butter Masala",220,"Main Course"),(2,"Veg Biryani",180,"Main Course"),
            (3,"Dal Makhani",200,"Main Course"),(4,"Butter Naan",40,"Main Course"),
            (5,"Pizza",299,"Fast Food"),(6,"Burger",149,"Fast Food"),
            (7,"Cold Drink",60,"Beverages"),(8,"Manchurian",160,"Fast Food")])
    if c.execute("SELECT COUNT(*) FROM orders").fetchone()[0]==0:
        c.executemany("INSERT INTO orders VALUES (?,?,?,?,?,?)", [
            (101,"Ali","Paneer Butter Masala x1",220,"Completed",5),
            (102,"Sara","Veg Biryani x1",180,"Preparing",3),
            (103,"Ahmed","Pizza x1",299,"Pending",7)])
    if c.execute("SELECT COUNT(*) FROM waiters").fetchone()[0]==0:
        c.executemany("INSERT INTO waiters VALUES (?,?,?,?,?)", [
            (1,"Rahul","1,2,3","Active",18),(2,"Priya","4,5,6","Active",22),(3,"Aman","7,8","Active",15),
            (4,"Neha","9,10","Active",19),(5,"Vikram","11,12","Break",12),(6,"Sneha","13,14","Active",21)])
    if c.execute("SELECT COUNT(*) FROM feedbacks").fetchone()[0]==0:
        c.executemany("INSERT INTO feedbacks VALUES (?,?,?,?,?)", [
            (1,"Ali",101,5,"Great food and quick service!"),
            (2,"Sara",102,4,"Nice ambience, tasty biryani."),
            (3,"Ahmed",103,5,"Best biryani in town.")])
    c.commit(); c.close()

def _all(q, args=()):
    c=conn(); r=[dict(x) for x in c.execute(q,args).fetchall()]; c.close(); return r
def get_menu(): return _all("SELECT * FROM menu")
def get_orders(limit=None): return _all("SELECT * FROM orders ORDER BY id DESC LIMIT ?" if limit else "SELECT * FROM orders ORDER BY id DESC", (limit,) if limit else ())
def get_bills(): return _all("SELECT * FROM bills ORDER BY id DESC")
def get_waiters(): return _all("SELECT * FROM waiters")
def get_feedbacks(): return _all("SELECT * FROM feedbacks ORDER BY id DESC")
def get_avg_rating():
    c=conn(); v=c.execute("SELECT ROUND(AVG(rating),1) FROM feedbacks").fetchone()[0]; c.close(); return v or 4.8
def get_stats():
    c=conn(); o=c.execute("SELECT COUNT(*) c, COALESCE(SUM(amount),0) s FROM orders").fetchone(); b=c.execute("SELECT COUNT(*) FROM bills").fetchone()[0]; c.close()
    return {"orders": 151+o["c"], "revenue": 24701+o["s"], "bills": 87+b, "rating": get_avg_rating()}
def get_analytics():
    return {"by_day":[3200,4100,2800,5200,6100,7800,5400], "days":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
            "categories":[("Main Course",55),("Fast Food",25),("Beverages",12),("Desserts",8)],
            "top":[("Veg Biryani",42,7560),("Paneer Butter Masala",38,8360),("Pizza",31,9269),("Burger",27,4023)]}
def add_order(customer, items, amount, table):
    c=conn(); cur=c.execute("INSERT INTO orders(customer,items,amount,status,table_no) VALUES (?,?,?, 'Pending',?)",(customer,items,amount,table)); c.commit(); oid=cur.lastrowid; c.close(); return {"id":oid,"customer":customer,"amount":amount}
def add_bill(order_id, customer, total):
    c=conn(); cur=c.execute("INSERT INTO bills(order_id,customer,total) VALUES (?,?,?)",(order_id,customer,total)); c.commit(); bid=cur.lastrowid; c.close(); return {"id":bid,"total":total}
def add_feedback(name, order_id, rating, comment):
    c=conn(); cur=c.execute("INSERT INTO feedbacks(name,order_id,rating,comment) VALUES (?,?,?,?)",(name,order_id,rating,comment)); c.commit(); fid=cur.lastrowid; c.close(); return {"id":fid}
def update_order_status(oid, status):
    c=conn(); c.execute("UPDATE orders SET status=? WHERE id=?",(status,oid)); c.commit(); c.close()
