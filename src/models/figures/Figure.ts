import Cell from "../Cell";
import { Colors } from "../Colors";
import logo from '../../assets/black-bishop.png'

export enum FigureNames { // enum примитивный перечисляемый тип
  FIGURE = "Фигура",
  KING = "Король",
  KNIGHT = "Конь",
  PAWN = "Пешка",
  QUEEN = "Ферзь",
  ROOK = "Ладья",
  BISHOP = "Слон",
}

export default class Figure { // от этого класса, все фигуры будут наследоваться.
  color: Colors; // в поле color запишем enum Colors - это примитивный перечисляемый тип (цвета)
  logo: typeof logo | null; // у каждой фигуры будет какой-то логотип. Чтобы правильно указать тип, сделаем 
  // typeof от того объекта который мы импортировали.
  cell: Cell;
  name: FigureNames; // у каждой фигуры будет свое название, чтобы узнать какие фигуры съедены. Для этого будем создать перечисление enum.
  id: number; // сгенерируем id, чтобы в качестве ключа его использовать.

  constructor(color: Colors, cell: Cell) {
    this.color = color
    this.cell = cell;
    this.cell.figure = this; // Это хак - на ячейку сразу добавляем фигуру, в качестве текущего объекта. Поэтому кольчевая зависимость удобно.
    this.logo = null; //поскольку Figure базовой класс, явного логотипа нет, поэтому просто null.
    this.name = FigureNames.FIGURE; // название тоже просто базовый класс.
    this.id = Math.random(); // рандомно инициализируем id.
  }

  // Этот метод будет сообщать о том, что может ли походить фигура на эту ячейку или нет.
  // Он будет принимать единственный аргумент target(ячейку которую мы хотим переместиться)
  canMove(target: Cell) : boolean { // он возвращает булевое значение true или false
    if(target.figure?.color === this.color)
      return false;
    if(target.figure?.name === FigureNames.KING)
      return false;
      return true;
  } // Т.е. в родительском классе объявляем условия справедливы для всех фигур. А в дочерних классах (конкретных) будем объявлять
  // условия справедливы для каждого индивидуально.

  // Метод будет перемещать фигуру. 
  moveFigure(target: Cell) {}
  // По итогу все наследуемые классы, от этого родительского 
  // класса Figure{} должны реализовать эти методы
}

// Здесь так же создаем кольцевая зависимость, по аналогии с доской ячейками. 
// Фигура знает про ячееку которая она стоит, ячейка знает про фигуру, которая на ней стоит.