// wrapper function
module.exports = function(grunt){
    //load the plugin that provides "responsive_images" task
  grunt.loadNpmTasks('grunt-responsive-images');

	//Project configuration and task definition
	//The project configuration is defined as an object passed to grunt.initConfig()method
	grunt.initConfig({
    	responsive_images: {
        dev: {
    		options: {
      			// Task-specific options go here.
      			engine: 'im',
      			sizes: [
            {
      				width: 100,
      				upscale: true,
              quality: 60
      			}]
    		},
    		files: [{
      			// Target-specific file lists and/or options go here.
      			expand: true,
      			src: ['pizzeria.jpg'],
            cwd: 'src/views/images/',
      			dest: 'dist/views/images/'
    		}]
  		}
      } // for responsive_images
	}); // for grunt.initConfig()


  grunt.registerTask('default', ['responsive_images']);

}; //for wrapper function


