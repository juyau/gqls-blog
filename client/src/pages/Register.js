import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Form, Button, Message, Icon } from "semantic-ui-react";

import useForm from "../utils/hooks";
import { AuthContext } from "../context/auth";

const Register = props => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const { onChange, onSubmit, values } = useForm(addUser, initialState);

  const [registerUser, { loading }] = useMutation(REGISTER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function addUser() {
    registerUser();
  }

  return (
    <div className="form-container">
      <Message
        attached
        header="Welcome to our site!"
        content="Fill out the form below to sign-up for a new account"
      />
      <Form
        onSubmit={onSubmit}
        noValidate
        className={
          loading ? "attached fluid segment loading" : "attached fluid segment"
        }
      >
        <Form.Input
          placeholder="Username"
          type="text"
          name="username"
          value={values.username}
          onChange={onChange}
          error={errors.username ? true : false}
        />
        <Form.Input
          placeholder="Email"
          type="email"
          name="email"
          value={values.email}
          onChange={onChange}
          error={errors.email ? true : false}
        />
        <Form.Input
          placeholder="Password"
          type="password"
          name="password"
          value={values.password}
          onChange={onChange}
          error={errors.password ? true : false}
        />
        <Form.Input
          placeholder="Password"
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
          error={errors.confirmPassword ? true : false}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <Message attached="bottom" warning>
          <Icon name="warning circle" />
          Input Errors:
          <ul>
            {Object.values(errors).map(value => (
              <li key={value}> {value} </li>
            ))}
          </ul>
        </Message>
      )}
    </div>
  );
};

const REGISTER = gql`
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      user: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      token
      username
      email
    }
  }
`;

export default Register;
