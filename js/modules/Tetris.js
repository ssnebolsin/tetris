export class Tetris {
    constructor() {
        this.isPaused = true
        this.field = [];
        this.fieldsWidth = 10;
        this.fieldHeight = 20;
        this.lFigure = [
            [1,11,21,2]
        ]
        // this.zFigure = [
        //     [1,2,11,10]
        // ]
        this.figures = [
             [[1,11,21,2]],
             [[1,2,11,10]],
             [[1,11,21,31]],
             [[1,2,11,12]]
        ]
        this.randomFigure = this.figures[Math.floor(Math.random()*4)]
    }
    generateField() {
        this.field = new Array(this.fieldHeight).fill(new Array(this.fieldsWidth).fill(0))
        this.createField()
        this.togglePause()
    }
    togglePause() {
        this.isPaused = !this.isPaused
    }
    removeLine() {
        this.field.forEach((row, index) => {
            let filledRow = row.every(cell => cell > 0)
            if (filledRow) {
                this.field.splice(index, 1)
                this.field.unshift(new Array(this.fieldsWidth).fill(0))
                this.reRenderField()
            }
        })
    }
    createField() {
        for(let i = 0; i < this.fieldsWidth * this.fieldHeight; i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell', "cell--0")
            cell.setAttribute('id',`id${i}`);
            cell.innerText = `${i}`
            document.querySelector('.field').appendChild(cell)
        }
    }
    reRenderField() {
        document.querySelectorAll('.cell').forEach((cell, cellIndex) => {
            cell.classList.remove(cell.classList[1])
            cell.classList.add('cell--' + this.field[Math.floor(cellIndex / this.fieldsWidth)][cellIndex % this.fieldsWidth])
        })
    }
    renderFigure(){
        for(let i = 0; i < this.randomFigure[0].length; i++){
            // console.log(this.randomFigure[0][i])
            document.querySelector(`#id${this.randomFigure[0][i]}`).classList.add('cell--1')
        }
    }
    unRenderFigure(){
        for(let i = 0; i < this.randomFigure[0].length; i++){
            // console.log(this.lFigure[0][i])
            document.querySelector(`#id${this.randomFigure[0][i]}`).classList.remove('cell--1')
        }
    }
    moveFigure(){
        setInterval(() => {
            this.unRenderFigure()
            console.log(Math.max(...this.randomFigure[0]))
            if(Math.max(...this.randomFigure[0]) < this.fieldHeight * this.fieldsWidth - 10) {
                this.randomFigure[0] = this.randomFigure[0].map(v=> v+10)
            } 
            this.renderFigure()
        }, 1000);
        // console.log(this.figures[0])
        // console.log(Math.floor(Math.random()*4))
    }

}