import { imageHyungumak, imageMagya, imagePaz, imageSally } from '../assets';

export const SERVER_ID = 'serverId';
export const ACCESS_TOKEN = 'accessToken';

export const SERVER_LIST = {
  Magya: {
    id: 'Magya',
    name: '정찬영',
    nickname: '마갸',
    imgSrc: imageMagya,
    endpoint: 'https://subway-myagya.kro.kr/api',
  },
  Sally: {
    id: 'Sally',
    name: '조연우',
    nickname: '샐리',
    imgSrc: imageSally,
    endpoint: 'https://yeonwoocho.p-e.kr/api',
  },
  Paz: {
    id: 'Paz',
    name: '강승윤',
    nickname: '파즈',
    imgSrc: imagePaz,
    endpoint: 'https://bepoz-subway.kro.kr/api',
  },
  Hyungumak: {
    id: 'Hyungumak',
    name: '최현구',
    nickname: '현구막',
    imgSrc: imageHyungumak,
    endpoint: 'https://hyeon9mak-subway.o-r.kr/api',
  },
};
