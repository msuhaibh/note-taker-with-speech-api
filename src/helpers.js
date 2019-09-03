const helpers = {
    createSpeechRecognition: function() {
        try {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'en-GB';
        
            return recognition;
        }
        catch(error) {
            return null;
        }
    }
}

export default helpers;