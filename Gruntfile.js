module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // concat: {
    //   options: {
    //     separator: ';',
    //   },
    //   dist: {
    //     src: ['public/client/**/*.js'],
    //     dest: 'public/dist/built.js'
    //   }
    // },

    // nodemon: {
    //   dev: {
    //     script: 'server.js'
    //   }
    // },

    // uglify: {
    //   my_target: {
    //     files: {
    //       'public/dist/ugly.js': ['public/dist/built.js']
    //     }
    //   }
    // },

    // cssmin: {
    //   target: {
    //     files: {
    //       'public/dist/style.min.css': ['public/style.css'],
    //     }
    //   }
    // },

    // watch: {
    //   scripts: {
    //     files: [
    //       'public/client/**/*.js',
    //       'public/lib/**/*.js',
    //     ],
    //     tasks: [
    //       'concat',
    //       'uglify'
    //     ]
    //   },
    //   css: {
    //     files: 'public/*.css',
    //     tasks: ['cssmin']
    //   }
    // },

    compass: {                  // Task 
      dist: {                   // Target 
        options: {              // Target options 
          sassDir: 'client/styles',
          cssDir: 'client/styles'
        }
      }
    }
    // shell: {
    //   prodServer: {
    //     command: 'git push live master',
    //     options: {
    //       stdout: true,
    //       stderr: true,
    //       failOnError: true
    //     }
    //   }
    // },
  });

  // Load Plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  // Register Tasks
  // grunt.registerTask('server-dev', function (target) {
  //   grunt.task.run([ 'nodemon', 'watch' ]);
  // });

  grunt.registerTask('style', function (target) {
    grunt.task.run([ 'compass' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  // grunt.registerTask('build', [
  //   'cssmin', 
  //   'concat', 
  //   'uglify'
  // ]);

  // grunt.registerTask('upload', function(n) {
  //   if (grunt.option('prod')) {
  //     grunt.task.run([ 'shell:prodServer' ]);
  //   } else {
  //     grunt.task.run([ 'server-dev' ]);
  //   }
  // });

  // grunt.registerTask('deploy', [
  //   'build',
  //   'upload'
  // ]);
};
