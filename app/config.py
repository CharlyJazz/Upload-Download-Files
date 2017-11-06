import os, string, random

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in xrange(32))

class DevelopmentConfig(Config):
    FILEDIR = basedir + '/static/files/'