import { useState } from "react";
import { CurrentPlayerEnum } from "../../enums/current-player.enum";
import { CurrentSymbolEnum } from "../../enums/current-symbol.enum";
import "./TicTacToeComponent.css";
const TicTacToeComponent = () => {
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayerEnum>(
    CurrentPlayerEnum.FIRST_PLAYER
  );

  const [currentSymbol, setCurrentSymbol] = useState<CurrentSymbolEnum>(
    CurrentSymbolEnum.X
  );

  const [tableDisabled, setTableDisabled] = useState(false);

  const [winner, setWinner] = useState<CurrentPlayerEnum>();

  const [table, setTable] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const switchRoles = () => {
    if (currentPlayer === CurrentPlayerEnum.FIRST_PLAYER) {
      setCurrentPlayer(CurrentPlayerEnum.SECOND_PLAYER);
    } else {
      setCurrentPlayer(CurrentPlayerEnum.FIRST_PLAYER);
    }
  };

  const switchSymbols = () => {
    if (currentSymbol === CurrentSymbolEnum.X) {
      setCurrentSymbol(CurrentSymbolEnum.O);
    } else {
      setCurrentSymbol(CurrentSymbolEnum.X);
    }
  };

  const checkLine = (
    element1: string,
    element2: string,
    element3: string
  ): boolean => {
    return (
      Boolean(element1) &&
      Boolean(element2) &&
      Boolean(element3) &&
      element1 === element2 &&
      element1 === element3
    );
  };

  const checkForWinner = (): boolean => {
    return (
      checkLine(table[0][0], table[0][1], table[0][2]) ||
      checkLine(table[0][0], table[1][1], table[2][2]) ||
      checkLine(table[0][0], table[1][0], table[2][0]) ||
      checkLine(table[2][2], table[2][0], table[2][1]) ||
      checkLine(table[2][0], table[1][1], table[0][2]) ||
      checkLine(table[2][2], table[0][2], table[1][2])
    );
  };

  const play = (lineIndex: number, valueIndex: number) => {
    if (table[lineIndex][valueIndex] !== "" || tableDisabled) return;
    const updatedTable = [...table];
    updatedTable[lineIndex][valueIndex] = currentSymbol;
    setTable(updatedTable);
    const isWinner = checkForWinner();
    if (isWinner) {
      setWinner(currentPlayer);
      setTableDisabled(true);
      return;
    }
    switchRoles();
    switchSymbols();
  };

  return (
    <>
      <div>
        <p>{currentPlayer} is playing</p>
        <p>current symbol is: {currentSymbol}</p>
      </div>
      <div>{winner && <strong>winner is {winner}!!</strong>}</div>
      <div>
        <table>
          {table.map((line, lineIndex) => (
            <tr>
              {line.map((value, valueIndex) => (
                <td onClick={() => play(lineIndex, valueIndex)}>
                  <p>{value}</p>
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default TicTacToeComponent;
