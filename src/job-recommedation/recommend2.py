import spacy
from spacy.matcher import PhraseMatcher
from spacy.tokens import Span
from collections import Counter

# Load the spaCy model and define the stop words and punctuation marks to filter out
nlp = spacy.load("en_core_web_sm")
stop_words = spacy.lang.en.stop_words.STOP_WORDS
punctuations = string.punctuation

# Define the job description text and resume text
job_description = """We are looking for a data scientist with experience in Python, machine learning, and data analysis. 
The ideal candidate will have a strong background in statistics and mathematics, and experience 
working with large datasets. Familiarity with deep learning and neural networks is a plus.""".lower()

resume = """
As a data scientist, I have experience using Python for data analysis and machine learning. I am also familiar with deep learning and neural networks, and have worked with large datasets in the past. My background in statistics and mathematics has given me a strong foundation for this role.
""".lower()

# Define a list of skills to search for in the job description
skills = ["Python", "machine learning", "data analysis", "statistics", "mathematics", "deep learning", "neural networks"]

# Define a list of qualifications to search for in the job description
qualifications = ["data scientist", "large datasets"]

# Preprocess the job description and resume text using spaCy
job_doc = nlp(job_description)
resume_doc = nlp(resume)

# Define a function to extract skills and qualifications from a document
def extract_skills_and_qualifications(doc):
    matcher = PhraseMatcher(nlp.vocab)
    for skill in skills:
        matcher.add("SKILL", None, nlp(skill))
    for qualification in qualifications:
        matcher.add("QUALIFICATION", None, nlp(qualification))
    matches = matcher(doc)
    spans = [Span(doc, start, end, label) for label, start, end in matches]
    skills_and_qualifications = Counter([span.text for span in spans])
    return skills_and_qualifications

# Extract skills and qualifications from the job description and resume
job_skills_and_qualifications = extract_skills_and_qualifications(job_doc)
resume_skills_and_qualifications = extract_skills_and_qualifications(resume_doc)

# Extract the most important skills and qualifications from the job description
job_keywords = job_skills_and_qualifications.most_common(5)
job_keywords = [keyword for keyword, count in job_keywords if keyword.lower() not in stop_words]

# Determine whether the candidate is suitable based on the number of job keyword matches
keyword_matches = [any(keyword in noun_phrase for noun_phrase in noun_phrases) for keyword in job_keywords]
if sum(keyword_matches) >= len(job_keywords)/2:
    print("Candidate is suitable for the job.")
else:
    print("Candidate is not suitable for the job.")