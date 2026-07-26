// Define common headers for API requests
const headers = {
    "Accept": "application/json",
    "Content-type": "application/json",
};

// Function to join base URL and endpoint URL
function joinUrl(baseUrl, url) {
    return `${baseUrl}/${url}`;
}

// Class representing a generic API service
class Service {

    // Constructor to set the API domain
    constructor() {
        this.domain = '';
    }
    
    // Generic method for making API requests
    request(url, method = "POST", data = null) {

        // Join the provided URL with the base domain
        url = joinUrl(this.domain, url);

        // Configure request options
        const options = {
            headers,
            method,
        };

        // Include request body if data is provided
        if (data) {
            options.body = JSON.stringify(data);
        }

        return fetch(url, options);
    }

    // Method for making a POST request
    post(url, data) {
        const method = "POST";
        return this.request(url, method, data).then(res => res.json());
    }

    // Method for making a GET request
    get(url, id) {
        const method = "GET";
        // Append ID to the URL if provided
        if (id) {
            url = `${url}/${id}`;
        }
        return this.request(url, method).then(res => res.json());
    }

    // Method for making a DELETE request
    delete(url, id) {
        const method = "DELETE";
        // Append ID to the URL if provided
        if (id) {
            url = `${url}/${id}`;
        }
        return this.request(url, method).then(res => res.json());
    }

    // Method for making a PUT request
    put(url, data) {
        const method = "PUT";
        return this.request(url, method, data).then(res => res.json());
    }
}

// Export the Service class for external use
export default Service;
