export interface Ichess {
  p1: string
  p2: string
  next: string
  history: string
  imageMode: boolean
}

export enum MoveResult {
  p1Win = 1,
  p2Win = -1,
  draw = -2,
  skip = 2,
  illegal = 3,
}

export enum ChessPiece {
  King = 'k',
  Queen = 'q',
  Rook = 'r',
  Bishop = 'b',
  Knight = 'n',
  Pawn = 'p',
}

export const ChessMap = {
  a:1,
  b:2,
  c:3,
  d:4,
  e:5,
  f:6,
  g:7,
  h:8
}

export const chessHeader = new Set(['k', 'q', 'r', 'b', 'n', 'p']);