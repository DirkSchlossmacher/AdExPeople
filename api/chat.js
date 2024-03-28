const OpenAI = require('openai');

const openai = new OpenAI(process.env.OPENAI_API_KEY);

module.exports = async (req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: req.body.messages,
            stream: true,
        });

        for await (const chunk of completion) {
            res.write(chunk.choices[0].delta.content);
        }

        res.end();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: 'Error calling OpenAI API' });
    }
};