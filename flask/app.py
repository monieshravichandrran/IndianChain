import pandas as pd
from flask import Flask, request
import pickle
import string
import re
import json
from flask_cors import CORS, cross_origin
from collections import Counter
import string
import spacy
import time


model = pickle.load(open('job_model.pkl', 'rb'))
nlp = spacy.load("en_core_web_sm")
stop_words = spacy.lang.en.stop_words.STOP_WORDS
punctuations = string.punctuation

all_keywords = {
    'Data Science': ["data science", "machine learning", "deep learning", "neural network", "artificial intelligence", "data mining", "data analysis", "big data", "statistics", "mathematics", "database", "data visualization", "natural language processing", "predictive modeling", "computer vision", "business intelligence", "data engineering", "data warehousing", "data governance", "data quality", "data cleaning", "data integration", "data architecture", "data modeling", "hadoop", "spark", "python", "r programming", "sql", "nosql", "tableau", "power bi", "tensorflow", "keras", "scikit-learn", "pandas", "numpy", "matplotlib", "seaborn"],
    'HR': ["human resources", "recruiting", "talent acquisition", "employee relations", "performance management", "compensation", "benefits", "training and development", "onboarding", "offboarding", "diversity and inclusion", "HR policies", "HRIS", "HR analytics", "employment law"],
    'Advocate': ["lawyer", "litigation", "legal", "court", "case", "trial", "brief", "legal research", "jurisdiction", "advocacy", "legal writing", "evidence", "witness", "appeal", "cross-examination", "counsel", "client", "negotiation", "arbitration", "mediation", "ADR", "amicable resolution"],
    'Web Designing': ["web design", "UI", "UX", "HTML", "CSS", "JavaScript", "responsive design", "graphic design", "user experience", "user interface", "web development", "front-end development", "back-end development", "website optimization"],
    'Arts': ["painting", "drawing", "sculpture", "photography", "printmaking", "ceramics", "textiles", "fashion design", "graphic design", "illustration", "animation", "film", "theater", "dance", "music", "art history", "art theory", "color theory", "composition", "anatomy", "figure drawing", "landscape painting", "still life painting"],
    'Sales': ['sales', 'business development', 'account management', 'lead generation', 'customer acquisition', 'negotiation', 'closing deals', 'relationship building', 'cold calling', 'sales cycle', 'sales funnel', 'sales targets', 'client retention', 'prospecting', 'pipeline management', 'forecasting', 'consultative selling', 'solution selling', 'value proposition', 'competitive analysis', 'market research', 'sales analytics', 'customer relationship management', 'salesforce management'],
    'Mechanical Engineer': ['mechanical engineering', 'thermodynamics', 'fluid mechanics', 'heat transfer', 'material science', 'mechanical design', 'engineering mechanics', 'dynamics', 'control systems', 'manufacturing processes', 'CAD/CAM', 'product development', 'mechatronics', 'structural analysis', 'finite element analysis', 'machine learning', 'robotics'],
    'Blockchain': ["blockchain", "distributed ledger", "cryptocurrency", "smart contract", "consensus mechanism", "solidity", "ethereum", "hyperledger", "decentralized application", "tokenization", "digital identity", "mining", "hash function", "digital signature", "public key cryptography", "merkle tree"],
    'DevOps Engineer': ["DevOps", "Continuous Integration", "Continuous Delivery", "Continuous Deployment", "Agile", "Scrum", "Kanban", "Infrastructure as Code", "Configuration Management", "Automation", "Docker", "Kubernetes", "Ansible", "Chef", "Puppet", "Jenkins", "Git", "Monitoring", "Alerting", "Log Analysis", "Metrics", "Site Reliability Engineering", "High Availability", "Load Balancing", "Networking", "Security"],
    'Java Developer': ["Java", "J2EE", "Spring", "Hibernate", "Maven", "JUnit", "RESTful", "SOAP", "Microservices", "JDBC", "SQL", "Oracle", "MySQL", "MongoDB", "JavaScript", "jQuery", "Angular", "React", "Node.js", "AWS", "Azure", "Docker", "Kubernetes", "Git", "Agile", "Scrum"],
    'Testing': ["testing", "test plan", "test case", "test script", "test automation", "regression testing", "performance testing", "load testing", "stress testing", "integration testing", "system testing", "acceptance testing", "user acceptance testing", "black box testing", "white box testing", "gray box testing", "bug", "defect", "issue", "quality assurance", "QA"],
    'Python Developer': ["Python", "Django", "Flask", "NumPy", "Pandas", "Matplotlib", "SciPy", "scikit-learn", "PyTorch", "Keras", "TensorFlow", "SQLAlchemy", "Celery", "Redis", "AWS", "RESTful API", "Git"],
    'Database' :["SQL", "relational databases", "NoSQL", "data modeling", "database design", "database administration", "data warehousing", "ETL", "data mining", "Big Data", "data analysis", "data visualization", "business intelligence", "OLAP", "OLTP", "database security", "transaction management", "backup and recovery"]
}


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

@app.route("/recommend",methods=['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def fn2():
    start_time = time.time()
    form = json.loads(request.data.decode())
    keywordsy = all_keywords[form["title"]]
    keywords = []
    for i in keywordsy:
        keywords.append(i.lower())
    doc = nlp(form["description"].lower())
    noun_phrases = [" ".join(token.text for token in chunk if not token.is_stop and token.text not in punctuations) for chunk in doc.noun_chunks if any(keyword in chunk.text for keyword in keywords)]
    noun_phrase_counts = Counter(noun_phrases)
    job_keywords = [noun_phrase for noun_phrase, count in noun_phrase_counts.most_common(5)]
    resumes = form["resume"]
    applicants = form["applicants"]
    answer = dict()
    print(job_keywords)
    for i in range(len(resumes)):
        doc = nlp(resumes[i].lower())
        noun_phrases = [" ".join(token.text for token in chunk if not token.is_stop and token.text not in punctuations) for chunk in doc.noun_chunks]
        keyword_matches = [any(keyword in noun_phrase for noun_phrase in noun_phrases) for keyword in job_keywords]
        count = 0
        for it in keyword_matches:
            if it:
                count += 1
        print(keyword_matches, applicants[i], count)
        answer[applicants[i]] = count
    print(answer)
    recommendation = sorted(answer,reverse=False)
    print(recommendation)
    end_time = time.time()
    print("Time Taken for recommendation : ", end_time - start_time)
    return recommendation

if __name__ == "__main__":
    app.run(debug=True,port=8000)


