const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    try {
        const { data } = await axios.get('https://www.adexpartners.com/team.html');

        const $ = cheerio.load(data);
        const teamMembers = [];

        $('.imagegallery__item').each((i, elem) => {
            teamMembers.push({
                image: $(elem).find('img').attr('src'),
                name: $(elem).find('.imagegallery__title').text(),
                info: $(elem).find('.imagegallery__description').text(),
            });
        });

        res.json(teamMembers);
    } catch (error) {
        res.json({ error: error.toString() });
    }
};
