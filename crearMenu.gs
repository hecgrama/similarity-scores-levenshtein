function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Funciones IA 🤖')
      .addItem('Ejecutar calculo similitud títulos', 'similarityScores')
            .addToUi();
} //Inserta un menú en la hoja de calculo activa que ejecuta la función similarityScores 
