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

        $('.teasers__item w-100 mb-5').each((i, elem) => {
            teamMembers.push({
                image: $(elem).find('img').attr('src'),
                name: $(elem).find('.m-0 style-text-link text-break').text(),
                info: $(elem).find('.mb-0 mt-1 text-break').text(),
            });
        });
        res.json(teamMembers);
    } catch (error) {
        res.json({ error: error.toString() });
    }
};
