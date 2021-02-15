import { gql } from 'apollo-boost'

export const SET_STATE = gql`
mutation state($state:String!){
  state(state:$state)
}`;