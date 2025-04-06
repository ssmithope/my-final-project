// User Registration
document.getElementById('registration-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    alert(`Welcome, ${username}! Your email is ${email}.`);
});

// Weather Dashboard
document.getElementById('get-weather').addEventListener('click', () => {
    const apiKey = 'YOUR_API_KEY'; // Replace with OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = `Weather in ${data.name}: ${data.weather[0].description}, ${data.main.temp}°C`;
            document.getElementById('weather-result').textContent = weather;
        })
        .catch(error => console.error('Error fetching weather data:', error));
});

// Currency Converter
document.getElementById('convert-currency').addEventListener('click', () => {
    const amount = document.getElementById('amount').value;
    const from = document.getElementById('currency-from').value;
    const to = document.getElementById('currency-to').value;
    const apiKey = 'YOUR_API_KEY'; // Replace with CurrencyLayer API key
    const url = `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}&apikey=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('conversion-result').textContent = `Converted Amount: ${data.result} ${to}`;
        })
        .catch(error => console.error('Error fetching conversion data:', error));
});

// Random Joke Generator
document.getElementById('get-joke').addEventListener('click', () => {
    const url = 'https://v2.jokeapi.dev/joke/Any';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const joke = data.type === 'single' ? data.joke : `${data.setup} - ${data.delivery}`;
            document.getElementById('joke-display').textContent = joke;
        })
        .catch(error => console.error('Error fetching joke:', error));
});

// Task Tracker
document.getElementById('add-task').addEventListener('click', () => {
    const task = document.getElementById('new-task').value;
    if (task.trim()) {
        const list = document.getElementById('task-list');
        const listItem = document.createElement('li');
        listItem.textContent = task;
        list.appendChild(listItem);
        document.getElementById('new-task').value = '';
    } else {
        alert('Enter a valid task.');
    }
});
