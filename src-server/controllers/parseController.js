const { scrapeWebsite } = require('../parser/parser');




class parseController {
  async getParse(req, res) {
    res.json({message: 'get'})
  };

   async postParse(req, res) {
    const {url} = req.body
    // console.log(url)
    try {
      const scrapedItem = await scrapeWebsite(url)
      res.json(scrapedItem)
    } catch (error) {
      res.status(500).json({ message: 'Ошибка1' });
    }
  
  
  };
}

module.exports = new parseController() 