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
==========TranDo có 2 articles=========
REM {
REM   "user": {
REM     "followers": [
REM       {
REM         "followers": [],
REM         "followings": [
REM           "5f323e017117a1534c05a68c"
REM         ],
REM         "_id": "5f329cc8fe92cd34687ad4be",
REM         "name": "NguyenA",
REM         "email": "anguyen@email.com",
REM         "__v": 1
REM       }
REM     ],
REM     "followings": [
REM       "5f329cc8fe92cd34687ad4be"
REM     ],
REM     "_id": "5f323e017117a1534c05a68c",
REM     "name": "TranDo",
REM     "email": "dotq@email.com",
REM     "__v": 1
REM   },
REM   "articles": [
REM     {
REM       "_id": "5f32589573398c2160c45574",
REM       "text": "<p>sach</p>",
REM       "title": "Python",
REM       "claps": 0,
REM       "description": "<p>AI & Deep learning</p>...",
REM       "feature_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDU5qlsl-XzMe8-jK02bC5fBerf_gYSgiPhQ&usqp=CAU",
REM       "comments": [],
REM       "__v": 0,
REM       "users": "5f323e017117a1534c05a68c"
REM     },
REM     {
REM       "_id": "5f32597a73398c2160c45575",
REM       "text": "<p>phim</p>",
REM       "title": "Titanic",
REM       "claps": 4,
REM       "description": "r?t hay",
REM       "feature_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQVoTC0p-la3qtjESUbigorBHGhlwgXP7hhFw&usqp=CAU",
REM       "comments": [
REM         {
REM           "_id": "5f329c39fe92cd34687ad4bd",
REM           "users": "5f323e017117a1534c05a68c",
REM           "text": "cong nh?n hay!"
REM         },
REM         {
REM           "_id": "5f32a8fd23a1892758c7280f",
REM           "users": "5f329cc8fe92cd34687ad4be",
REM           "text": "sao t? vi?t sach r?i t? khen v?y cha?!?"
REM         }
REM       ],
REM       "__v": 3,
REM       "users": "5f323e017117a1534c05a68c"
REM     }
REM   ]
REM }
==========NguyenA có 0 article + 1 comment=========
REM {
REM   "user": {
REM     "followers": [
REM       {
REM         "followers": [],
REM         "followings": [
REM           "5f329cc8fe92cd34687ad4be"
REM         ],
REM         "_id": "5f323e017117a1534c05a68c",
REM         "name": "TranDo",
REM         "email": "dotq@email.com",
REM         "__v": 1
REM       }
REM     ],
REM     "followings": [
REM       "5f323e017117a1534c05a68c"
REM     ],
REM     "_id": "5f329cc8fe92cd34687ad4be",
REM     "name": "NguyenA",
REM     "email": "anguyen@email.com",
REM     "__v": 1
REM   },
REM   "articles": []
REM }
==========LeB có 0 article + 0 comment=========
REM {
REM   "user": {
REM     "followers": [],
REM     "followings": [
REM       "5f323e017117a1534c05a68c"
REM     ],
REM     "_id": "5f32b5f0f2785e558c2d7894",
REM     "name": "LeB",
REM     "email": "ble@email.com",
REM     "__v": 1
REM   },
REM   "articles": []
REM }

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
