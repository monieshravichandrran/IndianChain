import spacy

# Load the spaCy model and define the stop words and punctuation marks to filter out
nlp = spacy.load("en_core_web_sm")
stop_words = spacy.lang.en.stop_words.STOP_WORDS
punctuations = string.punctuation

# Define the job description text
job_description = """We are looking for a data scientist with experience in Python, machine learning, and data analysis. 
The ideal candidate will have a strong background in statistics and mathematics, and experience 
working with large datasets. Familiarity with deep learning and neural networks is a plus.""".lower()

# Define a list of keywords to search for in the job description
keywords = ["data scientist", "python", "machine learning", "neural networks"]

# Preprocess the job description text using spaCy
doc = nlp(job_description)

# Extract the noun phrases and named entities from the job description that contain any of the keywords
noun_phrases = [" ".join(token.text for token in chunk if not token.is_stop and token.text not in punctuations) for chunk in doc.noun_chunks if any(keyword in chunk.text for keyword in keywords)]
named_entities = [ent.text.lower() for ent in doc.ents if any(keyword in ent.text.lower() for keyword in keywords)]

# Combine the noun phrases and named entities to get the job keywords
job_keywords = set(noun_phrases + named_entities)

# Preprocess the resume text using spaCy
resume = """
As a data scientist, I have experience using Python for data analysis and machine learning. I am also familiar with deep learning and neural networks, and have worked with large datasets in the past. My background in statistics and mathematics has given me a strong foundation for this role.
""".lower()
doc = nlp(resume)

# Extract the noun phrases and named entities from the resume and remove stop words and punctuation marks
noun_phrases = [" ".join(token.text for token in chunk if not token.is_stop and token.text not in punctuations) for chunk in doc.noun_chunks]
named_entities = [ent.text.lower() for ent in doc.ents]

# Combine the noun phrases and named entities to get the resume keywords
resume_keywords = set(noun_phrases + named_entities)

# Check whether each job keyword appears in the resume keywords
keyword_matches = [keyword in resume_keywords for keyword in job_keywords]

# Determine whether the candidate is suitable based on the number of job keyword matches
if sum(keyword_matches) >= len(job_keywords)/2:
    print("Candidate is suitable for the job.")
else:
    print("Candidate is not suitable for the job.")