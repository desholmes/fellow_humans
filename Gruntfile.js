module.exports = function(grunt) {
 
    var srcDir = 'src/',
        distDir = 'dist/lib/',
        jsFiles = [
            {
                src: [
                    srcDir + 'fellowHumans.js'
                ],
                dest: distDir + 'fellowHumans.js'
            },
            {
                cwd: srcDir ,
                src: '**/*.js',
                dest: distDir,
                expand: true
            }
        ],
        gruntConfig = {
            pkg: grunt.file.readJSON('package.json'),
            uglify: {
                dist: {
                    options: {
                        mangle: true,
                        preserveComments: false,
                        drop_console: true,
                        compress: {
                            global_defs: {
                                DEBUG: false
                            }
                        },
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> by <%= pkg.author %> :: '
                    },
                    files: {'dist/lib/fellowHumans<%= pkg.version %>.min.js': ['src/fellowHumans.js']
                    }
                },
                dev: {
                    options: {
                        mangle: false,
                        preserveComments: true,
                        drop_console: false,
                        compress: false,
                        beautify: true
                    },
                    files: jsFiles
                }
            },
            watch: {
                scripts: {
                    files: [srcDir + '*.js'],
                    tasks: ['uglify:dev']
                }
            },
            jshint: {
                all: ['Gruntfile.js', srcDir + 'fellowHumans.js']
            }
        };
 
    grunt.initConfig(gruntConfig);
 
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
 
    grunt.registerTask('default', ['watch','jshint']);
    grunt.registerTask('dist', ['uglify:dist']);
 
};
