const API_URL = "http://localhost:5000/api/donors";

// Register donor
async function registerDonor(data) {

    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.json();
}

// Get donors
async function getDonors() {

    const res = await fetch(API_URL);

    return res.json();
}