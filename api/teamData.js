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
                link: $(elem).find('a').attr('href'),
            });
        });

        $('.teasers__item').each((i, elem) => {
            teamMembers.push({
                image: $(elem).find('img').attr('src'),
                name: $(elem).find('.m-0').text(),
                info: $(elem).find('.mb-0').text(),
                link: $(elem).find('.fadein-img-hover').attr('href'),
            });
        });
        res.json(teamMembers);
    } catch (error) {
        res.json({ error: error.toString() });
    }
};
