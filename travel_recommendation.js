const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
const newYorkTime = new Date().toLocaleTimeString('en-US', options);
console.log("Current time in New York:", newYorkTime);


 function getData() {
    const url = "./travel_recommendation_api.json";
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON data
        })
        .then(data => {
            console.log(data); // Process the JSON data
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}


getData()