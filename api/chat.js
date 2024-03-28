const https = require('https');

module.exports = (req, res) => {
    const options = {
        hostname: 'api.openai.com',
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
    };

    const proxy = https.request(options, (response) => {
        response.on('data', (chunk) => {
            // Send each chunk to the client as soon as it arrives
            res.write(chunk);
        });

        response.on('end', () => {
            // End the response when the OpenAI API response ends
            res.end();
        });
    });

    proxy.on('error', (error) => {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: 'Error calling OpenAI API' });
    });

    // Write the request data to the proxy request
    proxy.write(JSON.stringify(req.body));
    proxy.end();
};
