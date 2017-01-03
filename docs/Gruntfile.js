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

        referUpdate: {
            images:{
                files: [ 
                    {
                        expand: true,
                        cwd: 'images/',
                        src: ['**/*.{png,jpg,gif,svg}', '!compressed/**'],
                        dest: 'images/compressed/'
                    },
                ],
                update:{
                    files:[
                        {
                            expand: true,
                            cwd: '',
                            src: ['**/*.{md,html,css,scss}', '!{_site,node_modules,.sass_cache}/**'],
                            dest: ''
                        },
                    ],
                },
            },
        },

        watch: {
            newImages:{
                options: {
                    cwd: {
                        files: 'images/'
                    }
                },
                files: ['**/*.{png,jpg,gif,svg}', '!compressed/**'],
                tasks: ['compImgs'],
            }
        },

        refUpdateWrap: {
            images:{
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
    });

    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');    
    grunt.loadNpmTasks('grunt-referupdate');

    // Default task(s).
    grunt.registerTask('default');
    grunt.registerTask('compImgs', ['newer:imagemin:images', 'referUpdate:images']);
};