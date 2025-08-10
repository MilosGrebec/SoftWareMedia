SoftWare Media is a "social media" website made as a "SERN" stack, or rather SQL, React, Express, and Node.

It is a rather simple website; you can log in/register, see other people's posts, like them, and add people as friends or block them.

The database is in MySQL, so if you want to try it out on your machine, you need to have MySQL installed beforehand.

For the backend, I used Express and Node. There is not much to say there; it is a simple, basic backend.

Fun fact: as I was making this project, I came to the realization that these kinds of websites are not that hard to make, but there is a lot of work to do, so it's simple to make, but there is a lot of work to do.

Here is how the website looks when you first open it:

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/6954ba86-7326-4a6c-8195-d91f1016735e" />

Even if you try to go to a different page, you will always be brought back to login or register. Btw, for register, you just have to type the password twice.

When you log in or register, you are brought to the home page.

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/e73f4c01-7262-43d8-b06c-e2795fe46e04" />

You can see your own posts or like your own posts, and/or scroll down to see more posts.

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/80fd82e0-134e-4d47-8f7b-7ae53a28488f" />

You can go to the profile page, where you can update your profile picture, log out, or post something.

This is what the post form looks like:

<img width="1855" height="790" alt="image" src="https://github.com/user-attachments/assets/43200ec8-d31c-4e4b-84d0-3a31735ce0d8" />

Back on the profile page If you go to the liked section, posts you liked will be shown; if you go to the blocked section, there will be a list of users that you blocked and an option to unblock them.

<img width="1919" height="676" alt="image" src="https://github.com/user-attachments/assets/2e5ebbbd-0537-4d6d-ae7d-653bea8e5ba3" />

If you go to the friends, it will be the same as blocked, except that you will have the option to unfriend them.

If you go to the people page (middle button on the navbar), you will have a list of all users on the website, and yes, you can add yourself as a friend; you have to make them somehow.

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/b371352d-814f-404d-a2e2-3da3b87ed659" />

That search bar above is used to find users; when you type someone's name there and press enter, you will be brought to the people page, where there will be a list of users with that name.

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/ac7aeab9-c235-4b46-883e-f165385584a4" />

Also, if you don't log out and just exit the website, when you come back you will still be logged in. I did that using JSON web tokens.

That's it more or less. There are a bunch of things I will fix in the "near" future; the biggest of them all is that loading. Now, for example, when you go to the home page, it loads you all posts; if you leave and come back, it will again send a request to the server and such.

I will fix this by making a global context of posts, and then it loads only once at the beginning, and the same thing applies to the blocked list and friend list.

DISCLAIMER!!!!! I am NOT a UI designer; I tend to make the simplest designs that work but may not look good for everybody.


