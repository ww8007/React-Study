const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

// {id, title, body}

const posts = [
  {
    id: 1,
    title: '리덕스 미들웨어 공부',
    body: '리덕스 미들웨어를 직접 만들어보면 이해 쉬움',
  },
  {
    id: 2,
    title: 'redux-thunk 사용해봅시다.',
    body: 'redux-thunk를 사용한 비동기 작업 처리',
  },
  {
    id: 3,
    title: 'redux-saga',
    body: 'redux-saga 나중에 사용 비동기 작업 처리',
  },
];

export const getPosts = async () => {
  await sleep(500);
  return posts;
};

export const getPostById = async (id) => {
  await sleep(500);
  return posts.find((post) => post.id === id);
};
