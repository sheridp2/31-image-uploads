'use strict';

// require('./_upload-pic.scss')

module.exports = {
  template: require('./upload-pic.html'),
  controllerAs: 'uploadPicCtrl',
  bindings: {
    gallery: '<',
  },
  controller: [
    '$log', 'picService', function($log, picService) {
      this.$onInit = () => {
        $log.debug('uploadPicController');
        this.pic = {};

        this.uploadPic = () => {
          console.log('SHIT', this.pic);
          picService.uploadPic(this.gallery, this.pic)
          .then(
            () => {
              this.pic.name = null;
              this.pic.desc = null;
              this.pic.file = null;
            },
            err =>{
              console.log('ASLFHLKJAF:JFLKFNL');
              $log.error(err)
            }
          );
        };
      };
    },
  ],
};
