import React from 'react';
import WithRouterSample from './WithRouterSample';

const profileData = {
  Jang: {
    name: '장동현',
    description: 'Frontend Engineer',
  },
  homer: {
    name: '호머 심슨',
    description: '심슨 가족에 나오는 아빠 역할 케릭터',
  },
};
function Profile({ match }) {
  const { username } = match.params;
  const profile = profileData[username];

  if (!profile) {
    return <div>존재하지 않는 사용자 입니다.</div>;
  }
  return (
    <div>
      <h3>
        {username} ({profile.name})<p>{profile.description}</p>
        <WithRouterSample></WithRouterSample>
      </h3>
    </div>
  );
}

export default Profile;
