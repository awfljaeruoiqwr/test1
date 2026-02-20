from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model) :
    __tablename__ = 'user'
    
    id = db.Column(db.Integer, primary_key = True)
    userid = db.Column(db.String(32), unique = True, nullable = False)
    password = db.Column(db.String(128), nullable = False)
    is_admin = db.Column(db.Boolean, default = False)
    
    # 관계 설정
    post = db.relationship('Post', backref = 'user', lazy = True)
    comments = db.relationship('Comment', backref = 'user', lazy = True)
    
class Post(db.Model):
    __tablename__ = 'post'
    
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(100), nullable = False)
    content = db.Column(db.Text, nullable = False)
    author = db.Column(db.String(32), db.ForeignKey('user.userid'), nullable = False)
    created_at = db.Column(db.DateTime, default = datetime.now)
    updated_at = db.Column(db.DateTime, onupdate = datetime.now)
    views = db.Column(db.Integer, default = 0)
    image_filename = db.Column(db.String(255))
    
    # 관계 설정
    comments = db.relationship('Comment', backref='post', lazy=True, cascade='all, delete-orphan')
    
class Comment(db.Model):
    __tablename__ = 'comment'
    
    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.Text, nullable = False)
    author = db.Column(db.String(32), db.ForeignKey('user.userid'), nullable = False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable = False)
    created_at = db.Column(db.DateTime, default = datetime.now)
    
class Inventory(db.Model):
    __tablename__ = 'inventory'
    
    id = db.Column(db.Integer, primary_key=True)
    device_name = db.Column(db.String(100), default='EDL-Doctor', nullable=False)
    mac_address = db.Column(db.String(17), unique=True, nullable=False)
    serial_number = db.Column(db.String(50), unique=True, nullable=False)
    manufacture_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), default='정상', nullable=False)
    location = db.Column(db.String(100), nullable=True) 
    note = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    created_by = db.Column(db.String(32), db.ForeignKey('user.userid'), nullable=True)
    
class SmartringInventory(db.Model):
    __tablename__ = 'smartring_inventory'
    
    id = db.Column(db.Integer, primary_key=True)
    device_name = db.Column(db.String(100), default='SMARTRING', nullable=False)
    mac_address = db.Column(db.String(17), unique=True, nullable=False)
    serial_number = db.Column(db.String(50), unique=True, nullable=False)
    manufacture_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), default='정상', nullable=False)
    location = db.Column(db.String(100), nullable=True) 
    ring_size = db.Column(db.String(10), nullable=True)
    color = db.Column(db.String(20), nullable=True)
    note = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    created_by = db.Column(db.String(32), db.ForeignKey('user.userid'), nullable=True)
