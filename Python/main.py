# import sys
from fastapi import FastAPI
from pymongo import MongoClient
from fastapi.responses import JSONResponse
app = FastAPI()



client = MongoClient("mongodb+srv://Joben:Anne060123@joben.a1aoz0g.mongodb.net/?retryWrites=true&w=majority")
db = client["Users"] 

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

@app.get("/data")
def read_root():
    return {"message": "Hello"}

@app.post("/data/1")
def read_root():
    return {"message": "part1"}

@app.post("/add_data/")
async def add_data(data: dict):
    name = data.get("name")
    date = data["date"]
    collection = db.get_collection("Users")
    if(name == "" or date == "" ):
        error_message = "Unauthorized access"
        return JSONResponse(content={"error": error_message}, status_code=401)
    # collection.insert_one(data)
    for item in data:
        item["name"] = item["name"]
    return name

@app.post("/get_data/")
async def get_data():
    # Get the collection (assuming "Users" is your collection name)
    collection = db["Users"]

    # Query the collection and convert ObjectId to string
    data = list(collection.find({}))
    # for item in data:
    #     item["_id"] = str(item["_id"])  # Convert ObjectId to string

    names = [item["name"] for item in data]
    return names

# a = 10
# b = 11

# if (a > b):
#     print('log1')
# else :
#     print('log2')
# def greet(name):
#     return f"Hello, {name}!"

# if __name__ == "__main__":
    # name = sys.argv[1]
    # greeting = greet(name)
# print('Hello Worla')