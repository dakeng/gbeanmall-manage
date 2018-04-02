import fs from 'fs';

const config = {
    cert: fs.readFileSync('private.key'),
}

export default config;