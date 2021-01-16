import * as postsAPI from '../api/posts';

const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

export const getPosts = () => async (dispatch) => {
  //요청 시작 알림
  dispatch({ type: GET_POSTS });
  //API 호출
  try {
    const posts = await postsAPI.getPosts();
    //성공
    dispatch({ type: GET_POSTS_SUCCESS, posts });
  } catch (e) {
    //실패
    dispatch({ type: GET_POSTS_ERROR, error: e });
  }
};

export const getPost = (id) => async (dispatch) => {
  //요청 시작 알림
  dispatch({ type: GET_POST });
  //API 호출
  try {
    const posts = await postsAPI.getPost(id);
    //성공
    dispatch({ type: GET_POST_SUCCESS, posts });
  } catch (e) {
    //실패
    dispatch({ type: GET_POST_ERROR, error: e });
  }
};
