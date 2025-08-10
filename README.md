SoftWare Media is a "social media" website made as a "SERN" stack, or rather SQL, React, Express, and Node.

It is a rather simple website; you can log in/register, see other people's posts, like them, and add people as friends or block them.

The database is in MySQL, so if you want to try it out on your machine, you need to have MySQL installed beforehand.

For the backend, I used Express and Node. There is not much to say there; it is a simple, basic backend.

Fun fact: as I was making this project, I came to the realization that these kinds of websites are not that hard to make, but there is a lot of work to do, so it's simple to make, but there is a lot of work to do.

Here is how the website looks when you first open it:

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/6954ba86-7326-4a6c-8195-d91f1016735e" />

Even if you try to go to diffirent page, you will always be brought back to login or register, btw for register you just have to type password twice.

When you login or register you are brought to the home page

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/e73f4c01-7262-43d8-b06c-e2795fe46e04" />

You can see your own posts or like your own posts, and or scrool down to see more posts.

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/80fd82e0-134e-4d47-8f7b-7ae53a28488f" />

You can go to the profile page where you can update your profile picture, log out or post something.

This is how posts form looks like:

<img width="1855" height="790" alt="image" src="https://github.com/user-attachments/assets/43200ec8-d31c-4e4b-84d0-3a31735ce0d8" />

Back on the profile page if you go to the liked section, posts you liked will be shown, if you go the the blocked there will be list of users that you blocked and option to unblock them.

<img width="1919" height="676" alt="image" src="https://github.com/user-attachments/assets/2e5ebbbd-0537-4d6d-ae7d-653bea8e5ba3" />

If you go to the friends, it will be same as blocked, except that you will have option to unfriend them.

if you go the the people page (middle button on navbar), you will have list of all users on website, and yes you can add yourself as friend, gotta make them somehow.

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/b371352d-814f-404d-a2e2-3da3b87ed659" />

That search bar above is used to find users, when you type someone's name there and press enter you will be brought to the people page where there will be list of users with that name.

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/ac7aeab9-c235-4b46-883e-f165385584a4" />

Also if you dont log out and just exit the website, when you come back you wiil still be logged in, i done that using json web tokens.

That's it more or less, there are bunch of stuff i will fix in "near" future, biggest of them all is that loading, now for example when you go the home page it loads you all posts, if you leave and come back it will again send req to the server and such,
i will fix this by making global context of posts, and then it loads only once in begging and if you add more posts, and same thing applies to the blockedList and FriendList.

DISCLAIMER!!!!! I am NOT UI designer, i tend to make the most simpliest desings, that works but may not look good for everybody.
