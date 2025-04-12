// User Registration
document.getElementById('registration-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();

    if (username && email) {
        alert(`Welcome, ${username}! Registration successful.`);
    } else {
        alert('Please fill in all required fields.');
    }
});

// Weather Dashboard with Dynamic Image
document.getElementById('get-weather').addEventListener('click', () => {
    const apiKey = '6c29d841f3580adee02b34b3e8c93011'; // Your OpenWeatherMap API key
    const city = 'Saint Louis';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const weatherResult = document.getElementById('weather-result');
    const weatherImage = document.createElement('img'); // Image element for weather
    weatherResult.textContent = 'Loading weather data...';

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Weather data not found');
            return response.json();
        })
        .then(data => {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            weatherResult.textContent = `Weather in ${data.name}: ${weatherDescription}, ${temperature}°C`;

            // Select appropriate weather image
            let imageSrc = '';
            if (weatherDescription.includes('cloud')) {
                imageSrc = 'images/cloudy.jpg'; // Path to cloudy image
            } else if (weatherDescription.includes('rain')) {
                imageSrc = 'images/rainy.jpg'; // Path to rainy image
            } else if (weatherDescription.includes('clear')) {
                imageSrc = 'images/sunny.jpg'; // Path to sunny image
            } else {
                imageSrc = 'images/default-weather.jpg'; // Default fallback image
            }

            weatherImage.src = imageSrc;
            weatherImage.alt = weatherDescription;
            weatherImage.className = 'weather-image';
            weatherResult.appendChild(weatherImage);
        })
        .catch(error => {
            console.error('Error:', error);
            weatherResult.textContent = 'Unable to fetch weather data.';
        });
});

// Currency Converter
document.getElementById('convert-currency').addEventListener('click', () => {
    const amount = document.getElementById('amount').value.trim();
    const from = document.getElementById('currency-from').value;
    const to = document.getElementById('currency-to').value;
    const apiKey = 'd570a4f5152f33fb00a842d3526efe08'; // Your API Key
    const url = `http://apilayer.net/api/live?access_key=${apiKey}&currencies=${to}&source=${from}&format=1`;

    const resultDiv = document.getElementById('conversion-result');
    resultDiv.textContent = 'Converting...';

    // Validate inputs
    if (!amount || isNaN(amount) || amount <= 0) {
        resultDiv.textContent = 'Enter a valid amount greater than 0.';
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch conversion data.');
            return response.json();
        })
        .then(data => {
            // Ensure the target currency exists in the response
            const exchangeRate = data.quotes[`${from}${to}`];
            if (exchangeRate) {
                const convertedAmount = (amount * exchangeRate).toFixed(2);
                resultDiv.textContent = `Converted Amount: ${convertedAmount} ${to}`;
            } else {
                resultDiv.textContent = 'Conversion data unavailable.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.textContent = 'Conversion failed. Please try again.';
        });
});


// Random Joke Generator
document.getElementById('get-joke').addEventListener('click', () => {
    const url = 'https://v2.jokeapi.dev/joke/Any';
    const jokeDisplay = document.getElementById('joke-display');
    jokeDisplay.textContent = 'Fetching joke...';

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Joke data not found');
            return response.json();
        })
        .then(data => {
            const joke = data.type === 'single' ? data.joke : `${data.setup} - ${data.delivery}`;
            jokeDisplay.textContent = joke;
        })
        .catch(error => {
            console.error('Error:', error);
            jokeDisplay.textContent = 'Unable to fetch joke.';
        });
});

// Task Tracker with Delete Functionality
document.getElementById('add-task').addEventListener('click', () => {
    const taskInput = document.getElementById('new-task');
    const task = taskInput.value.trim();
    const taskList = document.getElementById('task-list');

    if (task) {
        const listItem = document.createElement('li');
        listItem.textContent = task;

        // Add delete button for tasks
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-task';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(listItem);
        });

        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
        taskInput.value = '';
    } else {
        alert('Enter a valid task.');
    }
});
