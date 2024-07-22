document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');

    // Check if forms are correctly loaded
    if (!signupForm || !signinForm) {
        console.error('Signup or Signin form not found');
        return;
    }

    signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });

// Handle Sign Up Form Submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (!username || !password) {
        console.error('All fields are required');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', { // Actualiza la URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Error creating user');
        }

        alert('User created successfully');
        window.location.href = 'index.html';  // Redirect to index.html after successful signup
    } catch (error) {
        console.error('Error:', error);
        alert('Error creating user');
    }
});

    // Handle Sign In Form Submission
    signinForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('signin-username').value;
        const password = document.getElementById('signin-password').value;

        if (!username || !password) {
            console.error('All fields are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);  // Store the token in localStorage
            window.location.href = 'home.html';  // Redirect to home.html after successful login
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Error logging in');
        }
    });
});
