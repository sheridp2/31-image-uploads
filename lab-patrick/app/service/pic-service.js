'use strict'

module.exports = [
  '$q',
  '$log',
  '$http',
  'Upload',
  'authService',
  function($q, $log, $http, Upload, authService) {
    $log.debug('Pic Service')

    let service = {}

    service.uploadPic = function(gallery, pic) {
      $log.debug('#picService.uploadPic')
      console.log('pic', pic);

      return authService.getToken()
      .then(token => {
        let url = `${__API_URL__}/api/gallery/${gallery._id}/pic`
        let headers = {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }

        return Upload.upload({
          url,
          headers,
          method: 'POST',
          data: {
            name: pic.name,
            desc: pic.desc,
            file: pic.file,
          }
        })
        .then(data => {
          console.log(data)
          return data
        })
        .catch(console.error)
      })
      .then(
        res => {
          console.log('Got RESULTS', res);
          gallery.pics.push(res.data)
          return res.data
        },
        err => {
          $log.error(err.message)
          $q.reject(err)
        }
      )
    }

    return service
  }
]
