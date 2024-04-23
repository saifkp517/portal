"use client"

import { useState } from "react";

export default function MyTable({ TableData }: any) {

  const [numRows, setNumRows] = useState(3);
  const [numCols, setNumCols] = useState(3);
  const [tableData, setTableData] = useState<any>([]);

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
    setTableData(data);
  };

  const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, colIndex: number) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][colIndex] = e.target.value;
    setTableData(updatedData);
    TableData(tableData)
  };


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
    <div>
      <div>
        <label>Number of Rows: </label>
        <input type="number" value={numRows} onChange={handleNumRowsChange} />
      </div>
      <div>
        <label>Number of Columns: </label>
        <input type="number" value={numCols} onChange={handleNumColsChange} />
      </div>
      <button onClick={handleGenerateTable}>Generate Table</button>
      {tableData.length > 0 && renderTable()}
      <button onClick={() => console.log(tableData)}>getData</button>
    </div>
  );

}
