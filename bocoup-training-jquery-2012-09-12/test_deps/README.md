# Getting ready for Bocoup training

## Install the latest version of Node.js
**Node.js is a platform built on [Chrome's V8 JavaScript engine](http://code.google.com/p/v8/) that can be run via the command line.**

Install v0.8.8 or newer using a [package manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager) or by downloading an installer from [nodejs.org](http://nodejs.org/).

Quick installer links:
Windows [32-bit](http://nodejs.org/dist/v0.8.8/node-v0.8.8-x86.msi), [64-bit](http://nodejs.org/dist/v0.8.8/x64/node-v0.8.8-x64.msi),
OS X [Universal](http://nodejs.org/dist/v0.8.8/node-v0.8.8.pkg)

You can test to see that Node installed correctly by running both `node --version` and `npm --version` via the command line. The npm (Node package manager) version will be different than node's version.

Also note that running `node` by itself will enter into an interactive mode where you can type JavaScript to be executed. Pressing Ctrl-C twice will exit. Running `node file.js` will execute the code in `file.js`.

### Accessing the command line
**Windows**

Open **cmd.exe** (From the Start Menu, search for "cmd"). When installing npm modules globally, you may need to "Run as administrator," which you can do by right-clicking the `cmd` name in the programs list.

**OS X**

Open **Terminal.app** in `/Applications/Utilities`.

**Linux**

You already know how to do this.

## Install `grunt` globally via npm.
**Grunt is a task-based command line build tool for JavaScript projects. Learn more about grunt at [gruntjs.com](http://gruntjs.com/).**

Install grunt v0.3.15 or newer. Via the command line, type `npm install -g grunt` to install grunt globally. If installed correctly, running `grunt --version` should output the grunt version.

**Windows**

If you don't have permission to install grunt globally, **cmd.exe** may need to be run as administrator.

**OS X / Linux**

If you don't have permission to install grunt globally, you may need to install grunt with `sudo npm install -g grunt`. Type your password when it asks (you'll need to have administrator access for this to work).

## Test with the "test_deps" project.
**This very basic sample project will test that Node.js, npm, grunt and all dependencies have been installed correctly.**

1. Download the [test_deps.zip](https://dl.dropbox.com/u/294332/Bocoup/test_deps.zip) file.
1. Unzip this file somewhere you have write access.
1. Via the command line, `cd` to the `test_deps` directory (if you don't know how to do this, google it). This directory should contain a `package.json` npm manifest, a `grunt.js` gruntfile and this `README.md` file.
1. Run `npm install` to install all the dependencies listed in `package.json`.
1. Run `grunt` (Windows users run `grunt.cmd`) to test that all dependencies were installed correctly.

Everything was successful if grunt exits with the message "Dependencies appear to be installed correctly." In that case, you may delete the "test_deps" directory. Upon receiving class materials, you will follow these same steps to initialize them.

If errors were encountered, ensure that you have write access to modify the current directory and that the previous `npm` installs didn't have any errors. In some rare cases, it may be necessary to clean npm's internal caches with the `npm cache clean` command.
