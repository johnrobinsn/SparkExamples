const webpack  = require('webpack');
const path     = require('path');
const CopyPlugin = require('copy-webpack-plugin');
        
//const SparkPluginImports = require('spark-plugin-imports');
// const googleCC = require('webpack-closure-compiler');

let config = {
    mode: 'development',         // web-pack should default to 'development' build
    watch: false,                // web-pack watches for changes .. and re-builds
    devtool: 'cheap-source-map', //cheap-source-map', //'source-map',
    // optimization: {
    //     runtimeChunk: false,     // seperate file for WebPack Bootstrap
    // },
    entry:  [

        ////////////////////////////////////////////////////////////////////////////////
        //
        //  INPUT FILES
        //
        path.resolve(__dirname, './src/SparkPowerOff.js'),
    ],
    node: {
        fs: 'empty',
        global:false,
        process:false,
        Buffer:false
      },

        ////////////////////////////////////////////////////////////////////////////////
        //
        //  OUTPUT FILES
        //
        // optimization: {
        //    // minimize: true,
        //     moduleIds: 'named'
        //   },
    output: {
        filename: 'output.js'
    },
    resolve: {
        alias: {
            images: path.resolve(__dirname, './images/'),
            "px.getPackageBaseFilePath()": __dirname
        }
    },

    devServer:
    {
        ////////////////////////////////////////////////////////////////////////////////
        //
        //  DEV SERVER
        //
        contentBase: path.join(__dirname, "./dist/"),
        publicPath:  path.join(__dirname, "./dist/"),
        inline: false,
        // compress: true,
        port: 8080
    },
    module:
    {
        rules:
        [
        ////////////////////////////////////////////////////////////////////////////////
        //
        //  LOADER: Images
        //
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
            {
                loader: 'file-loader?name=/images/[name].[ext]',
            },
            {
                loader: 'image-webpack-loader?name=/images/[name].[ext]',
                options: {
                    bypassOnDebug: true,  // webpack@1.x
                    disable:       false, // webpack@2.x and newer
                },
            }]

            //NOTE:  image-webpack-loader >>> will 'optimize' images to destination
        },
        ////////////////////////////////////////////////////////////////////////////////
        //
        //  LOADER: Fonts
        //
        {
            test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            }]
        }
        ]//rules
    },//modules

    ////////////////////////////////////////////////////////////////////////////////
    //
    //  PLUG-IN: Google Closure Compiler
    //
    plugins: 
    [
        // new googleCC({
        //     compiler: {
        //         language_in:       'ECMASCRIPT6',
        //         language_out:      'ECMASCRIPT5',
        //         compilation_level: 'SIMPLE' //  'SIMPLE' or 'ADVANCED'
        //     },
        //     concurrency: 3,
        // }),
        new CopyPlugin([
            { from: path.join(__dirname, "./src/Background.jpg"), to: 'Background.jpg' },
        ]),
    ]
    ////////////////////////////////////////////////////////////////////////////////
};

module.exports = config;
