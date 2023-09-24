/* eslint-disable no-underscore-dangle */
import { useNavigate } from 'react-router-dom';
import { inputEmailSettings, inputNameSettings } from '../helpers/constants';

// DID убрал дополнительные переменные
export default function useUserData() {
  const navigate = useNavigate();

  const setUserData = ({ values, curUser }: any) => {
    // values от useForm, values.data от main.toLogin(), т.к. name отсутствует в values при login
    curUser?.setEmail(values[inputEmailSettings.name] || values?.data?.email);
    curUser?.setName(values[inputNameSettings.name] || values?.data?.name);
    curUser?.setId(values?.data?._id || curUser.id);
  };

  const setUserDataAndLogin = (data: any) => {
    data.curUser?.login();
    setUserData(data);
  };

  const setUserDataAndLoginAndNavToFilms = (data: any) => {
    setUserDataAndLogin(data);
    navigate('/movies');
  };

  return { setUserData, setUserDataAndLogin, setUserDataAndLoginAndNavToFilms };
}
