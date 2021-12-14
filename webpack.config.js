const path=require('path')
module.exports = {
    mode: 'development',
    entry: './client/viewer',

    output: {
        path: path.resolve(__dirname, './dist'),
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
            },
        ]
    },
  
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      
      },
      stats:false
};