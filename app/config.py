import os, string, random

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = 'Hello bro'

class DevelopmentConfig(Config):
    FILEDIR = basedir + '/static/files/'
