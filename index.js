import { pathToFileURL } from 'url';
import { readFileSync } from 'fs';

function readScriptContent(filePath) {
    let content = readFileSync(filePath, 'utf-8');
    let configContent = '';
    
    // Check for config.js loading
    if (content.includes('load("config.js")')) {
        configContent = readFileSync('./config.js', 'utf-8');
        // Remove the load line
        content = content.replace('await load("config.js")', '');
    }
    
    const functionBody = content.match(/async function execute.*?}(?=\s|$)/s)[0];
    // Insert config content at the start of the function body
    const modifiedFunction = functionBody.replace('{', `{
        ${configContent}`);
    
    console.log(modifiedFunction)
    
    return eval(`(${modifiedFunction})`);
}

globalThis.load = async function (filePath) {
    const module = await import(pathToFileURL(filePath));
    if (typeof module.execute === 'function') {
        return await module.execute();
    } else {
        throw new Error(`'execute()' không tồn tại trong ${filePath}`);
    }
};

const scriptFunction = readScriptContent('test.js');
scriptFunction()
export { scriptFunction };


