"use client"

import { useState } from "react";

export default function MyTable({ TableData }: any) {

  const [numRows, setNumRows] = useState(3);
  const [numCols, setNumCols] = useState(3);
  const [tableData, setTableData] = useState<any>([]);
  const [highlight, setHighlight] = useState(false);

  // functions related to generate hover-grid selector --

  const handleBoxHover = (row: number, col: number) => {
    setNumRows(row);
    setNumCols(col);
  };

  const renderGrid = () => {
    const grid = [];
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 5; j++) {
        const index = i * 5 + j;
        row.push(
          <div
            key={index}
            className={`border border-black h-4 w-4 m-1 ${i <= numRows && j <= numCols ? 'bg-gray-500 border-transparent' : ''}`}
            onMouseEnter={() => handleBoxHover(i , j)}
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

  const handleNumRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setNumRows(isNaN(value) ? 0 : value);
  };

  const handleNumColsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setNumCols(isNaN(value) ? 0 : value);
  };

  const handleGenerateTable = () => {
    const data = Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => ''));
    setTableData(data)
  };

  const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, colIndex: number) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][colIndex] = e.target.value;
    setTableData(updatedData);
    TableData(tableData)
  };


  // ---functions related to generate table functionality


  const renderTable = () => {
    return (
      <table>
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
        <div className="w-full my-8">{renderGrid()}</div>
        <div className="info">
          Hover over the boxes to select the number of rows and columns for the table.
          <br />
          Rows: {numRows}, Columns: {numCols}
        </div>
      </div>

      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4" onClick={handleGenerateTable}>Generate Table</button>

      {tableData.length > 0 && renderTable()}
    </div>
  );

}
