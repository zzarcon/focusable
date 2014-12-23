module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    jshint: {
      files: ['gruntfile.js', 'app/*.js'],
      options: {
        eqeqeq: true,
        eqnull: true,
        latedef: true,
        undef: true,
        globalstrict: true,
        force: true,
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true,
          Ember: true,
          $: true,
          App: true
        }
      }
    },

    concat: {
      test_libs: {
        src: ['test/libs/jquery-2.1.1.js'],
        dest: 'test/lib.js'
      },
    },

    uglify: {
      build: {
        src: ['app/focus-element-overlay.js'],
        dest: 'app/focus-element-overlay.min.js'
      }
    },

    qunit: {
      all: {
        options: {
          urls: [
            'http://localhost:9092/index.html'
          ],
          force: true
        }
      }
    },

    watch: {
      tests: {
        files: ['test/**/*.js'],
        tasks: ['qunit'],
        options: {
          debounceDelay: 100
        }
      }
    },
    connect: {
      test: {
        options: {
          port: 9092,
          base: ['.', 'test']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.registerTask('release', ['jshint', 'uglify']);
  grunt.registerTask('test', ['concat:test_libs', 'connect:test', 'qunit']);
  grunt.registerTask('default', ['test', 'watch']);
};