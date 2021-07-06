const express = require('express');
const routes = express.Router()

const GraficosController = require('./controller/GraficosController')

const grafico =  new GraficosController()

routes.get('/alo-por-estado', grafico.aloPorEstado)
routes.get('/cpca-diario', grafico.CPCADiario)
routes.get('/media-produto-valor', grafico.mediaProdutoValor)

module.exports = routes