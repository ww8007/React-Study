import * as postsAPI from '../api/posts'; // api/posts 안의 함수 모두 불러오기
import {
  createPromiseThunk,
  reducerUtils,
  handleAsyncActions,
} from '../lib/asyncUtils';

/* 액션 타입 */

// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// 포스트 비우기
const CLEAR_POST = 'CLEAR_POST';

// 아주 쉽게 thunk 함수를 만들 수 있게 되었습니다.
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = (id) => async (dispatch) => {
  dispatch({ type: GET_POST, meta: id });
  try {
    const payload = await postsAPI.getPostById(id);
    dispatch({ type: GET_POST_SUCCESS, payload, meta: id });
  } catch (e) {
    dispatch({
      type: GET_POST_ERROR,
      payload: e,
      error: true,
      meta: id,
    });
  }
};

export const clearPost = () => ({ type: CLEAR_POST });

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
  posts: reducerUtils.initial(),
  post: {},
};

const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts', true);
const getPostReducer = (state, action) => {
  const id = action.meta;
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        post: {
          ...state.post,
          [id]: reducerUtils.loading(state.post[id] && state.post[id].data),
        },
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          [id]: reducerUtils.success(action.payload),
        },
      };
    case GET_POST_ERROR:
      return {
        ...state,
        post: {
          ...state.post,
          [id]: reducerUtils.erorr(state.post[id] && state.post[id].data),
        },
      };
    default:
      return state;
  }
};
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
