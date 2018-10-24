var path = require('path');

module.exports = {
    entry: './src/my.bug_report.test',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bug_report.bundle.js'
    },
    mode: 'production',
};
