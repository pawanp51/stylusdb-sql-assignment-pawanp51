// const child_process = require('child_process');
// const path = require('path');

// test('DISTINCT with Multiple Columns via CLI', (done) => {
//     const cliPath = path.join(__dirname, '..', 'src', 'cli.js');
//     const cliProcess = child_process.spawn('node', [cliPath]);

//     let outputData = "";
//     cliProcess.stdout.on('data', (data) => {
//         outputData += data.toString();
//     });

//     cliProcess.on('exit', () => {
//         // Console log to print out the raw output data
//         console.log("Raw Output Data:", outputData);

//         // Define a regex pattern to extract the JSON result
//         const cleanedOutput = outputData.replace(/\s+/g, ' ');

//         // Console log to print out the cleaned output
//         console.log("Cleaned Output:", cleanedOutput);

//         const resultRegex = /Result: (\[.+\])/s;
//         const match = cleanedOutput.match(resultRegex);

//         // Console log to print out the match
//         console.log("Match:", match);

//         try {
//             if (match && match[1]) {
//                 // Fix JSON outputput
//                 match[1] = match[1].replace(/'/g, '"').replace(/(\w+):/g, '"$1":');

//                 // Parse the captured JSON string
//                 const results = JSON.parse(match[1]);

//                 // Validation logic
//                 expect(results).toEqual([
//                     { student_id: '1', course: 'Mathematics' },
//                     { student_id: '1', course: 'Physics' },
//                     { student_id: '2', course: 'Chemistry' },
//                     { student_id: '3', course: 'Mathematics' },
//                     { student_id: '5', course: 'Biology' },
//                     { student_id: '5', course: 'Physics' }
//                 ]);
//                 console.log("Test passed successfully");
//             } else {
//                 throw new Error('Failed to parse CLI output');
//             }
//         } catch (error) {
//             console.error("Validation Error:", error);
//         }

//         clearTimeout(queryTimeout); // Clear the timeout after it's done
//         done();
//     });

//     // Introduce a delay before sending the query
//     const queryTimeout = setTimeout(() => {
//         // Check if the child process is still running before writing to stdin
//         if (!cliProcess.killed && cliProcess.stdin.writable) {
//             cliProcess.stdin.write("SELECT DISTINCT student_id, course FROM enrollment\n", (error) => {
//                 if (error) {
//                     console.error('Error writing to stdin:', error);
//                 }
//             });
//             setTimeout(() => {
//                 if (!cliProcess.killed && cliProcess.stdin.writable) {
//                     cliProcess.stdin.write("exit\n", (error) => {
//                         if (error) {
//                             console.error('Error writing to stdin:', error);
//                         }
//                     });
//                 } else {
//                     console.error('Child process terminated unexpectedly before sending query');
//                 }
//             }, 2000); // 2 second delay for exiting
//         } else {
//             console.error('Child process terminated unexpectedly before sending query');
//         }
//     }, 1000); // 1 second delay for starting the process
// });


const child_process = require('child_process');
const path = require('path');

test('DISTINCT with Multiple Columns via CLI', (done) => {
    const cliPath = path.join(__dirname, '..', 'src', 'cli.js');
    const cliProcess = child_process.spawn('node', [cliPath]);

    let outputData = "";
    cliProcess.stdout.on('data', (data) => {
        outputData += data.toString();
    });

    cliProcess.on('exit', () => {
        // Console log to print out the raw output data
        console.log("Raw Output Data:", outputData);

        // Define a regex pattern to extract the JSON result
        const cleanedOutput = outputData.replace(/\s+/g, ' ');

        // Console log to print out the cleaned output
        console.log("Cleaned Output:", cleanedOutput);

        const resultRegex = /Result: (\[.+\])/s;
        const match = cleanedOutput.match(resultRegex);

        // Console log to print out the match
        console.log("Match:", match);

        try {
            if (match && match[1]) {
                // Fix JSON outputput
                match[1] = match[1].replace(/'/g, '"').replace(/(\w+):/g, '"$1":');

                // Parse the captured JSON string
                const results = JSON.parse(match[1]);

                // Validation logic
                expect(results).toEqual([
                    { student_id: '1', course: 'Mathematics' },
                    { student_id: '1', course: 'Physics' },
                    { student_id: '2', course: 'Chemistry' },
                    { student_id: '3', course: 'Mathematics' },
                    { student_id: '5', course: 'Biology' },
                    { student_id: '5', course: 'Physics' }
                ]);
                console.log("Test passed successfully");
            } else {
                throw new Error('Failed to parse CLI output');
            }
        } catch (error) {
            console.error("Validation Error:", error);
        }

        clearTimeout(queryTimeout); // Clear the timeout after it's done
        done();
    });

    // Introduce a delay before sending the query
    const queryTimeout = setTimeout(() => {
        // Check if the child process is still running before writing to stdin
        if (!cliProcess.killed && cliProcess.stdin.writable) {
            cliProcess.stdin.write("SELECT DISTINCT student_id, course FROM enrollment\n", (error) => {
                if (error) {
                    console.error('Error writing to stdin:', error);
                }
            });
            setTimeout(() => {
                if (!cliProcess.killed && cliProcess.stdin.writable) {
                    cliProcess.stdin.write("exit\n", (error) => {
                        if (error) {
                            console.error('Error writing to stdin:', error);
                        }
                    });
                } else {
                    console.error('Child process terminated unexpectedly before sending query');
                }
            }, 2000); // 2 second delay for exiting
        } else {
            console.error('Child process terminated unexpectedly before sending query');
        }
    }, 1000); // 1 second delay for starting the process
});
