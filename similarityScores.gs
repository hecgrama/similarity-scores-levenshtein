function similarityScores() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var texts = data.map(function(row) { return row[1]; }); // El valor de row[] indica el indice de columna, siendo 0 la columna A
  var apiKey = "Insert-here-your-openAI-API-Key";
  var url = "https://api.openai.com/v1/engines/davinci-codex/completions";
  var options = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    "muteHttpExceptions": true
  };
  var scores = [];
  for (var i = 0; i < texts.length; i++) {
    var text1 = texts[i];
    var similarities = [];
    for (var j = 0; j < texts.length; j++) {
      var text2 = texts[j];
      if (text1 != text2) {
        var distance = levenshteinDistance(text1, text2);
        var similarity = 1 - distance / Math.max(text1.length, text2.length);
        similarities.push(similarity);
      }
    }
    var avgSimilarity = similarities.reduce(function(a, b) { return a + b; }, 0) / similarities.length;
    scores.push(avgSimilarity);
  }
  for (var i = 0; i < scores.length; i++) {
    sheet.getRange(i + 1, 3).setValue(scores[i]); // el último parámetro de get.Range() especifica la columna en la que devuelvo los datos
  }
}

// Función para calcular la distancia de Levenshtein
function levenshteinDistance(a, b) {
  var matrix = [];
  for (var i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (var j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (var i = 1; i <= b.length; i++) {
    for (var j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1,
                                Math.min(matrix[i][j - 1] + 1,
                                         matrix[i - 1][j] + 1));
      }
    }
  }
  return matrix[b.length][a.length];
}

