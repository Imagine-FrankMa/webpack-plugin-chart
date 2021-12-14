const viewer=require('./views')
// // 定义插件

 class ChartPlugin{
  constructor(opts) {
    // 实例属性配置
    this.opts = {
      analyzerMode: 'server',
      analyzerHost: 'localhost',
      reportFilename: null,
      reportTitle: 'yaya',
      // deprecated
      // analyzerPort: 'analyzerPort' in opts ? (opts.analyzerPort === 'auto' ? 0 : opts.analyzerPort) : 9900 ,   
      analyzerPort:8900,
      webSocketPort:2048
     }
    this.server = null;
  }

  // 钩子
  apply(compiler) {
    this.compiler = compiler;

   
    if (compiler.hooks) {
      compiler.hooks.done.tapAsync('webpack-plugin-chart', (compilation)=>{
        console.log('compilation');
        

        this.startAnalyzerServer(compilation)
        
      });
    } else {
      compiler.plugin('done', done);
    }
  }
  async startAnalyzerServer(compilation) {
    console.log('startAnalyzerServer');
    
    if (this.server) {
      (await this.server)
    } else {
      this.server = viewer.startServer(compilation, {
        host: this.opts.analyzerHost,
        reportTitle: this.opts.reportTitle,
        analyzerPort:this.opts.analyzerPort,
        webSocketPort:this.opts.webSocketPort
      });
    }
  }
}

module.exports=ChartPlugin



