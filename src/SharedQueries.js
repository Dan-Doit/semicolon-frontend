import { gql } from "apollo-boost";

export const ME = gql`
  { 
    me{
        username
    }
  }
`;

// 오늘의 정보
export const GET_TODAYINFO = gql`
  query todayInfo($location:String!, $latitude: Float! , $longitude:Float!) {
    todayInfo(location:$location, latitude: $latitude, longitude:$longitude){
        countryName
        newCase
        temp 
        weather
        }
    }
`;

export const GET_NOTIFICATION = gql`
{
  getNotificate {
    id
    to{
      id
      username
    }
    from {
      id
      username
      avatar
    }
    post {
      id
    }
    message {
      id
    }
    createdAt
  }
  getFollowing{
    id
  }
}
`;