module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig
    coffee:
      app:
        expand: true
        cwd: 'src'
        src: ['**/*.coffee']
        dest: 'lib'
        ext: '.js'
    watch:
      app:
        files: '**/*.coffee'
        tasks: ['coffee']
    mochaTest:
      test:
        options:
          reporter: 'spec'
        src: ['lib/test/**/*.js']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-mocha-test'

  grunt.registerTask 'default', ['coffee']

  grunt.registerTask 'build', ['coffee']
  
  grunt.registerTask 'test', ['coffee', 'mochaTest']