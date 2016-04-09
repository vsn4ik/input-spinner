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
    qunit: {
      files: 'js/tests/index.html'
    },
    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      gruntfile: {
        options: {
          jshintrc: 'grunt/.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      core: {
        src: 'js/*.js'
      },
      test: {
        options: {
          jshintrc: 'js/tests/unit/.jshintrc'
        },
        src: 'js/tests/unit/*.js'
      },
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
    },
    compress: {
      dist: {
        options: {
          archive: '<%= compress.dist.dest %>.zip'
        },
        expand: true,
        cwd: 'dist',
        src: '**',
        dest: '<%= pkg.name %>-<%= pkg.version %>-dist'
      }
    }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies'
  });

  grunt.registerTask('default', [
    'jshint',
    'qunit',
    'clean',
    'concat',
    'uglify',
    'less',
    'cssmin',
  ]);

  grunt.registerTask('prep-release', [
    'default',
    'compress'
  ]);
};
