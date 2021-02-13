import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../ui/Button';
import { TextField } from '../ui/TextField';
import { UserContext } from './userContext';

const Login = () => {
  const { updateUser } = React.useContext(UserContext);
  let history = useHistory();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    submitting: false,
    error: '',
  });

  const handleChange = (name: string) => (newValue: string) => {
    setValues({ ...values, [name]: newValue });
    console.log('change', values);
  };

  const loginClick = async () => {
    console.log('login', values.email);
    return;
    setValues({ ...values, submitting: true });
    try {
      // TODO: Don't use fetch directly
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      setValues({ ...values, submitting: false });
      const data = await res.json();
      if (res.status !== 200) {
        setValues({ ...values, error: data.message });
        return;
      }
      updateUser({ name: data.name });
      history.replace('/');
    } catch (error) {
      console.log('error', error);
      setValues({ ...values, error: 'Login failed, see console' });
    }
  };

  // TODO: Fix Login styles
  return (
    <div className="flex justify-center content-center">
      <div className="flex flex-col w-full max-w-sm mx-auto p-4 border rounded border-gray-200 bg-white shadow-lg mb-20">
        <TextField
          id="email"
          name="email"
          label="Email"
          value={values.email}
          placeholder="Email address"
          type="email"
          onChange={handleChange('email')}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          value={values.password}
          type="password"
          onChange={handleChange('password')}
        />
        <div>
          <Button onClick={loginClick} disabled={values.submitting}>
            Log in
          </Button>
        </div>
        {values.error && <p>{values.error}</p>}
        <p className="mt-3 text-xs flex justify-between">
          <a href="#" className="">
            Forgot password?
          </a>
          <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
