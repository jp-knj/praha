# リファクタリング 
[課題内容](https://airtable.com/appPxhCPFYGqqN9YU/tblVlFr2q4lIqDKYc/viwX8r6DpCRp80swL/recKUo7Rl1riLj7Pq?blocks=hide)

[リファクタリング対象のプロジェクト](https://github.com/jp-knj/GridMan/blob/main/js/main2.js)
### 変更対象のコード
#### case1.初期値を明確に
defaultの値は定数で保持する 

**before**
```javascript
  initValues() {
      this.minColWidth = 200;
      this.gridColGapValue = 16;
      this.gridRowGapValue = 16;
      this.isUnify = false;
      this.flexBreakpoints = [];
      this.flexBreakpointsInfo = [];
  }
```
**after**
```javascript
const MIN_WIDTH = 200;
const COLUMN_GAP = 16;
const ROW_GAP = 16;
```

#### case2.単一責任の原則/Single responsibility principleで考える
javascript の関心事ではなく、UIの責務で関数を分離する
- 具体的には、`Form UI`の機能/責務ごとで関数を分別する  

**before**
```javascript
  cacheDOM() {
    this.minCol = document.querySelector('#itemWidth');
    this.gridColGap = document.querySelector('#gridColGap');
    this.gridRowGap = document.querySelector('#gridRowGap');
    this.unifyGap = document.querySelector('#unifyGap');
    this.gridWrapper = document.querySelector('.js-grid');
    this.breakPointsList = document.querySelector('.flex-breakpoints-list');
    this.addBreakpointBtn = document.querySelector('#addBreakpoint');
    this.generateCSS = document.querySelector('#generateCSS');
    this.resultModal = document.querySelector('#resultModal');
    this.modalBody = document.querySelector('#modalBody');
    this.resultCode = document.querySelector('#resultCode');
    this.copyCSS = document.querySelector('#copyCSS');
    this.closeModal = document.querySelector('#close');
  }
  
  ...

  bindEvents() {
    this.minCol.addEventListener('input', this.colChange.bind(this));
    this.gridColGap.addEventListener('input', this.colGapChange.bind(this));
    this.gridRowGap.addEventListener('input', this.rowGapChange.bind(this));
    this.addBreakpointBtn.addEventListener('click', this.addBreakpointEvent.bind(this));
    this.generateCSS.addEventListener('click', this.generateResult.bind(this));
    this.copyCSS.addEventListener('click', this.copyResult.bind(this));
    this.closeModal.addEventListener('click', this.closeResult.bind(this));
  }
```

**after**
```javascript
  inputDOM() {
    this.DOM.minWidthColum = document.querySelector('#itemWidth');
    this.DOM.gridColumGap = document.querySelector('#gridColGap');
    this.DOM.gridRowGap = document.querySelector('#gridRowGap');
  }
  
  ...

  inputEvent() {
    this.DOM.minWidthColum.addEventListener('input', this.colChange.bind(this));
    this.DOM.gridColumGap.addEventListener('input', this.colGapChange.bind(this));
    this.DOM.gridRowGap.addEventListener('input', this.rowGapChange.bind(this));
    ...
  }
```

#### case3. 循環的複雑度/Cyclomatic complexityを意識する
条件分岐が複雑なため、
- `else` を使わず、`return`を使う。
- `if`の中に、`if`がネストされているため、`&&`を使う。

**before**
```javascript
  generateGridItems() {
    if(this.unifyGap.checked) {
        this.isUnify = true;
    } else {
        this.isUnify = false;
    }

    if(this.isUnify) {
        let currentActiveElem = document.activeElement;

        if(currentActiveElem.getAttribute('id') == 'gridColGap') {
            this.gridRowGapValue = this.gridColGapValue;
        }

        if(currentActiveElem.getAttribute('id') == 'gridRowGap') {
            this.gridColGapValue = this.gridRowGapValue;
        }

        this.gridColGap.value = this.gridColGapValue;
        this.gridRowGap.value = this.gridRowGapValue;
    }

    let prevCode = "display: grid; \n" + "grid-template-columns: "+
    `repeat(auto-fit, minmax(<span>${this.minColWidth}px</span>, 1fr));` + "\n" + `grid-gap: <span>${this.gridRowGapValue}px ${this.gridColGapValue}px</span>;`;

    document.querySelector('#gridCodePreview').innerHTML = prevCode;

    this.gridWrapper.style.gridTemplateColumns = `repeat(auto-fit, minmax(${this.minColWidth}px, 1fr))`;
    this.gridWrapper.style.gridColumnGap = `${this.gridColGapValue}px`;
    this.gridWrapper.style.gridRowGap = `${this.gridRowGapValue}px`;
  }
```

**after**
```javascript
  toggleUnify () {
    if(this.unifyGap.checked) {
      this.isUnify = true;
    }
    return this.isUnify = false;
  }
  
  unifiedRowGap() {
    if(this.Unify && currentActiveElem.getAttribute('id') == 'gridColGap') {
      this.gridRowGapValue = this.gridColGapValue;
    }
    this.gridRowGap.value = this.gridRowGapValue;
  }
 
  unifiedColumGap() {
    if(this.Unify && currentActiveElem.getAttribute('id') == 'gridRowGap') {
      this.gridColGapValue = this.gridRowGapValue;
    }
    this.gridColGap.value = this.gridColGapValue;
  }
```