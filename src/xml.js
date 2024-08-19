/**
 * Returns a map of a table, taking all colspans and rowspans into account.
 */
export function mapTable(table) {
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
          // don't try to make overlapping spans work
          if (matrix[yy][xx] === true) {
            throw "Cannot parse overlapping spans in table with eId " + table.getAttribute("eId");
          }
          matrix[yy][xx] = true;
        }
      }
    }
  }
  return matrix;
}

/**
 * Fixes a table by inserting missing rows and cells to match the table's matrix.
 */
export function fixTable(table) {
    // remove empty rows before starting
    for (let r = 0; r < table.children.length; r++) {
      let row = table.children[r];
      if (!row.children.length) {
        table.removeChild(row);
      }
    }

    let xmlns = table.namespaceURI,
        tableMap = mapTable(table),
        nMappedRows = Object.keys(tableMap).length;

    // add missing rows
    let nMissingRows = nMappedRows - table.children.length;
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

/**
 * Fixes all tables in a list of Akoma Ntoso XML elements.
 */
export function fixTables (elementList) {
  for (let i = 0; i < elementList.length; i++) {
    let tableList = elementList[i].querySelectorAll("table");
    for (let t = 0; t < tableList.length; t++) {
      fixTable(tableList[t]);
    }
  }
}
