import {Tetris} from './modules/Tetris.js'

const tetris = new Tetris()
tetris.generateField()
console.log('start game')
// console.table(tetris.field)
console.log(tetris.field)
// tetris.reRenderField()
// tetris.renderFigure()
tetris.moveFigure()

let pause = document.querySelector('#pause')
pause.addEventListener('click', () => {
    console.log('pause')
    tetris.togglePause()
    console.log(tetris.isPaused)
    tetris.moveFigure()
}
)

let start = document.querySelector('#start')
start.addEventListener('click', ()=>{
    console.log('start')
    location.reload()
})
// tetris.moveFigureRight()
window.addEventListener('keydown', (e)=>{
    if(e.keyCode == '39'){
        e.preventDefault();
        console.log('key right')
        tetris.moveFigureRight()
    } else 
    if (e.keyCode == '37'){
        e.preventDefault();
        console.log('key left')
        tetris.moveFigureLeft()
    } else 
    if(e.keyCode == '38'){
        e.preventDefault();
        console.log('key up')
        tetris.rotateFigureLeft()
    } else
    if(e.keyCode == '32'){
        e.preventDefault();
        tetris.togglePause()
        console.log(tetris.isPaused)
        tetris.moveFigure()
    }
}
)
    

