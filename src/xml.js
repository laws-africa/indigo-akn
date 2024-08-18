/**
 * Fixes all tables in a list of Akoma Ntoso XML elements.
 */
export function fixTables (elementList) {
  function fixTable(table) {
    let xmlns = table.namespaceURI,
        tableMap = mapTable(table),
        nMappedRows = Object.keys(tableMap).length;

    // add missing rows
    let nMissingRows = nMappedRows - table.childNodes.length;
    for (let y = 0; y < nMissingRows; y++) {
      console.log("adding a missing row to table ", table.getAttribute('eId'));
      table.appendChild(document.createElementNS(xmlns, 'tr'));
    }

    // add missing cells
    let nMaxMappedColumns = Math.max(...Object.values(tableMap).map(r => Object.keys(r).length));
    for (let r = 0; r < table.children.length; r++) {
      let nMissingCells = nMaxMappedColumns - Object.keys(tableMap[r]).length,
          row = table.children[r];
      for (let m = 0; m < nMissingCells; m++) {
        console.log("adding a missing cell to table ", table.getAttribute('eId'), " row ", r);
        let cell = document.createElementNS(xmlns, 'td');
        cell.appendChild(document.createElementNS(xmlns, 'p'));
        row.appendChild(cell);
      }
    }
  }

  function mapTable(table) {
    let matrix = {},
        rows = table.children;

    for (let y = 0; y < rows.length; y++) {
      // set default
      if (!matrix[y]) {
        matrix[y] = {};
      }
      let row = rows[y];
      let cells = row.children;
      for (let x = 0; x < cells.length; x++) {
        // stash 'x' so we don't end the loop prematurely if it's incremented below
        let xPos = x;
        let cell = cells[x];
        // set default; increment xPos if needed (skip already occupied cells in current row)
        while (matrix[y][xPos]) {
          xPos += 1;
        }
        matrix[y][xPos] = {};
        // mark matrix elements occupied by current cell with true
        let colSpanTotal = xPos + Number(cell.getAttribute('colspan') || 1);
        let rowSpanTotal = y + Number(cell.getAttribute('rowspan') || 1);

        for (let xx = xPos; xx < colSpanTotal; xx++) {
          for (let yy = y; yy < rowSpanTotal; yy++) {
            if (!matrix[yy]) {
              matrix[yy] = {};
            }
            matrix[yy][xx] = true;
          }
        }
      }
    }
    return matrix;
  }

  for (let i = 0; i < elementList.length; i++) {
    let tableList = elementList[i].querySelectorAll("table");
    for (let t = 0; t < tableList.length; t++) {
      fixTable(tableList[t]);
    }
  }
}