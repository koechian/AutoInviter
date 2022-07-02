# #!/usr/bin/env python3
# #-*- coding: utf-8 -*-

import notify2


def notify(message):
    icon_path = "/home/koechian/Documents/AutoInviter/Assets/custom.ico"
    notify2.init('Auto Inviter Notification')

    n = notify2.Notification("Tester",message, icon = icon_path)

    n.set_urgency(notify2.URGENCY_NORMAL)
        
    n.set_timeout(1000)
    n.show()

notify('HELLO WORLD')

f = open("demofile2.txt", "a")
f.write("Now the file has more content!")
f.close()


