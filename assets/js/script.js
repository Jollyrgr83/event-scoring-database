var testObject = {
    1: {
        "year": "2020",
        "tiers": {
            1: {
                "name": "journeyman",
                "description": "description",                
                "events": {
                    1: "Event 1 Name",
                    2: "Event 2 Name",
                    3: "Event 3 Name",
                    4: "Event 4 Name",
                    5: "Event 5 Name"
                }
            },
            2: {
                "name": "apprentice",
                "description": "description",
                "events": {
                    1: "Event 1 Name",
                    2: "Event 2 Name",
                    3: "Event 3 Name",
                    4: "Event 4 Name",
                    5: "Event 5 Name"
                }
            }
        },
        "competitors": {
            1: {
                "name": "competitor name",
                "tier": "apprentice or journeyman",
                "organization": "santee cooper or coop name",
                "type": "santee cooper or coop",
                "event scores": {
                    1: 100,
                    2: 100,
                    3: 100,
                    4: 100,
                    5: 100
                },
                "event times": {
                    1: {
                        "minutes": 5,
                        "seconds": 23
                    },
                    2: {
                        "minutes": 5,
                        "seconds": 23
                    },
                    3: {
                        "minutes": 5,
                        "seconds": 23
                    },
                    4: {
                        "minutes": 5,
                        "seconds": 23
                    },
                    5: {
                        "minutes": 5,
                        "seconds": 23
                    }
                }
            }
        }
    }
};
// how many different types of competitors (journeyman, apprentice, etc.)
var tierKeyArray = Object.keys(testObject[1].tiers);
var tierNameArray = [];
// array containing tier names (journeyman, competitor, etc.)
for (let i = 0; i < tierKeyArray.length; i++) {
    tierNameArray.push(testObject[1].tiers[tierKeyArray[i]].name);
}
var eventKeyArray
// generate key array for number of events in each tier
for (let i = 0; i < tierNameArray.length; i++) {
    
    testObject[1].tiers[tierKeyArray[i]].events;
}