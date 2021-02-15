import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  uri:"https://semicolon-backend.herokuapp.com",
  //  process.env.NODE_ENV === "development"
  //   ? "http://localhost:4000" : ,
  // uri: "http://localhost:4000",

  clientState: {
    defaults,
    resolvers
  },
  request: async operation => {
    const token = await localStorage.getItem('token');
    return operation.setContext({
      headers: { Authorization: `Bearer ${token}` }
    });
  }
});