import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts';
import { signupFormFields } from '../../utils';

export const Signup = () => {
  const { signup } = useAuth();
  const [signupFormData, setSignupFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = signupFormData;

  const inputChangeHandler = (e) => {
    setSignupFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const signupHandler = (e) => {
    e.preventDefault();
    signup({ name, email, password });
  };

  return (
    <div>
      <form onSubmit={signupHandler} className='form'>
        {signupFormFields.map(({ id, label, type, name }) => {
          return (
            <label className='m-sm-t' key={id}>
              <span className='m-sm-t'>{label}</span>
              <input
                onChange={inputChangeHandler}
                className='input m-xs-t'
                type={type}
                name={name}
                value={signupFormData[name]}
                placeholder={`Enter your ${name}`}
                required
              />
            </label>
          );
        })}
        <button className='btn btn-primary m-sm-tb'>Signup</button>
        <Link className='form-link m-xs-tb' to='/login'>
          <span>Already have account</span>
          <span className='material-icons-outlined'> chevron_right </span>
        </Link>
      </form>
    </div>
  );
};
