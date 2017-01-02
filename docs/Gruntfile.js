module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        imagemin: {
            options: {
                optimizationLevel: 4,
                svgoPlugins: [{ removeViewBox: false },
                            { removeUselessStrokeAndFill: false }],
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: 'images/',
                        src: ['**/*.{png,jpg,gif,svg}', '!compressed/**'],
                        dest: 'images/compressed/'
                    },
                ],
            },
        },

        copy: {
            imagepaths: { //Replace all
                files: [ 
                    {
                        expand: true,
                        cwd: '',
                        src: ['**/*.{md,html,css,scss}','!{_site,node_modules,.sass_cache}/**'],
                        dest: ''
                    },
                ],
                options: {
                    process: function (content, srcpath) {
                        return content.replace(/(\/images\/)((?!compressed\/).+?\.(?:png|jpg|gif|svg))/g, '$1compressed/$2');
                    },
                },
            },
        },

        // watch: {
        //     newImages:{
        //         options: {
        //             cwd: {
        //                 files: 'images/'
        //             }
        //         },
        //         files: ['**/*.{png,jpg,gif,svg}', '!compressed/**'],
        //         tasks: ['newer:imagemin', 'newer:copy:imagepaths']
        //     }
        // }
    });

    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default');
    grunt.registerTask('test123', ['copy:imagepaths']);
};