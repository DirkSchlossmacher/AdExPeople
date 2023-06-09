const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    const { data } = await axios.get('https://www.adexpartners.com/team.html');

    const $ = cheerio.load(data);
    const teamMembers = [];

    $('.team-member').each((i, elem) => {
        teamMembers.push({
            image: $(elem).find('img').attr('src'),
            name: $(elem).find('.name').text(),
            info: $(elem).find('.info').text(),
        });
    });

    res.json(teamMembers);
};
