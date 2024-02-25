export class Tetris {
    constructor() {
        this.isPaused = false
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
            [[4,14,24,5]],
            [[4,5,14,13]],
            [[4,14,24,34]],
            [[4,5,14,15]]
       ]
        this.randomFigure = this.figures[Math.floor(Math.random()*4)]
    }
    generateField() {
        this.field = new Array(this.fieldHeight).fill(new Array(this.fieldsWidth).fill(0))
        this.createField()
        // this.togglePause()
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
            document.querySelector(`#id${this.randomFigure[0][i]}`).classList.add('cell--1', 'taken')

            // let id = this.randomFigure[0][i]
            // id < 10 ? this.field[0][id] = 1 : this.field[Math.floor(id/10)][id%10] = 1
            // id < 10 ? this.field[0][2] = 1 : true
            // console.log(this.field[0][i] = 2)
        }
        // console.log(this.field)
    }
    renderNewFigure(){
        this.figures = [
            [[4,14,24,5]],
            [[4,5,14,13]],
            [[4,14,24,34]],
            [[4,5,14,15]]
       ]
        this.randomFigure = this.figures[Math.floor(Math.random()*4)]
        for(let i = 0; i < this.randomFigure[0].length; i++){
            // console.log(this.randomFigure[0][i])
            document.querySelector(`#id${this.randomFigure[0][i]}`).classList.add('cell--1', 'taken')
        }
    }
    unRenderFigure(){
        for(let i = 0; i < this.randomFigure[0].length; i++){
            // console.log(this.lFigure[0][i])
            document.querySelector(`#id${this.randomFigure[0][i]}`).classList.remove('cell--1', 'taken')

            let id = this.randomFigure[0][i]
            id < 10 ? this.field[0][id] = 0 : this.field[Math.floor(id/10)][id%10] = 0
        }
    }
    moveFigure(){
            this.renderFigure()
            let moveInterval = setInterval(() => {
                this.unRenderFigure()
                // console.log(document.querySelector(`#id${this.randomFigure[0][0]}`))
                // console.log(this.randomFigure[0][0] + 10)
                // console.log(this.randomFigure[0].map(v=> v+10))
                
                this.randomFigure[0] = this.randomFigure[0].map(v=> v+10)
                if(
                    document.querySelector(`#id${this.randomFigure[0][0]}`).classList.contains('taken') ||
                    document.querySelector(`#id${this.randomFigure[0][1]}`).classList.contains('taken') ||
                    document.querySelector(`#id${this.randomFigure[0][2]}`).classList.contains('taken') ||
                    document.querySelector(`#id${this.randomFigure[0][3]}`).classList.contains('taken')
                
                ) {
                    this.randomFigure[0] = this.randomFigure[0].map(v=> v-10)
                    this.renderFigure()
                    clearInterval(moveInterval)
                    this.renderNewFigure()
                    this.moveFigure()
                }
                // console.log(Math.max(...this.randomFigure[0]))
                // document.querySelectorAll(`#id${}`)
                // console.log(this.field[rowNum])
                this.renderFigure()
            if(Math.max(...this.randomFigure[0]) >= this.fieldHeight * this.fieldsWidth - 10){
                clearInterval(moveInterval)
                this.renderNewFigure()
                this.moveFigure()
            }
            if(this.isPaused){
                clearInterval(moveInterval)
            }
            }, 500);
    }
    moveFigureRight(){
        this.unRenderFigure()
        this.randomFigure[0] = this.randomFigure[0].map(v=> v+1)
    }
    moveFigureLeft(){
        this.unRenderFigure()
        this.randomFigure[0] = this.randomFigure[0].map(v=> v-1)
    }
}