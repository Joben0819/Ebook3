# import sys
from fastapi import Depends, FastAPI, Header, Request
from pymongo import MongoClient
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from pathlib import Path
import os
import random
from fastapi.middleware.cors import CORSMiddleware
import jwt

SECRET_KEY = "4"

def create_token(data: dict, secret:str, expires_delta: int):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, secret, algorithm="HS256")
    return encoded_jwt

def decode_token(token: str, secret:str):
    try:
        payload = jwt.decode(token, secret, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return {"error": "Token has expired"}
    except jwt.DecodeError:
        return {"error": "Invalid token"}

user_data = {"sub": "Joben"}
token = create_token(user_data, secret="3", expires_delta=3600)  
decoded_token = decode_token(token, secret="3")
# print(decoded_token, 'ss')

def print_and_increment():
    if not hasattr(print_and_increment, 'counter'):
        print_and_increment.counter = 1
    else:
        print_and_increment.counter += 1

    return print_and_increment.counter

# print_and_increment() 


app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

client = MongoClient("mongodb+srv://Joben:Anne060123@joben.a1aoz0g.mongodb.net/?retryWrites=true&w=majority")
db = client["Users"] 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
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

class Register(BaseModel):
    name: str
    password: str
    id: int
class Login(BaseModel):
    name: str
    password: str
class FolderInput(BaseModel):
    id: int
    title: str
    base64img: str
    status: bool
class TextFileInput(BaseModel):
    file_name: str  
    text_content: str  
    Book: str  
class Contents(BaseModel):
    num: str
    Book: str
    
class Process(BaseModel):
    id: int
    book: str
class Addbook(BaseModel):
    id: int
    book: str
    name: str
    
class AddbookData(BaseModel):
    name: str
    id: int
    
@app.post("/register/")
async def create_item(data: Register):
    key = f'{print_and_increment()}'
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
        error_message = "null"
        return JSONResponse(content={"message": error_message}, status_code=200)
    
    elif(data2 == [] and data3 == []):
        collection.insert_one(data.dict())
        response = JSONResponse(content={"message": "success"}, status_code=200)
        response.set_cookie(key="key", value="1") 
        user_data = {"sub": name}
        token = create_token(user_data, secret=key, expires_delta=3600)
        collection.update_one(
        {"name": name},
        {"$set": {"token": token}}
        )
        return response
    
    return JSONResponse(content={"message": "already have existed Password or Username"}, status_code=200)   
  
@app.post("/login")
async def create_item(data: Login, request: Request,):
    random_float = F'{random.randint(1, 100)}'
    number100 = random_float
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
        error_message = "null"
        return JSONResponse(content={"data": error_message}, status_code=200)
    
    elif data2:
        data3 = JSONResponse(data2)
        data3.set_cookie(key="key", value=number100)  
        user_data = {"sub": name}
        token = create_token(user_data, number100, expires_delta=3600)
        token2 = decode_token(token, number100)
        collection.update_one(
        {"name": name},
        {"$set": {"token": token, "token2": random_float, 'token3': number100, 'response': token2}} 
        )
        

    return data2

@app.get("/get_data/")
async def get_data():
    collection = db["Ebooks"]
    data = list(collection.find({}))
    for item in data:
        item["_id"] = str(item["_id"])  
    data2 = JSONResponse(data)
    return data2

@app.get("/example/")
async def read_user_agent(request: Request, token: str = Header(None)):
    user_id = request.cookies.get("key")
    user_info = decode_token(token , user_id)
    random_float = random.randint(1, 100)
    return {"token": random_float, "id": user_id , "secret": SECRET_KEY, 'result': user_info}

# @app.get("/set-cookie/")
# async def set_cookie(request: Request):
#     random_float = F'{random.randint(1, 100)}'
#     user_id = f'{request.cookies.get("key")}'
#     response2 = JSONResponse(content={"message": user_id})
#     response2.set_cookie(key="key", value=random_float)  
#     return response2

@app.post("/get_user_data/")
async def get_data(data):
    collection = db["Users"]

    for item in data:
        item["_id"] = str(item["_id"])  
    return data

@app.post("/Added_books/")
async def get_data(data: AddbookData):
    collection = db["Addbook"]
    name = data.name
    if name is None or name == "":
        return {"data": "None"}
    else:
        data2 = list(collection.find({"id": data.id}))
        for item in data2:
            item["_id"] = str(item["_id"])  
        return data2

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
    existing_data = collection.find_one({"chapter": file_name})
    if existing_user is None:
        return { "status": False, "Message": "Wrong Data"}
    
    if existing_data:
        return{"message": "Already had a chapter title"}
    
    try:
        with open(file_path, "w") as file:
            file.write(text_content)
            collection.update_one(
            {"title": Book_store},
            {"$push": {"chapter": file_name}}
            )

        return {"status": True}
    except Exception as e:
        with open(file_path, "w", encoding="utf-8") as file:
            file.write(text_content)
            collection.update_one(
            {"title": Book_store},
            {"$push": {"chapter": file_name}}
            )
            
        return {"status": True}
    # return directory_path

@app.post("/read_file/")
def read_root(data: Contents):
    num = data.num
    book = data.Book
    file_path = f"./Ebooks/{book}/{num}"

    if not os.path.exists(file_path):
        return {"error": "File not found"}

    try:
        with open(file_path, "r", encoding="utf-8") as file:
            file_content = file.read()


        return {"message": file_content}
    except Exception as e:  
        with open(file_path, "r") as file:
            file_content = file.read()


        return {"message": file_content}
    
@app.post("/add_book/")
async def read_root(data: Addbook):
    collection = db.get_collection("Addbook")
    collection2 = db.get_collection("Ebooks")
    existing_user = collection.find_one({"id": data.id})
    existing_data = list(collection.find({"Books.book": data.book, "id": data.id}))   
    for item in existing_data:
        item["_id"] = str(item["_id"])  
    if existing_user is None:
        collection.insert_one({"id": data.id, "name": data.name,"Books": [{"book": data.book, "onread": False, "Done": False }]})
        return{"detail": "Added"}  
       
    elif existing_data:
        return{ "detail":"has added already"}
    
    elif existing_data == []:
        collection.update_one(
        {"id": data.id},
        {"$push": {"Books": {"book": data.book, "onread": False, "Done": False }}}
        )
        collection2.update_one(
            {"title": data.book},
            {"$set": {"status": True}}
        )
        return { "detail":"Already Added"}
    
    # collection.insert_one({"id": data.id, "name": data.name,"Books": {"book": data.book, "onread": False, "Done": False }})

    # collection2.update_one(
    #     {"title": data.book},
    #     {"$set": {"status": True}}
    # )
    # id = data.id
    # name = data.name
    # book = data.book
    # collection = db.get_collection("Addbook")
    # data3 = list(collection.find({ "id": id}))
    # existing_data = collection.find_one({"Books.book": book})
    # # data2 = list(collection.find({"name": name, "password": password}))
    # for item in data3:
    #     item["_id"] = str(item["_id"]) 
        
    # if(name == ""  ):
    #     error_message = "null"
    #     return JSONResponse(content={"message": error_message}, status_code=200)
    
    # elif( data3 == []):
    #     collection.insert_one({"id": id, "name": name,"Books": {"book": book, "onread": False, "Done": False }})
    #     response = JSONResponse(content={"message": "Added"}, status_code=200)
    #     return response
    
    # elif existing_data:
    #     response = JSONResponse(content={"message": "Already Added"}, status_code=200)
    #     return data3
    
    # elif data3:
    #     collection.update_one(
    #     {"id": id},
    #     {"$push": {"Books": {"book": book, "onread": False, "Done": False }}}
    #     )
    #     response = JSONResponse(content={"message": "Addition"}, status_code=200)
    #     return response
    
    # return JSONResponse(content={"message": "already have existed Password or Username"}, status_code=200)   

@app.post("/remove_book/")
async def read_root(data: Addbook):
    collection = db.get_collection("Addbook")
    collection2 = db.get_collection("Ebooks")
    existing_user = collection.find_one({"id": data.id})
    # favorite = collection2.find_one({"title": data.book})
    if existing_user is None:
        raise JSONResponse(status_code=404, detail="User not found")
    
    collection.update_one(
        {"id": data.id},
        {"$pull": {"Books": {"book": data.book}}}
    )
    collection2.update_one(
        {"title": data.book},
        {"$set": {"status": False}}
    )

@app.post("/mark_as_done/")
async def read_root(data: Process):
    id = data.id
    book = data.book
    collection = db.get_collection("Addbook")
    # existing_data = collection.find_one({"Books.book": book})
    existing_book = list(collection.find({"Books.book": data.book, "id": data.id}))   
    for item in existing_book:
        item["_id"] = str(item["_id"])  
        
    if existing_book:
        collection.update_one(
            {"id": id, "Books.book": book},
            {"$set": {"Books.$.Done": True}}
        )
        return {"detail": "Done"}

@app.post("/mark_as_onread/")
async def read_root(data: Process):
    id = data.id
    book = data.book
    collection = db.get_collection("Addbook")
    # existing_data = collection.find_one({"Books.book": book})
    existing_book = list(collection.find({"Books.book": data.book, "id": data.id}))   
    for item in existing_book:
        item["_id"] = str(item["_id"])  
        
    if existing_book:
        collection.update_one(
            {"id": id, "Books.book": book},
            {"$set": {"Books.$.onread": True}}
        )
        return {"detail": "onread"}
    
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