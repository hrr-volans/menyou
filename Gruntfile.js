module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dist: {
        options: {
          sassDir: 'client/styles',
          cssDir: 'client/styles'
        }
      }
    },
    watch: {
      scripts: {
        files: '**/*.scss',
        tasks: ['compass'],
        options: {
          interrupt: true,
        },
      },
    },
  });


  // grunt.loadNpmTasks('grunt');

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['compass', 'watch']);
};
