const chars = [' ', '.', 'o', '+', '=', '*', 'B', 'O', 'X', '@', '%', '&', '#', '/', '^', 'S', 'E'];
const drawWidth = 17;
const drawHeight = 9;
const width = drawWidth + 2;
const height = drawHeight + 2;

let currentChar = chars[1];
let isPainting = false;

function createGrid() {
    const container = document.getElementById('grid-container');
    const table = document.createElement('table');

    for (let y = 0; y < height; y++) {
        const tr = document.createElement('tr');
        for (let x = 0; x < width; x++) {
            const td = document.createElement('td');
            let editable = false;
            let ch = ' ';

            if ((y === 0 || y === height - 1) && (x === 0 || x === width - 1)) {
                ch = '+';
                td.classList.add('border');
            } else if (y === 0 || y === height - 1) {
                ch = '-';
                td.classList.add('border');
            } else if (x === 0 || x === width - 1) {
                ch = '|';
                td.classList.add('border');
            } else {
                editable = true;
                td.dataset.index = 0;
            }

            td.textContent = ch;

            if (editable) {
                td.dataset.editable = 'true';
                td.addEventListener('mousedown', () => {
                    isPainting = true;
                    setCellChar(td);
                });
                td.addEventListener('mouseover', () => {
                    if (isPainting) {
                        setCellChar(td);
                    }
                });
            }

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    container.appendChild(table);
    document.addEventListener('mouseup', () => { isPainting = false; });
}

function setCellChar(td) {
    td.textContent = currentChar;
    td.dataset.index = chars.indexOf(currentChar);
}

function clearGrid() {
    document.querySelectorAll('#grid-container td[data-editable="true"]').forEach(td => {
        td.textContent = ' ';
        td.dataset.index = 0;
    });
    document.getElementById('output').textContent = '';
}

function exportArt() {
    let art = '';
    const rows = document.querySelectorAll('#grid-container tr');
    rows.forEach(row => {
        row.querySelectorAll('td').forEach(td => {
            art += td.textContent;
        });
        art += '\n';
    });
    document.getElementById('output').textContent = art;
}

function createPalette() {
    const palette = document.getElementById('palette');
    chars.forEach(ch => {
        const btn = document.createElement('button');
        btn.textContent = ch === ' ' ? 'Space' : ch;
        btn.addEventListener('click', () => {
            currentChar = ch;
            document.querySelectorAll('#palette button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
        palette.appendChild(btn);
    });
    if (palette.firstChild) {
        palette.firstChild.classList.add('active');
    }
}

document.getElementById('clear').addEventListener('click', clearGrid);
document.getElementById('export').addEventListener('click', exportArt);

createPalette();
createGrid();
