# Front CI/CD Pipeline 과정
![스크린샷 2024-08-10 055653](https://github.com/user-attachments/assets/72a6ccf1-1e19-4f10-b4e3-333d922d3a76)

1. **GitHub**
   - `Git push` 발생 시 Webhook을 통해 Jenkins 서버로 코드가 전송됩니다.

2. **Jenkins**
   - Webhook을 통해 GitHub에서 코드를 가져와서 클론(Git Clone)합니다.
   - 프론트(FE) 빌드 작업을 수행합니다.
   - 빌드된 애플리케이션을 Docker 이미지로 생성하고, Docker Hub에 푸시(docker img push)합니다.

3. **Docker Hub**
   - Jenkins에서 푸시한 Docker 이미지를 저장합니다.

4. **React Boot 서버**
   - Docker Hub로부터 이미지를 풀(pull)하여 애플리케이션을 실행합니다.
   - 2개의 서버로 배포하여 타겟그룹으로 묶은 후 로드벨런서를 생성합니다. (리스너포트: 3000) 

## React 설정

### 1. Dockerfile
Dockerfile은 애플리케이션을 실행할 환경을 정의하고, 이를 기반으로 Docker 이미지를 빌드하는 설정 파일입니다.

```bash
# Stage 1: Build React app
FROM node:14-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# 로그 추가
RUN echo "Listing /etc/nginx/conf.d after copying nginx.conf:" && \
    ls -al /etc/nginx/conf.d/ && \
    echo "Displaying contents of /etc/nginx/conf.d/default.conf:" && \
    cat /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

```

## Jenkins 설정
### General
![스크린샷 2024-08-10 055101](https://github.com/user-attachments/assets/dccd30ce-eba4-4944-a09c-1c8d9a0ae7a3)
### 소스 코드 관리
![스크린샷 2024-08-10 055111](https://github.com/user-attachments/assets/785ea6e4-b02d-4b4b-9632-c51462df77a9)
### 빌드 유발
![스크린샷 2024-08-10 055116](https://github.com/user-attachments/assets/9af54df3-1d82-4082-af43-853f687b37c5)
### GitHub에 올리지 않은 파일을 Secret file파일 등록 후 파일 변수명 지정
![스크린샷 2024-08-10 055130](https://github.com/user-attachments/assets/2924bd03-3264-4045-ba9d-6ca993c58685)
 - Secret file 등록
  ![스크린샷 2024-08-10 055044](https://github.com/user-attachments/assets/7906b237-dab2-40ed-bcd1-0fe43b039546)
### Build Steps 
![스크린샷 2024-08-10 055209](https://github.com/user-attachments/assets/16a0ca9c-91b1-4b7b-a7e9-8d4c035aa1a0)
build script
``` bash
#!/bin/sh -xe

# 첫 번째 빌드 단계: .env 파일 복사
cp -f ${api_key} /var/jenkins_home/workspace/woosan-front/front

# 환경 변수 정의
REMOTE_SERVER_IP="000.000.000.000"
DOCKER_USERNAME="****"
DOCKER_PASSWORD="****"
IMAGE_NAME="woosan-front"
LOCAL_DOCKER_TAG="${DOCKER_USERNAME}/woosan-front:latest"
SSH_KEY_PATH="/var/jenkins_home/.ssh/my-jenkins-key"
N_PREFIX="/var/jenkins_home/node" # Node.js 커스텀 설치 경로

# Node.js 버전 관리자 다운로드 및 설치
curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n
chmod +x n
export N_PREFIX="/var/jenkins_home/node"
./n lts

# Node.js 바이너리를 PATH에 추가
export PATH="${N_PREFIX}/bin:$PATH"

# 프로젝트의 Dockerfile이 있는 디렉토리로 이동
cd /var/jenkins_home/workspace/woosan-front/front

# 기존 node_modules 및 package-lock.json 파일 삭제
rm -rf node_modules package-lock.json

# npm 캐시 삭제
npm cache clean --force

# npm 최신 버전으로 업데이트
npm install -g npm

# npm 패키지 설치 및 종속성 문제 수정
npm install
npm list universal-cookie
npm audit fix
npm install lodash-es@4.17.21 @babel/plugin-proposal-private-property-in-object@7.16.0

# 빌드 과정
export CI=false
npm run build

# Docker 이미지 빌드 및 푸쉬
docker build -t ${IMAGE_NAME}:latest .
echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin
docker tag ${IMAGE_NAME}:latest ${LOCAL_DOCKER_TAG}
docker push ${LOCAL_DOCKER_TAG}

# SSH 키 파일 권한 설정
if [ -f ${SSH_KEY_PATH} ]; then
  chmod 600 ${SSH_KEY_PATH}
fi

# 원격 서버에 접속하여 기존 컨테이너 중지 및 제거 후 새 컨테이너 실행
ssh -i ${SSH_KEY_PATH} -o StrictHostKeyChecking=no root@${REMOTE_SERVER_IP} << EOF
  echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin
  docker pull ${LOCAL_DOCKER_TAG}
  if [ \$(docker ps -q -f name=woosan-front) ]; then
    docker stop woosan-front
    docker rm woosan-front
  fi
  docker run -d --name woosan-front -p 3000:80 ${LOCAL_DOCKER_TAG}
EOF
```

## GitHub 설정
### github webhook 연동
- Repository/Settings/Webhooks
  - `Add webhook` 클릭
  - Payload URL: `http://젠킨스서버주소:8080/github-webhook/`
  - Content type: `application/json`
  - 저장

![image](https://github.com/user-attachments/assets/66364da0-3543-4079-9e77-7fa6c20efc5e)


### Front 배포 서버에 public key 등록

배포서버에서 vi 편집기 실행

```bash
root@woosan-front1:~# mkdir .ssh
root@woosan-front1:~# vi .ssh/authorized_keys
```

### 해당 과정이 완료되면 아이템을 복사하여 생성한 후 빌드 스크립트에서 배포 서버 Ip만 변경하여 2개 서버가 배포되도록 설정
![스크린샷 2024-08-10 062031](https://github.com/user-attachments/assets/ac264780-6532-4ed8-a5ba-8b083b523319)


## NCP
### 1. 2개의 배포 서버를 Target Group에 추가 (리스너 포트: 3000)
### 2. 생성한 타겟 그룹의 로드밸런서 생성
### 3. 로드밸런서 IP로 접속
