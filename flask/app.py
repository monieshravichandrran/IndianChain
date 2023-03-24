import pandas as pd
from flask import Flask, request
import pickle
import string
import re
import json
from flask_cors import CORS, cross_origin

model = pickle.load(open('job_model.pkl', 'rb'))

def preprocess_text(text):
    # Remove punctuations
    text = text.translate(str.maketrans('', '', string.punctuation))
    # Convert to lowercase
    text = text.lower()
    # Remove digits
    text = re.sub(r'\d+', '', text)
    # Remove extra spaces
    text = re.sub(' +', ' ', text)
    return text

app = Flask(__name__)

@app.route("/job", methods=['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def fn():
    form = json.loads(request.data.decode())
    sample_resume = form['resume']
    print(sample_resume)
    clean_text = preprocess_text(sample_resume)
    return model.predict([clean_text])[0]

if __name__ == "__main__":
    app.run(debug=True,port=8000)