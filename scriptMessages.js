var currentFBO = "";

document.addEventListener('DOMContentLoaded', function () {
    loadMessageSuggestions();  // Loads the clickable message suggestions for quick chat options.
    setupChatInputListener();  // Configures listeners for chat input, handling Enter key and Send button.
    setupChatIconListener();   // Ensures the chat icon toggles the visibility of the chat box correctly.

    displayMessage("Welcome to the chat! How can we assist you today?", 'right', 'rgb(160, 102, 203)');
});

const predefinedMessages = [
    "Confirm arrival time.",
    "Schedule maintenance.",
    "Confirm departure time.",
    "Ask for fuel services.",
    "Request catering services.",
    "Inquire about parking availability."
];

const responses = {
    "Confirm arrival time.": ["Arrival time confirmed. Welcome!", "Your arrival time is noted.", "Thanks for confirming your arrival"],
    "Schedule maintenance.": ["Maintenance scheduled.", "We've got your maintenance covered.", "We're a little busy but we'll get to your maintenance soon."],
    "Request catering services.": ["Catering services scheduled.", "Your catering is on its way.", "Thanks for the heads up. Catering is arranged.", "Sorry, we're out of catering right now."],
    "Inquire about parking availability.": ["Parking is available.", "We have your parking reserved.", "Parking is a little tight but we've got you covered.", "Unfortunately, parking is full right now. We'll let you know when a spot opens up!"],
    "Confirm departure time.": ["Departure time confirmed.", "Your departure is scheduled.", "Thanks for the heads up. Departure time noted."],
    "Ask for fuel services.": ["Fuel service scheduled.", "Refueling complete soon", "Arranging fuel services.", "We're a little busy at the moment but we'll get to fueling you soon."]
};

function setupChatInputListener() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');

    chatInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendAndProcessMessage(chatInput.value);
        }
    });

    sendButton.addEventListener('click', function () {
        sendAndProcessMessage(chatInput.value);
    });
}

function loadMessageSuggestions() {
    const container = document.querySelector('.message-suggestions');
    container.innerHTML = '';
    predefinedMessages.forEach(msg => {
        const messageBubble = document.createElement('div');
        messageBubble.className = 'message-bubble';
        messageBubble.textContent = msg;
        messageBubble.onclick = () => sendAndProcessMessage(msg);
        container.appendChild(messageBubble);
    });
}

function sendAndProcessMessage(messageText) {
    if (!messageText.trim()) return;

    let fboName = document.querySelector('select.with-fbo-dropdown').value;

    if (fboName === '') {
        alert('Please select an FBO to chat with them.');
        return;
    }

    if (currentFBO !== fboName) {
        const messagesContainer = document.querySelector('.messages');

        // Create a new <hr> element
        const hr = document.createElement('hr');
        hr.className = 'new-fbo-name-hr';

        // Create a new <div> element for the message
        const div = document.createElement('div');
        div.className = 'new-fbo-name-msg';
        div.textContent = `Now chatting with ${fboName}`;

        // Append new elements to the container
        messagesContainer.appendChild(hr);
        messagesContainer.appendChild(div);

        currentFBO = fboName;
    }

    // Display user's message immediately
    displayMessage(messageText, 'left', 'rgb(31, 54, 171)');
    document.getElementById('chatInput').value = '';

    // Immediate generic response
    const immediateResponse = selectImmediateResponse();
    const waitTime = 400 + Math.random() * 600;
    setTimeout(() => {
        displayMessage(immediateResponse, 'right', 'rgb(160, 102, 203)');
    }, waitTime); // Delay for the generic automated response between 0.4s and 1.2s

    // Check if it's a predefined message to display a specific delayed response
    if (predefinedMessages.includes(messageText)) {
        setTimeout(() => {
            showTypingIndicator();
            // scroll to the bottom of the chat messages
            let messagesContainer = document.querySelector('.messages');
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, waitTime + 100); // Further delay for typing indicator after generic response
        setTimeout(() => {
            removeTypingIndicator();
            const delayedResponse = responses[messageText][Math.floor(Math.random() * responses[messageText].length)];
            displayMessage(delayedResponse, 'right', 'rgb(160, 102, 203)');
        }, 4400 + Math.random() * 2000); // Further delay for specific response between 4.4s and 6.2s after user's message
    }
}

function displayMessage(message, side, color) {
    const messagesContainer = document.querySelector('.messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'single-message';
    messageDiv.style.backgroundColor = color;
    messageDiv.style.borderRadius = side === 'left' ? '15px 15px 0px 15px' : '15px 15px 15px 0px';
    messageDiv.textContent = message;
    messageDiv.style.alignSelf = side === 'left' ? 'flex-start' : 'flex-end';
    messageDiv.style.marginLeft = side === 'left' ? 'auto' : '0';
    messagesContainer.appendChild(messageDiv);

    // Scroll to the bottom of the chat messages
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.querySelector('.messages');
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    for (let i = 0; i < 3; i++) {
        let dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.margin = '0 2px';
        dot.style.animation = `fade 1.2s linear infinite ${i * 0.4}s`;
        typingIndicator.appendChild(dot);
    }
    messagesContainer.appendChild(typingIndicator);
}

function removeTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    typingIndicator && typingIndicator.remove();
}

function selectImmediateResponse() {
    const immediateResponses = [
        "Thank you for reaching out, we'll get back to you shortly.",
        "We appreciate your message and will reply soon.",
        "Thank you for contacting us. We are reviewing your request and will respond promptly.",
        "We have received your message and our team will get in touch with you soon."
    ];
    return immediateResponses[Math.floor(Math.random() * immediateResponses.length)];
}

function setupChatIconListener() {
    let chatIcon = document.querySelector('.chat-icon');
    let chatIconFBO = document.querySelector('.chat-icon.fbo');
    let chatBox = document.querySelector('.chat-box');
    let overlay = document.querySelector('.overlay');
    let FBODetailsContainer = document.querySelector('.fbo-details-container');

    chatIcon.addEventListener('click', function () {
        chatBox.classList.toggle('hidden');
        chatBox.classList.toggle('visible');
        if (!chatBox.classList.contains('hidden')) {
            document.getElementById('chatInput').focus();
            overlay.classList.remove('hidden');
        } else {
            overlay.classList.add('hidden');
        }
        FBODetailsContainer.classList.add('hidden');
    });

    chatIconFBO.addEventListener('click', function () {
        chatBox.classList.toggle('hidden');
        chatBox.classList.toggle('visible');
        overlay.classList.toggle('hidden');
        if (!chatBox.classList.contains('hidden')) {
            document.getElementById('chatInput').focus();
        }
        let withFBO = document.querySelector('select.with-fbo-dropdown');
        /* select the option with a value of fbo name */
        withFBO.value = document.querySelector('#fbo-details-title').textContent;
        overlay.classList.toggle('hidden');
        FBODetailsContainer.classList.toggle('hidden');
    });

    overlay.addEventListener('click', function () {
        chatBox.classList.remove('visible');
        chatBox.classList.add('hidden');
        overlay.classList.add('hidden');
        document.querySelector('.fbo-details-container').classList.add('hidden');
    });
}
