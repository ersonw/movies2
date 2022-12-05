const NetWorkUtil = {
  videoConcentrations: '/api/video/concentrations',
  videoPublicity: '/api/video/publicity',
  videoPublicityReport: '/api/video/publicity/report/{id}',
  concentrationsAnytime: '/api/video/concentrations/anytime/',
  concentrations: '/api/video/concentrations/{id}/{page}',
  videoDiamond: '/api/video/diamond/{page}',
  videoMembership: '/api/video/membership/{page}',
  videoPlayer: '/api/video/player/{id}',
  userLoginPhone: '/api/user/login/phone',
  userLoginSms: '/api/user/login/sms/{phone}',
  userLogin: '/api/user/login',
  checkDevice: '/api/device/check/{deviceId}',
  registerSms: '/api/user/register/sms/{phone}',
  register: '/api/user/register',
};
export default NetWorkUtil;
