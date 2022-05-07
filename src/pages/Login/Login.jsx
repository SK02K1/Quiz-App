import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginFormFields, testCredentials } from '../../utils';
import { FcGoogle } from 'react-icons/fc';

export const Login = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const inputChangeHandler = (e) => {
    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const fillTestCredentials = () => {
    setLoginFormData(testCredentials);
  };

  return (
    <div>
      <form className='form'>
        <h1 className='text-xl text-center m-xs-tb'>Login</h1>
        {loginFormFields.map(({ id, label, name, type }) => {
          return (
            <label className='m-sm-t' key={id}>
              <span className='m-sm-t'>{label}</span>
              <input
                className='input m-xs-t'
                onChange={inputChangeHandler}
                type={type}
                name={name}
                value={loginFormData[name]}
                placeholder={`Enter your ${name}`}
                required
              />
            </label>
          );
        })}
        <button className='btn btn-primary m-sm-tb' type='submit'>
          Login
        </button>
        <button
          onClick={fillTestCredentials}
          className='btn btn-primary'
          type='button'
        >
          Use test credentials
        </button>
        <div className='text-center m-xs-tb'>OR</div>
        <button className='btn btn-primary outlined' type='button'>
          <FcGoogle className='text-xl m-xs-r' /> Sign in with Google
        </button>

        <Link className='form-link m-sm-tb' to='/signup'>
          <span>Create new account</span>
          <span className='material-icons-outlined'> chevron_right </span>
        </Link>
      </form>
    </div>
  );
};
