module.exports = function(grunt) {

    grunt.initConfig({
        electron: {
            windows: {
                options: {
                    name: 'GameKeyManager',
                    dir: 'src',
                    out: 'build',
                    platform: 'win32',
                    arch: 'x64'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-electron');
    grunt.registerTask('default', ['electron']);
};