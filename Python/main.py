# import sys
from fastapi import FastAPI
from pymongo import MongoClient
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from pathlib import Path
import os
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
client = MongoClient("mongodb+srv://Joben:Anne060123@joben.a1aoz0g.mongodb.net/?retryWrites=true&w=majority")
db = client["Users"] 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3002"],  # Replace with the actual origin of your frontend application
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

@app.post("/data/1")
def read_root():
    return {"message": "part1"}

class ItemCreate(BaseModel):
    name: str
    password: str
class FolderInput(BaseModel):
    title: str
    base64img: str
class TextFileInput(BaseModel):
    file_name: str  
    text_content: str  
    Book: str  
class Contents(BaseModel):
    num: int
    Book: str
    
@app.post("/register/")
async def create_item(data: ItemCreate):
    name = data.name
    password = data.password
    collection = db.get_collection("Users")
    data2 = list(collection.find({"password": password}))
    data3 = list(collection.find({ "name": name}))
    # names = [item["name"] for item in data2]
    for item in data2:
        item["_id"] = str(item["_id"])  
        
    for item in data3:
        item["_id"] = str(item["_id"]) 
        
    if(name == "" or password == "" ):
        error_message = "Missing data"
        return JSONResponse(content={"message": error_message}, status_code=401)
    
    elif(data2 == [] and data3 == []):
        collection.insert_one(data.dict())
        return JSONResponse(content={"message": "success"}, status_code=200)
    
    return JSONResponse(content={"message": "already have existed Password or Username"}, status_code=200)   
  
@app.post("/login")
async def create_item(data: ItemCreate):
    collection = db["Users"]
    password = data.password
    name = data.name
    data2 = list(collection.find({"name": name, "password": password}))
    for item in data2:
        item["_id"] = str(item["_id"])  
    if(name == "" or password == "" ):
        error_message = "Missing data"
        return JSONResponse(content={"message": error_message}, status_code=401)
    elif(data2 == []):
        error_message = "No data"
        return JSONResponse(content={"data": error_message}, status_code=401)

    return data2

@app.get("/get_data/")
async def get_data():
    collection = db["Ebooks"]
    data = list(collection.find({}))
    for item in data:
        item["_id"] = str(item["_id"])  
    return data



@app.post("/create_folder/")
async def create_folder(folder_name: FolderInput):
    new_folder_path = f"./Ebooks/{folder_name.title}"
    collection = db.get_collection("Ebooks")
    new_directory = Path(new_folder_path)
    new_directory.mkdir(parents=True, exist_ok=True)

    if new_directory.exists():
        collection.insert_one(folder_name.dict())
        return {"message": f"Folder '{folder_name.title}' created successfully."}
    
    else:
        return {"message": f"Folder '{folder_name.title}' already exists."}
    
    # return folder_name.title

@app.post("/create_text_file/")
async def create_text_file(text_data: TextFileInput):
    file_name = text_data.file_name
    text_content = text_data.text_content
    Book_store = text_data.Book
    
    directory_path = f"./Ebooks/{Book_store}"  

    new_directory = Path(directory_path)
    new_directory.mkdir(parents=True, exist_ok=True)
    collection = db.get_collection("Ebooks")
    file_path = new_directory / file_name
    existing_user = collection.find_one({"title": Book_store})
    if existing_user is None:
        raise JSONResponse(status_code=404, detail="User not found")

    try:
        with open(file_path, "w") as file:
            file.write(text_content)
            collection.update_one(
            {"$push": {"chapter": file_name}}
    )

        return {"message": f"File '{file_name}' created and content written successfully."}
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}
    # return directory_path

@app.post("/read_file/")
def read_root(data: Contents):
    num = data.num
    book = data.Book
    file_path = f"./Ebooks/{book}/{num}"

    # Check if the file exists
    if not os.path.exists(file_path):
        return {"error": "File not found"}

    # Read the content of the file
    with open(file_path, "r") as file:
        file_content = file.read()

    return {"message": file_content}


class Process(BaseModel):
    user_id: str
    book: str

@app.post("/add_to_read/")
async def read_root(data: Process):
    # Find the user document by user_id
    collection = db.get_collection("Ebooks")
    existing_user = collection.find_one({"title": data.book})
    if existing_user is None:
        raise JSONResponse(status_code=404, detail="User not found")

    # Add the book to the "read" list
    collection.update_one(
        {"title": data.book},
        {"$push": {"read": {"book": data.book}}}
    )

    return {"message": f"Book '{data.book}' added to 'read' list successfully"}

# @app.get("/user_lists/")
# async def get_user_lists(data: Process):
#     collection = db.get_collection("Ebooks")
#     existing_user = collection.find_one({"title": data.book})
#     # if existing_user is None:
#     #     raise JSONResponse(status_code=404, detail="User not found")

#     return existing_user

# users_progress = []

# @app.post("/mark_as_done/")
# async def mark_as_done(data: Process):
#     user_id = data.user_id
#     book = data.book

#     # Check if the user already exists in the list
#     user_exists = False
#     for user in users_progress:
#         if user["user_id"] == user_id:
#             user_exists = True
#             if book not in user["Done"]:
#                 user["Done"].append(book)
#             break

#     # If the user does not exist, create a new entry
#     if not user_exists:
#         new_user = {
#             "user_id": user_id,
#             "Done": [book],
#         }
#         users_progress.append(new_user)

#     return {"message": f"Book '{book}' marked as done successfully for user {user_id}"}
@app.post("/mark_as_done/")
async def read_root(data: Process):
    user_id = data.user_id
    book = data.book
    collection = db.get_collection("Ebooks")

    # Check if the user already exists in the collection
    existing_user = collection.find_one({"title": book})
    if existing_user is None:
        raise JSONResponse(status_code=404, detail="User not found")

    # Add the book to the "read" list
    collection.update_one(
        {"title": book},
        {"$push": {"Done": {"book": book}}}
    )
    collection.update_one(
        {"title": book},
        {"$pull": {"onread": {"book": book}}}
    )

    return {"message": f"Book '{book}' marked as done successfully for user {user_id}"}


@app.post("/mark_as_onread/")
async def read_root(data: Process):
    user_id = data.user_id
    book = data.book
    collection = db.get_collection("Ebooks")

    # Check if the user already exists in the collection
    existing_user = collection.find_one({"title": book})
    if existing_user is None:
        raise JSONResponse(status_code=404, detail="User not found")

    # Add the book to the "read" list
    collection.update_one(
        {"title": book},
        {"$push": {"onread": {"book": book}}}
    )
    collection.update_one(
        {"title": book},
        {"$pull": {"read": {"book": book}}}
    )

    return {"message": f"Book '{book}' marked as done successfully for user {user_id}"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    

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