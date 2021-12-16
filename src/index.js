const viewer=require('./views')
// // 定义插件

 class ChartPlugin{
  constructor(opts) {
    // 实例属性配置
    this.opts = {
      analyzerMode: 'server',
      analyzerHost: '127.0.01',
      reportFilename: null,
      reportTitle:opts&&opts.reportTitle||'打包资源查看' ,
      // deprecated
      // analyzerPort: 'analyzerPort' in opts ? (opts.analyzerPort === 'auto' ? 0 : opts.analyzerPort) : 9900 ,   
      analyzerPort:opts&&opts.analyzerPort||'8899',
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
      });
    }
  }
}

module.exports=ChartPlugin



