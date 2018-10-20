var path = require('path');

module.exports = {
    entry: './src/bug_report',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bug_report.bundle.js'
    },
    mode: 'production',
    watch: true,
    watchOptions: {
        aggregateTimeout: 300
    }
};
