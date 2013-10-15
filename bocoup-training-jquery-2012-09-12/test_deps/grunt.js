module.exports = function(grunt) {
  var fs = require('fs');
  var path = require('path');

  grunt.registerTask('test_deps', 'Test that dependencies were installed correctly.', function() {
    var errorCount = 0;
    var testLib = function(name) {
      grunt.log.write('Testing "' + name + '" lib...');
      if (fs.existsSync(path.resolve('node_modules', name))) {
        grunt.log.ok();
      } else {
        errorCount++;
        grunt.log.error();
      }
    };

    testLib('grunt');
    testLib('Faker');
    testLib('express');
    testLib('underscore');

    if (errorCount > 0) {
      grunt.fail.fatal('Errors were encountered. Did you "npm install" ?');
    } else {
      grunt.log.writeln('Dependencies appear to be installed correctly.');
    }
  });

  // Default grunt task.
  grunt.registerTask('default', 'test_deps');

};
