import requests as req
import json
import os
import datetime
from warnings import catch_warnings
from win10toast import ToastNotifier
import logging
from calendar import monthrange


def connection_tester():
    try:
        req.get("http://www.google.com", timeout=5)
        logging.info("Internet Connection is Available")
        date()
    except (req.ConnectionError, req.Timeout) as exception:
        logging.error("No internet connection.")
        message = "No internet connection."
        notify(message)
        exit()


def login():
    try:
        with open("data.json", "r") as f:
            data = json.load(f)
            url = data["target"]["login"]
            payload = {
                "email": data["credentials"]["username"],
                "password": data["credentials"]["password"],
            }
            response = req.post(url, data=payload)
    except:
        logging.debug(
            "Login Failed. Could not find or open data file. Data file may be unreadable.(Login Function)"
        )

    with open("login.json", "w") as f:
        json.dump(response.json(), f)

    with open("login.json", "r") as f:
        data = json.load(f)

    token = data["data"]["token"]

    if token:
        logging.info("Login Success")
        return token
    else:
        logging.debug("Login Failed")
        exit()


def invite(token):
    with open("data.json", "r") as f:
        data = json.load(f)

    for x in range(0, len(data["user_data"])):
        inviteResponse = req.post(
            url=data["target"]["invite"],
            data=data["user_data"][str(x)],
            headers={"Authorization": "Bearer " + token},
        )

    if inviteResponse.status_code == 200:
        logging.info("Invite Success")
        logout()
    else:
        logging.debug("Invite Failed. Most likely server side issue.")
        logout()


def notify(message):
    n = ToastNotifier()

    n.show_toast(
        "Auto Inviter",
        message,
        duration=10,
        icon_path="Assets/custom.ico",
        threaded=True,
    )


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
        with open("data.json", "r+") as f:
            data = json.load(f)
            for x in range(0, len(data["user_data"])):
                data["user_data"][str(x)]["expected_at"] = formatted
                f.seek(0)
                json.dump(data, f)
                f.truncate()
    except:
        logging.debug(
            "Login Failed. Could not find or open data file. Data file may be unreadable. (Date Function) Program Exited."
        )
        exit()

    logging.info("Date set to: " + formatted + "\n" + "Invite function called")
    invite(login())


def logout():
    with open("data.json", "r") as f:
        data = json.load(f)
        url = data["target"]["logout"]
    try:
        with open("login.json", "r") as f:
            data = json.load(f)
    except:
        logging.error("Login File could not be accssed.")

    token = data["data"]["token"]

    response = req.delete(url=url, headers={"Authorization": "Bearer " + token})

    with open("login.json", "w") as f:
        json.dump(response.json(), f)

    if response.status_code == 200:
        os.remove("login.json")
        message = "Invite Created"

    else:
        logging.error(response.text)

    notify(message)

    logging.info("Program Executed Successfully")
    exit()


file = "data.json"

LOG_FILENAME = datetime.datetime.now().strftime("Log/%d_%m_%Y.log")

for handler in logging.root.handlers[:]:
    logging.root.removeHandler(handler)

logging.basicConfig(filename=LOG_FILENAME, level=logging.DEBUG)

connection_tester()
