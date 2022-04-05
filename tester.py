import json
import datetime 
from calendar import monthrange

formatted ="hello world"


def date():

    date = datetime.datetime.now()

    if (int(date.strftime("%d")) + 1) > monthrange(date.year, date.month)[1]:
        day = 1
    else:
        day = int(date.strftime("%d")) + 1

    time = {
        "year": int(date.strftime("%Y")),
        "month": int(date.strftime("%m")),
        "day": day,
    }

    x = datetime.datetime(
        year=time["year"], month=time["month"], day=time["day"], hour=8, minute=00
    )
    formatted = x.strftime("%Y-%m-%d %H:%M:%S")

    try:
        with open("tester.json", "r+") as f:
            data = json.load(f)
            for x in range(0,len(data["user_data"])):
                data["user_data"][str(x)]["expected_at"] = formatted
                f.seek(0)
                json.dump(data, f)
                f.truncate()
    except:
        exit()


date()



