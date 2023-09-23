/* eslint-disable no-underscore-dangle */
import { useNavigate } from 'react-router-dom';
import { inputEmailSettings, inputNameSettings } from '../helpers/constants';

export default function useUserData() {
  const navigate = useNavigate();

  const setUserData = ({ values, curUser }: any) => {
    // values от useForm, values.data от main.toLogin(), т.к. name отсутствует в values при login
    const newEmail = (values[inputEmailSettings.name] || values?.data?.email);
    const newName = (values[inputNameSettings.name] || values?.data?.name);
    const newId = (values?.data?._id || curUser.id);

    curUser?.setEmail(newEmail);
    curUser?.setName(newName);
    curUser?.setId(newId);
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
