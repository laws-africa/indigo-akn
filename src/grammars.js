import { tableToAkn } from "./html";

/**
 * Base class for grammar models.
 */
export class GrammarModel {
  constructor (frbrUri, xslUrl) {
    this.frbrUri = frbrUri;
    this.xslUrl = xslUrl;
    this.language_id = null;
    this.language_def = {};
    this.theme_id = null;
    this.theme_def = {
      base: 'vs',
      inherit: true,
    };
  }

  monacoOptions () {
    this.installLanguage();

    return {
      codeLens: false,
      detectIndentation: false,
      foldingStrategy: 'indentation',
      language: this.language_id,
      lineDecorationsWidth: 0,
      lineNumbersMinChars: 3,
      roundedSelection: false,
      scrollBeyondLastLine: false,
      showFoldingControls: 'always',
      tabSize: 2,
      wordWrap: 'on',
      theme: this.theme_id,
      wrappingIndent: 'same',
    };
  }

  /**
   * Setup the grammar for a particular document model.
   *
   * Returns a Promise that can be waited upon to indicate that the setup is completed.
   */
  setup () {
    // setup akn to text transform
    return new Promise(resolve => {
      fetch(new Request(this.xslUrl)).then(response => {
        if (response.ok) {
          response.text().then(text => {
            const xml = new DOMParser().parseFromString(text, 'text/xml');
            this.textTransform = new XSLTProcessor();
            this.textTransform.importStylesheet(xml);
            resolve();
          })
        }
      });
    });
  }

  /**
   * Unparse an XML element into a string.
   */
  xmlToText (element) {
    return this.textTransform
      .transformToFragment(element, document)
      .firstChild.textContent
      // remove multiple consecutive blank lines
      .replace(/^( *\n){2,}/gm, "\n");
  }

  /**
   * Configure a new instance of a Monaco editor.
   */
  setupEditor (editor) {
    this.installActions(editor);
    this.setupTablePasting(editor);
  }

  installLanguage () {
    monaco.languages.register({ id: this.language_id });
    monaco.languages.setMonarchTokensProvider(this.language_id, this.language_def);
    monaco.editor.defineTheme(this.theme_id, this.theme_def);
  }

  /**
   * Install named actions on the editor. Subclasses should install at least these actions:
   *
   * * format.bold
   * * format.italics
   * * format.remark
   * * insert.schedule
   * * insert.table
   *
   * @param editor monaco editor instance
   */
  installActions (editor) {
  }

  /**
   * Markup a textual remark
   */
  markupRemark (text) {
  }

  /**
   * Markup a link (ref)
   */
  markupRef (title, href) {
  }

  /**
   * Markup an image
   */
  markupImage (title, src) {
  }

  insertRemark (editor, remark) {
    const sel = editor.getSelection();
    editor.pushUndoStop();
    editor.executeEdits(this.language_id, [{
      identifier: 'insert.remark',
      range: sel,
      text: this.markupRemark(remark),
    }]);
    editor.pushUndoStop();
  }

  /**
   * Get a description of the image at the cursor, if any.
   */
  getImageAtCursor (editor) {
    const match = this.getMatchAtCursor(editor, this.image_re);
    if (match) {
      return {
        match: match,
      };
    }
  }

  /**
   * Insert or update the image at the current cursor
   */
  insertImageAtCursor (editor, filename) {
    const existing = this.getImageAtCursor(editor);
    let sel = editor.getSelection();
    let image;

    if (existing) {
      // update existing image
      image = this.markupImage(existing.title, filename);
      sel = sel.setEndPosition(sel.startLineNumber, existing.match.index + existing.match[0].length + 1);
      sel = sel.setStartPosition(sel.startLineNumber, existing.match.index + 1);
    } else {
      // insert new image
      image = this.markupImage('', filename);
    }

    editor.pushUndoStop();
    editor.executeEdits(this.language_id, [{
      identifier: 'insert.image',
      range: sel,
      text: image,
    }]);
    editor.pushUndoStop();
  }

  /**
   * Returns the match object, if any, for a regular expression match at the current cursor position,
   * on the current line.
   */
  getMatchAtCursor (editor, regexp) {
    const sel = editor.getSelection();
    const line = editor.getModel().getLineContent(sel.startLineNumber);

    for (let match of line.matchAll(regexp)) {
      // is the cursor inside the match (which goes from match.index to match[0].length)?
      if (match.index <= sel.startColumn && sel.startColumn <= match.index + match[0].length) {
        return match;
      }
    }
  }

  /**
   * Setup pasting so that when the user pastes an HTML table we change it a grammar-supported table style.
   *
   * We cannot disable the Monaco editor paste functionality. Instead, we allow it to happen and then undo it
   * if necessary, and replace the pasted text with the table.
   */
  setupTablePasting (editor) {
    editor.getDomNode().querySelector('textarea.inputarea').addEventListener('paste', (e) => {
      const cb = e.clipboardData;

      if (cb.types.indexOf('text/html') > -1) {
        const doc = new DOMParser().parseFromString(cb.getData('text/html'), 'text/html'),
          tables = doc.body.querySelectorAll('table'),
          toPaste = [];

        if (tables.length > 0) {
          // undo the paste
          editor.trigger(this.language_id, 'undo');

          for (let i = 0; i < tables.length; i++) {
            toPaste.push(tableToAkn(tables[i]));
          }

          this.pasteTables(editor, toPaste);
        }
      }
    });
  }

  /**
   * Paste these (clean) XML tables into the editor.
   */
  pasteTables (editor, tables) {
    const text = [];

    for (let i = 0; i < tables.length; i++) {
      text.push(this.xmlToText(tables[i]));
    }

    editor.pushUndoStop();
    editor.executeEdits(this.language_id, [{
      identifier: 'insert.table',
      range: editor.getSelection(),
      text: text.join('\n'),
    }]);
    editor.pushUndoStop();
  }
}

/**
 * Wrap the current selection of the editor in pre and post text.
 * Expands the selection if there is selected text, or moves
 * the selection between pre and post if there is nothing selected.
 */
export function wrapSelection (editor, id, pre, post) {
  const sel = editor.getSelection();
  const text = editor.getModel().getValueInRange(sel);
  const op = {
    identifier: id,
    range: sel,
    forceMoveMarkers: false,
    text: pre + text + post
  };
  // either extend the selection, or place cursor inside the tags
  const cursor = (
    text.length === 0 ?
      sel.setEndPosition(sel.startLineNumber, sel.startColumn + pre.length)
        .setStartPosition(sel.startLineNumber, sel.startColumn + pre.length)
      : sel.setEndPosition(sel.endLineNumber, sel.endColumn + pre.length + post.length));
  editor.executeEdits('indigo', [op], [cursor]);
}
