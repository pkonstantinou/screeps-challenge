require('dotenv').config();

module.exports = (grunt) => {
  grunt.loadNpmTasks('grunt-screeps');

  grunt.initConfig({
    screeps: {
      options: {
        email: process.env.SCPREEPS_EMAIL,
        password: process.env.SCPREEPS_PASSWORD,
        branch: process.env.SCPREEPS_BRANCH,
      },
      dist: {
        src: ['src/*.js'],
      },
    },
  });
};
