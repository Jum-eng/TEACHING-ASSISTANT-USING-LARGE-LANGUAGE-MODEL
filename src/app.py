from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from langchain.document_loaders import DirectoryLoader, PyPDFLoader
from sentence_transformers import SentenceTransformer
from langchain.vectorstores import Chroma
from langchain.chains import VectorDBQA
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Path to the directory containing educational resources
resource_dir = r"C:\Users\Jumah Musah\Desktop\Educational_materials"

# Load documents function
def load_documents(directory):
    loader = DirectoryLoader(directory, loader_cls=PyPDFLoader)
    documents = loader.load()
    return documents

# Load documents from the specified directory
documents = load_documents(resource_dir)

# Initialize SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Embed documents and split into smaller chunks if necessary
def embed_documents(documents, model):
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    embeddings = []
    for doc in documents:
        for chunk in text_splitter.split_text(doc.page_content):
            embedding = model.encode(chunk)
            embeddings.append({'text': chunk, 'embedding': embedding})
    return embeddings

# Embed the loaded documents
embeddings = embed_documents(documents, model)

# Initialize ChromaDB and add embeddings
vectorstore = Chroma.from_embeddings(embeddings, embedding_field='embedding')

# Set up LangChain with ChromaDB
llm = ChatOpenAI(api_key="YOUR_OPENAI_API_KEY")
qa_chain = VectorDBQA(llm=llm, vectorstore=vectorstore)

# API endpoint to interact with the chatbot
@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    query = data.get('query')
    if not query:
        return jsonify({'error': 'No query provided'}), 400

    response = qa_chain.run(query)
    return jsonify({'response': response})

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
