# cleverly-mvp-project 입니다.

## 실행방법

### git clone

#### ssh

ssh-key를 등록하면 쓸 수 있다.
git clone git@github.com:TIRANO-SW/front-end.git

#### http

토큰을 발급해서 써야 한다.
git clone https://github.com/TIRANO-SW/front-end.git

### 가상환경 설정

    python3 -m virtualenv [가상환경 이름]

    ex) 가상환경 이름: cleverly
    python3 -m virtualenv cleverly

-> 가상환경 이름은 원하는 이름으로 정하면 된다.(대괄호는 빼고)

### 가상환경 실행

    source [가상환경 이름]/bin/activate

    ex) 가상환경 이름: cleverly
    source cleverly/bin/activate

### 필수 라이브러리 설치

    pip install -r requirements.txt

### django실행

    python manage.py runserver
