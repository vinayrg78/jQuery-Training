module.exports = function(grunt) {

  var path = require('path');

  // Core lint target.
  var lint = {
    core: ['grunt.js', 'server/server.js']
  };

  // Dynamically add a per-exercise lint target.
  grunt.file.expandDirs('exercises/*').forEach(function(dir) {
    var name = path.basename(dir).split(path.sep)[0];
    lint['exercise-' + name] = 'exercises/' + name + '/*.js';
  });

  // Plugin linting will be handled by the plugin-specific gruntfile.
  delete lint['exercise-plugins'];
  // This example is so broken, don't even bother trying to lint it.
  delete lint['exercise-fixing-these-jquery'];

  // For each lint target, add a same-named watch target.
  var watch = {};
  Object.keys(lint).forEach(function(name) {
    watch[name] = {
      files: lint[name],
      tasks: 'lint:' + name
    };
  });

  // Grunt config.
  grunt.initConfig({
    server: {
      port: 8000,
      base: '.'
    },
    lint: lint,
    watch: watch,
    jshint: {
      core: {
        options: {
          curly: true,
          eqeqeq: true,
          immed: true,
          latedef: true,
          newcap: true,
          noarg: true,
          sub: true,
          undef: true,
          boss: true,
          eqnull: true,
          node: true,
          es5: true,
        }
      },
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        jquery: true,
        devel: true,
      }
    }
  });

  // Override the default grunt "server" task.
  grunt.registerTask('server', 'Start the Bocoup Training server', function(arg) {
    var server = require('./server/server');
    // Get values from config, or use defaults.
    var port = grunt.config('server.port');
    var base = path.resolve(grunt.config('server.base'));

    // Start server.
    server.create(base, port);

    if (arg === 'watch') {
      // This not only keeps grunt from exiting, but also reports lint errors.
      grunt.task.run('watch');
    } else {
      // This keeps grunt from exiting (no watch).
      this.async();
    }
  });

  grunt.registerTask('build-mockajax', 'Build Ajax mocking script', function() {
    var obj = {};
    var addFile = function(filepath, contents) {
      obj['/' + filepath.replace(/\./g, '\\.') + '(\\?.*)?'] = contents;
    };
    grunt.file.expand('assets/js/test.js').forEach(function(filepath) {
      addFile(filepath, grunt.file.read(filepath));
    });
    var options = {cwd: 'server'};
    grunt.file.expand(options, 'data/**/*.json').forEach(function(filepath) {
      addFile(filepath, grunt.file.readJSON('server/' + filepath));
    });
    grunt.file.expand(options, 'templates/*.tmpl').forEach(function(filepath) {
      addFile(filepath, grunt.file.read('server/' + filepath));
    });

    // JSON-encoded values can't be functions, but this placeholder will be
    // replaced later.
    obj['/data/search\\.json(?:\\?q=(.*))?'] = 'mockedAjax.dataSearch';

    var src = [
      'if (location.protocol === "file:") {',
      '  mockedAjax.init();',
      '  $.mockAjax("*", ' + JSON.stringify(obj, null, 2).replace(/\n/g, '\n  ') + ');',
      '}'
    ].join('\n');

    // Replace placeholder with function reference.
    src = src.replace(/"(mockedAjax.dataSearch)"/, '$1');

    grunt.file.write('assets/js/mocked-ajax.js', src);
  });

  // Default grunt task.
  grunt.registerTask('default', 'server');
};
