module.exports = function(grunt) {
  grunt.initConfig({
    compass: {
      dist: {
        options: {
          sassDir: 'client/styles',
          cssDir: 'client/styles'
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt');

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask('default', ['compass']);
};
