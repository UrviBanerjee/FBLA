// TechLearn Hub - Main JavaScript File
// Handles all interactions, animations, and data management

// Global variables and state management
let currentUser = {
    name: 'Alex',
    streak: 15,
    sessionsCompleted: 12,
    achievements: 8,
    learningTime: '24h'
};

let selectedDate = null;
let selectedTutor = null;
let currentFilter = 'all';
let currentTab = 'html';

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializePageSpecificFeatures();
    loadUserData();
});

// Navigation Management
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Animation Initialization
function initializeAnimations() {
    // Animate stats counters on homepage
    animateCounters();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize typewriter effect on homepage
    initializeTypewriter();
    
    // Initialize carousels
    initializeCarousels();
}

// Stats Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stats-counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.card-hover, .resource-card, .tutor-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Typewriter Effect
function initializeTypewriter() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const typed = new Typed('#typed-text', {
            strings: ['Together', 'Collaboratively', 'Effectively', 'Joyfully'],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Carousel Initialization
function initializeCarousels() {
    // Testimonials slider
    const testimonialsSlider = document.getElementById('testimonials-slider');
    if (testimonialsSlider) {
        new Splide('#testimonials-slider', {
            type: 'loop',
            perPage: 1,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 5000,
            pauseOnHover: true,
            breakpoints: {
                768: {
                    perPage: 1,
                }
            }
        }).mount();
    }
    
    // Featured carousel
    const featuredCarousel = document.getElementById('featured-carousel');
    if (featuredCarousel) {
        new Splide('#featured-carousel', {
            type: 'loop',
            perPage: 1,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            arrows: false,
            pagination: true
        }).mount();
    }
}

// Page-specific feature initialization
function initializePageSpecificFeatures() {
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'index':
            initializeHomePage();
            break;
        case 'schedule':
            initializeSchedulePage();
            break;
        case 'dashboard':
            initializeDashboardPage();
            break;
        case 'resources':
            initializeResourcesPage();
            break;
    }
}

// Get current page from URL
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('schedule')) return 'schedule';
    if (path.includes('dashboard')) return 'dashboard';
    if (path.includes('resources')) return 'resources';
    return 'index';
}

// Homepage initialization
function initializeHomePage() {
    // Initialize p5.js background animation
    if (typeof p5 !== 'undefined') {
        initializeP5Background();
    }
}

// P5.js Background Animation
function initializeP5Background() {
    const sketch = (p) => {
        let particles = [];
        
        p.setup = () => {
            const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('hero-canvas');
            
            // Create particles
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(2, 6),
                    alpha: p.random(0.3, 0.8)
                });
            }
        };
        
        p.draw = () => {
            p.clear();
            
            // Update and draw particles
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle
                p.fill(255, 255, 255, particle.alpha * 255);
                p.noStroke();
                p.ellipse(particle.x, particle.y, particle.size);
            });
            
            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(other => {
                    const distance = p.dist(particle.x, particle.y, other.x, other.y);
                    if (distance < 100) {
                        p.stroke(255, 255, 255, (1 - distance / 100) * 50);
                        p.strokeWeight(1);
                        p.line(particle.x, particle.y, other.x, other.y);
                    }
                });
            });
        };
        
        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    };
    
    new p5(sketch);
}

// Schedule Page initialization
function initializeSchedulePage() {
    initializeCalendar();
    initializeFilters();
    initializeBookingModal();
    initializeTutorSelection();
}

// Calendar functionality
function initializeCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid) return;
    
    const today = new Date();
    const currentWeek = getWeekStart(today);
    
    generateCalendarDays(currentWeek);
    updateWeekDisplay(currentWeek);
    
    // Week navigation
    const prevWeekBtn = document.getElementById('prev-week');
    const nextWeekBtn = document.getElementById('next-week');
    
    if (prevWeekBtn) {
        prevWeekBtn.addEventListener('click', () => {
            currentWeek.setDate(currentWeek.getDate() - 7);
            generateCalendarDays(currentWeek);
            updateWeekDisplay(currentWeek);
        });
    }
    
    if (nextWeekBtn) {
        nextWeekBtn.addEventListener('click', () => {
            currentWeek.setDate(currentWeek.getDate() + 7);
            generateCalendarDays(currentWeek);
            updateWeekDisplay(currentWeek);
        });
    }
}

// Generate calendar days
function generateCalendarDays(startDate) {
    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid) return;
    
    calendarGrid.innerHTML = '';
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day border border-gray-200 rounded-lg p-2 min-h-24 cursor-pointer';
        dayElement.innerHTML = `
            <div class="text-center">
                <div class="text-sm font-medium text-gray-900">${date.getDate()}</div>
                <div class="mt-2 space-y-1">
                    ${generateTimeSlots(date)}
                </div>
            </div>
        `;
        
        dayElement.addEventListener('click', (e) => selectDate(date, e));
        calendarGrid.appendChild(dayElement);
    }
}

// Generate time slots for calendar
function generateTimeSlots(date) {
    const slots = [
        { time: '9:00 AM', available: Math.random() > 0.5 },
        { time: '11:00 AM', available: Math.random() > 0.5 },
        { time: '2:00 PM', available: Math.random() > 0.5 },
        { time: '4:00 PM', available: Math.random() > 0.5 }
    ];
    
    return slots.map(slot => {
        if (slot.available) {
            return `<div class="time-slot text-xs bg-green-100 text-green-800 px-1 py-1 rounded text-center">${slot.time}</div>`;
        } else {
            return `<div class="text-xs text-gray-400 text-center">${slot.time}</div>`;
        }
    }).join('');
}

// Get week start date
function getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(d.setDate(diff));
}

// Update week display
function updateWeekDisplay(weekStart) {
    const weekDisplay = document.getElementById('current-week');
    if (weekDisplay) {
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        
        const options = { month: 'short', day: 'numeric' };
        const startStr = weekStart.toLocaleDateString('en-US', options);
        const endStr = weekEnd.toLocaleDateString('en-US', options);
        const year = weekStart.getFullYear();
        
        weekDisplay.textContent = `${startStr} - ${endStr}, ${year}`;
    }
}

// Select date
function selectDate(date, event) {
    selectedDate = date;
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });
    event.target.closest('.calendar-day').classList.add('selected');
}

// Initialize filters
function initializeFilters() {
    const filters = ['subject-filter', 'session-type-filter', 'level-filter'];
    
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', applyFilters);
        }
    });
}

// Apply filters
function applyFilters() {
    // Filter logic would go here
    console.log('Applying filters...');
}

// Initialize booking modal
function initializeBookingModal() {
    const modal = document.getElementById('booking-modal');
    const closeModal = document.getElementById('close-modal');
    const confirmBooking = document.getElementById('confirm-booking');
    const cancelBooking = document.getElementById('cancel-booking');
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    if (confirmBooking) {
        confirmBooking.addEventListener('click', () => {
            confirmSessionBooking();
        });
    }
    
    if (cancelBooking) {
        cancelBooking.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
}

// Initialize tutor selection
function initializeTutorSelection() {
    const tutorCards = document.querySelectorAll('.tutor-card');
    
    tutorCards.forEach(card => {
        card.addEventListener('click', () => {
            selectedTutor = card.getAttribute('data-tutor');
            showTutorDetails(selectedTutor);
        });
    });
}

// Show tutor details
function showTutorDetails(tutorId) {
    const tutors = {
        sarah: {
            name: 'Sarah Chen',
            subject: 'Python & Data Science',
            price: '$25/hr',
            rating: '★★★★★',
            description: 'Senior CS student with 3+ years tutoring experience. Specializes in Python, data analysis, and machine learning basics.'
        },
        alex: {
            name: 'Alex Rodriguez',
            subject: 'Web Development',
            price: '$20/hr',
            rating: '★★★★★',
            description: 'Full-stack developer and React specialist. Passionate about teaching modern web development techniques.'
        },
        maria: {
            name: 'Maria Kim',
            subject: 'AI & Machine Learning',
            price: '$30/hr',
            rating: '★★★★☆',
            description: 'Graduate student researching neural networks. Expert in TensorFlow, PyTorch, and advanced algorithms.'
        }
    };
    
    const tutor = tutors[tutorId];
    if (tutor) {
        const modal = document.getElementById('booking-modal');
        const modalContent = document.getElementById('modal-content');
        
        modalContent.innerHTML = `
            <div class="text-center mb-4">
                <h4 class="text-lg font-semibold text-gray-900">${tutor.name}</h4>
                <p class="text-sm text-gray-600">${tutor.subject}</p>
                <div class="flex justify-center text-yellow-400 my-2">${tutor.rating}</div>
                <p class="text-lg font-semibold text-blue-600">${tutor.price}</p>
            </div>
            <p class="text-gray-700 text-sm">${tutor.description}</p>
            <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Select Date & Time</label>
                <input type="datetime-local" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            </div>
        `;
        
        modal.classList.add('active');
    }
}

// Confirm booking
function confirmSessionBooking() {
    // Show success message
    showNotification('Session booked successfully! You will receive a confirmation email shortly.', 'success');
    
    // Close modal
    const modal = document.getElementById('booking-modal');
    modal.classList.remove('active');
    
    // Update user data
    currentUser.sessionsCompleted++;
    saveUserData();
}

// Dashboard Page initialization
function initializeDashboardPage() {
    initializeProgressChart();
    initializeGoalModal();
    initializeAchievements();
    loadDashboardData();
}

// Initialize progress chart
function initializeProgressChart() {
    const chartContainer = document.getElementById('progress-chart');
    if (!chartContainer || typeof echarts === 'undefined') return;
    
    const chart = echarts.init(chartContainer);
    
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Sessions', 'Hours Studied', 'Quizzes Completed']
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Sessions',
                type: 'line',
                data: [2, 3, 1, 4, 2, 3, 5],
                smooth: true,
                itemStyle: { color: '#3b82f6' }
            },
            {
                name: 'Hours Studied',
                type: 'line',
                data: [3, 4, 2, 5, 3, 4, 6],
                smooth: true,
                itemStyle: { color: '#10b981' }
            },
            {
                name: 'Quizzes Completed',
                type: 'line',
                data: [1, 2, 0, 3, 1, 2, 4],
                smooth: true,
                itemStyle: { color: '#f59e0b' }
            }
        ]
    };
    
    chart.setOption(option);
    
    // Handle period change
    const periodSelect = document.getElementById('progress-period');
    if (periodSelect) {
        periodSelect.addEventListener('change', (e) => {
            updateChartData(chart, e.target.value);
        });
    }
}

// Update chart data based on period
function updateChartData(chart, period) {
    let data, labels;
    
    switch(period) {
        case 'week':
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            data = {
                sessions: [2, 3, 1, 4, 2, 3, 5],
                hours: [3, 4, 2, 5, 3, 4, 6],
                quizzes: [1, 2, 0, 3, 1, 2, 4]
            };
            break;
        case 'month':
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            data = {
                sessions: [12, 15, 18, 20],
                hours: [15, 20, 25, 30],
                quizzes: [8, 12, 15, 18]
            };
            break;
        case 'year':
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            data = {
                sessions: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
                hours: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
                quizzes: [15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52]
            };
            break;
    }
    
    chart.setOption({
        xAxis: { data: labels },
        series: [
            { data: data.sessions },
            { data: data.hours },
            { data: data.quizzes }
        ]
    });
}

// Initialize goal modal
function initializeGoalModal() {
    const addGoalBtn = document.getElementById('add-goal-btn');
    const goalModal = document.getElementById('goal-modal');
    const closeGoalModal = document.getElementById('close-goal-modal');
    const saveGoal = document.getElementById('save-goal');
    const cancelGoal = document.getElementById('cancel-goal');
    
    if (addGoalBtn) {
        addGoalBtn.addEventListener('click', () => {
            goalModal.classList.remove('hidden');
        });
    }
    
    if (closeGoalModal) {
        closeGoalModal.addEventListener('click', () => {
            goalModal.classList.add('hidden');
        });
    }
    
    if (saveGoal) {
        saveGoal.addEventListener('click', () => {
            saveNewGoal();
        });
    }
    
    if (cancelGoal) {
        cancelGoal.addEventListener('click', () => {
            goalModal.classList.add('hidden');
        });
    }
}

// Save new goal
function saveNewGoal() {
    const title = document.getElementById('goal-title').value;
    const date = document.getElementById('goal-date').value;
    const category = document.getElementById('goal-category').value;
    
    if (!title || !date) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Add goal to dashboard (mock implementation)
    showNotification('Goal added successfully!', 'success');
    
    // Close modal and reset form
    const goalModal = document.getElementById('goal-modal');
    goalModal.classList.add('hidden');
    document.getElementById('goal-form').reset();
}

// Initialize achievements
function initializeAchievements() {
    const achievementBadges = document.querySelectorAll('.achievement-badge');
    
    achievementBadges.forEach(badge => {
        badge.addEventListener('click', () => {
            if (!badge.classList.contains('opacity-50')) {
                showAchievementDetails(badge);
            }
        });
    });
}

// Show achievement details
function showAchievementDetails(badge) {
    const title = badge.querySelector('p').textContent;
    showNotification(`Achievement: ${title} - Click to view details!`, 'info');
}

// Resources Page initialization
function initializeResourcesPage() {
    initializeResourceFilters();
    initializeCodingPlayground();
    initializeQuizSystem();
    loadResources();
}

// Initialize resource filters
function initializeResourceFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            filterResources();
        });
    });
    
    if (searchInput) {
        searchInput.addEventListener('input', filterResources);
    }
    
    if (difficultyFilter) {
        difficultyFilter.addEventListener('change', filterResources);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', filterResources);
    }
}

// Filter resources
function filterResources() {
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
    const difficulty = document.getElementById('difficulty-filter')?.value || 'all';
    const sortBy = document.getElementById('sort-filter')?.value || 'popular';
    
    // Filter logic would go here
    console.log('Filtering resources:', { searchTerm, difficulty, sortBy, currentFilter });
}

// Initialize coding playground
function initializeCodingPlayground() {
    const tabs = document.querySelectorAll('.tab');
    const runCodeBtn = document.getElementById('run-code');
    const resetCodeBtn = document.getElementById('reset-code');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.getAttribute('data-tab'));
        });
    });
    
    if (runCodeBtn) {
        runCodeBtn.addEventListener('click', runCode);
    }
    
    if (resetCodeBtn) {
        resetCodeBtn.addEventListener('click', resetCode);
    }
    
    // Auto-run code on load
    setTimeout(runCode, 1000);
}

// Switch coding tab
function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    const editors = document.querySelectorAll('.code-editor');
    
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        }
    });
    
    editors.forEach(editor => {
        editor.classList.add('hidden');
    });
    
    const activeEditor = document.getElementById(`${tabName}-editor`);
    if (activeEditor) {
        activeEditor.classList.remove('hidden');
    }
    
    currentTab = tabName;
}

// Run code
function runCode() {
    const html = document.querySelector('#html-editor textarea').value;
    const css = document.querySelector('#css-editor textarea').value;
    const js = document.querySelector('#js-editor textarea').value;
    
    const output = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}</script>
        </body>
        </html>
    `;
    
    const outputFrame = document.getElementById('output-frame');
    outputFrame.srcdoc = output;
}

// Reset code
function resetCode() {
    const defaultHTML = `<div class="container">
  <h1>Hello, World!</h1>
  <p>Welcome to TechLearn Hub!</p>
  <button onclick="showAlert()">Click Me</button>
</div>`;
    
    const defaultCSS = `.container {
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #3b82f6;
  margin-bottom: 10px;
}

button {
  background: #3b82f6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #2563eb;
}`;
    
    const defaultJS = `function showAlert() {
  alert('Hello from TechLearn Hub! 🚀');
}

console.log('Welcome to the coding playground!');`;
    
    document.querySelector('#html-editor textarea').value = defaultHTML;
    document.querySelector('#css-editor textarea').value = defaultCSS;
    document.querySelector('#js-editor textarea').value = defaultJS;
    
    runCode();
}

// Initialize quiz system
function initializeQuizSystem() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    const submitQuiz = document.getElementById('submit-quiz');
    
    quizOptions.forEach(option => {
        option.addEventListener('click', () => {
            quizOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });
    
    if (submitQuiz) {
        submitQuiz.addEventListener('click', submitQuizAnswer);
    }
}

// Submit quiz answer
function submitQuizAnswer() {
    const selectedOption = document.querySelector('.quiz-option.selected');
    const feedback = document.getElementById('quiz-feedback');
    
    if (!selectedOption) {
        showNotification('Please select an answer', 'error');
        return;
    }
    
    const isCorrect = selectedOption.getAttribute('data-answer') === 'correct';
    
    // Show feedback
    feedback.classList.remove('hidden');
    if (isCorrect) {
        feedback.className = 'mt-4 p-4 rounded-lg bg-green-100 border border-green-300 text-green-800';
        feedback.innerHTML = '<strong>Correct!</strong> The === operator performs strict equality comparison, checking both value and type.';
    } else {
        feedback.className = 'mt-4 p-4 rounded-lg bg-red-100 border border-red-300 text-red-800';
        feedback.innerHTML = '<strong>Incorrect.</strong> The === operator performs strict equality comparison, checking both value and type.';
    }
    
    // Disable further selections
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.style.pointerEvents = 'none';
        if (option.getAttribute('data-answer') === 'correct') {
            option.classList.add('correct');
        } else if (option.classList.contains('selected') && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    document.getElementById('submit-quiz').style.display = 'none';
}

// Load resources
function loadResources() {
    const resourcesGrid = document.getElementById('resources-grid');
    if (!resourcesGrid) return;
    
    const resources = [
        {
            id: 1,
            title: 'JavaScript Fundamentals',
            type: 'lessons',
            difficulty: 'beginner',
            rating: 4.8,
            duration: '2 hours',
            description: 'Learn the basics of JavaScript programming'
        },
        {
            id: 2,
            title: 'React Hooks Tutorial',
            type: 'videos',
            difficulty: 'intermediate',
            rating: 4.9,
            duration: '45 minutes',
            description: 'Master React hooks with hands-on examples'
        },
        {
            id: 3,
            title: 'Python Data Structures Quiz',
            type: 'quizzes',
            difficulty: 'beginner',
            rating: 4.6,
            duration: '15 minutes',
            description: 'Test your knowledge of Python data structures'
        },
        {
            id: 4,
            title: 'Build a Todo App',
            type: 'projects',
            difficulty: 'intermediate',
            rating: 4.7,
            duration: '3 hours',
            description: 'Create a fully functional todo application'
        },
        {
            id: 5,
            title: 'CSS Flexbox Cheat Sheet',
            type: 'cheatsheets',
            difficulty: 'beginner',
            rating: 4.9,
            duration: 'Reference',
            description: 'Quick reference for CSS flexbox properties'
        },
        {
            id: 6,
            title: 'Machine Learning Basics',
            type: 'lessons',
            difficulty: 'advanced',
            rating: 4.5,
            duration: '4 hours',
            description: 'Introduction to machine learning concepts'
        }
    ];
    
    resourcesGrid.innerHTML = resources.map(resource => `
        <div class="resource-card bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    ${resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                </span>
                <span class="text-sm text-gray-500">${resource.duration}</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">${resource.title}</h3>
            <p class="text-gray-600 mb-4">${resource.description}</p>
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <div class="flex text-yellow-400 text-sm mr-2">
                        ${'★'.repeat(Math.floor(resource.rating))}${'☆'.repeat(5 - Math.floor(resource.rating))}
                    </div>
                    <span class="text-sm text-gray-600">${resource.rating}</span>
                </div>
                <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    ${resource.difficulty}
                </span>
            </div>
            <a href="schedule.html" class="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block">
                Start Learning
            </a>
        </div>
    `).join('');
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${getNotificationClass(type)}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <span class="flex-1">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-gray-400 hover:text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationClass(type) {
    switch(type) {
        case 'success':
            return 'bg-green-100 border border-green-300 text-green-800';
        case 'error':
            return 'bg-red-100 border border-red-300 text-red-800';
        case 'warning':
            return 'bg-yellow-100 border border-yellow-300 text-yellow-800';
        default:
            return 'bg-blue-100 border border-blue-300 text-blue-800';
    }
}

// Data Management
function loadUserData() {
    const saved = localStorage.getItem('techlearn-user-data');
    if (saved) {
        currentUser = { ...currentUser, ...JSON.parse(saved) };
    }
}

function saveUserData() {
    localStorage.setItem('techlearn-user-data', JSON.stringify(currentUser));
}

function loadDashboardData() {
    // Load and display dashboard-specific data
    console.log('Loading dashboard data...');
}

// Export functions for global access
window.TechLearnHub = {
    showNotification,
    loadUserData,
    saveUserData
};