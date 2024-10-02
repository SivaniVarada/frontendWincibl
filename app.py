from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS 
import time
import json
import psutil 
import platform
import os
import sqlite3
# import uuid
from PyPDF2 import PdfReader
from pptx import Presentation
import os
from pptx.enum.shapes import MSO_SHAPE_TYPE
import tempfile
import google.generativeai as genai
from langchain_experimental.agents import create_csv_agent
# from langchain.llms import OpenAI
# from langchain.document_loaders import PDFPlumberLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
# from langchain.embeddings.openai import OpenAIEmbeddings
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
import pandas as pd
import io
import tempfile
from PIL import Image
# import pymongo
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_experimental.agents.agent_toolkits import create_csv_agent
from langchain.prompts import PromptTemplate
import requests
from bs4 import BeautifulSoup
import speech_recognition as sr
from googletrans import Translator,LANGUAGES
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash-latest")

app = Flask(__name__)
CORS(app) 


@app.route('/ppt/audio', methods=['POST'])
def load_audio():
    file = request.files['audio']
    ppt_docs = request.files.getlist('file')
    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    recognizer = sr.Recognizer()
    with sr.AudioFile(file_path) as source:
        audio_data = recognizer.record(source)
        transcription = recognizer.recognize_google(audio_data, show_all=True)

    detected_language = transcription['alternative'][0]['language']
    transcribed_text = transcription['alternative'][0]['transcript']

    if detected_language != 'en':
        translator = Translator()
        translated = translator.translate(transcribed_text, src=detected_language, dest='en')
        transcribed_text = translated.text
    if ppt_docs:
        slides_content = get_ppt_content(ppt_docs)
        raw_text = "\n".join([content[0] for content in slides_content])
        text_chunks = get_text_chunks(raw_text)
        get_vector_store(text_chunks, "faiss_index_ppt")
        response_text = user_input(transcribed_text, "faiss_index_ppt")
        slide_images = []
        for content in slides_content:
            if transcribed_text.lower() in content[0].lower():
                slide_images.extend(content[1])
        related_links = fetch_related_links(response_text.split('\n')[0])
        relevant_images = fetch_images(response_text.split('\n')[0])

        
        response = {
            "text": response_text,
            "images_from_slides": slide_images,
            "images_from_internet": relevant_images,
            "links": related_links
        }
        return jsonify(response)
    else:
        return jsonify({"error": "No PPT files uploaded."}), 400

@app.route('/api/emotion', methods=['POST'])
def submit():
    print(request.headers)  # Print request headers
    print(request.form)  # Print form data
    print(request.files)
    # Check if the request contains the video file
    if 'responses' not in request.form or 'video' not in request.files:
        return jsonify({'error': 'Missing responses or video file'}), 400

    video_file = request.files['video']
    responses = request.form['responses']
    responses = json.loads(responses)

    # Save the uploaded video file
    video_path = save_uploaded_file(video_file)

    # Wait for the video to be processed
    video_file_obj = genai.upload_file(path=video_path)
    
    while video_file_obj.state.name == "PROCESSING":
        print('Waiting for video to be processed.')
        time.sleep(10)
        video_file_obj = genai.get_file(video_file_obj.name)

    if video_file_obj.state.name == "FAILED":
        raise ValueError(video_file_obj.state.name)

    # Create the prompt based on the responses
    responses_text = "\n".join(
        [f"Q: {response['question']}\nA: {response['response']}" for response in responses]
    )
    prompt = (
    "Analyze the following video and responses carefully:\n"
    f"Video File: {video_file_obj.name}\n"
    f"Responses:\n{responses_text}\n\n"
    "After analyzing both the video and the responses, classify the mental state of the person into the following categories:\n"
    "· Academic Pressure\n"
    "· Depression\n"
    "· Anxiety\n"
    "· Eating Disorder\n"
    "· Sleep Deprivation\n"
    "· Suicidal Thoughts\n"
    "· Addiction\n"
    "· Social Pressure\n\n"
    "Please provide your analysis in percentages with necessary solutions for each category. For example:\n"
    "Academic Pressure: 47%\n reduce stree by preparing timetable to divide tasks effectively"
    "Depression: 31%\n try to interact with people so that thoughts like loneliness would reduce"
    "Suicidal Thoughts: 22%\n try interacting with people so that u wont get any sucidal thoughts"
    "give multiple solutions for each state"
    "Ensure the total sums to 100%."
    "remember u strictly have to cataegorize them ,and dont give any uneccesary data,u are only suppose to classify into those cataegories also in json formatt.and if possible try to provide solutions for each of them with in the values itself"
    
)


    # Set the model to Gemini 1.5 Flash.
    model = genai.GenerativeModel(model_name="models/gemini-1.5-flash")

    # Make the LLM request.
    print("Making LLM inference request...")
    response = model.generate_content([prompt, video_file_obj],
                                      request_options={"timeout": 600})

    # Clean up the video file after processing
    genai.delete_file(video_file_obj.name)
    print(response.text)
    return jsonify({"response": response.text})
    
def save_uploaded_file(uploaded_file):
    """Save the uploaded file to the media folder and return the file path."""
    upload_dir = 'medias/'
    
    # Create the directory if it does not exist
    os.makedirs(upload_dir, exist_ok=True)
    
    # Define the full path for the file
    file_path = os.path.join(upload_dir, uploaded_file.filename)
    with open(file_path, 'wb') as f:
        f.write(uploaded_file.read())
    return file_path
def get_os():
    system = platform.system()
    if system == 'Windows':
        return 'Windows'
    elif system == 'Darwin':  # macOS
        return 'macOS'
    else:
        raise NotImplementedError(f"Unsupported OS: {system}")

def get_browser_history_path(browser):
    if current_os == 'Windows':
        if browser == 'chrome':
            return os.path.expanduser(r'~\AppData\Local\Google\Chrome\User Data\Default\History')
        elif browser == 'edge':
            return os.path.expanduser(r'~\AppData\Local\Microsoft\Edge\User Data\Default\History')
    elif current_os == 'macOS':
        if browser == 'chrome':
            return os.path.expanduser('~/Library/Application Support/Google/Chrome/Default/History')
        elif browser == 'safari':
            return os.path.expanduser('~/Library/Safari/History.db')

def fetch_browsing_history(browser):
    history_path = get_browser_history_path(browser)
    if not os.path.exists(history_path):
        raise FileNotFoundError(f"The history file for {browser} does not exist.")

    conn = sqlite3.connect(history_path)
    cursor = conn.cursor()
    
    if browser in ['chrome', 'edge']:
        cursor.execute("SELECT url, title, visit_count FROM urls ORDER BY last_visit_time DESC LIMIT 10")
    elif browser == 'safari':
        cursor.execute("SELECT url, title, visit_count FROM history_items ORDER BY visit_time DESC LIMIT 10")
    
    history = cursor.fetchall()
    conn.close()
    return history

def get_cookies_path(browser):
    if current_os == 'Windows':
        if browser == 'chrome':
            return os.path.expanduser(r'~\AppData\Local\Google\Chrome\User Data\Default\Cookies')
        elif browser == 'edge':
            return os.path.expanduser(r'~\AppData\Local\Microsoft\Edge\User Data\Default\Cookies')
    elif current_os == 'macOS':
        if browser == 'chrome':
            return os.path.expanduser('~/Library/Application Support/Google/Chrome/Default/Cookies')
        elif browser == 'safari':
            return os.path.expanduser('~/Library/Safari/Cookies')

def fetch_cookies(browser):
    cookies_path = get_cookies_path(browser)
    if not os.path.exists(cookies_path):
        raise FileNotFoundError(f"The cookies file for {browser} does not exist.")

    conn = sqlite3.connect(cookies_path)
    cursor = conn.cursor()

    # The query to get cookie data
    cursor.execute("SELECT host_key, name, value, path, expires_utc FROM cookies ORDER BY creation_utc DESC LIMIT 10")
    
    cookies = cursor.fetchall()
    conn.close()
    return cookies

@app.route('/history/<browser>', methods=['GET'])
def get_history(browser):
    try:
        history = fetch_browsing_history(browser)
        history_data = [{"URL": entry[0], "Title": entry[1], "Visit Count": entry[2]} for entry in history]
        return jsonify(history_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/cookies/<browser>', methods=['GET'])
def get_cookies(browser):
    try:
        cookies = fetch_cookies(browser)
        cookie_data = [{"Host": cookie[0], "Name": cookie[1], "Value": cookie[2], "Path": cookie[3], "Expires": cookie[4]} for cookie in cookies]
        return jsonify(cookie_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    current_os = get_os()
    app.run(port=5009, debug=True)