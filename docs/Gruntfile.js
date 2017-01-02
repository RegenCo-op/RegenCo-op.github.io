module.exports = function (grunt) {
    var path = require('path');


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
            test:{
                files: [ //Reference files to update
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

   
    grunt.registerMultiTask('referUpdate', 'Update references.',function(){
        //Generates a dictionary of references if the destination reference exists
        //Passes information on to another task to replace references in whatever files you want
        var options = this.options({
            prefix: "/",
        });
        if(!this.data.update){
            grunt.fail.fatal("Must specify files to update");
        }

        var updatefiles = grunt.task.normalizeMultiTaskFiles(this.data.update, this.target);

        //Loop through each source file
        var regex_dict = {};
        var path_dict = {};
        this.files.forEach(function(file) {

            srcpath = file.src[0];

            if(!grunt.file.isFile(srcpath)){
                grunt.log.warn("Src is not valid.");
                return;
            }
            var topdir = options.prefix + (file.orig.cwd || '');
            var destdir = options.prefix + (file.orig.dest || '');

            //Check if file exists in destination
            if(grunt.file.isFile(file.dest)){
                //Add file path that changes to the current directory that doesnt change
                if(!regex_dict[topdir])
                {
                    regex_dict[topdir] = '(' + topdir + ')(';
                }
                regex_dict[topdir] += srcpath.replace(file.orig.cwd,'') + "|";
                path_dict[options.prefix + srcpath] = destdir;
            }
            else{
                grunt.log.writeln('File NOT found: "' + (file.dest) + '".');
            }
        });
        var preregex = '(?:';
        for(key in regex_dict){
            if(regex_dict[key]){
                preregex += regex_dict[key].slice(0,-1) + ')|';
            }
        }
        preregex = preregex.slice(0,-1) + ')';
        var re = new RegExp(preregex, 'g');

        /// Update requested files with the new references ///
        var num_changes = 0;
        var tot_changes = 0;
        var num_files = 0;

        function getNewPath(match, p1, p2){
            var new_dir = path_dict[match];
            var new_path = new_dir + p2;
            grunt.verbose.writeln('| Match found: "' + match + '".\n| - Replaced with: "' + new_path + '".');
            num_changes++;
            return new_path;
        }

        updatefiles.forEach(function (file) {
            var srcs = file.src.filter(function (filepath) {
                // Remove nonexistent files (it's up to you to filter or warn here).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else if (!grunt.file.isFile(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" is not a file.');
                    return false;
                } else {
                    return true;
                }
            });

            srcs.forEach(function(filepath){
                var old_file = grunt.file.read(filepath);
                var new_file = old_file.replace(re, getNewPath);
                if (new_file != old_file){
                    grunt.file.write(file.dest, new_file);
                    grunt.log.ok('File "' + file.dest + '" updated with (' + num_changes + ') changes.');
                    tot_changes += num_changes;
                    num_files++;
                }
                else{
                    grunt.verbose.ok('File "' + filepath + '" had no replacements.');
                }
                num_changes = 0;
            });
        });
        grunt.log.writeln('(' + tot_changes + ') references were updated, across (' + num_files + ') files.');
    });

    // Default task(s).
    grunt.registerTask('default');
    grunt.registerTask('test123', ['copy:imagepaths']);
};