import { rest } from 'msw';
import { teams } from './teams';
import { players } from './players-1';
import { coach } from './coach';
const baseUrl = 'https://api-football-v1.p.rapidapi.com/v3';
export const handlers = [
  rest.get(`${baseUrl}/teams?league=1&season=2022`, (req, res, ctx) => {
    return res(ctx.json(teams));
  }),
  rest.get(`${baseUrl}/players/*`, (req, res, ctx) => {
    return res(ctx.json(players));
  }),
  rest.get(`${baseUrl}/coachs?team=1`, (req, res, ctx) => {
    return res(ctx.json(coach));
  }),
];
