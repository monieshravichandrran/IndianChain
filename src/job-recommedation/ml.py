from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.feature_extraction.text import TfidfVectorizer
print(len(df.index))
X = df['Resume']
y = df['Category']

print(y.unique())
# Vectorize the text data using TF-IDF.
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(X)

# Split the data into training and testing sets.
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a logistic regression classifier object.
lr_classifier = LogisticRegression()

# Train the classifier on the training data.
lr_classifier.fit(X_train, y_train)

# Use the trained classifier to predict labels for the test data.
y_pred = lr_classifier.predict(X_test)

# Evaluate the accuracy of the classifier.
accuracy = accuracy_score(y_test, y_pred)
print('Logistic Regression Accuracy:', accuracy)

dt_classifier = DecisionTreeClassifier()

# Train the classifier on the training data.
dt_classifier.fit(X_train, y_train)

# Use the trained classifier to predict labels for the test data.
y_pred = dt_classifier.predict(X_test)

# Evaluate the accuracy of the classifier.
accuracy = accuracy_score(y_test, y_pred)
print('Decision Tree Accuracy:', accuracy)

rf_classifier = RandomForestClassifier()

# Train the classifier on the training data.
rf_classifier.fit(X_train, y_train)

# Use the trained classifier to predict labels for the test data.
y_pred = rf_classifier.predict(X_test)

# Evaluate the accuracy of the classifier.
accuracy = accuracy_score(y_test, y_pred)
print('Random Forest Accuracy:', accuracy)

resume_text = "Experienced software developer skilled in Python and Java."
resume_vectorized = vectorizer.transform([resume_text])
category = lr_classifier.predict(resume_vectorized)[0]
print('The predicted category for the resume is:', category)

resume_text = "Experienced software developer skilled in Python and Java."
resume_vectorized = vectorizer.transform([resume_text])
category = rf_classifier.predict(resume_vectorized)[0]
print('The predicted category for the resume is:', category)

resume_text = "Experienced software developer skilled in Python and Java."
resume_vectorized = vectorizer.transform([resume_text])
category = dt_classifier.predict(resume_vectorized)[0]
print('The predicted category for the resume is:', category)