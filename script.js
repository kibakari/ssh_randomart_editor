const chars = [' ', '.', 'o', '+', '=', '*', 'B', 'O', 'X', '@', '%', '&', '#', '/', '^', 'S', 'E'];
const width = 17;
const height = 9;

function createGrid() {
    const container = document.getElementById('grid-container');
    const table = document.createElement('table');

    for (let y = 0; y < height; y++) {
        const tr = document.createElement('tr');
        for (let x = 0; x < width; x++) {
            const td = document.createElement('td');
            td.textContent = ' ';
            td.dataset.index = 0;
            td.addEventListener('click', () => {
                const idx = (parseInt(td.dataset.index, 10) + 1) % chars.length;
                td.dataset.index = idx;
                td.textContent = chars[idx];
            });
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    container.appendChild(table);
}

function clearGrid() {
    document.querySelectorAll('#grid-container td').forEach(td => {
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

document.getElementById('clear').addEventListener('click', clearGrid);
document.getElementById('export').addEventListener('click', exportArt);

createGrid();
