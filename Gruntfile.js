'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: [
      '/*!',
      ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)',
      ' * Copyright 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>',
      ' * Licensed under the <%= pkg.license %> license',
      ' */'
    ].join('\n') + '\n',
    clean: {
      dist: [
        'dist',
        '*-dist.zip'
      ]
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: [
          'js/<%= pkg.name %>.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        report: 'none'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      },
    },
    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      core: {
        src: 'js/*.js'
      }
    },
    less: {
      core: {
        options: {
          sourceMap: true,
          sourceMapURL: 'bootstrap-spinner.css.map',
          outputSourceFiles: true
        },
        src: 'less/bootstrap-spinner.less',
        dest: 'dist/css/bootstrap-spinner.css'
      }
    },
    cssmin: {
      core: {
        options: {
          compatibility: 'ie8'
        },
        expand: true,
        src: 'dist/css/*.css',
        ext: '.min.css'
      }
    }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies'
  });

  grunt.registerTask('default', [
    'jshint',
    'clean',
    'concat',
    'uglify',
    'less',
    'cssmin'
  ]);
};
