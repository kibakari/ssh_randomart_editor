const chars = [' ', '.', 'o', '+', '=', '*', 'B', 'O', 'X', '@', '%', '&', '#', '/', '^', 'S', 'E'];
const drawWidth = 17;
const drawHeight = 9;
const width = drawWidth + 2;
const height = drawHeight + 2;

let headerInput = null;
let captionInput = null;

let currentChar = chars[1];
let isPainting = false;

function createGrid() {
    const container = document.getElementById('grid-container');
    const table = document.createElement('table');

    const headerText = (headerInput && headerInput.value) ? headerInput.value : 'ABCDEFGHI';

    const headerRow = (`+---[${headerText.padEnd(9, ' ').slice(0, 9)}]---+`).split('');

    for (let y = 0; y < height; y++) {
        const tr = document.createElement('tr');
        for (let x = 0; x < width; x++) {
            const td = document.createElement('td');
            let editable = false;
            let ch = ' ';

            if (y === 0) {
                ch = headerRow[x];
                td.classList.add('border');
            } else if (y === height - 1 && (x === 0 || x === width - 1)) {
                ch = '+';
                td.classList.add('border');
            } else if (y === height - 1) {
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
    const name = captionInput.value.slice(0, 12);
    const captionLine = name ? `The ${name}'s randomart image is:` : 'The randomart image is:';
    document.getElementById('output').textContent = `${captionLine}\n${art}`;
}

function updateHeader() {
    const headerText = headerInput.value.padEnd(9, ' ').slice(0, 9);


    const headerRow = `+---[${headerText}]---+`;
  
    const cells = document.querySelectorAll('#grid-container tr:first-child td');
    cells.forEach((td, i) => {
        td.textContent = headerRow[i] || ' ';
    });
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

function loadGallery() {
    if (typeof galleryArts === 'undefined') {
        return;
    }

    const galleryEl = document.getElementById('gallery');
    const count = Math.min(5, galleryArts.length);
    const used = new Set();
    for (let i = 0; i < count; i++) {
        let idx;
        do {
            idx = Math.floor(Math.random() * galleryArts.length);
        } while (used.has(idx) && used.size < galleryArts.length);
        used.add(idx);

        const item = document.createElement('div');
        item.className = 'gallery-item';

        const caption = document.createElement('div');
        caption.className = 'gallery-caption';
        caption.textContent = galleryArts[idx].caption || `The ${galleryArts[idx].author}'s randomart image is:`;
        item.appendChild(caption);

        const pre = document.createElement('pre');
        pre.className = 'gallery-art';
        pre.textContent = galleryArts[idx].art;
        item.appendChild(pre);

        const author = document.createElement('div');
        author.className = 'gallery-author';
        author.textContent = galleryArts[idx].author;
        item.appendChild(author);

        galleryEl.appendChild(item);
    }
}

headerInput = document.getElementById('header-input');
captionInput = document.getElementById('caption-input');
document.getElementById('clear').addEventListener('click', clearGrid);
document.getElementById('export').addEventListener('click', exportArt);
headerInput.addEventListener('input', updateHeader);

createPalette();
createGrid();
updateHeader();
loadGallery();
