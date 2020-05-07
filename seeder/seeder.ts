/* USE: npm run seed 
*   Will seed fake data and image links needed for basic demo
*/

import mongoose from 'mongoose'
import User from '../src/models/User'
import Game from '../src/models/Game';
import Team from '../src/models/Team';

const games = [
  {
    name: "Modern Warfare 2019",
    platform: 'PS4',
    imageLink: 'https://i.ibb.co/1dVzQys/modern-warfare.png',
    ladders: [
      {
        name: '2v2 Gunfight',
        maxPlayers: 4
      },
      {
        name: 'Singles',
        maxPlayers: 2
      }
    ]
  },
  {
    name: "Valorant",
    platform: 'PC',
    imageLink: 'https://i.ibb.co/VDrHj6S/valorant.png',
    ladders: [
      {
        name: 'Team ladder',
        maxPlayers: 12
      },
      {
        name: 'Singles',
        maxPlayers: 2
      }
    ],
  },
  {
    name: "Black Ops 2",
    platform: 'XBOX ONE',
    imageLink: 'https://i.ibb.co/kyyMt7D/black-ops-2.png',
    ladders: [
      {
        name: 'Team ladder',
        maxPlayers: 8
      },
      {
        name: 'Doubles',
        maxPlayers: 4
      },
      {
        name: 'Singles',
        maxPlayers: 2
      },
    ],
  },
  {
    name: "Fortnite BR",
    platform: 'CROSSPLAY',
    imageLink: 'https://i.ibb.co/2jMrvyP/fortnite.png',
    ladders: [
      {
        name: 'Duos',
        maxPlayers: 4
      },
      {
        name: 'Singles',
        maxPlayers: 2
      }
    ],
  },
  {
    name: "League of Legends",
    platform: 'PC',
    imageLink: 'https://i.ibb.co/c2FzTdq/leagueoflegends.png',
    ladders: [
      {
        name: 'Summouners Rift',
        maxPlayers: 10
      }
    ],
  },
  {
    name: "Fifa 2020",
    platform: 'PS4',
    imageLink: 'https://i.ibb.co/5M2LX4m/fifa.png',
    ladders: [
      {
        name: 'Singles',
        maxPlayers: 2
      }
    ],
  },
]




const seed = async () => {
  await mongoose.connect('mongodb://localhost:27017/outmatchgaming', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  });

  const user = await User.create({
    username: "Persano",
    fullEmail: "persano@gmail.com",
    password: "$2b$04$bE3SHpwYfUAFQUjIjzPEJeORelQj/z17viASj9ZJn8gFGpJcsPr4G",
  });


  const createGames = async () => {
    return Promise.all(games.map(game => Game.create(game)));
  }

  const gamesDB = await createGames();

  const teams = [
    {
      name: 'Optic Gaming',
      ladderId: gamesDB[0].ladders[0]._id,
      playersId: [user._id]
    },
    {
      name: '100T',
      ladderId: gamesDB[0].ladders[0]._id,
      playersId: [user._id]
    }
  ]

  const createTeams = async () => {
    return Promise.all(teams.map(team => Team.create(team)));
  }

  await createTeams();

  process.exit();
}

seed();