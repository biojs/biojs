module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		jsdoc : {
			dist : {
				src: ['src/main/javascript/*.js'], 
				options: {
					destination: 'doc',
					template: 'src/doc/biojsTemplate'
				}
			}
		}
		
    });

	grunt.loadNpmTasks('grunt-jsdoc');
    grunt.registerTask('default', ['jsdoc']);

};