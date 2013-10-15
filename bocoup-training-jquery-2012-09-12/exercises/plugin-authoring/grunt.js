/*global module:false, require:false*/
module.exports = function(grunt) {
  // Bypass the qunit task if PhantomJS isn't installed.
  var hasPhantom = false;

  var path = require('path');

  // Task configuration to be dynamically built.
  var lint = {core: ['grunt.js']};
  var qunit = {};
  var watch = {core: {files: ['grunt.js'], tasks: 'lint:core'}};

  // Create a version-specific task as well as lint, qunit and watch targets
  // for each src file.
  grunt.file.expand('src/zebra*').forEach(function(filepath) {
    // Basename. Eg, src/zebra-stripe1.js -> zebra-stripe1
    var name = path.basename(filepath, '.js');
    // Create version-specific lint task target.
    lint[name] = [filepath, 'test/' + name + '_test.js'];
    // Create version-specific qunit task target.
    qunit[name] = ['test/' + name + '.html'];
    // Register version-specific alias task.
    var tasks = ['lint:' + name];
    if (hasPhantom) { tasks.push('qunit:' + name); }
    grunt.registerTask(name, tasks);
    // Create version-specific watch task target.
    watch[name] = {files: lint[name], tasks: name};
  });

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:zebra-stripe.jquery.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
      dist: {
        src: [
          '<banner:meta.banner>',
          '<file_strip_banner:src/<%= pkg.name %>1.js>',
          '<file_strip_banner:src/<%= pkg.name %>2.js>',
          '<file_strip_banner:src/<%= pkg.name %>3.js>'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },

    // These config objects are built dynamically.
    qunit: qunit,
    lint: lint,
    watch: watch,

    jshint: {
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
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {}
  });

  // Default task.
  var defaultTasks = hasPhantom ? 'lint qunit concat min' : 'lint concat min';
  grunt.registerTask('default', defaultTasks);

};
