// Function to process the Markdown table with modified headers and data rows
function processMarkdownTable(markdownTable) {
    // Split the table into rows
    const rows = markdownTable.trim().split('\n');
    const modifiedRows = [];
    
    // Extract and clean the header and divider
    const headerCells =  cleanRow(rows[0]);
    const header = headerCells.join(' | ');
    const divider = cleanRow(rows[1]).join(' | ');

    // Iterate through the data rows, starting from the third row (index 2) to ignore headers and the header divider
    for (let i = 2; i < rows.length; i++) {
        // Split the row into cells
        const cells = cleanRow(rows[i]);
        
        for (let j = 0; j < cells.length; j++) {
            const newRowQuestion = cells.map((cell, index) => {
                if (j === index) {
                    return `---`;
                } else {
                    return cell;
                }
            });
            const newRowAnswer = cells.map((cell, index) => {
                if (j === index) {
                    return `**${cell}**`;
                } else {
                    return cell;
                }
            });

            const modifiedTableQuestion = `| ${header} |\n| ${divider} |\n| ${newRowQuestion.join(' | ')} |`;
            const questionCallout = formatTableInCallout(modifiedTableQuestion, 'question', 'Question', `Fill out '${headerCells[j]}'.`);
            const modifiedTableAnswer = `| ${header} |\n| ${divider} |\n| ${newRowAnswer.join(' | ')} |`;
            const answerCallout = formatTableInCallout(modifiedTableAnswer, 'info', 'Answer', '__description__');

            modifiedRows.push(formatFlashcard(questionCallout, answerCallout));
        }
    }
    
    // Join the modified rows into a single string with double line breaks to create the final Markdown table
    const resultTable = modifiedRows.join('\n\n---\n\n');
    return resultTable;
}

// Helper function to clean a row and split it into cells
function cleanRow(row) {
    return row.split('|').map((cell) => cell.trim()).filter((cell) => !!cell);
}

// Function to format a Markdown table within an Obsidian callout
function formatTableInCallout(markdownTable, calloutType, calloutHeading, calloutText, expandable = false) {
    // Split the table into rows and add a `>` at the beginning of each line
    const formattedContent = markdownTable.split('\n').map(line => `> ${line}`).join('\n');

    // Define the callout block
    const calloutBlock = `> [!${calloutType}]${expandable ? "-" : ""} ${calloutHeading}\n> ${calloutText}  \n> \n${formattedContent}\n`;

    return calloutBlock;
}

function formatFlashcard(question, answer) {
    // Split the table into rows and add a `>` at the beginning of each line
    const formattedQuestion = question.split('\n').map(line => `> ${line}`).join('\n');
    const formattedAnswer = answer.split('\n').map(line => `> ${line}`).join('\n');

    return `${formattedQuestion}\n?\n>\n${formattedAnswer}`;
}
  
const markdownTable = `
| Adjektiv    | Komparativ | Superlativ |
| ----------- | ---------- | ---------- |
| få          | færre      | færrest    |
| lang        | lengre     | lengst     |
| stor        | større     | størst     |
| tung        | tyngre     | tyngst     |
| ung         | yngre      | yngst      |
| gammel      | eldre      | eldest     |
| god         | bedre      | best       |
| liten, lite | mindre     | minst      |
| mange       | flere      | flest      |
| mye         | mer        | mest       |
| ille, vond  | verre      | verst      |
`;

const result = processMarkdownTable(markdownTable);

console.log(result);
