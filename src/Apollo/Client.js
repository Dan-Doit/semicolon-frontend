import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  // uri: process.env.NODE_ENV === "development"
  //   ? "http://localhost:4000" : "https://semicolon-backend.herokuapp.com",
  uri:"https://semicolon-backend.herokuapp.com",
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