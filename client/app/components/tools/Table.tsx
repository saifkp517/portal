"use client"

import { useState } from "react";

export default function MyTable({ TableData }: any) {

  const [numRows, setNumRows] = useState(3);
  const [numCols, setNumCols] = useState(3);
  const [tableData, setTableData] = useState<any>([]);
  const [highlight, setHighlight] = useState(false);

  // functions related to generate hover-grid selector --

  const handleGenerateTable = () => {
    const data = Array.from({ length: numRows+1 }, () => Array.from({ length: numCols+1 }, () => ''));
    setTableData(data)
  };

  const handleBoxHover = (row: number, col: number) => {
    setNumRows(row);
    setNumCols(col);
  };

  const renderGrid = () => {
    const grid = [];
    for (let i = 0; i < 20; i++) {
      const row = [];
      for (let j = 0; j < 20; j++) {
        const index = i * 5 + j;
        row.push(
          <div
            key={index}
            className={`border border-black h-2 w-2 m-px rounded-xs ${i <= numRows && j <= numCols ? 'bg-gray-500 border-transparent' : ''}`}
            onMouseEnter={() => handleBoxHover(i , j)}
            onClick={handleGenerateTable}
          >
            <div className=""></div>
          </div>
        );
      }
      grid.push(
        <div key={i} className="flex justify-center items-stretch">
          {row}
        </div>
      );
    }
    return grid;
  };

  

  // -- functions related to generate hover-grid selector 

  // ---------------------------------------------------------------------------------------------------------------//

  // functions related to generate table functionality ----


  const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, colIndex: number) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][colIndex] = e.target.value;
    setTableData(updatedData); //sets the data in the table array
    TableData(tableData); //sends the set data to the parent component
  };


  // ---functions related to generate table functionality


  const renderTable = () => {
    return (
      <table className="table-fixed">
        <tbody>
          {tableData.map((row: any, rowIndex: number) => (
            rowIndex == 0 ? (
              <tr key={rowIndex}>
                {row.map((cell: any, colIndex: number) => (
                  <th className="border border-black" key={colIndex}>
                    <input
                      type="text"
                      value={cell}
                      onChange={e => handleCellChange(e, rowIndex, colIndex)}
                    />
                  </th>
                ))}
              </tr>
            )
              :
              (
                <tr key={rowIndex}>
                  {row.map((cell: any, colIndex: number) => (
                    <td className="border border-black" key={colIndex}>
                      <input
                        type="text"
                        value={cell}
                        onChange={e => handleCellChange(e, rowIndex, colIndex)}
                      />
                    </td>
                  ))}
                </tr>
              )
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className=" text-center">
      {/* <div>
        <label>Number of Rows: </label>
        <input type="number" value={numRows} onChange={handleNumRowsChange} />
      </div>
      <div>
        <label>Number of Columns: </label>
        <input type="number" value={numCols} onChange={handleNumColsChange} />
      </div>
      <br /> */}

      <div className="">
      Rows: {numRows+1}, Columns: {numCols+1}

        <div className="w-full my-8">{renderGrid()}</div>
        <div className="info">
          Hover over the boxes to select the number of rows and columns for the table.
          <br />
        </div>
      </div>

      {tableData.length > 0 && renderTable()}
    </div>
  );

}
