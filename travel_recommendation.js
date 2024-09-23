const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
const newYorkTime = new Date().toLocaleTimeString('en-US', options);
console.log("Current time in New York:", newYorkTime);

let data = null;
function getData() {
    const url = "./travel_recommendation_api.json";
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
           
            return response.json(); 
        })
        .then(jsonData => {
            console.log(jsonData); 
            data = jsonData; 
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

getData(); 

function searchInData(query) {
    if (!data) {
        console.error('Data is not available yet');
        return [];
    }

    query = query.toLowerCase();
    let results = [];

    data.countries.forEach(country => {
        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(query)) {
                results.push({
                    type: 'City',
                    name: city.name,
                    description: city.description,
                    imageUrl: city.imageUrl
                });
            }
        });
    });

    data.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(query)) {
            results.push({
                type: 'Temple',
                name: temple.name,
                description: temple.description,
                imageUrl: temple.imageUrl
            });
        }
    });

    data.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(query)) {
            results.push({
                type: 'Beach',
                name: beach.name,
                description: beach.description,
                imageUrl: beach.imageUrl
            });
        }
    });

    console.log(results);

    return results;
}

function displayResults(results) {
    const resultDiv = document.getElementById('search_result');
    resultDiv.style.display = "flex"
    resultDiv.innerHTML = ''; 

    if (results.length === 0) {
        resultDiv.innerHTML = '<p>No results found</p>';
        return;
    }

    results.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search_card'
        resultItem.innerHTML = `
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <div class="search_card_description">
                        <h4>${item.type}: ${item.name}</h4>
                        <p>${item.description}</p>    
                    </div>
            
        `;
        resultDiv.appendChild(resultItem);
    });
}
function resetResult() {
    const resultDiv = document.getElementById('search_result');
    resultDiv.style.display = "none"
    resultDiv.innerHTML = ''; 

}

const queryInput = document.getElementById('search_bar');
const search = document.getElementById('search-btn');
const clear_search = document.getElementById('clear-btn');
search.addEventListener('click', function() {
    const query = queryInput.value
    const results = searchInData(query);
    displayResults(results)
});
clear_search.addEventListener('click', function() {
    queryInput.value =''
    resetResult()
});
