// fichier webpack.config.js

const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [
          path.resolve(__dirname, 'node_modules/pdfjs-dist/web')
        ]
      }
    ]
  }
};
