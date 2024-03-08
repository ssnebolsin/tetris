export class Tetris {
    constructor() {
        this.isPaused = false
        this.field = [];
        this.fieldsWidth = 10;
        this.fieldHeight = 20;
        this.squares
        this.figures = [
            [   [4,14,24,5],
                [3,13,14,15],
                [4,14,24,23],
                [3,4,5,15]
            ],
            [
                [4,5,14,13],
                [4,14,13,23],
                [3,4,14,15],
                [4,14,13,23]
            ],
            [
                [4,14,24,34],
                [13,14,15,16],
                [4,14,24,34],
                [13,14,15,16]
            ],
            [
                [4,5,14,15],
                [4,5,14,15],
                [4,5,14,15],
                [4,5,14,15]
            ]
       ]

        this.figureIndex = Math.floor(Math.random()*4)
        this.randomFigure = this.figures[this.figureIndex]

        this.figureRotationIndex = Math.floor(Math.random()*4)

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

    removeLine2(){
        for(let rownum = 0; rownum < 20; rownum++){
            let rowArr = []
            for (let i = 0; i < 10; i++){
                rowArr.push(this.squares[rownum*10 + i])
            }
            if(rowArr.every((item)=>item.classList.contains('taken'))){
                console.log('filled row')
                rowArr.forEach(item => {
                    item.classList.remove('taken')
                    item.classList.remove(item.classList[2])

                })
                const squaresRemoved = this.squares.splice(rownum * 10, 10)
                this.squares = squaresRemoved.concat(this.squares)
                console.log(this.squares)
                this.squares.forEach(cell => document.querySelector('.field').appendChild(cell))
                console.log(this.field)
            }
            rowArr = []
        }
        
    }

    createField() {
        for(let i = 0; i < this.fieldsWidth * this.fieldHeight; i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell', "cell--0")
            // cell.setAttribute('id',`id${i}`);
            cell.innerText = `${i}`
            document.querySelector('.field').appendChild(cell)
        }
        this.squares = Array.from(document.querySelectorAll('.cell'))
    }
    reRenderField() {
        document.querySelectorAll('.cell').forEach((cell, cellIndex) => {
            cell.classList.remove(cell.classList[1])
            cell.classList.add('cell--' + this.field[Math.floor(cellIndex / this.fieldsWidth)][cellIndex % this.fieldsWidth])
        })
    }
    renderFigure(){
        for(let i = 0; i < this.randomFigure[this.figureRotationIndex].length; i++){
            // console.log(this.randomFigure[0][i])
            // document.querySelector(`#id${this.randomFigure[this.figureRotationIndex][i]}`).classList.add(`cell--${this.figureIndex + 1}`, 'taken')
            this.squares[this.randomFigure[this.figureRotationIndex][i]].classList.add(`cell--${this.figureIndex + 1}`, 'taken')
        }
    }
    renderNewFigure(){
        this.figures = [
            [   [4,14,24,5],
                [3,13,14,15],
                [4,14,24,23],
                [3,4,5,15]
            ],
            [
                [4,5,14,13],
                [4,14,13,23],
                [3,4,14,15],
                [4,14,13,23]
            ],
            [
                [4,14,24,34],
                [13,14,15,16],
                [4,14,24,34],
                [13,14,15,16]
            ],
            [
                [4,5,14,15],
                [4,5,14,15],
                [4,5,14,15],
                [4,5,14,15]
            ]
       ]
        // this.randomFigure = this.figures[Math.floor(Math.random()*4)]
        this.figureIndex = Math.floor(Math.random()*4)
        this.randomFigure = this.figures[this.figureIndex]
        this.figureRotationIndex = Math.floor(Math.random()*4)
        for(let i = 0; i < this.randomFigure[this.figureRotationIndex].length; i++){
            // console.log(this.randomFigure[0][i])
            // document.querySelector(`#id${this.randomFigure[this.figureRotationIndex][i]}`).classList.add(`cell--${this.figureIndex + 1}`, 'taken')
            this.squares[this.randomFigure[this.figureRotationIndex][i]].classList.add(`cell--${this.figureIndex + 1}`, 'taken')
        }
    }
    unRenderFigure(){
        for(let i = 0; i < this.randomFigure[this.figureRotationIndex].length; i++){
            // console.log(this.lFigure[0][i])
            // document.querySelector(`#id${this.randomFigure[this.figureRotationIndex][i]}`).classList.remove(`cell--${this.figureIndex + 1}`, 'taken')
            this.squares[this.randomFigure[this.figureRotationIndex][i]].classList.remove(`cell--${this.figureIndex + 1}`, 'taken')

            // let id = this.randomFigure[this.figureRotationIndex][i]
            // id < 10 ? this.field[0][id] = 0 : this.field[Math.floor(id/10)][id%10] = 0
        }
    }
    moveFigure(){
            this.renderFigure()
            let moveInterval = setInterval(() => {
                this.unRenderFigure()
                // console.log(document.querySelector(`#id${this.randomFigure[0][0]}`))
                // console.log(this.randomFigure[0][0] + 10)
                // console.log(this.randomFigure[0].map(v=> v+10))
                for (let i = 0; i < this.randomFigure[this.figureRotationIndex].length; i++){
                    this.randomFigure[i] = this.randomFigure[i].map(v=> v+10)
                }
                // this.randomFigure[this.figureRotationIndex] = this.randomFigure[this.figureRotationIndex].map(v=> v+10)
                if(
                    this.squares[this.randomFigure[this.figureRotationIndex][0]].classList.contains('taken') ||
                    this.squares[this.randomFigure[this.figureRotationIndex][1]].classList.contains('taken') ||
                    this.squares[this.randomFigure[this.figureRotationIndex][2]].classList.contains('taken') ||
                    this.squares[this.randomFigure[this.figureRotationIndex][3]].classList.contains('taken')
                    // document.querySelector(`#id${this.randomFigure[this.figureRotationIndex][0]}`).classList.contains('taken') ||
                    // document.querySelector(`#id${this.randomFigure[this.figureRotationIndex][1]}`).classList.contains('taken') ||
                    // document.querySelector(`#id${this.randomFigure[this.figureRotationIndex][2]}`).classList.contains('taken') ||
                    // document.querySelector(`#id${this.randomFigure[this.figureRotationIndex][3]}`).classList.contains('taken')
                
                ) {
                    for (let i = 0; i < this.randomFigure[this.figureRotationIndex].length; i++){
                        this.randomFigure[i] = this.randomFigure[i].map(v=> v-10)
                    }
                    // this.randomFigure[this.figureRotationIndex] = this.randomFigure[this.figureRotationIndex].map(v=> v-10)
                    this.renderFigure()
                    clearInterval(moveInterval)
                    this.renderNewFigure()
                    this.moveFigure()
                }
                // console.log(Math.max(...this.randomFigure[0]))
                // document.querySelectorAll(`#id${}`)
                // console.log(this.field[rowNum])
                this.renderFigure()
                this.removeLine2()
            if(Math.max(...this.randomFigure[this.figureRotationIndex]) >= this.fieldHeight * this.fieldsWidth - 10){
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
        // this.randomFigure[this.figureRotationIndex] = this.randomFigure[this.figureRotationIndex].map(v=> v+1)
        for (let i = 0; i < this.randomFigure.length; i++){

            if(
                !this.randomFigure[i].some((item)=>
                Array.from(Array(20).keys()).map(v=>v*10 + 9).includes(item))

            ){
                this.randomFigure[i] = this.randomFigure[i].map(v=> v+1)

                if(
                    this.squares[this.randomFigure[this.figureRotationIndex][0]].classList.contains('taken') ||
                    this.squares[this.randomFigure[this.figureRotationIndex][1]].classList.contains('taken') ||
                    this.squares[this.randomFigure[this.figureRotationIndex][2]].classList.contains('taken') ||
                    this.squares[this.randomFigure[this.figureRotationIndex][3]].classList.contains('taken')
                ){
                   this.randomFigure[i] = this.randomFigure[i].map(v=> v-1) 
                }
                
            }
            
        }
    }
    moveFigureLeft(){
        this.unRenderFigure()
        // this.randomFigure[this.figureRotationIndex] = this.randomFigure[this.figureRotationIndex].map(v=> v-1)
        
        for (let i = 0; i < this.randomFigure.length; i++){

            if(
                !this.randomFigure[i].some((item)=>
                Array.from(Array(20).keys()).map(v=>v*10).includes(item))
            ){
                this.randomFigure[i] = this.randomFigure[i].map(v=> v-1)

                if(
                    this.squares[this.randomFigure[this.figureRotationIndex][0]].classList.contains('taken') ||
                    this.squares[this.randomFigure[this.figureRotationIndex][1]].classList.contains('taken') ||
                    this.squares[this.randomFigure[this.figureRotationIndex][2]].classList.contains('taken') ||
                    this.squares[this.randomFigure[this.figureRotationIndex][3]].classList.contains('taken')
                ){
                   this.randomFigure[i] = this.randomFigure[i].map(v=> v+1) 
                }
            }
            
        }

    }
    rotateFigureLeft(){
        this.unRenderFigure()
        if(this.figureRotationIndex != 3){
            this.figureRotationIndex+=1
        } else {
            this.figureRotationIndex = 0
        }
    }
}