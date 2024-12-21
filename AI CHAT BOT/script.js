document.getElementById('send-button').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    appendMessage('user', userInput);
    document.getElementById('user-input').value = '';

    try {
        const response = await getChatbotResponse(userInput);
        appendMessage('bot', response);
    } catch (error) {
        appendMessage('bot', "Sorry, I couldn't process your request at this time.");
        console.error('Error fetching chatbot response:', error);
    }
});

async function getChatbotResponse(userInput) {
    const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userInput }),
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.response;
}

function appendMessage(sender, message) {
    const messagesDiv = document.getElementById('messages');
    
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    
    messagesDiv.appendChild(messageDiv);
  
    messagesDiv.appendChild(document.createElement('br'));
    

    if (sender === 'bot') {
        messagesDiv.appendChild(document.createElement('br'));
    }

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
