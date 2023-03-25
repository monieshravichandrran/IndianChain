from collections import Counter
import string
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
keywords = keywords = ["html", "css", "javascript", "react", "skills", "experience", "data scientist", "machine learning", "neural network", "competitive coding", "years of experience"]
    
# Preprocess the job description text using spaCy
doc = nlp(job_description)

# Extract the noun phrases from the job description that contain any of the keywords and remove stop words and punctuation marks
noun_phrases = [" ".join(token.text for token in chunk if not token.is_stop and token.text not in punctuations) for chunk in doc.noun_chunks if any(keyword in chunk.text for keyword in keywords)]

# Count the frequency of each noun phrase
noun_phrase_counts = Counter(noun_phrases)

# Extract the top 5 most frequent noun phrases as job keywords
job_keywords = [noun_phrase for noun_phrase, count in noun_phrase_counts.most_common(5)]
    
print(job_keywords)


# Preprocess the resume text using spaCy
doc = nlp(resume)

# Extract the noun phrases from the resume and remove stop words and punctuation marks
noun_phrases = [" ".join(token.text for token in chunk if not token.is_stop and token.text not in punctuations) for chunk in doc.noun_chunks]

# Check whether each job keyword appears in the resume noun phrases
keyword_matches = [any(keyword in noun_phrase for noun_phrase in noun_phrases) for keyword in job_keywords]

print(job_keywords,keyword_matches)