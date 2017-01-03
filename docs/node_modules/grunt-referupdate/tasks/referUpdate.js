/*
 * grunt-referUpdate
 * 
 *
 * Copyright (c) 2017 BHennen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  var path = require('path');

  grunt.registerMultiTask('referUpdate', 'Update references only if the referenced file exists, based on files you choose.', function () {
    //Generates a dictionary of references if the destination reference exists
    //Then, using "update" files of your choice, replaces old references with new ones
    var options = this.options({
      prefix: "/",
    });
    if (!this.data.update) {
      grunt.fail.fatal("Must specify files to update");
    }

    var updatefiles = grunt.task.normalizeMultiTaskFiles(this.data.update, this.target);

    //Loop through each source file
    var regex_dict = {};
    var path_dict = {};
    var ref_num = 0;
    this.files.forEach(function (file) {
      
      var srcpath = file.src[0];

      if(!grunt.file.isFile(srcpath)){
        grunt.log.warn("Source: " + srcpath + " is not a file.");
        return;
      }

      var topdir = options.prefix + (file.orig.cwd || '');
      var destdir = options.prefix + (file.orig.dest || '');

      //Check if file exists in destination
      if (grunt.file.isFile(file.dest)) {
        //Add file path that changes to the current directory that doesnt change
        if (!regex_dict[topdir]) {
          regex_dict[topdir] = '(' + topdir + ')(';
        }
        var rel_filepath = srcpath.replace(file.orig.cwd, '');
        regex_dict[topdir] += rel_filepath + "|";
        path_dict[options.prefix + srcpath] = destdir;
        ref_num++;
        grunt.verbose.ok("Reference (" + ref_num + ") map: '" + options.prefix + srcpath + "' -> '" + destdir + rel_filepath + "'");
      }
      else {
        grunt.log.warn('New reference does NOT exist: "' + (file.dest) + '".');
      }
    });
    var preregex = '(?:';
    for (var key in regex_dict) {
      if (regex_dict[key]) {
        preregex += regex_dict[key].slice(0, -1) + ')|';
      }
    }
    preregex = preregex.slice(0, -1) + ')';
    grunt.verbose.ok('Using the following regex to match references: ');
    grunt.verbose.writeln('\t'+preregex + '\n');
    var re = new RegExp(preregex, 'g');

    /// Update requested files with the new references ///
    var num_changes = 0;
    var tot_changes = 0;
    var num_files = 0;

    function getNewPath(match, p1, p2) {
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

      srcs.forEach(function (filepath) {
        var old_file = grunt.file.read(filepath);
        var new_file = old_file.replace(re, getNewPath);
        var is_new_file = !grunt.file.arePathsEquivalent(filepath, file.dest);
        if (new_file !== old_file) {
          grunt.file.write(file.dest, new_file);
          grunt.log.ok('File "' + file.dest + '" ' + (is_new_file ? 'created':'updated') + ' with (' + num_changes + ') changes.');
          tot_changes += num_changes;
          num_files++;
        }
        else {
          grunt.verbose.ok('File "' + filepath + '" had no replacements.' + (is_new_file?' Copying to new path...':' Nothing changed.'));
          if(is_new_file) {grunt.file.write(file.dest, new_file);}
        }
        num_changes = 0;
      });
    });
    grunt.log.writeln('(' + tot_changes + ') references were updated, across (' + num_files + ') files.');
  });
};
