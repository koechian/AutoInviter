import logging
import datetime

def log(message):
    
    logging.basicConfig(filename=''+datetime.datetime.now().strftime("Log/%d_%m_%Y.log"),level=logging.INFO)
    logger=logging.getLogger('ai-logger')
    logger.info(message)


log('ian')