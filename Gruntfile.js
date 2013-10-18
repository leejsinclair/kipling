module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    'folders': {
      'coffee': 'public/coffee',
      'js': 'public/javascripts',
      'bootstrap': 'public/bootstrap',
      'css': 'public/stylesheets'
    },
    'pkg': grunt.file.readJSON('package.json'),
    'watch': {
      'js': {
        'files': '<%= folders.js %>/src/{,*/}*.js',
        'tasks': [ 'jshint', 'uglify' ]
      },
      'less': {
        'files': '<%= folders.css %>/{,*/}*.less',
        'tasks': [ 'less' ]
      }
    },
    'coffee': {
      'compile': {
        'options': {
          'sourceMap': true,
          'join': true
        },
        'files': {
          '<%= folders.coffee %>/build/coffee.js': [ '<%= folders.coffee %>/src/{,*/}*.coffee' ]
        }
      }
    },
    'less': {
      'development': {
        'options': {
          'report': 'min',
          'compress': false,
          'optimization': 1
        },
        'files': {
          '<%= folders.css %>/<%= pkg.name %>.css': [ '<%= folders.css %>/src/main.less' ]
        }
      }
    },
    'jshint': {
      'options': {
        'jshintrc': '.jshintrc'
      },
      'all': [
        '<%= folders.js %>/src/**.js'
      ]
    },
    'uglify': {
      'options': {
        'banner': '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        'mangle': false
      },
      'build': {
        'src': [ '<%= folders.js %>/src/jquery/{,*/}*.js', '<%= folders.js %>/src/bootstrap/{,*/}*.js', '<%= folders.js %>/src/angular/angular.js', '<%= folders.js %>/src/angular/lib/{,*/}*.js', '<%= folders.js %>/src/app.js', '<%= folders.js %>/src/controllers/{,*/}*.js' ],
        'dest': '<%= folders.js %>/build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', [ 'jshint', 'uglify', 'less', 'watch']);

};