const CompressionWebpackPlugin  = require('compression-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production' ? true : false;
module.exports = {
    css:{
      extract:false
    },
    publicPath: isProduction?'./':'/',
    assetsDir: isProduction?'./':'/',
    productionSourceMap: false,
    configureWebpack:{
      externals: {
        vue: 'Vue',
        'element-ui':'ELEMENT'
      },
      output:{
        chunkFilename:'[name].js'
      },
      plugins:[new CompressionWebpackPlugin()],
    },
    chainWebpack:config=>{
      config.optimization.minimize(true);
      config.optimization.splitChunks({
        chunks:'all'
      })
    },
    devServer:{
      before(app){
        app.get(/.*.(js)$/, (req, res, next) => { 
          req.url = req.url + '.gz';
          res.set('Content-Encoding', 'gzip');
          next();
        })
      }
    }
}