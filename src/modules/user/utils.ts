import { appId } from '../../../config/api_key';

export const authenticateUser = dispatch => {

}

export const signup = (user) => (
  $.ajax({
    method: 'POST',
    url: 'api/users',
    data: { user }
  })
);
