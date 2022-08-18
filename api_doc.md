# Miracle Football API Documentation

## Endpoints :

List of available endpoints:

- `POST /user/login`
- `POST /user/register`
- `POST /user/google-signin`
- `GET /teams`
- `GET /top-score-PL`
- `GET /standings-PL`
- `GET /teams/:id`
- `GET /sendMail/:id`
- `POST /teamsFavourite/:id`
- `GET /teamsFavourite`
- `DELETE /destroyFav/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "role": "string",
  "phoneNumber": "string",
  "username": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
  "password": "string",
  "role": "string",
  "phoneNumber": "string",
  "username": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email cannot be empty."
}
OR
{
  "message": "Email is already used"
}
OR
{
  "message": "Email format invalid"
}
OR
{
  "message": "Password cannot be empty"
}
OR
{
  "message": "Phone Number cannot be empty."
}
OR
{
  "message": "Username cannot be empty."
}

```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email cannot be empty."
}
OR
{
  "message": "Email format invalid."
}
OR
{
  "message": "Password cannot be empty."
}

```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password"
}
```

&nbsp;

## 3. GET /teams

Description:

- Get all teams from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[

        {
            "id": 57,
            "team": "Arsenal FC",
            "logo": "https://crests.football-data.org/57.png",
            "stadium": "Emirates Stadium",
            "coach": {
                "id": 11619,
                "firstName": "Mikel",
                "lastName": null,
                "name": "Arteta",
                "dateOfBirth": "1982-03-26",
                "nationality": "Spain",
                "contract": {
                    "start": null,
                    "until": null
                }
            }
        },
        {
            "id": 58,
            "team": "Aston Villa FC",
            "logo": "https://crests.football-data.org/58.png",
            "stadium": "Villa Park",
            "coach": {
                "id": 71303,
                "firstName": "Steven George",
                "lastName": "Gerrard",
                "name": "Steven Gerrard",
                "dateOfBirth": "1980-05-30",
                "nationality": "England",
                "contract": {
                    "start": null,
                    "until": null
                }
            }
        },
        {
            "id": 61,
            "team": "Chelsea FC",
            "logo": "https://crests.football-data.org/61.png",
            "stadium": "Stamford Bridge",
            "coach": {
                "id": 72766,
                "firstName": "Thomas",
                "lastName": null,
                "name": "Thomas Tuchel",
                "dateOfBirth": "1973-08-29",
                "nationality": "Germany",
                "contract": {
                    "start": null,
                    "until": null
                }
            }
        },
        {
            "id": 62,
            "team": "Everton FC",
            "logo": "https://crests.football-data.org/62.png",
            "stadium": "Goodison Park",
            "coach": {
                "id": 25598,
                "firstName": "Frank James",
                "lastName": "Lampard",
                "name": "Frank Lampard",
                "dateOfBirth": "1978-06-20",
                "nationality": "England",
                "contract": {
                    "start": null,
                    "until": null
                }
            }
        },

]
```
&nbsp;

## 4. GET / top-score-PL

Description:

- Read Top Score Premier League


_Response (200 - OK)_

```json
[
  {
            "name": "Rodrigo",
            "nationality": "Spain",
            "position": "Offence",
            "team": "Leeds United FC",
            "logo": "https://crests.football-data.org/341.png",
            "goals": 3
        },
        {
            "name": "Martinelli",
            "nationality": "Brazil",
            "position": "Offence",
            "team": "Arsenal FC",
            "logo": "https://crests.football-data.org/57.png",
            "goals": 2
        },
        {
            "name": "Aleksandar Mitrović",
            "nationality": "Serbia",
            "position": "Offence",
            "team": "Fulham FC",
            "logo": "https://crests.football-data.org/63.svg",
            "goals": 2
        },
        {
            "name": "Pascal Groß",
            "nationality": "Germany",
            "position": "Midfield",
            "team": "Brighton & Hove Albion FC",
            "logo": "https://crests.football-data.org/397.svg",
            "goals": 2
        },
]
```

&nbsp;
## 5. GET / standings-PL

Description:

- Read Standings Club Premier Leage


_Response (200 - OK)_

```json
[
  [
        {
            "position": 1,
            "team": "Manchester City FC",
            "logo": "https://crests.football-data.org/65.png",
            "playedGames": 2,
            "won": 2,
            "lost": 0,
            "draw": 0,
            "form": "W,W"
        },
        {
            "position": 2,
            "team": "Arsenal FC",
            "logo": "https://crests.football-data.org/57.png",
            "playedGames": 2,
            "won": 2,
            "lost": 0,
            "draw": 0,
            "form": "W,W"
        },
        {
            "position": 3,
            "team": "Brentford FC",
            "logo": "https://crests.football-data.org/402.png",
            "playedGames": 2,
            "won": 1,
            "lost": 0,
            "draw": 1,
            "form": "W,D"
        },
]
```
&nbsp;

## 6. POST /google-sign-in

Description:

- Login by goggle

Request:

- headers:

```json
{
  "access_token": "string"
}
```

&nbsp;

## 7. GET /teams/:id

Description:

- Read Teams Specified by Id

Request:

- params

```json
{
  "id": "integer(required)"
}
```

_Response (200 - OK)_

```json
"teams": {
        "area": {
            "id": 2072,
            "name": "England",
            "code": "ENG",
            "flag": "https://crests.football-data.org/770.svg"
        },
        "id": 61,
        "name": "Chelsea FC",
        "shortName": "Chelsea",
        "tla": "CHE",
        "crest": "https://crests.football-data.org/61.png",
        "address": "Fulham Road London SW6 1HS",
        "website": "http://www.chelseafc.com",
        "founded": 1905,
        "clubColors": "Royal Blue / White",
        "venue": "Stamford Bridge",
        "runningCompetitions": [
            {
                "id": 2021,
                "name": "Premier League",
                "code": "PL",
                "type": "LEAGUE",
                "emblem": "https://crests.football-data.org/PL.png"
            }
        ],
        "coach": {
            "id": 72766,
            "firstName": "Thomas",
            "lastName": null,
            "name": "Thomas Tuchel",
            "dateOfBirth": "1973-08-29",
            "nationality": "Germany",
            "contract": {
                "start": null,
                "until": null
            }
        },
```
_Response (404 - Not Found)_

```json
{
  "message": "Club not found"
}
```


## 8. GET /sendMail/:id

Description:

- Send User email for match information

Request:

- params

```json
{
  "id": "integer(required)"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "success read matches",
}
```
_Response (404 - Not Found)_

```json
{
  "message": "Club not found"
}
```

## 9. POST /teamsFavourite/:id

Description:
  Post teams to my favourite
- 

Request:

- params

```json
{
  "id": "integer(required)"
}
```

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "success add to favourite"
}
```

## 10. GET /teamsFavourite

Description:
  Read my team favourite
- 

Request:


- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
        {
            "id": 1,
            "UserId": 1,
            "TeamId": 61,
            "power": 0,
            "Team": {
                "id": 61,
                "name": "Chelsea FC",
                "logo": "https://crests.football-data.org/61.png",
                "stadium": "Stamford Bridge",
                "createdAt": "2022-08-17T17:02:12.982Z",
                "updatedAt": "2022-08-17T17:02:12.982Z"
            }
        }
    ]
```