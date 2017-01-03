/*
 * grunt-referUpdate
 * 
 *
 * Copyright (c) 2017 BHennen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
        reporterOutput: "",
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    referUpdate: {
      newRefs:{
        files: [
          {
            expand: true,
            cwd: 'test/fixtures/references/',
            src: ['**/*', '!processed/**'],
            dest: 'test/fixtures/references/processed/'
          },
        ],
        update: {
          files: [
            {
              expand: true,
              cwd: 'test/fixtures/updateFiles/',
              src: ['newRefs.md'],
              dest: 'tmp/'
            },
          ],
        },
      },

      unprocessedRef:{
        files: [
          {
            expand: true,
            cwd: 'test/fixtures/references/',
            src: ['**/*', '!processed/**'],
            dest: 'test/fixtures/references/processed/'
          },
        ],
        update: {
          files: [
            {
              expand: true,
              cwd: 'test/fixtures/updateFiles/',
              src: ['unprocessedRef.html'],
              dest: 'tmp/'
            },
          ],
        },
      },

      noNewRefs:{
        files: [
          {
            expand: true,
            cwd: 'test/fixtures/references/',
            src: ['**/*', '!processed/**'],
            dest: 'test/fixtures/references/processed/'
          },
        ],
        update: {
          files: [
            {
              expand: true,
              cwd: 'test/fixtures/updateFiles/',
              src: ['noNewRefs.html'],
              dest: 'tmp/'
            },
          ],
        },
      },

      noRefs:{
        files: [
          {
            expand: true,
            cwd: 'test/fixtures/references/',
            src: ['**/*', '!processed/**'],
            dest: 'test/fixtures/references/processed/'
          },
        ],
        update: {
          files: [
            {
              expand: true,
              cwd: 'test/fixtures/updateFiles/',
              src: ['noRefs.html'],
              dest: 'tmp/'
            },
          ],
        },
      },

    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "output" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s)
  grunt.registerTask('output', ['clean', 'referUpdate']);

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'referUpdate', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
