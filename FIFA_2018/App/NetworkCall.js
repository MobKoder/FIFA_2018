import {
    AsyncStorage
} from 'react-native';

const baseUrl = 'https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json';
let response = {};
let matchList = null,
    stadiumList = null,
    groupList = null,
    teamList = null,
    knockoutMatchesDict = null,
    latestUpcomingMatch = null;

//Fetch data
export const fetchFullData = () => {
    return fetch(baseUrl, {
            method: 'GET',
            headers: {
                'X-No-Cache': 'true'
            },
        }).then((response) => response.json())
        .then((responseJson) => {
            if (responseJson) {
                resetAllValues();
                response = responseJson;
                return Promise.resolve(response);
            }
            return Promise.reject(response);
        })
        .catch((error) => {
            return Promise.reject(response);
        });
}

const resetAllValues = () => {
    matchList = null;
    stadiumList = null;
    groupList = null;
    teamList = null;
    currentMatchSchedule = null;
    knockoutMatchesDict = null;
}

//Teams
export const teams = () => {
    if (teamList && teamList.length > 0) {
        return teamList;
    } else if (response && response.teams) {
        teamList = response.teams
    } else {
        teamList = null;
    }
    return teamList;
}

export const teamByID = (id) => {
    let team = null;
    const teams = teams();
    if (teams) {
        teams((item) => {
            if (item && item.id == id) {
                team = item;
            }
        });
    }
    return team;
}

//Stadiums
export const stadiums = () => {
    if (stadiumList && stadiumList.length > 0) {
        return stadiumList;
    } else if (response && response.stadiums) {
        stadiumList = response.stadiums
    } else {
        stadiumList = null;
    }
    return stadiumList;
}

export const stadiumByID = (id) => {
    let stadium = null;
    const stadiums = stadiums();
    if (stadiums) {
        stadiums((item, index) => {
            if (item && item.id == id) {
                stadium = item;
            }
        });
    }
    return stadium;
}

//Groups
export const groupsInfo = () => {
    if (groupList) {
        return groupList;
    } else if (response && response.groups) {
        groupList = response.groups
    } else {
        groupList = null;
    }
    return groupList;
}

export const groupsByName = (name) => {
    const key = name.toLowerCase();
    let group = null;
    const groups = groupsInfo();
    if (groups && groups[key]) {
        group = groups[key]
    }
    return group;
}

//AllMatches
export const allMatches = () => {
    if (matchList && matchList.length > 0) {
        return matchList;
    }
    const groups = groupsInfo();
    if (groups) {
        matchList = [];
        for (const key of Object.keys(groups)) {
            matchList = matchList.concat(groups[key].matches);
        }
    }

    return sortByNumber(matchList, 'name', -1);
}

const sortByNumber = (data, key, order) => {
    return data.sort((A, B) => {
        return order * (B[key] - A[key]);
    });
}

//knockout matches
export const knockoutMatches = () => {
    return knockoutMatchesDict ? knockoutMatchesDict : (knockoutMatchesDict = response.knockout);
}

//Current match
export const currentMatch = () => {
    const matches = allMatches();
    var now = new Date();
    var closest = Infinity;
    matches.forEach((match) => {
        const localDate = new Date(match.date);
        if (localDate >= now && localDate < closest) {
            closest = localDate;
            latestUpcomingMatch = match;
        }
    })
    return latestUpcomingMatch;
}

//Past 5 matches from Current
export const previousFiveMatches = () => {
    const currentMatchNumber = currentMatch().name;
    const matches = allMatches();
    let arr = matches.filter(match => {
        const matchNumber = match.name;
        if (matchNumber < currentMatchNumber && matchNumber >= (currentMatchNumber - 5)) {
            return match;
        }
    });
    return arr;
}

//Next 5 matches from Current
export const nextFiveMatches = () => {
    const currentMatchNumber = currentMatch().name;
    const matches = allMatches();
    let arr = matches.filter(match => {
        const matchNumber = match.name;
        if (matchNumber > currentMatchNumber && matchNumber <= (currentMatchNumber + 5)) {
            return match;
        }
    });
    return arr;
}