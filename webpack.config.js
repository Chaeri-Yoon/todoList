const path = require("path");

module.exports = {
  mode: "none", 
  entry: path.resolve(__dirname, "src", "assets", "js", "main.js"),
  output: {
    path:path.join(__dirname, "static"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
            {
                loader: "babel-loader"
            }
        ]
      }
    ]
  }
}