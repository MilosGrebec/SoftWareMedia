use node;

create table Users(
userID integer not null AUTO_INCREMENT,
username varchar(30) not null unique,
password varchar(50) not null,
PRIMARY KEY(userID)
);
create table Posts(
postId integer not null auto_increment,
userID integer not null references Users(userID),
text varchar(100),
image varchar(200),
primary key(postId)
);       
create table FriendsList(
userID integer not null,
friendID integer not null,
primary key(userID,friendID),
foreign key (userID) references Users(userID) ON DELETE CASCADE,
foreign key (friendID) references Users(userID) ON DELETE CASCADE
);
create Table Liked(
userID integer not null,
postID integer not null,
primary key(userID,postID),
foreign key(userID) references Users(userID) on DELETE CASCADE,
foreign key(postID) references Posts(postID) on delete cascade
);
create Table BlockedList(
userID integer not null,
blockedID integer not null,
primary key(userID,blockedID),
foreign key(userID) references Users(userID) on DELETE CASCADE,
foreign key(blockedID) references Users(userID) on DELETE CASCADE
);

insert into BlockedList values
(1,3),
(1,2);
                                                
alter table users add (logo varchar(200) not null default 'default.png');
alter table users drop column logo;

insert into FriendsList (userID,FriendID) values
(1,2);

insert into Liked(userID,postID) values(1,5);

delete from Liked where userID=1 and postID=3;

select * from FriendsList;

delete from FriendsList where userID=1 and friendID=9;

SELECT u.userID, u.username, u.logo
FROM FriendsList f
INNER JOIN Users u ON f.friendID = u.userID
WHERE f.userID = 1;

SELECT u.userID, u.username, u.logo
FROM BlockedList f
INNER JOIN Users u ON f.blockedID = u.userID
WHERE f.userID = 1;



select text,username,logo,image,postID
from users, posts
where users.userID=posts.userID and posts.postID in (select p.postID
from Liked l
inner join Posts p on l.postID=p.postID
where l.userID=1);

INSERT INTO Users(logo) values
('default.ong');


INSERT INTO Users (username, password) VALUES
('Samanta', 'password123'),
('Marko', 'securePass456'),
('Nikola', 'charlie789');

drop table posts;
 
INSERT INTO Posts (userID, text, image) VALUES
(9, 'I hate this nigga', 'quan.png'),
(10, 'Gonna kill this nigger', 'quan.png'),
(12, 'kill all niggers', 'quan.png');

select * from users;

select * from posts;

update users
set logo="transformer-logo.jpg"
where username="markoker";

select text,username,logo,image
from users, posts
where users.userID=posts.userID;

select p.postID
from Liked l
inner join Posts p on l.postID=p.postID
where l.userID=1;


