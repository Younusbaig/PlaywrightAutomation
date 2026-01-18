const {test, expect} = require('@playwright/test');


const Excel = require('exceljs');

async function writeExcel(searchText, replicateText, change, path)
{

const workBook = new Excel.Workbook();
await workBook.xlsx.readFile(path);
const worksheets  = workBook.getWorksheet('Sheet1');
const output = await readExcel(worksheets, searchText)
const cell = worksheets.getCell(output.row, output.column+change.colchange);
cell.value = replicateText;
workBook.xlsx.writeFile(path);

}

async function readExcel(worksheets, searchText){

    let output = {row:-1 , column:1};
    worksheets.eachRow((row, rowNumber) =>{

        row.eachCell((cell, cellNumber) =>
        {
            if(cell.value == searchText){
                output.row = rowNumber;
                output.cell = cellNumber;
            }
        })
    })
    return output;

}


// writeExcel("Younus Khan", "PAKISTAN",{rowChange:0, colchange:4}, "/Users/younus/Downloads/download.xlsx");

test('upload download excel file' , async({page})=>
{

  const textSearch= "Mango";
  const updatedValue= "Spring";
   await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
   const downloadPromised = page.waitForEvent('download');
   await page.locator('#downloadButton').click();
   await downloadPromised;
   writeExcel("Mango", updatedValue,{rowChange:0, colchange:3}, "/Users/younus/Downloads/download.xlsx");
   await page.locator('#fileinput').click();    
   await page.locator('#fileinput').setInputFiles("/Users/younus/Downloads/download.xlsx");
   const textLocator = await page.getByText(textSearch);
   const desiredRow = await page.getByRole('row').filter({has: textLocator});
   await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updatedValue);
})