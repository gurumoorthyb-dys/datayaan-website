const url = "http://127.0.0.1:1337/api/home-page?populate[heroBackgroundImages][fields][0]=url&populate[clientLogos][fields][0]=url&populate[products][populate][image][fields][0]=url";

console.log(`Fetching from ${url}...`);

fetch(url)
    .then(res => {
        console.log("Response status:", res.status);
        return res.json();
    })
    .then(data => {
        console.log("Data received:", JSON.stringify(data).substring(0, 100) + "...");
    })
    .catch(err => {
        console.error("Fetch failed:", err);
        if (err.cause) console.error("Cause:", err.cause);
    });
