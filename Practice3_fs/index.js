const fs = require("fs");

fs.writeFileSync("./test.txt", "Hello There");

fs.writeFile("./test1.txt", "Hello there from async write", (err) => {
    if (err) throw err;
})

const result = fs.readFileSync("./test.txt", "utf-8");
console.log(result);

fs.readFile("./test1.txt", (err, data) => {
    if (err)
        throw err;
    else
        console.log(data.toLocaleString());
});

fs.appendFileSync("./test.txt", `\n${Date.now()} Hello World`);

fs.cpSync("./test.txt", "./copy.txt");

// fs.mkdir("doc", (err) => {
//     if (err) throw err;
// })
// fs.mkdirSync("docs/a/b", { recursive: true });


fs.unlinkSync("./copy.txt");


