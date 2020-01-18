import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_POSTS = gql`
  {
    getPosts {
      id
      username
      title
      body
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.getPosts.map(({ id, username, title }) => (
    <div key={id}>
      <p>
        {title} by {username}
      </p>
    </div>
  ));
};

export default Home;
