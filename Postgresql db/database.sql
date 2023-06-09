PGDMP     3        
            {            task1    14.7    14.7     	           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16417    task1    DATABASE     a   CREATE DATABASE task1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_India.1252';
    DROP DATABASE task1;
                postgres    false            �            1259    16418    course    TABLE     �   CREATE TABLE public.course (
    courseid integer NOT NULL,
    coursename character varying(100) NOT NULL,
    coursecredit integer NOT NULL,
    courseformat character varying(20) NOT NULL,
    coursefee double precision NOT NULL
);
    DROP TABLE public.course;
       public         heap    postgres    false            �            1259    16423    roles    TABLE     �   CREATE TABLE public.roles (
    roleid integer NOT NULL,
    rolename character varying(50) NOT NULL,
    roledescription character varying(255)
);
    DROP TABLE public.roles;
       public         heap    postgres    false            �            1259    16511 
   usercourse    TABLE     p   CREATE TABLE public.usercourse (
    usercourseid integer NOT NULL,
    userid integer,
    courseid integer
);
    DROP TABLE public.usercourse;
       public         heap    postgres    false            �            1259    16510    usercourse_usercourseid_seq    SEQUENCE     �   CREATE SEQUENCE public.usercourse_usercourseid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.usercourse_usercourseid_seq;
       public          postgres    false    214                       0    0    usercourse_usercourseid_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.usercourse_usercourseid_seq OWNED BY public.usercourse.usercourseid;
          public          postgres    false    213            �            1259    16484    users    TABLE     �   CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    roleid integer
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16483    users_userid_seq    SEQUENCE     �   CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.users_userid_seq;
       public          postgres    false    212                       0    0    users_userid_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;
          public          postgres    false    211            j           2604    16514    usercourse usercourseid    DEFAULT     �   ALTER TABLE ONLY public.usercourse ALTER COLUMN usercourseid SET DEFAULT nextval('public.usercourse_usercourseid_seq'::regclass);
 F   ALTER TABLE public.usercourse ALTER COLUMN usercourseid DROP DEFAULT;
       public          postgres    false    214    213    214            i           2604    16487    users userid    DEFAULT     l   ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);
 ;   ALTER TABLE public.users ALTER COLUMN userid DROP DEFAULT;
       public          postgres    false    211    212    212                      0    16418    course 
   TABLE DATA           ]   COPY public.course (courseid, coursename, coursecredit, courseformat, coursefee) FROM stdin;
    public          postgres    false    209   �                 0    16423    roles 
   TABLE DATA           B   COPY public.roles (roleid, rolename, roledescription) FROM stdin;
    public          postgres    false    210                     0    16511 
   usercourse 
   TABLE DATA           D   COPY public.usercourse (usercourseid, userid, courseid) FROM stdin;
    public          postgres    false    214   �                 0    16484    users 
   TABLE DATA           J   COPY public.users (userid, username, email, password, roleid) FROM stdin;
    public          postgres    false    212   �                  0    0    usercourse_usercourseid_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.usercourse_usercourseid_seq', 11, true);
          public          postgres    false    213                       0    0    users_userid_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_userid_seq', 8, false);
          public          postgres    false    211            l           2606    16422    course course_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (courseid);
 <   ALTER TABLE ONLY public.course DROP CONSTRAINT course_pkey;
       public            postgres    false    209            n           2606    16427    roles roles_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (roleid);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            postgres    false    210            r           2606    16516    usercourse usercourse_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.usercourse
    ADD CONSTRAINT usercourse_pkey PRIMARY KEY (usercourseid);
 D   ALTER TABLE ONLY public.usercourse DROP CONSTRAINT usercourse_pkey;
       public            postgres    false    214            p           2606    16489    users users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    212            u           2606    16522 #   usercourse usercourse_courseid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usercourse
    ADD CONSTRAINT usercourse_courseid_fkey FOREIGN KEY (courseid) REFERENCES public.course(courseid);
 M   ALTER TABLE ONLY public.usercourse DROP CONSTRAINT usercourse_courseid_fkey;
       public          postgres    false    209    3180    214            t           2606    16517 !   usercourse usercourse_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usercourse
    ADD CONSTRAINT usercourse_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);
 K   ALTER TABLE ONLY public.usercourse DROP CONSTRAINT usercourse_userid_fkey;
       public          postgres    false    212    3184    214            s           2606    16490    users users_roleid_fkey    FK CONSTRAINT     y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_roleid_fkey FOREIGN KEY (roleid) REFERENCES public.roles(roleid);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT users_roleid_fkey;
       public          postgres    false    3182    210    212               (  x�m��N�0Eד���"YVP%Zb��q���G�C��c'Ї`���ܹNa�ޚf�^Fo��t���b%�$�ᑵb����e��Bx����,9��\��*���ɳ��3����J5.蓴�;b��0�k����A�kH�q��p�Zˮ�a��XM:i.`ej�	�}l;��O���r��@²��n�(��u6e���l�NX�[n���<�S��t�|��an��(���P4i��X�г��W��5e+a�	k�;c?�*"�!����F�9܇�k~�H�%?e�͒$��Ţ�         d   x�]�A
BA�ᵞ��	�U�ڈ㣁u��mz�?��w�0���h&�S{����W�R��>�7ˊ%�;?����g����WN�"�>j\��"�W-         7   x���� ��V1��^迎��d�C�I�e&�R𪵙w�����
kq��[�         o   x�3��*-.����S���9�z���P!C#cNc.#N�Ĥ�$�l0��"Rg�e��X�Y�X��ȇH�pdd�p 	 �
sN����T���,Q���� j
:�     