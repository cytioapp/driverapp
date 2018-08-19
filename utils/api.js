import SInfo from 'react-native-sensitive-info';
import axios from 'axios';
import { Platform } from 'react-native';

class Api {
  static headers = async function(contentType) {
    const options = {
      sharedPreferencesName: 'taxiappdriver',
      keychainService: 'taxiappdriver'
    };
    const jwt = await SInfo.getItem('jwt', options);
    let auth_header = 'Bearer ' + jwt;

    return {
      Authorization: auth_header,
      'Content-Type': contentType || 'application/json'
    };
  };

  // Todas las llamadas pasan por aquí
  static xhr = async function(route, params, verb) {
    const host = 'https://cytio.com.mx/api';
    const url = `${host}${route}`;
    const headers = await this.headers();
    const options = {
      url: url,
      method: verb,
      headers: headers,
      data: params
    };
    return axios(options);
  };

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT');
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE');
  }

  static postImage = function(path, params) {
    var data = new FormData();
    data.append('public_service_permission_image', {
      uri: params.photo.uri,
      type: 'image/jpeg', // o params.photo.type
      name: params.photo.fileName
    });
    
    const url = 'https://cytio.com.mx/api/drivers' + path;
    
    if (Platform.OS === 'android') {
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.responseType = 'json';
        xhr.send(data);
        xhr.onload = () => {
          if (xhr.status == 200) {
            resolve(xhr.response);
          } else {
            reject();
          }
        }
      });
    } else {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data; charset=utf-8; boundary=__X_PAW_BOUNDARY__\'',
          Accept: 'application/json'
        },
        body: data
      };
      return fetch(url, options);
    }
  }
}

export default Api;
