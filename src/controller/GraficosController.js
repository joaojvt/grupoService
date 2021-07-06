const db = require('../database/connectoin');

class GraficosController {
  async aloPorEstado(req, res){
    const data = await db.raw(`
      SELECT sum(ALO) as quantidade, estado
      FROM BASE
      WHERE  estado IS NOT NULL
      GROUP BY estado
      ORDER BY estado`
    )

      if (!data) {
        return res.status(400).json({ messege: 'Empty!' })
      }
      return res.json(data);
  }

  async CPCADiario (req, res){
    const data = await db.raw(`
        SELECT data, sum(cpca) as quantidade
        from BASE 
        group by DATA`
    )

      if (!data) {
        return res.status(400).json({ messege: 'Empty!' })
      }
      return res.json(data);
  }

  async mediaProdutoValor (req, res){
    const data = await db.raw(`
      SELECT produto, AVG(valor) as valor 
      from BASE 
      group by produto`
    )

      if (!data) {
        return res.status(400).json({ messege: 'Empty!' })
      }
      return res.json(data);
  }
}

module.exports = GraficosController
