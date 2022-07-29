import requests
import json
from bs4 import BeautifulSoup
from datetime import datetime

ratings = {"teams":[], "updated_at": str(datetime.now(tz=None))}

for url in ["https://www.fifaindex.com/teams/?page=1&league=13&league=14&order=desc", "https://www.fifaindex.com/teams/?page=2&league=13&league=14&order=desc"]:
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    table = soup.find_all("tr")
    for row in table:
        cellTeam = row.find_all("td", {'data-title' : 'Name'})
        cellAtt = row.find_all("td", {'data-title' : 'ATT'})
        cellMid = row.find_all("td", {'data-title' : 'MID'})
        cellDef = row.find_all("td", {'data-title' : 'DEF'})
        cellOvr = row.find_all("td", {'data-title' : 'OVR'})

        for team in cellTeam:
            for att in cellAtt:
                for mid in cellMid:
                    for dfc in cellDef:
                        for ovr in cellOvr:
                            ratings["teams"].append({"name": team.find('a').text, "ATT": att.find("span").text, "MID": mid.find("span").text, "DEF": dfc.find("span").text, "OVR": ovr.find("span").text})

# take second element for sort
def pullName(elem):
    return elem["name"]

ratings["teams"] = sorted(ratings["teams"], key=lambda i: i['name'])

open("../server/src/data/teams.json", "w").write(json.dumps(ratings))
print(json.dumps(ratings))