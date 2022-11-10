import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-football-v1.p.rapidapi.com/v3',
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-key', process.env.REACT_APP_API_KEY as string);
      headers.set('x-rapidapi-host', 'api-football-v1.p.rapidapi.com');

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getTeams: builder.query<any, void>({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/teams?league=1&season=2022',
    }),
    getTeamPlayers: builder.query<any, number>({
      query: (teamId) => `/players/squads?team=${teamId}`,
    }),
    getCoach: builder.query({
      query: (teamId) => `/coachs?team=${teamId}`,
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetTeamsQuery, useGetTeamPlayersQuery, useGetCoachQuery } =
  apiSlice;
