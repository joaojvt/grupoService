const db = require('../database/connectoin');

class testeController {
  async index (req, res)  {
    const data = await db('BASE')
      .whereBetween('ID', [1, 2])
    return res.json(data)
  }
}

module.exports = testeController