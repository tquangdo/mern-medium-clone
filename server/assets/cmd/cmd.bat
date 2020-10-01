*********************** USER ***********************

1/POST NEW USER
=============
curl --request POST \
  --url http://localhost:5000/api/user \
  --header 'content-type: application/json' \
  --data '{"name": "david", "email": "kurt@gmail.com"}'

2/FOLLOW USER
===========
curl --request POST \
  --url http://localhost:5000/api/user/follow \
  --header 'content-type: application/json' \
  --data '{"id": "5a92cf3f2dec79115c8fc78a", "user_id": "5a92cf582dec79115c8fc78b"}'

3/GET A USER
==========
curl --request GET \
  --url http://localhost:5000/api/users/5a92cf3f2dec79115c8fc78a

4/GET A USER PROFILE
===================
curl --request GET \
  --url http://localhost:5000/api/users/profile/5f323e017117a1534c05a68c

5/GET ALL USERS
==========
curl --request GET \
  --url http://localhost:5000/api/users

*********************** ARTICLE ***********************

1/POST NEW ARTICLE
=============
curl --request POST --url http://localhost:5000/api/article --header 'content-type: application/json' --data '{"text": "xxx", "title": "Bi hiem", "claps":1, "description": "Rat huyen bi...", "feature_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRd-y-IJN8glQlf1qoU01dEgGPUa0d1-sjfWg&usqp=CAU", "user_id": "5f32b5f0f2785e558c2d7894"}'

2/GET ALL ARTICLES
================
curl --request GET \
  --url http://localhost:5000/api/articles

3/GET AN ARTICLE
==============
curl --request GET \
  --url http://localhost:5000/api/articles/5a92e41abb04440888395e44

4/COMMENT ON AN ARTICLE
=====================
curl --request POST \
  --url http://localhost:5000/api/article/comment \
  --header 'content-type: application/json' \
  --data '{"comment": "dfdggd", "user_id": "5a92cf3f2dec79115c8fc78a", "article_id": "5a92e41abb04440888395e44"}'

5/CLAP AN ARTICLE
===============
curl --request POST \
  --url http://localhost:5000/api/article/clap \
  --header 'content-type: application/json' \
  --data '{"article_id": "5a92e41abb04440888395e44"}'
