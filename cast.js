document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-btn');
    const cityInput = document.getElementById('city');
    const weatherInfo = document.getElementById('weather-info');
    const errorMessage = document.getElementById('error-message');
    const loadingIndicator = document.getElementById('loading');
    const weatherIcon = document.getElementById('weather-icon');
    const adviceText = document.getElementById('advice-text');
    const adviceSection = document.getElementById('advice');

    // Initially hide advice section
    adviceSection.style.display = 'none';

    searchButton.addEventListener('click', function() {
        const cityName = cityInput.value.trim();
        if (!cityName) {
            errorMessage.textContent = 'Please enter a city name.';
            errorMessage.classList.remove('hidden');
            return;
        }
        
        // Clear previous data
        weatherInfo.style.display = 'none';
        errorMessage.classList.add('hidden');
        adviceSection.style.display = 'none';
        loadingIndicator.style.display = 'block';

        fetchWeatherData(cityName);
    });

    function fetchWeatherData(city) {
        const apiKey = '901eb0d9bb841d118d8a4713a295d1fc'; // Replace with your API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                loadingIndicator.style.display = 'none';
                if (data.cod !== 200) {
                    errorMessage.textContent = data.message || 'Unable to fetch weather data.';
                    errorMessage.classList.remove('hidden');
                    return;
                }
                displayWeatherInfo(data);
            })
            .catch(error => {
                loadingIndicator.style.display = 'none';
                errorMessage.textContent = 'An error occurred while fetching the weather data.';
                errorMessage.classList.remove('hidden');
            });
    }

    function displayWeatherInfo(data) {
        const { name, main, weather, wind, humidity } = data;

        // Display the city name
        const cityName = document.getElementById('city-name');
        cityName.textContent = name;

        // Display weather icon
        const iconId = weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconId}.png`;
        weatherIcon.style.display = 'block';
        const weatherIconImg = document.getElementById('weather-icon-img');
        weatherIconImg.src = iconUrl;

        // Display temperature
        const temp = document.getElementById('temp');
        temp.textContent = `${main.temp}°C`;

        // Display condition
        const condition = document.getElementById('condition');
        condition.textContent = weather[0].description;

        // Display wind speed
        const windSpeed = document.getElementById('wind');
        windSpeed.textContent = `Wind Speed: ${wind.speed} m/s`;

        // Display humidity
        const humidityElement = document.getElementById('humidity');
        humidityElement.textContent = `Humidity: ${humidity}%`;

        // Call function to display weather advice based on conditions
        displayWeatherAdvice(weather[0].main, main.temp);
        
        // Show weather info section
        weatherInfo.style.display = 'block';
    }

    function displayWeatherAdvice(condition, temp) {
        let adviceMessage = '';

        // Prioritize rain first
        if (condition === 'Rain') {
            adviceMessage = 'It\'s raining! Make sure to take an umbrella with you.';
        } 
        // Then check for thunderstorm
        else if (condition === 'Thunderstorm') {
            adviceMessage = 'There\'s a storm! Stay safe indoors.';
        } 
        // Then check for snow
        else if (condition === 'Snow') {
            adviceMessage = 'It\'s snowy! Wear warm clothes and be cautious on the roads.';
        }
        // Then check for high wind speed
        else if (condition === 'Wind') {
            adviceMessage = 'It\'s windy outside! Be cautious and avoid outdoor activities if possible.';
        }
        // Then check for clouds
        else if (condition === 'Clouds') {
            adviceMessage = 'It\'s cloudy! Consider carrying an umbrella just in case.';
        }
        // Then check for clear weather
        else if (condition === 'Clear') {
            adviceMessage = 'It\'s a bright day! Enjoy the outdoors.';
        }

        // If no condition-based advice was applied, then apply temperature-based advice
        if (adviceMessage === '') {
            if (temp <= 0) {
                adviceMessage = 'Be sure to dress warmly, it\'s freezing outside!';
            } else if (temp > 0 && temp <= 15) {
                adviceMessage = 'A jacket would be a good idea today.';
            } else if (temp > 15 && temp <= 25) {
                adviceMessage = 'A comfortable day! Dress lightly.';
            } else {
                adviceMessage = 'It\'s hot outside! Stay hydrated and wear sunscreen.';
            }
        }

        // Display the final message
        console.log(adviceMessage); // Debugging to check if message is correct
        adviceText.textContent = adviceMessage;
        adviceSection.style.display = 'block';  // Show the advice section
    }

    // Function to toggle the contact form
    window.toggleContactForm = function() {
        const contactForm = document.getElementById('contact-form');
        contactForm.classList.toggle('hidden');
    };
});
