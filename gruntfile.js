var mm = {};
mm["../app/web/index.min.js"] = ["../app/web/index.js"];

var option = {
    uglify: {
        my_target: {
            options: {
            },
            files : {}
        },
        mm: {
            options: {
                "output.comments": false
            },
            files: mm
        }
    },

    cssmin : {
        options: {},
        build: {
            files: {
                '../app/web/styles/admin/default/index.min.css': '../app/web/styles/admin/default/index.css'
            }
        }
    }
};

module.exports = function(grunt) { 
    grunt.initConfig(option);
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin']);
};