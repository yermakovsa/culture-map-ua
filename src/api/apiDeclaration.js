import {DefaultApi as MonumentApi} from "./../monumentApi/api"

// const monumentURL = 'https://monument-be-v1-dev-oksrzfh66a-lm.a.run.app/'

const monumentApi = new MonumentApi(
    window._env_.REACT_APP_MONUMENT_SERVICE_URL + "/api/v1"
);

export {monumentApi}