from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import os
import logging

app = Flask(__name__)
CORS(app)

# Setup logging
logging.basicConfig(level=logging.INFO)

api_key = os.getenv("GROQ_API_KEY", "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")
client = Groq(api_key=api_key)

def chat_with_llama(prompt):
    try:
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.2-90b-vision-preview",
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        logging.error(f"Error in chat_with_llama: {e}")
        return "An error occurred while processing your request."

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if not data or 'question' not in data:
        return jsonify({"response": "Invalid request format or missing 'question'"}), 400

    question = data['question']
    # Directly send the question to the Llama model without restrictions
    response = chat_with_llama(question)

    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)