import * as postsAPI from '../api/posts'; // api/posts 안의 함수 모두 불러오기
import {
  // createPromiseThunk,
  reducerUtils,
  handleAsyncActions,
  // createPromiseThunkById,
  handleAsyncActionsById,
  createPromiseSaga,
  createPromiseSagaById,
} from '../lib/asyncUtils';
import { takeEvery, getContext, select } from 'redux-saga/effects';
/* 액션 타입 */

// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패
const GO_TO_HOME = 'GO_TO_HOME';
// 포스트 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';
const PRINT_STATE = 'PRINT_STATE';
// 포스트 비우기
const CLEAR_POST = 'CLEAR_POST';

// 아주 쉽게 thunk 함수를 만들 수 있게 되었습니다.
// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
// export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);

// redux-saga 이용 순수 액션 생성함수

export const getPosts = () => ({ type: GET_POSTS });
export const getPost = (id) => ({ type: GET_POST, payload: id, meta: id });
export const printState = () => ({ type: PRINT_STATE });

const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById);

function* goToHomeSaga() {
  const history = yield getContext('history');
  history.push('/');
}

function* printStateSaga() {
  const state = yield select((state) => state.posts);
  console.log(state);
}

export function* postsSaga() {
  //모니터링 작업
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
  yield takeEvery(GO_TO_HOME, goToHomeSaga);
  yield takeEvery(PRINT_STATE, printStateSaga);
}

// export const goToHome = () => (dispatch, getState, { history }) => {
//   history.push('/');
// };

export const goToHome = () => ({ type: GO_TO_HOME });

export const clearPost = () => ({ type: CLEAR_POST });

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
  posts: reducerUtils.initial(),
  post: {},
};

const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts', true);
const getPostReducer = handleAsyncActionsById(GET_POST, 'post', true);
export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return getPostsReducer(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return getPostReducer(state, action);
    case CLEAR_POST:
      return {
        ...state,
        post: reducerUtils.initial(),
      };
    default:
      return state;
  }
}
