import {Tetris} from './modules/Tetris.js'

const tetris = new Tetris()
tetris.generateField()
console.log('start game')
// console.table(tetris.field)
console.log(tetris.field)
// tetris.reRenderField()
tetris.renderFigure()
// tetris.moveFigure()
