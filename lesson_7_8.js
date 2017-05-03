/* ! Подключать файл обязательно с атрибутом defer ! */

/*  ДЗ к 7-му уроку  */

// Создаём кнопку
var btn = document.createElement("button");
document.body.appendChild(btn);
btn.setAttribute("onclick", "generateChess()");
btn.innerHTML = "generateChess";

/* Функция, генерирующая шахматную доску */
function generateChess() {
  // Создаём таблицу
  var table = document.createElement("table");
  document.body.appendChild(table);

  // Передаём таблице стили
  var styleForTable = {
    border: "2px solid black",
    borderCollapse: "collapse",
    textAlign: "center",
    float: "left"
  };

  for (var key in styleForTable) table.style[key] = styleForTable[key];

  // Разбиваем таблицу на координаты и поле
  for (var i = 0; i < 10; i++) {
    var row = document.createElement("tr");
    table.appendChild(row);

    for (var j = 0; j < 10; j++) {
      var col = document.createElement("td");
      row.appendChild(col);
    }
  }

  // Передаём стили для ячеек поля
  var styleForCells = {width: "50px", height: "50px", verticalAlign: "bottom"};

  for (i = 1; i <= 8; i++) {
    for (j = 1; j <= 8; j++) {
      for (key in styleForCells) {
        table.rows[i].cells[j].style[key] = styleForCells[key];
      }

      if (i % 2 !== 0  &&  j % 2 !== 0) {
        table.rows[i].cells[j].style.backgroundColor = "#696969";
      } else if (i % 2 === 0  &&  j % 2 === 0) {
        table.rows[i].cells[j].style.backgroundColor = "#696969";
      }
    }
  }

  // Передаём стили для ячеек координат
  var styleForLetters = {height: "20px"};
  var styleForNumbers = {width: "20px"};

  for (key in styleForLetters) {
    table.rows[0].style[key] = styleForLetters[key];
    table.rows[9].style[key] = styleForLetters[key];
  }

  for (i = 0; i <= 9; i++) {
    for (key in styleForNumbers) {
      table.rows[i].cells[0].style[key] = styleForNumbers[key];
      table.rows[i].cells[9].style[key] = styleForNumbers[key];
    }
  }

  // Создаём буквенные и цифровые координаты + стили
  var letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  var numbers = ["8", "7", "6", "5", "4", "3", "2", "1"];

  for (i = 1; i <= 8; i++) {
    table.rows[0].cells[i].innerHTML = letters[i-1];
    table.rows[0].cells[i].style = "border-bottom: 1px solid black; transform: rotate(-180deg)";

    table.rows[9].cells[i].innerHTML = letters[i-1];
    table.rows[9].cells[i].style.borderTop = "1px solid black";

    table.rows[i].cells[0].innerHTML = numbers[i-1];
    table.rows[i].cells[0].style.borderRight = "1px solid black";

    table.rows[i].cells[9].innerHTML = numbers[i-1];
    table.rows[i].cells[9].style = "border-left: 1px solid black; transform: rotate(-180deg)";
  }

  // Расставляем фигуры
  var blackFigures = {
    pawn: "img/black_pawn.png",
    knight: "img/black_knight.png",
    bishop: "img/black_bishop.png",
    rook: "img/black_rook.png",
    queen: "img/black_queen.png",
    king: "img/black_king.png"
  };

  var whiteFigures = {
    pawn: "img/white_pawn.png",
    knight: "img/white_knight.png",
    bishop: "img/white_bishop.png",
    rook: "img/white_rook.png",
    queen: "img/white_queen.png",
    king: "img/white_king.png"
  };

  for (i = 1; i <= 8; i++) {
    for (j = 1; j <= 8; j++) {
      var img = document.createElement("img");

      switch (i) {
        case 1:
          img.className = "black";

          if (j === 1 || j === 8) {
            table.rows[i].cells[j].appendChild(img);
            img.setAttribute("src", blackFigures.rook);

          } else if (j === 2 || j === 7) {
            table.rows[i].cells[j].appendChild(img);
            img.setAttribute("src", blackFigures.knight);

          } else if (j === 3 || j === 6) {
            table.rows[i].cells[j].appendChild(img);
            img.setAttribute("src", blackFigures.bishop);

          } else if (j === 4) {
            table.rows[i].cells[j].appendChild(img);
            img.setAttribute("src", blackFigures.queen);

          } else if (j === 5) {
            table.rows[i].cells[j].appendChild(img);
            img.setAttribute("src", blackFigures.king);
          }
          break;

        case 2:
          img.className = "black";
          table.rows[i].cells[j].appendChild(img);
          img.setAttribute("src", blackFigures.pawn);
          break;

        case 7:
          img.className = "white";
          table.rows[i].cells[j].appendChild(img);
          img.setAttribute("src", whiteFigures.pawn);
          break;

        case 8:
          img.className = "white";

          if (j === 1 || j === 8) {
            table.rows[i].cells[j].appendChild(img);
            img.setAttribute("src", whiteFigures.rook);

          } else if (j === 2 || j === 7) {
            table.rows[i].cells[j].appendChild(img);
            img.setAttribute("src", whiteFigures.knight);

          } else if (j === 3 || j === 6) {
            table.rows[i].cells[j].appendChild(img);
            img.setAttribute("src", whiteFigures.bishop);

          } else if (j === 4) {
            table.rows[i].cells[j].appendChild(img);
            img.setAttribute("src", whiteFigures.queen);

          } else if (j === 5) {
            table.rows[i].cells[j].appendChild(img);
            img.setAttribute("src", whiteFigures.king);
          }
          break;
      }
    }
  }

  // Удаляем кнопку
  document.body.removeChild(btn);


  /*  ДЗ к 8-му уроку  */

  // Вывод координат + выделение клеток + обработка нажатия стрелок клавиатуры
  var div = document.createElement("div");
  document.body.appendChild(div);
  div.id = "coords";
  coords.style = "overflow: hidden; margin-top: 221px; padding-left: 20px";

  for (i = 1; i <= 8; i++) {
    for (j = 1; j <= 8; j++) {
      table.rows[i].cells[j].id = letters[j-1] + (9 - i);
      table.rows[i].cells[j].onmousedown = function() {showCoordsAndHighlight(this)};
    }
  }

  var selectedTd;

  function showCoordsAndHighlight(node) {
    if (selectedTd) {
      coords.value = null;
      selectedTd.style.outline = null;
    }
    coords.innerHTML = "Координаты: " + node.id;
    selectedTd = node;
    selectedTd.style.outline = "3px solid #1E90FF";
  }

  document.onkeydown = function(e) {
    e = e || window.event;
    var key = e.keyCode || e.which;

    switch (key) {
      case undefined:
        selectedTd = A8;
        break;

      case 37:
        if (selectedTd.cellIndex === 1) {
          showCoordsAndHighlight(selectedTd.parentNode.children[9]);
        }
        showCoordsAndHighlight(selectedTd.previousSibling);
        break;

      case 39:
        if (selectedTd.cellIndex === 8) {
          showCoordsAndHighlight(selectedTd.parentNode.children[0]);
        }
        showCoordsAndHighlight(selectedTd.nextSibling);
        break;

      case 38:
        if (selectedTd.parentNode.rowIndex === 1) {
          showCoordsAndHighlight(selectedTd.parentNode.parentNode.children[9].children[selectedTd.cellIndex]);
        }
        showCoordsAndHighlight(selectedTd.parentNode.previousSibling.children[selectedTd.cellIndex]);
        break;

      case 40:
        if (selectedTd.parentNode.rowIndex === 8) {
          showCoordsAndHighlight(selectedTd.parentNode.parentNode.children[0].children[selectedTd.cellIndex]);
        }
        showCoordsAndHighlight(selectedTd.parentNode.nextSibling.children[selectedTd.cellIndex]);
        break;

      case 46:
        deleteAndReturn(selectedTd);
        break;
    }
  };

  // Удаление и возврат фигур (двойной клик)
  var deleted = document.createElement("div");
  document.body.insertBefore(deleted, table);
  deleted.style = "width: 450px; height: 105px; margin-left: 8px";

  var deleted2 = document.createElement("div");
  document.body.appendChild(deleted2);
  deleted2.style = "width: 450px; height: 105px; margin-left: 8px; float: left; clear: both;";

  for (i = 1; i <= 8; i++) {
    for (j = 1; j <= 8; j++) {
      table.rows[i].cells[j].ondblclick = function() {deleteAndReturn(this)};
    }
  }

  var figureImg;

  function deleteAndReturn(elem) {
    figureImg = elem.children[0];

    if (figureImg) {
      if (figureImg.className === "black") {
        var deletedElem = deleted2.appendChild(figureImg);
        deletedElem.id = (selectedTd.parentNode.rowIndex * 10) +  selectedTd.cellIndex;
      }

      if (figureImg.className === "white") {
        deletedElem = deleted.appendChild(figureImg);
        deletedElem.id = (selectedTd.parentNode.rowIndex * 10) +  selectedTd.cellIndex;
      }
    }

    for (i = 0; deleted.childNodes[i]; i++) {
      deleted.childNodes[i].ondblclick = function() {returnElem(this)};
    }

    for (i = 0; deleted2.childNodes[i]; i++) {
      deleted2.childNodes[i].ondblclick = function() {returnElem(this)};
    }

    function returnElem(elem) {
      i = Math.floor(elem.id / 10);
      j = Math.abs( elem.id - (i * 10) );
      table.rows[i].cells[j].appendChild(elem);
    }
  }
}