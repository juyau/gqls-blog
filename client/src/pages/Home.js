import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition, Loader } from "semantic-ui-react";

import PostCard from "../components/PostCard";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";
import { GET_POSTS } from "../utils/graphql";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_POSTS);

  if (error) return <p>Error :(</p>;

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>

      <Grid.Row>
        {user && !loading && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <Loader size="large" active inline="centered" />
        ) : (
          <Transition.Group duration={500}>
            {data.getPosts &&
              data.getPosts.map(post => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
