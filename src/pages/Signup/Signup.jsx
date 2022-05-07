import { Link } from 'react-router-dom';
import { signupFormFields } from '../../utils';

export const Signup = () => {
  return (
    <div>
      <form className='form'>
        {signupFormFields.map(({ id, label, type, name }) => {
          return (
            <label className='m-sm-t' key={id}>
              <span className='m-sm-t'>{label}</span>
              <input
                className='input m-xs-t'
                type={type}
                name={name}
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
