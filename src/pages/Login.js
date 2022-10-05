import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

class Login extends React.Component {
  state = {
    disable: true,
    redirect: false,
    email: '',
    password: '',
  };

  handleChange = (event) => {
    const { target: { id, value } } = event;
    this.setState({ [id]: value }, () => {
      const { password, email } = this.state;
      const MIN_PASSWORD_LENGTH = 6;
      if (
        password.length >= MIN_PASSWORD_LENGTH
        && email.includes('@' && '.com')
      ) {
        this.setState({ disable: false });
      } else {
        this.setState({ disable: true });
      }
    });
  };

  handleSubmit = (event) => {
    const {
      email,
    } = this.state;

    const {
      dispatch,
    } = this.props;

    event.preventDefault();
    dispatch(login(email));
    this.setState({ redirect: true });
  };

  render() {
    const {
      disable,
      redirect,
    } = this.state;

    return (
      <div>
        <form
          onSubmit={ this.handleSubmit }
        >
          <input
            type="email"
            placeholder="Email"
            data-testid="email-input"
            id="email"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            placeholder="password"
            data-testid="password-input"
            id="password"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            disabled={ disable }
          >
            Entrar
          </button>
        </form>
        {
          redirect && <Redirect to="/carteira" />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Login);
