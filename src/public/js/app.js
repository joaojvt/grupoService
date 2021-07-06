window.onload = async () => {
  graficoPizza() 
  graficoLinha()
  graficoColuna()
}

async function graficoPizza() {
  am4core.useTheme(am4themes_animated);
  const chart = am4core.create("grafico-pizza", am4charts.PieChart);

  const data = await buscaQuantidadeEstado()
  chart.data = data[0];
  
  const pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "quantidade";
  pieSeries.dataFields.category = "estado";
  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeOpacity = 1;

  pieSeries.hiddenState.properties.opacity = 1;
  pieSeries.hiddenState.properties.endAngle = -90;
  pieSeries.hiddenState.properties.startAngle = -90;

  chart.hiddenState.properties.radius = am4core.percent(0);
}


async function graficoLinha() {
  am4core.useTheme(am4themes_animated);
  const chart = am4core.create("grafico-linha", am4charts.XYChart);

  const data = await buscaCPCADiario()
  console.log(data[0]);
  chart.data = data[0];
  
  // Set input format for the dates
  chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

  // Create axes
  const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  // Create series
  const series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "quantidade";
  series.dataFields.dateX = "data";
  series.tooltipText = "{quantidade}"
  series.strokeWidth = 2;
  series.minBulletDistance = 15;

  // Drop-shaped tooltips
  series.tooltip.background.cornerRadius = 20;
  series.tooltip.background.strokeOpacity = 0;
  series.tooltip.pointerOrientation = "vertical";
  series.tooltip.label.minWidth = 40;
  series.tooltip.label.minHeight = 40;
  series.tooltip.label.textAlign = "middle";
  series.tooltip.label.textValign = "middle";

  // Make bullets grow on hover
  const bullet = series.bullets.push(new am4charts.CircleBullet());
  bullet.circle.strokeWidth = 2;
  bullet.circle.radius = 4;
  bullet.circle.fill = am4core.color("#fff");

  const bullethover = bullet.states.create("hover");
  bullethover.properties.scale = 1.3;

  // Make a panning cursor
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.behavior = "panXY";
  chart.cursor.xAxis = dateAxis;
  chart.cursor.snapToSeries = series;

  // Create vertical scrollbar and place it before the value axis
  chart.scrollbarY = new am4core.Scrollbar();
  chart.scrollbarY.parent = chart.leftAxesContainer;
  chart.scrollbarY.toBack();

  // Create a horizontal scrollbar with previe and place it underneath the date axis
  chart.scrollbarX = new am4charts.XYChartScrollbar();
  chart.scrollbarX.series.push(series);
  chart.scrollbarX.parent = chart.bottomAxesContainer;

  dateAxis.start = 0.79;
  dateAxis.keepSelection = true;

}

async function graficoColuna() {
  am4core.useTheme(am4themes_animated);
  const chart = am4core.create("grafico-coluna", am4charts.XYChart);
  chart.scrollbarX = new am4core.Scrollbar();

  const data = await mediaProdutoValor()
  chart.data = data[0];
  
  // Create axes
  const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "produto";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 30;
  categoryAxis.renderer.labels.template.horizontalCenter = "right";
  categoryAxis.renderer.labels.template.verticalCenter = "middle";
  categoryAxis.renderer.labels.template.rotation = 270;
  categoryAxis.tooltip.disabled = true;
  categoryAxis.renderer.minHeight = 110;

  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.renderer.minWidth = 50;

  // Create series
  const series = chart.series.push(new am4charts.ColumnSeries());
  series.sequencedInterpolation = true;
  series.dataFields.valueY = "valor";
  series.dataFields.categoryX = "produto";
  series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
  series.columns.template.strokeWidth = 0;

  series.tooltip.pointerOrientation = "vertical";

  series.columns.template.column.cornerRadiusTopLeft = 10;
  series.columns.template.column.cornerRadiusTopRight = 10;
  series.columns.template.column.fillOpacity = 0.8;

  // on hover, make corner radiuses bigger
  const hoverState = series.columns.template.column.states.create("hover");
  hoverState.properties.cornerRadiusTopLeft = 0;
  hoverState.properties.cornerRadiusTopRight = 0;
  hoverState.properties.fillOpacity = 1;

  series.columns.template.adapter.add("fill", function(fill, target) {
    return chart.colors.getIndex(target.dataItem.index);
  });

  // Cursor
  chart.cursor = new am4charts.XYCursor();

}

async function buscaQuantidadeEstado(){
  const resultado = await fetch('/api/alo-por-estado')
  return await resultado.json();
}

async function buscaCPCADiario(){
  const resultado = await fetch('/api/cpca-diario')
  return await resultado.json();
}

async function mediaProdutoValor(){
  const resultado = await fetch('/api/media-produto-valor')
  return await resultado.json();
}