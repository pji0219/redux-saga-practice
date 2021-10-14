import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userFetch } from './redux-modules/user';

function App() {
  const {loading, err, users} = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userFetch());
  }, []);

  if(loading) return <div>로딩중...</div>
  if(err) return <div>에러!</div>

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

export default App;
