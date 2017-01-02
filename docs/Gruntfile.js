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

        fileRegex: {
            test:{
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
            },
        },

        //update from: images/image.png to images/compressed/image.png
        //  only if images/compressed/image.png exists in said folder.
        // 
        //  //Get a string regex that will match all images in the compressed image folder
        //  string images_regex = "(?:"
        //  
        //  for each <image> in <assests_dir>:
        //      images_regex += 'image.basename'
        //      if image.index is not last:
        //          images_regex += '|'
        //
        //  images_regex += ")"
        //
        //  //Loop through desired files and regex replace "old" regex match with new
        //  string old_regex = "/\/images\/" + images_regex + "/g"


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

    //Generate regex from filenames given a glob path
    grunt.registerMultiTask('fileRegex', 'Update references.',function(){
        var options = this.options({
            prefix: "/",
        });

        //Loop through each source file
        var regex_dict = {};
        var path_dict = {};
        this.files.forEach(function(file) {
            
            // grunt.log.writeln(JSON.stringify(file));

            srcpath = file.src[0];

            if(!grunt.file.isFile(srcpath)){
                grunt.log.warn("Src is not valid.");
                return;
            }
            var topdir = options.prefix + (file.orig.cwd || '');
            var destdir = options.prefix + (file.orig.dest || '');
            // grunt.log.writeln("adding topdir: " + topdir);
            // grunt.log.writeln("adding destdir: " + destdir);
            //Check if file exists in destination
            if(grunt.file.isFile(file.dest)){
                //Add file path that changes to the current directory that doesnt change
                if(!regex_dict[topdir])
                {
                    regex_dict[topdir] = '(' + topdir + ')(';
                }
                regex_dict[topdir] += srcpath.replace(file.orig.cwd,'') + "|";
                srcpath = options.prefix + srcpath;
                path_dict[srcpath] = destdir;
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
        //var postregex = preregex.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        //grunt.log.writeln("file pre: " + preregex);
        //grunt.log.writeln("file post: " + postregex);
        var re = new RegExp(preregex, 'g');
        // for(key in path_dict){
        //     grunt.log.writeln(key + "\t maps to: \t" + path_dict[key]);
        // }
        grunt.option('path_ref_dict', [re, path_dict]);
    });

    //File reference updater
    grunt.registerMultiTask('referUpdate', 'Update references.',function(){

        var re = grunt.option("path_ref_dict")[0];
        
        grunt.log.writeln(re.test("/images/logo.png")+ ' and '+re.test("nope.png"));



        // this.files.forEach(function(file) {

        //     var srcs = file.src.filter(function(filepath) {
        //         // Remove nonexistent files (it's up to you to filter or warn here).
        //         if (!grunt.file.exists(filepath)) {
        //             grunt.log.warn('Source file "' + filepath + '" not found.');
        //             return false;
        //         } else if (!grunt.file.isFile(filepath)){
        //             grunt.log.warn('Source file "' + filepath + '" is not a file.');
        //             return false;
        //         } else {
        //             return true;
        //         }
        //     });

        //     var old_regex = new RegExp(this.options().old_regex, 'g');
        //     var new_regex = this.options().new_regex;

        //     srcs.forEach(function(filepath){
        //         var old_file = grunt.file.read(filepath);
        //         var new_file = old_file.replace(old_regex, new_regex);
        //         if (new_file != old_file){
        //             //grunt.file.write(filepath.dest, contents);
        //             grunt.log.writeln('File "' + file.dest + '" updated.');
        //         }
        //         else{
        //             grunt.log.writeln('File "' + filepath + '" had no replacements.');
        //         }
        //     });
        // });
    });//End file reference updater

    // Default task(s).
    grunt.registerTask('default');
    grunt.registerTask('test123', ['copy:imagepaths']);
};