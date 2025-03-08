var contador = 0;
var colorTablero = {
    claro: '#fecfa0',
    oscuro: '#d28c45'
};

function estaEnLineaDeAtaque(celda, r, c) {
    var tablero = document.getElementById("tablero");
    
    // Verificar fila y columna
    for (let i = 0; i < 8; i++) {
        if (tablero.rows[r].cells[i].querySelector('.reina') && i !== c) return true;
        if (tablero.rows[i].cells[c].querySelector('.reina') && i !== r) return true;
    }
    
    // Verificar diagonales
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (Math.abs(i - r) === Math.abs(j - c) && 
                tablero.rows[i].cells[j].querySelector('.reina') && 
                (i !== r || j !== c)) {
                return true;
            }
        }
    }
    
    return false;
}

function mostrarReina(celda) {
    var r = celda.parentNode.rowIndex;
    var c = celda.cellIndex;
    
    if (!celda.querySelector('.reina')) {
        if (contador < 8 && !estaEnLineaDeAtaque(celda, r, c)) {
            let imagenSeleccionada = document.getElementById("selectImagen").value;
            let reinaDiv = document.createElement('div');
            reinaDiv.className = 'reina';
            reinaDiv.style.backgroundImage = `url('./img/${imagenSeleccionada}.png')`;
            celda.appendChild(reinaDiv);
            contador++;
        }
    } else {
        celda.querySelector('.reina').remove();
        contador--;
    }
}

function cambiarColor(r, c) {
    var celda = document.getElementById("tablero");
    var r1 = r, c1 = c, r2 = r, c2 = c;
    var r3 = r, c3 = c, r4 = r, c4 = c;
    var colorAtaque = document.getElementById("colorAtaque").value;

    for (let i = 0; i < 8; i++) {
        celda.rows[r].cells[i].style.backgroundColor = colorAtaque;
        celda.rows[i].cells[c].style.backgroundColor = colorAtaque;

        if (r1 < 8 && c1 < 8)
            celda.rows[r1++].cells[c1++].style.backgroundColor = colorAtaque;

        if (r2 > -1 && c2 < 8)
            celda.rows[r2--].cells[c2++].style.backgroundColor = colorAtaque;

        if (r3 > -1 && c3 > -1)
            celda.rows[r3--].cells[c3--].style.backgroundColor = colorAtaque;

        if (r4 < 8 && c4 > -1)
            celda.rows[r4++].cells[c4--].style.backgroundColor = colorAtaque;
    }
}

function cambiarImagenReina() {
    let imagenSeleccionada = document.getElementById("selectImagen").value;
    document.querySelectorAll('.reina').forEach(reina => {
        reina.style.backgroundImage = `url('./img/${imagenSeleccionada}.png')`;
    });
}

function limpiar() {
    document.querySelectorAll("td").forEach(td => {
        td.style.backgroundColor = td.dataset.color;
    });
}

function reiniciarTablero() {
    contador = 0;
    document.getElementById("solucionSelect").value = "";
    document.querySelectorAll('.reina').forEach(reina => reina.remove());
    document.querySelectorAll("td").forEach(td => {
        td.style.backgroundColor = td.dataset.color;
    });
}

function cambiarColorTablero() {
    colorTablero.claro = document.getElementById("colorClaro").value;
    colorTablero.oscuro = document.getElementById("colorOscuro").value;
    
    document.querySelectorAll("tr:nth-child(even) td:nth-child(even), tr:nth-child(odd) td:nth-child(odd)").forEach(td => {
        td.style.backgroundColor = colorTablero.claro;
        td.dataset.color = colorTablero.claro;
    });
    
    document.querySelectorAll("tr:nth-child(odd) td:nth-child(even), tr:nth-child(even) td:nth-child(odd)").forEach(td => {
        td.style.backgroundColor = colorTablero.oscuro;
        td.dataset.color = colorTablero.oscuro;
    });
}

function aplicarSolucion(posiciones) {
    reiniciarTablero();
    let imagenSeleccionada = document.getElementById("selectImagen").value;
    
    posiciones.forEach(pos => {
        let celda = document.getElementById("tablero").rows[pos[0]].cells[pos[1]];
        let reinaDiv = document.createElement('div');
        reinaDiv.className = 'reina';
        reinaDiv.style.backgroundImage = `url('./img/${imagenSeleccionada}.png')`;
        celda.appendChild(reinaDiv);
    });
    contador = 8;
}

function solucion1() {
    aplicarSolucion([
        [0,3], [1,6], [2,2], [3,7],
        [4,1], [5,4], [6,0], [7,5]
    ]);
}

function solucion2() {
    aplicarSolucion([
        [0,4], [1,1], [2,3], [3,6],
        [4,2], [5,7], [6,5], [7,0]
    ]);
}

function solucion3() {
    aplicarSolucion([
        [0,3], [1,1], [2,6], [3,2],
        [4,5], [5,7], [6,4], [7,0]
    ]);
}

function cambiarSolucion(solucion) {
    if (solucion === "solucion1") {
        solucion1();
    } else if (solucion === "solucion2") {
        solucion2();
    } else if (solucion === "solucion3") {
        solucion3();
    }
}

// Inicializar los colores del tablero cuando se carga la página
window.onload = function() {
    document.querySelectorAll("td").forEach(td => {
        td.dataset.color = window.getComputedStyle(td).backgroundColor;
    });
};