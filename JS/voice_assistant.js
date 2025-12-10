// ===================================
// Voice Assistant with Web Speech API
// ===================================

class VoiceAssistant {
    constructor() {
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isListening = false;
        this.isSupported = false;
        
        // DOM elements
        this.voiceBtn = document.getElementById('voiceBtn');
        this.voiceModal = document.getElementById('voiceModal');
        this.voiceClose = document.querySelector('.voice-close');
        this.stopBtn = document.getElementById('stopVoiceBtn');
        this.transcript = document.getElementById('voiceTranscript');
        this.response = document.getElementById('voiceResponse');
        
        // Portfolio data for voice responses
        this.portfolioData = {
            name: 'VIMALESH S',
            profession: 'Full Stack Developer and AI Enthusiast',
            skills: ['Python', 'Flask', 'JavaScript', 'HTML/CSS', 'OpenCV', 'Machine Learning', 'IoT', 'Computer Vision'],
            achievements: [
                'Won Aura Hackathon in March 2025',
                'Won 12-hour internal hackathon in August 2025',
                'Participated in NASA Space Apps Challenge 2025',
                'Completed 15+ projects across various domains'
            ],
            projects: [
                'OpenCV Augmentation System - Award-winning hackathon project',
                'NASA Earth Data Analysis Platform - Space Apps Challenge',
                'SecureStep Fall Detection System - IoT healthcare solution',
                'Multi-Purpose Object Detection - Computer vision application',
                'Plant Identification & Disease Detection - Agriculture AI',
                'Weather & Air Quality Forecasting - Predictive analytics'
            ],
            contact: {
                email: 'vimalesh@example.com',
                location: 'India'
            }
        };
        
        this.init();
    }
    
    init() {
        // Check for Web Speech API support
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (typeof SpeechRecognition !== 'undefined') {
            this.isSupported = true;
            this.recognition = new SpeechRecognition();
            this.setupRecognition();
            this.setupEventListeners();
        } else {
            console.warn('Web Speech API is not supported in this browser');
            this.voiceBtn.style.display = 'none';
        }
    }
    
    setupRecognition() {
        // Configure speech recognition
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
        this.recognition.maxAlternatives = 1;
        
        // Recognition event handlers
        this.recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }
            
            // Display transcript
            this.transcript.innerHTML = `
                <div class="final-transcript">${finalTranscript}</div>
                <div class="interim-transcript" style="color: #999;">${interimTranscript}</div>
            `;
            
            // Process command if final transcript
            if (finalTranscript) {
                this.processCommand(finalTranscript.trim().toLowerCase());
            }
        };
        
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.displayResponse(`Error: ${event.error}. Please try again.`);
            
            if (event.error === 'no-speech') {
                this.displayResponse('No speech detected. Please try speaking again.');
            }
        };
        
        this.recognition.onend = () => {
            if (this.isListening) {
                // Restart recognition if still in listening mode
                try {
                    this.recognition.start();
                } catch (e) {
                    console.log('Recognition restart failed:', e);
                }
            }
        };
    }
    
    setupEventListeners() {
        // Voice button click
        this.voiceBtn.addEventListener('click', () => {
            this.startListening();
        });
        
        // Close button
        this.voiceClose.addEventListener('click', () => {
            this.stopListening();
        });
        
        // Stop button
        this.stopBtn.addEventListener('click', () => {
            this.stopListening();
        });
        
        // Click outside modal to close
        this.voiceModal.addEventListener('click', (e) => {
            if (e.target === this.voiceModal) {
                this.stopListening();
            }
        });
    }
    
    startListening() {
        if (!this.isSupported) {
            alert('Voice assistant is not supported in your browser. Please use Chrome, Edge, or Safari.');
            return;
        }
        
        this.isListening = true;
        this.voiceModal.classList.add('active');
        this.transcript.textContent = 'Listening...';
        this.response.textContent = '';
        
        try {
            this.recognition.start();
            this.speak('Voice assistant activated. How can I help you?');
        } catch (e) {
            console.log('Recognition start error:', e);
        }
    }
    
    stopListening() {
        this.isListening = false;
        this.voiceModal.classList.remove('active');
        
        if (this.recognition) {
            this.recognition.stop();
        }
        
        // Cancel any ongoing speech
        this.synthesis.cancel();
    }
    
    processCommand(command) {
        console.log('Processing command:', command);
        
        let responseText = '';
        
        // Command patterns
        if (command.includes('help') || command.includes('what can you do')) {
            responseText = this.getHelpText();
        }
        else if (command.includes('name') || command.includes('who are you')) {
            responseText = `My name is ${this.portfolioData.name}, a ${this.portfolioData.profession}.`;
        }
        else if (command.includes('skills') || command.includes('technologies')) {
            responseText = `My technical skills include ${this.portfolioData.skills.slice(0, 5).join(', ')}, and more.`;
        }
        else if (command.includes('achievements') || command.includes('awards')) {
            responseText = `Here are my key achievements: ${this.portfolioData.achievements[0]}, ${this.portfolioData.achievements[1]}.`;
        }
        else if (command.includes('projects') || command.includes('work')) {
            responseText = `I have worked on several projects including ${this.portfolioData.projects[0]}, ${this.portfolioData.projects[1]}, and more.`;
        }
        else if (command.includes('hackathon') || command.includes('aura')) {
            responseText = `I won the Aura Hackathon in March 2025 with an OpenCV augmentation and machine learning project.`;
        }
        else if (command.includes('nasa') || command.includes('space')) {
            responseText = `I participated in the NASA Space Apps Challenge 2025, where I developed an Earth Data Analysis Platform using NASA's GIBS service.`;
        }
        else if (command.includes('contact') || command.includes('email')) {
            responseText = `You can contact me at ${this.portfolioData.contact.email}. I'm located in ${this.portfolioData.contact.location}.`;
        }
        else if (command.includes('education') || command.includes('degree')) {
            responseText = `I'm currently pursuing Computer Science and Engineering, specializing in AI, Machine Learning, and Full-Stack Development.`;
        }
        else if (command.includes('about') || command.includes('tell me about')) {
            responseText = `I'm ${this.portfolioData.name}, a passionate developer with expertise in full-stack development, machine learning, and computer vision. I've won multiple hackathons and completed over 15 projects.`;
        }
        else if (command.includes('scroll') && command.includes('home')) {
            this.scrollToSection('home');
            responseText = 'Scrolling to home section.';
        }
        else if (command.includes('scroll') && command.includes('projects')) {
            this.scrollToSection('projects');
            responseText = 'Scrolling to projects section.';
        }
        else if (command.includes('scroll') && command.includes('contact')) {
            this.scrollToSection('contact');
            responseText = 'Scrolling to contact section.';
        }
        else if (command.includes('scroll') && command.includes('skills')) {
            this.scrollToSection('skills');
            responseText = 'Scrolling to skills section.';
        }
        else if (command.includes('theme') || command.includes('color')) {
            if (command.includes('purple')) {
                this.changeTheme('purple');
                responseText = 'Changed theme to purple.';
            } else if (command.includes('yellow')) {
                this.changeTheme('yellow');
                responseText = 'Changed theme to yellow.';
            } else {
                responseText = 'Available themes are purple and yellow. Say "change theme to purple" or "change theme to yellow".';
            }
        }
        else if (command.includes('stop') || command.includes('close') || command.includes('exit')) {
            responseText = 'Goodbye! Voice assistant closing.';
            this.speak(responseText);
            setTimeout(() => this.stopListening(), 2000);
            return;
        }
        else {
            responseText = 'I didn\'t understand that command. Say "help" to see what I can do.';
        }
        
        this.displayResponse(responseText);
        this.speak(responseText);
    }
    
    getHelpText() {
        return `I can help you with the following commands: 
                Ask about my name, skills, projects, achievements, education, or contact information. 
                You can also say "scroll to projects", "scroll to contact", or "change theme to purple or yellow". 
                Say "stop" to close the assistant.`;
    }
    
    displayResponse(text) {
        this.response.innerHTML = `<p><strong>Assistant:</strong> ${text}</p>`;
    }
    
    speak(text) {
        // Cancel any ongoing speech
        this.synthesis.cancel();
        
        // Create new utterance
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        // Select a voice (prefer female voice if available)
        const voices = this.synthesis.getVoices();
        const preferredVoice = voices.find(voice => 
            voice.lang.includes('en') && voice.name.includes('Female')
        ) || voices.find(voice => voice.lang.includes('en'));
        
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }
        
        this.synthesis.speak(utterance);
    }
    
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    changeTheme(theme) {
        if (window.themeSwitcher) {
            window.themeSwitcher.setTheme(theme);
        }
    }
}

// Initialize voice assistant when DOM is loaded
let voiceAssistant;
document.addEventListener('DOMContentLoaded', () => {
    voiceAssistant = new VoiceAssistant();
    window.voiceAssistant = voiceAssistant; // Make globally accessible
});
